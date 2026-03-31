'use client';

import { useEffect, useRef } from 'react';

interface SmoothCursorProps {
  className?: string;
}

export function SmoothCursor({ className }: SmoothCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      positionRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      if (!cursor) return;
      
      const dx = positionRef.current.x - velocityRef.current.x;
      const dy = positionRef.current.y - velocityRef.current.y;
      
      velocityRef.current.x += (dx - velocityRef.current.x) * 0.15;
      velocityRef.current.y += (dy - velocityRef.current.y) * 0.15;
      
      cursor.style.transform = `translate(${velocityRef.current.x}px, ${velocityRef.current.y}px)`;
      
      requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    const animationId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`fixed pointer-events-none z-[9999] mix-blend-difference ${className}`}
      style={{
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        background: '#10b981',
        marginTop: '-10px',
        marginLeft: '-10px',
        opacity: 0.8,
      }}
    />
  );
}
