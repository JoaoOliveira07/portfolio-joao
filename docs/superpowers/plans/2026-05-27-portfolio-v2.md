# Portfolio V2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver Portfolio V2 with new testimonials, expanded Lab, i18n data consolidation, animated terminal hero, scroll-spy nav, and responsive fixes.

**Architecture:** Next.js 14 App Router with next-intl for i18n. Data lives in `data/` TypeScript files — 5 split `en.ts`/`pt.ts` pairs are merged into single bilingual files using the `{ pt: string; en: string }` inline pattern already established by `data/testimonials.ts`. Components read `field[locale]` instead of importing two files.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion, next-intl, Lucide React, Prisma

---

## File Map

**New files:**
- `components/ui/TerminalWindow.tsx` — animated terminal for hero
- `components/lab/TILSection.tsx` — TIL cards grid
- `hooks/useScrollSpy.ts` — IntersectionObserver scroll tracking
- `data/currently-learning.ts` — merged bilingual (replaces en/pt split)
- `data/engineering-practices.ts` — merged bilingual
- `data/experience.ts` — merged bilingual
- `data/projects.ts` — merged bilingual
- `data/system-design.ts` — merged bilingual

**Modified files:**
- `data/testimonials.ts` — add 2 entries
- `data/challenges.ts` — add 5 entries
- `data/incidents.ts` — add 1 incident
- `components/home/CurrentlyLearning.tsx` — use merged data
- `components/home/EngineeringPractices.tsx` — use merged data
- `components/about/Timeline.tsx` — use merged data
- `components/home/FeaturedProjects.tsx` — use merged data
- `components/home/SystemDesignStudies.tsx` — use merged data
- `components/home/Hero.tsx` — use TerminalWindow
- `components/layout/Navigation.tsx` — scroll spy, remove tablet block, animate mobile
- `components/lab/LabPage.tsx` — add TIL tab
- `components/home/Testimonials.tsx` — line-clamp with expand
- `messages/pt.json` — add lab.backLink
- `messages/en.json` — add lab.backLink

**Deleted after migration:**
- `data/currently-learning/en.ts`, `data/currently-learning/pt.ts`
- `data/engineering-practices/en.ts`, `data/engineering-practices/pt.ts`
- `data/experience/en.ts`, `data/experience/pt.ts`
- `data/projects/en.ts`, `data/projects/pt.ts`
- `data/system-design/en.ts`, `data/system-design/pt.ts`

---

## Task 1: Add 2 New Testimonials

**Files:**
- Modify: `data/testimonials.ts`

- [ ] **Step 1: Add Joao Vargas and Felipe Baer to testimonials array**

Open `data/testimonials.ts`. After the last entry (`fernando-junior`), append:

```ts
  {
    id: 'joao-vargas',
    author: {
      name: 'Joao Vargas',
      role: {
        pt: 'Desenvolvedor | Full-stack | Java, Spring Boot | React.js, Flutter',
        en: 'Developer | Full-stack | Java, Spring Boot | React.js, Flutter'
      },
      company: '',
      linkedin: 'https://www.linkedin.com/in/joaovargas',
    },
    date: {
      pt: '16 de abril de 2026',
      en: 'April 16, 2026'
    },
    relationship: {
      pt: 'Joao trabalhou na mesma equipe que João Paulo',
      en: 'Joao worked on the same team as João Paulo'
    },
    content: {
      pt: 'Tive a sorte de iniciar minha carreira como desenvolvedor ao lado do João Paulo. Desde o começo, sempre ficou evidente a competência e a curiosidade dele na resolução de problemas.\n\nO João foi uma peça fundamental na minha evolução profissional. Como colega e amigo, nunca mediu esforços para ajudar ou explicando algo que eu não entendia ou dedicando horas (às vezes o dia inteiro) para resolver um problema junto. Para ele, o importante sempre foi chegar na melhor solução.\n\nRecomendo o João com total confiança para qualquer empresa. Trabalhar com ele é uma experiência que eleva o nível de quem está ao redor.',
      en: 'I was lucky to start my career as a developer alongside João Paulo. From the start, his competence and curiosity in problem-solving were always evident.\n\nJoão was a fundamental piece in my professional growth. As a colleague and friend, he never held back from helping — whether explaining something I didn\'t understand or dedicating hours (sometimes all day) to solve a problem together. What always mattered to him was reaching the best solution.\n\nI recommend João with full confidence to any company. Working with him is an experience that elevates everyone around.'
    },
    featured: true
  },
  {
    id: 'felipe-baer',
    author: {
      name: 'Felipe Baer',
      role: {
        pt: 'Desenvolvedor Full-Stack | Web, Mobile e PWA',
        en: 'Full-Stack Developer | Web, Mobile and PWA'
      },
      company: '',
      linkedin: 'https://www.linkedin.com/in/felipebaer',
    },
    date: {
      pt: '16 de abril de 2026',
      en: 'April 16, 2026'
    },
    relationship: {
      pt: 'Felipe trabalhou com João Paulo, mas em equipes diferentes',
      en: 'Felipe worked with João Paulo, but on different teams'
    },
    content: {
      pt: 'Tive o prazer de trabalhar com o João e posso afirmar, com total convicção, que seu trabalho é excepcional. Acompanhei de perto sua evolução, assim como sua dedicação e vontade constante de aprender e fazer as coisas acontecerem.\n\nSeu papel sempre foi fundamental, tanto na tomada de decisões quanto na construção de soluções, graças ao seu profundo conhecimento e domínio técnico. Trabalhar com o João é, sem dúvida, uma oportunidade valiosa que todos deveriam ter.',
      en: 'I had the pleasure of working with João and can state, with full conviction, that his work is exceptional. I followed his evolution closely, as well as his dedication and constant drive to learn and make things happen.\n\nHis role was always fundamental, both in decision-making and solution building, thanks to his deep technical knowledge and domain mastery. Working with João is, without a doubt, a valuable opportunity that everyone should have.'
    },
    featured: true
  },
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /Volumes/Externo/GitHub/portfolio-joao && npx tsc --noEmit 2>&1 | head -20
```
Expected: no errors related to testimonials.ts

- [ ] **Step 3: Commit**

```bash
git add data/testimonials.ts
git commit -m "feat: add Joao Vargas and Felipe Baer testimonials"
```

---

## Task 2: Consolidate currently-learning Data

**Files:**
- Create: `data/currently-learning.ts`
- Modify: `components/home/CurrentlyLearning.tsx`
- Delete: `data/currently-learning/en.ts`, `data/currently-learning/pt.ts`

This task establishes the consolidation pattern used in Tasks 3–6.

- [ ] **Step 1: Create merged `data/currently-learning.ts`**

