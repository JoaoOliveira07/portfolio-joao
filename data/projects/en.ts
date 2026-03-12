import { Project } from './pt';

export const projects: Project[] = [
  {
    slug: 'iac-terraform-aws',
    title: 'IaC - AWS Infrastructure with Terraform',
    subtitle: 'Infrastructure as Code for reproducible provisioning',
    description: 'Implementation of Infrastructure as Code using Terraform to manage AWS resources in a versioned and automated way.',
    problem: 'Provision and version AWS infrastructure reproducibly, avoiding manual configurations and facilitating staging/production environments.',
    solution: 'Implementation of Infrastructure as Code using Terraform to manage AWS resources (Lambda, SQS, S3, IAM), with remote state and CI/CD pipelines.',
    techStack: ['Terraform', 'AWS Lambda', 'AWS SQS', 'AWS S3', 'AWS IAM', 'AWS CloudWatch', 'CI/CD'],
    highlights: [
      'Reusable Terraform modules for common components',
      'Lambda configuration (runtime, memory, timeout, environment)',
      'SQS queue creation and configuration (DLQ, retention, visibility)',
      'S3 bucket management with lifecycle policies',
      'IAM roles and policies following least privilege',
      'Remote state with versioning',
      'Automated deployment via CI/CD'
    ],
    role: 'Implementation of Terraform modules and infrastructure automation',
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
    challenges: [
      'Manage shared state between multiple developers without conflicts',
      'Implement IAM policies following least privilege principle',
      'Configure Dead Letter Queues and proper retry policies',
      'Automate entire deployment process while maintaining security'
    ],
    results: [
      '90% reduction in provisioning time for new environments',
      'Zero manual configurations in AWS Console',
      'Versioned and auditable infrastructure via Git',
      'Automated deploys with quick rollback on failure'
    ],
    technicalDecisions: [
      'Remote State with S3 + DynamoDB Lock: Shared state between developers with distributed locking to prevent conflicts',
      'Least Privilege IAM: Minimal necessary policies per resource, following principle of least privilege',
      'Dead Letter Queues: SQS DLQ with 14-day retention for debugging and reprocessing failed messages',
      'Reusable Modules: Parameterized Terraform components for Lambda, SQS, S3 ensuring consistency',
      'Lifecycle Policies: Automated data lifecycle in S3 (Standard → IA → Glacier) for cost optimization'
    ]
  },
  {
    slug: 'pipeline-event-driven',
    title: 'Event-Driven Data Pipeline',
    subtitle: 'Event-driven architecture with Outbox Pattern',
    description: 'Large-scale data extraction system using event-driven architecture with delivery guarantees.',
    problem: 'Process and extract large volumes of data reliably, ensuring no events are lost even in failure scenarios, and allowing reprocessing when needed.',
    solution: 'Implementation of event-driven architecture using Outbox Pattern for delivery guarantees, with asynchronous processing through Publisher/Consumer pattern and load balancing.',
    techStack: ['Java 17', 'Spring Boot', 'PostgreSQL', 'AWS SQS', 'Event-Driven Architecture', 'Hibernate'],
    highlights: [
      'Outbox Pattern implemented to ensure eventual consistency',
      'Event Relay for reliable event publishing',
      'Asynchronous Publisher/Consumer with retry policies',
      'BalanceLines for processing load distribution',
      'DataTypes and DataExtractor for data transformation',
      'Unit and integration tests covering failure scenarios',
      'Observability with structured logs and metrics'
    ],
    role: 'Solution architecture, pattern implementation and testing',
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
      'Ensure exactly-once delivery in distributed system',
      'Balance load between multiple consumers without duplication',
      'Implement retry policies that don\'t overload the system',
      'Maintain observability throughout the processing pipeline'
    ],
    results: [
      'Processing 10M+ events/day with zero data loss',
      '60% reduction in extraction time with smart balancing',
      'Automatic recovery in failure scenarios without manual intervention',
      'Complete event traceability from start to finish'
    ],
    technicalDecisions: [
      'Outbox Pattern: Exactly-once delivery guarantee by persisting events in same transaction before publishing',
      'Exponential Backoff: Retry policies with increasing time between attempts (2s → 4s → 8s → 16s) to avoid overload',
      'Idempotency Keys: Consumers process events multiple times without duplication using unique identifiers',
      'Circuit Breaker: Protection against cascading failures in downstream systems with automatic fallback',
      'Event Versioning: Schema evolution allowing compatibility between event versions'
    ]
  },
  {
    slug: 'arquitetura-integracao-hibrida',
    title: 'Hybrid Integration Architecture',
    subtitle: 'Cloud + On-Premise integration with resilience',
    description: 'Integration system between cloud-native solutions and legacy on-premise systems.',
    problem: 'Integrate legacy on-premise systems with new cloud-native solutions, ensuring bidirectional data synchronization, format transformation, and network failure resilience.',
    solution: 'Three-layer architecture: Orchestrator (coordination), Middleware (transformation), and On-Premise Client (local synchronization), with asynchronous communication and automatic retry.',
    techStack: ['Java 17', 'Spring Boot', 'AWS', 'REST APIs', 'Event-Driven', 'Circuit Breaker'],
    highlights: [
      'Orchestrator centralizing integration logic',
      'Middleware for data transformation and validation',
      'On-premise client with resilient synchronization',
      'Asynchronous communication pattern with dead letter queues',
      'Circuit breaker to prevent legacy system overload',
      'End-to-end monitoring with CloudWatch'
    ],
    role: 'End-to-end development and code reviews',
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
      'Handle network intermittency between cloud and on-premise',
      'Transform data between legacy and modern formats',
      'Implement circuit breaker without data loss',
      'Bidirectional synchronization without conflicts'
    ],
    results: [
      '99.9% integration availability',
      '80% reduction in network-related failures',
      'Synchronization time reduced from hours to minutes',
      'Zero data loss in network failure scenarios'
    ],
    technicalDecisions: [
      'Circuit Breaker Pattern: Prevents legacy system overload with configurable timeout and fallback',
      'Data Transformation Layer: Dedicated middleware to convert legacy formats to modern JSON',
      'Retry Queue: Separate queue for reprocessing failed messages without blocking main flow',
      'Proactive Health Check: Continuous connectivity monitoring before attempting communication',
      'Dual Write Strategy: Bidirectional sync with timestamp-based conflict resolution'
    ]
  },
  {
    slug: 'integradora-offline-online',
    title: 'Offline/Online Integrator',
    subtitle: 'Bidirectional sync with JSON generation',
    description: 'Synchronization system that allows offline operation with automatic sync when online.',
    problem: 'Allow application to work offline and sync data with online system when connected, generating optimized JSON files for frontend consumption.',
    solution: 'Bidirectional synchronization system that detects changes, resolves conflicts, and generates versioned JSON files for frontend local cache.',
    techStack: ['Java 17', 'Spring Boot', 'JSON', 'File System', 'Event-Driven'],
    highlights: [
      'Change detection (change data capture)',
      'Conflict resolution (conflict resolution strategies)',
      'Optimized JSON generation (compression, versioning)',
      'Incremental synchronization strategy',
      'Data versioning for frontend cache',
      'Tests ensuring integrity in failure scenarios'
    ],
    role: 'Development of synchronization logic and file generation',
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
      'Detect offline changes without server connection',
      'Resolve conflicts between offline and online data',
      'Generate optimized JSONs for mobile performance',
      'Versioning that allows safe rollback'
    ],
    results: [
      'App functional 100% of the time even without internet',
      'Incremental sync reduces traffic by 70%',
      'Conflicts automatically resolved in 95% of cases',
      'Versioned cache allows instant rollback'
    ],
    technicalDecisions: [
      'Change Data Capture: Offline modification tracking with delta calculation for incremental sync',
      'Conflict Resolution Strategy: Last-Write-Wins with timestamp + manual resolution for critical cases',
      'JSON Compression: Gzip compression on payloads reducing size by 60-70%',
      'Versioned Cache: Each sync generates new version allowing rollback without data loss',
      'Optimistic Locking: Version field in entities prevents accidental overwrites'
    ]
  },
  {
    slug: 'sistema-cadastro-ocr',
    title: 'OCR Automation System',
    subtitle: 'Serverless pipeline for document extraction',
    description: 'Automated registration system with document data extraction via OCR.',
    problem: 'Automate customer registration through document data extraction (Driver License, ID), reducing manual processing time and typing errors.',
    solution: 'Serverless pipeline using AWS Lambda to process images stored in S3, extract information via OCR, and sync with on-premise system asynchronously.',
    techStack: ['AWS S3', 'AWS Lambda', 'Java 17', 'Spring Boot', 'Event-Driven', 'OCR'],
    highlights: [
      'Image upload to S3 with automatic trigger',
      'Lambda for document processing',
      'Structured data extraction via OCR',
      'Asynchronous synchronization with on-premise client',
      'Retry policy to ensure delivery',
      'Logs and metrics in CloudWatch'
    ],
    role: 'Development of S3 → Lambda → API → On-Premise integration',
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
    challenges: [
      'Ensure OCR extraction quality on varied documents',
      'Process images serverless with optimized cost',
      'Validate extracted data before persisting',
      'Sync with on-premise system resiliently'
    ],
    results: [
      '90% reduction in manual registration time',
      '95% accuracy in data extraction',
      'Fully serverless processing with 70% lower cost',
      'Zero lost registrations with automatic retry'
    ],
    technicalDecisions: [
      'S3 Event Trigger: Lambda automatically invoked on upload eliminating polling',
      'Image Preprocessing: Resize and normalization before OCR increasing accuracy by 15%',
      'Validation Pipeline: Multiple validation layers (format, checksum, business rules)',
      'Async Processing: SQS between Lambda and API decoupling processing from persistence',
      'Cost Optimization: Lambda configured with minimal memory/timeout based on profiling'
    ]
  },
  {
    slug: 'sistema-rca-monolito',
    title: 'RCA System - Modular Monolith',
    subtitle: 'Integrated sales app, e-commerce and backoffice',
    description: 'Modular monolithic system integrating external sales (RCA), B2B e-commerce, and backoffice operations.',
    problem: 'Need for a unified system to manage external sales (RCA), B2B e-commerce, and backoffice operations, ensuring data consistency and performance under high load.',
    solution: 'Modular monolithic architecture using Spring Boot with clear context separation (Bounded Contexts), applying Domain-Driven Design principles to maintain cohesion and low coupling between modules.',
    techStack: ['Java 17', 'Spring Boot', 'Hibernate', 'PostgreSQL', 'Docker', 'DDD'],
    highlights: [
      'Modularization with Bounded Contexts for domain separation',
      'Complex transaction management with Spring @Transactional',
      'Query optimization with Hibernate for high-load scenarios',
      'Integration tests ensuring end-to-end behavior',
      'Code reviews and pair programming to maintain code quality'
    ],
    role: 'Development of critical features, code reviews, and performance optimizations',
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
      'Maintain clear modularization in growing monolith',
      'Optimize N+1 queries in complex relationships',
      'Manage distributed transactions between contexts',
      'Scale monolithic system for high load'
    ],
    results: [
      'System supporting 10K+ concurrent users',
      '70% reduction in queries through optimizations',
      'Well-defined modules facilitate maintenance',
      'Average response time < 200ms in 95% of requests'
    ],
    technicalDecisions: [
      'Bounded Contexts: Clear domain separation (Sales, Products, Orders) following DDD',
      'N+1 Query Elimination: Use of JOIN FETCH and EntityGraph avoiding lazy loading problems',
      'Transaction Management: @Transactional with REPEATABLE_READ isolation for consistency',
      'Redis Caching: Second-level cache on frequent queries with configurable TTL',
      'Connection Pooling: HikariCP optimized (pool size, timeout) based on load testing'
    ]
  }
];

export type { Project };
