'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { IconContainer } from '@/components/ui/IconContainer';
import { ProjectModal } from '@/components/ui/ProjectModal';
import { ArrowRight, Boxes, Workflow, Link2, RefreshCw, Bot, Building2, Star } from 'lucide-react';
import { projects as projectsPt } from '@/data/projects/pt';
import { projects as projectsEn } from '@/data/projects/en';
import type { Project } from '@/data/projects/pt';

const categoryIcons = {
  iac: Boxes,
  'event-driven': Workflow,
  integration: Link2,
  sync: RefreshCw,
  automation: Bot,
  monolith: Building2,
};

export function FeaturedProjects() {
  const t = useTranslations('projects');
  const locale = useLocale();
  const projects = locale === 'pt' ? projectsPt : projectsEn;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section className="w-full py-20 md:py-32 bg-white border-t border-dashed border-neutral-200">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col gap-12 md:gap-16">
          <div className="mb-0">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-1 h-6 bg-primary-500 rounded-full flex-shrink-0 mt-1" />
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
                {t('title')}
              </h2>
            </div>
            <p className="text-base text-neutral-500 ml-7">
              {locale === 'pt' 
                ? 'Ordenados por complexidade técnica' 
                : 'Sorted by technical complexity'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => {
              const Icon = categoryIcons[project.category];
              
              return (
                <Card
                  key={project.slug}
                  className="flex flex-col hover:border-primary/30 transition-all hover:shadow-md p-5"
                >
                  <CardHeader className="p-0 pb-3">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <IconContainer size="sm" variant="primary">
                        <Icon className="w-5 h-5 text-primary-600" />
                      </IconContainer>
                      <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: project.complexity }).map((_, i) => (
                            <Star key={i} className="w-2.5 h-2.5 fill-primary-500 text-primary-500" />
                          ))}
                        </div>
                        <span className="text-xs text-neutral-400">{project.year}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <CardDescription className="line-clamp-2 text-sm">
                      {project.subtitle}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="flex-1 p-0 py-3">
                    <p className="text-sm text-textMuted line-clamp-2">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="default" className="text-xs px-2 py-0.5">
                          {tech}
                        </Badge>
                      ))}
                      {project.techStack.length > 3 && (
                        <Badge variant="default" className="text-xs px-2 py-0.5">
                          +{project.techStack.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="p-0 pt-3">
                    <Button 
                      variant="ghost" 
                      className="w-full group"
                      onClick={() => setSelectedProject(project)}
                    >
                      <span>{t('viewDetails')}</span>
                      <ArrowRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          project={selectedProject}
        />
      )}
    </section>
  );
}
