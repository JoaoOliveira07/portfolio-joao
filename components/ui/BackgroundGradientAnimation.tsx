'use client';

import { cn } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';

interface BackgroundGradientAnimationProps {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  interactive?: boolean;
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  pointerColor?: string;
  size?: string;
  blendingValue?: string;
}

export function BackgroundGradientAnimation({
  children,
  className,
  containerClassName,
  interactive = true,
  gradientBackgroundStart = 'rgb(13, 17, 23)',
  gradientBackgroundEnd = 'rgb(13, 17, 23)',
  firstColor = '18, 113, 255',
  secondColor = '221, 74, 255',
  thirdColor = '100, 220, 255',
  fourthColor = '200, 50, 50',
  fifthColor = '180, 180, 50',
  pointerColor = '140, 100, 255',
  size = '80%',
  blendingValue = 'hard-light',
}: BackgroundGradientAnimationProps) {
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.current = e.clientX - rect.left;
      mouseY.current = e.clientY - rect.top;
    };

    const container = containerRef.current;
    if (container && interactive) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [interactive]);

  return (
    <div
      className={cn(
        'absolute inset-0 overflow-hidden bg-neutral-950',
        containerClassName
      )}
      ref={containerRef}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, ${gradientBackgroundStart}, ${gradientBackgroundEnd})`,
        }}
      />

      <svg
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{ filter: `blur(${size})` }}
      >
        <defs>
          <linearGradient id="firstGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={`rgb(${firstColor})`} stopOpacity="0.5" />
            <stop offset="100%" stopColor={`rgb(${firstColor})`} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="secondGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={`rgb(${secondColor})`} stopOpacity="0.5" />
            <stop offset="100%" stopColor={`rgb(${secondColor})`} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="thirdGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={`rgb(${thirdColor})`} stopOpacity="0.5" />
            <stop offset="100%" stopColor={`rgb(${thirdColor})`} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="fourthGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={`rgb(${fourthColor})`} stopOpacity="0.5" />
            <stop offset="100%" stopColor={`rgb(${fourthColor})`} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="fifthGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={`rgb(${fifthColor})`} stopOpacity="0.5" />
            <stop offset="100%" stopColor={`rgb(${fifthColor})`} stopOpacity="0" />
          </linearGradient>
        </defs>

        {isMounted && (
          <>
            <g style={{ mixBlendMode: blendingValue as any }}>
              <animate
                attributeName="transform"
                type="translate"
                dur="30s"
                repeatCount="indefinite"
                values="0,0; 0,-50%; 0,0"
                keyTimes="0; 0.5; 1"
              >
                <animate
                  attributeName="cx"
                  dur="30s"
                  repeatCount="indefinite"
                  values={`${size}; calc(100% - ${size})`}
                  keyTimes="0; 1"
                />
              </animate>
              <circle
                cx="50%"
                cy="0%"
                r={size}
                fill="url(#firstGradient)"
                style={{ opacity: 0.5 }}
              />
            </g>

            <g style={{ mixBlendMode: blendingValue as any }}>
              <animate
                attributeName="transform"
                type="rotate"
                dur="20s"
                repeatCount="indefinite"
                values="0 50% 50%; 180deg 50% 50%; 360deg 50% 50%"
                keyTimes="0; 0.5; 1"
              />
              <circle
                cx="50%"
                cy="50%"
                r={size}
                fill="url(#secondGradient)"
                style={{ opacity: 0.5 }}
              />
            </g>

            <g style={{ mixBlendMode: blendingValue as any }}>
              <animate
                attributeName="transform"
                type="rotate"
                dur="40s"
                repeatCount="indefinite"
                values="0 50% 50%; 180deg 50% 50%; 360deg 50% 50%"
                keyTimes="0; 0.5; 1"
              />
              <circle
                cx="50%"
                cy="50%"
                r={size}
                fill="url(#thirdGradient)"
                style={{ opacity: 0.5 }}
              />
            </g>

            <g style={{ mixBlendMode: blendingValue as any }}>
              <animate
                attributeName="transform"
                type="translate"
                dur="40s"
                repeatCount="indefinite"
                values="0,0; 50%,0; 0,0"
                keyTimes="0; 0.5; 1"
              />
              <circle
                cx="50%"
                cy="50%"
                r={size}
                fill="url(#fourthGradient)"
                style={{ opacity: 0.5 }}
              />
            </g>

            <g style={{ mixBlendMode: blendingValue as any }}>
              <animate
                attributeName="transform"
                type="rotate"
                dur="20s"
                repeatCount="indefinite"
                values="0 50% 50%; 180deg 50% 50%; 360deg 50% 50%"
                keyTimes="0; 0.5; 1"
              />
              <circle
                cx="50%"
                cy="50%"
                r={size}
                fill="url(#fifthGradient)"
                style={{ opacity: 0.5 }}
              />
            </g>
          </>
        )}
      </svg>

      {interactive && isMounted && (
        <div
          className="absolute pointer-events-none"
          style={{
            left: mouseX.current,
            top: mouseY.current,
            transform: 'translate(-50%, -50%)',
            filter: `blur(${size})`,
            background: `radial-gradient(circle, rgb(${pointerColor}), transparent 80%)`,
            opacity: 0.15,
          }}
        />
      )}

      <div className={cn('relative z-10', className)}>{children}</div>

      <style>{`
        @keyframes moveHorizontal {
          0% {
            transform: translateX(-50%) translateY(-10%);
          }
          50% {
            transform: translateX(50%) translateY(10%);
          }
          100% {
            transform: translateX(-50%) translateY(-10%);
          }
        }

        @keyframes moveInCircle {
          0% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(180deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes moveVertical {
          0% {
            transform: translateY(-50%);
          }
          50% {
            transform: translateY(50%);
          }
          100% {
            transform: translateY(-50%);
          }
        }
      `}</style>
    </div>
  );
}
