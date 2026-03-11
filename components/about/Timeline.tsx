'use client';

import { useLocale } from 'next-intl';
import { Badge } from '@/components/ui/Badge';
import { experience as experiencePt } from '@/data/experience/pt';
import { experience as experienceEn } from '@/data/experience/en';
import { competencies } from '@/data/skills';
import { Briefcase, MapPin, Workflow, FlaskConical, Cloud, ShieldCheck, LucideIcon } from 'lucide-react';
import { IconContainer } from '@/components/ui/IconContainer';

export function Timeline() {
  const locale = useLocale();
  const experience = locale === 'pt' ? experiencePt : experienceEn;

  return (
    <div className="flex flex-col gap-8">
      {/* Company Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-primary-500">
          <Briefcase className="h-5 w-5" />
          <h3 className="text-2xl font-bold text-neutral-900">{experience.company}</h3>
        </div>
        <div className="flex items-center gap-2 text-neutral-500">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{experience.location}</span>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-0 md:left-8 top-0 bottom-0 w-0.5 bg-neutral-200"></div>

        {/* Positions */}
        <div className="flex flex-col gap-12">
          {experience.positions.map((position, index) => (
            <div key={index} className="relative pl-8 md:pl-20">
              {/* Timeline Dot */}
              <div className="absolute left-0 md:left-8 top-1 -translate-x-1/2 w-4 h-4 rounded-full bg-primary-500 border-4 border-white"></div>

              {/* Content */}
              <div className="flex flex-col gap-4 p-5 bg-white rounded-2xl border border-neutral-200 hover:border-primary/30 hover:shadow-md transition-all">
                <div className="flex flex-col gap-2">
                  <h4 className="text-lg font-bold text-neutral-900">{position.title}</h4>
                  <p className="text-xs text-neutral-500">{position.period}</p>
                  <p className="text-sm text-neutral-600 leading-relaxed">{position.description}</p>
                </div>

                {/* Responsibilities */}
                <div className="flex flex-col gap-2">
                  <ul className="flex flex-col gap-2 text-sm text-neutral-600">
                    {position.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-primary-500 mt-1">•</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {position.techStack.map((tech) => (
                    <Badge key={tech} variant="default" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Workflow,
  FlaskConical,
  Cloud,
  ShieldCheck
};

export function Competencies() {
  const locale = useLocale();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {competencies.map((competency, index) => {
        const Icon = iconMap[competency.icon];
        return (
          <div
            key={index}
            className="flex flex-col gap-3 p-6 bg-white rounded-lg border border-neutral-200 hover:border-primary/30 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3">
              <IconContainer size="sm" variant="primary">
                <Icon className="w-5 h-5 text-primary-600" />
              </IconContainer>
              <h3 className="text-lg font-bold text-neutral-900">
                {competency.title[locale as 'pt' | 'en']}
              </h3>
            </div>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {competency.description[locale as 'pt' | 'en']}
            </p>
          </div>
        );
      })}
    </div>
  );
}
