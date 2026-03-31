'use client';

import { Modal } from '@/components/ui/Modal';
import { MermaidDiagram } from '@/components/ui/MermaidDiagram';
import { Badge } from '@/components/ui/Badge';
import { Cog, Zap, BarChart3, Layers } from 'lucide-react';
import { useTranslations } from 'next-intl';
import * as LucideIcons from 'lucide-react';

interface SystemDesignModalProps {
  isOpen: boolean;
  onClose: () => void;
  study: {
    id: string;
    icon: string;
    title: string;
    description: string;
    category: string;
    diagram: string;
    keyDecisions: string[];
    components: {
      name: string;
      description: string;
    }[];
    scalabilityNotes: string[];
    estimatedScale: string;
  };
}

export function SystemDesignModal({ isOpen, onClose, study }: SystemDesignModalProps) {
  const t = useTranslations('systemDesign');
  const IconComponent = (LucideIcons as any)[study.icon];
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={study.title}>
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-2 -mt-2">
          <div className="flex items-center gap-3">
            {IconComponent && <IconComponent className="w-6 h-6 text-emerald-400" />}
            <span className="text-sm font-medium text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              {study.category}
            </span>
          </div>
          <p className="text-lg text-gray-300 leading-relaxed">{study.description}</p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Zap className="w-4 h-4" />
            <span className="font-medium">{t('estimatedScale')}:</span>
            <span>{study.estimatedScale}</span>
          </div>
        </div>

        {/* Architecture Diagram */}
        <div className="bg-neutral-800/50 rounded-lg p-5 border border-white/10">
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-semibold text-white">{t('architecture')}</h3>
          </div>
          <div className="bg-neutral-950 rounded-lg p-4 overflow-x-auto border border-white/5">
            <MermaidDiagram chart={study.diagram} />
          </div>
        </div>

        {/* Key Decisions */}
        <div className="bg-emerald-900/20 rounded-lg p-5 border border-emerald-500/20">
          <div className="flex items-center gap-2 mb-3">
            <Cog className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-semibold text-white">{t('keyDecisions')}</h3>
          </div>
          <ul className="flex flex-col gap-3">
            {study.keyDecisions.map((decision, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed font-medium">{decision}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Components */}
        <div className="bg-neutral-800/50 rounded-lg p-5 border border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <Cog className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-semibold text-white">{t('components')}</h3>
          </div>
          <div className="flex flex-col gap-4">
            {study.components.map((component, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <Badge variant="default" className="text-xs flex-shrink-0 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {idx + 1}
                </Badge>
                <div>
                  <h4 className="text-sm font-semibold text-white">{component.name}</h4>
                  <p className="text-sm text-gray-400">{component.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scalability Notes */}
        <div className="bg-neutral-800/50 rounded-lg p-5 border border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-semibold text-white">{t('scalability')}</h3>
          </div>
          <ul className="flex flex-col gap-2.5">
            {study.scalabilityNotes.map((note, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-gray-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0 mt-2" />
                <span className="leading-relaxed">{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Modal>
  );
}