```ts
export interface LearningItem {
  id: string;
  icon: string;
  title: { pt: string; en: string };
  description: { pt: string; en: string };
  category: { pt: string; en: string };
  progress?: number;
  priority: 'high' | 'medium' | 'low';
  resources: string[];
}

export interface LearningCategory {
  id: string;
  name: { pt: string; en: string };
  icon: string;
}

export const currentlyLearning: LearningItem[] = [
  {
    id: 'system-design-advanced',
    icon: 'Network',
    title: { pt: 'System Design Avançado', en: 'Advanced System Design' },
    description: {
      pt: 'Arquiteturas de alta escalabilidade, padrões de microsserviços avançados, e design de sistemas distribuídos complexos.',
      en: 'High scalability architectures, advanced microservices patterns, and complex distributed system design.'
    },
    category: { pt: 'System Design', en: 'System Design' },
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
    title: { pt: 'Sistemas Distribuídos', en: 'Distributed Systems' },
    description: {
      pt: 'Consistência eventual, Byzantine Fault Tolerance, consensus algorithms (Raft, Paxos), e partições de dados.',
      en: 'Eventual consistency, Byzantine Fault Tolerance, consensus algorithms (Raft, Paxos), and data partitioning.'
    },
    category: { pt: 'System Design', en: 'System Design' },
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
    title: { pt: 'Kafka Avançado', en: 'Advanced Kafka' },
    description: {
      pt: 'Exactly-once semantics, kafka streams, ksqlDB, e otimizações de performance em clusters de alta escala.',
      en: 'Exactly-once semantics, Kafka Streams, ksqlDB, and performance optimizations in large-scale clusters.'
    },
    category: { pt: 'Event-Driven', en: 'Event-Driven' },
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
    title: { pt: 'AWS Architecture', en: 'AWS Architecture' },
    description: {
      pt: 'Padrões avançados de arquitetura AWS, Well-Architected Framework, e otimização de custos em produção.',
      en: 'Advanced AWS architecture patterns, Well-Architected Framework, and cost optimization in production.'
    },
    category: { pt: 'Cloud', en: 'Cloud' },
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
    title: { pt: 'High Scalability', en: 'High Scalability' },
    description: {
      pt: 'Técnicas de scaling horizontal e vertical, sharding strategies, e otimização de banco de dados para altas cargas.',
      en: 'Horizontal and vertical scaling techniques, sharding strategies, and database optimization for high loads.'
    },
    category: { pt: 'System Design', en: 'System Design' },
    progress: 65,
    priority: 'medium',
    resources: [
      'The Art of Scalability',
      'High Scalability Blog',
      'Netflix Tech Blog'
    ]
  }
];

export const learningCategories: LearningCategory[] = [
  { id: 'system-design', name: { pt: 'System Design', en: 'System Design' }, icon: 'Network' },
  { id: 'event-driven', name: { pt: 'Event-Driven', en: 'Event-Driven' }, icon: 'Activity' },
  { id: 'cloud', name: { pt: 'Cloud', en: 'Cloud' }, icon: 'Cloud' }
];
```

- [ ] **Step 2: Update `components/home/CurrentlyLearning.tsx` imports and data access**

Replace lines 5–6 (the two locale-split imports):
```ts
// REMOVE these two lines:
import { currentlyLearning as learningPt } from '@/data/currently-learning/pt';
import { currentlyLearning as learningEn } from '@/data/currently-learning/en';

// ADD this single import:
import { currentlyLearning, learningCategories } from '@/data/currently-learning';
```

Replace the locale-based data selection (line ~17):
```ts
// REMOVE:
const learningItems = locale === 'pt' ? learningPt : learningEn;

// ADD:
const learningItems = currentlyLearning;
```

Update all field accesses from flat to `[locale]`:
- `item.title` → `item.title[locale as 'pt' | 'en']`
- `item.description` → `item.description[locale as 'pt' | 'en']`
- `item.category` → `item.category[locale as 'pt' | 'en']`

Update category filter labels (line ~94):
```ts
// REMOVE:
{locale === 'pt' ? filter.labelPt : filter.labelEn}

// ADD (after updating learningCategories to use name.pt/name.en):
{filter.name[locale as 'pt' | 'en']}
```

Also update the priority label (line ~131):
```ts
// REMOVE:
{item.priority === 'high' ? (locale === 'pt' ? 'Alta' : 'High') : (locale === 'pt' ? 'Média' : 'Medium')}

// ADD (this inline string is fine to keep as-is since it's UI logic, not data):
{item.priority === 'high' ? (locale === 'pt' ? 'Alta' : 'High') : (locale === 'pt' ? 'Média' : 'Medium')}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd /Volumes/Externo/GitHub/portfolio-joao && npx tsc --noEmit 2>&1 | head -30
```
Expected: no errors

- [ ] **Step 4: Delete old split files**

```bash
rm /Volumes/Externo/GitHub/portfolio-joao/data/currently-learning/en.ts
rm /Volumes/Externo/GitHub/portfolio-joao/data/currently-learning/pt.ts
rmdir /Volumes/Externo/GitHub/portfolio-joao/data/currently-learning
```

- [ ] **Step 5: Verify TypeScript still compiles after deletion**

```bash
cd /Volumes/Externo/GitHub/portfolio-joao && npx tsc --noEmit 2>&1 | head -20
```
Expected: no errors

- [ ] **Step 6: Commit**

```bash
git add data/currently-learning.ts components/home/CurrentlyLearning.tsx
git rm data/currently-learning/en.ts data/currently-learning/pt.ts
git commit -m "refactor: consolidate currently-learning data into bilingual file"
```

---

## Task 3: Consolidate engineering-practices Data

**Files:**
- Create: `data/engineering-practices.ts`
- Modify: `components/home/EngineeringPractices.tsx`
- Delete: `data/engineering-practices/en.ts`, `data/engineering-practices/pt.ts`

- [ ] **Step 1: Read both source files in full**

```bash
cat /Volumes/Externo/GitHub/portfolio-joao/data/engineering-practices/en.ts
cat /Volumes/Externo/GitHub/portfolio-joao/data/engineering-practices/pt.ts
```

- [ ] **Step 2: Create merged `data/engineering-practices.ts`**

New interface (all localizable string fields become `{ pt: string; en: string }`):

```ts
export interface EngineeringPractice {
  id: string;
  icon: string;
  title: { pt: string; en: string };
  shortDescription: { pt: string; en: string };
  longDescription: { pt: string; en: string };
  howIApply: { pt: string[]; en: string[] };
  relatedProjects?: string[];
}
```

For each entry, merge pt and en content inline. Example for first entry:

```ts
export const engineeringPractices: EngineeringPractice[] = [
  {
    id: 'distributed-systems',
    icon: 'Network',
    title: {
      pt: 'Sistemas Distribuídos',
      en: 'Distributed Systems'
    },
    shortDescription: {
      pt: 'Arquiteturas que funcionam em múltiplas instâncias sem perda de dados',
      en: 'Architectures that work across multiple instances without data loss'
    },
    longDescription: {
      pt: 'Sistemas distribuídos são minha especialidade. Desenvolvo arquiteturas que escalam horizontalmente, mantêm consistência eventual, e resistem a falhas de instância.',
      en: 'Distributed systems are my specialty. I develop architectures that scale horizontally, maintain eventual consistency, and withstand instance failures.'
    },
    howIApply: {
      pt: [
        'Coordenação com Redis/RabbitMQ para sincronização entre instâncias',
        'Pattern Outbox para garantir exactly-once em transações distribuídas',
        'Circuit Breaker para evitar falhas em cascata',
        'Partitionamento de dados por chave de negócio',
        'Consistência eventual com Event Sourcing'
      ],
      en: [
        'Coordination with Redis/RabbitMQ for synchronization between instances',
        'Outbox Pattern to guarantee exactly-once in distributed transactions',
        'Circuit Breaker to prevent cascading failures',
        'Data partitioning by business key',
        'Eventual consistency with Event Sourcing'
      ]
    },
    relatedProjects: ['pipeline-event-driven', 'integradora-offline-online']
  },
  // ... repeat this pattern for all remaining entries from the source files
];
```

Apply this exact pattern to all entries from both source files.

- [ ] **Step 3: Update `components/home/EngineeringPractices.tsx`**

Replace imports (lines 5–6):
```ts
// REMOVE:
import { engineeringPractices as practicesPt } from '@/data/engineering-practices/pt';
import { engineeringPractices as practicesEn } from '@/data/engineering-practices/en';

// ADD:
import { engineeringPractices } from '@/data/engineering-practices';
```

Remove locale-based selection and update all field accesses to use `[locale as 'pt' | 'en']`:
- `practice.title` → `practice.title[locale as 'pt' | 'en']`
- `practice.shortDescription` → `practice.shortDescription[locale as 'pt' | 'en']`
- `practice.longDescription` → `practice.longDescription[locale as 'pt' | 'en']`
- `practice.howIApply` → `practice.howIApply[locale as 'pt' | 'en']`

Remove the line: `const practices = locale === 'pt' ? practicesPt : practicesEn;`
Replace with: `const practices = engineeringPractices;`

Also update `EngineeringPracticeModal` if it receives a `practice` prop and accesses these fields directly — check `components/ui/EngineeringPracticeModal.tsx` and update field access there too.

