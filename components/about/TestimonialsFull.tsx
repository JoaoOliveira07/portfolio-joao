'use client';

import { useLocale } from 'next-intl';
import { Card } from '@/components/ui/Card';
import { testimonials } from '@/data/testimonials';
import { Linkedin, User } from 'lucide-react';
import Image from 'next/image';

export function TestimonialsFull() {
  const locale = useLocale();

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      {testimonials.map((testimonial) => (
        <Card key={testimonial.id} className="p-6 hover:border-primary/30 hover:shadow-md transition-all">
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            {/* Avatar */}
            <div className="flex-shrink-0">
              {testimonial.author.avatar ? (
                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-neutral-100">
                  <Image 
                    src={testimonial.author.avatar}
                    alt={testimonial.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center">
                  <User className="w-8 h-8 text-neutral-400" />
                </div>
              )}
            </div>

            {/* Author Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-base font-semibold text-neutral-900">{testimonial.author.name}</h3>
                <a 
                  href={testimonial.author.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-500 hover:text-primary-600 transition-colors"
                  aria-label={`Ver perfil de ${testimonial.author.name} no LinkedIn`}
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
              <p className="text-xs text-neutral-600 leading-tight mb-0.5">{testimonial.author.role[locale as 'pt' | 'en']}</p>
              <p className="text-xs text-neutral-500 mb-1">{testimonial.author.company}</p>
              <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                <span>{testimonial.date[locale as 'pt' | 'en']}</span>
                <span>•</span>
                <span>{testimonial.relationship[locale as 'pt' | 'en']}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-neutral max-w-none">
            <p className="text-sm text-neutral-700 leading-relaxed whitespace-pre-line">
              {testimonial.content[locale as 'pt' | 'en']}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}
