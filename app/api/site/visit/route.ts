import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getIpHash, readStats, noStore } from "@/lib/siteStats";

// POST /api/site/visit?source=site|rpg — counts an access (max 1 per visitor, per source, per day)
export async function POST(req: NextRequest) {
  try {
    const source = req.nextUrl.searchParams.get("source") === "rpg" ? "rpg" : "site";
    const ipHash = getIpHash(req);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const seen = await prisma.siteVisit.findFirst({ where: { source, ipHash, createdAt: { gte: today } } });
    if (!seen) await prisma.siteVisit.create({ data: { source, ipHash } });
    return NextResponse.json(await readStats(ipHash), { headers: noStore });
  } catch (error) {
    console.error("[POST /api/site/visit]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
