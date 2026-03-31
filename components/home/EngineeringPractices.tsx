'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { engineeringPractices as practicesPt } from '@/data/engineering-practices/pt';
import { engineeringPractices as practicesEn } from '@/data/engineering-practices/en';
import { EngineeringPracticeModal } from '@/components/ui/EngineeringPracticeModal';
import { MagicCard } from '@/components/ui/MagicCard';
import * as LucideIcons from 'lucide-react';

export function EngineeringPractices() {
  const t = useTranslations('engineeringPractices');
  const locale = useLocale();
  const practices = locale === 'pt' ? practicesPt : practicesEn;
  
  const [selectedPractice, setSelectedPractice] = useState<typeof practices[0] | null>(null);

  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-emerald-400 font-bold tracking-widest text-xs uppercase">
            {t('title')}
          </span>
          <p className="text-gray-400 mt-3">
            {t('subtitle')}
          </p>
        </div>

        {/* Practices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {practices.map((practice) => {
            const IconComponent = (LucideIcons as any)[practice.icon];
            
            return (
              <MagicCard
                key={practice.id}
                className="p-6 cursor-pointer h-full"
                gradientColor="#10b981"
              >
                <button
                  onClick={() => setSelectedPractice(practice)}
                  className="w-full text-left flex flex-col h-full"
                >
                  <div className="flex flex-col gap-4 flex-grow">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                      {IconComponent && <IconComponent className="w-6 h-6 text-emerald-400" />}
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-lg font-bold text-white leading-tight">
                      {practice.title}
                    </h3>
                    
                    {/* Short Description */}
                    <p className="text-sm text-gray-400 leading-relaxed line-clamp-3 flex-grow">
                      {practice.shortDescription}
                    </p>
                    
                    {/* CTA */}
                    <span className="text-sm font-medium text-emerald-400 flex items-center gap-1 mt-auto">
                      {t('learnMore')}
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
      {selectedPractice && (
        <EngineeringPracticeModal
          isOpen={!!selectedPractice}
          onClose={() => setSelectedPractice(null)}
          practice={selectedPractice}
        />
      )}
    </section>
  );
}
