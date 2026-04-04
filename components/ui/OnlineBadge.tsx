"use client";

import { usePresence } from "@/hooks/usePresence";

export function OnlineBadge({ page }: { page?: string }) {
  const { online } = usePresence(page || "/");

  if (!online || online < 1) return null;

  return (
    <div className="flex items-center gap-1.5 text-xs text-gray-500">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>
      <span>
        {online === 1 ? "1 pessoa online agora" : `${online} pessoas online agora`}
      </span>
    </div>
  );
}
