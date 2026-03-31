'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Github, Linkedin, Download, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();

  return (
    <section className="pt-32 md:pt-40 pb-20 px-6 md:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left - Text */}
        <div className="lg:col-span-8">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-gray-900 leading-[1.1] mb-6 md:mb-8">
            {t('tagline')}
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mb-8 md:mb-12">
            {t('description')}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-emerald-700 hover:bg-emerald-800 text-white">
              <Link href="#projects" className="flex items-center gap-2" scroll={false}>
                <span>{t('cta.projects')}</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-emerald-700 text-emerald-700 hover:bg-emerald-50">
              <a href={`/cv/cv-${locale}.pdf`} download className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                <span>{t('cta.cv')}</span>
              </a>
            </Button>
          </div>

          <div className="flex items-center gap-6 mt-8 md:mt-10">
            <Link href="https://github.com/JoaoOliveira07" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-emerald-700 transition-colors">
              <Github className="h-6 w-6" />
            </Link>
            <Link href="https://www.linkedin.com/in/joão-paulo-oliveira07/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-emerald-700 transition-colors">
              <Linkedin className="h-6 w-6" />
            </Link>
          </div>
        </div>

        {/* Right - Image */}
        <div className="lg:col-span-4 flex justify-end">
          <div className="w-full aspect-square bg-emerald-100 rounded-xl relative overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=800&fit=crop"
              alt="Clean code on a monitor"
              className="absolute inset-0 w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-emerald-700/10 mix-blend-multiply"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
