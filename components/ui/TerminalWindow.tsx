'use client';

import { useEffect, useState, useRef } from 'react';

interface TerminalLine {
  text: string;
  type: 'command' | 'output' | 'comment' | 'success' | 'error' | 'hint';
  delay?: number;
}

const LINES: TerminalLine[] = [
  { text: '# ~/portfolio — interactive terminal', type: 'comment', delay: 0 },
  { text: '# psst — this thing actually works. try it.', type: 'comment', delay: 500 },
  { text: '', type: 'output', delay: 200 },
  { text: '→ type a command and press Enter', type: 'hint', delay: 400 },
  { text: '→ press Tab to autocomplete', type: 'hint', delay: 200 },
  { text: '→ ↑/↓ for history · Ctrl+L to clear', type: 'hint', delay: 200 },
  { text: '', type: 'output', delay: 200 },
  { text: "type 'help' to see what's possible", type: 'comment', delay: 400 },
];

const TYPE_COLORS: Record<TerminalLine['type'], string> = {
  command: 'text-emerald-400',
  output: 'text-gray-300',
  comment: 'text-gray-500',
  success: 'text-emerald-300',
  error: 'text-red-400',
  hint: 'text-cyan-400/70',
};

const FILES: Record<string, string> = {
  'stack.txt': 'Java 17/21 · Spring Boot · AWS (Lambda, SQS, DynamoDB) · Terraform · Kafka · PostgreSQL',
  'about.md': '3+ years backend. Scalable systems, distributed architecture, event-driven design.',
  'contact.txt': 'joao.oliveira@segalas.com.br · linkedin.com/in/joao-paulo-oliveira',
  'experience.txt': 'Mid-level @ Segala\'s · Sep 2025–present. Junior→Mid in 1y1mo. IT Assistant → Trainee → Junior → Mid.',
};

const DIRS = ['iac-terraform/', 'event-driven/', 'hybrid-integration/'];
const LS_ITEMS = [...DIRS, ...Object.keys(FILES)];

const COMMANDS = [
  'help', 'whoami', 'stack', 'skills', 'projects', 'experience',
  'ls', 'cat', 'echo', 'date', 'contact', 'clear', 'sudo',
  'exit', 'quit', 'rm', 'open',
  'github', 'linkedin', 'email', 'cv', 'resume',
];

const LINKS: Record<string, { url: string; label: string }> = {
  github: { url: 'https://github.com/JoaoOliveira07', label: 'GitHub' },
  linkedin: { url: 'https://www.linkedin.com/in/joao-paulo-oliveira', label: 'LinkedIn' },
  email: { url: 'mailto:joao.oliveira@segalas.com.br', label: 'Email' },
  cv: { url: '/cv/cv-en.pdf', label: 'CV (EN)' },
  resume: { url: '/cv/cv-en.pdf', label: 'Resume (EN)' },
};

