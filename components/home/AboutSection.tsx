'use client';

import { useTranslations } from 'next-intl';

export function AboutSection() {
  const t = useTranslations('about');

  return (
    <section className="py-20 md:py-32" id="philosophy">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          {/* Left - Image */}
          <div className="relative order-2 md:order-1">
            <div className="aspect-[4/5] rounded-xl overflow-hidden bg-neutral-800 shadow-lg">
              <img 
                src="/avatars/eu.png"
                alt="João Paulo Oliveira"
                className="w-full h-full object-cover grayscale opacity-80"
              />
            </div>
            <div className="absolute -bottom-6 md:-bottom-8 -right-6 md:-right-8 bg-emerald-900 p-6 md:p-10 rounded-xl shadow-lg hidden md:block">
              <span className="text-emerald-400 text-2xl md:text-3xl font-black tracking-widest opacity-50">EST. 2024</span>
            </div>
          </div>

          {/* Right - Content */}
          <div className="order-1 md:order-2">
            <span className="text-emerald-400 font-bold tracking-widest text-xs uppercase">About</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mt-2 mb-6">
              {t('title')}
            </h2>
            <p className="text-base md:text-lg text-gray-400 leading-relaxed mb-8">
              {t('intro')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
