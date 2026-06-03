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
      pt: 'Backend & APIs',
      en: 'Backend & APIs'
    },
    description: {
      pt: 'Java 17 + Spring Boot e Spring Integration. APIs REST, JPA/Hibernate e mensageria assíncrona.',
      en: 'Java 17 + Spring Boot and Spring Integration. REST APIs, JPA/Hibernate and async messaging.'
    },
    skills: ['Java 17', 'Spring Boot', 'Spring Integration', 'JPA / Hibernate', 'REST APIs', 'Node.js (Lambda)']
  },
  {
    icon: 'Layers',
    title: {
      pt: 'Mobile & Frontend',
      en: 'Mobile & Frontend'
    },
    description: {
      pt: 'Flutter offline-first com Clean Architecture + BLoC. React/Next.js com TypeScript, Vite e PWA.',
      en: 'Offline-first Flutter with Clean Architecture + BLoC. React/Next.js with TypeScript, Vite and PWA.'
    },
    skills: ['Flutter', 'Dart', 'BLoC / Cubit', 'React', 'Next.js', 'TypeScript', 'Vite', 'Tailwind CSS']
  },
  {
    icon: 'Cloud',
    title: {
      pt: 'Cloud & IaC',
      en: 'Cloud & IaC'
    },
    description: {
      pt: 'AWS (ECS, RDS, SQS, S3, Lambda, ALB, VPC, IAM) provisionada via Terraform. CI/CD em GitHub Actions.',
      en: 'AWS (ECS, RDS, SQS, S3, Lambda, ALB, VPC, IAM) provisioned via Terraform. CI/CD on GitHub Actions.'
    },
    skills: ['AWS ECS', 'AWS RDS', 'AWS SQS', 'AWS S3', 'AWS Lambda', 'Terraform', 'Docker', 'GitHub Actions']
  },
  {
    icon: 'Activity',
    title: {
      pt: 'Dados & Observabilidade',
      en: 'Data & Observability'
    },
    description: {
      pt: 'PostgreSQL + Oracle Winthor (ERP legado). Stack Prometheus v3 + Grafana, Datadog, Sentry, CloudWatch.',
      en: 'PostgreSQL + Oracle Winthor (legacy ERP). Prometheus v3 + Grafana stack, Datadog, Sentry, CloudWatch.'
    },
    skills: ['PostgreSQL', 'Oracle', 'Prometheus v3', 'Grafana', 'Datadog', 'Sentry', 'CloudWatch']
  }
];
