'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { TerminalWindow } from '@/components/ui/TerminalWindow';

export function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden bg-neutral-950">
      {/* Simple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgb(255,255,255) 1px, transparent 1px), linear-gradient(90deg, rgb(255,255,255) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 pt-32 pb-20 px-6 md:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Text */}
          <div>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-white leading-[1.1] mb-6 md:mb-8"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 600ms ease-out, transform 600ms ease-out',
                transitionDelay: '0ms',
              }}
            >
              {t('tagline')}
            </h1>
            
            <p 
              className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-xl mb-8 md:mb-12"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 600ms ease-out, transform 600ms ease-out',
                transitionDelay: '150ms',
              }}
            >
              {t('description')}
            </p>
            
              <div 
              className="flex flex-wrap gap-4"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 600ms ease-out, transform 600ms ease-out',
                transitionDelay: '300ms',
              }}
            >
              <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white border-0">
                <a href="#projects" onClick={(e) => handleScroll(e, '#projects')} className="flex items-center gap-2 cursor-pointer">
                  <span>{t('cta.projects')}</span>
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
                <a href="#contact" onClick={(e) => handleScroll(e, '#contact')} className="flex items-center gap-2">
                  <span>{t('cta.contact')}</span>
                </a>
              </Button>
            </div>
          </div>

          {/* Right - Terminal */}
          <div
            className="hidden lg:flex items-center justify-center"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 600ms ease-out, transform 600ms ease-out',
              transitionDelay: '200ms',
            }}
          >
            <TerminalWindow />
          </div>
        </div>
      </div>
    </section>
  );
}
