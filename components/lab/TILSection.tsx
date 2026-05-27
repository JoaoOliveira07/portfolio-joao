'use client';

import { useLocale } from 'next-intl';

interface TILCard {
  emoji: string;
  title: { pt: string; en: string };
  body: { pt: string; en: string };
  tag: string;
  date: string;
}

const TIL_CARDS: TILCard[] = [
  {
    emoji: '🔒',
    title: {
      pt: 'JVM não libera memória ao SO por padrão',
      en: 'JVM does not release memory to the OS by default',
    },
    body: {
      pt: 'Depois de um pico de carga, a JVM mantém a memória alocada mesmo após o GC. Solução: -XX:+UseZGC com -XX:SoftMaxHeapSize ou forçar retorno com -XX:+ExplicitGCInvokesConcurrent. Aprendi depois de investigar um falso alerta de memory leak em produção.',
      en: 'After a load spike the JVM keeps allocated memory even after GC runs. Fix: -XX:+UseZGC with -XX:SoftMaxHeapSize or force return with -XX:+ExplicitGCInvokesConcurrent. Learned while chasing a false memory-leak alert in production.',
    },
    tag: 'JVM',
    date: '2024-03',
  },
  {
    emoji: '⚡',
    title: {
      pt: 'SELECT COUNT(*) é lento no PostgreSQL por design',
      en: 'SELECT COUNT(*) is slow in PostgreSQL by design',
    },
    body: {
      pt: 'O PostgreSQL não mantém contadores de linhas por causa do MVCC. Para tabelas grandes, COUNT(*) faz full table scan. Alternativas: pg_stat_user_tables.n_live_tup para estimativas, ou manter contador em cache (Redis) atualizado por triggers.',
      en: 'PostgreSQL has no row counters because of MVCC — COUNT(*) does a full table scan on large tables. Alternatives: pg_stat_user_tables.n_live_tup for estimates, or maintain a counter in Redis updated by triggers.',
    },
    tag: 'PostgreSQL',
    date: '2024-05',
  },
  {
    emoji: '🔄',
    title: {
      pt: 'Kafka rebalance pode causar picos de latência inesperados',
      en: 'Kafka consumer rebalance can cause unexpected latency spikes',
    },
    body: {
      pt: 'Um consumer group rebalance pausa todos os consumers do grupo temporariamente. Em sistemas com muitos consumers, deploys rolling causam rebalances frequentes. Solução: usar Static Membership (group.instance.id) para evitar rebalances desnecessários em restart.',
      en: 'A consumer group rebalance pauses all group consumers temporarily. In systems with many consumers, rolling deploys cause frequent rebalances. Fix: use Static Membership (group.instance.id) to avoid unnecessary rebalances on restart.',
    },
    tag: 'Kafka',
    date: '2024-07',
  },
  {
    emoji: '🌐',
    title: {
      pt: 'HTTP/2 multiplexing pode piorar performance em alguns casos',
      en: 'HTTP/2 multiplexing can hurt performance in some cases',
    },
    body: {
      pt: 'HTTP/2 resolve HOL blocking no nível de protocolo, mas uma única conexão TCP ainda sofre HOL blocking no nível de transporte. Em redes com alta perda de pacotes, HTTP/3 (QUIC) é dramaticamente melhor. Aprendi medindo uma API interna com muitos requests paralelos pequenos.',
      en: 'HTTP/2 solves HOL blocking at protocol level, but a single TCP connection still suffers transport-level HOL blocking. On high-packet-loss networks, HTTP/3 (QUIC) is dramatically better. Learned measuring an internal API with many small parallel requests.',
    },
    tag: 'Networking',
    date: '2024-08',
  },
  {
    emoji: '🏗️',
    title: {
      pt: 'Terraform state lock pode deixar infra em estado inconsistente',
      en: 'Terraform state lock can leave infra in an inconsistent state',
    },
    body: {
      pt: 'Se um apply falha com state lock preso (processo morreu), o próximo apply vai falhar com "state locked". Nunca force unlock sem verificar se há outro apply rodando. Em vez disso: checar DynamoDB locks table, confirmar que nenhum pipeline está ativo, então fazer force-unlock cirurgicamente.',
      en: 'If an apply fails with a stuck state lock (process died), the next apply errors with "state locked". Never force-unlock without checking for concurrent applies. Instead: check the DynamoDB locks table, confirm no pipeline is active, then surgically force-unlock.',
    },
    tag: 'Terraform',
    date: '2024-09',
  },
  {
    emoji: '📦',
    title: {
      pt: 'Idempotency keys precisam de TTL cuidadoso',
      en: 'Idempotency keys need careful TTL design',
    },
    body: {
      pt: 'Ao implementar idempotência em pagamentos, TTL muito curto (< 24h) causa reprocessamento de retries legítimos; muito longo aumenta o storage e pode "travar" operações legítimas. Padrão da indústria: 24h para pagamentos, 7 dias para operações críticas. Stripe usa 24h.',
      en: 'When implementing idempotency for payments, TTL too short (<24h) causes reprocessing of legitimate retries; too long bloats storage and can "lock" legitimate operations. Industry standard: 24h for payments, 7 days for critical operations. Stripe uses 24h.',
    },
    tag: 'API Design',
    date: '2024-11',
  },
];

export function TILSection() {
  const locale = useLocale() as 'pt' | 'en';

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-5 bg-emerald-500 rounded-full flex-shrink-0" />
          <h2 className="text-2xl font-bold text-white">Today I Learned</h2>
        </div>
        <p className="text-sm text-gray-400 ml-6">
          {locale === 'pt'
            ? 'Insights técnicos reais do dia a dia — coisas que me surpreenderam ou mudaram como eu penso sobre sistemas.'
            : 'Real technical insights from day-to-day work — things that surprised me or changed how I think about systems.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {TIL_CARDS.map((card, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-3 p-5 rounded-xl bg-neutral-900/60 border border-white/[0.08] hover:border-emerald-500/30 transition-colors"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl leading-none">{card.emoji}</span>
                <h3 className="text-sm font-bold text-white leading-tight">
                  {card.title[locale]}
                </h3>
              </div>
              <span className="flex-shrink-0 text-[10px] font-mono font-bold px-2 py-1 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                {card.tag}
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">{card.body[locale]}</p>
            <span className="text-xs text-gray-600 font-mono">{card.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
