export interface Position {
  title: string;
  period: { pt: string; en: string };
  description: { pt: string; en: string };
  responsibilities: { pt: string[]; en: string[] };
  techStack: string[];
  isLocked?: boolean;
}

export interface Experience {
  company: string;
  location: { pt: string; en: string };
  positions: Position[];
}

export const experience: Experience = {
  company: "Segala's Alimentos",
  location: { pt: 'Gaspar, SC - Brasil', en: 'Gaspar, SC - Brazil' },
  positions: [
    {
      title: 'Senior Software Developer',
      period: { pt: '2027 - Em breve', en: '2027 - Coming soon' },
      description: {
        pt: 'Próxima etapa da carreira - construção de arquiteturas complexas e liderança técnica.',
        en: 'Next step in career - building complex architectures and technical leadership.'
      },
      responsibilities: {
        pt: [
          'Arquitetura de sistemas distribuídos e escaláveis',
          'Liderança técnica e mentoring de equipe',
          'Tomada de decisões técnicas estratégicas'
        ],
        en: [
          'Architecture of distributed and scalable systems',
          'Technical leadership and team mentoring',
          'Strategic technical decision making'
        ]
      },
      techStack: [],
      isLocked: true
    },
    {
      title: 'Mid-Level Software Developer',
      period: { pt: 'Set 2025 - Atual (7 meses)', en: 'Sep 2025 - Present (7 months)' },
      description: {
        pt: 'Desenvolvo soluções robustas e escaláveis, focando em qualidade e performance.',
        en: 'I develop robust and scalable solutions, focusing on quality and performance.'
      },
      responsibilities: {
        pt: [
          'Entrega de features críticas garantindo código sustentável e manutenível',
          'Contribuição em decisões técnicas de arquitetura e design de sistemas',
          'Code reviews para manter qualidade e padronização do código',
          'Colaboração em infraestrutura e automação usando AWS (Lambda, SQS, ECS, S3) e Terraform'
        ],
        en: [
          'Delivering critical features while ensuring sustainable and maintainable code',
          'Contributing to technical decisions regarding architecture and system design',
          'Conducting code reviews to maintain code quality and standardization',
          'Collaborating on infrastructure and automation using AWS (Lambda, SQS, ECS, S3) and Terraform'
        ]
      },
      techStack: ['Java 17', 'Spring Boot', 'AWS', 'Terraform', 'Docker', 'PostgreSQL', 'Event-Driven Architecture']
    },
    {
      title: 'Junior Software Developer',
      period: { pt: 'Ago 2024 - Ago 2025 (1 ano 1 mês)', en: 'Aug 2024 - Aug 2025 (1 year 1 month)' },
      description: {
        pt: 'Desenvolvimento de features mais complexas com maior autonomia.',
        en: 'Development of more complex features with greater autonomy.'
      },
      responsibilities: {
        pt: [
          'Desenvolvimento de soluções end-to-end, da análise à entrega final',
          'Code reviews e descrição técnica de tarefas',
          'Aprendizado proativo de novas tecnologias para otimizar entregas',
          'Implementação de soluções em AWS (S3, Lambda, CloudWatch, ECS, SQS)'
        ],
        en: [
          'Developing end-to-end solutions, from problem analysis to final delivery',
          'Performing code reviews and contributing to technical task descriptions',
          'Proactively learning new technologies to optimize deliveries',
          'Implementing solutions in AWS (S3, Lambda, CloudWatch, ECS, SQS)'
        ]
      },
      techStack: ['Java 17', 'Spring Boot', 'AWS', 'Terraform', 'PostgreSQL', 'MySQL']
    },
    {
      title: 'Trainee Software Developer',
      period: { pt: 'Mar 2024 - Jul 2024 (5 meses)', en: 'Mar 2024 - Jul 2024 (5 months)' },
      description: {
        pt: 'Participação ativa em tarefas de desenvolvimento, fortalecendo fundamentos de engenharia de software.',
        en: 'Actively participated in development tasks, strengthening software engineering fundamentals.'
      },
      responsibilities: {
        pt: [
          'Contribuição frequente em tarefas do backlog com cadência consistente',
          'Colaboração em práticas de versionamento, code reviews e organização de repositório',
          'Experiência prática com Java, Spring Boot e bancos relacionais'
        ],
        en: [
          'Frequently contributed to backlog tasks with consistent delivery cadence',
          'Collaborated with the team on version control, code reviews and repository organization',
          'Gained practical experience with Java, Spring Boot and relational databases'
        ]
      },
      techStack: ['Java 17', 'Spring Boot', 'PostgreSQL', 'MySQL', 'Git', 'Hibernate']
    },
    {
      title: 'IT Assistant',
      period: { pt: 'Ago 2023 - Fev 2024 (7 meses)', en: 'Aug 2023 - Feb 2024 (7 months)' },
      description: {
        pt: 'Foco em aprendizado técnico e fundamentos de desenvolvimento.',
        en: 'Initial role focused on technical learning and development fundamentals.'
      },
      responsibilities: {
        pt: [
          'Concentração em Java, Spring Boot, Hibernate',
          'Práticas de qualidade: TDD, testes unitários, testes de integração',
          'Estudo de design patterns e boas práticas'
        ],
        en: [
          'Concentration on Java, Spring Boot, Hibernate',
          'Quality practices: TDD, unit testing, integration testing',
          'Study of design patterns and best practices'
        ]
      },
      techStack: ['Java', 'Spring Boot', 'Hibernate', 'TDD', 'JUnit', 'Mockito']
    }
  ]
};
