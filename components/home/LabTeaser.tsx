"use client";

import { motion } from "framer-motion";
import { Activity, Terminal, Brain, ArrowRight, Beaker } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const FEATURES = [
  {
    icon: <Activity className="w-5 h-5" />,
    badge: "Ao vivo",
    badgeColor: "bg-emerald-500/20 text-emerald-400",
    title: "System Monitor",
    description:
      "Métricas reais deste portfólio: requests, latência e event feed atualizando a cada 5 segundos.",
  },
  {
    icon: <Terminal className="w-5 h-5" />,
    badge: "P1 Incident",
    badgeColor: "bg-red-500/20 text-red-400",
    title: "On-Call Simulator",
    description:
      "São 3h da manhã. API de pagamentos com 34% de erro. Cada decisão que você toma muda as métricas.",
  },
  {
    icon: <Brain className="w-5 h-5" />,
    badge: "13 desafios",
    badgeColor: "bg-blue-500/20 text-blue-400",
    title: "Backend Challenges",
    description:
      "Arquitetura, debug, complexidade e tradeoffs. Quiz com timer, pontuação e leaderboard global.",
  },
];

export function LabTeaser() {
  const params = useParams();
  const lang = (params?.lang as string) ?? "pt";

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-16 md:py-20">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <Beaker className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
            Backend Lab
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Engenharia real,{" "}
          <span className="text-emerald-400">não só slides</span>
        </h2>
        <p className="text-white/50 text-sm max-w-xl">
          Três experiências interativas que mostram como um engenheiro backend pensa. Métricas ao vivo, incidente P1 e desafios de arquitetura.
        </p>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {FEATURES.map((feat, i) => (
          <motion.div
            key={feat.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 hover:border-white/20 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-white/40">{feat.icon}</div>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${feat.badgeColor}`}>
                {feat.badge}
              </span>
            </div>
            <div className="font-semibold text-white text-sm mb-2">{feat.title}</div>
            <p className="text-white/40 text-xs leading-relaxed">{feat.description}</p>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <Link
        href={`/${lang}/lab`}
        className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
      >
        Abrir o Backend Lab
        <ArrowRight className="w-4 h-4" />
      </Link>
    </section>
  );
}
