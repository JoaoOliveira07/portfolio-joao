'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Eye } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import type { Project } from '@/data/projects';

// Must match the header bar height below
const CARD_OFFSET = 52;
const SCROLL_PER_CARD = 480;
// Height of the fixed top nav — sticky cards offset by this so they don't hide under the nav
const NAV_HEIGHT = 80;

const IMAGE_MAP: Record<string, string> = {
  'segalas-ecommerce': '/images/projects/monolito.png',
  'ecommerce-front': '/images/projects/ecommerce1.png',
  'salesforce-mobile': '/images/projects/salesforce.png',
  backoffice: '/images/projects/backoffice1.png',
  'register-flow': '/images/projects/autocadastro1.png',
  'integration-platform': '/images/projects/integration.png',
  'offline-integrator': '/images/projects/offline.png',
  'infra-terraform': '/images/projects/infra1.png',
  commitclock: '/images/projects/commitclock1.png',
  'kira-semi-joias': '/images/projects/kira5.png',
  'finance-dashboard': '/images/projects/finance.png',
};

const CATEGORY_LABELS: Record<Project['category'], { pt: string; en: string }> = {
  monolith: { pt: 'Monolito', en: 'Monolith' },
  frontend: { pt: 'Frontend', en: 'Frontend' },
  admin: { pt: 'Admin', en: 'Admin' },
  mobile: { pt: 'Mobile', en: 'Mobile' },
  integration: { pt: 'Integração', en: 'Integration' },
  'event-driven': { pt: 'Event-Driven', en: 'Event-Driven' },
  iac: { pt: 'IaC', en: 'IaC' },
  sync: { pt: 'Sync', en: 'Sync' },
  automation: { pt: 'Automação', en: 'Automation' },
};

interface CardProps {
  project: Project;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  locale: 'pt' | 'en';
  viewCount?: number;
  onSelect: (p: Project) => void;
}

function ProjectStackCard({
  project,
  index,
  total,
  scrollYProgress,
  locale,
  viewCount,
  onSelect,
}: CardProps) {
  const t = useTranslations('projects');

  // Use brightness instead of opacity: keeps card fully opaque (no bleed-through from cards below)
  const filter = useTransform(scrollYProgress, (progress) => {
    const topCard = Math.max(0, Math.min(Math.floor(progress * total), total - 1));
    const depth = Math.max(0, topCard - index);
    return `brightness(${Math.max(0.45, 1 - depth * 0.1)})`;
  });

  const imageUrl = IMAGE_MAP[project.slug];
  const categoryLabel = CATEGORY_LABELS[project.category]?.[locale] ?? project.category;

  return (
    <motion.div
      style={{
        position: 'sticky',
        top: `${NAV_HEIGHT + index * CARD_OFFSET}px`,
        zIndex: index + 1,
        filter,
      }}
    >
      <div className="rounded-xl border border-white/10 bg-neutral-900 shadow-2xl overflow-hidden">
        {/*
          Header bar — exactly CARD_OFFSET (52px) tall.
          This is the only part visible when card is buried under subsequent cards.
          Shows a clean: index | category | title | year strip.
        */}
        <div
          className="flex items-center justify-between px-6 md:px-8 border-b border-white/8 bg-neutral-900"
          style={{ height: CARD_OFFSET }}
        >
          <div className="flex items-center gap-3 min-w-0 overflow-hidden">
            <span className="font-mono text-[11px] text-emerald-400/50 tracking-widest shrink-0">
              P/{String(index + 1).padStart(3, '0')}
            </span>
            <span className="text-[9px] font-bold tracking-widest bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 uppercase shrink-0">
              {categoryLabel}
            </span>
            <span className="text-sm font-semibold text-white/80 truncate">
              {project.title[locale]}
            </span>
          </div>
          <span className="font-mono text-[11px] text-neutral-600 shrink-0 ml-4">
            {project.year}
          </span>
        </div>

        {/* Card body — only fully visible when card is the active (topmost) one */}
        <div className="flex flex-col lg:flex-row">
          {/* Content */}
          <div className="flex-1 px-6 md:px-8 py-7 flex flex-col gap-5 min-h-[340px] lg:min-h-[380px]">
            <div>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight">
                {project.title[locale]}
              </h3>
              <p className="mt-2 text-neutral-400 text-sm leading-relaxed">
                {project.subtitle[locale]}
              </p>
            </div>

            <p className="text-neutral-300 text-sm leading-relaxed line-clamp-3">
              {project.description[locale]}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {project.techStack.slice(0, 6).map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] font-bold tracking-wider bg-white/5 text-neutral-400 px-2 py-1 rounded border border-white/10"
                >
                  {tech}
                </span>
              ))}
              {project.techStack.length > 6 && (
                <span className="text-[10px] text-neutral-600 px-2 py-1">
                  +{project.techStack.length - 6}
                </span>
              )}
            </div>

            <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
              <button
                type="button"
                onClick={() => onSelect(project)}
                className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 text-sm font-semibold transition-colors group"
              >
                {t('viewDetails')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              {viewCount !== undefined && (
                <div className="flex items-center gap-1 text-neutral-600 text-xs">
                  <Eye className="w-3 h-3" />
                  <span>{viewCount}</span>
                </div>
              )}
            </div>
          </div>

          {/* Screenshot — rounded-r-xl matches parent card's right corners */}
          {imageUrl ? (
            <div className="lg:w-[420px] relative overflow-hidden bg-neutral-950 min-h-[200px] lg:min-h-0 rounded-b-xl lg:rounded-b-none lg:rounded-r-xl">
              <Image
                src={imageUrl}
                alt={project.title[locale]}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 420px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent lg:bg-gradient-to-r lg:from-neutral-900/30 lg:to-transparent" />
            </div>
          ) : (
            <div className="lg:w-[420px] bg-neutral-950/20 flex items-center justify-center min-h-[140px] lg:min-h-0 rounded-b-xl lg:rounded-b-none lg:rounded-r-xl">
              <span className="font-mono text-xs text-neutral-700">{'// no preview'}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

interface Props {
  projects: Project[];
  viewsMap: Record<string, number>;
  onSelect: (p: Project) => void;
}

export function ProjectStackSection({ projects, viewsMap, onSelect }: Props) {
  const locale = useLocale() as 'pt' | 'en';
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  if (projects.length === 0) {
    return (
      <div className="text-center text-neutral-500 py-20 font-mono text-sm">
        {'// no projects'}
      </div>
    );
  }

  const containerHeight = projects.length * SCROLL_PER_CARD + 640;

  return (
    <div ref={containerRef} style={{ height: containerHeight }}>
      {projects.map((project, index) => (
        <ProjectStackCard
          key={project.slug}
          project={project}
          index={index}
          total={projects.length}
          scrollYProgress={scrollYProgress}
          locale={locale}
          viewCount={viewsMap[project.slug]}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
