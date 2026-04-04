import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const PRESENCE_TTL_SECONDS = 45;

// GET /api/metrics — live dashboard data
export async function GET() {
  try {
    const since5min = new Date(Date.now() - 5 * 60 * 1000);
    const since1min = new Date(Date.now() - 60 * 1000);
    const presenceCutoff = new Date(Date.now() - PRESENCE_TTL_SECONDS * 1000);

    // Run all queries in parallel
    const [
      totalRequests5min,
      recentEvents,
      avgLatency1min,
      errorCount5min,
      onlineCount,
    ] = await Promise.all([
      // Total requests in last 5 minutes
      prisma.apiEvent.count({
        where: { createdAt: { gte: since5min } },
      }),

      // Last 20 events for the feed
      prisma.apiEvent.findMany({
        where: { createdAt: { gte: since5min } },
        orderBy: { createdAt: "desc" },
        take: 20,
        select: {
          id: true,
          method: true,
          endpoint: true,
          statusCode: true,
          latencyMs: true,
          createdAt: true,
        },
      }),

      // Average latency of last 1 minute
      prisma.apiEvent.aggregate({
        where: { createdAt: { gte: since1min } },
        _avg: { latencyMs: true },
      }),

      // Error count (4xx/5xx) in last 5 minutes
      prisma.apiEvent.count({
        where: {
          createdAt: { gte: since5min },
          statusCode: { gte: 400 },
        },
      }),

      // Active presence sessions
      prisma.presence.count({
        where: { lastSeen: { gte: presenceCutoff } },
      }),
    ]);

    // Per-endpoint breakdown for last 5 minutes
    const endpointGroups = await prisma.apiEvent.groupBy({
      by: ["endpoint"],
      where: { createdAt: { gte: since5min } },
      _count: { id: true },
      _avg: { latencyMs: true },
      orderBy: { _count: { id: "desc" } },
      take: 8,
    });

    const endpoints = endpointGroups.map((g) => ({
      endpoint: g.endpoint,
      count: g._count.id,
      avgLatencyMs: Math.round(g._avg.latencyMs ?? 0),
    }));

    return NextResponse.json(
      {
        window: "5m",
        totalRequests: totalRequests5min,
        avgLatencyMs: Math.round(avgLatency1min._avg.latencyMs ?? 0),
        errorCount: errorCount5min,
        errorRate:
          totalRequests5min > 0
            ? Math.round((errorCount5min / totalRequests5min) * 100)
            : 0,
        onlineNow: onlineCount,
        endpoints,
        feed: recentEvents.map((e) => ({
          id: e.id,
          method: e.method,
          endpoint: e.endpoint,
          statusCode: e.statusCode,
          latencyMs: e.latencyMs,
          // relative time in seconds ago
          secondsAgo: Math.round(
            (Date.now() - new Date(e.createdAt).getTime()) / 1000
          ),
        })),
      },
      {
        headers: {
          "Cache-Control": "no-store",
          "X-Powered-By": "Neon + Prisma 7",
        }
      }
    );
  } catch (error) {
    console.error("[GET /api/metrics]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
