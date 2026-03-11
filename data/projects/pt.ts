export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  problem: string;
  solution: string;
  techStack: string[];
  highlights: string[];
  role: string;
  category: 'iac' | 'event-driven' | 'integration' | 'sync' | 'automation' | 'monolith';
  year: number;
  complexity: 5 | 4 | 3;
}

export const projects: Project[] = [
  {
    slug: 'iac-terraform-aws',
    title: 'IaC - Infraestrutura AWS com Terraform',
    subtitle: 'Infrastructure as Code para provisionamento reproduzível',
    description: 'Implementação de Infrastructure as Code utilizando Terraform para gerenciar recursos AWS de forma versionada e automatizada.',
    problem: 'Provisionar e versionar infraestrutura AWS de forma reproduzível, evitando configurações manuais e facilitando ambientes de staging/produção.',
    solution: 'Implementação de Infrastructure as Code utilizando Terraform para gerenciar recursos AWS (Lambda, SQS, S3, IAM), com estado remoto e pipelines de CI/CD.',
    techStack: ['Terraform', 'AWS Lambda', 'AWS SQS', 'AWS S3', 'AWS IAM', 'AWS CloudWatch', 'CI/CD'],
    highlights: [
      'Módulos Terraform reutilizáveis para componentes comuns',
      'Configuração de Lambdas (runtime, memory, timeout, environment)',
      'Criação e configuração de filas SQS (DLQ, retention, visibility)',
      'Gestão de buckets S3 com políticas de lifecycle',
      'IAM roles e policies seguindo least privilege',
      'Remote state com versionamento',
      'Automação de deploy via CI/CD'
    ],
    role: 'Implementação de módulos Terraform e automação de infraestrutura',
    category: 'iac',
    year: 2025,
    complexity: 5
  },
  {
    slug: 'pipeline-event-driven',
    title: 'Pipeline de Extração Event-Driven',
    subtitle: 'Arquitetura orientada a eventos com Outbox Pattern',
    description: 'Sistema de extração de dados em larga escala utilizando arquitetura event-driven com garantias de entrega.',
    problem: 'Processar e extrair grandes volumes de dados de forma confiável, garantindo que nenhum evento seja perdido mesmo em cenários de falha, e permitindo reprocessamento quando necessário.',
    solution: 'Implementação de arquitetura orientada a eventos utilizando Outbox Pattern para garantia de entrega, com processamento assíncrono através de Publisher/Consumer pattern e balanceamento de carga.',
    techStack: ['Java 17', 'Spring Boot', 'PostgreSQL', 'AWS SQS', 'Event-Driven Architecture', 'Hibernate'],
    highlights: [
      'Outbox Pattern implementado para garantir consistência eventual',
      'Event Relay para publicação confiável de eventos',
      'Publisher/Consumer assíncrono com retry policies',
      'BalanceLines para distribuição de carga de processamento',
      'DataTypes e DataExtractor para transformação de dados',
      'Testes unitários e de integração cobrindo cenários de falha',
      'Observabilidade com logs estruturados e métricas'
    ],
    role: 'Arquitetura da solução, implementação de patterns e testes',
    category: 'event-driven',
    year: 2024,
    complexity: 5
  },
  {
    slug: 'arquitetura-integracao-hibrida',
    title: 'Arquitetura de Integração Híbrida',
    subtitle: 'Integração Cloud + On-Premise com resiliência',
    description: 'Sistema de integração entre soluções cloud-native e sistemas legados on-premise.',
    problem: 'Integrar sistemas legados on-premise com novas soluções cloud-native, garantindo sincronização de dados bidirecional, transformação de formatos e resiliência a falhas de rede.',
    solution: 'Arquitetura em três camadas: Orchestrator (coordenação), Middleware (transformação) e Client On-Premise (sincronização local), com comunicação assíncrona e retry automático.',
    techStack: ['Java 17', 'Spring Boot', 'AWS', 'REST APIs', 'Event-Driven', 'Circuit Breaker'],
    highlights: [
      'Orchestrator centralizando lógica de integração',
      'Middleware para transformação e validação de dados',
      'Client on-premise com sincronização resiliente',
      'Padrão de comunicação assíncrona com dead letter queues',
      'Circuit breaker para evitar sobrecarga em sistemas legados',
      'Monitoramento end-to-end com CloudWatch'
    ],
    role: 'Desenvolvimento end-to-end e code reviews',
    category: 'integration',
    year: 2025,
    complexity: 4
  },
  {
    slug: 'integradora-offline-online',
    title: 'Integradora Offline/Online',
    subtitle: 'Sincronização bidirecional com geração de JSONs',
    description: 'Sistema de sincronização que permite operação offline com sincronização automática quando online.',
    problem: 'Permitir que aplicação funcione offline e sincronize dados com sistema online quando conectado, gerando arquivos JSON otimizados para consumo do frontend.',
    solution: 'Sistema de sincronização bidirecional que detecta mudanças, resolve conflitos e gera arquivos JSON versionados para cache local do frontend.',
    techStack: ['Java 17', 'Spring Boot', 'JSON', 'File System', 'Event-Driven'],
    highlights: [
      'Detecção de mudanças (change data capture)',
      'Resolução de conflitos (conflict resolution strategies)',
      'Geração otimizada de JSONs (compressão, versionamento)',
      'Estratégia de sincronização incremental',
      'Versionamento de dados para cache do frontend',
      'Testes garantindo integridade em cenários de falha'
    ],
    role: 'Desenvolvimento da lógica de sincronização e geração de arquivos',
    category: 'sync',
    year: 2025,
    complexity: 4
  },
  {
    slug: 'sistema-cadastro-ocr',
    title: 'Automação de Cadastro com OCR',
    subtitle: 'Pipeline serverless para extração de documentos',
    description: 'Sistema de cadastro automatizado com extração de dados de documentos via OCR.',
    problem: 'Automatizar o cadastro de clientes através de extração de dados de documentos (CNH, RG), reduzindo tempo de processamento manual e erros de digitação.',
    solution: 'Pipeline serverless usando AWS Lambda para processar imagens armazenadas no S3, extrair informações via OCR e sincronizar com sistema on-premise de forma assíncrona.',
    techStack: ['AWS S3', 'AWS Lambda', 'Java 17', 'Spring Boot', 'Event-Driven', 'OCR'],
    highlights: [
      'Upload de imagens para S3 com trigger automático',
      'Lambda para processamento de documentos',
      'Extração de dados estruturados via OCR',
      'Sincronização assíncrona com cliente on-premise',
      'Retry policy para garantir entrega',
      'Logs e métricas no CloudWatch'
    ],
    role: 'Desenvolvimento da integração S3 → Lambda → API → On-Premise',
    category: 'automation',
    year: 2024,
    complexity: 3
  },
  {
    slug: 'sistema-rca-monolito',
    title: 'Sistema RCA - Monolito Modular',
    subtitle: 'App de vendas, e-commerce e backoffice integrados',
    description: 'Sistema monolítico modular integrando vendas externas (RCA), e-commerce B2B e operações de backoffice.',
    problem: 'Necessidade de um sistema unificado para gerenciar vendas externas (RCA), e-commerce B2B e operações de backoffice, garantindo consistência de dados e performance sob alta carga.',
    solution: 'Arquitetura monolítica modular utilizando Spring Boot com clara separação de contextos (Bounded Contexts), aplicando princípios de Domain-Driven Design para manter coesão e baixo acoplamento entre módulos.',
    techStack: ['Java 17', 'Spring Boot', 'Hibernate', 'PostgreSQL', 'Docker', 'DDD'],
    highlights: [
      'Modularização com Bounded Contexts para separação de domínios',
      'Gerenciamento de transações complexas com Spring @Transactional',
      'Otimização de queries com Hibernate para cenários de alta carga',
      'Testes de integração garantindo comportamento end-to-end',
      'Code reviews e pair programming para manter qualidade do código'
    ],
    role: 'Desenvolvimento de features críticas, code reviews e otimizações de performance',
    category: 'monolith',
    year: 2024,
    complexity: 3
  }
];
