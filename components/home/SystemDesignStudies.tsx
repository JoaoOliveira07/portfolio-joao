'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { systemDesignStudies as studiesPt } from '@/data/system-design/pt';
import { systemDesignStudies as studiesEn } from '@/data/system-design/en';
import { SystemDesignModal } from '@/components/ui/SystemDesignModal';
import { MagicCard } from '@/components/ui/MagicCard';
import * as LucideIcons from 'lucide-react';

export function SystemDesignStudies() {
  const t = useTranslations('systemDesign');
  const locale = useLocale();
  const studies = locale === 'pt' ? studiesPt : studiesEn;
  
  const [selectedStudy, setSelectedStudy] = useState<typeof studies[0] | null>(null);

  return (
    <section className="w-full">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-5 bg-emerald-500 rounded-full flex-shrink-0" />
            <h2 className="text-2xl font-bold text-white">
              {t('title')}
            </h2>
          </div>
          <p className="text-sm text-gray-400 ml-6">
            {t('subtitle')}
          </p>
        </div>

        {/* Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {studies.map((study) => {
            const IconComponent = (LucideIcons as any)[study.icon];
            
            return (
              <MagicCard
                key={study.id}
                className="p-6 cursor-pointer h-full"
                gradientColor="#10b981"
              >
                <button
                  onClick={() => setSelectedStudy(study)}
                  className="w-full text-left flex flex-col h-full"
                >
                  <div className="flex flex-col gap-4">
                    {/* Icon + Category */}
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                        {IconComponent && <IconComponent className="w-6 h-6 text-emerald-400" />}
                      </div>
                      <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                        {study.category}
                      </span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-lg font-bold text-white leading-tight">
                      {study.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
                      {study.description}
                    </p>
                    
                    {/* Scale Info */}
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span>{study.estimatedScale}</span>
                    </div>
                    
                    {/* CTA */}
                    <span className="text-sm font-medium text-emerald-400 flex items-center gap-1 mt-auto">
                      {t('viewDetails')}
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </button>
              </MagicCard>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {selectedStudy && (
        <SystemDesignModal
          isOpen={!!selectedStudy}
          onClose={() => setSelectedStudy(null)}
          study={selectedStudy}
        />
      )}
    </section>
  );
}
