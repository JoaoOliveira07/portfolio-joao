'use client';

import { useLocale } from 'next-intl';
import { competencies } from '@/data/skills';
import { MagicCard } from '@/components/ui/MagicCard';

export function Competencies() {
  const locale = useLocale() as 'pt' | 'en';

  const getIcon = (iconName: string) => {
    const icons: Record<string, string> = {
      'Workflow': 'sync',
      'FlaskConical': 'science',
      'Cloud': 'cloud_done',
      'ShieldCheck': 'verified_user',
    };
    return icons[iconName] || 'code';
  };

  return (
    <section className="py-20 md:py-32" id="expertise">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12 md:mb-20">
          <span className="text-emerald-400 font-bold tracking-widest text-xs uppercase">Core Capabilities</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mt-3 md:mt-4">
            {locale === 'pt' ? 'Minha Expertise' : 'My Expertise'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {competencies.map((competency) => (
            <MagicCard
              key={competency.title.en}
              className="p-6 md:p-8 group cursor-pointer"
              gradientColor="#10b981"
            >
              <span className="material-symbols-outlined text-3xl md:text-4xl text-emerald-400 mb-4 md:mb-6 block group-hover:scale-110 transition-transform">
                {getIcon(competency.icon)}
              </span>
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-white">
                {competency.title[locale]}
              </h3>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                {competency.description[locale]}
              </p>
            </MagicCard>
          ))}
        </div>
      </div>
    </section>
  );
}
