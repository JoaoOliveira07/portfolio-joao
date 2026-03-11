import { Experience } from './pt';

export const experience: Experience = {
  company: "Segala's Alimentos",
  location: "Gaspar, SC - Brazil",
  positions: [
    {
      title: "Mid-Level Software Developer",
      period: "Sep 2025 - Present (7 months)",
      description: "I develop robust and scalable solutions, focusing on quality, performance, and software engineering best practices.",
      responsibilities: [
        "Delivering critical features while ensuring sustainable and maintainable code",
        "Contributing to technical decisions regarding architecture, performance, and system design",
        "Conducting code reviews to maintain code quality and standardization",
        "Collaborating on infrastructure and automation using AWS (Lambda, SQS, ECS, S3) and Terraform",
        "Supporting teammates in technical learning, fostering knowledge sharing and team growth"
      ],
      techStack: ["Java 17", "Spring Boot", "AWS", "Terraform", "Docker", "PostgreSQL", "Event-Driven Architecture"]
    },
    {
      title: "Junior Software Developer",
      period: "Aug 2024 - Aug 2025 (1 year 1 month)",
      description: "Worked on more complex features and projects with greater autonomy. Expanded expertise in cloud computing.",
      responsibilities: [
        "Developing end-to-end solutions, from problem analysis to final delivery",
        "Performing code reviews, contributing to technical task descriptions, and promoting best practices",
        "Proactively learning and applying new technologies to optimize deliveries and improve code quality",
        "Implementing solutions in AWS (S3, Lambda, CloudWatch, ECS, SQS)"
      ],
      techStack: ["Java 17", "Spring Boot", "AWS", "Terraform", "PostgreSQL", "MySQL"]
    },
    {
      title: "Trainee Software Developer",
      period: "Mar 2024 - Jul 2024 (5 months)",
      description: "Actively participated in smaller development tasks, focusing on strengthening software engineering fundamentals.",
      responsibilities: [
        "Frequently contributed to backlog tasks with consistent delivery cadence",
        "Collaborated with the team on version control practices, code reviews, and repository organization",
        "Gained practical experience with Java, Spring Boot, and relational databases"
      ],
      techStack: ["Java 17", "Spring Boot", "PostgreSQL", "MySQL", "Git", "Hibernate"]
    },
    {
      title: "IT Assistant",
      period: "Aug 2023 - Feb 2024 (7 months)",
      description: "Initial role focused on technical learning and development fundamentals.",
      responsibilities: [
        "Concentration on Java, Spring Boot, Hibernate",
        "Quality practices: TDD, unit testing, integration testing",
        "Study of design patterns and best practices"
      ],
      techStack: ["Java", "Spring Boot", "Hibernate", "TDD", "JUnit", "Mockito"]
    }
  ]
};

export type { Experience, Position } from './pt';
