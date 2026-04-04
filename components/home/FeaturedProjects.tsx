'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { ArrowRight, Eye } from 'lucide-react';
import { projects as projectsPt } from '@/data/projects/pt';
import { projects as projectsEn } from '@/data/projects/en';
import type { Project } from '@/data/projects/pt';
import { ProjectModal } from '@/components/ui/ProjectModal';
import { MagicCard } from '@/components/ui/MagicCard';

const projectImages: Record<string, string> = {
  'iac-terraform-aws': '/images/projects/iac_terraform_v1_1.png',
  'pipeline-event-driven': '/images/projects/event_driven_pipeline_v1_1.png',
  'arquitetura-integracao-hibrida': '/images/projects/hybrid_integration_v1_1.png',
  'integradora-offline-online': '/images/projects/offline_online_sync_v1_1.png',
  'sistema-cadastro-ocr': '/images/projects/ocr_automation_v1_1.png',
  'sistema-rca-monolito': '/images/projects/modular_monolith_v1_1.png',
};

export function FeaturedProjects() {
  const t = useTranslations('projects');
  const locale = useLocale();
  const projects = locale === 'pt' ? projectsPt : projectsEn;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [viewsMap, setViewsMap] = useState<Record<string, number>>({});

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project) => (
            <MagicCard
              key={project.slug}
              className="overflow-hidden cursor-pointer h-full"
              gradientColor="#10b981"
            >
              <div 
                className="relative aspect-video overflow-hidden bg-neutral-800"
                onClick={() => setSelectedProject(project)}
              >
                <Image
                  src={projectImages[project.slug] || '/images/projects/iac_terraform_v1_1.png'}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
              </div>
              
              <div className="p-4 md:p-5">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-[9px] font-bold tracking-widest bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded border border-emerald-500/30"
                    >
                      {tech.toUpperCase()}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-lg font-bold mb-1 text-white">{project.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-2">{project.subtitle}</p>
                
                <div className="mt-3 flex items-center justify-between">
                  <div 
                    className="flex items-center text-emerald-400 text-sm font-medium group-hover:translate-x-2 transition-transform duration-200 cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <span>View details</span>
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                  {viewsMap[project.slug] !== undefined && (
                    <div className="flex items-center gap-1 text-gray-500 text-xs">
                      <Eye className="w-3 h-3" />
                      <span>{viewsMap[project.slug]}</span>
                    </div>
                  )}
                </div>
              </div>
            </MagicCard>
          ))}
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
