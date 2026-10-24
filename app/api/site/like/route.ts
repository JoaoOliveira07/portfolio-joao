import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getIpHash, readStats, noStore } from "@/lib/siteStats";

// POST /api/site/like — toggles this visitor's like (one per visitor)
export async function POST(req: NextRequest) {
  try {
    const ipHash = getIpHash(req);
    const existing = await prisma.siteLike.findUnique({ where: { ipHash } });
    if (existing) await prisma.siteLike.delete({ where: { ipHash } });
    else await prisma.siteLike.create({ data: { ipHash } });
    return NextResponse.json(await readStats(ipHash), { headers: noStore });
  } catch (error) {
    console.error("[POST /api/site/like]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
