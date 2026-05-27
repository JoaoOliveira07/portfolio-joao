export interface Project {
  slug: string;
  title: { pt: string; en: string };
  subtitle: { pt: string; en: string };
  description: { pt: string; en: string };
  problem: { pt: string; en: string };
  solution: { pt: string; en: string };
  techStack: string[];
  highlights: { pt: string[]; en: string[] };
  role: { pt: string; en: string };
  category: 'iac' | 'event-driven' | 'integration' | 'sync' | 'automation' | 'monolith';
  year: number;
  complexity: 5 | 4 | 3;
  diagram?: string;
  challenges?: { pt: string[]; en: string[] };
  results?: { pt: string[]; en: string[] };
  technicalDecisions?: { pt: string[]; en: string[] };
}

export const projects: Project[] = [
  {
    slug: 'iac-terraform-aws',
    title: {
      pt: 'IaC - Infraestrutura AWS com Terraform',
      en: 'IaC - AWS Infrastructure with Terraform'
    },
    subtitle: {
      pt: 'Infrastructure as Code para provisionamento reproduzível',
      en: 'Infrastructure as Code for reproducible provisioning'
    },
    description: {
      pt: 'Implementação de Infrastructure as Code utilizando Terraform para gerenciar recursos AWS de forma versionada e automatizada.',
      en: 'Implementation of Infrastructure as Code using Terraform to manage AWS resources in a versioned and automated way.'
    },
    problem: {
      pt: 'Provisionar e versionar infraestrutura AWS de forma reproduzível, evitando configurações manuais e facilitando ambientes de staging/produção.',
      en: 'Provision and version AWS infrastructure reproducibly, avoiding manual configurations and facilitating staging/production environments.'
    },
    solution: {
      pt: 'Implementação de Infrastructure as Code utilizando Terraform para gerenciar recursos AWS (Lambda, SQS, S3, IAM), com estado remoto e pipelines de CI/CD.',
      en: 'Implementation of Infrastructure as Code using Terraform to manage AWS resources (Lambda, SQS, S3, IAM), with remote state and CI/CD pipelines.'
    },
    techStack: ['Terraform', 'AWS Lambda', 'AWS SQS', 'AWS S3', 'AWS IAM', 'AWS CloudWatch', 'CI/CD'],
    highlights: {
      pt: [
        'Módulos Terraform reutilizáveis para componentes comuns',
        'Configuração de Lambdas (runtime, memory, timeout, environment)',
        'Criação e configuração de filas SQS (DLQ, retention, visibility)',
        'Gestão de buckets S3 com políticas de lifecycle',
        'IAM roles e policies seguindo least privilege',
        'Remote state com versionamento',
        'Automação de deploy via CI/CD'
      ],
      en: [
        'Reusable Terraform modules for common components',
        'Lambda configuration (runtime, memory, timeout, environment)',
        'SQS queue creation and configuration (DLQ, retention, visibility)',
        'S3 bucket management with lifecycle policies',
        'IAM roles and policies following least privilege',
        'Remote state with versioning',
        'Automated deployment via CI/CD'
      ]
    },
    role: {
      pt: 'Implementação de módulos Terraform e automação de infraestrutura',
      en: 'Implementation of Terraform modules and infrastructure automation'
    },
    category: 'iac',
    year: 2025,
    complexity: 5,
    diagram: `graph TB
    Dev[Developer] -->|terraform apply| TF[Terraform]
    TF -->|provision| Lambda[AWS Lambda]
    TF -->|provision| SQS[AWS SQS]
    TF -->|provision| S3[AWS S3]
    TF -->|provision| IAM[AWS IAM]
    TF -->|state| StateS3[(Remote State S3)]

    Lambda -->|logs| CW[CloudWatch]
    SQS -->|DLQ| DLQ[Dead Letter Queue]

    CI[CI/CD Pipeline] -->|auto deploy| TF

    style Lambda fill:#01926D
    style SQS fill:#01926D
    style S3 fill:#01926D`,
    challenges: {
      pt: [
        'Gerenciar estado compartilhado entre múltiplos desenvolvedores sem conflitos',
        'Implementar políticas IAM seguindo princípio do menor privilégio',
        'Configurar Dead Letter Queues e políticas de retry adequadas',
        'Automatizar todo o processo de deploy mantendo segurança'
      ],
      en: [
        'Manage shared state between multiple developers without conflicts',
        'Implement IAM policies following least privilege principle',
        'Configure Dead Letter Queues and proper retry policies',
        'Automate entire deployment process while maintaining security'
      ]
    },
    results: {
      pt: [
        'Redução de 90% no tempo de provisionamento de novos ambientes',
        'Zero configurações manuais na AWS Console',
        'Infraestrutura versionada e auditável via Git',
        'Deploys automatizados com rollback rápido em caso de falha'
      ],
      en: [
        '90% reduction in provisioning time for new environments',
        'Zero manual configurations in AWS Console',
        'Versioned and auditable infrastructure via Git',
        'Automated deploys with quick rollback on failure'
      ]
    },
    technicalDecisions: {
      pt: [
        'Remote State com S3 + DynamoDB Lock: Estado compartilhado entre desenvolvedores com lock distribuído para prevenir conflitos',
        'Least Privilege IAM: Policies mínimas necessárias por recurso, seguindo princípio do menor privilégio',
        'Dead Letter Queues: SQS DLQ com retention de 14 dias para debug e reprocessamento de mensagens falhas',
        'Módulos Reutilizáveis: Componentes Terraform parametrizados para Lambda, SQS, S3 garantindo consistência',
        'Lifecycle Policies: Automated data lifecycle em S3 (Standard → IA → Glacier) para otimização de custos'
      ],
      en: [
        'Remote State with S3 + DynamoDB Lock: Shared state between developers with distributed locking to prevent conflicts',
        'Least Privilege IAM: Minimal necessary policies per resource, following principle of least privilege',
        'Dead Letter Queues: SQS DLQ with 14-day retention for debugging and reprocessing failed messages',
        'Reusable Modules: Parameterized Terraform components for Lambda, SQS, S3 ensuring consistency',
        'Lifecycle Policies: Automated data lifecycle in S3 (Standard → IA → Glacier) for cost optimization'
      ]
    }
  },
  {
    slug: 'pipeline-event-driven',
    title: {
      pt: 'Pipeline de Extração Event-Driven',
      en: 'Event-Driven Data Pipeline'
    },
    subtitle: {
      pt: 'Arquitetura orientada a eventos com Outbox Pattern',
      en: 'Event-driven architecture with Outbox Pattern'
    },
    description: {
      pt: 'Sistema de extração de dados em larga escala utilizando arquitetura event-driven com garantias de entrega.',
      en: 'Large-scale data extraction system using event-driven architecture with delivery guarantees.'
    },
    problem: {
      pt: 'Processar e extrair grandes volumes de dados de forma confiável, garantindo que nenhum evento seja perdido mesmo em cenários de falha, e permitindo reprocessamento quando necessário.',
      en: 'Process and extract large volumes of data reliably, ensuring no events are lost even in failure scenarios, and allowing reprocessing when needed.'
    },
    solution: {
      pt: 'Implementação de arquitetura orientada a eventos utilizando Outbox Pattern para garantia de entrega, com processamento assíncrono através de Publisher/Consumer pattern e balanceamento de carga.',
      en: 'Implementation of event-driven architecture using Outbox Pattern for delivery guarantees, with asynchronous processing through Publisher/Consumer pattern and load balancing.'
    },
    techStack: ['Java 17', 'Spring Boot', 'PostgreSQL', 'AWS SQS', 'Event-Driven Architecture', 'Hibernate'],
    highlights: {
      pt: [
        'Outbox Pattern implementado para garantir consistência eventual',
        'Event Relay para publicação confiável de eventos',
        'Publisher/Consumer assíncrono com retry policies',
        'BalanceLines para distribuição de carga de processamento',
        'DataTypes e DataExtractor para transformação de dados',
        'Testes unitários e de integração cobrindo cenários de falha',
        'Observabilidade com logs estruturados e métricas'
      ],
      en: [
        'Outbox Pattern implemented to ensure eventual consistency',
        'Event Relay for reliable event publishing',
        'Asynchronous Publisher/Consumer with retry policies',
        'BalanceLines for processing load distribution',
        'DataTypes and DataExtractor for data transformation',
        'Unit and integration tests covering failure scenarios',
        'Observability with structured logs and metrics'
      ]
    },
    role: {
      pt: 'Arquitetura da solução, implementação de patterns e testes',
      en: 'Solution architecture, pattern implementation and testing'
    },
    category: 'event-driven',
    year: 2024,
    complexity: 5,
    diagram: `graph LR
    API[API/Service] -->|write| DB[(PostgreSQL)]
    API -->|insert| Outbox[(Outbox Table)]

    Relay[Event Relay] -->|poll| Outbox
    Relay -->|publish| SQS[AWS SQS]

    Pub[Publisher] -->|consume| SQS
    Pub -->|transform| Extract[Data Extractor]
    Extract -->|balance| Balance[Balance Lines]
    Balance -->|process| Consumer[Consumer Pool]

    Consumer -->|retry on fail| DLQ[Dead Letter Queue]

    style Outbox fill:#01926D
    style SQS fill:#01926D
    style Relay fill:#A855F7`,
    challenges: {
      pt: [
        'Garantir exactly-once delivery em sistema distribuído',
        'Balancear carga entre múltiplos consumers sem duplicação',
        'Implementar retry policies que não sobrecarreguem o sistema',
        'Manter observabilidade em todo o pipeline de processamento'
      ],
      en: [
        'Ensure exactly-once delivery in distributed system',
        'Balance load between multiple consumers without duplication',
        "Implement retry policies that don't overload the system",
        'Maintain observability throughout the processing pipeline'
      ]
    },
    results: {
      pt: [
        'Processamento de 10M+ eventos/dia com zero perda de dados',
        'Redução de 60% no tempo de extração com balanceamento inteligente',
        'Recovery automático em cenários de falha sem intervenção manual',
        'Rastreabilidade completa de eventos do início ao fim'
      ],
      en: [
        'Processing 10M+ events/day with zero data loss',
        '60% reduction in extraction time with smart balancing',
        'Automatic recovery in failure scenarios without manual intervention',
        'Complete event traceability from start to finish'
      ]
    },
    technicalDecisions: {
      pt: [
        'Outbox Pattern: Garantia de exactly-once delivery persistindo eventos na mesma transação antes de publicar',
        'Exponential Backoff: Retry policies com tempo crescente entre tentativas (2s → 4s → 8s → 16s) para evitar sobrecarga',
        'Idempotency Keys: Consumers processam eventos múltiplas vezes sem duplicação usando identificadores únicos',
        'Circuit Breaker: Proteção contra cascading failures em sistemas downstream com fallback automático',
        'Event Versioning: Schema evolution permitindo compatibilidade entre versões de eventos'
      ],
      en: [
        'Outbox Pattern: Exactly-once delivery guarantee by persisting events in same transaction before publishing',
        'Exponential Backoff: Retry policies with increasing time between attempts (2s → 4s → 8s → 16s) to avoid overload',
        'Idempotency Keys: Consumers process events multiple times without duplication using unique identifiers',
        'Circuit Breaker: Protection against cascading failures in downstream systems with automatic fallback',
        'Event Versioning: Schema evolution allowing compatibility between event versions'
      ]
    }
  },
  {
    slug: 'arquitetura-integracao-hibrida',
    title: {
      pt: 'Arquitetura de Integração Híbrida',
      en: 'Hybrid Integration Architecture'
    },
    subtitle: {
      pt: 'Integração Cloud + On-Premise com resiliência',
      en: 'Cloud + On-Premise integration with resilience'
    },
    description: {
      pt: 'Sistema de integração entre soluções cloud-native e sistemas legados on-premise.',
      en: 'Integration system between cloud-native solutions and legacy on-premise systems.'
    },
    problem: {
      pt: 'Integrar sistemas legados on-premise com novas soluções cloud-native, garantindo sincronização de dados bidirecional, transformação de formatos e resiliência a falhas de rede.',
      en: 'Integrate legacy on-premise systems with new cloud-native solutions, ensuring bidirectional data synchronization, format transformation, and network failure resilience.'
    },
    solution: {
      pt: 'Arquitetura em três camadas: Orchestrator (coordenação), Middleware (transformação) e Client On-Premise (sincronização local), com comunicação assíncrona e retry automático.',
      en: 'Three-layer architecture: Orchestrator (coordination), Middleware (transformation), and On-Premise Client (local synchronization), with asynchronous communication and automatic retry.'
    },
    techStack: ['Java 17', 'Spring Boot', 'AWS', 'REST APIs', 'Event-Driven', 'Circuit Breaker'],
    highlights: {
      pt: [
        'Orchestrator centralizando lógica de integração',
        'Middleware para transformação e validação de dados',
        'Client on-premise com sincronização resiliente',
        'Padrão de comunicação assíncrona com dead letter queues',
        'Circuit breaker para evitar sobrecarga em sistemas legados',
        'Monitoramento end-to-end com CloudWatch'
      ],
      en: [
        'Orchestrator centralizing integration logic',
        'Middleware for data transformation and validation',
        'On-premise client with resilient synchronization',
        'Asynchronous communication pattern with dead letter queues',
        'Circuit breaker to prevent legacy system overload',
        'End-to-end monitoring with CloudWatch'
      ]
    },
    role: {
      pt: 'Desenvolvimento end-to-end e code reviews',
      en: 'End-to-end development and code reviews'
    },
    category: 'integration',
    year: 2025,
    complexity: 4,
    diagram: `graph TB
    Cloud[Cloud System] <-->|REST API| Orch[Orchestrator]
    Orch <-->|transform| Mid[Middleware]
    Mid <-->|async queue| Client[On-Premise Client]
    Client <-->|sync| Legacy[(Legacy System)]

    Orch -->|circuit breaker| CB{Health Check}
    Mid -->|validate| Valid[Data Validator]
    Client -->|retry| Queue[Retry Queue]

    style Orch fill:#01926D
    style Mid fill:#A855F7
    style Client fill:#01926D`,
    challenges: {
      pt: [
        'Lidar com intermitência de rede entre cloud e on-premise',
        'Transformar dados entre formatos legados e modernos',
        'Implementar circuit breaker sem perder dados',
        'Sincronização bidirecional sem conflitos'
      ],
      en: [
        'Handle network intermittency between cloud and on-premise',
        'Transform data between legacy and modern formats',
        'Implement circuit breaker without data loss',
        'Bidirectional synchronization without conflicts'
      ]
    },
    results: {
      pt: [
        '99.9% de disponibilidade da integração',
        'Redução de 80% em falhas por problemas de rede',
        'Tempo de sincronização reduzido de horas para minutos',
        'Zero perda de dados em cenários de falha de rede'
      ],
      en: [
        '99.9% integration availability',
        '80% reduction in network-related failures',
        'Synchronization time reduced from hours to minutes',
        'Zero data loss in network failure scenarios'
      ]
    },
    technicalDecisions: {
      pt: [
        'Circuit Breaker Pattern: Evita sobrecarga em sistemas legados com timeout configurável e fallback',
        'Data Transformation Layer: Middleware dedicado para converter formatos legados em JSON moderno',
        'Retry Queue: Fila separada para reprocessamento de mensagens falhas sem bloquear fluxo principal',
        'Health Check Proativo: Monitoring contínuo de conectividade antes de tentar comunicação',
        'Dual Write Strategy: Sincronização bidirecional com conflict resolution baseado em timestamp'
      ],
      en: [
        'Circuit Breaker Pattern: Prevents legacy system overload with configurable timeout and fallback',
        'Data Transformation Layer: Dedicated middleware to convert legacy formats to modern JSON',
        'Retry Queue: Separate queue for reprocessing failed messages without blocking main flow',
        'Proactive Health Check: Continuous connectivity monitoring before attempting communication',
        'Dual Write Strategy: Bidirectional sync with timestamp-based conflict resolution'
      ]
    }
  },
  {
    slug: 'integradora-offline-online',
    title: {
      pt: 'Integradora Offline/Online',
      en: 'Offline/Online Integrator'
    },
    subtitle: {
      pt: 'Sincronização bidirecional com geração de JSONs',
      en: 'Bidirectional sync with JSON generation'
    },
    description: {
      pt: 'Sistema de sincronização que permite operação offline com sincronização automática quando online.',
      en: 'Synchronization system that allows offline operation with automatic sync when online.'
    },
    problem: {
      pt: 'Permitir que aplicação funcione offline e sincronize dados com sistema online quando conectado, gerando arquivos JSON otimizados para consumo do frontend.',
      en: 'Allow application to work offline and sync data with online system when connected, generating optimized JSON files for frontend consumption.'
    },
    solution: {
      pt: 'Sistema de sincronização bidirecional que detecta mudanças, resolve conflitos e gera arquivos JSON versionados para cache local do frontend.',
      en: 'Bidirectional synchronization system that detects changes, resolves conflicts, and generates versioned JSON files for frontend local cache.'
    },
    techStack: ['Java 17', 'Spring Boot', 'JSON', 'File System', 'Event-Driven'],
    highlights: {
      pt: [
        'Detecção de mudanças (change data capture)',
        'Resolução de conflitos (conflict resolution strategies)',
        'Geração otimizada de JSONs (compressão, versionamento)',
        'Estratégia de sincronização incremental',
        'Versionamento de dados para cache do frontend',
        'Testes garantindo integridade em cenários de falha'
      ],
      en: [
        'Change detection (change data capture)',
        'Conflict resolution (conflict resolution strategies)',
        'Optimized JSON generation (compression, versioning)',
        'Incremental synchronization strategy',
        'Data versioning for frontend cache',
        'Tests ensuring integrity in failure scenarios'
      ]
    },
    role: {
      pt: 'Desenvolvimento da lógica de sincronização e geração de arquivos',
      en: 'Development of synchronization logic and file generation'
    },
    category: 'sync',
    year: 2025,
    complexity: 4,
    diagram: `graph LR
    App[Mobile App] -->|offline mode| Local[(Local Storage)]
    App -->|online| Sync[Sync Service]

    Sync -->|detect changes| CDC[Change Detector]
    CDC -->|resolve| Conflict{Conflict?}
    Conflict -->|yes| Resolver[Conflict Resolver]
    Conflict -->|no| Gen[JSON Generator]
    Resolver --> Gen

    Gen -->|compress| Cache[Versioned Cache]
    Cache -->|serve| App

    style Sync fill:#01926D
    style Gen fill:#A855F7`,
    challenges: {
      pt: [
        'Detectar mudanças offline sem conexão com servidor',
        'Resolver conflitos entre dados offline e online',
        'Gerar JSONs otimizados para performance mobile',
        'Versionamento que permita rollback seguro'
      ],
      en: [
        'Detect offline changes without server connection',
        'Resolve conflicts between offline and online data',
        'Generate optimized JSONs for mobile performance',
        'Versioning that allows safe rollback'
      ]
    },
    results: {
      pt: [
        'App funcional 100% do tempo mesmo sem internet',
        'Sincronização incremental reduz tráfego em 70%',
        'Conflitos resolvidos automaticamente em 95% dos casos',
        'Cache versionado permite rollback instantâneo'
      ],
      en: [
        'App functional 100% of the time even without internet',
        'Incremental sync reduces traffic by 70%',
        'Conflicts automatically resolved in 95% of cases',
        'Versioned cache allows instant rollback'
      ]
    },
    technicalDecisions: {
      pt: [
        'Change Data Capture: Tracking de modificações offline com delta calculation para sync incremental',
        'Conflict Resolution Strategy: Last-Write-Wins com timestamp + manual resolution para casos críticos',
        'JSON Compression: Gzip compression em payloads reduzindo tamanho em 60-70%',
        'Versioned Cache: Cada sincronização gera nova versão permitindo rollback sem perda de dados',
        'Optimistic Locking: Version field em entidades previne overwrites acidentais'
      ],
      en: [
        'Change Data Capture: Offline modification tracking with delta calculation for incremental sync',
        'Conflict Resolution Strategy: Last-Write-Wins with timestamp + manual resolution for critical cases',
        'JSON Compression: Gzip compression on payloads reducing size by 60-70%',
        'Versioned Cache: Each sync generates new version allowing rollback without data loss',
        'Optimistic Locking: Version field in entities prevents accidental overwrites'
      ]
    }
  },
  {
    slug: 'sistema-cadastro-ocr',
    title: {
      pt: 'Automação de Cadastro com OCR',
      en: 'OCR Automation System'
    },
    subtitle: {
      pt: 'Pipeline serverless para extração de documentos',
      en: 'Serverless pipeline for document extraction'
    },
    description: {
      pt: 'Sistema de cadastro automatizado com extração de dados de documentos via OCR.',
      en: 'Automated registration system with document data extraction via OCR.'
    },
    problem: {
      pt: 'Automatizar o cadastro de clientes através de extração de dados de documentos (CNH, RG), reduzindo tempo de processamento manual e erros de digitação.',
      en: 'Automate customer registration through document data extraction (Driver License, ID), reducing manual processing time and typing errors.'
    },
    solution: {
      pt: 'Pipeline serverless usando AWS Lambda para processar imagens armazenadas no S3, extrair informações via OCR e sincronizar com sistema on-premise de forma assíncrona.',
      en: 'Serverless pipeline using AWS Lambda to process images stored in S3, extract information via OCR, and sync with on-premise system asynchronously.'
    },
    techStack: ['AWS S3', 'AWS Lambda', 'Java 17', 'Spring Boot', 'Event-Driven', 'OCR'],
    highlights: {
      pt: [
        'Upload de imagens para S3 com trigger automático',
        'Lambda para processamento de documentos',
        'Extração de dados estruturados via OCR',
        'Sincronização assíncrona com cliente on-premise',
        'Retry policy para garantir entrega',
        'Logs e métricas no CloudWatch'
      ],
      en: [
        'Image upload to S3 with automatic trigger',
        'Lambda for document processing',
        'Structured data extraction via OCR',
        'Asynchronous synchronization with on-premise client',
        'Retry policy to ensure delivery',
        'Logs and metrics in CloudWatch'
      ]
    },
    role: {
      pt: 'Desenvolvimento da integração S3 → Lambda → API → On-Premise',
      en: 'Development of S3 → Lambda → API → On-Premise integration'
    },
    category: 'automation',
    year: 2024,
    complexity: 3,
    diagram: `graph LR
    User[User] -->|upload| S3[AWS S3]
    S3 -->|trigger| Lambda[AWS Lambda]
    Lambda -->|extract| OCR[OCR Service]
    OCR -->|structured data| Valid[Validator]
    Valid -->|enqueue| Queue[SQS Queue]
    Queue -->|async| API[Backend API]
    API -->|sync| OnPrem[(On-Premise DB)]

    Lambda -->|logs| CW[CloudWatch]
    Queue -->|fail| DLQ[Dead Letter Queue]

    style Lambda fill:#01926D
    style S3 fill:#01926D
    style Queue fill:#A855F7`,
    challenges: {
      pt: [
        'Garantir qualidade da extração OCR em documentos variados',
        'Processar imagens de forma serverless com custo otimizado',
        'Validar dados extraídos antes de persistir',
        'Sincronizar com sistema on-premise de forma resiliente'
      ],
      en: [
        'Ensure OCR extraction quality on varied documents',
        'Process images serverless with optimized cost',
        'Validate extracted data before persisting',
        'Sync with on-premise system resiliently'
      ]
    },
    results: {
      pt: [
        'Redução de 90% no tempo de cadastro manual',
        'Acurácia de 95% na extração de dados',
        'Processamento totalmente serverless com custo 70% menor',
        'Zero cadastros perdidos com retry automático'
      ],
      en: [
        '90% reduction in manual registration time',
        '95% accuracy in data extraction',
        'Fully serverless processing with 70% lower cost',
        'Zero lost registrations with automatic retry'
      ]
    },
    technicalDecisions: {
      pt: [
        'S3 Event Trigger: Lambda invocada automaticamente no upload eliminando polling',
        'Image Preprocessing: Resize e normalização antes do OCR aumentando acurácia em 15%',
        'Validation Pipeline: Múltiplas camadas de validação (format, checksum, business rules)',
        'Async Processing: SQS entre Lambda e API desacoplando processamento da persistência',
        'Cost Optimization: Lambda configurada com memory/timeout mínimos baseado em profiling'
      ],
      en: [
        'S3 Event Trigger: Lambda automatically invoked on upload eliminating polling',
        'Image Preprocessing: Resize and normalization before OCR increasing accuracy by 15%',
        'Validation Pipeline: Multiple validation layers (format, checksum, business rules)',
        'Async Processing: SQS between Lambda and API decoupling processing from persistence',
        'Cost Optimization: Lambda configured with minimal memory/timeout based on profiling'
      ]
    }
  },
  {
    slug: 'sistema-rca-monolito',
    title: {
      pt: 'Sistema RCA - Monolito Modular',
      en: 'RCA System - Modular Monolith'
    },
    subtitle: {
      pt: 'App de vendas, e-commerce e backoffice integrados',
      en: 'Integrated sales app, e-commerce and backoffice'
    },
    description: {
      pt: 'Sistema monolítico modular integrando vendas externas (RCA), e-commerce B2B e operações de backoffice.',
      en: 'Modular monolithic system integrating external sales (RCA), B2B e-commerce, and backoffice operations.'
    },
    problem: {
      pt: 'Necessidade de um sistema unificado para gerenciar vendas externas (RCA), e-commerce B2B e operações de backoffice, garantindo consistência de dados e performance sob alta carga.',
      en: 'Need for a unified system to manage external sales (RCA), B2B e-commerce, and backoffice operations, ensuring data consistency and performance under high load.'
    },
    solution: {
      pt: 'Arquitetura monolítica modular utilizando Spring Boot com clara separação de contextos (Bounded Contexts), aplicando princípios de Domain-Driven Design para manter coesão e baixo acoplamento entre módulos.',
      en: 'Modular monolithic architecture using Spring Boot with clear context separation (Bounded Contexts), applying Domain-Driven Design principles to maintain cohesion and low coupling between modules.'
    },
    techStack: ['Java 17', 'Spring Boot', 'Hibernate', 'PostgreSQL', 'Docker', 'DDD'],
    highlights: {
      pt: [
        'Modularização com Bounded Contexts para separação de domínios',
        'Gerenciamento de transações complexas com Spring @Transactional',
        'Otimização de queries com Hibernate para cenários de alta carga',
        'Testes de integração garantindo comportamento end-to-end',
        'Code reviews e pair programming para manter qualidade do código'
      ],
      en: [
        'Modularization with Bounded Contexts for domain separation',
        'Complex transaction management with Spring @Transactional',
        'Query optimization with Hibernate for high-load scenarios',
        'Integration tests ensuring end-to-end behavior',
        'Code reviews and pair programming to maintain code quality'
      ]
    },
    role: {
      pt: 'Desenvolvimento de features críticas, code reviews e otimizações de performance',
      en: 'Development of critical features, code reviews, and performance optimizations'
    },
    category: 'monolith',
    year: 2024,
    complexity: 3,
    diagram: `graph TB
    App[Mobile RCA App] --> API[Spring Boot API]
    Web[E-commerce B2B] --> API
    Back[Backoffice] --> API

    API --> Sales[Sales Context]
    API --> Products[Products Context]
    API --> Orders[Orders Context]
    API --> Customers[Customers Context]

    Sales --> DB[(PostgreSQL)]
    Products --> DB
    Orders --> DB
    Customers --> DB

    API --> Cache[Redis Cache]

    style API fill:#01926D
    style DB fill:#A855F7`,
    challenges: {
      pt: [
        'Manter modularização clara em monolito crescente',
        'Otimizar queries N+1 em relacionamentos complexos',
        'Gerenciar transações distribuídas entre contextos',
        'Escalar sistema monolítico para alta carga'
      ],
      en: [
        'Maintain clear modularization in growing monolith',
        'Optimize N+1 queries in complex relationships',
        'Manage distributed transactions between contexts',
        'Scale monolithic system for high load'
      ]
    },
    results: {
      pt: [
        'Sistema suportando 10K+ usuários simultâneos',
        'Redução de 70% em queries através de otimizações',
        'Módulos bem definidos facilitam manutenção',
        'Tempo de resposta médio < 200ms em 95% das requisições'
      ],
      en: [
        'System supporting 10K+ concurrent users',
        '70% reduction in queries through optimizations',
        'Well-defined modules facilitate maintenance',
        'Average response time < 200ms in 95% of requests'
      ]
    },
    technicalDecisions: {
      pt: [
        'Bounded Contexts: Separação clara de domínios (Sales, Products, Orders) seguindo DDD',
        'N+1 Query Elimination: Uso de JOIN FETCH e EntityGraph evitando lazy loading problems',
        'Transaction Management: @Transactional com isolation REPEATABLE_READ para consistência',
        'Redis Caching: Cache de segundo nível em queries frequentes com TTL configurável',
        'Connection Pooling: HikariCP otimizado (pool size, timeout) baseado em load testing'
      ],
      en: [
        'Bounded Contexts: Clear domain separation (Sales, Products, Orders) following DDD',
        'N+1 Query Elimination: Use of JOIN FETCH and EntityGraph avoiding lazy loading problems',
        'Transaction Management: @Transactional with REPEATABLE_READ isolation for consistency',
        'Redis Caching: Second-level cache on frequent queries with configurable TTL',
        'Connection Pooling: HikariCP optimized (pool size, timeout) based on load testing'
      ]
    }
  }
];
