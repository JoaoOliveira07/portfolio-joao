import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';

const BASE = 'https://portfolio-joao.vercel.app';
const LOCALES = ['pt', 'en'];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = ['', '/projects', '/lab', '/about'];

  const staticEntries = LOCALES.flatMap((lang) =>
    staticPaths.map((p) => ({
      url: `${BASE}/${lang}${p}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: p === '' ? 1 : 0.7,
    }))
  );

  const projectEntries = LOCALES.flatMap((lang) =>
    projects.map((proj) => ({
      url: `${BASE}/${lang}/projects/${proj.slug}`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    }))
  );

  return [...staticEntries, ...projectEntries];
}
