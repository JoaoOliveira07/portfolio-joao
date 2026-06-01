"use client";

import { motion } from "framer-motion";
import { Activity, Terminal, Brain, ArrowRight, Beaker, BookOpen } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useLocale } from "next-intl";

const FEATURES = (locale: "pt" | "en") => [
  {
    icon: <Activity className="w-5 h-5" />,
    badge: locale === "pt" ? "Ao vivo" : "Live",
    badgeColor: "bg-emerald-500/20 text-emerald-400",
    title: "System Monitor",
    description:
      locale === "pt"
        ? "Métricas reais deste portfólio: requests, latência e event feed atualizando a cada 5 segundos."
        : "Real metrics from this portfolio: requests, latency and event feed updating every 5 seconds.",
  },
  {
    icon: <Terminal className="w-5 h-5" />,
    badge: "P1 Incident",
    badgeColor: "bg-red-500/20 text-red-400",
    title: "On-Call Simulator",
    description:
      locale === "pt"
        ? "São 3h da manhã. API de pagamentos com 34% de erro. Cada decisão que você toma muda as métricas."
        : "It's 3am. Payments API at 34% error rate. Every decision you make changes the metrics.",
  },
  {
    icon: <Brain className="w-5 h-5" />,
    badge: locale === "pt" ? "18 desafios" : "18 challenges",
    badgeColor: "bg-blue-500/20 text-blue-400",
    title: "Backend Challenges",
    description:
      locale === "pt"
        ? "Arquitetura, debug, complexidade e tradeoffs. Quiz com timer, pontuação e leaderboard global."
        : "Architecture, debug, complexity and tradeoffs. Quiz with timer, score and global leaderboard.",
  },
  {
    icon: <BookOpen className="w-5 h-5" />,
    badge: locale === "pt" ? "6 insights" : "6 insights",
    badgeColor: "bg-purple-500/20 text-purple-400",
    title: "Today I Learned",
    description:
      locale === "pt"
        ? "Aprendizados técnicos reais do dia a dia — coisas que me surpreenderam ou mudaram como penso sobre sistemas."
        : "Real technical learnings from day-to-day work — things that surprised me or changed how I think about systems.",
  },
];

export function LabTeaser() {
  const params = useParams();
  const lang = (params?.lang as string) ?? "pt";
  const locale = useLocale() as "pt" | "en";
  const features = FEATURES(locale);

  return (
    <section className="w-full max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-20">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <Beaker className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
            Backend Lab
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
          {locale === "pt" ? (
            <>Engenharia real, <span className="text-emerald-400">não só slides</span></>
          ) : (
            <>Real engineering, <span className="text-emerald-400">not just slides</span></>
          )}
        </h2>
        <p className="text-white/50 text-sm max-w-xl">
          {locale === "pt"
            ? "Quatro experiências interativas que mostram como um engenheiro backend pensa: métricas ao vivo, simulador de incidente, desafios de arquitetura e aprendizados técnicos reais."
            : "Four interactive experiences showing how a backend engineer thinks: live metrics, incident simulator, architecture challenges and real technical learnings."}
        </p>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {features.map((feat, i) => (
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
        {locale === "pt" ? "Abrir o Backend Lab" : "Open the Backend Lab"}
        <ArrowRight className="w-4 h-4" />
      </Link>
    </section>
  );
}
