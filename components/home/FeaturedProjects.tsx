'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import {
  ArrowRight,
  Eye,
  Server,
  Smartphone,
  Globe,
  LayoutDashboard,
  Plug,
  Workflow,
  Cloud,
  RefreshCw,
  Bot,
  Network,
} from 'lucide-react';
import { projects, type Project } from '@/data/projects';
import { ProjectModal } from '@/components/ui/ProjectModal';
import { MagicCard } from '@/components/ui/MagicCard';

const categoryIcons: Record<Project['category'], typeof Server> = {
  monolith: Server,
  frontend: Globe,
  admin: LayoutDashboard,
  mobile: Smartphone,
  integration: Plug,
  'event-driven': Workflow,
  iac: Cloud,
  sync: RefreshCw,
  automation: Bot,
};

const categoryLabels: Record<Project['category'], { pt: string; en: string }> = {
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

const fallbackIcon = Network;

export function FeaturedProjects() {
  const t = useTranslations('projects');
  const locale = useLocale() as 'pt' | 'en';
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [viewsMap, setViewsMap] = useState<Record<string, number>>({});
  const [activeTab, setActiveTab] = useState<'professional' | 'personal'>('professional');

  const fetchAllViews = useCallback(async () => {
    try {
      const res = await fetch('/api/projects/views');
      if (res.ok) {
        const data = await res.json();
        const map: Record<string, number> = {};
        for (const item of data.views) {
          map[item.slug] = item.views;
        }
        setViewsMap(map);
      }
    } catch {
      // non-critical
    }
  }, []);

  useEffect(() => {
    fetchAllViews();
  }, [fetchAllViews]);

  const handleSelect = (project: Project) => {
    setSelectedProject(project);
  };

  const filtered = projects.filter((p) => p.type === activeTab);

  return (
    <section className="py-20 md:py-32" id="projects">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex justify-between items-end mb-10 md:mb-16">
          <div>
            <span className="text-emerald-400 font-bold tracking-widest text-xs uppercase">Portfolio</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mt-3 md:mt-4">
              {t('title')}
            </h2>
          </div>
        </div>

        <div className="flex gap-1 mb-8 p-1 bg-white/5 rounded-lg w-fit border border-white/10">
          <button
            type="button"
            onClick={() => setActiveTab('professional')}
            className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${
              activeTab === 'professional'
                ? 'bg-emerald-500 text-white shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {locale === 'pt' ? 'Profissional' : 'Professional'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('personal')}
            className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${
              activeTab === 'personal'
                ? 'bg-emerald-500 text-white shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {locale === 'pt' ? 'Pessoal' : 'Personal'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 auto-rows-fr">
          {filtered.map((project) => {
            const Icon = categoryIcons[project.category] ?? fallbackIcon;
            return (
              <MagicCard
                key={project.slug}
                className="cursor-pointer h-full"
                gradientColor="#10b981"
              >
                <button
                  type="button"
                  onClick={() => handleSelect(project)}
                  aria-label={`${project.title[locale]} — ${project.subtitle[locale]}`}
                  className="text-left p-5 md:p-6 w-full h-full flex flex-col gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-xl"
                >
                  {/* Header: icon + category + year */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="w-5 h-5 text-emerald-400" aria-hidden />
                      <span className="text-[10px] font-bold tracking-widest bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded border border-emerald-500/20 uppercase">
                        {categoryLabels[project.category][locale]}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-gray-500">{project.year}</span>
                  </div>

                  {/* Title + subtitle (fixed heights) */}
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-lg md:text-xl font-bold text-white leading-tight line-clamp-2 min-h-[3.5rem]">
                      {project.title[locale]}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed min-h-[2.5rem]">
                      {project.subtitle[locale]}
                    </p>
                  </div>

                  {/* Tech stack (capped at 4 + counter) */}
                  <div className="flex flex-wrap gap-1.5 min-h-[3.25rem] content-start">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[9px] font-bold tracking-wider bg-emerald-500/15 text-emerald-400 px-2 py-1 rounded border border-emerald-500/25"
                      >
                        {tech.toUpperCase()}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="text-[9px] font-bold tracking-wider text-gray-500 px-2 py-1">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Footer pinned bottom */}
                  <div className="mt-auto pt-3 flex items-center justify-between border-t border-white/5">
                    <span className="flex items-center text-emerald-400 text-sm font-medium">
                      <span>{t('viewDetails')}</span>
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                    {viewsMap[project.slug] !== undefined && (
                      <div className="flex items-center gap-1 text-gray-500 text-xs">
                        <Eye className="w-3 h-3" />
                        <span>{viewsMap[project.slug]}</span>
                      </div>
                    )}
                  </div>
                </button>
              </MagicCard>
            );
          })}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          project={selectedProject}
        />
      )}
    </section>
  );
}
