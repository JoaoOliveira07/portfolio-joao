'use client';

import { useTranslations } from 'next-intl';
import { LanguageToggle } from './LanguageToggle';
import { useState, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Navigation() {
  const t = useTranslations('nav');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const navItems = [
    { href: '#hero', label: t('home') },
    { href: '#philosophy', label: t('philosophy') },
    { href: '#experience', label: t('experience') },
    { href: '#techstack', label: t('techstack') },
    { href: '#engineering', label: t('engineering') },
    { href: '#system-design', label: t('systemDesign') },
    { href: '#projects', label: t('projects') },
    { href: '#stats', label: t('stats') },
    { href: '#testimonials', label: t('testimonials') },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
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
        <a href="#hero" onClick={(e) => handleScroll(e, '#hero')} className="text-2xl font-black tracking-tighter text-emerald-400">
          JOPES
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8 font-medium text-sm">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleScroll(e, item.href)}
              className="text-gray-400 hover:text-emerald-400 transition-colors pb-1 border-b-2 border-transparent hover:border-emerald-400 whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Tablet Nav - Simplified */}
        <div className="hidden md:flex lg:hidden items-center gap-4 font-medium text-sm">
          {navItems.slice(0, 6).map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleScroll(e, item.href)}
              className="text-gray-400 hover:text-emerald-400 transition-colors pb-1 border-b-2 border-transparent hover:border-emerald-400"
            >
              {item.label}
            </a>
          ))}
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
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className="text-sm font-medium text-gray-400 hover:text-emerald-400 py-1"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
