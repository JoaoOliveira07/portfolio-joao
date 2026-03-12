import { Experience } from './pt';

export const experience: Experience = {
  company: "Segala's Alimentos",
  location: "Gaspar, SC - Brazil",
  positions: [
    {
      title: "Senior Software Developer",
      period: "2027 - Coming soon",
      description: "Next step in career - building complex architectures and technical leadership.",
      responsibilities: [
        "Architecture of distributed and scalable systems",
        "Technical leadership and team mentoring",
        "Strategic technical decision making"
      ],
      techStack: [],
      isLocked: true
    },
    {
      title: "Mid-Level Software Developer",
      period: "Sep 2025 - Present (7 months)",
      description: "I develop robust and scalable solutions, focusing on quality and performance.",
      responsibilities: [
        "Delivering critical features while ensuring sustainable and maintainable code",
        "Contributing to technical decisions regarding architecture and system design",
        "Conducting code reviews to maintain code quality and standardization",
        "Collaborating on infrastructure and automation using AWS (Lambda, SQS, ECS, S3) and Terraform"
      ],
      techStack: ["Java 17", "Spring Boot", "AWS", "Terraform", "Docker", "PostgreSQL", "Event-Driven Architecture"]
    },
    {
      title: "Junior Software Developer",
      period: "Aug 2024 - Aug 2025 (1 year 1 month)",
      description: "Development of more complex features with greater autonomy.",
      responsibilities: [
        "Developing end-to-end solutions, from problem analysis to final delivery",
        "Performing code reviews and contributing to technical task descriptions",
        "Proactively learning new technologies to optimize deliveries",
        "Implementing solutions in AWS (S3, Lambda, CloudWatch, ECS, SQS)"
      ],
      techStack: ["Java 17", "Spring Boot", "AWS", "Terraform", "PostgreSQL", "MySQL"]
    },
    {
      title: "Trainee Software Developer",
      period: "Mar 2024 - Jul 2024 (5 months)",
      description: "Actively participated in development tasks, strengthening software engineering fundamentals.",
      responsibilities: [
        "Frequently contributed to backlog tasks with consistent delivery cadence",
        "Collaborated with the team on version control, code reviews and repository organization",
        "Gained practical experience with Java, Spring Boot and relational databases"
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
