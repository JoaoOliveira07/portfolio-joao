'use client';

import { cn } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';

interface SpotlightProps {
  className?: string;
  fill?: string;
  children?: React.ReactNode;
}

export function Spotlight({ className, fill = 'white', children }: SpotlightProps) {
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = spotlightRef.current?.getBoundingClientRect();
      if (rect) {
        mouseX.current = e.clientX - rect.left;
        mouseY.current = e.clientY - rect.top;
      }
    };

    const element = spotlightRef.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
      setIsVisible(true);
    }

    return () => {
      if (element) {
        element.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <div
      ref={spotlightRef}
      className={cn(
        'absolute inset-0 overflow-hidden rounded-xl pointer-events-none',
        className
      )}
      style={{
        opacity: isVisible ? 1 : 0,
      }}
    >
      <div
        className="absolute pointer-events-none inset-0 rounded-xl opacity-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at ${mouseX.current}px ${mouseY.current}px, ${fill}, transparent 80%)`,
          opacity: 0.15,
        }}
      />
      {children}
    </div>
  );
}
