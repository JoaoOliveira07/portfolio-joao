'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/data/projects';
import { ProjectModal } from '@/components/ui/ProjectModal';
import { ProjectStackSection } from '@/components/home/ProjectStackSection';

export function FeaturedProjects() {
  const t = useTranslations('projects');
  const locale = useLocale() as 'pt' | 'en';
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);
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

        {/* Tabs */}
        <div className="flex gap-1 mb-12 p-1 bg-white/5 rounded-lg w-fit border border-white/10">
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

        {/* Stack */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 64 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
          >
            <ProjectStackSection
              projects={filtered}
              viewsMap={viewsMap}
              onSelect={setSelectedProject}
            />
          </motion.div>
        </AnimatePresence>
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
