export interface Position {
  title: string;
  period: string;
  description: string;
  responsibilities: string[];
  techStack: string[];
  isLocked?: boolean;
}

export interface Experience {
  company: string;
  location: string;
  positions: Position[];
}

export const experience: Experience = {
  company: "Segala's Alimentos",
  location: "Gaspar, SC - Brasil",
  positions: [
    {
      title: "Senior Software Developer",
      period: "2027 - Em breve",
      description: "Próxima etapa da carreira - construção de arquiteturas complexas e liderança técnica.",
      responsibilities: [
        "Arquitetura de sistemas distribuídos e escaláveis",
        "Liderança técnica e mentoring de equipe",
        "Tomada de decisões técnicas estratégicas"
      ],
      techStack: [],
      isLocked: true
    },
    {
      title: "Mid-Level Software Developer",
      period: "Set 2025 - Atual (7 meses)",
      description: "Desenvolvo soluções robustas e escaláveis, focando em qualidade e performance.",
      responsibilities: [
        "Entrega de features críticas garantindo código sustentável e manutenível",
        "Contribuição em decisões técnicas de arquitetura e design de sistemas",
        "Code reviews para manter qualidade e padronização do código",
        "Colaboração em infraestrutura e automação usando AWS (Lambda, SQS, ECS, S3) e Terraform"
      ],
      techStack: ["Java 17", "Spring Boot", "AWS", "Terraform", "Docker", "PostgreSQL", "Event-Driven Architecture"]
    },
    {
      title: "Junior Software Developer",
      period: "Ago 2024 - Ago 2025 (1 ano 1 mês)",
      description: "Desenvolvimento de features mais complexas com maior autonomia.",
      responsibilities: [
        "Desenvolvimento de soluções end-to-end, da análise à entrega final",
        "Code reviews e descrição técnica de tarefas",
        "Aprendizado proativo de novas tecnologias para otimizar entregas",
        "Implementação de soluções em AWS (S3, Lambda, CloudWatch, ECS, SQS)"
      ],
      techStack: ["Java 17", "Spring Boot", "AWS", "Terraform", "PostgreSQL", "MySQL"]
    },
    {
      title: "Trainee Software Developer",
      period: "Mar 2024 - Jul 2024 (5 meses)",
      description: "Participação ativa em tarefas de desenvolvimento, fortalecendo fundamentos de engenharia de software.",
      responsibilities: [
        "Contribuição frequente em tarefas do backlog com cadência consistente",
        "Colaboração em práticas de versionamento, code reviews e organização de repositório",
        "Experiência prática com Java, Spring Boot e bancos relacionais"
      ],
      techStack: ["Java 17", "Spring Boot", "PostgreSQL", "MySQL", "Git", "Hibernate"]
    },
    {
      title: "IT Assistant",
      period: "Ago 2023 - Fev 2024 (7 meses)",
      description: "Foco em aprendizado técnico e fundamentos de desenvolvimento.",
      responsibilities: [
        "Concentração em Java, Spring Boot, Hibernate",
        "Práticas de qualidade: TDD, testes unitários, testes de integração",
        "Estudo de design patterns e boas práticas"
      ],
      techStack: ["Java", "Spring Boot", "Hibernate", "TDD", "JUnit", "Mockito"]
    }
  ]
};
