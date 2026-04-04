"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, CheckCircle, XCircle, ChevronRight, RotateCcw, Terminal, Clock, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { INCIDENTS, type Incident, type IncidentStep } from "@/data/incidents";

// ─── Types ───────────────────────────────────────────────────────────────────

type SimState = "idle" | "briefing" | "step" | "result" | "rca";

interface StepResult {
  stepId: string;
  chosenIndex: number;
  isCorrect: boolean;
}

interface LiveMetrics {
  latencyMs: number;
  errorRate: number;
  throughput: number;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function SeverityBadge({ severity }: { severity: "critical" | "warning" | "info" }) {
  const config = {
    critical: { color: "bg-red-500/20 text-red-400 border-red-500/30", label: "CRITICAL" },
    warning:  { color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", label: "WARNING" },
    info:     { color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", label: "RESOLVED" },
  };
  const c = config[severity];
  return (
    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${c.color}`}>
      {c.label}
    </span>
  );
}

function MetricsDelta({ label, value, unit, trend }: { label: string; value: number; unit: string; trend: "up-bad" | "up-good" | "down-bad" | "down-good" | "neutral" }) {
  const colorMap = {
    "up-bad": "text-red-400",
    "up-good": "text-emerald-400",
    "down-bad": "text-red-400",
    "down-good": "text-emerald-400",
    neutral: "text-white/50",
  };
  const Icon = trend === "neutral" ? Minus : trend.startsWith("up") ? TrendingUp : TrendingDown;
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`flex items-center gap-1 ${colorMap[trend]}`}>
        <Icon className="w-3 h-3" />
        <span className="font-mono text-sm font-bold">{value}{unit}</span>
      </div>
      <span className="text-white/30 text-xs">{label}</span>
    </div>
  );
}

function LogTerminal({ logs, animate }: { logs: string[]; animate?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(animate ? 0 : logs.length);

  useEffect(() => {
    if (!animate) { setVisibleCount(logs.length); return; }
    setVisibleCount(0);
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setVisibleCount(i);
      if (i >= logs.length) clearInterval(timer);
    }, 200);
    return () => clearInterval(timer);
  }, [logs, animate]);

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [visibleCount]);

  const getLogColor = (line: string) => {
    if (line.includes("ERROR")) return "text-red-400";
    if (line.includes("WARN")) return "text-yellow-400";
    if (line.includes("INFO")) return "text-emerald-400";
    if (line.includes("[EXPLAIN]")) return "text-blue-300";
    if (line.includes("[pg_stat")) return "text-purple-300";
    return "text-white/60";
  };

  return (
    <div
      ref={ref}
      className="bg-black/60 border border-white/10 rounded-lg p-4 font-mono text-xs leading-relaxed overflow-y-auto max-h-48 scrollbar-thin"
    >
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
        </div>
        <span className="text-white/30 text-xs">production-logs — tail -f app.log</span>
      </div>
      {logs.slice(0, visibleCount).map((line, i) => (
        <motion.div
          key={i}
          initial={animate ? { opacity: 0, x: -4 } : { opacity: 1 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.15 }}
          className={getLogColor(line)}
        >
          {line}
        </motion.div>
      ))}
      {visibleCount < logs.length && (
        <span className="text-white/20 animate-pulse">▌</span>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function IncidentSimulator() {
  const incident = INCIDENTS[0]; // single incident for now

  const [state, setState] = useState<SimState>("idle");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [results, setResults] = useState<StepResult[]>([]);
  const [chosenOption, setChosenOption] = useState<number | null>(null);
  const [metrics, setMetrics] = useState<LiveMetrics>({
    latencyMs: 120,
    errorRate: 0.1,
    throughput: 890,
  });

  const currentStep: IncidentStep | undefined = incident.steps[currentStepIndex];
  const correctCount = results.filter((r) => r.isCorrect).length;
  const totalSteps = incident.steps.length;

  function startIncident() {
    setCurrentStepIndex(0);
    setResults([]);
    setChosenOption(null);
    setMetrics({ latencyMs: 120, errorRate: 0.1, throughput: 890 });
    setState("briefing");
  }

  function beginStep() {
    setState("step");
  }

  function chooseOption(index: number) {
    if (chosenOption !== null || !currentStep) return;
    const option = currentStep.options[index];
    setChosenOption(index);

    if (option.metricsDelta) {
      setMetrics((prev) => ({
        latencyMs: option.metricsDelta?.latencyMs ?? prev.latencyMs,
        errorRate: option.metricsDelta?.errorRate ?? prev.errorRate,
        throughput: option.metricsDelta?.throughput ?? prev.throughput,
      }));
    }

    setResults((prev) => [
      ...prev,
      { stepId: currentStep!.id, chosenIndex: index, isCorrect: option.isCorrect },
    ]);

    setState("result");
  }

  function nextStep() {
    if (currentStepIndex + 1 < totalSteps) {
      setCurrentStepIndex((i) => i + 1);
      setChosenOption(null);
      setState("step");
    } else {
      setState("rca");
    }
  }

  function reset() {
    setState("idle");
    setCurrentStepIndex(0);
    setResults([]);
    setChosenOption(null);
    setMetrics({ latencyMs: 120, errorRate: 0.1, throughput: 890 });
  }

  return (
    <section id="incident-simulator" className="w-full max-w-7xl mx-auto px-6 py-16 md:py-20">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <Terminal className="w-5 h-5 text-red-400" />
          <span className="text-xs font-mono text-red-400 uppercase tracking-widest">
            On-Call Simulator
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
          São 3h da manhã.{" "}
          <span className="text-red-400">O sistema caiu.</span>
        </h2>
        <p className="text-white/50 text-sm max-w-xl">
          Cada decisão que você tomar vai alterar as métricas do sistema ao vivo. Veja como um engenheiro backend pensa sob pressão — da detecção ao RCA.
        </p>
      </div>

      <AnimatePresence mode="wait">

        {/* ── IDLE ── */}
        {state === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 flex flex-col md:flex-row items-start md:items-center gap-6"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-mono font-bold px-2 py-1 rounded">
                  {incident.severity}
                </span>
                <span className="text-white/40 text-sm font-mono">{incident.id}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{incident.title}</h3>
              <p className="text-white/50 text-sm">{incident.subtitle}</p>
              <p className="text-white/30 text-xs mt-3 font-mono">
                {totalSteps} decisões críticas · Sistema de pagamentos · Nível: Pleno → Sênior
              </p>
            </div>
            <button
              onClick={startIncident}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm flex-shrink-0"
            >
              <AlertTriangle className="w-4 h-4" />
              Atender o PagerDuty
            </button>
          </motion.div>
        )}

        {/* ── BRIEFING ── */}
        {state === "briefing" && (
          <motion.div
            key="briefing"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="space-y-4"
          >
            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <motion.div
                  className="w-2.5 h-2.5 bg-red-500 rounded-full"
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                />
                <span className="text-red-400 font-mono text-sm font-bold">PAGERDUTY ALERT — {incident.severity}</span>
              </div>
              <p className="text-white/80 text-sm leading-relaxed mb-6">{incident.scenario}</p>

              {/* Initial metrics */}
              <div className="bg-black/40 rounded-xl p-4 mb-6">
                <div className="text-white/40 text-xs font-mono mb-3">📊 Métricas atuais (Datadog)</div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold font-mono text-red-400">8247ms</div>
                    <div className="text-white/30 text-xs">P99 Latency</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold font-mono text-red-400">34%</div>
                    <div className="text-white/30 text-xs">Error Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold font-mono text-red-400">35 req/s</div>
                    <div className="text-white/30 text-xs">Throughput</div>
                  </div>
                </div>
              </div>

              <button
                onClick={beginStep}
                className="flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-lg hover:bg-white/90 transition-colors text-sm"
              >
                Iniciar investigação
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* ── STEP ── */}
        {state === "step" && currentStep && (
          <motion.div
            key={`step-${currentStep.id}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Progress */}
            <div className="flex items-center gap-3">
              {incident.steps.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    i < currentStepIndex
                      ? "bg-emerald-500"
                      : i === currentStepIndex
                      ? "bg-white/60"
                      : "bg-white/10"
                  }`}
                />
              ))}
              <span className="text-white/30 text-xs font-mono flex-shrink-0">
                {currentStepIndex + 1}/{totalSteps}
              </span>
            </div>

            {/* Alert */}
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                  currentStep.alert.severity === "critical" ? "text-red-400" :
                  currentStep.alert.severity === "warning" ? "text-yellow-400" : "text-emerald-400"
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <SeverityBadge severity={currentStep.alert.severity} />
                    <span className="font-mono text-xs text-white/50">{currentStep.alert.timestamp}</span>
                  </div>
                  <div className="font-mono text-sm text-white/80 font-medium">{currentStep.alert.title}</div>
                  <div className="font-mono text-xs text-white/40 mt-0.5">{currentStep.alert.message}</div>
                </div>
              </div>
            </div>

            {/* Logs */}
            <LogTerminal logs={currentStep.logs} animate />

            {/* Live metrics */}
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-3.5 h-3.5 text-white/30" />
                <span className="text-white/30 text-xs font-mono">Métricas ao vivo</span>
              </div>
              <div className="flex items-center justify-around">
                <MetricsDelta
                  label="P99 Latency"
                  value={metrics.latencyMs}
                  unit="ms"
                  trend={metrics.latencyMs > 500 ? "up-bad" : "down-good"}
                />
                <MetricsDelta
                  label="Error Rate"
                  value={metrics.errorRate}
                  unit="%"
                  trend={metrics.errorRate > 5 ? "up-bad" : metrics.errorRate < 1 ? "down-good" : "neutral"}
                />
                <MetricsDelta
                  label="Throughput"
                  value={metrics.throughput}
                  unit=" req/s"
                  trend={metrics.throughput > 500 ? "up-good" : "down-bad"}
                />
              </div>
            </div>

            {/* Question */}
            <div className="space-y-3">
              <p className="text-white/80 text-sm font-medium leading-relaxed">{currentStep.question}</p>
              <div className="grid gap-2">
                {currentStep.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => chooseOption(i)}
                    className="text-left w-full bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] hover:border-white/20 rounded-xl px-4 py-3 text-sm text-white/70 hover:text-white transition-all"
                  >
                    <span className="font-mono text-white/30 mr-2">{String.fromCharCode(65 + i)}.</span>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── RESULT ── */}
        {state === "result" && currentStep && chosenOption !== null && (
          <motion.div
            key={`result-${currentStep.id}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="space-y-4"
          >
            {/* Consequence */}
            <div className={`border rounded-xl p-5 ${
              currentStep.options[chosenOption].isCorrect
                ? "bg-emerald-500/10 border-emerald-500/30"
                : "bg-red-500/10 border-red-500/30"
            }`}>
              <div className="flex items-start gap-3">
                {currentStep.options[chosenOption].isCorrect ? (
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <div className={`font-semibold text-sm mb-1 ${
                    currentStep.options[chosenOption].isCorrect ? "text-emerald-400" : "text-red-400"
                  }`}>
                    {currentStep.options[chosenOption].isCorrect ? "Boa decisão" : "Decisão subótima"}
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {currentStep.options[chosenOption].consequence}
                  </p>
                </div>
              </div>
            </div>

            {/* Updated metrics */}
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-white/40 text-xs font-mono">📊 Sistema após sua decisão:</span>
              </div>
              <div className="flex items-center justify-around">
                <MetricsDelta
                  label="P99 Latency"
                  value={metrics.latencyMs}
                  unit="ms"
                  trend={metrics.latencyMs > 500 ? "up-bad" : "down-good"}
                />
                <MetricsDelta
                  label="Error Rate"
                  value={metrics.errorRate}
                  unit="%"
                  trend={metrics.errorRate > 5 ? "up-bad" : metrics.errorRate < 1 ? "down-good" : "neutral"}
                />
                <MetricsDelta
                  label="Throughput"
                  value={metrics.throughput}
                  unit=" req/s"
                  trend={metrics.throughput > 500 ? "up-good" : "down-bad"}
                />
              </div>
            </div>

            {/* Learning */}
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4">
              <div className="text-white/40 text-xs font-mono mb-2">// Lição</div>
              <p className="text-white/60 text-sm leading-relaxed">{currentStep.learning}</p>
            </div>

            <button
              onClick={nextStep}
              className="flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-lg hover:bg-white/90 transition-colors text-sm"
            >
              {currentStepIndex + 1 < totalSteps ? "Próxima decisão" : "Ver RCA completo"}
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* ── RCA ── */}
        {state === "rca" && (
          <motion.div
            key="rca"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="space-y-6"
          >
            {/* Score */}
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold font-mono text-white mb-1">
                {correctCount}/{totalSteps}
              </div>
              <div className="text-white/40 text-sm mb-4">decisões corretas</div>
              <div className={`text-sm font-medium ${
                correctCount === totalSteps
                  ? "text-emerald-400"
                  : correctCount >= 2
                  ? "text-yellow-400"
                  : "text-red-400"
              }`}>
                {correctCount === totalSteps
                  ? "Excelente. Raciocínio de engenheiro sênior."
                  : correctCount >= 2
                  ? "Bom instinto. Algumas decisões podem ser refinadas."
                  : "Cada incidente ensina. Revise as lições acima."}
              </div>
            </div>

            {/* RCA Document */}
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 space-y-5">
              <div className="flex items-center gap-2">
                <span className="text-white/40 text-xs font-mono">POST-MORTEM — BLAMELESS RCA</span>
              </div>

              <div>
                <div className="text-white/40 text-xs font-mono mb-2">CAUSA RAIZ</div>
                <p className="text-white/70 text-sm leading-relaxed">{incident.rca.rootCause}</p>
              </div>

              <div>
                <div className="text-white/40 text-xs font-mono mb-2">LINHA DO TEMPO</div>
                <div className="space-y-2">
                  {incident.rca.timeline.map((t, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="font-mono text-xs text-emerald-400 w-12 flex-shrink-0">{t.time}</span>
                      <span className="text-white/60 text-xs leading-relaxed">{t.event}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
                  <div className="text-emerald-400 text-xs font-mono mb-2">FIX APLICADO</div>
                  <p className="text-white/60 text-xs leading-relaxed">{incident.rca.fix}</p>
                </div>
                <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4">
                  <div className="text-blue-400 text-xs font-mono mb-2">PREVENÇÃO FUTURA</div>
                  <p className="text-white/60 text-xs leading-relaxed">{incident.rca.prevention}</p>
                </div>
              </div>
            </div>

            <button
              onClick={reset}
              className="flex items-center gap-2 bg-white/[0.06] hover:bg-white/10 border border-white/10 text-white/70 hover:text-white font-medium px-6 py-3 rounded-lg transition-all text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              Jogar novamente
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
