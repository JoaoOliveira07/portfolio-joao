'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Github, Linkedin, Download, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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
    <section className="w-full py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
          {/* Left Column - Content */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text">
                João Paulo Oliveira
              </h1>
              <p className="text-xl md:text-2xl text-primary font-semibold">
                {t('role')}
              </p>
              <p className="text-sm text-textMuted">
                Gaspar, SC - Brasil
              </p>
            </div>

            <p className="text-lg md:text-xl text-text font-medium leading-relaxed">
              {t('tagline')}
            </p>

            <p className="text-base text-textMuted leading-relaxed">
              {t('description')}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mt-4">
              <Button asChild size="lg">
                <Link href={`/${locale}/projects`}>
                  {t('cta.projects')}
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={`/cv/cv-${locale}.pdf`} download>
                  <Download className="h-5 w-5" />
                  {t('cta.cv')}
                </a>
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-2">
              <Link
                href="https://github.com/JoaoOliveira07"
                target="_blank"
                rel="noopener noreferrer"
                className="text-textMuted hover:text-text transition-colors"
              >
                <Github className="h-6 w-6" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/joão-paulo-oliveira07/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-textMuted hover:text-text transition-colors"
              >
                <Linkedin className="h-6 w-6" />
              </Link>
            </div>
          </div>

          {/* Right Column - Avatar */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-25"></div>
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-primary overflow-hidden bg-surface">
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt="João Paulo Oliveira"
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl font-bold text-primary">
                    JP
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
