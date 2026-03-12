export interface EngineeringPractice {
  id: string;
  icon: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  howIApply: string[];
  relatedProjects?: string[];
}

export const engineeringPractices: EngineeringPractice[] = [
  {
    id: 'tdd',
    icon: 'FlaskConical',
    title: 'Test-Driven Development (TDD)',
    shortDescription: 'Testes unitários e de integração como parte do processo de desenvolvimento, não apenas validação',
    longDescription: 'Test-Driven Development é minha abordagem padrão para desenvolvimento. Escrevo testes antes do código de produção, garantindo que cada feature tenha cobertura desde o início. Isso não apenas valida o comportamento, mas também dirige o design do código para ser testável e desacoplado.',
    howIApply: [
      'Red-Green-Refactor: escrevo teste falhando → implemento mínimo necessário → refatoro',
      'Testes de integração com Testcontainers para PostgreSQL, Redis e messaging',
      'Mocks com Mockito apenas quando necessário, prefiro testes de integração sempre que possível',
      'Cobertura de testes focada em cenários críticos e edge cases, não apenas em números',
      'Testes como documentação viva do comportamento esperado do sistema'
    ],
    relatedProjects: ['pipeline-event-driven', 'sistema-rca-monolito']
  },
  {
    id: 'clean-architecture',
    icon: 'Layers',
    title: 'Clean Architecture',
    shortDescription: 'Separação clara de responsabilidades em camadas, mantendo regras de negócio isoladas de frameworks',
    longDescription: 'Aplico princípios de Clean Architecture para manter o código organizado, testável e independente de frameworks. A lógica de negócio fica no núcleo, enquanto detalhes de infraestrutura (banco de dados, APIs externas) ficam nas bordas.',
    howIApply: [
      'Separação em camadas: Domain (entities, use cases) → Application (services) → Infrastructure (repositories, APIs)',
      'Dependency Inversion: módulos internos não dependem de detalhes externos',
      'Use Cases explícitos representando ações de negócio',
      'Entities ricas com regras de negócio encapsuladas',
      'Adapters para isolar comunicação com sistemas externos'
    ],
    relatedProjects: ['sistema-rca-monolito', 'arquitetura-integracao-hibrida']
  },
  {
    id: 'solid',
    icon: 'Box',
    title: 'SOLID Principles',
    shortDescription: 'Princípios fundamentais para código coeso, desacoplado e fácil de manter',
    longDescription: 'SOLID não é apenas teoria, aplico diariamente para tomar decisões de design. Single Responsibility mantém classes focadas, Open/Closed facilita extensão, Liskov garante substituibilidade, Interface Segregation evita dependências desnecessárias, e Dependency Inversion permite testabilidade.',
    howIApply: [
      'Single Responsibility: cada classe tem um único motivo para mudar',
      'Open/Closed: extensível via herança/composição sem modificar código existente',
      'Liskov Substitution: subtipos podem substituir tipos base sem quebrar comportamento',
      'Interface Segregation: interfaces específicas em vez de interfaces gordas',
      'Dependency Inversion: dependo de abstrações, não de implementações concretas'
    ],
    relatedProjects: ['pipeline-event-driven', 'sistema-rca-monolito']
  },
  {
    id: 'event-driven',
    icon: 'Workflow',
    title: 'Event-Driven Architecture',
    shortDescription: 'Sistemas desacoplados que reagem a eventos, permitindo escalabilidade e resiliência',
    longDescription: 'Arquitetura orientada a eventos é minha especialidade. Desenvolvo sistemas que se comunicam via eventos assíncronos, permitindo desacoplamento temporal e espacial. Implemento padrões como Outbox, Event Sourcing, e CQRS quando apropriado.',
    howIApply: [
      'Outbox Pattern para garantir exactly-once delivery em transações distribuídas',
      'Event Relay para publicação confiável de eventos',
      'Idempotência em consumers usando identificadores únicos',
      'Dead Letter Queues para tratamento de falhas',
      'Event versioning para evolução de schema sem breaking changes'
    ],
    relatedProjects: ['pipeline-event-driven', 'arquitetura-integracao-hibrida', 'sistema-cadastro-ocr']
  },
  {
    id: 'ddd',
    icon: 'Database',
    title: 'Domain-Driven Design (DDD)',
    shortDescription: 'Modelagem de software focada no domínio de negócio e linguagem ubíqua',
    longDescription: 'Domain-Driven Design guia minha forma de modelar sistemas complexos. Trabalho próximo ao negócio para entender o domínio, criar uma linguagem ubíqua, e dividir o sistema em Bounded Contexts bem definidos.',
    howIApply: [
      'Bounded Contexts para separar domínios (Sales, Products, Orders, Customers)',
      'Entities e Value Objects com comportamento rico, não apenas data holders',
      'Aggregates para garantir consistência de transações',
      'Domain Events para comunicação entre contextos',
      'Linguagem ubíqua compartilhada entre dev e negócio'
    ],
    relatedProjects: ['sistema-rca-monolito']
  },
  {
    id: 'observability',
    icon: 'Eye',
    title: 'Observability',
    shortDescription: 'Logs estruturados, métricas e tracing para entender o comportamento do sistema em produção',
    longDescription: 'Observabilidade não é opcional, é parte do desenvolvimento. Implemento logs estruturados, métricas customizadas e distributed tracing desde o início, permitindo debug rápido e entendimento profundo do sistema em produção.',
    howIApply: [
      'Logs estruturados em JSON com correlation IDs para rastreamento',
      'Métricas customizadas (Prometheus) para monitorar KPIs de negócio',
      'Distributed Tracing (OpenTelemetry) em sistemas event-driven',
      'Dashboards no Grafana para visualização em tempo real',
      'Alertas proativos baseados em SLOs, não apenas em sintomas'
    ],
    relatedProjects: ['pipeline-event-driven', 'iac-terraform-aws']
  },
  {
    id: 'cicd',
    icon: 'GitBranch',
    title: 'CI/CD',
    shortDescription: 'Integração e deploy contínuos para entregas rápidas e confiáveis',
    longDescription: 'CI/CD não é apenas automação, é cultura de entrega contínua. Pipelines automatizados executam testes, análise de código, e deploy em múltiplos ambientes, garantindo que código funcional chegue rapidamente em produção.',
    howIApply: [
      'Pipelines automatizados: build → test → security scan → deploy',
      'Testes executados em todas as branches antes de merge',
      'Deploy automatizado em staging após merge na main',
      'Rollback automático em caso de falha em health checks',
      'Infrastructure as Code versionado e aplicado via pipeline'
    ],
    relatedProjects: ['iac-terraform-aws']
  },
  {
    id: 'code-review',
    icon: 'GitPullRequest',
    title: 'Code Review',
    shortDescription: 'Revisão colaborativa de código para manter qualidade e compartilhar conhecimento',
    longDescription: 'Code review é momento de aprendizado mútuo e garantia de qualidade. Reviso código focando em design, legibilidade, testes e possíveis bugs. Também recebo feedback que me torna um desenvolvedor melhor.',
    howIApply: [
      'Reviews focados em: design, legibilidade, testes, edge cases e segurança',
      'Feedback construtivo com sugestões, não apenas críticas',
      'Pair programming em features complexas antes do review',
      'Checklist de qualidade: testes passando, sem code smells, documentação atualizada',
      'Compartilhamento de conhecimento sobre padrões e práticas'
    ],
    relatedProjects: ['sistema-rca-monolito', 'arquitetura-integracao-hibrida']
  },
  {
    id: 'ai-assisted',
    icon: 'Sparkles',
    title: 'AI-Assisted Development',
    shortDescription: 'Uso estratégico de IA para acelerar desenvolvimento, code reviews e documentação',
    longDescription: 'Utilizo IA como parceira de desenvolvimento para aumentar produtividade e qualidade. O OpenCode com agents customizados planeja implementações, o GitHub Copilot auxilia code reviews, e Cloud Copilot implementa features complexas mantendo arquitetura e boas práticas.',
    howIApply: [
      'Planejamento com IA: analiso requisitos e crio plano de implementação antes de codar',
      'OpenCode configurado com agents que respeitam a arquitetura do projeto e padrões',
      'GitHub Copilot para code reviews automatizadas e sugestões de melhorias',
      'Cloud Copilot para implementar features completas com contexto do sistema',
      'Documentação e descrição de código automatizadas com IA',
      'Aceleração do ciclo de desenvolvimento mantendo qualidade do código'
    ],
    relatedProjects: ['pipeline-event-driven', 'iac-terraform-aws']
  }
];
