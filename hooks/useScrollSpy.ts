'use client';

import { useEffect, useState } from 'react';

export function useScrollSpy(sectionIds: string[], rootMargin = '-20% 0px -70% 0px') {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin }
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    const onScroll = () => {
      const scrolled = window.innerHeight + window.scrollY;
      const total = document.documentElement.scrollHeight;
      if (total - scrolled < 4) {
        setActiveId(sectionIds[sectionIds.length - 1]);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [sectionIds, rootMargin]);

  return activeId;
}
