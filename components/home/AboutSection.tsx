'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

export function AboutSection() {
  const t = useTranslations('about');
  const locale = useLocale();

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1 h-5 bg-primary-500 rounded-full flex-shrink-0" />
        <h2 className="text-2xl font-bold text-neutral-900">
          {t('title')}
        </h2>
      </div>
      
      <div className="space-y-4 text-neutral-700 leading-relaxed">
        <p className="text-base">{t('intro')}</p>
        <p className="text-base">{t('expertise')}</p>
        <p className="text-base">{t('focus')}</p>
        <p className="text-base text-neutral-600 italic">{t('mindset')}</p>
      </div>
    </div>
  );
}
