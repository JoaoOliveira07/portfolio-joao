/**
 * Technology Logo Mappings
 * Maps each technology to either an SVG logo or a Lucide icon
 */

export interface TechLogo {
  name: string;
  type: 'svg' | 'lucide';
  path?: string; // For SVG: /logos/java.svg
  icon?: string; // For Lucide: 'Code2'
  displayName: string;
}

export const techLogos: TechLogo[] = [
  // Core Backend
  {
    name: 'Java 17+',
    type: 'svg',
    path: '/logos/java.svg',
    displayName: 'Java'
  },
  {
    name: 'Spring Boot',
    type: 'svg',
    path: '/logos/spring.svg',
    displayName: 'Spring Boot'
  },
  {
    name: 'Hibernate',
    type: 'lucide',
    icon: 'Database',
    displayName: 'Hibernate'
  },
  {
    name: 'PostgreSQL',
    type: 'svg',
    path: '/logos/postgresql.svg',
    displayName: 'PostgreSQL'
  },
  {
    name: 'MySQL',
    type: 'svg',
    path: '/logos/mysql.svg',
    displayName: 'MySQL'
  },

  // Event-Driven & Integration
  {
    name: 'Event-Driven Architecture',
    type: 'lucide',
    icon: 'Workflow',
    displayName: 'Event-Driven'
  },
  {
    name: 'Event Subscription',
    type: 'lucide',
    icon: 'Bell',
    displayName: 'Event Subscription'
  },
  {
    name: 'Outbox Pattern',
    type: 'lucide',
    icon: 'Inbox',
    displayName: 'Outbox Pattern'
  },
  {
    name: 'Event Relay',
    type: 'lucide',
    icon: 'Repeat',
    displayName: 'Event Relay'
  },
  {
    name: 'Publisher/Consumer',
    type: 'lucide',
    icon: 'Network',
    displayName: 'Pub/Sub'
  },
  {
    name: 'AWS SQS',
    type: 'svg',
    path: '/logos/aws-sqs.svg',
    displayName: 'AWS SQS'
  },
  {
    name: 'Asynchronous Integration',
    type: 'lucide',
    icon: 'GitBranch',
    displayName: 'Async Integration'
  },

  // Cloud & Infrastructure
  {
    name: 'AWS S3',
    type: 'svg',
    path: '/logos/aws-s3.svg',
    displayName: 'AWS S3'
  },
  {
    name: 'AWS Lambda',
    type: 'svg',
    path: '/logos/aws-lambda.svg',
    displayName: 'AWS Lambda'
  },
  {
    name: 'AWS ECS',
    type: 'svg',
    path: '/logos/aws-ecs.svg',
    displayName: 'AWS ECS'
  },
  {
    name: 'AWS CloudWatch',
    type: 'svg',
    path: '/logos/aws-cloudwatch.svg',
    displayName: 'CloudWatch'
  },
  {
    name: 'Terraform',
    type: 'svg',
    path: '/logos/terraform.svg',
    displayName: 'Terraform'
  },
  {
    name: 'Docker',
    type: 'svg',
    path: '/logos/docker.svg',
    displayName: 'Docker'
  },
  {
    name: 'Infrastructure as Code',
    type: 'lucide',
    icon: 'FileCode',
    displayName: 'IaC'
  },

  // Quality & Practices
  {
    name: 'GitHub',
    type: 'lucide',
    icon: 'Github',
    displayName: 'GitHub'
  },
  {
    name: 'TDD',
    type: 'lucide',
    icon: 'FlaskConical',
    displayName: 'TDD'
  },
  {
    name: 'JUnit',
    type: 'lucide',
    icon: 'TestTube',
    displayName: 'JUnit'
  },
  {
    name: 'Mockito',
    type: 'lucide',
    icon: 'Component',
    displayName: 'Mockito'
  },
  {
    name: 'Integration Tests',
    type: 'lucide',
    icon: 'Puzzle',
    displayName: 'Integration Tests'
  },
  {
    name: 'Code Review',
    type: 'lucide',
    icon: 'FileSearch',
    displayName: 'Code Review'
  },
  {
    name: 'Clean Code',
    type: 'lucide',
    icon: 'Sparkles',
    displayName: 'Clean Code'
  },
  {
    name: 'SOLID Principles',
    type: 'lucide',
    icon: 'Boxes',
    displayName: 'SOLID'
  },
  {
    name: 'Design Patterns',
    type: 'lucide',
    icon: 'Shapes',
    displayName: 'Design Patterns'
  }
];

/**
 * Get all technologies from the skills.ts file and map them to logos
 */
export const getAllTechLogos = (): TechLogo[] => {
  return techLogos;
};

/**
 * Get logo by technology name
 */
export const getLogoByName = (name: string): TechLogo | undefined => {
  return techLogos.find(logo => logo.name === name);
};
