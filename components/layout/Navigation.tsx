'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { LanguageToggle } from './LanguageToggle';
import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Navigation() {
  const t = useTranslations('nav');
  const params = useParams();
  const pathname = usePathname();
  const lang = params.lang as string;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const navItems = [
    { href: '#about', label: t('about') },
    { href: '#experience', label: t('experience') },
    { href: '#engineering', label: t('engineering') },
    { href: '#techstack', label: t('techStack') },
    { href: '#learning', label: t('learning') },
    { href: '#projects', label: t('projects') },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const headerHeight = navRef.current?.offsetHeight || 64;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav ref={navRef} className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleScroll(e, '#hero')}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
              <span className="text-lg font-bold text-white">JP</span>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-sm font-bold text-neutral-900 leading-none">João Paulo</span>
              <span className="text-xs text-neutral-500 leading-none">Backend Developer</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors relative group cursor-pointer"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all group-hover:w-full"></span>
              </a>
            ))}
            <LanguageToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-neutral-200 py-4 bg-white">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                  className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors px-2 py-1 cursor-pointer"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
