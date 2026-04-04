'use client';

import { useTranslations } from 'next-intl';
import { CheckCircle2 } from 'lucide-react';

export function AboutSection() {
  const t = useTranslations('about');

  const values = [t('value1'), t('value2'), t('value3')];

  return (
    <section className="py-20 md:py-32" id="philosophy">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">

          {/* Left - Photo */}
          <div className="relative order-2 md:order-1">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-800 shadow-2xl">
              <img
                src="/avatars/eu.png"
                alt="João Paulo Oliveira"
                className="w-full h-full object-cover grayscale opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/50 via-transparent to-transparent rounded-2xl" />
            </div>
            <div className="absolute -bottom-5 -right-5 md:-bottom-8 md:-right-8 bg-emerald-900/90 border border-emerald-500/30 px-6 py-4 rounded-xl shadow-xl hidden md:block">
              <span className="text-emerald-400 text-xl md:text-2xl font-black tracking-widest opacity-60 select-none">EST. 2023</span>
            </div>
          </div>

          {/* Right - Content */}
          <div className="order-1 md:order-2 flex flex-col gap-7">
            <div>
              <span className="text-emerald-400 font-bold tracking-widest text-xs uppercase">About</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mt-2 mb-6">
                {t('title')}
              </h2>
              <div className="flex flex-col gap-4">
                <p className="text-base text-gray-300 leading-relaxed">{t('intro')}</p>
                <p className="text-base text-gray-400 leading-relaxed">{t('paragraph2')}</p>
                <p className="text-base text-gray-400 leading-relaxed">{t('paragraph3')}</p>
              </div>
            </div>

            {/* Values */}
            <div className="bg-neutral-900/60 border border-white/8 rounded-xl p-5">
              <p className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-4">{t('valuesTitle')}</p>
              <ul className="flex flex-col gap-3">
                {values.map((v, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