- [ ] **Step 4: Verify TypeScript compiles**

```bash
cd /Volumes/Externo/GitHub/portfolio-joao && npx tsc --noEmit 2>&1 | head -30
```

- [ ] **Step 5: Delete old files and commit**

```bash
git add data/engineering-practices.ts components/home/EngineeringPractices.tsx
git rm data/engineering-practices/en.ts data/engineering-practices/pt.ts
rmdir /Volumes/Externo/GitHub/portfolio-joao/data/engineering-practices
git commit -m "refactor: consolidate engineering-practices data into bilingual file"
```

---

## Task 4: Consolidate experience Data

**Files:**
- Create: `data/experience.ts`
- Modify: `components/about/Timeline.tsx`
- Delete: `data/experience/en.ts`, `data/experience/pt.ts`

- [ ] **Step 1: Read both source files**

```bash
cat /Volumes/Externo/GitHub/portfolio-joao/data/experience/pt.ts
cat /Volumes/Externo/GitHub/portfolio-joao/data/experience/en.ts
```

- [ ] **Step 2: Create merged `data/experience.ts`**

```ts
export interface Position {
  title: { pt: string; en: string };
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
  location: {
    pt: 'Gaspar, SC - Brasil',
    en: 'Gaspar, SC - Brazil'
  },
  positions: [
    {
      title: { pt: 'Senior Software Developer', en: 'Senior Software Developer' },
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
    // ... repeat for all positions from both source files, merging pt/en inline
  ]
};
```

Apply for all positions from the source files.

- [ ] **Step 3: Update `components/about/Timeline.tsx`**

Replace imports (lines 6–7):
```ts
// REMOVE:
import { experience as experiencePt } from '@/data/experience/pt';
import { experience as experienceEn } from '@/data/experience/en';

// ADD:
import { experience } from '@/data/experience';
```

Remove locale selection:
```ts
// REMOVE:
const experience = locale === 'pt' ? experiencePt : experienceEn;

// ADD (use the imported const directly — rename import if needed):
// the imported `experience` is used directly
```

Update all field accesses:
- `experience.location` → `experience.location[locale as 'pt' | 'en']`
- `position.title` → `position.title[locale as 'pt' | 'en']`
- `position.period` → `position.period[locale as 'pt' | 'en']`
- `position.description` → `position.description[locale as 'pt' | 'en']`
- `position.responsibilities` → `position.responsibilities[locale as 'pt' | 'en']`

- [ ] **Step 4: Verify and commit**

```bash
cd /Volumes/Externo/GitHub/portfolio-joao && npx tsc --noEmit 2>&1 | head -20
git add data/experience.ts components/about/Timeline.tsx
git rm data/experience/en.ts data/experience/pt.ts
rmdir /Volumes/Externo/GitHub/portfolio-joao/data/experience
git commit -m "refactor: consolidate experience data into bilingual file"
```

---

## Task 5: Consolidate projects Data

**Files:**
- Create: `data/projects.ts`
- Modify: `components/home/FeaturedProjects.tsx`, `components/ui/ProjectModal.tsx`, `app/[lang]/projects/page.tsx`, `app/[lang]/projects/[slug]/page.tsx`
- Delete: `data/projects/en.ts`, `data/projects/pt.ts`

- [ ] **Step 1: Read source files fully**

```bash
cat /Volumes/Externo/GitHub/portfolio-joao/data/projects/pt.ts
cat /Volumes/Externo/GitHub/portfolio-joao/data/projects/en.ts
```

- [ ] **Step 2: Create merged `data/projects.ts`**

New interface — localizable string fields become `{ pt: string; en: string }`, localizable arrays become `{ pt: string[]; en: string[] }`:

```ts
export interface Project {
  slug: string;
  title: { pt: string; en: string };
  subtitle: { pt: string; en: string };
  description: { pt: string; en: string };
  problem: { pt: string; en: string };
  solution: { pt: string; en: string };
  techStack: string[];
  highlights: { pt: string[]; en: string[] };
  role: { pt: string; en: string };
  category: string;
  year: number;
  complexity: number;
  diagram: string;
  challenges: { pt: string[]; en: string[] };
  results: { pt: string[]; en: string[] };
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
}
```

For each of the 6 projects, merge pt and en content inline following the pattern. Example (first project structure only — fill in values from source files):

```ts
export const projects: Project[] = [
  {
    slug: 'iac-terraform-aws',
    title: {
      pt: 'IaC - Infraestrutura AWS com Terraform',
      en: 'IaC - AWS Infrastructure with Terraform'
    },
    subtitle: {
      pt: 'Infraestrutura como Código para provisionamento reprodutível',
      en: 'Infrastructure as Code for reproducible provisioning'
    },
    // ... all other fields merged from pt.ts and en.ts
    techStack: ['Terraform', 'AWS Lambda', 'AWS SQS', 'AWS S3', 'AWS IAM', 'AWS CloudWatch', 'CI/CD'],
    category: 'iac',
    year: 2025,
    complexity: 5,
    diagram: `...` // stays flat, same in both locales
  },
  // ... repeat for all 6 projects
];
```

- [ ] **Step 3: Check all components that use project data**

```bash
grep -rn "from.*data/projects" /Volumes/Externo/GitHub/portfolio-joao/components /Volumes/Externo/GitHub/portfolio-joao/app
```

For each file found, replace the dual import + locale selection with single import and `field[locale]` access:

In `components/home/FeaturedProjects.tsx`:
```ts
// REMOVE:
import { projects as projectsPt } from '@/data/projects/pt';
import { projects as projectsEn } from '@/data/projects/en';
import type { Project } from '@/data/projects/pt';
// ... 
const projects = locale === 'pt' ? projectsPt : projectsEn;

// ADD:
import { projects, type Project } from '@/data/projects';
// projects is used directly (no selection needed)
```

Update all `project.title`, `project.subtitle`, `project.description`, etc. to `project.title[locale as 'pt' | 'en']` etc.

Apply same pattern to `ProjectModal.tsx` and the projects pages.

- [ ] **Step 4: Verify TypeScript and commit**

```bash
cd /Volumes/Externo/GitHub/portfolio-joao && npx tsc --noEmit 2>&1 | head -30
git add data/projects.ts
git add components/home/FeaturedProjects.tsx components/ui/ProjectModal.tsx
git add app/\[lang\]/projects/
git rm data/projects/en.ts data/projects/pt.ts
git commit -m "refactor: consolidate projects data into bilingual file"
```

---

## Task 6: Consolidate system-design Data

**Files:**
- Create: `data/system-design.ts`
- Modify: `components/home/SystemDesignStudies.tsx`, `components/ui/SystemDesignModal.tsx`
- Delete: `data/system-design/en.ts`, `data/system-design/pt.ts`

- [ ] **Step 1: Read source files**

```bash
cat /Volumes/Externo/GitHub/portfolio-joao/data/system-design/pt.ts
cat /Volumes/Externo/GitHub/portfolio-joao/data/system-design/en.ts
```

- [ ] **Step 2: Create merged `data/system-design.ts`**

```ts
export interface SystemDesignStudy {
  id: string;
  icon: string;
  title: { pt: string; en: string };
  description: { pt: string; en: string };
  category: { pt: string; en: string };
  diagram: string;
  keyDecisions: { pt: string[]; en: string[] };
  components: {
    name: string;
    description: { pt: string; en: string };
  }[];
  scalabilityNotes: { pt: string[]; en: string[] };
  estimatedScale: string;
}
```

Merge all entries from both source files inline, following the same `{ pt, en }` pattern.

- [ ] **Step 3: Update `components/home/SystemDesignStudies.tsx`**

```ts
// REMOVE:
import { systemDesignStudies as studiesPt } from '@/data/system-design/pt';
import { systemDesignStudies as studiesEn } from '@/data/system-design/en';
// ...
const studies = locale === 'pt' ? studiesPt : studiesEn;

// ADD:
import { systemDesignStudies } from '@/data/system-design';
// use systemDesignStudies directly
```

