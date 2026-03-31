import { Github, Linkedin } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 dark:bg-slate-900 w-full rounded-t-xl">
      <div className="flex flex-col md:flex-row justify-between items-start px-12 py-16 gap-12 w-full max-w-7xl mx-auto text-sm font-medium">
        {/* Column 1 - Logo & Description */}
        <div className="space-y-6">
          <div className="text-xl font-bold text-slate-900 dark:text-white">JOPES</div>
          <p className="max-w-xs text-slate-500 dark:text-slate-400">
            High-End Engineering Systems for global scale companies. Focused on the &quot;Digital Architect&quot; persona.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/JoaoOliveira07"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-emerald-500 transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/joão-paulo-oliveira07/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-emerald-500 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Columns 2 & 3 - Navigation & Legal */}
        <div className="grid grid-cols-2 gap-16">
          {/* Navigation */}
          <div className="flex flex-col gap-4">
            <span className="font-bold text-emerald-700 dark:text-emerald-500 mb-2">
              Navigation
            </span>
            <Link href="#about" className="text-slate-500 dark:text-slate-400 hover:text-emerald-500 underline-offset-8 hover:underline opacity-80 hover:opacity-100 transition-opacity">
              About
            </Link>
            <Link href="#experience" className="text-slate-500 dark:text-slate-400 hover:text-emerald-500 underline-offset-8 hover:underline opacity-80 hover:opacity-100 transition-opacity">
              Experience
            </Link>
            <Link href="#projects" className="text-slate-500 dark:text-slate-400 hover:text-emerald-500 underline-offset-8 hover:underline opacity-80 hover:opacity-100 transition-opacity">
              Projects
            </Link>
            <Link href="#contact" className="text-slate-500 dark:text-slate-400 hover:text-emerald-500 underline-offset-8 hover:underline opacity-80 hover:opacity-100 transition-opacity">
              Contact
            </Link>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-4">
            <span className="font-bold text-emerald-700 dark:text-emerald-500 mb-2">
              Legal
            </span>
            <Link href="#" className="text-slate-500 dark:text-slate-400 hover:text-emerald-500 underline-offset-8 hover:underline opacity-80 hover:opacity-100 transition-opacity">
              Privacy
            </Link>
            <Link href="#" className="text-slate-500 dark:text-slate-400 hover:text-emerald-500 underline-offset-8 hover:underline opacity-80 hover:opacity-100 transition-opacity">
              Terms
            </Link>
            <Link href="#" className="text-slate-500 dark:text-slate-400 hover:text-emerald-500 underline-offset-8 hover:underline opacity-80 hover:opacity-100 transition-opacity">
              Contact
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-12 py-8 border-t border-slate-200 dark:border-slate-800 text-slate-400 text-xs">
        © {currentYear} João Paulo Oliveira. All rights reserved.
      </div>
    </footer>
  );
}
