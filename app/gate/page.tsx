import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Escolha como explorar | João Paulo Oliveira',
};

export default function GatePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-10 bg-neutral-950 px-6 py-16 text-center">
      <div className="space-y-3">
        <p className="font-mono text-sm tracking-[0.3em] text-emerald-400 uppercase">João Paulo Oliveira</p>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">Como você quer explorar?</h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          Duas formas de conhecer o mesmo trabalho — escolha a que preferir. Dá pra trocar de modo a qualquer momento.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 w-full max-w-3xl">
        <a
          href="/api/mode?mode=serious"
          className="group flex flex-col gap-3 rounded-2xl border border-white/10 bg-neutral-900 p-8 text-left transition-all hover:border-emerald-400/60 hover:-translate-y-1"
        >
          <span className="font-mono text-xs tracking-[0.2em] text-emerald-400 uppercase">Modo Sério</span>
          <span className="text-xl font-bold text-white">Portfolio profissional</span>
          <span className="text-sm text-gray-400">
            Projetos, stack e experiência em formato direto — pra quem quer avaliar rápido.
          </span>
          <span className="mt-2 text-sm font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
            Entrar →
          </span>
        </a>

        <a
          href="/api/mode?mode=rpg"
          className="group flex flex-col gap-3 rounded-2xl border border-white/10 p-8 text-left transition-all hover:-translate-y-1"
          style={{ background: '#050d18', borderColor: 'rgba(255,230,0,0.15)' }}
        >
          <span className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: '#FFE600' }}>
            Modo RPG
          </span>
          <span className="text-xl font-bold text-white">JOPES.EXE — explore a cidade</span>
          <span className="text-sm text-gray-400">
            O mesmo portfolio em forma de cidade isométrica navegável. Ande, converse com NPCs, ganhe XP.
          </span>
          <span
            className="mt-2 text-sm font-semibold group-hover:translate-x-1 transition-transform"
            style={{ color: '#FFE600' }}
          >
            Explorar →
          </span>
        </a>
      </div>
    </main>
  );
}
