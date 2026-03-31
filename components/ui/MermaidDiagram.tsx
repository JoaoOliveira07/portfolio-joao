'use client';

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chart: string;
  className?: string;
}

export function MermaidDiagram({ chart, className }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [svgContent, setSvgContent] = useState<string>('');

  useEffect(() => {
    if (!chart) {
      setIsLoading(false);
      return;
    }

    let mounted = true;

    const renderDiagram = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        mermaid.initialize({
          startOnLoad: false,
          theme: 'dark',
          securityLevel: 'loose',
          themeVariables: {
            primaryColor: '#10b981',
            primaryTextColor: '#ffffff',
            primaryBorderColor: '#059669',
            lineColor: '#6b7280',
            secondaryColor: '#171717',
            tertiaryColor: '#262626',
            background: '#000000',
            mainBkg: '#171717',
            secondBkg: '#262626',
            nodeBorder: '#059669',
            clusterBkg: '#171717',
            clusterBorder: '#404040',
            titleColor: '#ffffff',
            textColor: '#ffffff',
            fontSize: '12px',
          },
        });

        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const { svg } = await mermaid.render(id, chart);
        
        if (mounted) {
          setSvgContent(svg);
        }
      } catch (err) {
        console.error('Mermaid render error:', err);
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to render diagram');
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    renderDiagram();

    return () => {
      mounted = false;
    };
  }, [chart]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8 min-h-[200px]">
        <div className="animate-pulse text-gray-500 text-sm">Carregando diagrama...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-400 text-sm bg-red-900/20 rounded-lg border border-red-500/30">
        Erro: {error}
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`rounded-lg overflow-x-auto bg-neutral-900 p-4 ${className}`}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}