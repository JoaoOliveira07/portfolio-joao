import { NextRequest } from "next/server";
import { createHash } from "crypto";
import { prisma } from "@/lib/prisma";

export function getIpHash(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";
  return createHash("sha256")
    .update(ip + (process.env.IP_SALT || "portfolio"))
    .digest("hex")
    .slice(0, 16);
}

export async function readStats(ipHash: string) {
  const [likes, visits, mine] = await Promise.all([
    prisma.siteLike.count(),
    prisma.siteVisit.count(),
    prisma.siteLike.findUnique({ where: { ipHash } }),
  ]);
  return { likes, visits, liked: !!mine };
}

export const noStore = { "Cache-Control": "no-store" };
