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
    complexity: 5
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
    complexity: 5
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
    complexity: 4
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
    complexity: 4
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
    complexity: 3
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
    complexity: 3
  }
];

export type { Project };
