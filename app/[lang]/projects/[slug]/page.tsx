import { useTranslations, useLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { projects as projectsPt } from '@/data/projects/pt';
import { projects as projectsEn } from '@/data/projects/en';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

interface ProjectPageProps {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
}

const categoryIcons = {
  iac: '🏗️',
  'event-driven': '📐',
  integration: '🔗',
  sync: '🔄',
  automation: '🤖',
  monolith: '🏛️',
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { lang, slug } = await params;
  const t = useTranslations('projects');
  const locale = lang as 'pt' | 'en';
  
  const projects = locale === 'pt' ? projectsPt : projectsEn;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <main className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex flex-col gap-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-textMuted">
            <Link href={`/${locale}`} className="hover:text-text">
              Home
            </Link>
            <span>/</span>
            <Link href={`/${locale}/projects`} className="hover:text-text">
              {t('title')}
            </Link>
            <span>/</span>
            <span className="text-text">{project.title}</span>
          </nav>

          {/* Hero */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <span className="text-6xl">{categoryIcons[project.category]}</span>
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl md:text-4xl font-bold text-text">
                  {project.title}
                </h1>
                <p className="text-lg text-textMuted">{project.subtitle}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="outline">
                {'⭐'.repeat(project.complexity)}
              </Badge>
              <Badge variant="secondary">{project.year}</Badge>
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="default">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Problem */}
          <section className="flex flex-col gap-4 p-6 bg-surface rounded-lg border border-border">
            <h2 className="text-2xl font-bold text-primary">{t('problem')}</h2>
            <p className="text-textMuted leading-relaxed">{project.problem}</p>
          </section>

          {/* Solution */}
          <section className="flex flex-col gap-4 p-6 bg-surface rounded-lg border border-border">
            <h2 className="text-2xl font-bold text-accent">{t('solution')}</h2>
            <p className="text-textMuted leading-relaxed">{project.solution}</p>
          </section>

          {/* Highlights */}
          <section className="flex flex-col gap-4 p-6 bg-surface rounded-lg border border-border">
            <h2 className="text-2xl font-bold text-text">{t('highlights')}</h2>
            <ul className="flex flex-col gap-3">
              {project.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-textMuted">{highlight}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Role */}
          <section className="flex flex-col gap-4 p-6 bg-surface rounded-lg border border-border">
            <h2 className="text-2xl font-bold text-text">{t('role')}</h2>
            <p className="text-textMuted leading-relaxed">{project.role}</p>
          </section>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-8 border-t border-border">
            {prevProject ? (
              <Button asChild variant="outline">
                <Link href={`/${locale}/projects/${prevProject.slug}`}>
                  <ArrowLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">{prevProject.title}</span>
                  <span className="sm:hidden">
                    {locale === 'pt' ? 'Anterior' : 'Previous'}
                  </span>
                </Link>
              </Button>
            ) : (
              <div />
            )}

            <Button asChild variant="ghost">
              <Link href={`/${locale}/projects`}>
                {locale === 'pt' ? 'Todos os Projetos' : 'All Projects'}
              </Link>
            </Button>

            {nextProject ? (
              <Button asChild variant="outline">
                <Link href={`/${locale}/projects/${nextProject.slug}`}>
                  <span className="hidden sm:inline">{nextProject.title}</span>
                  <span className="sm:hidden">
                    {locale === 'pt' ? 'Próximo' : 'Next'}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  const slugs = projectsPt.map((project) => project.slug);
  const langs = ['pt', 'en'];
  
  return langs.flatMap((lang) =>
    slugs.map((slug) => ({
      lang,
      slug,
    }))
  );
}
