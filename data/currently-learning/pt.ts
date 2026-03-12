export interface LearningItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  category: string;
  progress?: number;
  priority: 'high' | 'medium' | 'low';
  resources: string[];
}

export const currentlyLearning: LearningItem[] = [
  {
    id: 'system-design-advanced',
    icon: 'Network',
    title: 'System Design Avançado',
    description: 'Arquiteturas de alta escalabilidade, padrões de microsserviços avançados, e design de sistemas distribuídos complexos.',
    category: 'System Design',
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
    title: 'Sistemas Distribuídos',
    description: 'Consistência eventual, Byzantine Fault Tolerance, consensus algorithms (Raft, Paxos), e partições de dados.',
    category: 'System Design',
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
    title: 'Kafka Avançado',
    description: 'Exactly-once semantics, kafka streams, ksqlDB, e otimizações de performance em clusters de alta escala.',
    category: 'Event-Driven',
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
    title: 'AWS Architecture',
    description: 'Padrões avançados de arquitetura AWS, Well-Architected Framework, e otimização de custos em produção.',
    category: 'Cloud',
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
    title: 'High Scalability',
    description: 'Técnicas de scaling horizontal e vertical, sharding strategies, e otimização de banco de dados para altas cargas.',
    category: 'System Design',
    progress: 65,
    priority: 'medium',
    resources: [
      'The Art of Scalability',
      'High Scalability Blog',
      'Netflix Tech Blog'
    ]
  }
];

export const learningCategories = [
  { id: 'system-design', name: 'System Design', icon: 'Network' },
  { id: 'event-driven', name: 'Event-Driven', icon: 'Activity' },
  { id: 'cloud', name: 'Cloud', icon: 'Cloud' }
];
