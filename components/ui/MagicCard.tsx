'use client';

import { cn } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagicCardProps {
  children: React.ReactNode;
  className?: string;
  mode?: 'gradient' | 'orb';
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
  gradientFrom?: string;
  gradientTo?: string;
  enableBeam?: boolean;
}

export function MagicCard({
  children,
  className,
  mode = 'gradient',
  gradientSize = 200,
  gradientColor = '#262626',
  gradientOpacity = 0.8,
  gradientFrom = '#9E7AFF',
  gradientTo = '#FE8BBB',
  enableBeam = false,
}: MagicCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        'relative overflow-hidden rounded-xl border border-white/10 bg-neutral-900/50 backdrop-blur-sm',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Beam effect */}
      {enableBeam && (
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl"
          style={{
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            padding: '1px',
          }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(45deg, transparent 40%, #10b981 50%, transparent 60%)`,
              backgroundSize: '200% 200%',
            }}
            animate={{
              backgroundPosition: isHovered ? ['0% 0%', '100% 100%'] : ['0% 0%', '0% 0%'],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>
      )}

      {/* Gradient effect */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: mode === 'gradient' 
            ? `radial-gradient(${gradientSize}px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(16, 185, 129, 0.15), transparent 40%)`
            : undefined,
        }}
      />

      {/* Orb effect */}
      {mode === 'orb' && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${gradientFrom}, ${gradientTo})`,
            opacity: isHovered ? 0.1 : 0,
            transition: 'opacity 500ms ease',
            filter: 'blur(60px)',
          }}
        />
      )}

      {/* Border highlight on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(${gradientSize}px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(16, 185, 129, 0.3), transparent 40%)`,
        }}
      />

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
