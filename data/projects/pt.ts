export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  problem: string;
  solution: string;
  techStack: string[];
  highlights: string[];
  role: string;
  category: 'iac' | 'event-driven' | 'integration' | 'sync' | 'automation' | 'monolith';
  year: number;
  complexity: 5 | 4 | 3;
  diagram?: string;
  challenges?: string[];
  results?: string[];
  technicalDecisions?: string[];
}

export const projects: Project[] = [
  {
    slug: 'iac-terraform-aws',
    title: 'IaC - Infraestrutura AWS com Terraform',
    subtitle: 'Infrastructure as Code para provisionamento reproduzível',
    description: 'Implementação de Infrastructure as Code utilizando Terraform para gerenciar recursos AWS de forma versionada e automatizada.',
    problem: 'Provisionar e versionar infraestrutura AWS de forma reproduzível, evitando configurações manuais e facilitando ambientes de staging/produção.',
    solution: 'Implementação de Infrastructure as Code utilizando Terraform para gerenciar recursos AWS (Lambda, SQS, S3, IAM), com estado remoto e pipelines de CI/CD.',
    techStack: ['Terraform', 'AWS Lambda', 'AWS SQS', 'AWS S3', 'AWS IAM', 'AWS CloudWatch', 'CI/CD'],
    highlights: [
      'Módulos Terraform reutilizáveis para componentes comuns',
      'Configuração de Lambdas (runtime, memory, timeout, environment)',
      'Criação e configuração de filas SQS (DLQ, retention, visibility)',
      'Gestão de buckets S3 com políticas de lifecycle',
      'IAM roles e policies seguindo least privilege',
      'Remote state com versionamento',
      'Automação de deploy via CI/CD'
    ],
    role: 'Implementação de módulos Terraform e automação de infraestrutura',
    category: 'iac',
    year: 2025,
    complexity: 5,
    diagram: `graph TB
    Dev[Desenvolvedor] -->|terraform apply| TF[Terraform]
    TF -->|provisiona| Lambda[AWS Lambda]
    TF -->|provisiona| SQS[AWS SQS]
    TF -->|provisiona| S3[AWS S3]
    TF -->|provisiona| IAM[AWS IAM]
    TF -->|state| StateS3[(Remote State S3)]
    
    Lambda -->|logs| CW[CloudWatch]
    SQS -->|DLQ| DLQ[Dead Letter Queue]
    
    CI[CI/CD Pipeline] -->|auto deploy| TF
    
    style Lambda fill:#01926D
    style SQS fill:#01926D
    style S3 fill:#01926D`,
    challenges: [
      'Gerenciar estado compartilhado entre múltiplos desenvolvedores sem conflitos',
      'Implementar políticas IAM seguindo princípio do menor privilégio',
      'Configurar Dead Letter Queues e políticas de retry adequadas',
      'Automatizar todo o processo de deploy mantendo segurança'
    ],
    results: [
      'Redução de 90% no tempo de provisionamento de novos ambientes',
      'Zero configurações manuais na AWS Console',
      'Infraestrutura versionada e auditável via Git',
      'Deploys automatizados com rollback rápido em caso de falha'
    ],
    technicalDecisions: [
      'Remote State com S3 + DynamoDB Lock: Estado compartilhado entre desenvolvedores com lock distribuído para prevenir conflitos',
      'Least Privilege IAM: Policies mínimas necessárias por recurso, seguindo princípio do menor privilégio',
      'Dead Letter Queues: SQS DLQ com retention de 14 dias para debug e reprocessamento de mensagens falhas',
      'Módulos Reutilizáveis: Componentes Terraform parametrizados para Lambda, SQS, S3 garantindo consistência',
      'Lifecycle Policies: Automated data lifecycle em S3 (Standard → IA → Glacier) para otimização de custos'
    ]
  },
  {
    slug: 'pipeline-event-driven',
    title: 'Pipeline de Extração Event-Driven',
    subtitle: 'Arquitetura orientada a eventos com Outbox Pattern',
    description: 'Sistema de extração de dados em larga escala utilizando arquitetura event-driven com garantias de entrega.',
    problem: 'Processar e extrair grandes volumes de dados de forma confiável, garantindo que nenhum evento seja perdido mesmo em cenários de falha, e permitindo reprocessamento quando necessário.',
    solution: 'Implementação de arquitetura orientada a eventos utilizando Outbox Pattern para garantia de entrega, com processamento assíncrono através de Publisher/Consumer pattern e balanceamento de carga.',
    techStack: ['Java 17', 'Spring Boot', 'PostgreSQL', 'AWS SQS', 'Event-Driven Architecture', 'Hibernate'],
    highlights: [
      'Outbox Pattern implementado para garantir consistência eventual',
      'Event Relay para publicação confiável de eventos',
      'Publisher/Consumer assíncrono com retry policies',
      'BalanceLines para distribuição de carga de processamento',
      'DataTypes e DataExtractor para transformação de dados',
      'Testes unitários e de integração cobrindo cenários de falha',
      'Observabilidade com logs estruturados e métricas'
    ],
    role: 'Arquitetura da solução, implementação de patterns e testes',
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
    challenges: [
      'Garantir exactly-once delivery em sistema distribuído',
      'Balancear carga entre múltiplos consumers sem duplicação',
      'Implementar retry policies que não sobrecarreguem o sistema',
      'Manter observabilidade em todo o pipeline de processamento'
    ],
    results: [
      'Processamento de 10M+ eventos/dia com zero perda de dados',
      'Redução de 60% no tempo de extração com balanceamento inteligente',
      'Recovery automático em cenários de falha sem intervenção manual',
      'Rastreabilidade completa de eventos do início ao fim'
    ],
    technicalDecisions: [
      'Outbox Pattern: Garantia de exactly-once delivery persistindo eventos na mesma transação antes de publicar',
      'Exponential Backoff: Retry policies com tempo crescente entre tentativas (2s → 4s → 8s → 16s) para evitar sobrecarga',
      'Idempotency Keys: Consumers processam eventos múltiplas vezes sem duplicação usando identificadores únicos',
      'Circuit Breaker: Proteção contra cascading failures em sistemas downstream com fallback automático',
      'Event Versioning: Schema evolution permitindo compatibilidade entre versões de eventos'
    ]
  },
  {
    slug: 'arquitetura-integracao-hibrida',
    title: 'Arquitetura de Integração Híbrida',
    subtitle: 'Integração Cloud + On-Premise com resiliência',
    description: 'Sistema de integração entre soluções cloud-native e sistemas legados on-premise.',
    problem: 'Integrar sistemas legados on-premise com novas soluções cloud-native, garantindo sincronização de dados bidirecional, transformação de formatos e resiliência a falhas de rede.',
    solution: 'Arquitetura em três camadas: Orchestrator (coordenação), Middleware (transformação) e Client On-Premise (sincronização local), com comunicação assíncrona e retry automático.',
    techStack: ['Java 17', 'Spring Boot', 'AWS', 'REST APIs', 'Event-Driven', 'Circuit Breaker'],
    highlights: [
      'Orchestrator centralizando lógica de integração',
      'Middleware para transformação e validação de dados',
      'Client on-premise com sincronização resiliente',
      'Padrão de comunicação assíncrona com dead letter queues',
      'Circuit breaker para evitar sobrecarga em sistemas legados',
      'Monitoramento end-to-end com CloudWatch'
    ],
    role: 'Desenvolvimento end-to-end e code reviews',
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
    challenges: [
      'Lidar com intermitência de rede entre cloud e on-premise',
      'Transformar dados entre formatos legados e modernos',
      'Implementar circuit breaker sem perder dados',
      'Sincronização bidirecional sem conflitos'
    ],
    results: [
      '99.9% de disponibilidade da integração',
      'Redução de 80% em falhas por problemas de rede',
      'Tempo de sincronização reduzido de horas para minutos',
      'Zero perda de dados em cenários de falha de rede'
    ],
    technicalDecisions: [
      'Circuit Breaker Pattern: Evita sobrecarga em sistemas legados com timeout configurável e fallback',
      'Data Transformation Layer: Middleware dedicado para converter formatos legados em JSON moderno',
      'Retry Queue: Fila separada para reprocessamento de mensagens falhas sem bloquear fluxo principal',
      'Health Check Proativo: Monitoring contínuo de conectividade antes de tentar comunicação',
      'Dual Write Strategy: Sincronização bidirecional com conflict resolution baseado em timestamp'
    ]
  },
  {
    slug: 'integradora-offline-online',
    title: 'Integradora Offline/Online',
    subtitle: 'Sincronização bidirecional com geração de JSONs',
    description: 'Sistema de sincronização que permite operação offline com sincronização automática quando online.',
    problem: 'Permitir que aplicação funcione offline e sincronize dados com sistema online quando conectado, gerando arquivos JSON otimizados para consumo do frontend.',
    solution: 'Sistema de sincronização bidirecional que detecta mudanças, resolve conflitos e gera arquivos JSON versionados para cache local do frontend.',
    techStack: ['Java 17', 'Spring Boot', 'JSON', 'File System', 'Event-Driven'],
    highlights: [
      'Detecção de mudanças (change data capture)',
      'Resolução de conflitos (conflict resolution strategies)',
      'Geração otimizada de JSONs (compressão, versionamento)',
      'Estratégia de sincronização incremental',
      'Versionamento de dados para cache do frontend',
      'Testes garantindo integridade em cenários de falha'
    ],
    role: 'Desenvolvimento da lógica de sincronização e geração de arquivos',
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
    challenges: [
      'Detectar mudanças offline sem conexão com servidor',
      'Resolver conflitos entre dados offline e online',
      'Gerar JSONs otimizados para performance mobile',
      'Versionamento que permita rollback seguro'
    ],
    results: [
      'App funcional 100% do tempo mesmo sem internet',
      'Sincronização incremental reduz tráfego em 70%',
      'Conflitos resolvidos automaticamente em 95% dos casos',
      'Cache versionado permite rollback instantâneo'
    ],
    technicalDecisions: [
      'Change Data Capture: Tracking de modificações offline com delta calculation para sync incremental',
      'Conflict Resolution Strategy: Last-Write-Wins com timestamp + manual resolution para casos críticos',
      'JSON Compression: Gzip compression em payloads reduzindo tamanho em 60-70%',
      'Versioned Cache: Cada sincronização gera nova versão permitindo rollback sem perda de dados',
      'Optimistic Locking: Version field em entidades previne overwrites acidentais'
    ]
  },
  {
    slug: 'sistema-cadastro-ocr',
    title: 'Automação de Cadastro com OCR',
    subtitle: 'Pipeline serverless para extração de documentos',
    description: 'Sistema de cadastro automatizado com extração de dados de documentos via OCR.',
    problem: 'Automatizar o cadastro de clientes através de extração de dados de documentos (CNH, RG), reduzindo tempo de processamento manual e erros de digitação.',
    solution: 'Pipeline serverless usando AWS Lambda para processar imagens armazenadas no S3, extrair informações via OCR e sincronizar com sistema on-premise de forma assíncrona.',
    techStack: ['AWS S3', 'AWS Lambda', 'Java 17', 'Spring Boot', 'Event-Driven', 'OCR'],
    highlights: [
      'Upload de imagens para S3 com trigger automático',
      'Lambda para processamento de documentos',
      'Extração de dados estruturados via OCR',
      'Sincronização assíncrona com cliente on-premise',
      'Retry policy para garantir entrega',
      'Logs e métricas no CloudWatch'
    ],
    role: 'Desenvolvimento da integração S3 → Lambda → API → On-Premise',
    category: 'automation',
    year: 2024,
    complexity: 3,
    diagram: `graph LR
    User[Usuário] -->|upload| S3[AWS S3]
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
    challenges: [
      'Garantir qualidade da extração OCR em documentos variados',
      'Processar imagens de forma serverless com custo otimizado',
      'Validar dados extraídos antes de persistir',
      'Sincronizar com sistema on-premise de forma resiliente'
    ],
    results: [
      'Redução de 90% no tempo de cadastro manual',
      'Acurácia de 95% na extração de dados',
      'Processamento totalmente serverless com custo 70% menor',
      'Zero cadastros perdidos com retry automático'
    ],
    technicalDecisions: [
      'S3 Event Trigger: Lambda invocada automaticamente no upload eliminando polling',
      'Image Preprocessing: Resize e normalização antes do OCR aumentando acurácia em 15%',
      'Validation Pipeline: Múltiplas camadas de validação (format, checksum, business rules)',
      'Async Processing: SQS entre Lambda e API desacoplando processamento da persistência',
      'Cost Optimization: Lambda configurada com memory/timeout mínimos baseado em profiling'
    ]
  },
  {
    slug: 'sistema-rca-monolito',
    title: 'Sistema RCA - Monolito Modular',
    subtitle: 'App de vendas, e-commerce e backoffice integrados',
    description: 'Sistema monolítico modular integrando vendas externas (RCA), e-commerce B2B e operações de backoffice.',
    problem: 'Necessidade de um sistema unificado para gerenciar vendas externas (RCA), e-commerce B2B e operações de backoffice, garantindo consistência de dados e performance sob alta carga.',
    solution: 'Arquitetura monolítica modular utilizando Spring Boot com clara separação de contextos (Bounded Contexts), aplicando princípios de Domain-Driven Design para manter coesão e baixo acoplamento entre módulos.',
    techStack: ['Java 17', 'Spring Boot', 'Hibernate', 'PostgreSQL', 'Docker', 'DDD'],
    highlights: [
      'Modularização com Bounded Contexts para separação de domínios',
      'Gerenciamento de transações complexas com Spring @Transactional',
      'Otimização de queries com Hibernate para cenários de alta carga',
      'Testes de integração garantindo comportamento end-to-end',
      'Code reviews e pair programming para manter qualidade do código'
    ],
    role: 'Desenvolvimento de features críticas, code reviews e otimizações de performance',
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
    challenges: [
      'Manter modularização clara em monolito crescente',
      'Otimizar queries N+1 em relacionamentos complexos',
      'Gerenciar transações distribuídas entre contextos',
      'Escalar sistema monolítico para alta carga'
    ],
    results: [
      'Sistema suportando 10K+ usuários simultâneos',
      'Redução de 70% em queries através de otimizações',
      'Módulos bem definidos facilitam manutenção',
      'Tempo de resposta médio < 200ms em 95% das requisições'
    ],
    technicalDecisions: [
      'Bounded Contexts: Separação clara de domínios (Sales, Products, Orders) seguindo DDD',
      'N+1 Query Elimination: Uso de JOIN FETCH e EntityGraph evitando lazy loading problems',
      'Transaction Management: @Transactional com isolation REPEATABLE_READ para consistência',
      'Redis Caching: Cache de segundo nível em queries frequentes com TTL configurável',
      'Connection Pooling: HikariCP otimizado (pool size, timeout) baseado em load testing'
    ]
  }
];
