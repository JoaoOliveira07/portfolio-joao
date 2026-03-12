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
    description: 'Distributed URL shortening system with high availability and low latency. Supports millions of redirects per day with analytics tracking.',
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
      'Base62 encoding for unique short codes (7 characters = 3.5 trillion URLs)',
      'Redis cache with 24h TTL, reducing 95% of database queries',
      'PostgreSQL read replicas to distribute redirect load',
      'Kafka for asynchronous analytics without impacting redirect latency',
      'Rate limiting per IP (100 req/min) to prevent abuse'
    ],
    components: [
      {
        name: 'URL Generation Service',
        description: 'Generates unique codes using distributed counter + Base62. Validates URLs and stores mapping in PostgreSQL.'
      },
      {
        name: 'Redirect Service',
        description: 'Resolves short codes first in Redis, fallback to PostgreSQL replicas. Returns HTTP 301 (permanent) or 302 (temporary).'
      },
      {
        name: 'Analytics Service',
        description: 'Processes Kafka events (clicks, user-agent, geolocation) and stores aggregates in S3 for later analysis.'
      },
      {
        name: 'Redis Cluster',
        description: 'Distributed cache with replication. Stores shortCode → longURL mapping with configurable TTL.'
      }
    ],
    scalabilityNotes: [
      'PostgreSQL sharding by shortCode hash when reaching 100M URLs',
      'CDN in front of Load Balancer for popular URL redirects',
      'Horizontal auto-scaling of API servers based on CPU and latency',
      'Kafka partitioning by shortCode for analytics parallelization',
      'Automatic expiry of URLs not accessed in 2 years (retention policy)'
    ],
    estimatedScale: '10M redirects/day, 1M new URLs/month, <50ms p99 latency'
  },
  {
    id: 'ecommerce-platform',
    icon: 'ShoppingCart',
    title: 'E-commerce Platform',
    description: 'Scalable e-commerce platform with microservices architecture, supporting product catalog, cart, checkout, and order processing.',
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
      'Independent microservices with dedicated databases (Database per Service)',
      'Event-driven with RabbitMQ for asynchronous communication between services',
      'Saga Pattern for distributed transactions (Order → Payment → Inventory)',
      'Redis for shopping cart (temporary session with 7-day TTL)',
      'CQRS in Product Catalog: write model optimized for admin, read model for customers'
    ],
    components: [
      {
        name: 'Product Catalog Service',
        description: 'Manages catalog with full-text search (Elasticsearch), filters, categories. Aggressive caching of popular products.'
      },
      {
        name: 'Cart Service',
        description: 'Temporary cart in Redis with JSON serialization. Syncs with inventory to validate availability.'
      },
      {
        name: 'Order Service',
        description: 'Orchestrates checkout process via Saga. Persists orders and publishes events to downstream services.'
      },
      {
        name: 'Payment Service',
        description: 'Integrates with Stripe using idempotency keys. Implements retry with exponential backoff and circuit breaker.'
      },
      {
        name: 'Inventory Service',
        description: 'Stock control with temporary reservations (15min). Optimistic concurrency with versioning.'
      }
    ],
    scalabilityNotes: [
      'Elasticsearch for scalable product search (sharding by category)',
      'PostgreSQL read replicas for reporting and analytics queries',
      'CDN for product images and static assets',
      'Differentiated rate limiting: 1000 req/min for browsing, 100 req/min for checkout',
      'Dead Letter Queues for payment failures with manual retry'
    ],
    estimatedScale: '50K orders/day, 2M products, 100K concurrent users at peak'
  },
  {
    id: 'order-queue-system',
    icon: 'ListOrdered',
    title: 'Order Processing Queue',
    description: 'Queue system for order processing with prioritization, automatic retry, and dead letter queue. Guarantees exactly-once processing.',
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
      'Kafka for durability and ordering by partition key (order_id)',
      'Outbox Pattern to guarantee exactly-once publishing between DB and Kafka',
      'Separate priority queues: 3 workers for VIP, 2 for standard (differentiated SLA)',
      'Idempotency using order_id as unique key in PostgreSQL',
      'Circuit Breaker in external integrations with fallback to retry queue'
    ],
    components: [
      {
        name: 'Priority Router Service',
        description: 'Analyzes order metadata (user tier, shipping type) and routes to appropriate queue. Validates schema before publishing.'
      },
      {
        name: 'Order Workers',
        description: 'Idempotent consumers that process orders. Implement retry with exponential backoff (3 attempts with delays: 1s, 5s, 30s).'
      },
      {
        name: 'Outbox Table',
        description: 'Transactional table that guarantees atomicity between saving order and publishing event. Event Relay publishes to Kafka.'
      },
      {
        name: 'Dead Letter Queue',
        description: 'Stores orders that failed after all retry attempts. Allows manual investigation and reprocessing.'
      }
    ],
    scalabilityNotes: [
      'Kafka partitioning by customer_id to maintain ordering per customer',
      'Worker auto-scaling based on consumer lag (lag > 1000 → scale up)',
      'Kafka log compaction to keep only last state per order_id',
      'Read replicas for status queries without impacting workers',
      '30-day retention in Kafka for historical reprocessing if needed'
    ],
    estimatedScale: '100K orders/day, 1K orders/minute at peak, <5s p99 processing time'
  }
];
