import { NextRequest, NextResponse } from "next/server";
import { getIpHash, readStats, noStore } from "@/lib/siteStats";

// GET /api/site/stats — total likes, total visits and whether this visitor already liked
export async function GET(req: NextRequest) {
  try {
    return NextResponse.json(await readStats(getIpHash(req)), { headers: noStore });
  } catch (error) {
    console.error("[GET /api/site/stats]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
