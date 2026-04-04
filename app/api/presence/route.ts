import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { trackEvent } from "@/lib/trackEvent";

const PRESENCE_TTL_SECONDS = 45; // consider offline after 45s without heartbeat

// POST /api/presence — heartbeat (keep session alive)
export async function POST(req: NextRequest) {
  const start = Date.now();
  try {
    const body = await req.json().catch(() => ({}));
    const { sessionId, page } = body;

    if (!sessionId || typeof sessionId !== "string") {
      void trackEvent({ method: "POST", endpoint: "/api/presence", statusCode: 400, latencyMs: Date.now() - start });
      return NextResponse.json({ error: "sessionId is required" }, { status: 400 });
    }

    await prisma.presence.upsert({
      where: { sessionId },
      update: { lastSeen: new Date(), page: page || "/" },
      create: { sessionId, page: page || "/", lastSeen: new Date() },
    });

    // Clean up stale sessions (older than TTL) — opportunistic cleanup
    const cutoff = new Date(Date.now() - PRESENCE_TTL_SECONDS * 1000);
    await prisma.presence.deleteMany({ where: { lastSeen: { lt: cutoff } } });

    // Count active sessions
    const activeCutoff = new Date(Date.now() - PRESENCE_TTL_SECONDS * 1000);
    const online = await prisma.presence.count({ where: { lastSeen: { gte: activeCutoff } } });

    void trackEvent({ method: "POST", endpoint: "/api/presence", statusCode: 200, latencyMs: Date.now() - start, sessionId });
    return NextResponse.json({ online });
  } catch (error) {
    console.error("[POST /api/presence]", error);
    void trackEvent({ method: "POST", endpoint: "/api/presence", statusCode: 500, latencyMs: Date.now() - start });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// GET /api/presence — get current online count
export async function GET() {
  const start = Date.now();
  try {
    const cutoff = new Date(Date.now() - PRESENCE_TTL_SECONDS * 1000);
    const online = await prisma.presence.count({ where: { lastSeen: { gte: cutoff } } });
    void trackEvent({ method: "GET", endpoint: "/api/presence", statusCode: 200, latencyMs: Date.now() - start });
    return NextResponse.json(
      { online },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("[GET /api/presence]", error);
    void trackEvent({ method: "GET", endpoint: "/api/presence", statusCode: 500, latencyMs: Date.now() - start });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
