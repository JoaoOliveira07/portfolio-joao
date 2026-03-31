'use client';

import { cn } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';

interface SparklesProps {
  className?: string;
  background?: string;
  particleCount?: number;
  particleSize?: number;
  particleColor?: string;
  speed?: number;
}

export function Sparkles({
  className,
  background = 'transparent',
  particleCount = 50,
  particleSize = 2,
  particleColor = '#10b981',
  speed = 1,
}: SparklesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    life: number;
    maxLife: number;
  }>>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.offsetWidth;
    const height = container.offsetHeight;

    const newParticles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * speed * 0.5,
      vy: (Math.random() - 0.5) * speed * 0.5 - speed * 0.5,
      size: Math.random() * particleSize + 1,
      opacity: Math.random() * 0.5 + 0.5,
      life: 0,
      maxLife: Math.random() * 100 + 50,
    }));

    setParticles(newParticles);
  }, [particleCount, particleSize, speed]);

  useEffect(() => {
    let animationId: number;

    const animate = () => {
      setParticles(prev => prev.map(particle => {
        let { x, y, vx, vy, life, maxLife } = particle;
        
        x += vx;
        y += vy;
        life++;

        if (life > maxLife || y < 0 || x < 0 || x > containerRef.current?.offsetWidth!) {
          x = Math.random() * (containerRef.current?.offsetWidth || 100);
          y = containerRef.current?.offsetHeight || 100;
          life = 0;
          maxLife = Math.random() * 100 + 50;
        }

        return { ...particle, x, y, vx, vy, life, maxLife };
      }));

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn('absolute inset-0 pointer-events-none overflow-hidden', className)}
      style={{ background }}
    >
      {particles.map((particle, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            background: particleColor,
            opacity: particle.opacity * (1 - particle.life / particle.maxLife),
          }}
        />
      ))}
    </div>
  );
}
