'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { competencies } from '@/data/skills';
import { techLogos } from '@/data/tech-logos';
import { MagicCard } from '@/components/ui/MagicCard';
import * as LucideIcons from 'lucide-react';

const TechItem = ({ name, type, path, icon, displayName }: {
  name: string;
  type: 'svg' | 'lucide';
  path?: string;
  icon?: string;
  displayName: string;
}) => {
  return (
    <div className="flex-shrink-0 flex flex-col items-center mx-1">
      <div className="w-12 h-12 flex items-center justify-center bg-neutral-900 rounded-lg border border-white/10 hover:border-emerald-500/50 hover:bg-neutral-800 transition-all duration-300">
        {type === 'svg' && path ? (
          <Image
            src={path}
            alt={displayName}
            width={24}
            height={24}
            className="w-10 h-10 object-contain"
            unoptimized
          />
        ) : icon ? (
          <div className="text-gray-400 group-hover:text-emerald-400 transition-colors">
            {(() => {
              const IconComponent = (LucideIcons as any)[icon];
              return IconComponent ? <IconComponent className="w-8 h-8" /> : null;
            })()}
          </div>
        ) : null}
      </div>
      <span className="text-xs text-gray-500 font-medium mt-1">{displayName}</span>
    </div>
  );
};

export function TechStack() {
  const t = useTranslations('techStack');
  const locale = useLocale();
  
  const duplicatedLogos = [...techLogos, ...techLogos, ...techLogos, ...techLogos];
  
  return (
    <section className="w-full py-8">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-5 bg-emerald-500 rounded-full" />
            <h2 className="text-2xl font-bold text-white">{t('title')}</h2>
          </div>
          <p className="text-sm text-gray-400 ml-6">{t('subtitle')}</p>
        </div>

        <div className="relative mb-12">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-neutral-950 via-neutral-950/95 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-neutral-950 via-neutral-950/95 to-transparent z-10" />
          
          <div className="overflow-hidden py-4">
            <div className="flex gap-2 animate-marquee whitespace-nowrap">
              {duplicatedLogos.map((tech, index) => (
                <TechItem key={`${tech.name}-${index}`} {...tech} />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {competencies.map((category, index) => (
            <MagicCard key={index} className="p-6 h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 bg-emerald-500 rounded-full" />
                <h3 className="text-base font-semibold text-white">
                  {category.title[locale as 'pt' | 'en']}
                </h3>
              </div>
              <div className="space-y-2">
                {category.skills.map((skill) => (
                  <div key={skill} className="text-sm text-gray-400">{skill}</div>
                ))}
              </div>
            </MagicCard>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}