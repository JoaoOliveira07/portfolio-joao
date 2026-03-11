import { useTranslations, useLocale } from 'next-intl';
import { projects as projectsPt } from '@/data/projects/pt';
import { projects as projectsEn } from '@/data/projects/en';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const categoryIcons = {
  iac: '🏗️',
  'event-driven': '📐',
  integration: '🔗',
  sync: '🔄',
  automation: '🤖',
  monolith: '🏛️',
};

export default function ProjectsPage() {
  const t = useTranslations('projects');
  const locale = useLocale();
  const projects = locale === 'pt' ? projectsPt : projectsEn;

  return (
    <main className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl md:text-5xl font-bold text-text">
              {t('title')}
            </h1>
            <p className="text-lg text-textMuted max-w-3xl">
              {locale === 'pt' 
                ? 'Explore meus projetos principais, ordenados por complexidade técnica. Cada projeto representa desafios reais e soluções implementadas em produção.'
                : 'Explore my main projects, sorted by technical complexity. Each project represents real challenges and solutions implemented in production.'}
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card
                key={project.slug}
                className="flex flex-col hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-4xl">{categoryIcons[project.category]}</div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge variant="outline" className="text-xs">
                        {'⭐'.repeat(project.complexity)}
                      </Badge>
                      <span className="text-xs text-textMuted">{project.year}</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl mt-4">{project.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {project.subtitle}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-1">
                  <p className="text-sm text-textMuted line-clamp-4 mb-4">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <Badge key={tech} variant="default" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.techStack.length > 4 && (
                      <Badge variant="default" className="text-xs">
                        +{project.techStack.length - 4}
                      </Badge>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button asChild variant="ghost" className="w-full group">
                    <Link href={`/${locale}/projects/${project.slug}`}>
                      {t('viewDetails')}
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
