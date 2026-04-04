import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/projects/views — ranking of all project views
export async function GET() {
  try {
    const rows = await prisma.projectView.groupBy({
      by: ["slug"],
      _count: { slug: true },
      orderBy: { _count: { slug: "desc" } },
    });

    const views = rows.map((r: { slug: string; _count: { slug: number } }) => ({
      slug: r.slug,
      views: r._count.slug,
    }));

    return NextResponse.json({ views }, { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } });
  } catch (error) {
    console.error("[GET /api/projects/views]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
