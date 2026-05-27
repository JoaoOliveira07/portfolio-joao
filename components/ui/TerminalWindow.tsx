'use client';

import { useEffect, useState, useRef } from 'react';

interface TerminalLine {
  text: string;
  type: 'command' | 'output' | 'comment' | 'success' | 'error';
  delay?: number;
}

const LINES: TerminalLine[] = [
  { text: '# backend engineer terminal', type: 'comment', delay: 0 },
  { text: '$ whoami', type: 'command', delay: 600 },
  { text: 'joao.oliveira — backend engineer @ segalas', type: 'output', delay: 300 },
  { text: '$ cat stack.txt', type: 'command', delay: 800 },
  { text: 'Java · Spring Boot · AWS · Terraform · Kafka', type: 'output', delay: 300 },
  { text: '$ ls projects/', type: 'command', delay: 700 },
  { text: 'iac-terraform/  event-driven/  hybrid-integration/', type: 'output', delay: 300 },
  { text: '$ git log --oneline -3', type: 'command', delay: 900 },
  { text: 'a9f3b2c feat: migrate infra to terraform modules', type: 'success', delay: 200 },
  { text: 'e7d1a04 refactor: event-driven pipeline v2', type: 'success', delay: 150 },
  { text: '3c8f901 fix: circuit breaker threshold tuning', type: 'success', delay: 150 },
  { text: '$ ./run_tests.sh', type: 'command', delay: 700 },
  { text: '✓ 142 tests passed  0 failed  (2.4s)', type: 'success', delay: 800 },
];

const TYPE_COLORS: Record<TerminalLine['type'], string> = {
  command: 'text-emerald-400',
  output: 'text-gray-300',
  comment: 'text-gray-500',
  success: 'text-emerald-300',
  error: 'text-red-400',
};

export function TerminalWindow() {
  const [visibleLines, setVisibleLines] = useState<TerminalLine[]>([]);
  const [currentTyping, setCurrentTyping] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'waiting' | 'done'>('waiting');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lineIndex >= LINES.length) {
      setPhase('done');
      return;
    }

    const line = LINES[lineIndex];

    if (phase === 'waiting') {
      const timer = setTimeout(() => {
        setPhase('typing');
        setCharIndex(0);
        setCurrentTyping('');
      }, line.delay ?? 400);
      return () => clearTimeout(timer);
    }

    if (phase === 'typing') {
      if (charIndex < line.text.length) {
        const timer = setTimeout(() => {
          setCurrentTyping((prev) => prev + line.text[charIndex]);
          setCharIndex((prev) => prev + 1);
        }, line.type === 'command' ? 45 : 15);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setVisibleLines((prev) => [...prev, { ...line, text: line.text }]);
          setCurrentTyping('');
          setLineIndex((prev) => prev + 1);
          setPhase('waiting');
        }, 120);
        return () => clearTimeout(timer);
      }
    }
  }, [lineIndex, charIndex, phase]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visibleLines, currentTyping]);

  const currentLine = lineIndex < LINES.length ? LINES[lineIndex] : null;

  return (
    <div className="w-full max-w-2xl mx-auto rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-emerald-500/5">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-neutral-900 border-b border-white/10">
        <span className="w-3 h-3 rounded-full bg-red-500/80" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
        <span className="ml-4 text-xs text-gray-500 font-mono">~/portfolio</span>
      </div>

      {/* Terminal body */}
      <div
        ref={containerRef}
        className="bg-neutral-950 px-5 py-4 font-mono text-sm min-h-[260px] max-h-[320px] overflow-y-auto scrollbar-none"
      >
        {visibleLines.map((line, idx) => (
          <div key={idx} className={`leading-6 ${TYPE_COLORS[line.type]}`}>
            {line.text}
          </div>
        ))}

        {/* Currently typing line */}
        {phase !== 'done' && currentLine && (
          <div className={`leading-6 ${TYPE_COLORS[currentLine.type]}`}>
            {currentTyping}
            <span className="inline-block w-2 h-4 bg-emerald-400 ml-0.5 animate-pulse align-middle" />
          </div>
        )}

        {/* Idle cursor when done */}
        {phase === 'done' && (
          <div className="text-emerald-400 leading-6">
            $ <span className="inline-block w-2 h-4 bg-emerald-400 ml-0.5 animate-pulse align-middle" />
          </div>
        )}
      </div>
    </div>
  );
}
