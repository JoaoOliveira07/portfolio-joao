'use client';

import { useTranslations } from 'next-intl';
import { LanguageToggle } from './LanguageToggle';
import { useState, useRef } from 'react';
import { Menu, X, Beaker } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

export function Navigation() {
  const t = useTranslations('nav');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const params = useParams();
  const pathname = usePathname();
  const lang = (params?.lang as string) ?? 'pt';
  const isLabPage = pathname?.includes('/lab');

  const navItems = [
    { href: '#hero', label: t('home') },
    { href: '#projects', label: t('projects') },
    { href: '#engineering', label: t('engineering') },
    { href: '#techstack', label: t('techstack') },
    { href: '#philosophy', label: t('philosophy') },
    { href: '#experience', label: t('experience') },
    { href: '#testimonials', label: t('testimonials') },
    { href: '#contact', label: t('contact') },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (isLabPage) {
      // On lab page, anchor links should navigate home first
      return;
    }
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const headerHeight = navRef.current?.offsetHeight || 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav ref={navRef} className="fixed top-0 w-full z-50 bg-neutral-950/80 backdrop-blur-xl border-b border-white/5">
      <div className="flex items-center justify-between px-6 md:px-8 py-5 max-w-7xl mx-auto">
        {/* Logo */}
        <a href={isLabPage ? `/${lang}#hero` : '#hero'} onClick={(e) => !isLabPage && handleScroll(e, '#hero')} className="text-2xl font-black tracking-tighter text-emerald-400">
          JOPES
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8 font-medium text-sm">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={isLabPage ? `/${lang}${item.href}` : item.href}
              onClick={(e) => handleScroll(e, item.href)}
              className="text-gray-400 hover:text-emerald-400 transition-colors pb-1 border-b-2 border-transparent hover:border-emerald-400 whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
          {/* Lab link */}
          <Link
            href={`/${lang}/lab`}
            className={`flex items-center gap-1.5 pb-1 border-b-2 transition-colors whitespace-nowrap ${
              isLabPage
                ? 'text-emerald-400 border-emerald-400'
                : 'text-gray-400 hover:text-emerald-400 border-transparent hover:border-emerald-400'
            }`}
          >
            <Beaker className="w-3.5 h-3.5" />
            {t('lab')}
          </Link>
        </div>

        {/* Tablet Nav - Simplified */}
        <div className="hidden md:flex lg:hidden items-center gap-4 font-medium text-sm">
          {navItems.slice(0, 5).map((item) => (
            <a
              key={item.href}
              href={isLabPage ? `/${lang}${item.href}` : item.href}
              onClick={(e) => handleScroll(e, item.href)}
              className="text-gray-400 hover:text-emerald-400 transition-colors pb-1 border-b-2 border-transparent hover:border-emerald-400"
            >
              {item.label}
            </a>
          ))}
          <Link
            href={`/${lang}/lab`}
            className={`flex items-center gap-1.5 pb-1 border-b-2 transition-colors ${
              isLabPage
                ? 'text-emerald-400 border-emerald-400'
                : 'text-gray-400 hover:text-emerald-400 border-transparent hover:border-emerald-400'
            }`}
          >
            <Beaker className="w-3.5 h-3.5" />
            {t('lab')}
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <LanguageToggle />
          
          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/5 py-4 bg-neutral-900">
          <div className="flex flex-col gap-3 px-6 max-h-[70vh] overflow-y-auto">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={isLabPage ? `/${lang}${item.href}` : item.href}
                onClick={(e) => { handleScroll(e, item.href); setMobileMenuOpen(false); }}
                className="text-sm font-medium text-gray-400 hover:text-emerald-400 py-1"
              >
                {item.label}
              </a>
            ))}
            <Link
              href={`/${lang}/lab`}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-1.5 text-sm font-medium py-1 transition-colors ${
                isLabPage ? 'text-emerald-400' : 'text-gray-400 hover:text-emerald-400'
              }`}
            >
              <Beaker className="w-3.5 h-3.5" />
              {t('lab')}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
