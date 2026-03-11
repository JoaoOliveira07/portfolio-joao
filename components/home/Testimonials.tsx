'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Card } from '@/components/ui/Card';
import { testimonials } from '@/data/testimonials';
import { Linkedin, User } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';

export function Testimonials() {
  const locale = useLocale();
  const t = useTranslations('testimonials');
  
  // Show only featured testimonials on home page
  const featuredTestimonials = testimonials.filter(t => t.featured);

  return (
    <section className="w-full py-20 md:py-32 bg-white border-t border-dashed border-neutral-200">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-1 h-6 bg-primary-500 rounded-full flex-shrink-0 mt-1" />
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
              {locale === 'pt' ? 'Recomendações' : 'Testimonials'}
            </h2>
          </div>
          <p className="text-base text-neutral-500 ml-7">
            {locale === 'pt' 
              ? 'O que colegas e líderes dizem sobre trabalhar comigo' 
              : 'What colleagues and leaders say about working with me'}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 md:mb-16">
          {featuredTestimonials.map((testimonial) => (
            <Card key={testimonial.id} className="p-6 hover:border-primary/30 hover:shadow-md transition-all">
              {/* Header - Avatar + Author Info */}
              <div className="flex items-start gap-3 mb-4">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  {testimonial.author.avatar ? (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-neutral-100">
                      <Image 
                        src={testimonial.author.avatar}
                        alt={testimonial.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center">
                      <User className="w-6 h-6 text-neutral-400" />
                    </div>
                  )}
                </div>
                
                {/* Author Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h4 className="font-semibold text-neutral-900 text-sm">{testimonial.author.name}</h4>
                    <a 
                      href={testimonial.author.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-500 hover:text-primary-600 transition-colors flex-shrink-0"
                      aria-label={`Ver perfil de ${testimonial.author.name} no LinkedIn`}
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
              <p className="text-xs text-neutral-600 leading-tight">{testimonial.author.role[locale as 'pt' | 'en']}</p>
              <p className="text-xs text-neutral-500">{testimonial.author.company}</p>
                </div>
              </div>

              {/* Content - Limited to 5 lines */}
              <p className="text-sm text-neutral-700 leading-relaxed line-clamp-5">
                {testimonial.content[locale as 'pt' | 'en']}
              </p>
            </Card>
          ))}
        </div>

        {/* CTA to About Page */}
        <div className="text-center">
          <Button asChild variant="outline" size="lg">
            <Link href={`/${locale}/about`}>
              {locale === 'pt' ? 'Ver todas as recomendações' : 'View all recommendations'}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
