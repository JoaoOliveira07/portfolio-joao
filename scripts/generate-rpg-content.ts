import { writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { projects } from '../data/projects';
import { experience } from '../data/experience';
import { testimonials } from '../data/testimonials';
import { competencies } from '../data/skills';
import { currentlyLearning } from '../data/currently-learning';

// Gera public/rpg/assets/portfolio/data.json a partir de data/*.ts — fonte única de verdade
// pro conteúdo do modo RPG (JOPES.EXE, em public/rpg). Nunca editar o JSON à mão.
// Mesmo formato do scripts/sync-portfolio.mjs do repositório jopes-rpg.

// slug → screenshot otimizado em public/rpg/assets/portfolio/img/<slug>.jpg
const IMG: Record<string, string> = {
  'segalas-ecommerce': 'monolito', 'ecommerce-front': 'ecommerce1', 'salesforce-mobile': 'salesforce', backoffice: 'backoffice1',
  'register-flow': 'autocadastro1', 'integration-platform': 'integration', 'offline-integrator': 'offline', 'infra-terraform': 'infra1',
  commitclock: 'commitclock1', 'kira-semi-joias': 'kira5', 'finance-dashboard': 'finance',
};

const data = {
  syncedAt: new Date().toISOString(),
  projects: projects.map((p) => ({
    ...p,
    diagram: undefined,
    image: IMG[p.slug] ? `assets/portfolio/img/${p.slug}.jpg` : null,
    imageSrc: IMG[p.slug] ?? null,
  })),
  experience,
  testimonials,
  skills: competencies,
  learning: currentlyLearning,
};

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const outDir = path.join(rootDir, 'public', 'rpg', 'assets', 'portfolio');
mkdirSync(outDir, { recursive: true });
writeFileSync(path.join(outDir, 'data.json'), JSON.stringify(data, null, 1));

console.log(`✓ public/rpg/assets/portfolio/data.json gerado — ${data.projects.length} projetos, ${data.testimonials.length} depoimentos.`);
