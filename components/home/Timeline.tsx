'use client';

import { useState, useEffect, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { experience } from '@/data/experience';
import { cn } from '@/lib/utils';

export function Timeline() {
  const locale = useLocale() as 'pt' | 'en';
  const t = useTranslations('about');
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const reversedPositions = [...experience.positions].reverse();

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const items = containerRef.current.querySelectorAll('[data-timeline-item]');
      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const itemMiddle = rect.top + rect.height / 2;
        const viewportMiddle = window.innerHeight / 2;
        
        if (Math.abs(itemMiddle - viewportMiddle) < 150) {
          setActiveIndex(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full" ref={containerRef}>
      <div className="text-center mb-12">
        <span className="text-emerald-400 font-bold tracking-widest text-xs uppercase">
          {locale === 'pt' ? 'Jornada Profissional' : 'Professional Journey'}
        </span>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mt-3">
          {t('experience')}
        </h2>
      </div>

      {/* No px-4 here — line and dots share the same reference box */}
      <div className="relative max-w-4xl mx-auto">
        {/* Vertical line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2">
          <div
            className="absolute left-0 top-0 w-full bg-emerald-500 transition-all duration-500 ease-out"
            style={{
              height: `${(activeIndex / (reversedPositions.length - 1)) * 100}%`,
              boxShadow: '0 0 20px rgba(16, 185, 129, 0.5)',
            }}
          />
        </div>

        <div className="space-y-6 md:space-y-12">
          {reversedPositions.map((position, index) => {
            const isActive = index === activeIndex;
            const isLocked = position.isLocked;
            const isLeft = index % 2 === 0;

            return (
              <div
                key={index}
                data-timeline-item
                className={cn(
                  'relative flex items-start md:items-center md:justify-between pl-12 md:pl-0',
                  !isLeft && 'md:flex-row-reverse'
                )}
              >
                {/* Dot — left-8 matches the line above */}
                <div
                  className={cn(
                    'absolute left-8 md:left-1/2 top-5 w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 z-10 -translate-x-1/2',
                    isActive && !isLocked
                      ? 'bg-emerald-500 border-emerald-500 scale-125'
                      : isLocked
                        ? 'bg-neutral-800 border-neutral-600'
                        : 'bg-neutral-900 border-white/30',
                  )}
                  style={{
                    boxShadow: isActive && !isLocked ? '0 0 16px rgba(16, 185, 129, 0.8)' : 'none',
                  }}
                />

                {/* Card — sits in content area; gutter on parent holds line+dot outside */}
                <div
                  className={cn(
                    'px-4 py-4 md:w-[45%] rounded-xl transition-all duration-300 w-full',
                    isActive && !isLocked
                      ? 'bg-emerald-950/30 border border-emerald-500/30'
                      : isLocked
                        ? 'bg-neutral-900/30 border border-white/5 opacity-50'
                        : 'bg-neutral-900/50 border border-white/10'
                  )}
                >
                  <span className="text-xs text-emerald-400 font-medium block mb-1">
                    {position.period[locale]}
                  </span>
                  <h3 className="text-base md:text-lg font-bold text-white mb-1">
                    {position.title}
                  </h3>
                  <p className="text-emerald-400/80 font-medium text-sm mb-1">
                    {experience.company}
                  </p>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {position.description[locale]}
                  </p>
                </div>

                {/* Empty space (desktop only) */}
                <div className="hidden md:block md:w-[45%]" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
