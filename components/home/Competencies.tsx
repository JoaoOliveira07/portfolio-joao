'use client';

import { useTranslations } from 'next-intl';
import { IconContainer } from '@/components/ui/IconContainer';
import { Card } from '@/components/ui/Card';
import { competencies } from '@/data/skills';
import { Stagger, StaggerItem } from '@/components/ui/Animations';
import { Workflow, FlaskConical, Cloud, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// Mapeamento de strings para componentes de ícones
const iconMap: Record<string, LucideIcon> = {
  Workflow,
  FlaskConical,
  Cloud,
  ShieldCheck,
};

export function Competencies() {
  const t = useTranslations('competencies');

  return (
    <section className="w-full py-20 md:py-32 bg-white border-t border-dashed border-neutral-200">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-1 h-6 bg-primary-500 rounded-full flex-shrink-0 mt-1" />
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
              {t('title')}
            </h2>
          </div>
          <p className="text-base text-neutral-500 ml-7">
            {t('subtitle')}
          </p>
        </div>

        {/* Competency Grid */}
        <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {competencies.map((competency, index) => {
            const IconComponent = iconMap[competency.icon];
            
            return (
              <StaggerItem key={competency.title.en}>
                <div className="flex flex-col gap-3 p-6 bg-white rounded-lg border border-neutral-200 hover:border-primary/30 hover:shadow-md transition-all h-full">
                  <div className="flex items-center gap-3">
                    <IconContainer size="sm" variant="primary">
                      {IconComponent && <IconComponent className="w-5 h-5 text-primary-600" />}
                    </IconContainer>
                    <h3 className="text-lg font-bold text-neutral-900">
                      {competency.title[t('locale') as 'pt' | 'en']}
                    </h3>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {competency.description[t('locale') as 'pt' | 'en']}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