Update all field accesses with `[locale as 'pt' | 'en']`. Do the same in `SystemDesignModal.tsx`.

- [ ] **Step 4: Verify and commit**

```bash
cd /Volumes/Externo/GitHub/portfolio-joao && npx tsc --noEmit 2>&1 | head -20
git add data/system-design.ts components/home/SystemDesignStudies.tsx components/ui/SystemDesignModal.tsx
git rm data/system-design/en.ts data/system-design/pt.ts
rmdir /Volumes/Externo/GitHub/portfolio-joao/data/system-design
git commit -m "refactor: consolidate system-design data into bilingual file"
```

---

## Task 7: Add 5 New Challenges

**Files:**
- Modify: `data/challenges.ts`

Current last order is 13. New entries use orders 14–18.

- [ ] **Step 1: Append 5 new challenges to `data/challenges.ts`**

Add after the last entry (before the closing `];`):

```ts
  // ─── DEBUG ────────────────────────────────────────────────────────────────
  {
    id: "debug-001",
    type: "debug",
    difficulty: "medium",
    order: 14,
    question: "Um endpoint Spring Boot retorna 200 mas o dado nunca é salvo no banco. Qual é o problema mais provável?",
    context:
      "@Transactional está anotado num método privado da mesma classe. O método público chama o privado internamente.",
    options: [
      "Falta de @Autowired no repositório",
      "@Transactional em método privado — o proxy do Spring não intercepta chamadas internas",
      "O banco está em modo read-only",
      "Falta @EnableTransactionManagement na configuração",
    ],
    correctAnswer: 1,
    explanation:
      "@Transactional funciona via proxy AOP: o Spring cria um proxy em volta do bean. Chamadas de um método público para um método privado da MESMA instância bypassa o proxy — a transação nunca é aberta. Solução: mover o método privado para outro bean, ou usar AspectJ mode ao invés de proxy.",
  },
  {
    id: "debug-002",
    type: "debug",
    difficulty: "hard",
    order: 15,
    question: "Aplicação Java em produção começa a lançar OutOfMemoryError depois de 6 horas. O heap dump mostra um HashMap crescendo indefinidamente. Qual é a causa raiz mais provável?",
    context:
      "O HashMap é usado como cache local. É atualizado a cada request. Nunca é limpo. O sistema recebe ~1000 req/min.",
    options: [
      "Vazamento de memória por falta de weak references nas chaves do HashMap",
      "Cache sem política de eviction — HashMap cresce sem limite até OOM",
      "GC está desabilitado na JVM",
      "O HashMap não é thread-safe e está corrompendo a estrutura interna",
    ],
    correctAnswer: 1,
    explanation:
      "HashMap sem eviction policy em cache é o memory leak mais clássico em Java. A solução correta é usar Caffeine ou Guava Cache com `maximumSize` e `expireAfterWrite`. Se precisar de distribuído, Redis com TTL. Um HashMap crescendo a 1000 req/min vai OOM em horas.",
  },

  // ─── COMPLEXITY ───────────────────────────────────────────────────────────
  {
    id: "complexity-004",
    type: "complexity",
    difficulty: "medium",
    order: 16,
    question: "Uma tabela `orders` tem 5 milhões de linhas. A query `SELECT * FROM orders WHERE status = 'pending' AND created_at > '2024-01-01'` está lenta. Qual índice resolve melhor?",
    context:
      "Status tem baixa cardinalidade (3 valores: pending/completed/cancelled). created_at tem alta cardinalidade. ~5% dos pedidos são pending.",
    options: [
      "INDEX(status)",
      "INDEX(created_at)",
      "INDEX(status, created_at) — composto com status primeiro",
      "INDEX(created_at, status) — composto com created_at primeiro",
    ],
    correctAnswer: 2,
    explanation:
      "Para queries com múltiplos filtros, índice composto com o campo de menor cardinalidade primeiro é mais eficiente como prefixo. status='pending' filtra para ~250k linhas, depois created_at refina. INDEX(created_at, status) seria menos seletivo no prefixo. Regra geral: campo mais restritivo primeiro no composto.",
  },
  {
    id: "complexity-005",
    type: "complexity",
    difficulty: "easy",
    order: 17,
    question: "Qual a complexidade de tempo de busca em um HashMap bem distribuído (sem colisões excessivas)?",
    context:
      "HashMap usa array + lista encadeada (ou árvore em Java 8+). Com função hash ideal, cada bucket tem 1 elemento.",
    options: [
      "O(log n) — precisa navegar uma estrutura de árvore",
      "O(1) — calcula o índice direto via hash",
      "O(n) — pode precisar percorrer todos os elementos",
      "O(n log n) — ordena antes de buscar",
    ],
    correctAnswer: 1,
    explanation:
      "HashMap com boa distribuição oferece O(1) para get/put: calcula hash(key), encontra o bucket diretamente, acessa o elemento. No pior caso (todas as chaves colidem no mesmo bucket) é O(n). Java 8+ converte buckets com >8 elementos para TreeMap (O(log n) worst case). Mas amortizado é O(1).",
  },

  // ─── TRADEOFF ─────────────────────────────────────────────────────────────
  {
    id: "tradeoff-004",
    type: "tradeoff",
    difficulty: "hard",
    order: 18,
    question: "Você precisa implementar idempotência num endpoint POST de pagamentos. O cliente pode reenviar a mesma requisição se não receber resposta. Como garantir que o pagamento seja processado exatamente uma vez?",
    context:
      "Rede instável pode causar timeouts sem que o servidor falhe. O cliente reenvia. Você não pode cobrar duas vezes.",
    options: [
      "Verificar se já existe um registro com os mesmos dados (valor, data, cliente) antes de inserir",
      "Usar idempotency-key no header: salvar no banco antes de processar, retornar resultado anterior se chave já existir",
      "Usar transaction com UNIQUE constraint no valor+data",
      "Rate limiting para bloquear múltiplas requisições do mesmo cliente",
    ],
    correctAnswer: 1,
    explanation:
      "Idempotency Key é o padrão correto: cliente gera um UUID único por tentativa de pagamento e envia no header `Idempotency-Key`. O servidor salva a chave+resultado no banco ANTES de processar. Se a chave já existe, retorna o resultado salvo sem reprocessar. Stripe e outros usam exatamente esse pattern. Verificar por dados do pagamento falha em pagamentos legítimos iguais.",
  },
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /Volumes/Externo/GitHub/portfolio-joao && npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 3: Commit**

```bash
git add data/challenges.ts
git commit -m "feat: add 5 new backend challenges (debug, complexity, tradeoff)"
```

---

## Task 8: Add Memory Leak Incident to On-Call Simulator

**Files:**
- Modify: `data/incidents.ts`

- [ ] **Step 1: Append new incident to `data/incidents.ts`**

Add inside the `INCIDENTS` array after the last entry:

```ts
  {
    id: "memory-leak-cascade",
    title: "Memory Leak em Produção",
    subtitle: "JVM heap crescendo há 6h — sistema prestes a OOM",
    severity: "P2",
    scenario:
      "São 14h30. O Datadog mostra o heap da JVM crescendo continuamente desde as 08h. GC está rodando cada vez mais frequentemente mas não consegue liberar memória. Se continuar assim, OOM em ~2h. Nenhum deploy recente.",
    steps: [
      {
        id: "step-1",
        alert: {
          severity: "warning",
          title: "JVM Heap Usage: 78% e crescendo",
          message: "api-service heap: 3.1GB/4GB. GC pause time: 2.3s (normal: 80ms). Tendência: +200MB/hora.",
          timestamp: "14:31:05",
        },
        logs: [
          "14:30:01 [GC] ParallelGC: 3072MB -> 2986MB (4096MB) pause 2.341s",
          "14:30:45 [GC] ParallelGC: 3198MB -> 3102MB (4096MB) pause 2.891s",
          "14:31:03 [WARN] High memory pressure detected",
          "14:31:05 [ALERT] Heap usage: 78.4% — threshold exceeded",
        ],
        question: "Primeiro passo para diagnosticar memory leak em JVM em produção?",
        options: [
          {
            label: "Reiniciar a aplicação imediatamente para liberar memória",
            isCorrect: false,
            consequence:
              "Reiniciar resolve o sintoma, não a causa. Em 6-8h o leak volta. Você perdeu a janela de diagnóstico — o heap dump virou lixo.",
            metricsDelta: { latencyMs: 120, errorRate: 0.5, throughput: 750 },
          },
          {
            label: "Capturar heap dump com jmap para análise offline",
            isCorrect: true,
            consequence:
              "jmap -dump:format=b,file=heapdump.hprof <pid> captura o estado exato do heap. Você pode analisar com Eclipse MAT sem impactar produção ainda.",
            metricsDelta: { latencyMs: 145, errorRate: 0.6, throughput: 710 },
          },
          {
            label: "Aumentar o heap (-Xmx8g) para ganhar mais tempo",
            isCorrect: false,
            consequence:
              "Aumentar o heap com leak ativo só adia o OOM. Em 4h você vai ter o mesmo problema com mais memória. E o servidor pode não ter 8GB disponível.",
            metricsDelta: { latencyMs: 130, errorRate: 0.5, throughput: 740 },
          },
          {
            label: "Verificar os logs de erro da aplicação",
            isCorrect: false,
            consequence:
              "Logs de erro geralmente não mostram leaks — o problema é silencioso. O heap dump é a fonte de verdade aqui.",
            metricsDelta: { latencyMs: 145, errorRate: 0.6, throughput: 710 },
          },
        ],
        learning:
          "Memory leaks em JVM precisam de heap dump para diagnóstico correto. `jmap -dump:live,format=b,file=heap.hprof <pid>` — o flag `live` força um Full GC antes, mostrando só objetos vivos (mais útil para análise). Eclipse MAT ou VisualVM abrem o .hprof.",
      },
      {
        id: "step-2",
        alert: {
          severity: "critical",
          title: "Heap Dump analisado — objeto suspeito encontrado",
          message: "Eclipse MAT: HashMap interno com 847.293 entradas. Classe: CacheService.localCache. Grows ~1400 entries/min.",
          timestamp: "14:52:18",
        },
        logs: [
          "14:52:00 [MAT] Leak Suspects Report:",
          "14:52:00 [MAT] Problem 1: 1 instance of 'java.util.HashMap'",
          "14:52:00 [MAT]   Shallow heap: 28 bytes",
          "14:52:00 [MAT]   Retained heap: 2.847.293.120 bytes (2.7GB)",
          "14:52:00 [MAT]   Held by: com.app.service.CacheService.localCache",
        ],
        question: "CacheService.localCache é um HashMap estático sem eviction. Como resolver sem downtime?",
        options: [
          {
            label: "Substituir HashMap por Caffeine Cache com maximumSize(10_000) e expireAfterWrite(10, MINUTES)",
            isCorrect: true,
            consequence:
              "Caffeine é o cache mais performático para JVM. Com maximumSize e TTL, o leak é resolvido definitivamente. Deploy precisa ser feito, mas a solução é correta.",
            metricsDelta: { latencyMs: 110, errorRate: 0.3, throughput: 820 },
          },
          {
            label: "Adicionar um scheduled job que limpa o HashMap a cada hora",
            isCorrect: false,
            consequence:
              "Limpeza periódica não resolve o problema — entre limpezas o mapa ainda cresce. E limpeza total a cada hora pode causar cache miss massivo.",
            metricsDelta: { latencyMs: 140, errorRate: 0.5, throughput: 730 },
          },
          {
            label: "Converter para WeakHashMap para permitir GC automático",
            isCorrect: false,
            consequence:
              "WeakHashMap funciona se as CHAVES não têm outras referências fortes. Se a chave (ex: String constante) tem referência forte, o GC nunca coleta — mesmo problema.",
            metricsDelta: { latencyMs: 145, errorRate: 0.6, throughput: 710 },
          },
          {
            label: "Limpar o cache manualmente via endpoint admin agora e fazer o fix amanhã",
            isCorrect: false,
            consequence:
              "Limpar manualmente resolve por agora, mas o leak volta. Em produção, soluções temporárias viram permanentes — o fix real precisa acontecer agora.",
            metricsDelta: { latencyMs: 130, errorRate: 0.4, throughput: 760 },
          },
        ],
        learning:
          "Cache local sem eviction policy é um dos memory leaks mais comuns em Java. Caffeine Cache é o padrão atual: `Caffeine.newBuilder().maximumSize(10_000).expireAfterWrite(10, TimeUnit.MINUTES).build()`. Regra: nunca use HashMap como cache em produção sem política de eviction.",
      },
      {
        id: "step-3",
        alert: {
          severity: "info",
          title: "Fix deployado — heap estabilizando",
          message: "Heap: 1.2GB/4GB. GC pause: 85ms. Caffeine hit rate: 94%. Sistema normalizado.",
          timestamp: "15:47:22",
        },
        logs: [
          "15:45:01 [INFO] CacheService: migrated to Caffeine (maxSize=10000, ttl=10min)",
          "15:45:30 [GC] ParallelGC: 1892MB -> 1201MB (4096MB) pause 312ms",
          "15:46:00 [GC] ParallelGC: 1354MB -> 1198MB (4096MB) pause 89ms",
          "15:47:22 [INFO] Heap stable: 1.2GB. Caffeine hit rate: 94.3%",
        ],
        question: "Sistema normalizado. O que o RCA deve incluir para prevenir recorrência?",
        options: [
          {
            label: "Só registrar 'cache sem eviction causou OOM'",
            isCorrect: false,
            consequence: "Sem ação preventiva, o próximo dev vai criar outro cache sem eviction e o ciclo se repete.",
            metricsDelta: { latencyMs: 85, errorRate: 0.1, throughput: 890 },
          },
          {
            label: "RCA completo + adicionar lint rule ou arquitetura que proíbe HashMap como cache",
            isCorrect: true,
            consequence:
              "RCA com causa raiz, timeline, fix e prevenção. Prevenção técnica: ArchUnit rule proibindo campo estático do tipo HashMap/ConcurrentHashMap em classes @Service, ou um ADR documentando 'use Caffeine para cache local'.",
            metricsDelta: { latencyMs: 85, errorRate: 0.1, throughput: 890 },
          },
          {
            label: "Adicionar alerta de heap > 70% no Datadog",
            isCorrect: false,
            consequence: "Alertas são importantes mas não previnem o problema — só o detectam mais cedo. Sem mudança arquitetural, o próximo cache sem eviction vai gerar o mesmo alerta.",
            metricsDelta: { latencyMs: 85, errorRate: 0.1, throughput: 890 },
          },
          {
            label: "Documentar em Confluence e esperar ninguém ler",
            isCorrect: false,
            consequence: "Documentação sem enforcement é sugestão. Em 3 meses ninguém vai lembrar.",
            metricsDelta: { latencyMs: 85, errorRate: 0.1, throughput: 890 },
          },
        ],
        learning:
          "Prevenção > detecção. Além do alerta (detecta), adicione enforcement técnico (previne). ArchUnit permite escrever testes de arquitetura em Java: `noClasses().that().areAnnotatedWith(Service.class).should().haveOnlyPrivateConstructors()` — adapte para campos HashMap estáticos.",
      },
    ],
    rca: {
      rootCause:
        "CacheService.localCache implementado como HashMap<String, Object> estático sem política de eviction. O cache armazenava resultados de consultas sem TTL ou tamanho máximo, crescendo ~1400 entradas/minuto. Após 6h: 847k entradas, 2.7GB de heap retido.",
      timeline: [
        { time: "08:00", event: "Aplicação iniciada — cache vazio" },
        { time: "08:00", event: "Tráfego começa — cache cresce normalmente" },
        { time: "11:30", event: "Heap atinge 50% — GC começa a notar pressão" },
        { time: "14:31", event: "Alerta Datadog: heap 78%, GC pause 2.3s" },
        { time: "14:52", event: "Heap dump analisado — CacheService.localCache identificado" },
        { time: "15:45", event: "Deploy com Caffeine Cache — heap começa a estabilizar" },
        { time: "15:47", event: "Sistema normalizado: heap 1.2GB, GC pause 85ms" },
      ],
      fix: "Substituição do HashMap por Caffeine Cache com maximumSize(10.000) e expireAfterWrite(10 minutos). Incidente durou 1h16min de diagnóstico + 2min de deploy.",
      prevention:
        "Adicionar ArchUnit rule proibindo HashMap/ConcurrentHashMap como campo estático em @Service classes. ADR documentando padrão de cache: Caffeine para local, Redis para distribuído. Alerta Datadog para heap > 60% com trend crescente.",
    },
  },
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd /Volumes/Externo/GitHub/portfolio-joao && npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 3: Commit**

