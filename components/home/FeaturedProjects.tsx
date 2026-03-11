'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { projects as projectsPt } from '@/data/projects/pt';
import { projects as projectsEn } from '@/data/projects/en';

const categoryIcons = {
  iac: '🏗️',
  'event-driven': '📐',
  integration: '🔗',
  sync: '🔄',
  automation: '🤖',
  monolith: '🏛️',
};

export function FeaturedProjects() {
  const t = useTranslations('projects');
  const locale = useLocale();
  const projects = locale === 'pt' ? projectsPt : projectsEn;

  return (
    <section className="w-full py-16 bg-surface/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl md:text-4xl font-bold text-text">
              {t('title')}
            </h2>
            <p className="text-textMuted">
              {locale === 'pt' 
                ? 'Ordenados por complexidade técnica' 
                : 'Sorted by technical complexity'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card
                key={project.slug}
                className="flex flex-col hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-4xl">{categoryIcons[project.category]}</div>
                    <Badge variant="outline" className="text-xs">
                      {'⭐'.repeat(project.complexity)}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl mt-4">{project.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {project.subtitle}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-1">
                  <p className="text-sm text-textMuted line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="default" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.techStack.length > 3 && (
                      <Badge variant="default" className="text-xs">
                        +{project.techStack.length - 3}
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
    </section>
  );
}
