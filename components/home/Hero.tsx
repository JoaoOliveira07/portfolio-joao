'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ArrowRight, Download, Linkedin } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { profile } from '@/data/profile';

const LINKEDIN_URL = profile.linkedin;

export function Hero() {
  const t = useTranslations('hero');
  const reduceMotion = useReducedMotion();

  // entrada suave, em sequência (desligada se o usuário pede menos movimento)
  const rise = (delay: number) =>
    reduceMotion
      ? {}
      : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: 'easeOut' as const, delay } };

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-neutral-950">
      {/* fundo: grade discreta + um único brilho quente atrás do cartão */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(rgb(255,255,255) 1px, transparent 1px), linear-gradient(90deg, rgb(255,255,255) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />
      <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full bg-emerald-400/[0.05] blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8 pt-32 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-14 lg:gap-16 items-center">
          {/* esquerda: quem é */}
          <div>
            <motion.p {...rise(0)} className="font-mono text-xs md:text-sm uppercase tracking-[0.25em] text-emerald-400 mb-5">
              {t('eyebrow')}
            </motion.p>

            <motion.h1
              {...rise(0.08)}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter text-white leading-[1.02] mb-6"
            >
              {t('name')}
            </motion.h1>

            <motion.p {...rise(0.16)} className="text-lg md:text-xl text-neutral-300 leading-relaxed max-w-xl mb-4">
              {t('tagline')}
            </motion.p>

            <motion.p {...rise(0.22)} className="font-mono text-sm text-neutral-500 mb-10">
              {t('description')}
            </motion.p>

            <motion.div {...rise(0.3)} className="flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                onClick={(e) => scrollTo(e, 'projects')}
                className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-emerald-400 text-neutral-950 font-semibold hover:bg-emerald-300 transition-colors"
              >
                {t('cta.projects')}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={t('cvUrl')}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 h-12 px-5 rounded-xl border border-white/15 text-white font-semibold hover:bg-white/5 hover:border-white/30 transition-colors"
              >
                <Download className="h-4 w-4" />
                {t('cta.cv')}
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-12 px-5 rounded-xl border border-white/15 text-white font-semibold hover:bg-white/5 hover:border-white/30 transition-colors"
              >
                <Linkedin className="h-4 w-4" />
                {t('cta.linkedin')}
              </a>
            </motion.div>
          </div>

          {/* direita: o modo RPG como vitrine */}
          <motion.a
            {...rise(0.2)}
            href="/api/mode?mode=rpg"
            className="group relative block rounded-2xl border border-white/10 bg-[#070d16] overflow-hidden shadow-2xl shadow-black/50 hover:border-emerald-400/50 transition-colors"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src="/images/rpg-preview.webp"
                alt="Prévia do JOPES.EXE: a cidade isométrica do portfólio"
                fill
                priority
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover scale-[1.04] group-hover:scale-[1.09] transition-transform duration-[1200ms] ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070d16] via-[#070d16]/20 to-transparent" />
              <span className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-black/60 backdrop-blur px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {t('rpg.label')}
              </span>
            </div>
            <div className="relative -mt-12 px-6 pb-6">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2">{t('rpg.title')}</h2>
              <p className="text-sm text-neutral-400 leading-relaxed mb-5 max-w-md">{t('rpg.text')}</p>
              <span className="inline-flex items-center gap-2 font-semibold text-emerald-400">
                {t('rpg.cta')}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
