"use client";

import { useState, useEffect, useCallback } from "react";

export function useProjectViews(slug: string) {
  const [views, setViews] = useState<number | null>(null);

  const registerView = useCallback(async () => {
    try {
      const res = await fetch(`/api/projects/${slug}/view`, { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        setViews(data.views);
      }
    } catch {
      // silently fail — views are non-critical
    }
  }, [slug]);

  const fetchViews = useCallback(async () => {
    try {
      const res = await fetch(`/api/projects/${slug}/view`);
      if (res.ok) {
        const data = await res.json();
        setViews(data.views);
      }
    } catch {
      // silently fail
    }
  }, [slug]);

  return { views, registerView, fetchViews };
}

export type ReactionType = "rocket" | "fire" | "clap" | "mind_blown";

export interface Reactions {
  rocket: number;
  fire: number;
  clap: number;
  mind_blown: number;
}

export function useProjectReactions(slug: string) {
  const [reactions, setReactions] = useState<Reactions | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchReactions = useCallback(async () => {
    try {
      const res = await fetch(`/api/projects/${slug}/react`);
      if (res.ok) {
        const data = await res.json();
        setReactions(data.reactions);
      }
    } catch {
      // silently fail
    }
  }, [slug]);

  const react = useCallback(
    async (type: ReactionType) => {
      if (loading) return;
      setLoading(true);
      try {
        const res = await fetch(`/api/projects/${slug}/react`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type }),
        });
        if (res.ok) {
          const data = await res.json();
          setReactions(data.reactions);
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    },
    [slug, loading]
  );

  useEffect(() => {
    fetchReactions();
  }, [fetchReactions]);

  return { reactions, react, loading, fetchReactions };
}
