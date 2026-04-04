import { NextRequest, NextResponse } from "next/server";
import { CHALLENGES } from "@/data/challenges";
import { trackEvent } from "@/lib/trackEvent";

// POST /api/challenges/[id]/answer — validate answer, return result + explanation
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const start = Date.now();
  try {
    const { id } = await params;
    const body = await req.json();
    const chosen = body?.chosen;

    if (typeof chosen !== "number") {
      const res = NextResponse.json({ error: "Field 'chosen' must be a number (option index)" }, { status: 400 });
      void trackEvent({ method: "POST", endpoint: `/api/challenges/${id}/answer`, statusCode: 400, latencyMs: Date.now() - start });
      return res;
    }

    const challenge = CHALLENGES.find((c) => c.id === id);
    if (!challenge) {
      const res = NextResponse.json({ error: "Challenge not found" }, { status: 404 });
      void trackEvent({ method: "POST", endpoint: `/api/challenges/${id}/answer`, statusCode: 404, latencyMs: Date.now() - start });
      return res;
    }

    const correct = chosen === challenge.correctAnswer;
    const points = correct
      ? challenge.difficulty === "easy"
        ? 100
        : challenge.difficulty === "medium"
        ? 200
        : 300
      : 0;

    const res = NextResponse.json({
      id,
      correct,
      correctAnswer: challenge.correctAnswer,
      explanation: challenge.explanation,
      points,
      difficulty: challenge.difficulty,
    });
    void trackEvent({ method: "POST", endpoint: `/api/challenges/${id}/answer`, statusCode: 200, latencyMs: Date.now() - start, sessionId: body?.sessionId });
    return res;
  } catch (error) {
    console.error("[POST /api/challenges/[id]/answer]", error);
    void trackEvent({ method: "POST", endpoint: "/api/challenges/answer", statusCode: 500, latencyMs: Date.now() - start });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
