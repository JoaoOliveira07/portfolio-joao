"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = sessionStorage.getItem("presence_session");
  if (!id) {
    id = uuidv4();
    sessionStorage.setItem("presence_session", id);
  }
  return id;
}

export function usePresence(page: string = "/") {
  const [online, setOnline] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const heartbeat = useCallback(async () => {
    try {
      const sessionId = getSessionId();
      if (!sessionId) return;
      const res = await fetch("/api/presence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, page }),
      });
      if (res.ok) {
        const data = await res.json();
        setOnline(data.online);
      }
    } catch {
      // silently fail
    }
  }, [page]);

  useEffect(() => {
    heartbeat(); // immediate on mount
    intervalRef.current = setInterval(heartbeat, 30000); // every 30s
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [heartbeat]);

  return { online };
}
