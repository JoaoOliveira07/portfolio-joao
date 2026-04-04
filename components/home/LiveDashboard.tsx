"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Users, Zap, AlertTriangle, RefreshCw, Circle } from "lucide-react";

interface FeedEvent {
  id: string;
  method: string;
  endpoint: string;
  statusCode: number;
  latencyMs: number;
  secondsAgo: number;
}

interface EndpointStat {
  endpoint: string;
  count: number;
  avgLatencyMs: number;
}

interface MetricsData {
  totalRequests: number;
  avgLatencyMs: number;
  errorRate: number;
  errorCount: number;
  onlineNow: number;
  endpoints: EndpointStat[];
  feed: FeedEvent[];
}

const METHOD_COLORS: Record<string, string> = {
  GET: "text-emerald-400",
  POST: "text-blue-400",
  PUT: "text-yellow-400",
  DELETE: "text-red-400",
  PATCH: "text-purple-400",
};

const STATUS_COLOR = (code: number) => {
  if (code < 300) return "text-emerald-400";
  if (code < 400) return "text-yellow-400";
  if (code < 500) return "text-orange-400";
  return "text-red-400";
};

function formatEndpoint(ep: string): string {
  // Shorten long dynamic segments for display
  return ep.replace(/\/api\/projects\/[^/]+\//, "/api/projects/:slug/");
}

function LatencyBar({ ms, max }: { ms: number; max: number }) {
  const pct = Math.min((ms / Math.max(max, 1)) * 100, 100);
  const color =
    ms < 100 ? "bg-emerald-500" : ms < 300 ? "bg-yellow-500" : "bg-red-500";
  return (
    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden w-24">
      <motion.div
        className={`h-full rounded-full ${color}`}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.4 }}
      />
    </div>
  );
}

