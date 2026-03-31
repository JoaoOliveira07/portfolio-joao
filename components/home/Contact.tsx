'use client';

import { useLocale } from 'next-intl';
import { Github, Linkedin, Mail } from 'lucide-react';

export function Contact() {
  const locale = useLocale();

  return (
    <section className="py-20 md:py-32 bg-neutral-950 text-white overflow-hidden relative" id="contact">
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {locale === 'pt' ? 'Vamos construir algo grande?' : 'Let\'s build something great?'}
          </h2>
          <p className="text-gray-400 text-base md:text-lg mb-10">
            {locale === 'pt' 
              ? 'Pronto para escalar seu sistema ou iniciar um novo projeto?' 
              : 'Ready to scale your system or start a new project?'}
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <a 
              href="mailto:joao.oliveira.dev@gmail.com"
              className="flex items-center gap-3 px-6 py-4 bg-neutral-900 rounded-xl border border-white/10 hover:border-emerald-500/50 hover:bg-neutral-800 transition-all group"
            >
              <Mail className="h-6 w-6 text-gray-400 group-hover:text-emerald-400 transition-colors" />
              <span className="text-white font-medium">Email</span>
            </a>
            
            <a 
              href="https://www.linkedin.com/in/joão-paulo-oliveira07/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-4 bg-neutral-900 rounded-xl border border-white/10 hover:border-emerald-500/50 hover:bg-neutral-800 transition-all group"
            >
              <Linkedin className="h-6 w-6 text-gray-400 group-hover:text-emerald-400 transition-colors" />
              <span className="text-white font-medium">LinkedIn</span>
            </a>
            
            <a 
              href="https://github.com/JoaoOliveira07"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-4 bg-neutral-900 rounded-xl border border-white/10 hover:border-emerald-500/50 hover:bg-neutral-800 transition-all group"
            >
              <Github className="h-6 w-6 text-gray-400 group-hover:text-emerald-400 transition-colors" />
              <span className="text-white font-medium">GitHub</span>
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px]" />
    </section>
  );
}