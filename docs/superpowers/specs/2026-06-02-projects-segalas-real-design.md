# Portfolio Projects — Real Segalas Work

**Date:** 2026-06-02
**Status:** Approved

## Goal

Replace the 6 fictional/generic portfolio projects in `data/projects.ts` with real work performed at Segalas across 12 internal repositories. Generate fictional SVG illustrations representing each project domain (no real screenshots, no proprietary data, no NDA risk).

## Scope

- Rewrite `data/projects.ts` with 6 bilingual entries (PT/EN) grouped from 12 real repos.
- Create 6 custom SVG illustrations in `public/images/projects/`.
- Update `projectImages` map in `components/home/FeaturedProjects.tsx`.
- Update mermaid `diagram` fields to reflect real architectures.
- No screenshots of real Segalas systems. Only abstract/illustrative SVG.

Out of scope: changes to `Project` interface, modal layout, translations beyond what already exists, project view counting API.

## Project Mapping (12 repos → 6 cards)

| Slug | Title (PT) | Title (EN) | Repos | Category | Year | Complexity |
|------|-----------|-----------|-------|----------|------|-----------|
| `ecommerce-b2b-platform` | Plataforma E-commerce B2B | B2B E-commerce Platform | segalas-ecommerce, segalas-ecommerce-front, segs-backoffice | monolith | 2026 | 5 |
| `mobile-sales-flutter` | App Força de Vendas Offline-First | Offline-First Sales App | salesforce-mobile | sync | 2026 | 5 |
| `erp-integration-platform` | Plataforma de Integração ERP | ERP Integration Platform | integration-client, integration-middleware, integration-orchestrator | integration | 2026 | 5 |
| `offline-data-pipeline` | Pipeline de Snapshots Offline | Offline Snapshots Pipeline | offline-integrator, offline-integrator-infra | event-driven | 2026 | 4 |
| `iac-aws-terraform` | IaC AWS Multi-Ambiente | Multi-Environment AWS IaC | infra-terraform | iac | 2025 | 4 |
| `serverless-lambdas` | Lambdas Serverless | Serverless Lambdas | request-customer-data-receita, request-product-media | automation | 2025 | 3 |

## Content Per Project

Each entry keeps the existing `Project` interface fields: `slug`, `title`, `subtitle`, `description`, `problem`, `solution`, `techStack`, `highlights`, `role`, `category`, `year`, `complexity`, `diagram`, `challenges`, `results`, `technicalDecisions`.

`role` field will embed real metrics (commit count, contributor rank) for credibility:

> Example: "2º maior contributor de 25+ devs · 1.235 commits — backend principal do e-commerce B2B"

### 1. ecommerce-b2b-platform

- **Stack:** Java 17, Spring Boot, PostgreSQL, AWS SQS, AWS ECS, JWT, React, TypeScript
- **Problem:** B2B order portal needed unified backend serving web e-commerce, backoffice, and mobile field sales — bidirectional sync with legacy Oracle ERP.
- **Highlights:** approval workflow (ECOM-2699), product catalog with dynamic sections (MIX, unavailable, history), customer positivation endpoints, stock validation as non-blocking warning with KG calc, customer search by phone (ECOM-2759), media support (ECOM-2786).
- **Diagram:** mermaid showing Mobile/Web/Backoffice → Spring Boot REST → PostgreSQL ↔ SQS ↔ ERP Winthor.

### 2. mobile-sales-flutter

- **Stack:** Flutter, Dart, BLoC/Cubit, Drift (SQLite, 58 migrations), GetIt, GoRouter, WorkManager, Datadog, Sentry, Firebase
- **Problem:** Field reps need 100% offline operation with reliable sync when connectivity returns.
- **Highlights:** SyncEngine + WorkManager retry, MIX product section with persisted filters, customer pin via swipe (flutter_slidable), positivation indicators (today/week/month), ConnectivityCubit reactive to app lifecycle, unavailable products with "similars" banner, stock warning with KG calc.
- **Diagram:** Clean architecture layered (presentation → domain → infra) with offline ↔ online sync flow.

### 3. erp-integration-platform

- **Stack:** Java 17, Spring Boot, Spring Integration, Oracle (Winthor), PostgreSQL, AWS SQS
- **Problem:** Bridge between legacy Oracle ERP and modern cloud platform — bidirectional, resilient, normalized contracts.
- **Highlights:** Owner técnico (1º/14 contributors) do integration-client; extractors for products/customers/prices/stock/purchase history; order consumer with cancellation error handling (ORDER_NOT_CANCELLABLE, ORDER_NOT_UPDATABLE); middleware transformers and routers; orchestrator coordinating scheduled jobs.
- **Diagram:** Oracle Winthor ↔ integration-client ↔ middleware ↔ orchestrator ↔ SQS ↔ downstream services.

