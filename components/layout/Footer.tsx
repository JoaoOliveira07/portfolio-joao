import { Github, Linkedin } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-surface">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-textMuted">
            © {currentYear} João Paulo Oliveira. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/JoaoOliveira07"
              target="_blank"
              rel="noopener noreferrer"
              className="text-textMuted hover:text-text transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/joão-paulo-oliveira07/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-textMuted hover:text-text transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
