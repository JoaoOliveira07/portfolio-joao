"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Terminal, Brain, ArrowLeft, Beaker } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { LiveDashboard } from "@/components/home/LiveDashboard";
import { IncidentSimulator } from "@/components/home/IncidentSimulator";
import { BackendChallenges } from "@/components/home/BackendChallenges";

type Tab = "dashboard" | "incident" | "challenges";

const TABS: { id: Tab; label: string; icon: React.ReactNode; badge?: string }[] = [
  {
    id: "dashboard",
    label: "System Monitor",
    icon: <Activity className="w-4 h-4" />,
    badge: "Ao vivo",
  },
  {
    id: "incident",
    label: "On-Call Simulator",
    icon: <Terminal className="w-4 h-4" />,
    badge: "P1",
  },
  {
    id: "challenges",
    label: "Backend Challenges",
    icon: <Brain className="w-4 h-4" />,
  },
];

export function LabPage() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const params = useParams();
  const lang = (params?.lang as string) ?? "pt";

  return (
    <div className="min-h-screen bg-neutral-950 pt-24 pb-16">
      {/* Back link */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <Link
          href={`/${lang}`}
          className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao portfólio
        </Link>
      </div>

      {/* Hero header */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-emerald-500/10 border border-emerald-500/20 p-2 rounded-lg">
            <Beaker className="w-5 h-5 text-emerald-400" />
          </div>
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
            Backend Lab
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
          Engenharia real,{" "}
          <span className="text-emerald-400">não só slides</span>
        </h1>
        <p className="text-white/50 text-base max-w-2xl leading-relaxed">
          Três experiências interativas que mostram como um engenheiro backend pensa: métricas ao vivo de um sistema em produção, tomada de decisão sob incidente e raciocínio sobre arquitetura.
        </p>
      </div>

      {/* Tab bar */}
      <div className="max-w-7xl mx-auto px-6 mb-2">
        <div className="flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-xl p-1 w-fit">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-white"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-white/[0.08] rounded-lg"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {tab.icon}
                {tab.label}
                {tab.badge && (
                  <span
                    className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      tab.badge === "Ao vivo"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : tab.badge === "P1"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
        >
          {activeTab === "dashboard" && <LiveDashboard />}
          {activeTab === "incident" && <IncidentSimulator />}
          {activeTab === "challenges" && (
            <div className="max-w-7xl mx-auto">
              <BackendChallenges />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
