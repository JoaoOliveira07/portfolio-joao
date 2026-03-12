'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
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
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleScroll(e, '#hero')}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-20 h-14 rounded-md overflow-hidden group-hover:scale-105 transition-all duration-300 flex items-center justify-center">
              <svg className="self-center" width="35" height="45" viewBox="0 0 97 131" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M31.2779 101.09C31.2779 101.09 25.9732 104.119 34.688 105.254C44.9185 106.39 50.2232 106.012 61.5904 104.119C61.5904 104.119 64.6216 106.012 68.7896 107.526C43.4029 118.506 10.8169 106.769 31.2779 101.09ZM27.8677 87.0809C27.8677 87.0809 22.1841 91.2457 30.899 92.0029C41.8872 93.1387 50.6021 93.1387 65.7583 90.4884C65.7583 90.4884 68.0318 92.3815 71.4419 93.5173C40.3716 102.604 5.89114 94.2746 27.8677 87.0809Z" fill="#01916D"/>
                <path d="M54.3911 62.8497C60.8325 70.0434 52.8755 76.4798 52.8755 76.4798C52.8755 76.4798 68.7896 68.1503 61.2114 57.9277C54.3911 48.0838 49.0864 43.5405 77.8833 26.8815C77.8833 26.8815 32.7935 37.8613 54.3911 62.8497Z" fill="#01916D"/>
                <path d="M88.1138 111.691C88.1138 111.691 91.9029 114.72 84.3248 117.37C69.5474 121.913 22.563 123.049 9.68022 117.37C5.13335 115.477 13.8482 112.448 16.5005 112.069L21.0474 111.312C15.7427 107.905 -12.6752 118.506 6.64897 121.913C58.938 130.243 101.754 118.127 88.1138 111.691ZM33.5513 71.9364C33.5513 71.9364 9.68022 77.6156 25.2154 79.8873C31.6568 80.6445 44.5396 80.6445 56.6646 79.5087C66.5162 78.7514 76.3677 76.8584 76.3677 76.8584L70.3052 80.2659C46.0552 86.3237 -0.550248 83.2948 13.0904 76.8584C24.4576 71.5578 33.5513 71.9364 33.5513 71.9364ZM76.3677 95.789C100.618 83.2948 89.2505 70.8006 81.2935 72.6936L78.6412 73.4509C78.6412 73.4509 79.399 72.315 80.9146 71.5578C96.4498 66.2572 108.575 87.8381 75.6099 96.5462L76.3677 95.789Z" fill="#01916D"/>
                <path d="M61.2115 0C61.2115 0 74.8521 13.6301 48.3286 34.4538C27.1099 51.4913 43.7818 60.9566 48.3286 71.9364C36.2036 60.578 27.1099 50.7341 33.1724 41.6474C41.8872 28.396 66.8951 21.5809 61.2115 0Z" fill="#01916D"/>
                <path d="M35.8247 130.621C59.3169 132.136 95.6919 129.486 96.4497 118.506C96.4497 118.506 94.9341 122.671 77.1255 126.078C57.0435 129.864 32.0357 129.486 17.2583 126.835C17.2583 126.835 20.2896 129.486 35.8247 130.621Z" fill="#01916D"/>
              </svg>

            </div>
            <div className="hidden sm:flex flex-col self-center">
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
