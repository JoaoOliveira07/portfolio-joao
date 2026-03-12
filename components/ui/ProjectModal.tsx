'use client';

import { Modal } from '@/components/ui/Modal';
import { MermaidDiagram } from '@/components/ui/MermaidDiagram';
import { Badge } from '@/components/ui/Badge';
import { Target, Lightbulb, TrendingUp, Code, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    subtitle: string;
    description: string;
    techStack: string[];
    diagram?: string;
    technicalDecisions?: string[];
    challenges?: string[];
    results?: string[];
  };
}

export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  const t = useTranslations('projectModal');
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={project.title}>
      <div className="flex flex-col gap-8">
        {/* Subtitle */}
        <p className="text-lg text-neutral-600 -mt-2">{project.subtitle}</p>
        
        {/* Description */}
        <div className="bg-neutral-50 rounded-lg p-5 border border-neutral-200">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-5 h-5 text-primary-600" />
            <h3 className="text-base font-semibold text-neutral-900">{t('description')}</h3>
          </div>
          <p className="text-sm text-neutral-600 leading-relaxed">{project.description}</p>
        </div>

        {/* Architecture Diagram */}
        {project.diagram && (
          <div className="bg-neutral-50 rounded-lg p-5 border border-neutral-200">
            <div className="flex items-center gap-2 mb-4">
              <Code className="w-5 h-5 text-primary-600" />
              <h3 className="text-base font-semibold text-neutral-900">{t('architecture')}</h3>
            </div>
            <div className="bg-white rounded-lg p-4 overflow-x-auto border border-neutral-200">
              <MermaidDiagram chart={project.diagram} />
            </div>
          </div>
        )}

        {/* Technical Decisions */}
        {project.technicalDecisions && project.technicalDecisions.length > 0 && (
          <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg p-5 border border-primary-200">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-primary-600" />
              <h3 className="text-base font-semibold text-neutral-900">{t('technicalDecisions')}</h3>
            </div>
            <ul className="flex flex-col gap-3">
              {project.technicalDecisions.map((decision, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-neutral-700">
                  <span className="w-6 h-6 rounded-full bg-primary-500 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed font-medium">{decision}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Challenges */}
        {project.challenges && project.challenges.length > 0 && (
          <div className="bg-neutral-50 rounded-lg p-5 border border-neutral-200">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-5 h-5 text-primary-600" />
              <h3 className="text-base font-semibold text-neutral-900">{t('challenges')}</h3>
            </div>
            <ul className="flex flex-col gap-2.5">
              {project.challenges.map((challenge, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-neutral-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0 mt-2" />
                  <span className="leading-relaxed">{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Results */}
        {project.results && project.results.length > 0 && (
          <div className="bg-neutral-50 rounded-lg p-5 border border-neutral-200">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-primary-600" />
              <h3 className="text-base font-semibold text-neutral-900">{t('results')}</h3>
            </div>
            <ul className="flex flex-col gap-2.5">
              {project.results.map((result, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-neutral-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0 mt-2" />
                  <span className="leading-relaxed">{result}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech Stack */}
        <div className="bg-neutral-50 rounded-lg p-5 border border-neutral-200">
          <div className="flex items-center gap-2 mb-3">
            <Code className="w-5 h-5 text-primary-600" />
            <h3 className="text-base font-semibold text-neutral-900">{t('completeStack')}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="default" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