```bash
git add data/incidents.ts
git commit -m "feat: add memory leak P2 incident to on-call simulator"
```

---

## Task 9: TerminalWindow Component

**Files:**
- Create: `components/ui/TerminalWindow.tsx`

- [ ] **Step 1: Create `components/ui/TerminalWindow.tsx`**

```tsx
'use client';

import { useEffect, useState } from 'react';

const LINES = [
  { text: '$ docker stats --no-stream api-service', delay: 0 },
  { text: 'CONTAINER     CPU    MEM         MEM %', delay: 600 },
  { text: 'api-service   12.3%  412MiB      54%', delay: 900 },
  { text: '', delay: 1200 },
  { text: '$ curl -s /health | jq \'.latency_p99\'', delay: 1600 },
  { text: '"47ms"', delay: 2200 },
  { text: '', delay: 2500 },
  { text: '$ psql -c "EXPLAIN ANALYZE SELECT * FROM orders WHERE status = \'pending\'"', delay: 2900 },
  { text: 'Index Scan using idx_orders_status on orders', delay: 3600 },
  { text: '  (cost=0.43..892.12 rows=1847 width=156)', delay: 3900 },
  { text: 'Planning time: 0.8ms  Execution time: 4.2ms', delay: 4200 },
  { text: '', delay: 4600 },
  { text: '$ kafka-consumer-groups --describe --group payments', delay: 5000 },
  { text: 'TOPIC       PARTITION  LAG   CONSUMER-ID', delay: 5700 },
  { text: 'payments    0          0     api-service-0', delay: 6000 },
  { text: 'payments    1          2     api-service-1', delay: 6200 },
];

const LOOP_DELAY = 3000;
const TOTAL_DURATION = LINES[LINES.length - 1].delay + LOOP_DELAY;

export function TerminalWindow() {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    let timeouts: ReturnType<typeof setTimeout>[] = [];

    const schedule = () => {
      setVisibleCount(0);
      LINES.forEach((line, i) => {
        const t = setTimeout(() => {
          setVisibleCount(i + 1);
        }, line.delay);
        timeouts.push(t);
      });

      const loop = setTimeout(() => {
        timeouts.forEach(clearTimeout);
        timeouts = [];
        schedule();
      }, TOTAL_DURATION);
      timeouts.push(loop);
    };

    schedule();
    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative w-full max-w-lg mx-auto rounded-xl overflow-hidden border border-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.07)]">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-neutral-900 border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
        </div>
        <span className="text-white/30 text-xs font-mono ml-2">api-service — bash</span>
      </div>

      {/* Terminal body */}
      <div className="bg-neutral-950/90 p-5 font-mono text-sm min-h-[320px]">
        {LINES.slice(0, visibleCount).map((line, i) => (
          <div
            key={i}
            className={`leading-relaxed ${
              line.text.startsWith('$')
                ? 'text-emerald-400'
                : line.text === ''
                ? 'h-3'
                : 'text-gray-400'
            }`}
          >
            {line.text}
          </div>
        ))}
        {visibleCount < LINES.length && (
          <span className="inline-block w-2 h-4 bg-emerald-400 animate-pulse ml-0.5 align-middle" />
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd /Volumes/Externo/GitHub/portfolio-joao && npx tsc --noEmit 2>&1 | grep TerminalWindow
```
Expected: no output (no errors)

