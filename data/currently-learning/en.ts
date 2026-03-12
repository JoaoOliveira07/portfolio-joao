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
    title: 'Advanced System Design',
    description: 'High scalability architectures, advanced microservices patterns, and complex distributed system design.',
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
    title: 'Distributed Systems',
    description: 'Eventual consistency, Byzantine Fault Tolerance, consensus algorithms (Raft, Paxos), and data partitioning.',
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
    title: 'Advanced Kafka',
    description: 'Exactly-once semantics, Kafka Streams, ksqlDB, and performance optimizations in large-scale clusters.',
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
    description: 'Advanced AWS architecture patterns, Well-Architected Framework, and cost optimization in production.',
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
    description: 'Horizontal and vertical scaling techniques, sharding strategies, and database optimization for high loads.',
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
