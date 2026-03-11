import { useTranslations } from 'next-intl';
import { Timeline, Competencies } from '@/components/about/Timeline';
import { TestimonialsFull } from '@/components/about/TestimonialsFull';

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-white py-20 md:py-32 border-b border-dashed border-neutral-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-start gap-3 mb-8">
            <div className="w-1 h-6 bg-primary-500 rounded-full flex-shrink-0 mt-1" />
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">
              {t('title')}
            </h1>
          </div>
          
          <div className="space-y-6 text-neutral-700 leading-relaxed max-w-4xl">
            <p className="text-lg">{t('intro')}</p>
            <p>{t('expertise')}</p>
            <p>{t('focus')}</p>
            <p className="text-neutral-600 italic">{t('mindset')}</p>
          </div>
        </div>
      </section>

      {/* Competencies Section */}
      <section className="bg-white border-b border-dashed border-neutral-200 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-start gap-3 mb-12 md:mb-16">
            <div className="w-1 h-6 bg-primary-500 rounded-full flex-shrink-0 mt-1" />
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
              {t('competencies')}
            </h2>
          </div>
          <Competencies />
        </div>
      </section>

      {/* Experience Section */}
      <section className="bg-white border-b border-dashed border-neutral-200 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-start gap-3 mb-12 md:mb-16">
            <div className="w-1 h-6 bg-primary-500 rounded-full flex-shrink-0 mt-1" />
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
              {t('experience')}
            </h2>
          </div>
          <Timeline />
        </div>
      </section>

      {/* Recommendations Section */}
      <section className="bg-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-start gap-3 mb-12 md:mb-16">
            <div className="w-1 h-6 bg-primary-500 rounded-full flex-shrink-0 mt-1" />
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
              {t('recommendations')}
            </h2>
          </div>
          <TestimonialsFull />
        </div>
      </section>
    </main>
  );
}
