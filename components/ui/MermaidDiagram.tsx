'use client';

import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chart: string;
  className?: string;
}

export function MermaidDiagram({ chart, className }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const idRef = useRef(`mermaid-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    if (!ref.current || !chart) return;

    const renderDiagram = async () => {
      try {
        // Clear previous content
        if (ref.current) {
          ref.current.innerHTML = '';
        }

        // Initialize mermaid
        mermaid.initialize({
          startOnLoad: false,
          theme: 'default',
          securityLevel: 'loose',
          fontFamily: 'inherit',
          themeVariables: {
            primaryColor: '#01926D',
            primaryTextColor: '#fff',
            primaryBorderColor: '#017A5C',
            lineColor: '#525252',
            secondaryColor: '#A855F7',
            tertiaryColor: '#f5f5f5',
          },
        });

        // Generate unique ID for this render
        const id = `${idRef.current}-${Date.now()}`;
        
        // Render diagram
        const { svg } = await mermaid.render(id, chart);
        
        // Update DOM
        if (ref.current) {
          ref.current.innerHTML = svg;
        }
      } catch (error) {
        console.error('Error rendering Mermaid diagram:', error);
        if (ref.current) {
          ref.current.innerHTML = '<p class="text-red-500">Error rendering diagram</p>';
        }
      }
    };

    renderDiagram();
  }, [chart]);

  return (
    <div 
      ref={ref}
      className={className}
    />
  );
}