- [ ] **Step 3: Commit**

```bash
git add components/ui/TerminalWindow.tsx
git commit -m "feat: add animated TerminalWindow component"
```

---

## Task 10: Update Hero to Use TerminalWindow

**Files:**
- Modify: `components/home/Hero.tsx`

- [ ] **Step 1: Replace Unsplash image with TerminalWindow in `components/home/Hero.tsx`**

Add import at the top:
```ts
import { TerminalWindow } from '@/components/ui/TerminalWindow';
```

Remove the `import Image from 'next/image';` if it's only used for the hero image.

Replace the entire `{/* Right - Image */}` block (the `<div className="hidden lg:block relative"...>` section):

```tsx
{/* Right - Terminal */}
<div
  className="hidden lg:block"
  style={{
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(20px)',
    transition: 'opacity 600ms ease-out, transform 600ms ease-out',
    transitionDelay: '200ms',
  }}
>
  <TerminalWindow />
</div>
```

- [ ] **Step 2: Verify TypeScript and check no unused imports**

```bash
cd /Volumes/Externo/GitHub/portfolio-joao && npx tsc --noEmit 2>&1 | grep Hero
```

- [ ] **Step 3: Commit**

```bash
git add components/home/Hero.tsx
git commit -m "feat: replace hero image with animated terminal window"
```

---

## Task 11: useScrollSpy Hook

**Files:**
- Create: `hooks/useScrollSpy.ts`

- [ ] **Step 1: Create `hooks/useScrollSpy.ts`**

```ts
'use client';

import { useEffect, useState } from 'react';

export function useScrollSpy(sectionIds: string[]): string {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] ?? '');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sectionIds]);

  return activeSection;
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd /Volumes/Externo/GitHub/portfolio-joao && npx tsc --noEmit 2>&1 | grep scrollSpy
```

- [ ] **Step 3: Commit**

```bash
git add hooks/useScrollSpy.ts
git commit -m "feat: add useScrollSpy hook with IntersectionObserver"
```

---

## Task 12: Update Navigation

**Files:**
- Modify: `components/layout/Navigation.tsx`

- [ ] **Step 1: Remove tablet nav block, add scroll spy, animate mobile menu**

Replace the full content of `components/layout/Navigation.tsx` with:

