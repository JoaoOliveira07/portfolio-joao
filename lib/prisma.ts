// Prisma 7 singleton with Neon serverless adapter
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

type PrismaClientType = InstanceType<typeof PrismaClient>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientType | undefined;
};

function createPrismaClient(): PrismaClientType {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    console.warn("[Prisma] DATABASE_URL not set");
    // Return a no-op client during build/static generation
    return new PrismaClient() as PrismaClientType;
  }

  const adapter = new PrismaNeon({ connectionString });
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  } as ConstructorParameters<typeof PrismaClient>[0]) as PrismaClientType;
}

export const prisma: PrismaClientType =
  globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
