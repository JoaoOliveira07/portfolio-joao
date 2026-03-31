'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionDividerProps {
  className?: string;
  variant?: 'gradient' | 'wave' | 'glow' | 'line';
}

export function SectionDivider({ className, variant = 'gradient' }: SectionDividerProps) {
  if (variant === 'wave') {
    return (
      <div className={cn('relative w-full h-16 overflow-hidden', className)}>
        <svg
          className="absolute w-full h-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-neutral-950"
          />
        </svg>
      </div>
    );
  }

  if (variant === 'glow') {
    return (
      <div className={cn('relative h-px w-full', className)}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-emerald-400 rounded-full blur-sm"
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    );
  }

  if (variant === 'line') {
    return (
      <div className={cn('relative h-px w-full', className)}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-emerald-500/20 to-neutral-950" />
      </div>
    );
  }

  return (
    <div className={cn('relative h-24 w-full pointer-events-none', className)}>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent" />
    </div>
  );
}