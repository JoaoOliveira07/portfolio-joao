'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Badge } from '@/components/ui/Badge';
import { skillCategories } from '@/data/skills';

export function TechStack() {
  const t = useTranslations('techStack');
  const locale = useLocale();

  return (
    <section className="w-full py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-8">
          <h2 className="text-3xl md:text-4xl font-bold text-text text-center">
            {t('title')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skillCategories.map((category) => (
              <div key={category.id} className="flex flex-col gap-4">
                <h3 className="text-lg font-semibold text-primary border-b border-border pb-2">
                  {category.title[locale as 'pt' | 'en']}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge key={skill} variant="default">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
