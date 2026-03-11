export interface SkillCategory {
  id: string;
  title: {
    pt: string;
    en: string;
  };
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'core',
    title: {
      pt: 'Core Backend',
      en: 'Core Backend'
    },
    skills: ['Java 17+', 'Spring Boot', 'Hibernate', 'PostgreSQL', 'MySQL']
  },
  {
    id: 'eventDriven',
    title: {
      pt: 'Event-Driven & Integration',
      en: 'Event-Driven & Integration'
    },
    skills: [
      'Event-Driven Architecture',
      'Event Subscription',
      'Outbox Pattern',
      'Event Relay',
      'Publisher/Consumer',
      'AWS SQS',
      'Asynchronous Integration'
    ]
  },
  {
    id: 'cloud',
    title: {
      pt: 'Cloud & Infrastructure',
      en: 'Cloud & Infrastructure'
    },
    skills: [
      'AWS S3',
      'AWS Lambda',
      'AWS ECS',
      'AWS SQS',
      'AWS CloudWatch',
      'Terraform',
      'Docker',
      'Infrastructure as Code'
    ]
  },
  {
    id: 'quality',
    title: {
      pt: 'Quality & Practices',
      en: 'Quality & Practices'
    },
    skills: [
      'TDD',
      'JUnit',
      'Mockito',
      'Integration Tests',
      'Code Review',
      'Clean Code',
      'SOLID Principles',
      'Design Patterns'
    ]
  }
];

export interface Competency {
  icon: string; // Nome do ícone Lucide
  title: {
    pt: string;
    en: string;
  };
  description: {
    pt: string;
    en: string;
  };
}

export const competencies: Competency[] = [
  {
    icon: 'Workflow',
    title: {
      pt: 'Event-Driven Architecture',
      en: 'Event-Driven Architecture'
    },
    description: {
      pt: 'Especialista em arquiteturas orientadas a eventos, Outbox Pattern, Event Relay e integrações assíncronas desacopladas',
      en: 'Expert in event-driven architectures, Outbox Pattern, Event Relay and decoupled asynchronous integrations'
    }
  },
  {
    icon: 'FlaskConical',
    title: {
      pt: 'Quality & Testing',
      en: 'Quality & Testing'
    },
    description: {
      pt: 'TDD, testes unitários e de integração como parte do processo de desenvolvimento, não apenas validação',
      en: 'TDD, unit and integration testing as part of the development process, not just validation'
    }
  },
  {
    icon: 'Cloud',
    title: {
      pt: 'Cloud & IaC',
      en: 'Cloud & IaC'
    },
    description: {
      pt: 'Experiência crescente em AWS (Lambda, ECS, SQS, S3) e automação com Terraform',
      en: 'Growing experience in AWS (Lambda, ECS, SQS, S3) and automation with Terraform'
    }
  },
  {
    icon: 'ShieldCheck',
    title: {
      pt: 'Code Quality',
      en: 'Code Quality'
    },
    description: {
      pt: 'Code reviews, clean code, SOLID principles e mentoria técnica',
      en: 'Code reviews, clean code, SOLID principles and technical mentoring'
    }
  }
];
