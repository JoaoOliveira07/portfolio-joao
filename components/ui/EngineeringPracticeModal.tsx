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
          {IconComponent && <IconComponent className="w-8 h-8 text-emerald-400 flex-shrink-0 mt-1" />}
          <p className="text-lg text-gray-300 leading-relaxed">{practice.shortDescription}</p>
        </div>
        
        {/* Long Description */}
        <div className="bg-neutral-800/50 rounded-lg p-5 border border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-semibold text-white">{t('overview')}</h3>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">{practice.longDescription}</p>
        </div>

        {/* How I Apply */}
        <div className="bg-emerald-900/20 rounded-lg p-5 border border-emerald-500/20">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-semibold text-white">{t('howIApply')}</h3>
          </div>
          <ul className="flex flex-col gap-3">
            {practice.howIApply.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Related Projects */}
        {practice.relatedProjects && practice.relatedProjects.length > 0 && (
          <div className="bg-neutral-800/50 rounded-lg p-5 border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <FolderGit2 className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-semibold text-white">{t('relatedProjects')}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {practice.relatedProjects.map((projectSlug) => (
                <Badge key={projectSlug} variant="default" className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
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
