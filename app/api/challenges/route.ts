import { NextResponse } from "next/server";
import { CHALLENGES } from "@/data/challenges";

// GET /api/challenges — list all challenges (without revealing correct answers)
export async function GET() {
  const safe = CHALLENGES.map(({ id, type, difficulty, question, context, options, order, relatedSlug }) => ({
    id,
    type,
    difficulty,
    question,
    context,
    options,
    order,
    relatedSlug,
  })).sort((a, b) => a.order - b.order);

  return NextResponse.json(
    { challenges: safe, total: safe.length },
    { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } }
  );
}
