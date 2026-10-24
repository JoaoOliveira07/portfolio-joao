import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const CHARACTERS = ["joao", "kauan", "fernando", "vargas", "felipe"];
const ACTIVE_MS = 8000; // a player that hasn't reported for this long is gone
const MAX_PLAYERS = 40;
const SID = /^[a-zA-Z0-9-]{8,48}$/;

const num = (v: unknown, lo: number, hi: number) => {
  const n = Number(v);
  return Number.isFinite(n) ? Math.min(hi, Math.max(lo, n)) : null;
};

// keeps only the small, known set of fields the other clients need to draw this player
function cleanState(s: any) {
  const out: Record<string, unknown> = {};
  const m = s?.m === "c" || s?.m === "h" ? s.m : "w";
  out.m = m;
  if (m === "w") {
    out.d = typeof s?.d === "string" ? s.d.slice(0, 12) : "south";
    out.mv = !!s?.mv;
  } else if (m === "c") {
    out.model = typeof s?.model === "string" ? s.model.slice(0, 24) : null;
    out.color = typeof s?.color === "string" ? s.color.slice(0, 9) : null;
    out.special = !!s?.special;
    out.a = num(s?.a, -100, 100) ?? 0;
    out.st = num(s?.st, -1, 1) ?? 0;
  } else {
    out.a = num(s?.a, -100, 100) ?? 0;
    out.h = num(s?.h, 0, 1000) ?? 0;
  }
  return out;
}

// POST /api/rpg/presence — reports my position and returns everyone else who is online.
// body: { sid, name, ch, x, y, s: {...}, leave? }
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const sid = String(body?.sid ?? "");
    if (!SID.test(sid)) return NextResponse.json({ error: "bad sid" }, { status: 400 });

    if (body?.leave) {
      await prisma.rpgPlayer.deleteMany({ where: { sessionId: sid } });
      return NextResponse.json({ players: [], count: 0 });
    }

    const x = num(body?.x, 0, 100000), y = num(body?.y, 0, 100000);
    if (x === null || y === null) return NextResponse.json({ error: "bad position" }, { status: 400 });
    const name = String(body?.name ?? "").replace(/[^\p{L}\p{N} ._-]/gu, "").trim().slice(0, 16) || "Visitante";
    const character = CHARACTERS.includes(body?.ch) ? body.ch : "joao";
    const state = cleanState(body?.s);

    await prisma.rpgPlayer.upsert({
      where: { sessionId: sid },
      create: { sessionId: sid, name, character, x, y, state: state as any },
      update: { name, character, x, y, state: state as any, updatedAt: new Date() },
    });

    // housekeeping: drop stale rows now and then
    if (Math.random() < 0.05) {
      await prisma.rpgPlayer.deleteMany({ where: { updatedAt: { lt: new Date(Date.now() - 60_000) } } });
    }

    const rows = await prisma.rpgPlayer.findMany({
      where: { updatedAt: { gte: new Date(Date.now() - ACTIVE_MS) }, NOT: { sessionId: sid } },
      orderBy: { updatedAt: "desc" },
      take: MAX_PLAYERS,
    });
    const players = rows.map((r) => ({ id: r.sessionId, name: r.name, ch: r.character, x: r.x, y: r.y, s: r.state }));
    return NextResponse.json({ players, count: players.length + 1 }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("[POST /api/rpg/presence]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
