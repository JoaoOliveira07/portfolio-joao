'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Github, Linkedin, Download, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/Animations';

export function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const [avatarUrl, setAvatarUrl] = useState<string>('');

  useEffect(() => {
    fetch('/api/github')
      .then(res => res.json())
      .then(data => setAvatarUrl(data.avatar_url))
      .catch(() => setAvatarUrl('https://avatars.githubusercontent.com/u/120759424?v=4'));
  }, []);

  return (
    <section className="w-full py-20 md:py-32 bg-gradient-to-b from-neutral-50 to-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col items-center text-center gap-8 max-w-4xl mx-auto">
          <Stagger className="flex flex-col items-center gap-8">
            {/* Avatar with glow effect */}
            <StaggerItem>
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
                <div className="relative w-24 h-24 rounded-full border-4 border-white shadow-xl overflow-hidden bg-neutral-100">
                  {avatarUrl ? (
                    <Image
                      src={avatarUrl}
                      alt="João Paulo Oliveira"
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-primary-500">
                      JP
                    </div>
                  )}
                </div>
              </div>
            </StaggerItem>

            {/* Main heading */}
            <StaggerItem>
              <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 leading-tight tracking-tight">
                {t('tagline')}
              </h1>
            </StaggerItem>

            <StaggerItem>
              <p className="text-lg md:text-xl text-neutral-500 max-w-2xl leading-relaxed">
                {t('description')}
              </p>
            </StaggerItem>

            {/* CTAs */}
            <StaggerItem>
              <div className="flex flex-wrap gap-4 mt-6 justify-center">
                <Button asChild variant="success" size="lg">
                  <Link href={`/${locale}/projects`} className="flex items-center gap-2">
                    <span>{t('cta.projects')}</span>
                    <ArrowRight className="h-5 w-5 flex-shrink-0" />
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <a href={`/cv/cv-${locale}.pdf`} download className="flex items-center gap-2">
                    <Download className="h-5 w-5 flex-shrink-0" />
                    <span>{t('cta.cv')}</span>
                  </a>
                </Button>
              </div>
            </StaggerItem>

            {/* Social Links */}
            <StaggerItem>
              <div className="flex items-center gap-6 mt-4">
                <Link
                  href="https://github.com/JoaoOliveira07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 hover:text-primary-500 transition-colors"
                >
                  <Github className="h-6 w-6" />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/joão-paulo-oliveira07/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 hover:text-primary-500 transition-colors"
                >
                  <Linkedin className="h-6 w-6" />
                </Link>
              </div>
            </StaggerItem>

            {/* Subtitle badge */}
            <StaggerItem>
              <div className="flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full">
                <span className="text-sm font-semibold text-neutral-900">
                  {t('role')}
                </span>
                <span className="text-neutral-400">•</span>
                <span className="text-sm text-neutral-600">
                  Gaspar, SC - Brasil
                </span>
              </div>
            </StaggerItem>
          </Stagger>
        </div>
      </div>
    </section>
  );
}
