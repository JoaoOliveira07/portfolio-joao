'use client';

import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import { BookOpen, CheckCircle2, FolderGit2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import * as LucideIcons from 'lucide-react';

interface EngineeringPracticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  practice: {
    id: string;
    icon: string;
    title: string;
    shortDescription: string;
    longDescription: string;
    howIApply: string[];
    relatedProjects?: string[];
  };
}

export function EngineeringPracticeModal({ isOpen, onClose, practice }: EngineeringPracticeModalProps) {
  const t = useTranslations('engineeringPractices');
  const IconComponent = (LucideIcons as any)[practice.icon];
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={practice.title}>
      <div className="flex flex-col gap-8">
        {/* Icon + Short Description */}
        <div className="flex items-start gap-4 -mt-2">
          {IconComponent && <IconComponent className="w-8 h-8 text-primary-600 flex-shrink-0 mt-1" />}
          <p className="text-lg text-neutral-600 leading-relaxed">{practice.shortDescription}</p>
        </div>
        
        {/* Long Description */}
        <div className="bg-neutral-50 rounded-lg p-5 border border-neutral-200">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-5 h-5 text-primary-600" />
            <h3 className="text-base font-semibold text-neutral-900">{t('overview')}</h3>
          </div>
          <p className="text-sm text-neutral-600 leading-relaxed">{practice.longDescription}</p>
        </div>

        {/* How I Apply */}
        <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg p-5 border border-primary-200">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-5 h-5 text-primary-600" />
            <h3 className="text-base font-semibold text-neutral-900">{t('howIApply')}</h3>
          </div>
          <ul className="flex flex-col gap-3">
            {practice.howIApply.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-neutral-700">
                <span className="w-6 h-6 rounded-full bg-primary-500 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Related Projects */}
        {practice.relatedProjects && practice.relatedProjects.length > 0 && (
          <div className="bg-neutral-50 rounded-lg p-5 border border-neutral-200">
            <div className="flex items-center gap-2 mb-3">
              <FolderGit2 className="w-5 h-5 text-primary-600" />
              <h3 className="text-base font-semibold text-neutral-900">{t('relatedProjects')}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {practice.relatedProjects.map((projectSlug) => (
                <Badge key={projectSlug} variant="default" className="text-xs">
                  {projectSlug}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
