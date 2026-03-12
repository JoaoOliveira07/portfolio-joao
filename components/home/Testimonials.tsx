'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Card } from '@/components/ui/Card';
import { testimonials } from '@/data/testimonials';
import { Linkedin, Quote } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function Testimonials() {
  const locale = useLocale();
  const t = useTranslations('testimonials');

  const getRole = (testimonial: typeof testimonials[0]) => {
    return testimonial.author.role[locale as 'pt' | 'en'];
  };

  const getContent = (testimonial: typeof testimonials[0]) => {
    return testimonial.content[locale as 'pt' | 'en'];
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1 h-5 bg-primary-500 rounded-full flex-shrink-0" />
        <h2 className="text-2xl font-bold text-neutral-900">
          {locale === 'pt' ? 'Depoimentos' : 'Testimonials'}
        </h2>
      </div>

      {/* Grid de Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map((testimonial) => (
          <Card
            key={testimonial.id}
            className="p-6 hover:border-primary/30 hover:shadow-md transition-all flex flex-col h-full"
          >
            <div className="flex items-start gap-3 mb-4">
              {testimonial.author.avatar ? (
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={testimonial.author.avatar}
                    alt={testimonial.author.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-600 font-bold">
                    {testimonial.author.name.charAt(0)}
                  </span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-neutral-900 truncate">
                  {testimonial.author.name}
                </h3>
                <p className="text-sm text-neutral-500 truncate">
                  {getRole(testimonial)}
                </p>
              </div>
              {testimonial.author.linkedin && (
                <Link
                  href={testimonial.author.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-primary-500 transition-colors flex-shrink-0"
                >
                  <Linkedin className="w-5 h-5" />
                </Link>
              )}
            </div>

            <div className="flex-1">
              <Quote className="w-5 h-5 text-primary-200 mb-2" />
              <p className="text-neutral-600 text-sm leading-relaxed">
                {getContent(testimonial)}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