### 4. offline-data-pipeline

- **Stack:** Java, Spring Boot, PostgreSQL, AWS S3, AWS SQS, AWS ECS, Prometheus v3, Grafana, Terraform
- **Problem:** Mobile app needs versioned data snapshots (products, customers, prices, stock) to operate offline.
- **Highlights:** 2º contributor on both repos; snapshot generator stored in S3; customers domain with purchase history (MIX); unavailable products propagation; pin/positivation preferences; Prometheus v3 setup from scratch including v3-breaking-change fix; bastion host configuration for secure DB access.
- **Diagram:** ERP → integration-client → offline-integrator → S3 snapshots → mobile Drift DB.

### 5. iac-aws-terraform

- **Stack:** Terraform (HCL), AWS (ECS, RDS, SQS, ALB, VPC, IAM, S3, CloudWatch, EC2), GitHub Actions, Remote State (S3 + DynamoDB)
- **Problem:** Reproducible provisioning across dev/homolog/prod for all platform microservices.
- **Highlights:** ECS task definitions, Security Groups, IAM least-privilege roles, SQS queues for new flows, environment-specific variables, support for offline-integrator and integration-client provisioning.
- **Diagram:** Terraform modules → AWS multi-environment cloud topology.

### 6. serverless-lambdas

- **Stack:** Node.js, AWS Lambda, AWS API Gateway, AWS S3, AWS SQS, GitHub Actions, Serverless Framework
- **Problem:** Need lightweight serverless functions for external API enrichment (Receita Federal) and async media processing.
- **Highlights:** Owner técnico (1º/4) do request-customer-data-receita — CNPJ/CPF lookup with error handling (invalid CNPJ, closed company); criação do zero do request-product-media (ECOM-2786) com GitHub Actions CI/CD; S3-triggered media URL generation.
- **Diagram:** API Gateway → Lambda → Receita API + S3 → media pipeline.

## SVG Illustrations

Six custom illustrations, 1280×720 (16:9), saved to `public/images/projects/`.

**Visual language:**
- Background: `#0A0A0A` (matches portfolio dark theme)
- Primary accent: `#01926D` (emerald — already brand color)
- Secondary accent: `#A855F7` (purple — already in mermaid diagrams)
- Text: `#FFFFFF` / `#9CA3AF` (neutral-400)
- Geometric, flat, no photos, no logos requiring license

**Per-project concepts:**

1. `ecommerce_b2b.svg` — layered card stack representing catalog + cart icon + warehouse boxes in background.
2. `mobile_sales.svg` — phone outline with map pin + offline cloud-slash icon + sync arrows.
3. `erp_integration.svg` — legacy server rack on left, cloud cluster on right, bidirectional message arrows between.
4. `offline_pipeline.svg` — database snapshot icon → S3 bucket → mobile device stack with version tags.
5. `iac_terraform.svg` — modular blocks/cubes arranged in grid representing reusable infra modules + AWS region indicators.
6. `serverless_lambda.svg` — lambda (λ) symbol prominent + event arrows triggering from S3 and API Gateway.

Filenames lowercase snake_case to match existing convention.

## File Changes

1. `data/projects.ts` — full rewrite of the `projects` array. 6 entries, ~600-700 LOC total.
2. `public/images/projects/ecommerce_b2b.svg` — new
3. `public/images/projects/mobile_sales.svg` — new
4. `public/images/projects/erp_integration.svg` — new
5. `public/images/projects/offline_pipeline.svg` — new
6. `public/images/projects/iac_terraform.svg` — new
7. `public/images/projects/serverless_lambda.svg` — new
8. `components/home/FeaturedProjects.tsx` — update `projectImages` map (lines 11-18) to new slugs/paths.
9. Old PNGs in `public/images/projects/` may remain (no broken refs) or be deleted. Decision: delete to keep folder clean (`*_v1_1.png` files).

## Risk / Constraints

- Project view counters in DB (`/api/projects/views`) keyed by old slugs may show stale data for renamed projects. Acceptable — views are non-critical.
- Translation keys in `messages/{pt,en}.json` are static (`projects.title`, `projects.viewDetails`) — no per-project keys to migrate.
- No type changes to `Project` interface — implementation is data-only + assets.

## Acceptance Criteria

- [ ] `data/projects.ts` compiles, exports 6 valid `Project` entries.
- [ ] `npm run build` succeeds.
- [ ] All 6 SVGs render correctly in card hero (`<Image>` component with `fill`).
- [ ] No broken image refs.
- [ ] Bilingual content present in all required fields.
- [ ] Project modal opens and renders mermaid diagrams without error.