function runCommand(raw: string): TerminalLine[] {
  const input = raw.trim();
  if (!input) return [];
  const [cmd, ...args] = input.split(/\s+/);
  const arg = args.join(' ');

  switch (cmd.toLowerCase()) {
    case 'help':
      return [
        { text: 'commands:', type: 'output' },
        { text: '  whoami       who am i', type: 'output' },
        { text: '  stack        tech stack', type: 'output' },
        { text: '  projects     what i\'ve built', type: 'output' },
        { text: '  experience   career path', type: 'output' },
        { text: '  contact      how to reach me', type: 'output' },
        { text: '  ls           list files', type: 'output' },
        { text: '  cat <file>   read a file', type: 'output' },
        { text: '  open <id>    jump to section (projects, lab, contact)', type: 'output' },
        { text: '  github       open github profile', type: 'output' },
        { text: '  linkedin     open linkedin', type: 'output' },
        { text: '  email        compose email', type: 'output' },
        { text: '  cv / resume  download cv', type: 'output' },
        { text: '  clear        wipe screen', type: 'output' },
        { text: '  echo, date, sudo, rm — try them', type: 'comment' },
      ];
    case 'whoami':
      return [{ text: 'joao.oliveira — backend engineer @ segalas', type: 'output' }];
    case 'stack':
    case 'skills':
      return [{ text: FILES['stack.txt'], type: 'output' }];
    case 'projects':
      return [
        { text: 'iac-terraform/      modular AWS infra', type: 'output' },
        { text: 'event-driven/       Kafka + SQS pipelines', type: 'output' },
        { text: 'hybrid-integration/ legacy ↔ cloud bridge', type: 'output' },
        { text: "→ run 'open projects' to scroll there", type: 'hint' },
      ];
    case 'experience':
      return [{ text: FILES['experience.txt'], type: 'output' }];
    case 'ls': {
      if (!arg) return [{ text: LS_ITEMS.join('  '), type: 'output' }];
      const matches = LS_ITEMS.filter((i) => i === arg || i.startsWith(arg));
      if (!matches.length) return [{ text: `ls: cannot access '${arg}': No such file or directory`, type: 'error' }];
      return [{ text: matches.join('  '), type: 'output' }];
    }
    case 'cat': {
      if (!arg) return [{ text: 'cat: missing file operand', type: 'error' }];
      const content = FILES[arg];
      if (!content) return [{ text: `cat: ${arg}: No such file or directory`, type: 'error' }];
      return [{ text: content, type: 'output' }];
    }
    case 'echo':
      return [{ text: arg, type: 'output' }];
    case 'date':
      return [{ text: new Date().toString(), type: 'output' }];
    case 'contact':
      return [{ text: FILES['contact.txt'], type: 'output' }];
    case 'open': {
      const target = arg.toLowerCase().replace('#', '');
      const valid = ['projects', 'lab', 'contact', 'experience', 'testimonials', 'techstack', 'philosophy', 'engineering'];
      if (!valid.includes(target)) {
        return [{ text: `open: unknown section. try: ${valid.join(', ')}`, type: 'error' }];
      }
      if (typeof window !== 'undefined') {
        const el = document.getElementById(target);
        if (el) {
          const offset = el.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({ top: offset, behavior: 'smooth' });
        }
      }
      return [{ text: `→ scrolling to #${target}`, type: 'success' }];
    }
    case 'github':
    case 'linkedin':
    case 'email':
    case 'cv':
    case 'resume': {
      const link = LINKS[cmd.toLowerCase()];
      if (typeof window !== 'undefined') {
        window.open(link.url, link.url.startsWith('mailto:') ? '_self' : '_blank', 'noopener,noreferrer');
      }
      return [
        { text: `→ opening ${link.label} (${link.url})`, type: 'success' },
      ];
    }
    case 'sudo':
      return [{ text: 'joao.oliveira is not in the sudoers file. This incident will be reported.', type: 'error' }];
    case 'exit':
    case 'quit':
      return [{ text: 'nice try — you cannot escape', type: 'comment' }];
    case 'rm':
      return [{ text: 'rm: permission denied (this is a portfolio, not your prod cluster)', type: 'error' }];
    case 'clear':
      return [{ text: '__CLEAR__', type: 'output' }];
    default:
      if (FILES[cmd]) return [{ text: FILES[cmd], type: 'output' }];
      return [{ text: `${cmd}: command not found. type 'help'`, type: 'error' }];
  }
}

function autocomplete(input: string): { completed: string; suggestions: string[] } {
  const trimmed = input.trimStart();
  const parts = trimmed.split(/\s+/);

  if (parts.length === 1) {
    const matches = COMMANDS.filter((c) => c.startsWith(parts[0].toLowerCase()));
    if (matches.length === 1) return { completed: matches[0] + ' ', suggestions: [] };
    if (matches.length > 1) {
      const common = commonPrefix(matches);
      return { completed: common.length > parts[0].length ? common : input, suggestions: matches };
    }
    return { completed: input, suggestions: [] };
  }

  const cmd = parts[0].toLowerCase();
  const last = parts[parts.length - 1];

  if (cmd === 'cat') {
    const matches = Object.keys(FILES).filter((f) => f.startsWith(last));
    if (matches.length === 1) {
      parts[parts.length - 1] = matches[0];
      return { completed: parts.join(' '), suggestions: [] };
    }
    if (matches.length > 1) {
      const common = commonPrefix(matches);
      if (common.length > last.length) {
        parts[parts.length - 1] = common;
        return { completed: parts.join(' '), suggestions: matches };
      }
      return { completed: input, suggestions: matches };
    }
  }

  if (cmd === 'open') {
    const sections = ['projects', 'lab', 'contact', 'experience', 'testimonials', 'techstack'];
    const matches = sections.filter((s) => s.startsWith(last));
    if (matches.length === 1) {
      parts[parts.length - 1] = matches[0];
      return { completed: parts.join(' '), suggestions: [] };
    }
    if (matches.length > 1) return { completed: input, suggestions: matches };
  }

  return { completed: input, suggestions: [] };
}

