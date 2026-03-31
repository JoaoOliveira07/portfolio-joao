'use client';

import { cn } from '@/lib/utils';
import React, { useEffect, useRef } from 'react';

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
  reverse?: boolean;
  initialOffset?: number;
}

export function BorderBeam({
  className,
  size = 50,
  duration = 6,
  delay = 0,
  colorFrom = '#10b981',
  colorTo = '#059669',
  reverse = false,
  initialOffset = 0,
}: BorderBeamProps) {
  const beamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const beam = beamRef.current;
    if (!beam) return;

    const animate = () => {
      const position = initialOffset + (reverse ? -size : size);
      beam.style.setProperty('--beam-position', `${position}%`);
    };

    animate();
  }, [size, initialOffset, reverse]);

  return (
    <div
      ref={beamRef}
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] border-[inherit]',
        className
      )}
      style={{
        borderWidth: '1px',
      }}
    >
      <div
        className="absolute inset-0 rounded-[inherit]"
        style={{
          padding: '1px',
        }}
      >
        <div
          className="absolute inset-0 rounded-[inherit]"
          style={{
            background: `linear-gradient(var(--beam-direction, 0deg), transparent 0%, ${colorFrom} 50%, transparent 100%)`,
            opacity: 0.5,
          }}
        >
          <div
            className="absolute animate-beam rounded-full"
            style={{
              width: `${size * 2}px`,
              height: `${size * 2}px`,
              background: `linear-gradient(var(--beam-direction, 0deg), ${colorFrom}, ${colorTo})`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              animationDirection: reverse ? 'reverse' : 'normal',
              animationIterationCount: 'infinite',
              animationTimingFunction: 'linear',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes beam {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg);
            opacity: 0;
          }
        }
        
        .animate-beam {
          animation-name: beam;
          animation-fill-mode: forwards;
        }
      `}</style>
    </div>
  );
}
