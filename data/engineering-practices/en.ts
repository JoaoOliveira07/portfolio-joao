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
    id: 'tdd',
    icon: 'FlaskConical',
    title: 'Test-Driven Development (TDD)',
    shortDescription: 'Unit and integration tests as part of the development process, not just validation',
    longDescription: 'Test-Driven Development is my standard approach to development. I write tests before production code, ensuring every feature has coverage from the start. This not only validates behavior but also drives code design to be testable and decoupled.',
    howIApply: [
      'Red-Green-Refactor: write failing test → implement minimum necessary → refactor',
      'Integration tests with Testcontainers for PostgreSQL, Redis, and messaging',
      'Mocks with Mockito only when necessary, prefer integration tests whenever possible',
      'Test coverage focused on critical scenarios and edge cases, not just numbers',
      'Tests as living documentation of expected system behavior'
    ],
    relatedProjects: ['pipeline-event-driven', 'sistema-rca-monolito']
  },
  {
    id: 'clean-architecture',
    icon: 'Layers',
    title: 'Clean Architecture',
    shortDescription: 'Clear separation of responsibilities in layers, keeping business rules isolated from frameworks',
    longDescription: 'I apply Clean Architecture principles to keep code organized, testable, and framework-independent. Business logic stays at the core, while infrastructure details (database, external APIs) stay at the edges.',
    howIApply: [
      'Layer separation: Domain (entities, use cases) → Application (services) → Infrastructure (repositories, APIs)',
      'Dependency Inversion: inner modules don\'t depend on external details',
      'Explicit Use Cases representing business actions',
      'Rich Entities with encapsulated business rules',
      'Adapters to isolate communication with external systems'
    ],
    relatedProjects: ['sistema-rca-monolito', 'arquitetura-integracao-hibrida']
  },
  {
    id: 'solid',
    icon: 'Box',
    title: 'SOLID Principles',
    shortDescription: 'Fundamental principles for cohesive, decoupled, and maintainable code',
    longDescription: 'SOLID isn\'t just theory, I apply it daily to make design decisions. Single Responsibility keeps classes focused, Open/Closed facilitates extension, Liskov ensures substitutability, Interface Segregation avoids unnecessary dependencies, and Dependency Inversion enables testability.',
    howIApply: [
      'Single Responsibility: each class has a single reason to change',
      'Open/Closed: extensible via inheritance/composition without modifying existing code',
      'Liskov Substitution: subtypes can replace base types without breaking behavior',
      'Interface Segregation: specific interfaces instead of fat interfaces',
      'Dependency Inversion: depend on abstractions, not concrete implementations'
    ],
    relatedProjects: ['pipeline-event-driven', 'sistema-rca-monolito']
  },
  {
    id: 'event-driven',
    icon: 'Workflow',
    title: 'Event-Driven Architecture',
    shortDescription: 'Decoupled systems that react to events, enabling scalability and resilience',
    longDescription: 'Event-driven architecture is my specialty. I develop systems that communicate via asynchronous events, enabling temporal and spatial decoupling. I implement patterns like Outbox, Event Sourcing, and CQRS when appropriate.',
    howIApply: [
      'Outbox Pattern to guarantee exactly-once delivery in distributed transactions',
      'Event Relay for reliable event publishing',
      'Idempotency in consumers using unique identifiers',
      'Dead Letter Queues for failure handling',
      'Event versioning for schema evolution without breaking changes'
    ],
    relatedProjects: ['pipeline-event-driven', 'arquitetura-integracao-hibrida', 'sistema-cadastro-ocr']
  },
  {
    id: 'ddd',
    icon: 'Database',
    title: 'Domain-Driven Design (DDD)',
    shortDescription: 'Software modeling focused on business domain and ubiquitous language',
    longDescription: 'Domain-Driven Design guides how I model complex systems. I work closely with business to understand the domain, create ubiquitous language, and divide the system into well-defined Bounded Contexts.',
    howIApply: [
      'Bounded Contexts to separate domains (Sales, Products, Orders, Customers)',
      'Entities and Value Objects with rich behavior, not just data holders',
      'Aggregates to ensure transaction consistency',
      'Domain Events for communication between contexts',
      'Ubiquitous language shared between dev and business'
    ],
    relatedProjects: ['sistema-rca-monolito']
  },
  {
    id: 'observability',
    icon: 'Eye',
    title: 'Observability',
    shortDescription: 'Structured logs, metrics, and tracing to understand system behavior in production',
    longDescription: 'Observability isn\'t optional, it\'s part of development. I implement structured logs, custom metrics, and distributed tracing from the start, enabling quick debugging and deep understanding of the system in production.',
    howIApply: [
      'Structured logs in JSON with correlation IDs for tracing',
      'Custom metrics (Prometheus) to monitor business KPIs',
      'Distributed Tracing (OpenTelemetry) in event-driven systems',
      'Dashboards in Grafana for real-time visualization',
      'Proactive alerts based on SLOs, not just symptoms'
    ],
    relatedProjects: ['pipeline-event-driven', 'iac-terraform-aws']
  },
  {
    id: 'cicd',
    icon: 'GitBranch',
    title: 'CI/CD',
    shortDescription: 'Continuous integration and deployment for fast and reliable deliveries',
    longDescription: 'CI/CD isn\'t just automation, it\'s a culture of continuous delivery. Automated pipelines execute tests, code analysis, and deploy to multiple environments, ensuring functional code quickly reaches production.',
    howIApply: [
      'Automated pipelines: build → test → security scan → deploy',
      'Tests executed on all branches before merge',
      'Automated deployment to staging after merge to main',
      'Automatic rollback on health check failures',
      'Infrastructure as Code versioned and applied via pipeline'
    ],
    relatedProjects: ['iac-terraform-aws']
  },
  {
    id: 'code-review',
    icon: 'GitPullRequest',
    title: 'Code Review',
    shortDescription: 'Collaborative code review to maintain quality and share knowledge',
    longDescription: 'Code review is a moment of mutual learning and quality assurance. I review code focusing on design, readability, tests, and potential bugs. I also receive feedback that makes me a better developer.',
    howIApply: [
      'Reviews focused on: design, readability, tests, edge cases, and security',
      'Constructive feedback with suggestions, not just criticism',
      'Pair programming on complex features before review',
      'Quality checklist: tests passing, no code smells, updated documentation',
      'Knowledge sharing about patterns and practices'
    ],
    relatedProjects: ['sistema-rca-monolito', 'arquitetura-integracao-hibrida']
  },
  {
    id: 'ai-assisted',
    icon: 'Sparkles',
    title: 'AI-Assisted Development',
    shortDescription: 'Strategic use of AI to accelerate development, code reviews, and documentation',
    longDescription: 'I use AI as a development partner to increase productivity and quality. OpenCode with custom agents plans implementations, GitHub Copilot assists with code reviews, and Cloud Copilot implements complex features while maintaining architecture and best practices.',
    howIApply: [
      'Planning with AI: analyze requirements and create implementation plan before coding',
      'OpenCode configured with agents that respect project architecture and standards',
      'GitHub Copilot for automated code reviews and improvement suggestions',
      'Cloud Copilot to implement complete features with system context',
      'Automated documentation and code description with AI',
      'Accelerated development cycle while maintaining code quality'
    ],
    relatedProjects: ['pipeline-event-driven', 'iac-terraform-aws']
  }
];
