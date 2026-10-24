'use client';

import { useEffect, useState } from 'react';
import { Heart, Eye } from 'lucide-react';

type Stats = { likes: number; visits: number; liked: boolean };

export function SiteStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let alive = true;
    const counted = (() => { try { return sessionStorage.getItem('visit-counted') === '1'; } catch { return false; } })();
    const req = counted
      ? fetch('/api/site/stats')
      : fetch('/api/site/visit?source=site', { method: 'POST' }).then((r) => { try { sessionStorage.setItem('visit-counted', '1'); } catch {} return r; });
    req.then((r) => (r.ok ? r.json() : null)).then((d) => { if (alive && d) setStats(d); }).catch(() => {});
    return () => { alive = false; };
  }, []);

  if (!stats) return null; // API/DB unavailable: show nothing

  const toggle = async () => {
    if (busy) return;
    setBusy(true);
    const prev = stats;
    setStats({ ...stats, liked: !stats.liked, likes: stats.likes + (stats.liked ? -1 : 1) }); // optimistic
    try {
      const r = await fetch('/api/site/like', { method: 'POST' });
      if (!r.ok) throw new Error();
      setStats(await r.json());
    } catch {
      setStats(prev);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex items-center gap-5 text-gray-500">
      <button
        onClick={toggle}
        aria-pressed={stats.liked}
        aria-label={stats.liked ? 'Remover curtida' : 'Curtir o projeto'}
        className={`inline-flex items-center gap-2 transition-colors hover:text-rose-400 ${stats.liked ? 'text-rose-400' : ''}`}
      >
        <Heart className="h-5 w-5" fill={stats.liked ? 'currentColor' : 'none'} />
        <span className="tabular-nums">{stats.likes}</span>
      </button>
      <span className="inline-flex items-center gap-2" title="Acessos">
        <Eye className="h-5 w-5" />
        <span className="tabular-nums">{stats.visits}</span>
      </span>
    </div>
  );
}
