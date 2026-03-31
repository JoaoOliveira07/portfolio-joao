'use client';

import { useLocale } from 'next-intl';
import Link from 'next/link';

export function Contact() {
  const locale = useLocale();

  return (
    <section className="py-20 md:py-32 bg-neutral-950 text-white overflow-hidden relative" id="contact">
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
          {/* Left */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 md:mb-8">
              {locale === 'pt' ? 'Vamos construir o futuro juntos.' : 'Let\'s build the future together.'}
            </h2>
            <p className="text-gray-400 text-base md:text-lg mb-10 md:mb-12 max-w-md">
              {locale === 'pt' 
                ? 'Pronto para escalar seu sistema ou iniciar um novo projeto do zero com precisão de engenharia?' 
                : 'Ready to scale your system or start a new project from scratch with engineering precision?'}
            </p>
            
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center border border-emerald-500/30">
                  <span className="material-symbols-outlined text-emerald-400">mail</span>
                </div>
                <div>
                  <p className="text-xs text-emerald-400 font-bold uppercase tracking-widest">Email</p>
                  <p className="text-base md:text-lg font-medium text-white">joao.oliveira.dev@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center border border-emerald-500/30">
                  <span className="material-symbols-outlined text-emerald-400">share</span>
                </div>
                <div>
                  <p className="text-xs text-emerald-400 font-bold uppercase tracking-widest">LinkedIn</p>
                  <Link href="https://www.linkedin.com/in/joão-paulo-oliveira07/" target="_blank" rel="noopener noreferrer" className="text-base md:text-lg font-medium text-white hover:text-emerald-400 transition-colors">
                    linkedin.com/in/joao-paulo-oliveira07
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="bg-neutral-900 p-8 md:p-10 rounded-xl border border-white/10">
            <form className="space-y-4 md:space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                  {locale === 'pt' ? 'Nome Completo' : 'Full Name'}
                </label>
                <input
                  className="w-full bg-neutral-800 border-b-2 border-white/20 focus:border-emerald-500 px-0 py-3 transition-colors outline-none focus:ring-0 text-white placeholder-gray-500"
                  placeholder={locale === 'pt' ? 'Seu nome aqui' : 'Your name here'}
                  type="text"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                  {locale === 'pt' ? 'Mensagem' : 'Message'}
                </label>
                <textarea
                  className="w-full bg-neutral-800 border-b-2 border-white/20 focus:border-emerald-500 px-0 py-3 transition-colors outline-none focus:ring-0 resize-none text-white placeholder-gray-500"
                  placeholder={locale === 'pt' ? 'Descreva seu projeto ou desafio' : 'Describe your project or challenge'}
                  rows={4}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-xl font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {locale === 'pt' ? 'Enviar Proposta' : 'Send Proposal'}
              </button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Decorative glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px]"></div>
    </section>
  );
}
