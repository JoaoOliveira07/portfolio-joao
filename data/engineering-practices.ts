export interface EngineeringPractice {
  id: string;
  icon: string;
  title: { pt: string; en: string };
  shortDescription: { pt: string; en: string };
  longDescription: { pt: string; en: string };
  howIApply: { pt: string[]; en: string[] };
  relatedProjects?: string[];
}

export const engineeringPractices: EngineeringPractice[] = [
  {
    id: 'distributed-systems',
    icon: 'Network',
    title: { pt: 'Sistemas Distribuídos', en: 'Distributed Systems' },
    shortDescription: {
      pt: 'Arquiteturas que funcionam em múltiplas instâncias sem perda de dados',
      en: 'Architectures that work across multiple instances without data loss'
    },
    longDescription: {
      pt: 'Sistemas distribuídos são minha especialidade. Desenvolvo arquiteturas que escalam horizontalmente, mantêm consistência eventual, e resistem a falhas de instância.',
      en: 'Distributed systems are my specialty. I develop architectures that scale horizontally, maintain eventual consistency, and withstand instance failures.'
    },
    howIApply: {
      pt: [
        'Coordenação com Redis/RabbitMQ para sincronização entre instâncias',
        'Pattern Outbox para garantir exactly-once em transações distribuídas',
        'Circuit Breaker para evitar falhas em cascata',
        'Partitionamento de dados por chave de negócio',
        'Consistência eventual com Event Sourcing'
      ],
      en: [
        'Coordination with Redis/RabbitMQ for synchronization between instances',
        'Outbox Pattern to guarantee exactly-once in distributed transactions',
        'Circuit Breaker to prevent cascading failures',
        'Data partitioning by business key',
        'Eventual consistency with Event Sourcing'
      ]
    },
    relatedProjects: ['pipeline-event-driven', 'integradora-offline-online']
  },
  {
    id: 'complex-integrations',
    icon: 'Plug',
    title: { pt: 'Integrações Complexas', en: 'Complex Integrations' },
    shortDescription: {
      pt: 'Conexões com ERPs, APIs externas e sistemas legados sem dor de cabeça',
      en: 'Connections with ERPs, external APIs and legacy systems without headache'
    },
    longDescription: {
      pt: 'Integrações são onde maioria dos sistemas falha. Desenvolvo conectores resilientes que lidam com timeouts, retries, transformações de dados e falhas parciais.',
      en: 'Integrations are where most systems fail. I develop resilient connectors that handle timeouts, retries, data transformations, and partial failures.'
    },
    howIApply: {
      pt: [
        'Padrão Adapter para isolar contratos de APIs externas',
        'Dead Letter Queue para investigar falhas assincronamente',
        'Idempotência garantir processamento único',
        'MapStruct para transformação eficiente entre domínios',
        'Circuit Breaker para proteger de APIs instáveis'
      ],
      en: [
        'Adapter Pattern to isolate external API contracts',
        'Dead Letter Queue for asynchronous failure investigation',
        'Idempotency to ensure single processing',
        'MapStruct for efficient transformation between domains',
        'Circuit Breaker to protect against unstable APIs'
      ]
    },
    relatedProjects: ['arquitetura-integracao-hibrida', 'sistema-cadastro-ocr']
  },
  {
    id: 'performance',
    icon: 'Zap',
    title: { pt: 'Performance & Escalabilidade', en: 'Performance & Scalability' },
    shortDescription: {
      pt: 'Sistemas rápidos mesmo com milhões de requisições',
      en: 'Fast systems even with millions of requests'
    },
    longDescription: {
      pt: 'Performance não é luxo, é requisito. Otimizo desde queries N+1 até arquitetura de caching, garantindo tempo de resposta consistente sob carga.',
      en: "Performance isn't a luxury, it's a requirement. I optimize from N+1 queries to caching architecture, ensuring consistent response time under load."
    },
    howIApply: {
      pt: [
        'Análise de execution plans para otimizar queries SQL',
        'Caching em múltiplas camadas (Redis, Caffeine)',
        'Async processing para operações pesadas',
        'Indexação estratégica baseada em padrões de acesso',
        'Profiling com Async Profiler para identificar gargalos'
      ],
      en: [
        'Execution plan analysis to optimize SQL queries',
        'Caching at multiple layers (Redis, Caffeine)',
        'Async processing for heavy operations',
        'Strategic indexing based on access patterns',
        'Profiling with Async Profiler to identify bottlenecks'
      ]
    },
    relatedProjects: ['sistema-rca-monolito', 'pipeline-event-driven']
  },
  {
    id: 'production-issues',
    icon: 'AlertTriangle',
    title: { pt: 'Problemas em Produção', en: 'Production Issues' },
    shortDescription: {
      pt: 'Debugging de incidentes críticos com precisão de engenharia',
      en: 'Critical incident debugging with engineering precision'
    },
    longDescription: {
      pt: 'O que separa júnior de sênior é a capacidade de resolver problemas em produção. Tenho experiência em incidentes críticos, desde deadlocks até vazamentos de memória.',
      en: 'What separates junior from senior is the ability to solve production issues. I have experience with critical incidents, from deadlocks to memory leaks.'
    },
    howIApply: {
      pt: [
        'Distributed Tracing (OpenTelemetry) para seguir o fluxo completo',
        'Análise de heap dumps e thread dumps',
        'Log estruturado com correlation IDs',
        'Post-mortem estruturado para evitar recorrência',
        'Alertamento proativo baseado em SLOs'
      ],
      en: [
        'Distributed Tracing (OpenTelemetry) to follow complete flow',
        'Heap dump and thread dump analysis',
        'Structured logging with correlation IDs',
        'Structured post-mortem to prevent recurrence',
        'Proactive alerting based on SLOs'
      ]
    },
    relatedProjects: ['iac-terraform-aws', 'pipeline-event-driven']
  },
  {
    id: 'reliability',
    icon: 'Shield',
    title: { pt: 'Confiabilidade & Resiliência', en: 'Reliability & Resilience' },
    shortDescription: {
      pt: 'Sistemas que não caem quando as coisas dão errado',
      en: "Systems that don't crash when things go wrong"
    },
    longDescription: {
      pt: 'Sistemas confiáveis não evitam falhas, mas as graceful degradation. Desenvolvo arquiteturas que degradam lentamente e se recuperam automaticamente.',
      en: "Reliable systems don't avoid failures, but graceful degradation. I develop architectures that degrade slowly and recover automatically."
    },
    howIApply: {
      pt: [
        'Graceful degradation em falhas parciais',
        'Retry com backoff exponencial e jitter',
        'Bulkheads para isolar recursos críticos',
        'Health checks proativos e readiness probes',
        'Rollback automatizado em deploys problemáticos'
      ],
      en: [
        'Graceful degradation on partial failures',
        'Retry with exponential backoff and jitter',
        'Bulkheads to isolate critical resources',
        'Proactive health checks and readiness probes',
        'Automated rollback on problematic deployments'
      ]
    },
    relatedProjects: ['pipeline-event-driven', 'integradora-offline-online']
  },
  {
    id: 'data-consistency',
    icon: 'Database',
    title: { pt: 'Consistência de Dados', en: 'Data Consistency' },
    shortDescription: {
      pt: 'Garantir que dados nunca se percam ou fiquem inconsistentes',
      en: "Ensuring data never gets lost or becomes inconsistent"
    },
    longDescription: {
      pt: 'Dados são o ativo mais importante. Desenvolvo estratégias de consistência que garantem integridade mesmo em cenários de falha parcial.',
      en: 'Data is the most important asset. I develop consistency strategies that guarantee integrity even in partial failure scenarios.'
    },
    howIApply: {
      pt: [
        'SAGA pattern para transações distribuídas',
        'Two-phase commit quando necessário',
        'Eventual consistency com reconciliation jobs',
        'Checksums e validações em pipeline de dados',
        'CDC para espelhamento de dados confiável'
      ],
      en: [
        'SAGA pattern for distributed transactions',
        'Two-phase commit when necessary',
        'Eventual consistency with reconciliation jobs',
        'Checksums and validations in data pipelines',
        'CDC for reliable data mirroring'
      ]
    },
    relatedProjects: ['integradora-offline-online', 'arquitetura-integracao-hibrida']
  },
  {
    id: 'cloud-native',
    icon: 'Cloud',
    title: { pt: 'Cloud & Infraestrutura', en: 'Cloud & Infrastructure' },
    shortDescription: {
      pt: 'Terraform, Kubernetes, AWS - infra como código',
      en: 'Terraform, Kubernetes, AWS - infrastructure as code'
    },
    longDescription: {
      pt: 'Infraestrutura é código. Desenvolvo toda configuração como código versionado, com pipelines reproduzíveis e ambientes idênticos.',
      en: 'Infrastructure is code. I develop all configuration as versioned code, with reproducible pipelines and identical environments.'
    },
    howIApply: {
      pt: [
        'Terraform para toda infraestrutura como código',
        'EKS/Fargate para orquestração de containers',
        'Lambda para event-driven serverless',
        'CloudWatch/Grafana para monitoramento completo',
        'IaC testável com Terratest'
      ],
      en: [
        'Terraform for all infrastructure as code',
        'EKS/Fargate for container orchestration',
        'Lambda for serverless event-driven',
        'CloudWatch/Grafana for complete monitoring',
        'Testable IaC with Terratest'
      ]
    },
    relatedProjects: ['iac-terraform-aws']
  },
  {
    id: 'quality',
    icon: 'CheckCircle',
    title: { pt: 'Qualidade & Automação', en: 'Quality & Automation' },
    shortDescription: {
      pt: 'Testes que realmente protegem o código, não apenas números de cobertura',
      en: "Tests that really protect the code, not just coverage numbers"
    },
    longDescription: {
      pt: 'Qualidade não é métrica, é processo. Desenvolvo pipelines que validam behavior, não apenas executam testes.',
      en: "Quality isn't a metric, it's a process. I develop pipelines that validate behavior, not just run tests."
    },
    howIApply: {
      pt: [
        'TDD com emphasis em test pyramids',
        'Testcontainers para testes de integração realistas',
        'Mutation testing para validar qualidade de testes',
        'Static analysis (SonarQube, SpotBugs)',
        'Contract testing para APIs'
      ],
      en: [
        'TDD with emphasis on test pyramids',
        'Testcontainers for realistic integration tests',
        'Mutation testing to validate test quality',
        'Static analysis (SonarQube, SpotBugs)',
        'Contract testing for APIs'
      ]
    },
    relatedProjects: ['sistema-rca-monolito', 'pipeline-event-driven']
  }
];
