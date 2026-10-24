-- Tabelas de curtidas e acessos do site (equivalente ao `prisma db push` para estes dois models).
-- Pode ser colado no SQL Editor do Neon. É seguro rodar mais de uma vez.

CREATE TABLE IF NOT EXISTS "site_likes" (
  "id"         TEXT         NOT NULL,
  "ip_hash"    TEXT         NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "site_likes_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "site_likes_ip_hash_key" ON "site_likes" ("ip_hash");

CREATE TABLE IF NOT EXISTS "site_visits" (
  "id"         TEXT         NOT NULL,
  "source"     TEXT         NOT NULL,
  "ip_hash"    TEXT         NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "site_visits_pkey" PRIMARY KEY ("id")
);
CREATE INDEX IF NOT EXISTS "site_visits_source_ip_hash_created_at_idx" ON "site_visits" ("source", "ip_hash", "created_at");

-- Multiplayer (presença no mapa do jogo)
CREATE TABLE IF NOT EXISTS "rpg_players" (
  "session_id" TEXT             NOT NULL,
  "name"       TEXT             NOT NULL,
  "character"  TEXT             NOT NULL,
  "x"          DOUBLE PRECISION NOT NULL,
  "y"          DOUBLE PRECISION NOT NULL,
  "state"      JSONB            NOT NULL,
  "updated_at" TIMESTAMP(3)     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "rpg_players_pkey" PRIMARY KEY ("session_id")
);
CREATE INDEX IF NOT EXISTS "rpg_players_updated_at_idx" ON "rpg_players" ("updated_at");
