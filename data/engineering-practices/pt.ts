export interface EngineeringPractice {
  id: string;
  icon: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  howIApply: string[];
  relatedProjects?: string[];
}

export const engineeringPractices: EngineeringPractice[] = [
  {
    id: 'distributed-systems',
    icon: 'Network',
    title: 'Sistemas Distribuídos',
    shortDescription: 'Arquiteturas que funcionam em múltiplas instâncias sem perda de dados',
    longDescription: 'Sistemas distribuídos são minha especialidade. Desenvolvo arquiteturas que escalam horizontalmente, mantêm consistência eventual, e resistem a falhas de instância.',
    howIApply: [
      'Coordenação com Redis/RabbitMQ para sincronização entre instâncias',
      'Pattern Outbox para garantir exactly-once em transações distribuídas',
      'Circuit Breaker para evitar falhas em cascata',
      'Partitionamento de dados por chave de negócio',
      'Consistência eventual com Event Sourcing'
    ],
    relatedProjects: ['pipeline-event-driven', 'integradora-offline-online']
  },
  {
    id: 'complex-integrations',
    icon: 'Plug',
    title: 'Integrações Complexas',
    shortDescription: 'Conexões com ERPs, APIs externas e sistemas legados sem dor de cabeça',
    longDescription: 'Integrações são onde maioria dos sistemas falha. Desenvolvo conectores resilientes que lidam com timeouts, retries, transformações de dados e falhas parciais.',
    howIApply: [
      'Padrão Adapter para isolar contratos de APIs externas',
      'Dead Letter Queue para investigar falhas assincronamente',
      'Idempotência garantir processamento único',
      'MapStruct para transformação eficiente entre domínios',
      'Circuit Breaker para proteger de APIs instáveis'
    ],
    relatedProjects: ['arquitetura-integracao-hibrida', 'sistema-cadastro-ocr']
  },
  {
    id: 'performance',
    icon: 'Zap',
    title: 'Performance & Escalabilidade',
    shortDescription: 'Sistemas rápidos mesmo com milhões de requisições',
    longDescription: 'Performance não é luxo, é requisito. Otimizo desde queries N+1 até arquitetura de caching, garantindo tempo de resposta consistente sob carga.',
    howIApply: [
      'Análise de execution plans para otimizar queries SQL',
      'Caching em múltiplas camadas (Redis, Caffeine)',
      'Async processing para operações pesadas',
      'Indexação estratégica baseada em padrões de acesso',
      'Profiling com Async Profiler para identificar gargalos'
    ],
    relatedProjects: ['sistema-rca-monolito', 'pipeline-event-driven']
  },
  {
    id: 'production-issues',
    icon: 'AlertTriangle',
    title: 'Problemas em Produção',
    shortDescription: 'Debugging de incidentes críticos com precisão de engenharia',
    longDescription: 'O que separa júnior de sênior é a capacidade de resolver problemas em produção. Tenho experiência em incidentes críticos, desde deadlocks até vazamentos de memória.',
    howIApply: [
      'Distributed Tracing (OpenTelemetry) para seguir o fluxo completo',
      'Análise de heap dumps e thread dumps',
      'Log estruturado com correlation IDs',
      'Post-mortem estruturado para evitar recorrência',
      'Alertamento proativo baseado em SLOs'
    ],
    relatedProjects: ['iac-terraform-aws', 'pipeline-event-driven']
  },
  {
    id: 'reliability',
    icon: 'Shield',
    title: 'Confiabilidade & Resiliência',
    shortDescription: 'Sistemas que não caem quando as coisas dão errado',
    longDescription: 'Sistemas confiáveis não evitam falhas, mas as graceful degradation. Desenvolvo arquiteturas que degradam lentamente e se recuperam automaticamente.',
    howIApply: [
      'Graceful degradation emfallhas parciais',
      'Retry com backoff exponencial e jitter',
      'Bulkheads para isolar recursos críticos',
      'Health checks proativos e readiness probes',
      'Rollback automatizado em deploys problemáticos'
    ],
    relatedProjects: ['pipeline-event-driven', 'integradora-offline-online']
  },
  {
    id: 'data-consistency',
    icon: 'Database',
    title: 'Consistência de Dados',
    shortDescription: 'Garantir que dados nunca se percam ou fiquem inconsistentes',
    longDescription: 'Dados são o ativo mais importante. Desenvolvo estratégias de consistência que garantem integridade mesmo em cenários de falha parcial.',
    howIApply: [
      'SAGA pattern para transações distribuídas',
      'Two-phase commit quando necessário',
      'Eventual consistency com reconciliation jobs',
      'Checksums e validações em pipeline de dados',
      'CDC para espelhamento de dados confiável'
    ],
    relatedProjects: ['integradora-offline-online', 'arquitetura-integracao-hibrida']
  },
  {
    id: 'cloud-native',
    icon: 'Cloud',
    title: 'Cloud & Infraestrutura',
    shortDescription: 'Terraform, Kubernetes, AWS - infra como código',
    longDescription: 'Infraestrutura é código. Desenvolvo toda configuração como código versionado, com pipelines reproduzíveis e ambientes idênticos.',
    howIApply: [
      'Terraform para toda infraestrutura como código',
      'EKS/Fargate para orquestração de containers',
      'Lambda para event-driven serverless',
      'CloudWatch/Grafana para monitoramento completo',
      'IaC testável com Terratest'
    ],
    relatedProjects: ['iac-terraform-aws']
  },
  {
    id: 'quality',
    icon: 'CheckCircle',
    title: 'Qualidade & Automação',
    shortDescription: 'Testes que realmente protegem o código, não apenas números de cobertura',
    longDescription: 'Qualidade não é métrica, é processo. Desenvolvo pipelines que validam behavior, não apenas executam testes.',
    howIApply: [
      'TDD com emphasis em test pyramids',
      'Testcontainers para testes de integração realistas',
      'Mutation testing para validar qualidade de testes',
      'Static analysis (SonarQube, SpotBugs)',
      'Contract testing para APIs'
    ],
    relatedProjects: ['sistema-rca-monolito', 'pipeline-event-driven']
  }
];
