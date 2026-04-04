import { prisma } from "@/lib/prisma";

/**
 * Fire-and-forget API event tracker.
 * Call this inside any route handler to record the event.
 * Never throws — failure is silent so it never breaks the actual response.
 */
export async function trackEvent(params: {
  method: string;
  endpoint: string;
  statusCode: number;
  latencyMs: number;
  sessionId?: string;
}): Promise<void> {
  try {
    await prisma.apiEvent.create({
      data: {
        method: params.method,
        endpoint: params.endpoint,
        statusCode: params.statusCode,
        latencyMs: params.latencyMs,
        sessionId: params.sessionId ?? null,
      },
    });
  } catch {
    // Intentionally silent — tracking must never break the main flow
  }
}
