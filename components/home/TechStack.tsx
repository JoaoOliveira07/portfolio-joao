'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { skillCategories } from '@/data/skills';
import { Stagger, StaggerItem } from '@/components/ui/Animations';
import { techLogos } from '@/data/tech-logos';
import * as LucideIcons from 'lucide-react';

// Component for rendering either SVG logo or Lucide icon
const TechItem = ({ name, type, path, icon, displayName }: {
  name: string;
  type: 'svg' | 'lucide';
  path?: string;
  icon?: string;
  displayName: string;
}) => {
  const isAwsIcon = path?.includes('aws-');
  
  return (
    <div className="flex-shrink-0 flex flex-col items-center px-6 gap-3">
      <div className="w-14 h-14 flex items-center justify-center">
        {type === 'svg' && path ? (
          <div className={`
            ${isAwsIcon 
              ? 'rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300' 
              : ''
            } 
            w-full h-full flex items-center justify-center
          `}>
            <Image
              src={path}
              alt={displayName}
              width={56}
              height={56}
              className="w-full h-full object-contain"
            />
          </div>
        ) : icon ? (
          <div className="w-full h-full rounded-xl bg-neutral-50 hover:bg-neutral-100 transition-colors duration-300 flex items-center justify-center text-neutral-600 hover:text-neutral-800">
            {(() => {
              const IconComponent = (LucideIcons as any)[icon];
              return IconComponent ? <IconComponent className="w-9 h-9 stroke-[1.5]" /> : null;
            })()}
          </div>
        ) : null}
      </div>
      
      <span className="text-xs text-neutral-500 text-center whitespace-nowrap font-medium hover:text-neutral-700 transition-colors">
        {displayName}
      </span>
    </div>
  );
};

export function TechStack() {
  const t = useTranslations('techStack');
  const locale = useLocale();
  
  // Duplicate logos for infinite scroll effect
  const duplicatedLogos = [...techLogos, ...techLogos];

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

        {/* Tech Marquee - Full Width with Gradient Overlays */}
        <div className="relative mb-16 overflow-hidden">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          {/* Scrolling Container */}
          <div className="flex items-center justify-center w-full">
            <div className="flex animate-marquee">
              {duplicatedLogos.map((tech, index) => (
                <TechItem
                  key={`${tech.name}-${index}`}
                  {...tech}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Skills Categories - Minimalist Grid */}
        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {skillCategories.map((category) => (
            <StaggerItem key={category.id}>
              <div className="bg-white rounded-lg border border-neutral-200 hover:border-primary/30 hover:shadow-md transition-all duration-300 p-6 h-full">
                {/* Title with accent */}
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-neutral-100">
                  <div className="w-1 h-6 bg-primary-500 rounded-full" />
                  <h3 className="text-base font-semibold text-neutral-900">
                    {category.title[locale as 'pt' | 'en']}
                  </h3>
                </div>
                
                {/* Skills as simple text list */}
                <div className="space-y-2.5">
                  {category.skills.map((skill) => (
                    <div 
                      key={skill} 
                      className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
