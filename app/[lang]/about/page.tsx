import { useTranslations } from 'next-intl';
import { Timeline, Competencies } from '@/components/about/Timeline';

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <main className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col gap-12">
          {/* Header */}
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl md:text-5xl font-bold text-text">
              {t('title')}
            </h1>
          </div>

          {/* Competencies */}
          <section className="flex flex-col gap-6">
            <h2 className="text-3xl font-bold text-text">
              {t('competencies')}
            </h2>
            <Competencies />
          </section>

          {/* Experience */}
          <section className="flex flex-col gap-6">
            <h2 className="text-3xl font-bold text-text">
              {t('experience')}
            </h2>
            <Timeline />
          </section>
        </div>
      </div>
    </main>
  );
}
