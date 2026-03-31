'use client';

import { useLocale } from 'next-intl';
import { Github, Linkedin, Mail } from 'lucide-react';

export function Contact() {
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <section className="py-16 md:py-20 bg-neutral-950 text-white" id="contact">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-emerald-400 font-bold tracking-widest text-xs uppercase">
            {locale === 'pt' ? 'Contato' : 'Contact'}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mt-3 mb-6">
            {locale === 'pt' ? 'Vamos construir algo grande?' : 'Let\'s build something great?'}
          </h2>
          <p className="text-gray-400 text-base md:text-lg mb-10">
            {locale === 'pt' 
              ? 'Pronto para escalar seu sistema ou iniciar um novo projeto?' 
              : 'Ready to scale your system or start a new project?'}
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-12">
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
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-6">
        <p className="text-center text-gray-600 text-sm">
          © {currentYear} João Paulo Oliveira. {locale === 'pt' ? 'Todos os direitos reservados.' : 'All rights reserved.'}
        </p>
      </div>
    </section>
  );
}