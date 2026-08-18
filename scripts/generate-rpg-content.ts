import { writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { projects } from '../data/projects';
import { testimonials } from '../data/testimonials';
import { experience } from '../data/experience';
import { competencies } from '../data/skills';

// Gera public/rpg/content.json a partir de data/*.ts — fonte única de verdade
// pro conteúdo do modo RPG (public/rpg/index.html). Nunca editar o JSON à mão.

// Mapeamento explícito slug -> código/tipo do prédio "PROJETOS" no jogo.
// Os 8 projetos profissionais originais do jogo, na mesma ordem/categoria.
const PROJECT_SLUG_TO_CODE: { slug: string; code: string; type: string }[] = [
  { slug: 'segalas-ecommerce', code: 'P/001', type: 'MONOLITH' },
  { slug: 'ecommerce-front', code: 'P/002', type: 'FRONTEND' },
  { slug: 'salesforce-mobile', code: 'P/003', type: 'MOBILE' },
  { slug: 'backoffice', code: 'P/004', type: 'ADMIN' },
  { slug: 'register-flow', code: 'P/005', type: 'MOBILE' },
  { slug: 'integration-platform', code: 'P/006', type: 'INTEGRATION' },
  { slug: 'offline-integrator', code: 'P/007', type: 'EVENT-DRIVEN' },
  { slug: 'infra-terraform', code: 'P/008', type: 'IAC' },
];

const gameProjects = PROJECT_SLUG_TO_CODE.map(({ slug, code, type }) => {
  const project = projects.find((p) => p.slug === slug);
  if (!project) {
    throw new Error(`generate-rpg-content: projeto com slug "${slug}" não encontrado em data/projects.ts`);
  }
  return {
    code,
    type,
    year: String(project.year),
    title: project.title.pt,
    body: project.description.pt,
    tags: project.techStack,
  };
});

// Depoimentos dos NPCs vêm 1:1 de data/testimonials.ts por id (já eram cópia literal disso).
const NPC_KEY_TO_TESTIMONIAL_ID: Record<string, string> = {
  kauan: 'kauan-curbani',
  vargas: 'joao-vargas',
  fernando: 'fernando-junior',
};

const gameTestimonials = Object.entries(NPC_KEY_TO_TESTIMONIAL_ID).map(([npcKey, id]) => {
  const testimonial = testimonials.find((t) => t.id === id);
  if (!testimonial) {
    throw new Error(`generate-rpg-content: depoimento com id "${id}" não encontrado em data/testimonials.ts`);
  }
  return {
    npcKey,
    sub: testimonial.author.role.pt,
    answer: testimonial.content.pt,
  };
});

// Timeline "SOBRE MIM" reflete só a trajetória oficial na Segalas (data/experience.ts):
// exclui a posição futura/trancada (isLocked) e o histórico pré-Segalas que só existia no jogo.
const experienceTimeline = experience.positions
  .filter((position) => !position.isLocked)
  .map((position) => ({
    date: position.period.pt.toUpperCase(),
    role: position.title,
    company: `${experience.company} · ${experience.location.pt}`,
  }));

const techGrid = competencies.map((competency) => ({
  cat: competency.title.pt,
  items: competency.skills,
}));

const content = {
  projects: gameProjects,
  testimonials: gameTestimonials,
  experienceTimeline,
  techGrid,
};

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const outDir = path.join(rootDir, 'public', 'rpg');
mkdirSync(outDir, { recursive: true });
writeFileSync(path.join(outDir, 'content.json'), JSON.stringify(content, null, 2));

console.log(
  `✓ public/rpg/content.json gerado — ${gameProjects.length} projetos, ${gameTestimonials.length} depoimentos, ${experienceTimeline.length} posições na timeline.`
);
