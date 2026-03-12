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
    <section className="w-full">
      <div className="container mx-auto px-6 max-w-7xl">
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