```tsx
'use client';

import { useTranslations } from 'next-intl';
import { LanguageToggle } from './LanguageToggle';
import { useState, useRef, useMemo } from 'react';
import { Menu, X, Beaker } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollSpy } from '@/hooks/useScrollSpy';

export function Navigation() {
  const t = useTranslations('nav');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const params = useParams();
  const pathname = usePathname();
  const lang = (params?.lang as string) ?? 'pt';
  const isLabPage = pathname?.includes('/lab');

  const navItems = [
    { href: '#hero', label: t('home'), sectionId: 'hero' },
    { href: '#projects', label: t('projects'), sectionId: 'projects' },
    { href: '#engineering', label: t('engineering'), sectionId: 'engineering' },
    { href: '#techstack', label: t('techstack'), sectionId: 'techstack' },
    { href: '#philosophy', label: t('philosophy'), sectionId: 'philosophy' },
    { href: '#experience', label: t('experience'), sectionId: 'experience' },
    { href: '#testimonials', label: t('testimonials'), sectionId: 'testimonials' },
    { href: '#contact', label: t('contact'), sectionId: 'contact' },
  ];

  const sectionIds = useMemo(() => navItems.map((i) => i.sectionId), []);
  const activeSection = useScrollSpy(isLabPage ? [] : sectionIds);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (isLabPage) return;
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const headerHeight = navRef.current?.offsetHeight || 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const isActive = (sectionId: string) => !isLabPage && activeSection === sectionId;

  return (
    <nav ref={navRef} className="fixed top-0 w-full z-50 bg-neutral-950/80 backdrop-blur-xl border-b border-white/5">
      <div className="flex items-center justify-between px-6 md:px-8 py-5 max-w-7xl mx-auto">
        {/* Logo */}
        <a
          href={isLabPage ? `/${lang}#hero` : '#hero'}
          onClick={(e) => !isLabPage && handleScroll(e, '#hero')}
          className="text-2xl font-black tracking-tighter text-emerald-400"
        >
          JOPES
        </a>

        {/* Desktop Nav — single block, no tablet duplicate */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8 font-medium text-sm">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={isLabPage ? `/${lang}${item.href}` : item.href}
              onClick={(e) => handleScroll(e, item.href)}
              className={`pb-1 border-b-2 transition-colors whitespace-nowrap ${
                isActive(item.sectionId)
                  ? 'text-emerald-400 border-emerald-400'
                  : 'text-gray-400 hover:text-emerald-400 border-transparent hover:border-emerald-400'
              }`}
            >
              {item.label}
            </a>
          ))}
          <Link
            href={`/${lang}/lab`}
            className={`flex items-center gap-1.5 pb-1 border-b-2 transition-colors whitespace-nowrap ${
              isLabPage
                ? 'text-emerald-400 border-emerald-400'
                : 'text-gray-400 hover:text-emerald-400 border-transparent hover:border-emerald-400'
            }`}
          >
            <Beaker className="w-3.5 h-3.5" />
            {t('lab')}
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <LanguageToggle />
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation — animated */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="lg:hidden border-t border-white/5 bg-neutral-900 overflow-hidden"
          >
            <div className="flex flex-col gap-3 px-6 py-4 max-h-[70vh] overflow-y-auto">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={isLabPage ? `/${lang}${item.href}` : item.href}
                  onClick={(e) => { handleScroll(e, item.href); setMobileMenuOpen(false); }}
                  className={`text-sm font-medium py-1 transition-colors ${
                    isActive(item.sectionId) ? 'text-emerald-400' : 'text-gray-400 hover:text-emerald-400'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <Link
                href={`/${lang}/lab`}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-1.5 text-sm font-medium py-1 transition-colors ${
                  isLabPage ? 'text-emerald-400' : 'text-gray-400 hover:text-emerald-400'
                }`}
              >
                <Beaker className="w-3.5 h-3.5" />
                {t('lab')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd /Volumes/Externo/GitHub/portfolio-joao && npx tsc --noEmit 2>&1 | grep Navigation
```

- [ ] **Step 3: Commit**

```bash
git add components/layout/Navigation.tsx
git commit -m "feat: nav scroll spy, remove tablet block, animate mobile menu"
```

---

## Task 13: TIL Section Component

**Files:**
- Create: `components/lab/TILSection.tsx`

- [ ] **Step 1: Create `components/lab/TILSection.tsx`**

```tsx
'use client';

import { useState } from 'react';

interface TILEntry {
  id: string;
  title: string;
  context: string;
  code?: string;
  tag: string;
  tagColor: string;
}

const TIL_ENTRIES: TILEntry[] = [
  {
    id: 'select-for-update',
    title: 'SELECT FOR UPDATE bloqueia a linha, não a tabela',
    context:
      'Em transações concorrentes, SELECT FOR UPDATE adquire um row-level lock. Outras transações que tentarem SELECT FOR UPDATE na mesma linha vão esperar — mas leituras normais (sem FOR UPDATE) não bloqueiam.',
    code: `-- Transação 1: bloqueia o pedido
SELECT * FROM orders WHERE id = 42 FOR UPDATE;

-- Transação 2: espera...
SELECT * FROM orders WHERE id = 42 FOR UPDATE; -- blocked

-- Transação 2 (read sem lock): passa livre
SELECT * FROM orders WHERE id = 42; -- ok, não bloqueia`,
    tag: 'DB',
    tagColor: 'bg-blue-500/20 text-blue-400',
  },
  {
    id: 'exists-vs-inner-join',
    title: 'EXISTS pode ser mais eficiente que INNER JOIN',
    context:
      'Quando você só precisa checar existência (não precisa dos dados da tabela relacionada), EXISTS para na primeira linha encontrada. INNER JOIN processa todas as linhas correspondentes antes de retornar.',
    code: `-- Mais eficiente quando só precisa checar existência
SELECT * FROM customers c
WHERE EXISTS (
  SELECT 1 FROM orders o WHERE o.customer_id = c.id
);

-- Inner join processa todas as linhas matching
SELECT DISTINCT c.* FROM customers c
INNER JOIN orders o ON o.customer_id = c.id;`,
    tag: 'DB',
    tagColor: 'bg-blue-500/20 text-blue-400',
  },
  {
    id: 'connection-pool',
    title: 'maxPoolSize maior não significa mais throughput',
    context:
      'Pool com 200 conexões pode ter performance PIOR que pool com 10. O banco tem um limite de conexões simultâneas eficientes. Acima disso, você tem context switching overhead e o banco se torna o gargalo. Regra do HikariCP: (núcleos_CPU × 2) + spindle_count.',
    code: `# HikariCP recomendado para PostgreSQL em 4 cores
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.connection-timeout=30000`,
    tag: 'JVM',
    tagColor: 'bg-purple-500/20 text-purple-400',
  },
  {
    id: 'transactional-private',
    title: '@Transactional em método privado silenciosamente falha',
    context:
      'Spring cria um proxy em volta do bean para gerenciar transações. Chamadas a métodos privados da mesma classe bypassam o proxy — a anotação é ignorada sem erro. Esse é um dos bugs mais difíceis de debugar.',
    code: `@Service
class PaymentService {
    // PROBLEMA: chamada interna bypassa o proxy
    public void process() {
        savePayment(); // transação NÃO criada
    }
    
    @Transactional // ignorado silenciosamente
    private void savePayment() { ... }
}

// SOLUÇÃO: extrair para outro bean
@Service
class PaymentPersistenceService {
    @Transactional // funciona — chamada via proxy
    public void savePayment() { ... }
}`,
    tag: 'JVM',
    tagColor: 'bg-purple-500/20 text-purple-400',
  },
  {
    id: 'kafka-rebalance',
    title: 'Kafka rebalance pausa todos os consumers do grupo',
    context:
      'Quando um consumer entra ou sai do grupo (incluindo restart), o Kafka pausa TODO o consumer group para redistribuir as partições. Durante o rebalance nenhuma mensagem é processada. Use Cooperative Sticky Assignor para minimizar o impacto.',
    code: `# application.properties — minimize rebalance impact
spring.kafka.consumer.properties.partition.assignment.strategy=\\
  org.apache.kafka.clients.consumer.CooperativeStickyAssignor

# Aumentar session.timeout para evitar rebalance por GC pause
spring.kafka.consumer.properties.session.timeout.ms=45000
spring.kafka.consumer.properties.heartbeat.interval.ms=15000`,
    tag: 'Kafka',
    tagColor: 'bg-orange-500/20 text-orange-400',
  },
  {
    id: 'retry-thundering-herd',
    title: 'Retry sem backoff cria thundering herd',
    context:
      'Se 1000 clientes recebem 429 e todos retentam em 1s, você gera 1000 requisições simultâneas — provavelmente pior que o problema original. Exponential backoff com jitter distribui os retries no tempo.',
    code: `// Retry com exponential backoff + jitter
long delay = (long) (Math.pow(2, attempt) * 1000 + Math.random() * 1000);
Thread.sleep(delay);

// Exemplo de delays:
// attempt 1: ~2s + jitter (1-3s)
// attempt 2: ~4s + jitter (3-5s)  
// attempt 3: ~8s + jitter (7-9s)`,
    tag: 'API',
    tagColor: 'bg-emerald-500/20 text-emerald-400',
  },
];

interface TILCardProps {
  entry: TILEntry;
}

function TILCard({ entry }: TILCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-white font-semibold text-sm leading-snug">{entry.title}</h3>
        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded flex-shrink-0 ${entry.tagColor}`}>
          {entry.tag}
        </span>
      </div>

      <p className="text-white/50 text-xs leading-relaxed">{entry.context}</p>

      {entry.code && (
        <>
          {expanded ? (
            <pre className="bg-neutral-950 rounded-lg p-4 text-xs text-emerald-300/80 overflow-x-auto leading-relaxed font-mono">
              <code>{entry.code}</code>
            </pre>
          ) : null}
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-white/30 hover:text-emerald-400 transition-colors text-left"
          >
            {expanded ? '↑ Esconder código' : '↓ Ver código'}
          </button>
        </>
      )}
    </div>
  );
}

export function TILSection() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {TIL_ENTRIES.map((entry) => (
          <TILCard key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd /Volumes/Externo/GitHub/portfolio-joao && npx tsc --noEmit 2>&1 | grep TIL
```

- [ ] **Step 3: Commit**

```bash
git add components/lab/TILSection.tsx
git commit -m "feat: add TIL section with 6 backend insights"
```

---

## Task 14: Add TIL Tab to LabPage

**Files:**
- Modify: `components/lab/LabPage.tsx`

- [ ] **Step 1: Update `components/lab/LabPage.tsx` to add TIL tab**

Add import at top:
```ts
import { TILSection } from '@/components/lab/TILSection';
import { BookOpen } from 'lucide-react';
```

Add `'til'` to the `Tab` type:
```ts
type Tab = "dashboard" | "incident" | "challenges" | "til";
```

Add new entry to `TABS` array after `challenges`:
```ts
  {
    id: "til",
    label: "TIL",
    icon: <BookOpen className="w-4 h-4" />,
    badge: "NEW",
  },
```

Add render block after the challenges block:
```tsx
{activeTab === "til" && (
  <div className="max-w-7xl mx-auto">
    <TILSection />
  </div>
)}
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd /Volumes/Externo/GitHub/portfolio-joao && npx tsc --noEmit 2>&1 | grep -i lab
```

- [ ] **Step 3: Commit**

```bash
git add components/lab/LabPage.tsx
git commit -m "feat: add TIL tab to Lab page"
```

---

## Task 15: Responsiveness Fixes

**Files:**
- Modify: `components/home/Hero.tsx`, `components/lab/LabPage.tsx`, `components/home/Testimonials.tsx`, `messages/pt.json`, `messages/en.json`

- [ ] **Step 1: Fix Hero h1 font size for small screens**

In `components/home/Hero.tsx`, find the `<h1>` className and change:
```ts
// BEFORE:
className="text-5xl md:text-6xl lg:text-7xl font-extrabold ..."

// AFTER:
className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold ..."
```

- [ ] **Step 2: Fix Lab tab bar overflow on mobile**

In `components/lab/LabPage.tsx`, find the tab bar wrapper div (the one with `bg-white/[0.03] border border-white/[0.06] rounded-xl p-1 w-fit`) and update:
```ts
// BEFORE:
className="flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-xl p-1 w-fit"

// AFTER:
className="flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-xl p-1 w-fit max-w-full overflow-x-auto"
```

Also wrap the tab bar in a scrollable container:
```tsx
<div className="max-w-7xl mx-auto px-6 mb-2 overflow-x-auto">
  <div className="flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-xl p-1 w-fit min-w-max">
    {/* tabs */}
  </div>
</div>
```

- [ ] **Step 3: Add line-clamp with expand to Testimonials**

In `components/home/Testimonials.tsx`, add `useState` import and expand state per testimonial. Replace the content paragraph:

```tsx
'use client';

import { useLocale } from 'next-intl';
import Image from 'next/image';
import { Linkedin } from 'lucide-react';
import { testimonials } from '@/data/testimonials';
import Link from 'next/link';
import { useState } from 'react';

export function Testimonials() {
  const locale = useLocale();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const getRole = (testimonial: typeof testimonials[0]) => testimonial.author.role[locale as 'pt' | 'en'];
  const getContent = (testimonial: typeof testimonials[0]) => testimonial.content[locale as 'pt' | 'en'];

  const toggleExpand = (id: string) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <section className="py-20 md:py-32" id="testimonials">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-emerald-400 font-bold tracking-widest text-xs uppercase">
            {locale === 'pt' ? 'Depoimentos' : 'Testimonials'}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mt-3 md:mt-4">
            {locale === 'pt' ? 'Recomendações' : 'Recommendations'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-neutral-900/50 p-5 md:p-8 rounded-xl hover:shadow-lg transition-all border border-white/10 hover:border-emerald-500/30"
            >
              <div className="text-emerald-400 mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>

              <div>
                <p className={`text-gray-400 leading-relaxed mb-2 text-sm whitespace-pre-line ${!expanded[testimonial.id] ? 'line-clamp-6' : ''}`}>
                  {getContent(testimonial)}
                </p>
                <button
                  onClick={() => toggleExpand(testimonial.id)}
                  className="text-xs text-white/30 hover:text-emerald-400 transition-colors mb-4"
                >
                  {expanded[testimonial.id]
                    ? (locale === 'pt' ? '↑ Ver menos' : '↑ See less')
                    : (locale === 'pt' ? '↓ Ver mais' : '↓ See more')}
                </button>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-neutral-800 flex-shrink-0">
                  {testimonial.author.avatar ? (
                    <Image src={testimonial.author.avatar} alt={testimonial.author.name} width={48} height={48} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-emerald-900 flex items-center justify-center text-emerald-400 font-bold">
                      {testimonial.author.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-white truncate">{testimonial.author.name}</h4>
                  <p className="text-sm text-gray-500 truncate">{getRole(testimonial)}</p>
                </div>
                {testimonial.author.linkedin && (
                  <Link href={testimonial.author.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-emerald-400 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Add lab.backLink i18n keys**

In `messages/pt.json`, add inside the root object:
```json
"lab": {
  "backLink": "Voltar ao portfólio"
}
```

In `messages/en.json`, add:
```json
"lab": {
  "backLink": "Back to portfolio"
}
```

In `components/lab/LabPage.tsx`, replace the hardcoded "Voltar ao portfólio":
```tsx
// Add at top of component:
const t = useTranslations('lab');

// Replace the text:
{t('backLink')}
```

Also add `import { useTranslations } from 'next-intl';` if not already imported.

- [ ] **Step 5: Verify TypeScript**

```bash
cd /Volumes/Externo/GitHub/portfolio-joao && npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 6: Commit**

```bash
git add components/home/Hero.tsx components/lab/LabPage.tsx
git add components/home/Testimonials.tsx
git add messages/pt.json messages/en.json
git commit -m "fix: responsiveness — hero h1, lab tabs overflow, testimonials expand, i18n backlink"
```

---

## Self-Review

**Spec coverage:**
- ✅ i18n consolidation (5 data domains) — Tasks 2–6
- ✅ 2 new testimonials — Task 1
- ✅ +5 challenges — Task 7
- ✅ +1 incident (memory leak) — Task 8
- ✅ TIL section with 6 entries — Tasks 13–14
- ✅ TerminalWindow hero — Tasks 9–10
- ✅ Nav scroll spy — Task 11–12
- ✅ Nav tablet block removal — Task 12
- ✅ Nav mobile animation — Task 12
- ✅ Hero h1 responsive — Task 15
- ✅ Lab tabs overflow — Task 15
- ✅ Testimonials line-clamp expand — Task 15
- ✅ lab.backLink i18n — Task 15

**Placeholder scan:** All steps contain actual code. No TBDs. Data-only tasks (Tasks 3–6 Step 2) require the engineer to read source files and apply the explicitly shown interface pattern — not a placeholder.

**Type consistency:** `LearningItem`, `EngineeringPractice`, `Position`, `Experience`, `Project`, `SystemDesignStudy` interfaces defined in their respective tasks. Components access `field[locale as 'pt' | 'en']` consistently throughout.
