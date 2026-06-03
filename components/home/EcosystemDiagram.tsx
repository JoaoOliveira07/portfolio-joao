'use client';

import { useLocale } from 'next-intl';
import { MermaidDiagram } from '@/components/ui/MermaidDiagram';

const ECOSYSTEM_DIAGRAM = `graph TB
    subgraph TF ["☁  Infra Terraform · AWS"]
        direction TB
        API["E-commerce Backend<br/>Spring Boot · Java 17<br/>Layered + DDD · Multi-tenant"]

        API --> BO["Backoffice<br/>Next.js · Admin + AI Chat"]
        API --> EF["E-commerce Front<br/>React · SPA B2B · PWA"]
        API --> RF["Register Flow<br/>Flutter · Onboarding Multi-step"]
        API --> SM["Field Sales Mobile<br/>Flutter · Offline-First"]

        OI["Offline Integrator<br/>Spring Boot 3.5"] -->|"sync datasets"| SM

        IP["Integration Platform<br/>Client · Middleware · Orchestrator"] <-->|"SQS"| API
        IP -->|"SQS"| OI
        API -->|"primary DB"| OI

        Oracle[("Oracle Winthor<br/>ERP On-premise")] <-->|"JDBC"| IP
    end

    style API fill:#01926D,color:#fff
    style IP fill:#7c3aed,color:#fff
    style OI fill:#01926D,color:#fff
    style Oracle fill:#374151,color:#fff
    style TF fill:#0d1f0d,stroke:#10b981,stroke-width:2px,color:#10b981`;

export function EcosystemDiagram() {
  const locale = useLocale() as 'pt' | 'en';

  return (
    <section className="py-20 md:py-32" id="ecosystem">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        <div className="text-center mb-10 md:mb-16">
          <span className="text-emerald-400 font-bold tracking-widest text-xs uppercase">
            {locale === 'pt' ? 'Visão Geral' : 'Overview'}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mt-3 md:mt-4">
            {locale === 'pt' ? 'Arquitetura do Ecossistema' : 'Ecosystem Architecture'}
          </h2>
          <p className="mt-4 text-gray-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            {locale === 'pt'
              ? 'Como os 8 projetos se conectam — do backend central até os 4 clientes distintos, passando pela plataforma de integração com o ERP legado e toda a infra provisionada via Terraform.'
              : 'How all 8 projects connect — from the central backend to 4 distinct clients, through the integration platform with the legacy ERP, all provisioned via Terraform.'}
          </p>
        </div>

        <div className="bg-neutral-900/50 border border-white/10 rounded-xl p-4 md:p-6 overflow-x-auto">
          <MermaidDiagram chart={ECOSYSTEM_DIAGRAM} />
        </div>
      </div>
    </section>
  );
}
