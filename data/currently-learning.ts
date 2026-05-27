export interface LearningItem {
  id: string;
  icon: string;
  title: { pt: string; en: string };
  description: { pt: string; en: string };
  category: { pt: string; en: string };
  progress?: number;
  priority: 'high' | 'medium' | 'low';
  resources: string[];
}

export interface LearningCategory {
  id: string;
  name: { pt: string; en: string };
  icon: string;
}

export const currentlyLearning: LearningItem[] = [
  {
    id: 'system-design-advanced',
    icon: 'Network',
    title: { pt: 'System Design Avançado', en: 'Advanced System Design' },
    description: {
      pt: 'Arquiteturas de alta escalabilidade, padrões de microsserviços avançados, e design de sistemas distribuídos complexos.',
      en: 'High scalability architectures, advanced microservices patterns, and complex distributed system design.'
    },
    category: { pt: 'System Design', en: 'System Design' },
    progress: 75,
    priority: 'high',
    resources: [
      'DDIA (Designing Data-Intensive Applications)',
      'System Design Interview',
      'AWS Well-Architected Framework'
    ]
  },
  {
    id: 'distributed-systems',
    icon: 'Server',
    title: { pt: 'Sistemas Distribuídos', en: 'Distributed Systems' },
    description: {
      pt: 'Consistência eventual, Byzantine Fault Tolerance, consensus algorithms (Raft, Paxos), e partições de dados.',
      en: 'Eventual consistency, Byzantine Fault Tolerance, consensus algorithms (Raft, Paxos), and data partitioning.'
    },
    category: { pt: 'System Design', en: 'System Design' },
    progress: 60,
    priority: 'high',
    resources: [
      'MIT 6.824 Distributed Systems',
      'Google SRE Book',
      'Patterns of Distributed Systems'
    ]
  },
  {
    id: 'advanced-kafka',
    icon: 'Activity',
    title: { pt: 'Kafka Avançado', en: 'Advanced Kafka' },
    description: {
      pt: 'Exactly-once semantics, kafka streams, ksqlDB, e otimizações de performance em clusters de alta escala.',
      en: 'Exactly-once semantics, Kafka Streams, ksqlDB, and performance optimizations in large-scale clusters.'
    },
    category: { pt: 'Event-Driven', en: 'Event-Driven' },
    progress: 70,
    priority: 'high',
    resources: [
      'Kafka: The Definitive Guide',
      'Confluent Kafka Documentation',
      'Kafka Summit Talks'
    ]
  },
  {
    id: 'aws-architecture',
    icon: 'Cloud',
    title: { pt: 'AWS Architecture', en: 'AWS Architecture' },
    description: {
      pt: 'Padrões avançados de arquitetura AWS, Well-Architected Framework, e otimização de custos em produção.',
      en: 'Advanced AWS architecture patterns, Well-Architected Framework, and cost optimization in production.'
    },
    category: { pt: 'Cloud', en: 'Cloud' },
    progress: 80,
    priority: 'medium',
    resources: [
      'AWS Solutions Architect Professional',
      'AWS Well-Architected Framework',
      'AWS Architecture Center'
    ]
  },
  {
    id: 'high-scalability',
    icon: 'TrendingUp',
    title: { pt: 'High Scalability', en: 'High Scalability' },
    description: {
      pt: 'Técnicas de scaling horizontal e vertical, sharding strategies, e otimização de banco de dados para altas cargas.',
      en: 'Horizontal and vertical scaling techniques, sharding strategies, and database optimization for high loads.'
    },
    category: { pt: 'System Design', en: 'System Design' },
    progress: 65,
    priority: 'medium',
    resources: [
      'The Art of Scalability',
      'High Scalability Blog',
      'Netflix Tech Blog'
    ]
  }
];

export const learningCategories: LearningCategory[] = [
  { id: 'system-design', name: { pt: 'System Design', en: 'System Design' }, icon: 'Network' },
  { id: 'event-driven', name: { pt: 'Event-Driven', en: 'Event-Driven' }, icon: 'Activity' },
  { id: 'cloud', name: { pt: 'Cloud', en: 'Cloud' }, icon: 'Cloud' }
];
