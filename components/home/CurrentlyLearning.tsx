'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';
import { currentlyLearning as learningPt } from '@/data/currently-learning/pt';
import { currentlyLearning as learningEn } from '@/data/currently-learning/en';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import { IconContainer } from '@/components/ui/IconContainer';
import { Stagger, StaggerItem } from '@/components/ui/Animations';
import { BookOpen, CheckCircle2, Link2, Clock } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

export function CurrentlyLearning() {
  const t = useTranslations('currentlyLearning');
  const locale = useLocale();
  const learningItems = locale === 'pt' ? learningPt : learningEn;
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<typeof learningItems[0] | null>(null);
  const [animatedProgress, setAnimatedProgress] = useState<Record<string, number>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      learningItems.forEach((item) => {
        if (item.progress !== undefined) {
          let progress = 0;
          const interval = setInterval(() => {
            progress += 2;
            if (progress >= item.progress!) {
              progress = item.progress!;
              clearInterval(interval);
            }
            setAnimatedProgress(prev => ({ ...prev, [item.id]: progress }));
          }, 15);
        }
      });
    }
  }, [isVisible, learningItems]);

  const filters = [
    { id: 'all', labelPt: 'Todos', labelEn: 'All' },
    { id: 'system-design', labelPt: 'System Design', labelEn: 'System Design' },
    { id: 'event-driven', labelPt: 'Event-Driven', labelEn: 'Event-Driven' },
    { id: 'cloud', labelPt: 'Cloud', labelEn: 'Cloud' }
  ];

  return (
    <section className="w-full" ref={containerRef}>
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-5 bg-primary-500 rounded-full flex-shrink-0" />
            <h2 className="text-2xl font-bold text-neutral-900">
              {t('title')}
            </h2>
          </div>
          <p className="text-sm text-neutral-500 ml-6">
            {t('subtitle')}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
              }`}
            >
              {locale === 'pt' ? filter.labelPt : filter.labelEn}
            </button>
          ))}
        </div>

        {/* Learning Items Grid */}
        <Stagger key={activeFilter} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {learningItems
            .filter(item => {
              if (activeFilter === 'all') return true;
              const filterMap: Record<string, string> = {
                'system-design': 'System Design',
                'event-driven': 'Event-Driven',
                'cloud': 'Cloud'
              };
              return item.category === filterMap[activeFilter];
            })
            .map((item) => {
              const IconComponent = (LucideIcons as any)[item.icon];
              
              return (
                <StaggerItem key={item.id}>
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="w-full p-5 bg-white rounded-2xl border border-neutral-200 hover:border-primary/30 hover:shadow-lg transition-all duration-300 flex flex-col h-full text-left group cursor-pointer"
                  >
                    <div className="flex flex-col gap-4 flex-grow">
                      {/* Icon */}
                      <div className="flex items-center justify-between">
                        <IconContainer size="md" variant="primary">
                          {IconComponent && <IconComponent className="w-5 h-5 text-primary-600" />}
                        </IconContainer>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          item.priority === 'high' 
                            ? 'bg-red-100 text-red-600' 
                            : 'bg-yellow-100 text-yellow-600'
                        }`}>
                          {item.priority === 'high' ? (locale === 'pt' ? 'Alta' : 'High') : (locale === 'pt' ? 'Média' : 'Medium')}
                        </span>
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-base font-bold text-neutral-900 leading-tight min-h-[3rem]">
                        {item.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-sm text-neutral-600 leading-relaxed line-clamp-2 flex-grow">
                        {item.description}
                      </p>
                      
                      {/* Progress Bar */}
                      {item.progress !== undefined && (
                        <div className="flex flex-col gap-1">
                          <div className="flex justify-between text-xs text-neutral-500">
                            <span>{t('progress')}</span>
                            <span>{animatedProgress[item.id] || 0}%</span>
                          </div>
                          <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary-500 rounded-full"
                              style={{ width: `${animatedProgress[item.id] || 0}%` }}
                            />
                          </div>
                        </div>
                      )}
                      
                      {/* CTA */}
                      <div className="mt-auto pt-3 border-t border-neutral-100">
                        <span className="text-sm font-medium text-success-600 group-hover:text-success-700 flex items-center gap-1">
                          {t('learnMore')}
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </button>
                </StaggerItem>
              );
            })}
        </Stagger>
      </div>

      {/* Modal */}
      {selectedItem && (
        <Modal
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          title={selectedItem.title}
        >
          <div className="flex flex-col gap-6">
            {/* Description */}
            <div className="flex items-start gap-3">
              <IconContainer size="sm" variant="primary">
                <BookOpen className="w-4 h-4 text-primary-600" />
              </IconContainer>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {selectedItem.description}
              </p>
            </div>

            {/* Progress */}
            {selectedItem.progress !== undefined && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <Clock className="w-4 h-4" />
                  <span>{t('progress')}</span>
                  <span className="font-medium">{selectedItem.progress}%</span>
                </div>
                <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary-500 rounded-full transition-all duration-500"
                    style={{ width: `${selectedItem.progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Resources */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm font-medium text-neutral-900">
                <Link2 className="w-4 h-4" />
                <span>Resources</span>
              </div>
              <ul className="flex flex-col gap-2 ml-6">
                {selectedItem.resources.map((resource, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-neutral-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                    {resource}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
