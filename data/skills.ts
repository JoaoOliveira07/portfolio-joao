export interface Competency {
  icon: string;
  title: {
    pt: string;
    en: string;
  };
  description: {
    pt: string;
    en: string;
  };
  skills: string[];
}

export const competencies: Competency[] = [
  {
    icon: 'Workflow',
    title: {
      pt: 'Java & Spring Boot',
      en: 'Java & Spring Boot'
    },
    description: {
      pt: 'Desenvolvimento com Java 17+, Spring Boot, JPA e Hibernate. APIs RESTful e aplicações robustas.',
      en: 'Development with Java 17+, Spring Boot, JPA and Hibernate. RESTful APIs and robust applications.'
    },
    skills: ['Java 17+', 'Spring Boot', 'JPA', 'Hibernate', 'REST APIs', 'Microservices']
  },
  {
    icon: 'FlaskConical',
    title: {
      pt: 'Banco de Dados',
      en: 'Database'
    },
    description: {
      pt: 'PostgreSQL e MySQL. Modelagem de dados, queries otimizadas e migrations.',
      en: 'PostgreSQL and MySQL. Data modeling, optimized queries and migrations.'
    },
    skills: ['PostgreSQL', 'MySQL', 'Data Modeling', 'SQL', 'Migrations']
  },
  {
    icon: 'Cloud',
    title: {
      pt: 'Git & Controle de Versão',
      en: 'Git & Version Control'
    },
    description: {
      pt: 'Git, GitHub e GitHub Actions. Code reviews e boas práticas de branching.',
      en: 'Git, GitHub and GitHub Actions. Code reviews and branching best practices.'
    },
    skills: ['Git', 'GitHub', 'GitHub Actions', 'Code Review', 'Branching']
  },
  {
    icon: 'ShieldCheck',
    title: {
      pt: 'Quality & Testing',
      en: 'Quality & Testing'
    },
    description: {
      pt: 'Testes unitários com JUnit, código limpo e princípios SOLID.',
      en: 'Unit testing with JUnit, clean code and SOLID principles.'
    },
    skills: ['JUnit', 'TDD', 'SOLID', 'Clean Code', 'Unit Tests']
  }
];
