/**
 * Technology Logo Mappings
 * Maps each technology to either an SVG logo or a Lucide icon
 */

export interface TechLogo {
  name: string;
  type: 'svg' | 'lucide';
  path?: string; // For SVG: /logos/java.svg
  icon?: string; // For Lucide: 'Code2'
  displayName: string;
}

export const techLogos: TechLogo[] = [
  // Backend
  {
    name: 'Java',
    type: 'svg',
    path: '/logos/java.svg',
    displayName: 'Java'
  },
  {
    name: 'Spring Boot',
    type: 'svg',
    path: '/logos/spring.svg',
    displayName: 'Spring Boot'
  },
  {
    name: 'Node.js',
    type: 'svg',
    path: '/logos/nodejs.svg',
    displayName: 'Node.js'
  },

  // Mobile
  {
    name: 'Flutter',
    type: 'svg',
    path: '/logos/flutter.svg',
    displayName: 'Flutter'
  },
  {
    name: 'Dart',
    type: 'svg',
    path: '/logos/dart.svg',
    displayName: 'Dart'
  },

  // Databases
  {
    name: 'PostgreSQL',
    type: 'svg',
    path: '/logos/postgresql.svg',
    displayName: 'PostgreSQL'
  },
  {
    name: 'Oracle',
    type: 'svg',
    path: '/logos/oracle.svg',
    displayName: 'Oracle'
  },

  // Cloud & Infrastructure
  {
    name: 'AWS',
    type: 'svg',
    path: '/logos/aws.svg',
    displayName: 'AWS'
  },
  {
    name: 'Terraform',
    type: 'svg',
    path: '/logos/terraform.svg',
    displayName: 'Terraform'
  },
  {
    name: 'Docker',
    type: 'svg',
    path: '/logos/docker.svg',
    displayName: 'Docker'
  },
  {
    name: 'GitHub Actions',
    type: 'svg',
    path: '/logos/githubactions.svg',
    displayName: 'GitHub Actions'
  },

  // Observability
  {
    name: 'Prometheus',
    type: 'svg',
    path: '/logos/prometheus.svg',
    displayName: 'Prometheus'
  },
  {
    name: 'Grafana',
    type: 'svg',
    path: '/logos/grafana.svg',
    displayName: 'Grafana'
  },
  {
    name: 'Datadog',
    type: 'svg',
    path: '/logos/datadog.svg',
    displayName: 'Datadog'
  },
  {
    name: 'Sentry',
    type: 'svg',
    path: '/logos/sentry.svg',
    displayName: 'Sentry'
  },
  {
    name: 'Firebase',
    type: 'svg',
    path: '/logos/firebase.svg',
    displayName: 'Firebase'
  }
];

/**
 * Get all technologies from the skills.ts file and map them to logos
 */
export const getAllTechLogos = (): TechLogo[] => {
  return techLogos;
};

/**
 * Get logo by technology name
 */
export const getLogoByName = (name: string): TechLogo | undefined => {
  return techLogos.find(logo => logo.name === name);
};
