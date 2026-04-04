export interface IncidentStep {
  id: string;
  /** What the "monitoring alert" shows */
  alert: {
    severity: "critical" | "warning" | "info";
    title: string;
    message: string;
    timestamp: string; // e.g. "03:47:12"
  };
  /** Simulated log lines shown in the terminal */
  logs: string[];
  /** The decision the on-call engineer must make */
  question: string;
  options: {
    label: string;
    isCorrect: boolean;
    /** Consequence shown after choosing */
    consequence: string;
    /** How metrics change after this choice */
    metricsDelta?: {
      latencyMs?: number;    // new value
      errorRate?: number;    // new value (%)
      throughput?: number;   // new req/s
    };
  }[];
  /** Shown after any choice, summarizes the step */
  learning: string;
}

export interface Incident {
  id: string;
  title: string;
  subtitle: string;
  severity: "P1" | "P2" | "P3";
  scenario: string;
  steps: IncidentStep[];
  rca: {
    rootCause: string;
    timeline: { time: string; event: string }[];
    fix: string;
    prevention: string;
  };
}

export const INCIDENTS: Incident[] = [
  {
    id: "incident-001",
    title: "P1: API de Pagamentos Degradada",
    subtitle: "P99 latência em 8 segundos. Timeout de clientes.",
    severity: "P1",
    scenario:
      "São 03h47. O PagerDuty te acorda. A API de processamento de pagamentos está com P99 de latência em 8s (SLA é 500ms). Taxa de erro 34%. Clientes não conseguem finalizar compras.",
    steps: [
      {
        id: "step-1",
        alert: {
          severity: "critical",
          title: "CRITICAL: payment-api latency spike",
          message: "P99 latency: 8247ms | Error rate: 34% | Threshold: 500ms / 1%",
          timestamp: "03:47:12",
        },
        logs: [
          "03:47:01 ERROR PaymentService - Transaction timeout after 8000ms",
          "03:47:03 ERROR PaymentService - Transaction timeout after 8000ms",
          "03:47:05 ERROR PaymentService - HikariPool-1 - Connection is not available, request timed out after 30000ms",
          "03:47:08 ERROR PaymentService - Unable to acquire JDBC Connection",
          "03:47:10 WARN  PaymentService - HikariPool-1 - Pool stats (total=10, active=10, idle=0, waiting=47)",
        ],
        question: "Os logs mostram connection pool esgotado (10/10 conexões ativas, 47 aguardando). Qual é o seu primeiro passo?",
        options: [
          {
            label: "Reiniciar o serviço imediatamente",
            isCorrect: false,
            consequence: "O serviço reiniciou, mas o pool voltou a esgotar em 90 segundos. Você ainda não sabe a causa raiz. O problema retornou.",
            metricsDelta: { latencyMs: 6500, errorRate: 28, throughput: 45 },
          },
          {
            label: "Aumentar o pool de conexões no HikariCP (max-pool-size: 10 → 30)",
            isCorrect: false,
            consequence: "Aumentou o pool, mas o banco de dados agora está com CPU em 95%. O pool maior mascarou o problema real — há uma query lenta segurando cada conexão.",
            metricsDelta: { latencyMs: 5200, errorRate: 22, throughput: 60 },
          },
          {
            label: "Identificar qual query está segurando as conexões antes de qualquer mudança",
            isCorrect: true,
            consequence: "Correto. Você rodou SELECT * FROM pg_stat_activity WHERE state = 'active' e encontrou 10 queries idênticas em execução há +6 segundos cada.",
            metricsDelta: { latencyMs: 7800, errorRate: 32, throughput: 35 },
          },
          {
            label: "Ativar circuit breaker para rejeitar todas as requisições novas",
            isCorrect: false,
            consequence: "O circuit breaker protegeu o banco, mas agora 100% das requisições falham. Taxa de erro subiu para 100%. Isso é pior para o usuário.",
            metricsDelta: { latencyMs: 50, errorRate: 100, throughput: 0 },
          },
        ],
        learning:
          "Em um incidente, o primeiro passo é sempre ENTENDER antes de agir. Reiniciar sem diagnóstico é o erro mais comum de engenheiros júnior em on-call. pg_stat_activity é seu melhor amigo em um P1 de banco.",
      },
      {
        id: "step-2",
        alert: {
          severity: "critical",
          title: "Slow query identified",
          message: "10 active queries | Avg duration: 6.3s | Table: payments",
          timestamp: "03:51:44",
        },
        logs: [
          "03:51:44 [pg_stat_activity] pid=4721 duration=6341ms state=active",
          "03:51:44 [pg_stat_activity] query: SELECT * FROM payments WHERE user_id = $1 AND status = 'pending' ORDER BY created_at DESC",
          "03:51:44 [pg_stat_activity] pid=4722 duration=6198ms state=active",
          "03:51:44 [pg_stat_activity] query: SELECT * FROM payments WHERE user_id = $1 AND status = 'pending' ORDER BY created_at DESC",
          "03:51:45 INFO  Running EXPLAIN ANALYZE...",
          "03:51:45 [EXPLAIN] Seq Scan on payments (cost=0.00..184230.00 rows=2847103)",
          "03:51:45 [EXPLAIN] Filter: ((status = 'pending') AND (user_id = 12847))",
          "03:51:45 [EXPLAIN] Rows Removed by Filter: 2847099",
        ],
        question:
          "O EXPLAIN ANALYZE mostra um Seq Scan em 2.8 milhões de linhas. A tabela `payments` não tem índice em `(user_id, status)`. O deploy de hoje adicionou o filtro `status = 'pending'`. O que você faz agora?",
        options: [
          {
            label: "Criar o índice agora: CREATE INDEX ON payments(user_id, status)",
            isCorrect: false,
            consequence: "CREATE INDEX bloqueia a tabela por vários minutos em produção com 2.8M linhas. Você piorou o incidente. NUNCA crie índices com CREATE INDEX em produção durante um P1.",
            metricsDelta: { latencyMs: 15000, errorRate: 80, throughput: 5 },
          },
          {
            label: "Criar o índice com CREATE INDEX CONCURRENTLY ON payments(user_id, status)",
            isCorrect: true,
            consequence: "CONCURRENTLY cria o índice sem bloquear a tabela. Levou 4 minutos, mas durante a criação as queries continuaram funcionando. Após a criação, a latência caiu para 45ms.",
            metricsDelta: { latencyMs: 45, errorRate: 0.2, throughput: 890 },
          },
          {
            label: "Fazer rollback do deploy que introduziu o filtro status",
            isCorrect: false,
            consequence: "O rollback funcionou e o incidente foi resolvido. Mas você perdeu a feature nova e ainda vai ter o problema quando o deploy voltar. Não atacou a causa raiz.",
            metricsDelta: { latencyMs: 120, errorRate: 1, throughput: 700 },
          },
          {
            label: "Adicionar cache Redis na frente da query para reduzir a carga",
            isCorrect: false,
            consequence: "Cache ajuda para dados estáticos, mas payments pendentes mudam constantemente. O cache vai servir dados desatualizados. Você trocou um problema por outro.",
            metricsDelta: { latencyMs: 800, errorRate: 5, throughput: 400 },
          },
        ],
        learning:
          "CREATE INDEX CONCURRENTLY é uma das ferramentas mais importantes para incidentes de banco em produção. Ele usa mais tempo e recursos, mas não bloqueia leituras/escritas. Um DBA experiente nunca usa CREATE INDEX simples em tabelas grandes em produção.",
      },
      {
        id: "step-3",
        alert: {
          severity: "info",
          title: "Index created successfully",
          message: "payments_user_id_status_idx | Size: 142MB | Duration: 4m12s",
          timestamp: "03:57:21",
        },
        logs: [
          "03:57:21 INFO  Index payments_user_id_status_idx created successfully",
          "03:57:22 INFO  P99 latency: 45ms (was 8247ms)",
          "03:57:22 INFO  Error rate: 0.1% (was 34%)",
          "03:57:22 INFO  Throughput: 890 req/s (was 35 req/s)",
          "03:57:23 INFO  HikariPool-1 - Pool stats (total=10, active=2, idle=8, waiting=0)",
          "03:57:25 INFO  All queued transactions processed",
        ],
        question:
          "O incidente foi resolvido. Antes de fechar, o que você documenta no RCA (Root Cause Analysis)?",
        options: [
          {
            label: "Só o que foi feito: 'Criei um índice no banco'",
            isCorrect: false,
            consequence: "Documentação incompleta. O time não vai aprender com isso. Na próxima sprint, o mesmo deploy vai acontecer sem que ninguém lembre dessa lição.",
            metricsDelta: { latencyMs: 45, errorRate: 0.1, throughput: 890 },
          },
          {
            label: "Causa raiz, linha do tempo completa, fix aplicado e prevenção futura",
            isCorrect: true,
            consequence: "RCA completo. A causa raiz (deploy sem análise de query plan), o impacto (34% de erro por 10 minutos), a solução (CONCURRENTLY index) e a prevenção (query review no CI/CD) estão documentados.",
            metricsDelta: { latencyMs: 45, errorRate: 0.1, throughput: 890 },
          },
          {
            label: "Abrir um ticket para o desenvolvedor que fez o deploy se explicar",
            isCorrect: false,
            consequence: "Incidentes não são sobre culpa — são sobre sistemas. Blameless post-mortems são o padrão da indústria. Apontar o dedo inibe a cultura de transparência.",
            metricsDelta: { latencyMs: 45, errorRate: 0.1, throughput: 890 },
          },
          {
            label: "Nada — o sistema está funcionando, vou dormir",
            isCorrect: false,
            consequence: "Em 3 semanas um dev vai fazer o mesmo deploy com outra tabela. Sem RCA, o ciclo se repete.",
            metricsDelta: { latencyMs: 45, errorRate: 0.1, throughput: 890 },
          },
        ],
        learning:
          "Post-mortems blameless são o que separa times maduros de times que repetem os mesmos problemas. O RCA deve responder: O QUE aconteceu, POR QUE aconteceu, COMO foi resolvido, e O QUE vai prevenir no futuro.",
      },
    ],
    rca: {
      rootCause:
        "Deploy às 03h12 adicionou filtro `status = 'pending'` na query de pagamentos sem análise prévia do query plan. A tabela `payments` com 2.8M de linhas não possuía índice em `(user_id, status)`, resultando em Seq Scan de custo O(n) por request.",
      timeline: [
        { time: "03:12", event: "Deploy v2.4.1 em produção — novo filtro status adicionado" },
        { time: "03:31", event: "Primeiros timeouts aparecem nos logs (carga baixa mascarou inicialmente)" },
        { time: "03:47", event: "PagerDuty dispara: P99 = 8247ms, error rate = 34%" },
        { time: "03:51", event: "pg_stat_activity identifica Seq Scan em payments como causa" },
        { time: "03:53", event: "CREATE INDEX CONCURRENTLY iniciado" },
        { time: "03:57", event: "Índice criado — P99 cai para 45ms, sistema normalizado" },
      ],
      fix: "Criação de índice composto `(user_id, status)` com CREATE INDEX CONCURRENTLY para não bloquear produção. Duração total do incidente: 10 minutos.",
      prevention:
        "Adicionar step de EXPLAIN ANALYZE no pipeline de CI para queries em tabelas > 100k linhas. PRs com novas queries devem incluir query plan no review. Configurar alerta de Seq Scan em tabelas grandes no Datadog.",
    },
  },
];
