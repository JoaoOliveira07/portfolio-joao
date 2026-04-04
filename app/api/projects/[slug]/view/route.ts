import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createHash } from "crypto";
import { trackEvent } from "@/lib/trackEvent";

function getIpHash(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";
  return createHash("sha256").update(ip + process.env.IP_SALT || "portfolio").digest("hex").slice(0, 16);
}

// POST /api/projects/[slug]/view — register a view (deduplicated per IP per day)
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const start = Date.now();
  try {
    const { slug } = await params;
    const ipHash = getIpHash(req);

    // Deduplicate: same IP can only add 1 view per day per project
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existing = await prisma.projectView.findFirst({
      where: {
        slug,
        ipHash,
        createdAt: { gte: today },
      },
    });

    if (!existing) {
      await prisma.projectView.create({
        data: { slug, ipHash },
      });
    }

    const count = await prisma.projectView.count({ where: { slug } });
    void trackEvent({ method: "POST", endpoint: `/api/projects/${slug}/view`, statusCode: 200, latencyMs: Date.now() - start });
    return NextResponse.json({ slug, views: count });
  } catch (error) {
    console.error("[POST /api/projects/[slug]/view]", error);
    void trackEvent({ method: "POST", endpoint: "/api/projects/view", statusCode: 500, latencyMs: Date.now() - start });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// GET /api/projects/[slug]/view — get view count for a project
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const start = Date.now();
  try {
    const { slug } = await params;
    const count = await prisma.projectView.count({ where: { slug } });
    void trackEvent({ method: "GET", endpoint: `/api/projects/${slug}/view`, statusCode: 200, latencyMs: Date.now() - start });
    return NextResponse.json({ slug, views: count });
  } catch (error) {
    console.error("[GET /api/projects/[slug]/view]", error);
    void trackEvent({ method: "GET", endpoint: "/api/projects/view", statusCode: 500, latencyMs: Date.now() - start });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
