'use client';

import { useTranslations } from 'next-intl';
import { LanguageToggle } from './LanguageToggle';
import { useState, useRef } from 'react';
import { Menu, X, Beaker } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useScrollSpy } from '@/hooks/useScrollSpy';

const SECTION_IDS = ['hero', 'projects', 'engineering', 'techstack', 'philosophy', 'experience', 'testimonials', 'contact'];

export function Navigation() {
  const t = useTranslations('nav');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const params = useParams();
  const pathname = usePathname();
  const lang = (params?.lang as string) ?? 'pt';
  const isLabPage = pathname?.includes('/lab');
  const activeId = useScrollSpy(SECTION_IDS);

  const navItems = [
    { href: '#hero', label: t('home'), id: 'hero' },
    { href: '#projects', label: t('projects'), id: 'projects' },
    { href: '#engineering', label: t('engineering'), id: 'engineering' },
    { href: '#techstack', label: t('techstack'), id: 'techstack' },
    { href: '#philosophy', label: t('philosophy'), id: 'philosophy' },
    { href: '#experience', label: t('experience'), id: 'experience' },
    { href: '#testimonials', label: t('testimonials'), id: 'testimonials' },
    { href: '#contact', label: t('contact'), id: 'contact' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (isLabPage) return;
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

  const linkClass = (id: string) =>
    `pb-1 border-b-2 transition-colors whitespace-nowrap ${
      !isLabPage && activeId === id
        ? 'text-emerald-400 border-emerald-400'
        : 'text-gray-400 hover:text-emerald-400 border-transparent hover:border-emerald-400'
    }`;

  return (
    <nav ref={navRef} className="fixed top-0 w-full z-50 bg-neutral-950/80 backdrop-blur-xl border-b border-white/5">
      <div className="flex items-center justify-between px-6 md:px-8 py-5 max-w-7xl mx-auto">
        {/* Logo */}
        <a
          href={isLabPage ? `/${lang}#hero` : '#hero'}
          onClick={(e) => !isLabPage && handleScroll(e, '#hero')}
          className="text-2xl font-black tracking-tighter text-emerald-400"
        >
          JOPES
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8 font-medium text-sm">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={isLabPage ? `/${lang}${item.href}` : item.href}
              onClick={(e) => handleScroll(e, item.href)}
              className={linkClass(item.id)}
            >
              {item.label}
            </a>
          ))}
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

        {/* Right side */}
        <div className="flex items-center gap-4">
          <LanguageToggle />
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden border-t border-white/5 bg-neutral-900"
          >
            <div className="flex flex-col gap-3 px-6 py-4 max-h-[70vh] overflow-y-auto">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={isLabPage ? `/${lang}${item.href}` : item.href}
                  onClick={(e) => { handleScroll(e, item.href); setMobileMenuOpen(false); }}
                  className={`text-sm font-medium py-1 transition-colors ${
                    !isLabPage && activeId === item.id ? 'text-emerald-400' : 'text-gray-400 hover:text-emerald-400'
                  }`}
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
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
