export interface SystemDesignStudy {
  id: string;
  icon: string;
  title: string;
  description: string;
  category: string;
  diagram: string;
  keyDecisions: string[];
  components: {
    name: string;
    description: string;
  }[];
  scalabilityNotes: string[];
  estimatedScale: string;
}

export const systemDesignStudies: SystemDesignStudy[] = [
  {
    id: 'url-shortener',
    icon: 'Link',
    title: 'URL Shortener',
    description: 'Sistema distribuído para encurtamento de URLs com alta disponibilidade e baixa latência. Suporta milhões de redirecionamentos por dia com rastreamento de analytics.',
    category: 'Distributed Systems',
    diagram: `graph TB
    subgraph "Client Layer"
        A[User/Browser]
    end
    
    subgraph "API Gateway"
        B[Load Balancer]
        C1[API Server 1]
        C2[API Server 2]
        C3[API Server 3]
    end
    
    subgraph "Application Layer"
        D[URL Generation Service]
        E[Redirect Service]
        F[Analytics Service]
    end
    
    subgraph "Caching Layer"
        G1[Redis Cluster 1]
        G2[Redis Cluster 2]
    end
    
    subgraph "Database Layer"
        H[(PostgreSQL Primary)]
        I[(PostgreSQL Replica 1)]
        J[(PostgreSQL Replica 2)]
    end
    
    subgraph "Message Queue"
        K[Kafka Topic: analytics]
    end
    
    subgraph "Storage"
        L[(S3: Analytics Data)]
    end
    
    A --> B
    B --> C1 & C2 & C3
    C1 & C2 & C3 --> D
    C1 & C2 & C3 --> E
    D --> H
    D --> G1
    D --> G2
    E --> G1
    E --> G2
    E --> I
    E --> J
    E --> K
    K --> F
    F --> L
    H -.-> I & J`,
    keyDecisions: [
      'Base62 encoding para gerar short codes únicos (7 caracteres = 3.5 trilhões de URLs)',
      'Redis para cache com TTL de 24h, reduzindo 95% das queries ao banco',
      'Read replicas do PostgreSQL para distribuir carga de redirecionamentos',
      'Kafka para analytics assíncrono, evitando impacto na latência de redirecionamento',
      'Rate limiting por IP (100 req/min) para prevenir abuso'
    ],
    components: [
      {
        name: 'URL Generation Service',
        description: 'Gera códigos únicos usando contador distribuído + Base62. Valida URLs e armazena mapping no PostgreSQL.'
      },
      {
        name: 'Redirect Service',
        description: 'Resolve short codes primeiro no Redis, fallback para PostgreSQL replicas. Retorna HTTP 301 (permanent) ou 302 (temporary).'
      },
      {
        name: 'Analytics Service',
        description: 'Processa eventos do Kafka (clicks, user-agent, geolocation) e armazena agregados no S3 para análise posterior.'
      },
      {
        name: 'Redis Cluster',
        description: 'Cache distribuído com replicação. Armazena mapping shortCode → longURL com TTL configurável.'
      }
    ],
    scalabilityNotes: [
      'Sharding do PostgreSQL por hash do shortCode quando atingir 100M URLs',
      'CDN na frente do Load Balancer para redirecionamentos de URLs populares',
      'Auto-scaling horizontal dos API servers baseado em CPU e latência',
      'Particionamento do Kafka por shortCode para paralelização do analytics',
      'Expiry automático de URLs não acessadas em 2 anos (política de retenção)'
    ],
    estimatedScale: '10M redirecionamentos/dia, 1M novas URLs/mês, <50ms p99 latência'
  },
  {
    id: 'ecommerce-platform',
    icon: 'ShoppingCart',
    title: 'E-commerce Platform',
    description: 'Plataforma de e-commerce escalável com arquitetura de microserviços, suportando catálogo de produtos, carrinho, checkout e processamento de pedidos.',
    category: 'Microservices',
    diagram: `graph TB
    subgraph "Frontend"
        A[Web App - Next.js]
        B[Mobile App]
    end
    
    subgraph "API Gateway"
        C[Kong Gateway]
    end
    
    subgraph "Microservices"
        D[Product Catalog Service]
        E[Cart Service]
        F[Order Service]
        G[Payment Service]
        H[Inventory Service]
        I[Notification Service]
    end
    
    subgraph "Databases"
        J[(Product DB - PostgreSQL)]
        K[(Cart DB - Redis)]
        L[(Order DB - PostgreSQL)]
        M[(Inventory DB - PostgreSQL)]
    end
    
    subgraph "Message Broker"
        N[RabbitMQ Exchange]
        O[Queue: order.created]
        P[Queue: payment.processed]
        Q[Queue: inventory.reserved]
    end
    
    subgraph "External Services"
        R[Stripe API]
        S[SendGrid Email]
    end
    
    A & B --> C
    C --> D & E & F
    
    D --> J
    E --> K
    F --> L
    H --> M
    
    F --> N
    N --> O & P & Q
    
    O --> H
    P --> G
    Q --> I
    
    G --> R
    I --> S`,
    keyDecisions: [
      'Microserviços independentes com bancos de dados dedicados (Database per Service)',
      'Event-driven com RabbitMQ para comunicação assíncrona entre serviços',
      'Saga Pattern para transações distribuídas (Order → Payment → Inventory)',
      'Redis para carrinho de compras (sessão temporária com TTL de 7 dias)',
      'CQRS no Product Catalog: write model otimizado para admin, read model para clientes'
    ],
    components: [
      {
        name: 'Product Catalog Service',
        description: 'Gerencia catálogo com busca full-text (Elasticsearch), filtros, categorias. Cache agressivo de produtos populares.'
      },
      {
        name: 'Cart Service',
        description: 'Carrinho temporário no Redis com serialização JSON. Sincroniza com inventory para validar disponibilidade.'
      },
      {
        name: 'Order Service',
        description: 'Orquestra processo de checkout via Saga. Persiste pedidos e publica eventos para downstream services.'
      },
      {
        name: 'Payment Service',
        description: 'Integra com Stripe usando idempotency keys. Implementa retry com exponential backoff e circuit breaker.'
      },
      {
        name: 'Inventory Service',
        description: 'Controle de estoque com reservas temporárias (15min). Concorrência otimista com versioning.'
      }
    ],
    scalabilityNotes: [
      'Elasticsearch para busca de produtos escalável (sharding por categoria)',
      'Read replicas do PostgreSQL para queries de relatórios e analytics',
      'CDN para imagens de produtos e assets estáticos',
      'Rate limiting diferenciado: 1000 req/min para browse, 100 req/min para checkout',
      'Dead Letter Queues para falhas de pagamento com retry manual'
    ],
    estimatedScale: '50K pedidos/dia, 2M produtos, 100K usuários simultâneos no pico'
  },
  {
    id: 'order-queue-system',
    icon: 'ListOrdered',
    title: 'Order Processing Queue',
    description: 'Sistema de filas para processamento de pedidos com priorização, retry automático e dead letter queue. Garante exactly-once processing.',
    category: 'Event-Driven',
    diagram: `graph TB
    subgraph "Order Sources"
        A[REST API]
        B[Mobile App]
        C[Admin Portal]
    end
    
    subgraph "Message Broker"
        D[Kafka Cluster]
        E[Topic: orders.incoming]
        F[Topic: orders.priority]
        G[Topic: orders.standard]
        H[Topic: orders.dlq]
    end
    
    subgraph "Order Router"
        I[Priority Router Service]
    end
    
    subgraph "Workers - Priority Queue"
        J1[Worker 1]
        J2[Worker 2]
        J3[Worker 3]
    end
    
    subgraph "Workers - Standard Queue"
        K1[Worker 1]
        K2[Worker 2]
    end
    
    subgraph "Databases"
        L[(Orders DB - PostgreSQL)]
        M[(Outbox Table)]
    end
    
    subgraph "External Services"
        N[Payment API]
        O[Inventory API]
        P[Shipping API]
    end
    
    subgraph "Monitoring"
        Q[Prometheus Metrics]
        R[Grafana Dashboard]
    end
    
    A & B & C --> E
    E --> I
    
    I --> F
    I --> G
    I --> H
    
    F --> J1 & J2 & J3
    G --> K1 & K2
    
    J1 & J2 & J3 --> L
    K1 & K2 --> L
    
    J1 & J2 & J3 --> N & O & P
    K1 & K2 --> N & O & P
    
    L -.-> M
    M -.-> D
    
    J1 & J2 & J3 & K1 & K2 --> Q
    Q --> R`,
    keyDecisions: [
      'Kafka para durabilidade e ordenação por partition key (order_id)',
      'Outbox Pattern para garantir exactly-once publishing entre DB e Kafka',
      'Priority queues separadas: 3 workers para VIP, 2 para standard (SLA diferenciado)',
      'Idempotency usando order_id como unique key no PostgreSQL',
      'Circuit Breaker em integrações externas com fallback para retry queue'
    ],
    components: [
      {
        name: 'Priority Router Service',
        description: 'Analisa metadata do pedido (user tier, shipping type) e roteia para fila apropriada. Valida schema antes de publicar.'
      },
      {
        name: 'Order Workers',
        description: 'Consumers idempotentes que processam pedidos. Implementam retry com exponential backoff (3 tentativas com delays: 1s, 5s, 30s).'
      },
      {
        name: 'Outbox Table',
        description: 'Tabela transacional que garante atomicidade entre salvar pedido e publicar evento. Event Relay publica para Kafka.'
      },
      {
        name: 'Dead Letter Queue',
        description: 'Armazena pedidos que falharam após todas as tentativas. Permite investigação manual e reprocessamento.'
      }
    ],
    scalabilityNotes: [
      'Particionamento do Kafka por customer_id para manter ordenação por cliente',
      'Auto-scaling de workers baseado em consumer lag (lag > 1000 → scale up)',
      'Compactação de logs do Kafka para manter apenas último estado por order_id',
      'Read replicas para queries de status sem impactar workers',
      'Retention de 30 dias no Kafka para reprocessamento histórico se necessário'
    ],
    estimatedScale: '100K pedidos/dia, 1K pedidos/minuto no pico, <5s processamento p99'
  }
];