function commonPrefix(strs: string[]): string {
  if (!strs.length) return '';
  let prefix = strs[0];
  for (const s of strs.slice(1)) {
    while (!s.startsWith(prefix)) prefix = prefix.slice(0, -1);
    if (!prefix) return '';
  }
  return prefix;
}

export function TerminalWindow() {
  const [visibleLines, setVisibleLines] = useState<TerminalLine[]>([]);
  const [currentTyping, setCurrentTyping] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'waiting' | 'done'>('waiting');
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
      }, line.delay ?? 300);
      return () => clearTimeout(timer);
    }

    if (phase === 'typing') {
      if (charIndex < line.text.length) {
        const timer = setTimeout(() => {
          setCurrentTyping((prev) => prev + line.text[charIndex]);
          setCharIndex((prev) => prev + 1);
        }, line.type === 'command' ? 45 : 12);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setVisibleLines((prev) => [...prev, { ...line, text: line.text }]);
          setCurrentTyping('');
          setLineIndex((prev) => prev + 1);
          setPhase('waiting');
        }, 80);
        return () => clearTimeout(timer);
      }
    }
  }, [lineIndex, charIndex, phase]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visibleLines, currentTyping, input]);

  useEffect(() => {
    if (phase === 'done') inputRef.current?.focus();
  }, [phase]);

  const submit = () => {
    const raw = input;
    const result = runCommand(raw);

    if (result.length === 1 && result[0].text === '__CLEAR__') {
      setVisibleLines([]);
      setInput('');
      setHistory((h) => [raw, ...h]);
      setHistoryIdx(-1);
      return;
    }

    setVisibleLines((prev) => [
      ...prev,
      { text: `$ ${raw}`, type: 'command' as const },
      ...result,
    ]);
    if (raw.trim()) setHistory((h) => [raw, ...h]);
    setInput('');
    setHistoryIdx(-1);
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submit();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const { completed, suggestions } = autocomplete(input);
      setInput(completed);
      if (suggestions.length > 1) {
        setVisibleLines((prev) => [
          ...prev,
          { text: `$ ${input}`, type: 'command' },
          { text: suggestions.join('  '), type: 'output' },
        ]);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length && historyIdx < history.length - 1) {
        const next = historyIdx + 1;
        setHistoryIdx(next);
        setInput(history[next]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        const next = historyIdx - 1;
        setHistoryIdx(next);
        setInput(history[next]);
      } else {
        setHistoryIdx(-1);
        setInput('');
      }
    } else if (e.key === 'l' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setVisibleLines([]);
    }
  };

  const currentLine = lineIndex < LINES.length ? LINES[lineIndex] : null;

  return (
    <div
      className="w-full max-w-3xl mx-auto rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-emerald-500/5"
      onClick={() => phase === 'done' && inputRef.current?.focus()}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-neutral-900 border-b border-white/10">
        <span className="w-3 h-3 rounded-full bg-red-500/80" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
        <span className="ml-4 text-xs text-gray-500 font-mono">~/portfolio</span>
        {phase === 'done' && (
          <span className="ml-auto text-[10px] text-emerald-400/60 font-mono">● connected</span>
        )}
      </div>

      {/* Terminal body */}
      <div
        ref={containerRef}
        data-lenis-prevent
        className="terminal-scroll bg-neutral-950 px-5 py-4 font-mono text-xs sm:text-sm h-[360px] sm:h-[420px] overflow-y-auto overscroll-contain cursor-text"
      >
        {visibleLines.map((line, idx) => (
          <div key={idx} className={`leading-6 ${TYPE_COLORS[line.type]} whitespace-pre-wrap break-words`}>
            {line.text || '\u00A0'}
          </div>
        ))}

        {/* Auto-play typing line */}
        {phase !== 'done' && currentLine && (
          <div className={`leading-6 ${TYPE_COLORS[currentLine.type]}`}>
            {currentTyping}
            <span className="inline-block w-2 h-4 bg-emerald-400 ml-0.5 animate-pulse align-middle" />
          </div>
        )}

        {/* Interactive input */}
        {phase === 'done' && (
          <div className="leading-6 flex items-center relative">
            <span className="text-emerald-400">$&nbsp;</span>
            <span className="text-gray-200">{input}</span>
            <span className="inline-block w-2 h-4 bg-emerald-400 ml-0.5 animate-pulse align-middle" />
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              className="absolute opacity-0 inset-0 w-full"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              aria-label="terminal input"
            />
          </div>
        )}
      </div>
    </div>
  );
}
