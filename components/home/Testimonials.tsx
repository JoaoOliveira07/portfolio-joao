'use client';

import { useLocale } from 'next-intl';
import Image from 'next/image';
import { Linkedin } from 'lucide-react';
import { testimonials } from '@/data/testimonials';
import Link from 'next/link';

export function Testimonials() {
  const locale = useLocale();

  const getRole = (testimonial: typeof testimonials[0]) => {
    return testimonial.author.role[locale as 'pt' | 'en'];
  };

  const getContent = (testimonial: typeof testimonials[0]) => {
    return testimonial.content[locale as 'pt' | 'en'];
  };

  return (
    <section className="py-20 md:py-32" id="testimonials">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-emerald-700 font-bold tracking-widest text-xs uppercase">
            {locale === 'pt' ? 'Depoimentos' : 'Testimonials'}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mt-3 md:mt-4">
            {locale === 'pt' ? 'Recomendações' : 'Recommendations'}
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white p-6 md:p-8 rounded-xl hover:shadow-lg transition-shadow border border-gray-200"
            >
              {/* Quote Icon */}
              <div className="text-emerald-700 mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>
              
              {/* Content */}
              <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                {getContent(testimonial)}
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  {testimonial.author.avatar ? (
                    <Image
                      src={testimonial.author.avatar}
                      alt={testimonial.author.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-emerald-700 flex items-center justify-center text-white font-bold">
                      {testimonial.author.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 truncate">{testimonial.author.name}</h4>
                  <p className="text-sm text-gray-600 truncate">{getRole(testimonial)}</p>
                </div>
                {testimonial.author.linkedin && (
                  <Link
                    href={testimonial.author.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-emerald-700 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