export function LiveDashboard() {
  const [data, setData] = useState<MetricsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [pulse, setPulse] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchMetrics = useCallback(async () => {
    try {
      const res = await fetch("/api/metrics", { cache: "no-store" });
      if (!res.ok) return;
      const json: MetricsData = await res.json();
      setData(json);
      setLastUpdated(new Date());
      setPulse(true);
      setTimeout(() => setPulse(false), 600);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMetrics();
    intervalRef.current = setInterval(fetchMetrics, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchMetrics]);

  const maxEndpointCount = data
    ? Math.max(...data.endpoints.map((e) => e.count), 1)
    : 1;

  return (
    <section id="live-dashboard" className="w-full max-w-7xl mx-auto px-6 py-16 md:py-20">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="relative">
            <Activity className="w-5 h-5 text-emerald-400" />
            <motion.div
              className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full"
              animate={{ opacity: pulse ? [1, 0, 1] : 1 }}
              transition={{ duration: 0.6 }}
            />
          </div>
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
            Live System Monitor
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Esse portfólio é um{" "}
          <span className="text-emerald-400">backend real</span>
        </h2>
        <p className="text-white/50 text-sm max-w-xl">
          Cada interação gera eventos reais — armazenados no Neon (PostgreSQL), processados em Next.js serverless e expostos aqui em tempo real. Você está vendo o sistema funcionar.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center gap-3 text-white/30 text-sm font-mono">
          <RefreshCw className="w-4 h-4 animate-spin" />
          Conectando ao banco...
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* ── Column 1+2: Stats + Endpoints ── */}
          <div className="lg:col-span-2 flex flex-col gap-4">

            {/* KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                {
                  icon: <Zap className="w-4 h-4" />,
                  label: "Requests (5min)",
                  value: data?.totalRequests ?? 0,
                  color: "text-emerald-400",
                  suffix: "",
                },
                {
                  icon: <Activity className="w-4 h-4" />,
                  label: "Latência média",
                  value: data?.avgLatencyMs ?? 0,
                  color:
                    (data?.avgLatencyMs ?? 0) < 100
                      ? "text-emerald-400"
                      : (data?.avgLatencyMs ?? 0) < 300
                      ? "text-yellow-400"
                      : "text-red-400",
                  suffix: "ms",
                },
                {
                  icon: <AlertTriangle className="w-4 h-4" />,
                  label: "Taxa de erro",
                  value: data?.errorRate ?? 0,
                  color:
                    (data?.errorRate ?? 0) === 0
                      ? "text-emerald-400"
                      : "text-red-400",
                  suffix: "%",
                },
                {
                  icon: <Users className="w-4 h-4" />,
                  label: "Online agora",
                  value: data?.onlineNow ?? 0,
                  color: "text-blue-400",
                  suffix: "",
                },
              ].map((kpi) => (
                <motion.div
                  key={kpi.label}
                  className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4"
                  animate={pulse ? { borderColor: "rgba(52,211,153,0.3)" } : { borderColor: "rgba(255,255,255,0.06)" }}
                  transition={{ duration: 0.6 }}
                >
                  <div className={`${kpi.color} mb-2`}>{kpi.icon}</div>
                  <div className={`text-2xl font-bold font-mono ${kpi.color}`}>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={kpi.value}
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.25 }}
                      >
                        {kpi.value}{kpi.suffix}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  <div className="text-white/40 text-xs mt-1">{kpi.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Endpoint breakdown */}
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-white/70 text-sm font-medium">Endpoints mais chamados</span>
                <span className="text-white/30 text-xs font-mono">últimos 5 min</span>
              </div>
              {data && data.endpoints.length > 0 ? (
                <div className="space-y-3">
                  {data.endpoints.map((ep) => (
                    <div key={ep.endpoint} className="flex items-center gap-3">
                      <span className="font-mono text-xs text-white/50 w-48 truncate flex-shrink-0">
                        {formatEndpoint(ep.endpoint)}
                      </span>
                      <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-emerald-500/60 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${(ep.count / maxEndpointCount) * 100}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <span className="font-mono text-xs text-emerald-400 w-6 text-right">
                        {ep.count}
                      </span>
                      <LatencyBar ms={ep.avgLatencyMs} max={500} />
                      <span className="font-mono text-xs text-white/30 w-14 text-right">
                        {ep.avgLatencyMs}ms
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-white/30 text-sm font-mono">
                  Nenhuma chamada registrada ainda. Interaja com o site!
                </p>
              )}
            </div>

            {/* Architecture note */}
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
              <p className="text-white/50 text-xs font-mono leading-relaxed">
                <span className="text-emerald-400">// Como funciona:</span> cada chamada de API registra um{" "}
                <span className="text-white/70">ApiEvent</span> no Neon com método, endpoint, status HTTP e latência.{" "}
                <span className="text-white/70">/api/metrics</span> agrega esses eventos com{" "}
                <span className="text-white/70">groupBy + aggregate</span> do Prisma e retorna em{" "}
                <span className="text-emerald-400">&lt;100ms</span>.{" "}
                O frontend polling a cada <span className="text-white/70">5s</span>.
              </p>
            </div>
          </div>

          {/* ── Column 3: Live Event Feed ── */}
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 flex flex-col">
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-2 h-2 bg-emerald-400 rounded-full"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
                <span className="text-white/70 text-sm font-medium">Event Feed</span>
              </div>
              {lastUpdated && (
                <span className="text-white/25 text-xs font-mono">
                  {lastUpdated.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                </span>
              )}
            </div>

            <div className="flex-1 overflow-hidden relative min-h-[320px]">
              {data && data.feed.length > 0 ? (
                <div className="space-y-1.5 overflow-y-auto max-h-[420px] pr-1 scrollbar-thin">
                  <AnimatePresence initial={false}>
                    {data.feed.map((event) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-2 py-1.5 border-b border-white/[0.04] last:border-0"
                      >
                        <Circle
                          className={`w-1.5 h-1.5 flex-shrink-0 ${
                            event.statusCode >= 400 ? "fill-red-400 text-red-400" : "fill-emerald-400 text-emerald-400"
                          }`}
                        />
                        <span className={`font-mono text-xs w-10 flex-shrink-0 ${METHOD_COLORS[event.method] ?? "text-white/50"}`}>
                          {event.method}
                        </span>
                        <span className="font-mono text-xs text-white/40 flex-1 truncate">
                          {formatEndpoint(event.endpoint)}
                        </span>
                        <span className={`font-mono text-xs flex-shrink-0 ${STATUS_COLOR(event.statusCode)}`}>
                          {event.statusCode}
                        </span>
                        <span className="font-mono text-xs text-white/25 flex-shrink-0 w-12 text-right">
                          {event.latencyMs}ms
                        </span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full gap-3 py-8">
                  <motion.div
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <Activity className="w-8 h-8 text-white/20" />
                  </motion.div>
                  <p className="text-white/30 text-xs font-mono text-center">
                    Aguardando eventos...<br />
                    Abra um projeto ou jogue o quiz!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
