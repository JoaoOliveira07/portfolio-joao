import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';
import { projects, type Project } from '@/data/projects';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Server,
  Smartphone,
  Globe,
  LayoutDashboard,
  Plug,
  Workflow,
  Cloud,
  RefreshCw,
  Bot,
  Network,
} from 'lucide-react';
import Link from 'next/link';

interface ProjectPageProps {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  const locale = lang as 'pt' | 'en';
  return {
    title: project.title[locale],
    description: project.subtitle[locale],
    alternates: {
      canonical: `/${lang}/projects/${slug}`,
      languages: {
        pt: `/pt/projects/${slug}`,
        en: `/en/projects/${slug}`,
      },
    },
    openGraph: {
      title: project.title[locale],
      description: project.subtitle[locale],
      type: 'article',
    },
  };
}

const categoryIcons: Record<Project['category'], typeof Server> = {
  monolith: Server,
  frontend: Globe,
  admin: LayoutDashboard,
  mobile: Smartphone,
  integration: Plug,
  'event-driven': Workflow,
  iac: Cloud,
  sync: RefreshCw,
  automation: Bot,
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { lang, slug } = await params;
  const t = useTranslations('projects');
  const locale = lang as 'pt' | 'en';

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
              {locale === 'pt' ? 'Início' : 'Home'}
            </Link>
            <span>/</span>
            <Link href={`/${locale}/projects`} className="hover:text-text">
              {t('title')}
            </Link>
            <span>/</span>
            <span className="text-text">{project.title[locale]}</span>
          </nav>

          {/* Hero */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              {(() => {
                const Icon = categoryIcons[project.category] ?? Network;
                return (
                  <span className="flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/25">
                    <Icon className="w-8 h-8 text-emerald-400" aria-hidden />
                  </span>
                );
              })()}
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl md:text-4xl font-bold text-text">
                  {project.title[locale]}
                </h1>
                <p className="text-lg text-textMuted">{project.subtitle[locale]}</p>
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
            <p className="text-textMuted leading-relaxed">{project.problem[locale]}</p>
          </section>

          {/* Solution */}
          <section className="flex flex-col gap-4 p-6 bg-surface rounded-lg border border-border">
            <h2 className="text-2xl font-bold text-accent">{t('solution')}</h2>
            <p className="text-textMuted leading-relaxed">{project.solution[locale]}</p>
          </section>

          {/* Highlights */}
          <section className="flex flex-col gap-4 p-6 bg-surface rounded-lg border border-border">
            <h2 className="text-2xl font-bold text-text">{t('highlights')}</h2>
            <ul className="flex flex-col gap-3">
              {project.highlights[locale].map((highlight, index) => (
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
            <p className="text-textMuted leading-relaxed">{project.role[locale]}</p>
          </section>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-8 border-t border-border">
            {prevProject ? (
              <Button asChild variant="outline">
                <Link href={`/${locale}/projects/${prevProject.slug}`}>
                  <ArrowLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">{prevProject.title[locale]}</span>
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
                  <span className="hidden sm:inline">{nextProject.title[locale]}</span>
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
  const slugs = projects.map((project) => project.slug);
  const langs = ['pt', 'en'];

  return langs.flatMap((lang) =>
    slugs.map((slug) => ({
      lang,
      slug,
    }))
  );
}
