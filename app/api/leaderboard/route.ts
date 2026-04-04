import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { trackEvent } from "@/lib/trackEvent";

// GET /api/leaderboard — top 10 scores
export async function GET() {
  const start = Date.now();
  try {
    const entries = await prisma.leaderboard.findMany({
      orderBy: [{ score: "desc" }, { createdAt: "asc" }],
      take: 10,
      select: {
        id: true,
        nickname: true,
        score: true,
        createdAt: true,
      },
    });

    const res = NextResponse.json(
      { leaderboard: entries },
      { headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" } }
    );
    void trackEvent({ method: "GET", endpoint: "/api/leaderboard", statusCode: 200, latencyMs: Date.now() - start });
    return res;
  } catch (error) {
    console.error("[GET /api/leaderboard]", error);
    void trackEvent({ method: "GET", endpoint: "/api/leaderboard", statusCode: 500, latencyMs: Date.now() - start });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/leaderboard — submit final score
export async function POST(req: NextRequest) {
  const start = Date.now();
  try {
    const body = await req.json();
    const { nickname, score, sessionId, answers } = body;

    if (!nickname || typeof nickname !== "string" || nickname.trim().length < 2) {
      void trackEvent({ method: "POST", endpoint: "/api/leaderboard", statusCode: 400, latencyMs: Date.now() - start });
      return NextResponse.json({ error: "Nickname must be at least 2 characters" }, { status: 400 });
    }
    if (typeof score !== "number" || score < 0) {
      void trackEvent({ method: "POST", endpoint: "/api/leaderboard", statusCode: 400, latencyMs: Date.now() - start });
      return NextResponse.json({ error: "Invalid score" }, { status: 400 });
    }
    if (!sessionId || typeof sessionId !== "string") {
      void trackEvent({ method: "POST", endpoint: "/api/leaderboard", statusCode: 400, latencyMs: Date.now() - start });
      return NextResponse.json({ error: "sessionId is required" }, { status: 400 });
    }

    // Prevent duplicate submissions for the same session
    const existing = await prisma.leaderboard.findFirst({ where: { sessionId } });
    if (existing) {
      void trackEvent({ method: "POST", endpoint: "/api/leaderboard", statusCode: 409, latencyMs: Date.now() - start, sessionId });
      return NextResponse.json({ error: "Score already submitted for this session" }, { status: 409 });
    }

    // Save game session
    await prisma.gameSession.upsert({
      where: { sessionId },
      update: { answers: answers ?? [], score, completedAt: new Date() },
      create: { sessionId, answers: answers ?? [], score, completedAt: new Date() },
    });

    // Save to leaderboard
    const entry = await prisma.leaderboard.create({
      data: {
        nickname: nickname.trim().slice(0, 20),
        score,
        sessionId,
      },
    });

    // Get rank
    const rank = await prisma.leaderboard.count({ where: { score: { gt: score } } }) + 1;

    void trackEvent({ method: "POST", endpoint: "/api/leaderboard", statusCode: 201, latencyMs: Date.now() - start, sessionId });
    return NextResponse.json({ success: true, entry, rank }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/leaderboard]", error);
    void trackEvent({ method: "POST", endpoint: "/api/leaderboard", statusCode: 500, latencyMs: Date.now() - start });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
