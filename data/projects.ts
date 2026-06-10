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
  category: 'iac' | 'event-driven' | 'integration' | 'sync' | 'automation' | 'monolith' | 'frontend' | 'mobile' | 'admin';
  year: number;
  complexity: 5 | 4 | 3;
  type: 'professional' | 'personal';
  diagram?: string;
  challenges?: { pt: string[]; en: string[] };
  results?: { pt: string[]; en: string[] };
  technicalDecisions?: { pt: string[]; en: string[] };
}

export const projects: Project[] = [
  {
    slug: 'segalas-ecommerce',
    title: {
      pt: 'E-commerce — Backend Monolítico',
      en: 'E-commerce — Monolithic Backend'
    },
    subtitle: {
      pt: 'Monolito Spring Boot multi-tenant que alimenta register_flow, backoffice, ecommerce-front e field-sales app',
      en: 'Multi-tenant Spring Boot monolith powering register_flow, backoffice, ecommerce-front and field-sales app'
    },
    description: {
      pt: 'Backend central do ecossistema B2B. API REST que serve o app de onboarding (register_flow), painel admin (backoffice), SPA web B2B (ecommerce-front) e app de força de vendas. Layered + DDD, multi-tenant por parceiro, com event streaming via Kinesis.',
      en: 'Central backend of the B2B ecosystem. REST API powering the onboarding app (register_flow), admin panel (backoffice), B2B web SPA (ecommerce-front) and field-sales app. Layered + DDD, partner-based multi-tenant, with event streaming via Kinesis.'
    },
    problem: {
      pt: 'Unificar onboarding, pedidos B2B web/mobile e admin sob um único backend multi-tenant, sincronizando com ERP Oracle Winthor legado e mantendo consistência sob alta carga.',
      en: 'Unify onboarding, B2B web/mobile orders and admin under one multi-tenant backend, syncing with legacy Oracle Winthor ERP and keeping consistency under heavy load.'
    },
    solution: {
      pt: 'Spring Boot 3 com Maven multi-módulo (core + application + report-aggregate), QueryDSL para queries tipadas, Redis + Caffeine para cache, ShedLock para jobs distribuídos, JWT + WebAuthn4j (Passkeys) para auth, Liquibase para migrations, Kinesis para event streaming e Bedrock para IA.',
      en: 'Spring Boot 3 with multi-module Maven (core + application + report-aggregate), QueryDSL for typed queries, Redis + Caffeine cache, ShedLock for distributed jobs, JWT + WebAuthn4j (Passkeys) auth, Liquibase migrations, Kinesis event streaming and Bedrock for AI.'
    },
    techStack: ['Java 17', 'Spring Boot 3', 'PostgreSQL', 'Redis', 'AWS SQS/SNS/S3', 'Kinesis', 'Bedrock', 'Liquibase', 'New Relic'],
    highlights: {
      pt: [
        'Layered + DDD com domínios: Auth, Purchase, Platform, Coupon, Delivery, Financial, Job, Backoffice',
        'Multi-tenant por parceiro com isolamento de dados',
        'Auth completa: JWT (JJWT), OAuth e Passkeys (WebAuthn4j)',
        'Cache em duas camadas: Redis (distribuído) + Caffeine (local)',
        'Jobs distribuídos com ShedLock para evitar execução duplicada',
        'Event streaming via Kinesis para integração assíncrona',
        'Liquibase para migrations versionadas e rollback seguro',
        'Cobertura JaCoCo + SonarQube e docs SpringDoc OpenAPI'
      ],
      en: [
        'Layered + DDD with domains: Auth, Purchase, Platform, Coupon, Delivery, Financial, Job, Backoffice',
        'Partner-based multi-tenant with data isolation',
        'Full auth: JWT (JJWT), OAuth and Passkeys (WebAuthn4j)',
        'Two-layer cache: Redis (distributed) + Caffeine (local)',
        'Distributed jobs with ShedLock to avoid duplicate execution',
        'Event streaming via Kinesis for async integration',
        'Liquibase for versioned migrations and safe rollback',
        'JaCoCo + SonarQube coverage and SpringDoc OpenAPI docs'
      ]
    },
    role: {
      pt: '2º contributor de 25+ devs · 1.235 commits — contribuição contínua em features de backend, code reviews e otimizações',
      en: '#2 contributor of 25+ devs · 1,235 commits — continuous contribution to backend features, code reviews and optimizations'
    },
    category: 'monolith',
    year: 2026,
    complexity: 5,
    type: 'professional',
    diagram: `graph TB
    RF[register_flow<br/>Flutter onboarding] --> API[Spring Boot API<br/>Layered + DDD]
    BO[backoffice<br/>Next.js admin] --> API
    EF[ecommerce-front<br/>SPA B2B] --> API
    SM[Field Sales App<br/>Flutter offline] --> API

    API --> Auth[Auth<br/>JWT + Passkey]
    API --> Purchase[Purchase]
    API --> Platform[Platform]
    API --> Financial[Financial<br/>PIX]
    API --> Job[Jobs<br/>ShedLock]

    Auth --> DB[(PostgreSQL)]
    Purchase --> DB
    Platform --> DB

    API --> Cache[(Redis + Caffeine)]
    API -->|stream| Kinesis[AWS Kinesis]
    API -->|async| SQS[AWS SQS]
    SQS <--> Integ[Integration Platform]

    style API fill:#01926D
    style Kinesis fill:#A855F7
    style DB fill:#01926D`,
    challenges: {
      pt: [
        'Manter isolamento multi-tenant sem duplicar lógica de domínio',
        'Compor auth com JWT clássico, OAuth e Passkeys sob mesma API',
        'Coordenar jobs distribuídos sem corrida em múltiplas instâncias',
        'Migrar gradualmente domínios para event streaming sem quebrar contratos REST'
      ],
      en: [
        'Keep multi-tenant isolation without duplicating domain logic',
        'Compose auth with classic JWT, OAuth and Passkeys under the same API',
        'Coordinate distributed jobs without races across multiple instances',
        'Gradually migrate domains to event streaming without breaking REST contracts'
      ]
    },
    results: {
      pt: [
        'Plataforma única servindo 4 clients distintos (web/mobile/admin/onboarding)',
        'Auth moderna com Passkeys reduzindo fricção de login',
        'Cache em camadas baixou latência de leituras de catálogo',
        'Kinesis abriu caminho para event-driven sem reescrita do core'
      ],
      en: [
        'Single platform serving 4 distinct clients (web/mobile/admin/onboarding)',
        'Modern Passkey auth reduced login friction',
        'Layered cache lowered catalog read latency',
        'Kinesis paved the way for event-driven flows without rewriting the core'
      ]
    },
    technicalDecisions: {
      pt: [
        'Monolito modular com Maven multi-módulo: deploy único, separação por bounded contexts',
        'Redis + Caffeine: cache distribuído para coerência + local para latência mínima',
        'ShedLock sobre Quartz: lock distribuído via JDBC sem overhead operacional extra',
        'Passkeys via WebAuthn4j: auth sem senha em paralelo ao JWT legado',
        'Kinesis sobre Kafka gerenciado: integra nativo com AWS, sem cluster próprio'
      ],
      en: [
        'Modular monolith with multi-module Maven: single deploy, bounded-context separation',
        'Redis + Caffeine: distributed cache for coherence + local for minimal latency',
        'ShedLock over Quartz: JDBC-based distributed lock without extra operational overhead',
        'Passkeys via WebAuthn4j: passwordless auth alongside legacy JWT',
        'Kinesis over managed Kafka: native AWS integration, no self-managed cluster'
      ]
    }
  },
  {
    slug: 'ecommerce-front',
    title: {
      pt: 'E-commerce Front — SPA B2B Multi-Tenant',
      en: 'E-commerce Front — Multi-Tenant B2B SPA'
    },
    subtitle: {
      pt: 'React 18 + Vite white-label para clientes e representantes',
      en: 'White-label React 18 + Vite for customers and reps'
    },
    description: {
      pt: 'SPA B2B para clientes e representantes fazerem pedidos. Multi-tenant white-label por parceiro via header `handlerpartner`. Browse de produtos, carrinho, checkout, histórico, datas de entrega, planos de pagamento, recomendações e setor customizado.',
      en: 'B2B SPA for customers and reps to place orders. Multi-tenant white-label per partner via the `handlerpartner` header. Product browse, cart, checkout, history, delivery dates, payment plans, recommendations and custom sectoring.'
    },
    problem: {
      pt: 'Atender múltiplos parceiros com identidade visual e regras de negócio próprias sem duplicar codebase, mantendo PWA com cache offline e analytics granular por parceiro.',
      en: 'Serve multiple partners with their own branding and business rules without duplicating the codebase, while keeping PWA offline cache and granular per-partner analytics.'
    },
    solution: {
      pt: 'React 18 + Vite 5 com Redux Toolkit + Context, Axios com wrapper customizado de retry, Material-UI v7 + Ant Design v5 estilizados via Styled Components + Emotion, Framer Motion + React Spring, PWA com Workbox, manual chunking no Vite (react/antd/data/animations/vendor), cache busting via git SHA. Multi-tenant através do header `handlerpartner`. Analytics: Datadog RUM, Google Analytics e Facebook Pixel. Testes: Vitest + Playwright + MSW (96+ arquivos).',
      en: 'React 18 + Vite 5 with Redux Toolkit + Context, Axios with custom retry wrapper, Material-UI v7 + Ant Design v5 styled via Styled Components + Emotion, Framer Motion + React Spring, PWA with Workbox, manual Vite chunking (react/antd/data/animations/vendor), git-SHA cache busting. Multi-tenant via the `handlerpartner` header. Analytics: Datadog RUM, Google Analytics and Facebook Pixel. Tests: Vitest + Playwright + MSW (96+ files).'
    },
    techStack: ['TypeScript', 'React 18', 'Vite 5', 'Redux Toolkit', 'Material-UI v7', 'Ant Design v5', 'Styled Components', 'Workbox PWA', 'Datadog RUM', 'Vitest', 'Playwright', 'MSW'],
    highlights: {
      pt: [
        'Arquitetura Container/Presentational com lógica isolada dos componentes visuais',
        'Multi-tenant white-label via header `handlerpartner` sem build separado',
        'PWA com Workbox: cache offline e instalação como app',
        'Wrapper Axios customizado com retry exponencial',
        'Manual chunking no Vite (react, antd, data, animations, vendor) para LCP otimizado',
        'Cache busting via git SHA garante usuários sempre na última versão',
        'Stack de animação dupla: Framer Motion + React Spring',
        'Analytics granular: Datadog RUM, Google Analytics, Facebook Pixel',
        '96+ arquivos de teste com Vitest + Playwright + MSW'
      ],
      en: [
        'Container/Presentational architecture isolating logic from visual components',
        'White-label multi-tenant via the `handlerpartner` header — no separate builds',
        'PWA with Workbox: offline cache and installable as app',
        'Custom Axios wrapper with exponential retry',
        'Manual Vite chunking (react, antd, data, animations, vendor) for optimized LCP',
        'Git-SHA cache busting ensures users always run the latest version',
        'Dual animation stack: Framer Motion + React Spring',
        'Granular analytics: Datadog RUM, Google Analytics, Facebook Pixel',
        '96+ test files with Vitest + Playwright + MSW'
      ]
    },
    role: {
      pt: 'Contribuição contínua em features de catálogo, carrinho, checkout e otimização de bundle/LCP',
      en: 'Continuous contribution to catalog, cart, checkout and bundle/LCP optimization'
    },
    category: 'frontend',
    year: 2026,
    complexity: 4,
    type: 'professional',
    diagram: `graph TB
    Browser[Cliente / Representante<br/>Browser PWA] --> SPA[React 18 + Vite 5<br/>handlerpartner header]

    SPA --> Redux[Redux Toolkit + Context]
    SPA --> UI[MUI v7 + Ant Design v5]
    SPA --> Anim[Framer Motion + React Spring]

    SPA -->|Axios + retry| API[E-commerce API]

    SPA --> SW[Service Worker<br/>Workbox]
    SW --> Cache[(PWA Cache)]

    SPA --> Tel[Datadog RUM]
    SPA --> GA[Google Analytics]
    SPA --> FB[Facebook Pixel]

    style SPA fill:#01926D
    style API fill:#01926D
    style SW fill:#A855F7`,
    challenges: {
      pt: [
        'Manter performance com bundles MUI v7 + Ant Design v5 simultâneos',
        'Sincronizar service worker para não servir versão antiga após deploy',
        'Aplicar branding white-label sem fork de telas por parceiro',
        'Cobrir fluxo de checkout com Playwright E2E sem flakiness'
      ],
      en: [
        'Keep performance with simultaneous MUI v7 + Ant Design v5 bundles',
        'Sync service worker so old versions are not served after deploy',
        'Apply white-label branding without per-partner screen forks',
        'Cover the checkout flow with non-flaky Playwright E2E'
      ]
    },
    results: {
      pt: [
        'SPA única atendendo múltiplos parceiros com branding próprio',
        'PWA permite uso em rotas com conectividade intermitente',
        'Manual chunking baixou bundle inicial sem perder DX',
        '96+ testes garantem regressão controlada em catálogo e checkout'
      ],
      en: [
        'Single SPA serving multiple partners with their own branding',
        'PWA enables use on routes with intermittent connectivity',
        'Manual chunking lowered initial bundle without sacrificing DX',
        '96+ tests keep regressions controlled across catalog and checkout'
      ]
    },
    technicalDecisions: {
      pt: [
        'Multi-tenant via header `handlerpartner`: zero forks de build por parceiro',
        'Vite 5 sobre CRA legado: build/HMR ordem de magnitude mais rápidos',
        'Manual chunking explícito: previne vendor megabundle típico de SPAs',
        'PWA com Workbox: cache offline sem reescrita do código de fetch',
        'Axios wrapper customizado: retry, cache e branding centralizados',
        'Vitest sobre Jest: nativo Vite, sem dupla config'
      ],
      en: [
        'Multi-tenant via `handlerpartner` header: zero per-partner build forks',
        'Vite 5 over legacy CRA: order-of-magnitude faster build/HMR',
        'Explicit manual chunking: prevents the typical vendor mega-bundle',
        'PWA with Workbox: offline cache without rewriting fetch code',
        'Custom Axios wrapper: retry, cache and branding centralized',
        'Vitest over Jest: native Vite, no double config'
      ]
    }
  },
  {
    slug: 'salesforce-mobile',
    title: {
      pt: 'Field Sales Mobile — App Offline-First',
      en: 'Field Sales Mobile — Offline-First App'
    },
    subtitle: {
      pt: 'Flutter multi-plataforma para força de vendas com Drift (SQLite) e sync em background',
      en: 'Cross-platform Flutter sales-force app with Drift (SQLite) and background sync'
    },
    description: {
      pt: 'App multi-plataforma (Android, iOS, macOS, Windows, Linux, Web) para representantes de vendas. Gestão de clientes, pedidos, tracking de entregas e sync offline. Clean Architecture em 3 camadas (domain / infra / presentation) com 2 datasources Dio (ecommerce + integrator).',
      en: 'Cross-platform app (Android, iOS, macOS, Windows, Linux, Web) for sales reps. Customer management, orders, delivery tracking and offline sync. Clean Architecture in 3 layers (domain / infra / presentation) with 2 Dio datasources (ecommerce + integrator).'
    },
    problem: {
      pt: 'Representantes em campo precisam operar sem internet (lojas em áreas com sinal fraco) e sincronizar pedidos, clientes e catálogo quando reconectam — sem perda de dados e respeitando bateria.',
      en: 'Field reps need to operate without internet (stores in low-signal areas) and sync orders, customers and catalog when reconnected — without data loss and respecting battery.'
    },
    solution: {
      pt: 'Clean Architecture em Flutter com BLoC/Cubit (preferido) + MobX (legado), Drift como ORM SQLite local, workmanager para sync engine em background, Dio com 2 clientes (ecommerce + integrator), GoRouter com shell routes (Home, Customers, Orders, Settings), Sentry + Datadog RUM e LaunchDarkly para feature flags.',
      en: 'Clean Architecture in Flutter with BLoC/Cubit (preferred) + MobX (legacy), Drift as local SQLite ORM, workmanager for background sync engine, Dio with 2 clients (ecommerce + integrator), GoRouter with shell routes (Home, Customers, Orders, Settings), Sentry + Datadog RUM and LaunchDarkly feature flags.'
    },
    techStack: ['Flutter', 'Dart 3', 'BLoC/Cubit', 'Drift (SQLite)', 'workmanager', 'Dio', 'GoRouter', 'Sentry', 'Datadog RUM', 'LaunchDarkly', 'Firebase Messaging'],
    highlights: {
      pt: [
        'Clean Architecture em 3 camadas: domain / infra / presentation',
        '2 datasources Dio independentes: ecommerce + offline-integrator',
        'Drift (SQLite ORM) com migrations versionadas',
        'Sync engine offline em background via workmanager',
        'GoRouter com shell routes em 4 tabs (Home, Customers, Orders, Settings)',
        'Push notifications via Firebase Messaging (Android only)',
        'Observabilidade dupla: Sentry (crashes) + Datadog RUM (performance)',
        'Feature flags via LaunchDarkly para rollout controlado',
        'Syncfusion Charts e flutter_map para visualizações de dados e rotas'
      ],
      en: [
        '3-layer Clean Architecture: domain / infra / presentation',
        '2 independent Dio datasources: ecommerce + offline-integrator',
        'Drift (SQLite ORM) with versioned migrations',
        'Background offline sync engine via workmanager',
        'GoRouter with shell routes in 4 tabs (Home, Customers, Orders, Settings)',
        'Push notifications via Firebase Messaging (Android only)',
        'Dual observability: Sentry (crashes) + Datadog RUM (performance)',
        'Feature flags via LaunchDarkly for controlled rollout',
        'Syncfusion Charts and flutter_map for data and route visualizations'
      ]
    },
    role: {
      pt: 'Contribuição contínua em features offline-first, schema Drift, sync engine e migração MobX → BLoC',
      en: 'Continuous contribution to offline-first features, Drift schema, sync engine and MobX → BLoC migration'
    },
    category: 'mobile',
    year: 2026,
    complexity: 5,
    type: 'professional',
    diagram: `graph TB
    UI[Presentation<br/>Cubits + Screens] --> Domain[Domain<br/>UseCases + Entities]
    Domain --> Infra[Infra<br/>Repository Impl]

    Infra --> Local[(Drift / SQLite)]
    Infra --> Dio1[Dio Client<br/>ecommerce]
    Infra --> Dio2[Dio Client<br/>offline-integrator]

    Sync[Sync Engine] --> Local
    Sync --> Dio2
    WM[workmanager] -->|background| Sync

    UI --> Router[GoRouter shell<br/>Home / Customers / Orders / Settings]

    Sentry[Sentry] -.-> UI
    DDog[Datadog RUM] -.-> UI
    LD[LaunchDarkly] -.->|flags| UI

    style Sync fill:#01926D
    style Local fill:#A855F7
    style WM fill:#01926D`,
    challenges: {
      pt: [
        'Versionar schema Drift sem corromper dados de reps em produção',
        'Resolver conflitos quando rep cria pedido offline e dado servidor mudou',
        'Limitar uso de bateria e dados na sincronização em background',
        'Migrar gradualmente de MobX para BLoC sem regressão de features'
      ],
      en: [
        'Version Drift schema without corrupting prod rep data',
        'Resolve conflicts when a rep places an offline order while server data has changed',
        'Cap battery and data usage during background sync',
        'Gradually migrate from MobX to BLoC without feature regression'
      ]
    },
    results: {
      pt: [
        'App funcional 100% offline com sync automático ao reconectar',
        'Multi-plataforma (Android, iOS, macOS, Windows, Linux, Web) a partir de um único codebase',
        'Sentry + Datadog dão visibilidade total de crashes e performance em campo',
        'LaunchDarkly permite rollout gradual de features novas'
      ],
      en: [
        '100% offline app with automatic sync on reconnect',
        'Cross-platform (Android, iOS, macOS, Windows, Linux, Web) from a single codebase',
        'Sentry + Datadog give full visibility into crashes and field performance',
        'LaunchDarkly enables gradual rollout of new features'
      ]
    },
    technicalDecisions: {
      pt: [
        'Clean Architecture rígida: testabilidade e troca de implementação por camada',
        'Drift sobre Hive/Isar: SQL tipado + migrations explícitas pesam mais que NoSQL',
        'BLoC/Cubit como padrão: estado previsível integra bem com sync assíncrono',
        '2 Dio clients separados: ecommerce vs offline-integrator têm contratos distintos',
        'workmanager: sync sobrevive a app kill e respeita políticas de bateria do SO'
      ],
      en: [
        'Strict Clean Architecture: testability and per-layer implementation swap',
        'Drift over Hive/Isar: typed SQL + explicit migrations win over NoSQL',
        'BLoC/Cubit as standard: predictable state integrates well with async sync',
        '2 separate Dio clients: ecommerce vs offline-integrator have distinct contracts',
        'workmanager: sync survives app kill and respects OS battery policies'
      ]
    }
  },
  {
    slug: 'backoffice',
    title: {
      pt: 'Backoffice — Painel Admin com Chat IA',
      en: 'Backoffice — Admin Panel with AI Chat'
    },
    subtitle: {
      pt: 'Next.js 16 + React 19 com Server Components, shadcn/ui e Vercel AI SDK',
      en: 'Next.js 16 + React 19 with Server Components, shadcn/ui and Vercel AI SDK'
    },
    description: {
      pt: 'Painel admin moderno que substitui o backoffice legado (CRA + Ant Design). Gestão de integrações, clientes, pedidos, PIX, banners e relatórios, com chat IA usando AWS Bedrock e OpenRouter via Vercel AI SDK.',
      en: 'Modern admin panel replacing the legacy backoffice (CRA + Ant Design). Manages integrations, customers, orders, PIX, banners and reports, with AI chat using AWS Bedrock and OpenRouter via the Vercel AI SDK.'
    },
    problem: {
      pt: 'O backoffice legado em CRA + Ant Design tinha bundle pesado, build lento e dificuldade para ganhar features modernas como IA, audit logs e modo offline para uso em armazém.',
      en: 'Legacy backoffice on CRA + Ant Design had heavy bundle, slow builds and trouble adopting modern features like AI, audit logs and offline mode for warehouse use.'
    },
    solution: {
      pt: 'Next.js 16 App Router com React 19, Turbopack e Bun. shadcn/ui (Radix) para UI, TanStack Query v5 para data fetching, TanStack Table v8 para tabelas, React Hook Form + Zod para forms, Recharts para gráficos, Monaco Editor para edição de configs, MVVM com lógica em hooks e API Routes como BFF.',
      en: 'Next.js 16 App Router with React 19, Turbopack and Bun. shadcn/ui (Radix) for UI, TanStack Query v5 for data fetching, TanStack Table v8 for tables, React Hook Form + Zod for forms, Recharts for charts, Monaco Editor for config editing, MVVM with hook-based logic and API Routes as BFF.'
    },
    techStack: ['Next.js 16', 'React 19', 'TypeScript', 'Bun', 'Turbopack', 'Tailwind v4', 'shadcn/ui', 'TanStack Query', 'TanStack Table', 'React Hook Form', 'Zod', 'Vercel AI SDK', 'AWS Bedrock', 'Recharts', 'Monaco Editor', 'Vitest', 'MSW'],
    highlights: {
      pt: [
        'Arquitetura MVVM com lógica em hooks e Server Components onde possível',
        'API Routes como BFF entre frontend e backend Spring',
        'Chat IA com Vercel AI SDK + AWS Bedrock + OpenRouter como fallback',
        'TanStack Query v5 + TanStack Table v8 para listagens com filtros e paginação server-side',
        'Forms tipados ponta-a-ponta com React Hook Form + Zod',
        'Monaco Editor embarcado para edição de scripts/configs',
        'Offline mode em features críticas usando service worker',
        'Audit logs nativos para rastreabilidade administrativa',
        'Vitest + MSW para testes com mocks de rede determinísticos'
      ],
      en: [
        'MVVM architecture with hook-based logic and Server Components where possible',
        'API Routes as BFF between frontend and the Spring backend',
        'AI chat with Vercel AI SDK + AWS Bedrock + OpenRouter as fallback',
        'TanStack Query v5 + TanStack Table v8 for server-side filtered/paginated lists',
        'End-to-end typed forms with React Hook Form + Zod',
        'Embedded Monaco Editor for script/config editing',
        'Offline mode on critical features via service worker',
        'Native audit logs for administrative traceability',
        'Vitest + MSW for tests with deterministic network mocks'
      ]
    },
    role: {
      pt: 'Contribuição contínua em features de gestão, chat IA, audit logs e migração desde o backoffice legado',
      en: 'Continuous contribution to admin features, AI chat, audit logs and migration from the legacy backoffice'
    },
    category: 'admin',
    year: 2026,
    complexity: 4,
    type: 'professional',
    diagram: `graph TB
    Browser[Admin Browser] --> Next[Next.js 16<br/>App Router · React 19]
    Next --> SC[Server Components]
    Next --> API[API Routes<br/>BFF]

    SC --> Tan[TanStack Query]
    Tan --> API
    API --> Spring[Spring Boot API<br/>ecommerce]

    Next --> Chat[Chat IA<br/>Vercel AI SDK]
    Chat --> Bedrock[AWS Bedrock]
    Chat --> OR[OpenRouter]

    Next --> SW[Service Worker<br/>Offline mode]
    Next --> Mon[Monaco Editor]

    style Next fill:#01926D
    style Chat fill:#A855F7
    style Spring fill:#01926D`,
    challenges: {
      pt: [
        'Migrar features do CRA legado sem regressão para usuários internos',
        'Fazer streaming de respostas do Bedrock com fallback para OpenRouter',
        'Garantir que offline mode não cause divergência com backend ao reconectar',
        'Validar forms complexos (Zod) sem virar boilerplate ilegível'
      ],
      en: [
        'Migrate features from the legacy CRA without regression for internal users',
        'Stream Bedrock responses with fallback to OpenRouter',
        'Make sure offline mode does not diverge from backend on reconnect',
        'Validate complex forms (Zod) without becoming unreadable boilerplate'
      ]
    },
    results: {
      pt: [
        'Bundle e build dramaticamente menores que o backoffice legado',
        'Chat IA integrado ao fluxo admin diário (consultas de pedidos, PIX, relatórios)',
        'Audit logs estruturados para investigação rápida',
        'Equipe interna ganhou modo offline em features de armazém'
      ],
      en: [
        'Bundle and build dramatically smaller than the legacy backoffice',
        'AI chat integrated into daily admin flows (order/PIX/report lookups)',
        'Structured audit logs for fast investigation',
        'Internal team gained offline mode on warehouse features'
      ]
    },
    technicalDecisions: {
      pt: [
        'Next.js 16 App Router: Server Components reduzem JS no client em listagens',
        'Bun + Turbopack: dev server e build mais rápidos que Node + Webpack',
        'shadcn/ui sobre Ant Design: ownership do código dos componentes, customização sem fork',
        'Vercel AI SDK + Bedrock + OpenRouter: provider primário + fallback evita lock-in',
        'TanStack Query/Table: padronizam paginação e cache em todas as listagens'
      ],
      en: [
        'Next.js 16 App Router: Server Components cut client JS on listing pages',
        'Bun + Turbopack: faster dev server and builds than Node + Webpack',
        'shadcn/ui over Ant Design: own the component code, customize without forks',
        'Vercel AI SDK + Bedrock + OpenRouter: primary provider + fallback avoids lock-in',
        'TanStack Query/Table: standardize pagination and cache across all listings'
      ]
    }
  },
  {
    slug: 'register-flow',
    title: {
      pt: 'Register Flow — Onboarding Multi-Step',
      en: 'Register Flow — Multi-Step Onboarding'
    },
    subtitle: {
      pt: 'App Flutter para cadastro de vendedores e clientes com upload de docs e geocoding',
      en: 'Flutter onboarding app for sellers and customers with doc upload and geocoding'
    },
    description: {
      pt: 'App de onboarding multi-step para o ecossistema B2B. Cadastro de vendedores e clientes com upload de documentos, endereço com mapa, contatos e validações brasileiras (CPF/CNPJ, telefone). Feature flags alternam fluxo vendedor vs comprador.',
      en: 'Multi-step onboarding app for the B2B ecosystem. Seller and customer registration with document upload, address with map, contacts and Brazilian validations (CPF/CNPJ, phone). Feature flags switch seller vs buyer flows.'
    },
    problem: {
      pt: 'Onboarding de vendedores e clientes precisava sair de um formulário web pesado para um fluxo mobile guiado, multi-step, com upload de docs, geocoding e mapas — funcionando em Android, iOS, Web e desktop.',
      en: 'Onboarding for sellers and customers had to move off a heavy web form into a guided multi-step mobile flow with doc upload, geocoding and maps — running on Android, iOS, Web and desktop.'
    },
    solution: {
      pt: 'Flutter (FVM) com Dart 3.7+, arquitetura feature-based, BLoC/Cubit por step (MainCubit, UploadDocumentsCubit). Roteamento GoRouter 15, DI com GetIt, Dio para HTTP, flutter_map para endereço, brasil_fields e intl_phone_number_input para formatação, file_picker para upload de docs.',
      en: 'Flutter (FVM) with Dart 3.7+, feature-based architecture, BLoC/Cubit per step (MainCubit, UploadDocumentsCubit). GoRouter 15 routing, GetIt for DI, Dio for HTTP, flutter_map for address, brasil_fields and intl_phone_number_input for formatting, file_picker for doc upload.'
    },
    techStack: ['Flutter', 'Dart 3.7+', 'BLoC/Cubit', 'GoRouter 15', 'GetIt', 'Dio 5', 'flutter_map', 'brasil_fields', 'file_picker'],
    highlights: {
      pt: [
        'Arquitetura feature-based com BLoC/Cubit por step do fluxo',
        'MainCubit coordena progresso global; cubits específicos por step (uploads, endereço, contatos)',
        'GoRouter 15 com navegação declarativa entre steps com proteção de back',
        'Upload de documentos com file_picker e preview por tipo de arquivo',
        'Endereço com flutter_map + serviço de geocoding interno',
        'Validações brasileiras (CPF/CNPJ/telefone) com brasil_fields e intl_phone_number_input',
        'Feature flags para alternar entre fluxo vendedor e fluxo comprador',
        'Multi-plataforma: Android, iOS, Web, Windows, macOS, Linux'
      ],
      en: [
        'Feature-based architecture with BLoC/Cubit per flow step',
        'MainCubit coordinates global progress; per-step cubits (uploads, address, contacts)',
        'GoRouter 15 with declarative step navigation and back-button protection',
        'Document upload with file_picker and per-file-type preview',
        'Address with flutter_map + internal geocoding service',
        'Brazilian validation (CPF/CNPJ/phone) via brasil_fields and intl_phone_number_input',
        'Feature flags switching seller flow vs buyer flow',
        'Cross-platform: Android, iOS, Web, Windows, macOS, Linux'
      ]
    },
    role: {
      pt: 'Contribuição contínua em steps do fluxo, integração com API de cadastro e validações BR',
      en: 'Continuous contribution to flow steps, registration API integration and BR validations'
    },
    category: 'mobile',
    year: 2026,
    complexity: 4,
    type: 'professional',
    diagram: `graph LR
    Start[Início] --> Step1[Step 1<br/>Identificação<br/>CPF/CNPJ]
    Step1 --> Step2[Step 2<br/>Contatos<br/>telefone + email]
    Step2 --> Step3[Step 3<br/>Endereço<br/>flutter_map]
    Step3 --> Step4[Step 4<br/>Documentos<br/>file_picker]
    Step4 --> Done[Concluído]

    Main[MainCubit<br/>progresso global] -.-> Step1
    Main -.-> Step2
    Main -.-> Step3
    Main -.-> Step4

    FF[Feature Flags<br/>vendedor vs comprador] -.-> Main

    Done -->|POST| API[E-commerce API<br/>Auth + Platform]

    style Main fill:#01926D
    style API fill:#01926D
    style FF fill:#A855F7`,
    challenges: {
      pt: [
        'Coordenar estado entre múltiplos cubits sem acoplar steps',
        'Permitir retomar o cadastro de onde parou em caso de queda de rede',
        'Lidar com upload de documentos grandes em Web e mobile com APIs distintas',
        'Manter fluxo vendedor e comprador divergentes sem duplicar a árvore de rotas'
      ],
      en: [
        'Coordinate state across multiple cubits without coupling steps',
        'Allow resuming registration from where the user left on network drops',
        'Handle large document uploads on Web and mobile with different APIs',
        'Keep seller and buyer flows divergent without duplicating the route tree'
      ]
    },
    results: {
      pt: [
        'Onboarding mobile guiado substitui formulário web pesado',
        'Validações BR nativas reduzem dados ruins chegando ao backend',
        'Feature flags permitem ajustar fluxo vendedor sem afetar comprador',
        'Mesmo codebase serve Android, iOS, Web e desktop'
      ],
      en: [
        'Guided mobile onboarding replaces the heavy web form',
        'Native BR validation cuts down on bad data reaching the backend',
        'Feature flags let us tweak the seller flow without affecting buyers',
        'Same codebase runs on Android, iOS, Web and desktop'
      ]
    },
    technicalDecisions: {
      pt: [
        'BLoC/Cubit por step + MainCubit global: separação clara entre estado local e progresso',
        'GoRouter declarativo: navegação testável e proteção nativa de back-button',
        'Feature flags em vez de fork de telas: vendedor/comprador compartilham 80% do código',
        'flutter_map sobre Google Maps SDK: sem chave paga, suficiente para confirmação de endereço',
        'file_picker abstrai diferenças de upload entre Web e mobile'
      ],
      en: [
        'Per-step BLoC/Cubit + global MainCubit: clear split between local state and progress',
        'Declarative GoRouter: testable navigation and native back-button protection',
        'Feature flags instead of forking screens: seller/buyer share 80% of the code',
        'flutter_map over Google Maps SDK: no paid key, enough for address confirmation',
        'file_picker abstracts upload differences between Web and mobile'
      ]
    }
  },
  {
    slug: 'integration-platform',
    title: {
      pt: 'Plataforma de Integração — Client / Middleware / Orchestrator',
      en: 'Integration Platform — Client / Middleware / Orchestrator'
    },
    subtitle: {
      pt: 'Bridge bidirecional Oracle Winthor ↔ plataforma B2B via 3 serviços Java',
      en: 'Bidirectional bridge between Oracle Winthor and the B2B platform via 3 Java services'
    },
    description: {
      pt: 'Conjunto de três serviços Java que mantém produtos, clientes, preços, estoque, pedidos e notificações fluindo entre o ERP Oracle Winthor (on-premise no parceiro) e a plataforma B2B. integration-client roda local, integration-middleware é o bus SQS central e integration-orchestrator coordena workflows complexos (crédito, PIX, liberação de pedidos, relatórios).',
      en: 'Three-service Java set keeping products, customers, prices, stock, orders and notifications flowing between the Oracle Winthor ERP (on-premise at the partner) and the B2B platform. integration-client runs locally, integration-middleware is the central SQS bus, and integration-orchestrator coordinates complex workflows (credit, PIX, order release, reports).'
    },
    problem: {
      pt: 'Plataforma cloud moderna precisa conviver com ERP Oracle Winthor de décadas, sem reescrita, mantendo dados do parceiro on-premise por segurança. Fluxo bidirecional precisa de contratos normalizados, retries, idempotência e rastreabilidade.',
      en: 'Modern cloud platform must coexist with a decades-old Oracle Winthor ERP, no rewrite, keeping partner data on-premise for security. Bidirectional flow needs normalized contracts, retries, idempotency and traceability.'
    },
    solution: {
      pt: 'integration-client roda on-premise no parceiro lendo Winthor via JDBC (consumer, producer, extractor, scheduler, discount, notification, order). integration-middleware (Spring Boot 2.5) cria filas SQS, roteia mensagens, transforma datatypes e mantém log centralizado. integration-orchestrator (Spring Boot 3.2 / Java 21) coordena workflows com renderers (PDF, WhatsApp, Excel) e senders (Email SMTP TLS, WhatsApp).',
      en: 'integration-client runs on-premise at the partner reading Winthor via JDBC (consumer, producer, extractor, scheduler, discount, notification, order). integration-middleware (Spring Boot 2.5) creates SQS queues, routes messages, transforms datatypes and keeps centralized logs. integration-orchestrator (Spring Boot 3.2 / Java 21) coordinates workflows with renderers (PDF, WhatsApp, Excel) and senders (Email SMTP TLS, WhatsApp).'
    },
    techStack: ['Java 17', 'Java 21', 'Spring Boot 2.7 / 3.2', 'Oracle (Winthor)', 'PostgreSQL', 'AWS SQS', 'Spring Security', 'Apache POI', 'PDFBox'],
    highlights: {
      pt: [
        'integration-client on-premise: única ponte JDBC ao Oracle Winthor por segurança dos dados',
        'Módulos do client: consumer (customer/order/events), producer, extractor, datatype, scheduler, discount, notification, order, partner',
        'Strategy para diferentes ERPs parceiros, com event actuators desacoplados',
        'integration-middleware como message bus SQS central com Spring Security',
        'integration-orchestrator coordena workflows: credit, creditcard, discount, order (release/deny/block), PIX (consulting/generation/payment), report, priceAuthorization, updatemargin, file, download',
        'Renderers para PDF, WhatsApp (texto, template, lista com botões) e Excel/XLS',
        'Senders para Email (SMTP TLS) e WhatsApp',
        'Conversão de datatypes e log centralizado de integração no middleware',
        'Idempotency keys garantem entrega única no ERP em retries'
      ],
      en: [
        'On-premise integration-client: single JDBC bridge to Oracle Winthor for data security',
        'Client modules: consumer (customer/order/events), producer, extractor, datatype, scheduler, discount, notification, order, partner',
        'Strategy pattern for different partner ERPs with decoupled event actuators',
        'integration-middleware as central SQS message bus with Spring Security',
        'integration-orchestrator coordinates workflows: credit, creditcard, discount, order (release/deny/block), PIX (consulting/generation/payment), report, priceAuthorization, updatemargin, file, download',
        'Renderers for PDF, WhatsApp (text, template, list with buttons) and Excel/XLS',
        'Senders for Email (SMTP TLS) and WhatsApp',
        'Datatype conversion and centralized integration logging in the middleware',
        'Idempotency keys guarantee single delivery to the ERP on retries'
      ]
    },
    role: {
      pt: '1º contributor (14 devs) do integration-client · 51 + 32 + 20 commits nos três serviços — contribuição contínua em pipelines, renderers e senders',
      en: '#1 contributor (14 devs) on integration-client · 51 + 32 + 20 commits across the three services — continuous contribution to pipelines, renderers and senders'
    },
    category: 'integration',
    year: 2026,
    complexity: 5,
    type: 'professional',
    diagram: `graph LR
    Oracle[(Oracle Winthor<br/>on-premise)] <-->|JDBC| Client[integration-client<br/>Spring Boot 2.7]
    Client <-->|SQS| Mid[integration-middleware<br/>Spring Boot 2.5<br/>bus + log]
    Mid <-->|SQS| Orch[integration-orchestrator<br/>Spring Boot 3.2 · Java 21<br/>workflows]

    Orch --> Renderers[Renderers<br/>PDF · WhatsApp · Excel]
    Orch --> Senders[Senders<br/>Email · WhatsApp]

    Mid --> Ecom[E-commerce API]
    Mid --> Offline[offline-integrator]

    style Client fill:#01926D
    style Mid fill:#A855F7
    style Orch fill:#01926D`,
    challenges: {
      pt: [
        'Ler tabelas Oracle Winthor sem impactar operação produtiva do ERP',
        'Garantir entrega de pedidos aprovados ao Winthor (idempotência por chave de negócio)',
        'Coordenar workflows com dependências sem lock distribuído pesado',
        'Manter contratos estáveis entre 3 versões de Spring Boot (2.5 / 2.7 / 3.2)'
      ],
      en: [
        'Read Oracle Winthor tables without impacting live ERP operations',
        'Guarantee delivery of approved orders to Winthor (business-key idempotency)',
        'Coordinate workflows with dependencies without heavy distributed locks',
        'Keep contracts stable across 3 Spring Boot versions (2.5 / 2.7 / 3.2)'
      ]
    },
    results: {
      pt: [
        'Sincronização confiável entre ERP legado e plataforma cloud',
        'Pedidos do e-commerce entregues ao Winthor com retry automático',
        'Workflows complexos (PIX, crédito, relatórios) executam end-to-end via orchestrator',
        'Manutenibilidade: 3 serviços com responsabilidades claras (extração / transporte / coordenação)'
      ],
      en: [
        'Reliable sync between legacy ERP and cloud platform',
        'E-commerce orders delivered to Winthor with automatic retry',
        'Complex workflows (PIX, credit, reports) run end-to-end via the orchestrator',
        'Maintainability: 3 services with clear responsibilities (extract / transport / coordinate)'
      ]
    },
    technicalDecisions: {
      pt: [
        'Client on-premise: dados sensíveis do parceiro nunca saem do data center deles',
        '3 serviços separados: client (Oracle), middleware (transporte), orchestrator (workflows)',
        'SQS entre serviços: desacopla deploys e absorve picos sem perda',
        'Strategy para ERPs distintos: parceiros diferentes plugam sem reescrita do middleware',
        'Idempotency keys nos pedidos: consumer pode reprocessar sem duplicar no Winthor'
      ],
      en: [
        'On-prem client: sensitive partner data never leaves their data center',
        '3 separate services: client (Oracle), middleware (transport), orchestrator (workflows)',
        'SQS between services: decouples deploys and absorbs spikes without loss',
        'Strategy per ERP: different partners plug in without rewriting the middleware',
        'Idempotency keys on orders: consumer can reprocess without duplicating in Winthor'
      ]
    }
  },
  {
    slug: 'offline-integrator',
    title: {
      pt: 'Offline Integrator — API do Field Sales App',
      en: 'Offline Integrator — Field Sales API'
    },
    subtitle: {
      pt: 'Spring Boot 3.5 que gera jobs, executa queries no banco do parceiro e abastece o app offline',
      en: 'Spring Boot 3.5 that generates jobs, runs partner-DB queries and feeds the offline app'
    },
    description: {
      pt: 'API dedicada ao field-sales app. Gera jobs de sync, executa queries no banco SEGS do parceiro (read-only) e abastece o banco local Drift do app via S3. Arquitetura hexagonal/clean (core → application → infra), com primary PostgreSQL e secondary SEGS read-only. Infra dedicada em repositório Terraform separado.',
      en: 'Dedicated API for the field-sales app. Generates sync jobs, runs queries on the partner SEGS database (read-only) and feeds the app local Drift DB via S3. Hexagonal/clean architecture (core → application → infra), with primary PostgreSQL and secondary SEGS read-only. Dedicated infra in a separate Terraform repo.'
    },
    problem: {
      pt: 'App de força de vendas precisa de dataset offline completo e sempre atualizado, sem expor o banco do parceiro à internet nem inflar a malha de integração existente.',
      en: 'Field-sales app needs a complete, always-fresh offline dataset without exposing the partner DB to the internet or bloating the existing integration mesh.'
    },
    solution: {
      pt: 'Spring Boot 3.5 hexagonal com multi-datasource: primary PostgreSQL para metadados/jobs, secondary PostgreSQL SEGS read-only para queries do parceiro. Redis cache para resultados, S3 para datasets grandes baixados pelo app, OAuth2 JWT, Liquibase, Testcontainers (mín 80% cobertura), Prometheus + Micrometer + Loki para observabilidade. Infra (ECS Fargate, RDS, ALB, S3) em offline-integrator-infra com Terraform 5.0+.',
      en: 'Hexagonal Spring Boot 3.5 with multi-datasource: primary PostgreSQL for metadata/jobs, secondary PostgreSQL SEGS read-only for partner queries. Redis cache for results, S3 for large datasets downloaded by the app, OAuth2 JWT, Liquibase, Testcontainers (min 80% coverage), Prometheus + Micrometer + Loki for observability. Infra (ECS Fargate, RDS, ALB, S3) in offline-integrator-infra with Terraform 5.0+.'
    },
    techStack: ['Java 17', 'Spring Boot 3.5', 'PostgreSQL', 'Redis', 'AWS S3', 'AWS ECS Fargate', 'AWS RDS', 'OAuth2 JWT', 'Liquibase', 'Testcontainers', 'Prometheus', 'Loki', 'Terraform 5'],
    highlights: {
      pt: [
        'Hexagonal/Clean: core → application → infra',
        'Multi-datasource: primary PostgreSQL + secondary SEGS read-only do parceiro',
        'Redis cache para resultados de queries pesadas',
        'S3 para datasets grandes consumidos pelo field-sales app',
        'OAuth2 JWT em todas as rotas com context path /integrator',
        'Liquibase para migrations versionadas',
        'Testcontainers + JUnit 5 com cobertura mínima 80% (JaCoCo)',
        'Stack de observabilidade Prometheus + Micrometer + Loki',
        'Infra dedicada em offline-integrator-infra com ECS Fargate + RDS + ALB (HTTPS)',
        'Workspaces Terraform: develop e production'
      ],
      en: [
        'Hexagonal/Clean: core → application → infra',
        'Multi-datasource: primary PostgreSQL + secondary partner SEGS read-only',
        'Redis cache for heavy query results',
        'S3 for large datasets consumed by the field-sales app',
        'OAuth2 JWT on every route with context path /integrator',
        'Liquibase for versioned migrations',
        'Testcontainers + JUnit 5 with min 80% coverage (JaCoCo)',
        'Observability stack: Prometheus + Micrometer + Loki',
        'Dedicated offline-integrator-infra with ECS Fargate + RDS + ALB (HTTPS)',
        'Terraform workspaces: develop and production'
      ]
    },
    role: {
      pt: '2º contributor em ambos os repos (api + infra) · 58 + 27 commits — contribuição contínua em jobs, queries SEGS, cache e provisionamento',
      en: '#2 contributor on both repos (api + infra) · 58 + 27 commits — continuous contribution to jobs, SEGS queries, cache and provisioning'
    },
    category: 'event-driven',
    year: 2026,
    complexity: 4,
    type: 'professional',
    diagram: `graph LR
    App[Field Sales App] -->|OAuth2 JWT| API[Offline Integrator<br/>Spring Boot 3.5<br/>/integrator]
    API --> Primary[(Primary PostgreSQL<br/>jobs · metadata)]
    API --> SEGS[(Secondary SEGS<br/>read-only · parceiro)]
    API --> Cache[(Redis cache)]
    API -->|datasets| S3[(AWS S3)]
    App -->|download snapshots| S3

    API --> Prom[Prometheus + Micrometer]
    Prom --> Loki[Loki]

    subgraph Infra [offline-integrator-infra · Terraform 5]
      ECS[ECS Fargate]
      RDS[(RDS PostgreSQL)]
      ALB[ALB HTTPS 443]
    end

    API -.-> ECS
    Primary -.-> RDS
    API -.-> ALB

    style API fill:#01926D
    style SEGS fill:#A855F7
    style S3 fill:#A855F7`,
    challenges: {
      pt: [
        'Consultar SEGS do parceiro sem impactar performance do ERP',
        'Manter cache Redis coerente quando dados do parceiro mudam',
        'Gerar datasets em S3 grandes sem estourar memória do container',
        'Atender SLO do app mobile mesmo com cold start em Fargate'
      ],
      en: [
        'Query the partner SEGS without impacting ERP performance',
        'Keep the Redis cache coherent when partner data changes',
        'Generate large S3 datasets without blowing container memory',
        'Meet the mobile app SLO even with Fargate cold starts'
      ]
    },
    results: {
      pt: [
        'App mobile sempre com dataset atualizado sem expor o banco do parceiro',
        'Redis cache reduz pressão sobre SEGS read-only',
        'Pipeline de testes com Testcontainers garante migrations reais antes do merge',
        'Infra reproduzível em develop e production via Terraform workspaces'
      ],
      en: [
        'Mobile app always with up-to-date dataset without exposing the partner DB',
        'Redis cache reduces pressure on the read-only SEGS',
        'Testcontainers pipeline validates real migrations before merge',
        'Reproducible infra on develop and production via Terraform workspaces'
      ]
    },
    technicalDecisions: {
      pt: [
        'Multi-datasource explícito: separa metadados internos das queries do parceiro',
        'S3 para datasets grandes em vez de streaming HTTP: cliente baixa quando quer e cacheia',
        'Hexagonal estrita: troca de banco/secondary sem mexer no core',
        'Testcontainers como obrigatório: nada de mock de banco em integração',
        'Infra em repositório separado: ciclo de vida da infra ≠ ciclo de vida do código'
      ],
      en: [
        'Explicit multi-datasource: separates internal metadata from partner queries',
        'S3 for large datasets instead of HTTP streaming: client downloads on demand and caches',
        'Strict hexagonal: swap DB/secondary without touching core',
        'Testcontainers as mandatory: no DB mocks in integration tests',
        'Infra in a separate repo: infra lifecycle ≠ code lifecycle'
      ]
    }
  },
  {
    slug: 'infra-terraform',
    title: {
      pt: 'Infra Terraform — IaC AWS do Ecossistema',
      en: 'Infra Terraform — Ecosystem AWS IaC'
    },
    subtitle: {
      pt: 'Terraform versionando boa parte do ecossistema ecommerce em test/hmg/prod/shared',
      en: 'Terraform versioning most of the B2B ecommerce across test/hmg/prod/shared'
    },
    description: {
      pt: 'Infrastructure as Code abrangente do ecossistema ecommerce na AWS. Provisiona Lambdas + Layers, API Gateway, RDS, S3, VPC/Subnets/SGs, SSM Parameter Store e ECR. Multi-ambiente (test, hmg, prod, shared) com naming padronizado, state remoto em S3 e CI/CD em GitHub Actions.',
      en: 'Comprehensive IaC for the ecommerce ecosystem on AWS. Provisions Lambdas + Layers, API Gateway, RDS, S3, VPC/Subnets/SGs, SSM Parameter Store and ECR. Multi-environment (test, hmg, prod, shared) with standardized naming, remote state in S3 and CI/CD on GitHub Actions.'
    },
    problem: {
      pt: 'Provisionar manualmente Lambdas, API Gateway, RDS, S3, VPCs, SSM e ECR para múltiplos serviços e ambientes é frágil e impossível de revisar. Mudanças precisam ser auditáveis e reverter rápido.',
      en: 'Manually provisioning Lambdas, API Gateway, RDS, S3, VPCs, SSM and ECR across many services and envs is fragile and impossible to review. Changes must be auditable and quickly revertible.'
    },
    solution: {
      pt: 'Terraform 1.0+ com módulos por recurso e por serviço, state remoto em S3, ambientes parametrizados (test, hmg, prod, shared), naming `<ambiente>-<sistema>-<recurso>`, Parameter Store `/<ambiente>/config/<app>/<param>` e nome de ECR igual ao repo GitHub para integração nativa com CI/CD.',
      en: 'Terraform 1.0+ with per-resource and per-service modules, remote state in S3, parameterized envs (test, hmg, prod, shared), naming `<env>-<system>-<resource>`, Parameter Store `/<env>/config/<app>/<param>` and ECR name matching the GitHub repo for native CI/CD integration.'
    },
    techStack: ['Terraform 1.0+', 'AWS Lambda', 'AWS API Gateway', 'AWS RDS', 'AWS S3', 'AWS VPC', 'AWS SSM', 'AWS ECR', 'GitHub Actions'],
    highlights: {
      pt: [
        'Módulos reutilizáveis para Lambda + Layers, API Gateway, RDS, S3, VPC, SSM, ECR',
        'Quatro ambientes: test, hmg, prod, shared',
        'State remoto em S3 backend',
        'Convenção de naming `<ambiente>-<sistema>-<recurso>` para identificação rápida',
        'Parameter Store padronizado: `/<ambiente>/config/<app>/<param>`',
        'ECR com nome igual ao repo GitHub: pipeline CI/CD encontra por convenção',
        'IAM roles seguindo princípio do menor privilégio',
        'Pipelines plan + apply automatizados em GitHub Actions',
        'Audit trail completo via histórico Git'
      ],
      en: [
        'Reusable modules for Lambda + Layers, API Gateway, RDS, S3, VPC, SSM, ECR',
        'Four environments: test, hmg, prod, shared',
        'Remote state in S3 backend',
        'Naming convention `<env>-<system>-<resource>` for fast identification',
        'Standardized Parameter Store: `/<env>/config/<app>/<param>`',
        'ECR name matching the GitHub repo: CI/CD pipeline finds it by convention',
        'IAM roles following the principle of least privilege',
        'Automated plan + apply pipelines on GitHub Actions',
        'Full audit trail via Git history'
      ]
    },
    role: {
      pt: '37 commits · 8º de 16 contributors — contribuição contínua em provisionamento, módulos e ajustes de IAM',
      en: '37 commits · #8 of 16 contributors — continuous contribution to provisioning, modules and IAM tuning'
    },
    category: 'iac',
    year: 2025,
    complexity: 4,
    type: 'professional',
    diagram: `graph TB
    Dev[Developer] -->|PR| Repo[infra-terraform repo]
    Repo --> CI[GitHub Actions<br/>plan + apply]
    CI --> TF[Terraform 1.0+]

    TF -->|provision| Lambda[AWS Lambda + Layers]
    TF -->|provision| APIGW[AWS API Gateway]
    TF -->|provision| RDS[(AWS RDS)]
    TF -->|provision| S3[(AWS S3)]
    TF -->|provision| VPC[AWS VPC<br/>subnets + SGs]
    TF -->|provision| SSM[AWS SSM<br/>Parameter Store]
    TF -->|provision| ECR[AWS ECR<br/>repo = GitHub repo]

    TF -->|state| State[(S3 backend)]

    style TF fill:#01926D
    style State fill:#A855F7`,
    challenges: {
      pt: [
        'Compartilhar state entre múltiplos devs sem conflitos',
        'Aplicar IAM least privilege em time grande sem virar gargalo',
        'Parametrizar módulos sem virar abstração genérica e ilegível',
        'Garantir que plan no PR reflete o que apply executa em prod'
      ],
      en: [
        'Share state across many devs without conflicts',
        'Apply IAM least privilege in a big team without becoming a bottleneck',
        'Parameterize modules without turning them into generic, unreadable abstractions',
        'Make sure PR plan reflects what apply executes in prod'
      ]
    },
    results: {
      pt: [
        'Toda infraestrutura do ecommerce auditável via Git',
        'Provisionamento reproduzível test → hmg → prod',
        'Rollback rápido por revert de PR',
        'Zero configuração manual na AWS Console em serviços novos'
      ],
      en: [
        'Full ecommerce infrastructure auditable via Git',
        'Reproducible provisioning test → hmg → prod',
        'Fast rollback by reverting a PR',
        'Zero manual AWS Console config on new services'
      ]
    },
    technicalDecisions: {
      pt: [
        'Remote state S3: padrão maduro, evita corrida em apply concorrente',
        'Módulos por recurso: reuso sem virar mega-módulo opaco',
        'Naming convention rígida: dev encontra recurso por padrão, sem caça ao tesouro',
        'ECR = nome do repo GitHub: integração CI/CD por convenção, sem mapping manual',
        'Plan obrigatório em PR: revisor vê impacto antes de aprovar'
      ],
      en: [
        'Remote state S3: mature pattern, avoids race on concurrent apply',
        'Per-resource modules: reuse without becoming opaque mega-modules',
        'Strict naming convention: devs find resources by pattern, no treasure hunt',
        'ECR = GitHub repo name: CI/CD integration by convention, no manual mapping',
        'Mandatory PR plan: reviewer sees impact before approval'
      ]
    }
  },
  {
    slug: 'commitclock',
    title: {
      pt: 'CommitClock — Timesheet com IA',
      en: 'CommitClock — AI-Powered Timesheet'
    },
    subtitle: {
      pt: 'Envia foto do cartão ponto, Groq extrai os horários e gera entradas no Clockify cruzadas com commits do GitHub',
      en: 'Upload your timesheet photo, Groq extracts the hours and generates Clockify entries cross-referenced with GitHub commits'
    },
    description: {
      pt: 'Webapp que automatiza o preenchimento do Clockify. O usuário envia uma foto do cartão ponto físico; Groq Vision extrai os horários de entrada e saída; a API do GitHub busca os commits do período para enriquecer as descrições; e a API do Clockify cria as entradas de tempo automaticamente.',
      en: 'Webapp that automates Clockify time tracking. The user uploads a photo of their physical timesheet; Groq Vision extracts clock-in/out times; the GitHub API fetches commits for that period to enrich entry descriptions; and the Clockify API creates the time entries automatically.'
    },
    problem: {
      pt: 'Preencher manualmente o Clockify a partir de um cartão ponto físico é repetitivo e propenso a erros — exige comparar papel, commits e calendário toda semana.',
      en: 'Manually filling Clockify from a physical timesheet is repetitive and error-prone — it requires comparing paper, commits and calendar every week.'
    },
    solution: {
      pt: 'Pipeline de três etapas: (1) Groq Vision lê a foto e extrai os horários em JSON estruturado; (2) GitHub API busca commits do período para gerar descrições de tarefas; (3) Clockify API cria as entradas com horários e descrições preenchidos automaticamente.',
      en: 'Three-stage pipeline: (1) Groq Vision reads the photo and extracts times into structured JSON; (2) GitHub API fetches commits for the period to generate task descriptions; (3) Clockify API creates the entries with times and descriptions filled automatically.'
    },
    techStack: ['TypeScript', 'Next.js', 'Groq AI', 'GitHub API', 'Clockify API'],
    highlights: {
      pt: [
        'Groq Vision (LLaMA) faz OCR inteligente do cartão ponto físico',
        'Saída estruturada em JSON: data, entrada, saída, total de horas',
        'GitHub API busca commits do período para enriquecer descrições',
        'Clockify API cria entradas de tempo com um clique',
        'Interface minimalista: upload → preview → confirmar → pronto'
      ],
      en: [
        'Groq Vision (LLaMA) performs intelligent OCR on the physical timesheet',
        'Structured JSON output: date, clock-in, clock-out, total hours',
        'GitHub API fetches commits from the period to enrich descriptions',
        'Clockify API creates time entries with one click',
        'Minimal interface: upload → preview → confirm → done'
      ]
    },
    role: {
      pt: 'Projeto solo — concepção, design e implementação completos',
      en: 'Solo project — full conception, design and implementation'
    },
    category: 'automation',
    year: 2026,
    complexity: 3,
    type: 'personal',
    diagram: `graph LR
    Photo[Foto do<br/>Cartão Ponto] -->|upload| App[CommitClock<br/>Next.js]
    App -->|image| Groq[Groq Vision<br/>LLaMA]
    Groq -->|JSON horários| App
    App -->|período| GH[GitHub API<br/>commits]
    GH -->|descrições| App
    App -->|entries| CK[Clockify API]
    CK --> Done[Entradas criadas]

    style App fill:#01926D
    style Groq fill:#A855F7
    style CK fill:#01926D`,
    challenges: {
      pt: [
        'Cartões ponto têm layouts variados — prompt do Groq precisa ser robusto a formatos distintos',
        'Mapear commits do GitHub para as entradas de tempo corretas sem falsos positivos',
        'Lidar com fotos de baixa qualidade ou com reflexo sem travar o pipeline'
      ],
      en: [
        'Physical timesheets vary in layout — the Groq prompt must handle diverse formats',
        'Mapping GitHub commits to the correct time entries without false positives',
        'Handling low-quality or glare-affected photos without breaking the pipeline'
      ]
    },
    results: {
      pt: [
        'Reduz o preenchimento semanal do Clockify de ~20 min para menos de 1 min',
        'Descrições automáticas baseadas em commits eliminam entradas genéricas',
        'Funciona com qualquer layout de cartão ponto físico'
      ],
      en: [
        'Reduces weekly Clockify fill time from ~20 min to under 1 min',
        'Automatic commit-based descriptions eliminate generic entries',
        'Works with any physical timesheet layout'
      ]
    },
    technicalDecisions: {
      pt: [
        'Groq sobre OpenAI Vision: latência menor e custo menor para extração simples de texto',
        'Next.js full-stack: API routes evitam expor chaves de API no cliente',
        'JSON estruturado no prompt: saída validável e tipada antes de chamar o Clockify'
      ],
      en: [
        'Groq over OpenAI Vision: lower latency and cost for simple text extraction',
        'Next.js full-stack: API routes avoid exposing API keys to the client',
        'Structured JSON in the prompt: validatable, typed output before calling Clockify'
      ]
    }
  },
  {
    slug: 'kira-semi-joias',
    title: {
      pt: 'Kira Semi Joias — Loja + Backoffice',
      en: 'Kira Semi Joias — Store + Backoffice'
    },
    subtitle: {
      pt: 'E-commerce Next.js com catálogo, checkout via WhatsApp e admin completo editável',
      en: 'Next.js e-commerce with catalog, WhatsApp checkout and fully editable admin panel'
    },
    description: {
      pt: 'Loja de semi-joias full-stack. Clientes navegam pelo catálogo filtrado por categoria, favoritar produtos e finalizam o pedido direto no WhatsApp. O backoffice permite ao operador editar qualquer campo do conteúdo — produtos, categorias, preços, banners, configurações e newsletter — com upload e crop de imagem e importação em massa via Excel.',
      en: 'Full-stack semi-precious jewelry store. Customers browse the category-filtered catalog, favorite products and finalize orders directly on WhatsApp. The backoffice lets operators edit any content field — products, categories, prices, banners, settings and newsletter — with image upload/cropping and bulk Excel import.'
    },
    problem: {
      pt: 'Loja física de semi-joias precisava de presença digital com catálogo atualizado e processo de pedido simples, sem complexidade de gateway de pagamento, e um painel admin que qualquer pessoa possa operar.',
      en: 'A physical semi-jewelry store needed a digital presence with an up-to-date catalog and a simple order process — no payment gateway complexity — plus an admin panel anyone can operate.'
    },
    solution: {
      pt: 'Next.js 16 App Router full-stack com Vercel KV para sessões e configurações, Vercel Blob para imagens de produtos, Zustand para estado do carrinho e favoritos, react-image-crop para upload com recorte, XLSX para importação em massa e bcryptjs para auth do backoffice.',
      en: 'Full-stack Next.js 16 App Router with Vercel KV for sessions and settings, Vercel Blob for product images, Zustand for cart and favorites state, react-image-crop for upload with cropping, XLSX for bulk import, and bcryptjs for backoffice auth.'
    },
    techStack: ['TypeScript', 'Next.js 16', 'Tailwind CSS 4', 'Vercel KV', 'Vercel Blob', 'Zustand', 'XLSX', 'react-image-crop'],
    highlights: {
      pt: [
        'Catálogo filtrado por categoria: Colares, Brincos, Pulseiras, Anéis',
        'Checkout via WhatsApp: sem gateway de pagamento, fluxo familiar ao cliente',
        'Backoffice completo: produtos, categorias, configs, newsletter — todos os campos editáveis',
        'Upload de imagens com crop integrado (react-image-crop)',
        'Importação em massa via Excel (XLSX) para atualizar catálogo rapidamente',
        'Vercel Blob para storage de imagens e Vercel KV para sessão e settings',
        'Zustand para carrinho e favoritos no cliente sem Redux boilerplate',
        'Auth do admin com bcryptjs — sem dependência de provider externo'
      ],
      en: [
        'Category-filtered catalog: Necklaces, Earrings, Bracelets, Rings',
        'WhatsApp checkout: no payment gateway, familiar flow for customers',
        'Full backoffice: products, categories, settings, newsletter — all fields editable',
        'Image upload with integrated crop (react-image-crop)',
        'Bulk Excel import (XLSX) for fast catalog updates',
        'Vercel Blob for image storage and Vercel KV for session and settings',
        'Zustand for client-side cart and favorites without Redux boilerplate',
        'Admin auth with bcryptjs — no external provider dependency'
      ]
    },
    role: {
      pt: 'Projeto solo — produto completo do design ao deploy',
      en: 'Solo project — full product from design to deploy'
    },
    category: 'frontend',
    year: 2025,
    complexity: 3,
    type: 'personal',
    diagram: `graph TB
    Customer[Cliente<br/>Browser] --> Shop[Next.js<br/>Loja / Shop]
    Admin[Operador<br/>Browser] --> BO[Next.js<br/>Backoffice]

    Shop --> KV[(Vercel KV<br/>sessão · settings)]
    Shop --> Blob[(Vercel Blob<br/>imagens)]
    BO --> KV
    BO --> Blob

    Shop -->|pedido| WA[WhatsApp<br/>checkout]

    style Shop fill:#01926D
    style BO fill:#01926D
    style WA fill:#A855F7`,
    challenges: {
      pt: [
        'Manter catálogo atualizado sem que o operador precise de conhecimento técnico',
        'Upload de imagens mobile com crop funcional em iOS e Android',
        'Sincronizar estado do carrinho entre abas sem backend'
      ],
      en: [
        'Keep the catalog updated without requiring technical knowledge from the operator',
        'Mobile image upload with functional crop on iOS and Android',
        'Sync cart state across tabs without a backend'
      ]
    },
    results: {
      pt: [
        'Loja ativa com catálogo completo e processo de pedido simples via WhatsApp',
        'Operador atualiza produtos e preços sem suporte técnico',
        'Importação Excel permite atualizar dezenas de produtos em segundos'
      ],
      en: [
        'Live store with full catalog and simple WhatsApp order process',
        'Operator updates products and prices without technical support',
        'Excel import lets you update dozens of products in seconds'
      ]
    },
    technicalDecisions: {
      pt: [
        'WhatsApp checkout: elimina gateway de pagamento e fricção de cadastro para o cliente',
        'Vercel KV + Blob: zero infra própria para storage e sessão no plano gratuito',
        'Zustand sobre Context: estado de carrinho simples e performático sem boilerplate',
        'bcryptjs local: auth do admin sem Clerk/Auth.js — menos dependência para um projeto pequeno'
      ],
      en: [
        'WhatsApp checkout: eliminates payment gateway and registration friction for customers',
        'Vercel KV + Blob: zero own infra for storage and session on the free tier',
        'Zustand over Context: simple, performant cart state without boilerplate',
        'Local bcryptjs: admin auth without Clerk/Auth.js — fewer dependencies for a small project'
      ]
    }
  },
  {
    slug: 'finance-dashboard',
    title: {
      pt: 'Finance Dashboard — Controle Financeiro',
      en: 'Finance Dashboard — Personal Finance Tracker'
    },
    subtitle: {
      pt: 'API Spring Boot para categorização de gastos pessoais com frontend React em desenvolvimento',
      en: 'Spring Boot API for personal expense categorization with React frontend in development'
    },
    description: {
      pt: 'Side project de controle financeiro pessoal. Backend Spring Boot expõe API REST para registrar transações, categorizar gastos e agregar dados para visualizações. Frontend TypeScript/React consome a API e exibe dashboards com gráficos de gastos por categoria, evolução mensal e balanço.',
      en: 'Personal finance side project. Spring Boot backend exposes a REST API to record transactions, categorize expenses and aggregate data for visualizations. TypeScript/React frontend consumes the API and displays dashboards with spending-by-category charts, monthly trends and balance.'
    },
    problem: {
      pt: 'Planilhas manuais para controle de gastos são difíceis de manter e não oferecem visualizações automáticas. Precisava de uma solução própria para registrar e entender os gastos mensais.',
      en: 'Manual spreadsheets for expense tracking are hard to maintain and offer no automatic visualizations. Needed a personal solution to record and understand monthly spending.'
    },
    solution: {
      pt: 'API REST Spring Boot com PostgreSQL para persistência, categorias de gastos configuráveis e endpoints de agregação para os gráficos. Frontend React com charts para visualização de gastos por categoria e evolução temporal.',
      en: 'REST Spring Boot API with PostgreSQL for persistence, configurable expense categories and aggregation endpoints for charts. React frontend with charts for spending-by-category and time-evolution visualization.'
    },
    techStack: ['Java 17', 'Spring Boot', 'PostgreSQL', 'TypeScript', 'React'],
    highlights: {
      pt: [
        'API REST Spring Boot com persistência PostgreSQL',
        'Categorias de gastos configuráveis (alimentação, transporte, lazer, etc.)',
        'Endpoints de agregação para totais por categoria e por período',
        'Frontend React com dashboards de gráficos',
        'Projeto solo de aprendizado — Java backend + frontend TypeScript'
      ],
      en: [
        'REST Spring Boot API with PostgreSQL persistence',
        'Configurable expense categories (food, transport, leisure, etc.)',
        'Aggregation endpoints for totals by category and period',
        'React frontend with chart dashboards',
        'Solo learning project — Java backend + TypeScript frontend'
      ]
    },
    role: {
      pt: 'Projeto solo — backend e frontend',
      en: 'Solo project — backend and frontend'
    },
    category: 'monolith',
    year: 2026,
    complexity: 3,
    type: 'personal',
    diagram: `graph LR
    React[React Frontend<br/>TypeScript] -->|REST| API[Spring Boot API<br/>Java 17]
    API --> DB[(PostgreSQL<br/>transações · categorias)]
    API --> Agg[Aggregations<br/>por categoria · por mês]
    Agg --> React

    style API fill:#01926D
    style DB fill:#A855F7`,
    challenges: {
      pt: [
        'Modelar categorias flexíveis sem engessar o schema para futuros tipos de transação',
        'Agregar dados de forma eficiente no banco para não processar no frontend'
      ],
      en: [
        'Model flexible categories without locking the schema for future transaction types',
        'Aggregate data efficiently in the database to avoid processing on the frontend'
      ]
    },
    results: {
      pt: [
        'Visibilidade clara de gastos mensais por categoria',
        'Substituiu planilhas manuais por uma interface de dashboard'
      ],
      en: [
        'Clear visibility into monthly spending by category',
        'Replaced manual spreadsheets with a dashboard interface'
      ]
    },
    technicalDecisions: {
      pt: [
        'Spring Boot para o backend: familiaridade com o stack do trabalho aplicada em projeto pessoal',
        'PostgreSQL sobre H2: banco real desde o início evita surpresas na migração'
      ],
      en: [
        'Spring Boot for the backend: applying work stack familiarity to a personal project',
        'PostgreSQL over H2: real database from day one avoids migration surprises'
      ]
    }
  }
];
