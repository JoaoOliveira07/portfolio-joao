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
    title: 'Distributed Systems',
    shortDescription: 'Architectures that work across multiple instances without data loss',
    longDescription: 'Distributed systems are my specialty. I develop architectures that scale horizontally, maintain eventual consistency, and withstand instance failures.',
    howIApply: [
      'Coordination with Redis/RabbitMQ for synchronization between instances',
      'Outbox Pattern to guarantee exactly-once in distributed transactions',
      'Circuit Breaker to prevent cascading failures',
      'Data partitioning by business key',
      'Eventual consistency with Event Sourcing'
    ],
    relatedProjects: ['pipeline-event-driven', 'integradora-offline-online']
  },
  {
    id: 'complex-integrations',
    icon: 'Plug',
    title: 'Complex Integrations',
    shortDescription: 'Connections with ERPs, external APIs and legacy systems without headache',
    longDescription: 'Integrations are where most systems fail. I develop resilient connectors that handle timeouts, retries, data transformations, and partial failures.',
    howIApply: [
      'Adapter Pattern to isolate external API contracts',
      'Dead Letter Queue for asynchronous failure investigation',
      'Idempotency to ensure single processing',
      'MapStruct for efficient transformation between domains',
      'Circuit Breaker to protect against unstable APIs'
    ],
    relatedProjects: ['arquitetura-integracao-hibrida', 'sistema-cadastro-ocr']
  },
  {
    id: 'performance',
    icon: 'Zap',
    title: 'Performance & Scalability',
    shortDescription: 'Fast systems even with millions of requests',
    longDescription: 'Performance isn\'t a luxury, it\'s a requirement. I optimize from N+1 queries to caching architecture, ensuring consistent response time under load.',
    howIApply: [
      'Execution plan analysis to optimize SQL queries',
      'Caching at multiple layers (Redis, Caffeine)',
      'Async processing for heavy operations',
      'Strategic indexing based on access patterns',
      'Profiling with Async Profiler to identify bottlenecks'
    ],
    relatedProjects: ['sistema-rca-monolito', 'pipeline-event-driven']
  },
  {
    id: 'production-issues',
    icon: 'AlertTriangle',
    title: 'Production Issues',
    shortDescription: 'Critical incident debugging with engineering precision',
    longDescription: 'What separates junior from senior is the ability to solve production issues. I have experience with critical incidents, from deadlocks to memory leaks.',
    howIApply: [
      'Distributed Tracing (OpenTelemetry) to follow complete flow',
      'Heap dump and thread dump analysis',
      'Structured logging with correlation IDs',
      'Structured post-mortem to prevent recurrence',
      'Proactive alerting based on SLOs'
    ],
    relatedProjects: ['iac-terraform-aws', 'pipeline-event-driven']
  },
  {
    id: 'reliability',
    icon: 'Shield',
    title: 'Reliability & Resilience',
    shortDescription: 'Systems that don\'t crash when things go wrong',
    longDescription: 'Reliable systems don\'t avoid failures, but graceful degradation. I develop architectures that degrade slowly and recover automatically.',
    howIApply: [
      'Graceful degradation on partial failures',
      'Retry with exponential backoff and jitter',
      'Bulkheads to isolate critical resources',
      'Proactive health checks and readiness probes',
      'Automated rollback on problematic deployments'
    ],
    relatedProjects: ['pipeline-event-driven', 'integradora-offline-online']
  },
  {
    id: 'data-consistency',
    icon: 'Database',
    title: 'Data Consistency',
    shortDescription: 'Ensuring data never gets lost or becomes inconsistent',
    longDescription: 'Data is the most important asset. I develop consistency strategies that guarantee integrity even in partial failure scenarios.',
    howIApply: [
      'SAGA pattern for distributed transactions',
      'Two-phase commit when necessary',
      'Eventual consistency with reconciliation jobs',
      'Checksums and validations in data pipelines',
      'CDC for reliable data mirroring'
    ],
    relatedProjects: ['integradora-offline-online', 'arquitetura-integracao-hibrida']
  },
  {
    id: 'cloud-native',
    icon: 'Cloud',
    title: 'Cloud & Infrastructure',
    shortDescription: 'Terraform, Kubernetes, AWS - infrastructure as code',
    longDescription: 'Infrastructure is code. I develop all configuration as versioned code, with reproducible pipelines and identical environments.',
    howIApply: [
      'Terraform for all infrastructure as code',
      'EKS/Fargate for container orchestration',
      'Lambda for serverless event-driven',
      'CloudWatch/Grafana for complete monitoring',
      'Testable IaC with Terratest'
    ],
    relatedProjects: ['iac-terraform-aws']
  },
  {
    id: 'quality',
    icon: 'CheckCircle',
    title: 'Quality & Automation',
    shortDescription: 'Tests that really protect the code, not just coverage numbers',
    longDescription: 'Quality isn\'t a metric, it\'s a process. I develop pipelines that validate behavior, not just run tests.',
    howIApply: [
      'TDD with emphasis on test pyramids',
      'Testcontainers for realistic integration tests',
      'Mutation testing to validate test quality',
      'Static analysis (SonarQube, SpotBugs)',
      'Contract testing for APIs'
    ],
    relatedProjects: ['sistema-rca-monolito', 'pipeline-event-driven']
  }
];
