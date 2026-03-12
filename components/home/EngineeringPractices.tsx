'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { engineeringPractices as practicesPt } from '@/data/engineering-practices/pt';
import { engineeringPractices as practicesEn } from '@/data/engineering-practices/en';
import { EngineeringPracticeModal } from '@/components/ui/EngineeringPracticeModal';
import { IconContainer } from '@/components/ui/IconContainer';
import { Stagger, StaggerItem } from '@/components/ui/Animations';
import * as LucideIcons from 'lucide-react';

export function EngineeringPractices() {
  const t = useTranslations('engineeringPractices');
  const locale = useLocale();
  const practices = locale === 'pt' ? practicesPt : practicesEn;
  
  const [selectedPractice, setSelectedPractice] = useState<typeof practices[0] | null>(null);

  return (
    <section className="w-full">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-5 bg-primary-500 rounded-full flex-shrink-0" />
            <h2 className="text-2xl font-bold text-neutral-900">
              {t('title')}
            </h2>
          </div>
          <p className="text-sm text-neutral-500 ml-6">
            {t('subtitle')}
          </p>
        </div>

        {/* Practices Grid */}
        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {practices.map((practice) => {
            const IconComponent = (LucideIcons as any)[practice.icon];
            
            return (
              <StaggerItem key={practice.id}>
                <button
                  onClick={() => setSelectedPractice(practice)}
                  className="w-full p-6 bg-white rounded-2xl border border-neutral-200 hover:border-primary/30 hover:shadow-lg transition-all duration-300 text-left group flex flex-col h-full cursor-pointer"
                >
                  <div className="flex flex-col gap-4 flex-grow">
                    {/* Icon */}
                    <IconContainer size="md" variant="primary" className="group-hover:scale-110 transition-transform duration-300">
                      {IconComponent && <IconComponent className="w-6 h-6 text-primary-600" />}
                    </IconContainer>
                    
                    {/* Title */}
                    <h3 className="text-lg font-bold text-neutral-900 leading-tight min-h-[3.5rem]">
                      {practice.title}
                    </h3>
                    
                    {/* Short Description */}
                    <p className="text-sm text-neutral-600 leading-relaxed line-clamp-3 flex-grow">
                      {practice.shortDescription}
                    </p>
                    
                    {/* CTA */}
                    <span className="text-sm font-medium text-success-600 group-hover:text-success-700 flex items-center gap-1 mt-auto">
                      {t('learnMore')}
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </button>
              </StaggerItem>
            );
          })}
        </Stagger>
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
