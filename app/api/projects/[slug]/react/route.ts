import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createHash } from "crypto";

const VALID_REACTIONS = ["rocket", "fire", "clap", "mind_blown"] as const;
type ReactionType = (typeof VALID_REACTIONS)[number];

function getIpHash(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";
  return createHash("sha256")
    .update(ip + (process.env.IP_SALT || "portfolio"))
    .digest("hex")
    .slice(0, 16);
}

// GET /api/projects/[slug]/react — get reaction counts
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const rows = await prisma.projectReaction.groupBy({
      by: ["type"],
      where: { slug },
      _count: { type: true },
    });

    const reactions: Record<ReactionType, number> = {
      rocket: 0,
      fire: 0,
      clap: 0,
      mind_blown: 0,
    };

    for (const row of rows) {
      if (VALID_REACTIONS.includes(row.type as ReactionType)) {
        reactions[row.type as ReactionType] = row._count.type;
      }
    }

    return NextResponse.json({ slug, reactions });
  } catch (error) {
    console.error("[GET /api/projects/[slug]/react]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/projects/[slug]/react — register a reaction (rate limited: 1 per type per IP per day)
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await req.json();
    const type = body?.type as ReactionType;

    if (!VALID_REACTIONS.includes(type)) {
      return NextResponse.json(
        { error: `Invalid reaction type. Must be one of: ${VALID_REACTIONS.join(", ")}` },
        { status: 400 }
      );
    }

    const ipHash = getIpHash(req);

    // Rate limit: 1 reaction per type per IP per day per project
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existing = await prisma.projectReaction.findFirst({
      where: { slug, type, ipHash, createdAt: { gte: today } },
    });

    let action: "added" | "already_reacted" = "already_reacted";
    if (!existing) {
      await prisma.projectReaction.create({ data: { slug, type, ipHash } });
      action = "added";
    }

    // Return updated counts
    const rows = await prisma.projectReaction.groupBy({
      by: ["type"],
      where: { slug },
      _count: { type: true },
    });

    const reactions: Record<ReactionType, number> = {
      rocket: 0,
      fire: 0,
      clap: 0,
      mind_blown: 0,
    };

    for (const row of rows) {
      if (VALID_REACTIONS.includes(row.type as ReactionType)) {
        reactions[row.type as ReactionType] = row._count.type;
      }
    }

    return NextResponse.json({ slug, reactions, action });
  } catch (error) {
    console.error("[POST /api/projects/[slug]/react]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
