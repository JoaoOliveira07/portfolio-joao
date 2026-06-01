import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { FeaturedProjects } from '@/components/home/FeaturedProjects';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isPt = lang === 'pt';
  return {
    title: isPt ? 'Projetos' : 'Projects',
    description: isPt
      ? 'Projetos backend: Terraform, event-driven, integração híbrida e mais.'
      : 'Backend projects: Terraform, event-driven, hybrid integration and more.',
    alternates: {
      canonical: `/${lang}/projects`,
      languages: { pt: '/pt/projects', en: '/en/projects' },
    },
  };
}

export default async function ProjectsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'projects' });
  return (
    <main className="bg-neutral-950 pt-24 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-white mb-8">{t('allProjects')}</h1>
        <FeaturedProjects />
      </div>
    </main>
  );
}
