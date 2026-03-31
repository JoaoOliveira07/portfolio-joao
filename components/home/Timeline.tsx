'use client';

import { useState, useEffect, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { experience as experiencePt } from '@/data/experience/pt';
import { experience as experienceEn } from '@/data/experience/en';
import { cn } from '@/lib/utils';
import { Lock } from 'lucide-react';

export function Timeline() {
  const locale = useLocale();
  const experience = locale === 'pt' ? experiencePt : experienceEn;
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
          Professional Journey
        </span>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mt-3">
          {t('experience')}
        </h2>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 md:px-0">
        {/* Vertical line */}
        <div className="absolute left-2 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2">
          <div 
            className="absolute left-0 top-0 w-full bg-emerald-500 transition-all duration-500 ease-out"
            style={{
              height: `${(activeIndex / (reversedPositions.length - 1)) * 100}%`,
              boxShadow: '0 0 20px rgba(16, 185, 129, 0.5)',
            }}
          />
        </div>

        <div className="space-y-12">
          {reversedPositions.map((position, index) => {
            const isActive = index === activeIndex;
            const isLocked = position.isLocked;
            const isLeft = index % 2 === 0;

            return (
              <div
                key={index}
                data-timeline-item
                className={cn(
                  'relative flex items-center md:justify-between',
                  !isLeft && 'md:flex-row-reverse'
                )}
              >
                {/* Dot on the line - centered */}
                <div 
                  className={cn(
                    'absolute left-2 md:left-1/2 w-4 h-4 rounded-full border-2 transition-all duration-300 z-10 -translate-x-1/2',
                    isActive && !isLocked
                      ? 'bg-emerald-500 border-emerald-500 scale-125' 
                      : isLocked
                        ? 'bg-neutral-800 border-neutral-600'
                        : 'bg-neutral-900 border-white/30',
                  )}
                  style={{
                    boxShadow: isActive && !isLocked ? '0 0 20px rgba(16, 185, 129, 0.8)' : 'none',
                  }}
                />

                {/* Content left of line (or right on alternate) */}
                <div 
                  className={cn(
                    'ml-10 md:ml-0 md:w-[45%] p-4 rounded-xl transition-all duration-300',
                    isActive && !isLocked
                      ? 'bg-emerald-950/30 border border-emerald-500/30' 
                      : isLocked
                        ? 'bg-neutral-900/30 border border-white/5 opacity-50'
                        : 'bg-neutral-900/50 border border-white/10'
                  )}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-emerald-400 font-medium">
                      {position.period}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {position.title}
                  </h3>
                  <div className="space-y-2">
                    <p className="text-emerald-400/80 font-medium text-sm">
                      {experience.company}
                    </p>
                    <p className="text-neutral-400 text-sm">
                      {position.description}
                    </p>
                  </div>
                </div>

                {/* Empty space on the other side */}
                <div className="hidden md:block md:w-[45%]" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
