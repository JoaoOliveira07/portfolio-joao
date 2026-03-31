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
  // Core Backend
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
    name: 'PostgreSQL',
    type: 'svg',
    path: '/logos/postgresql.svg',
    displayName: 'PostgreSQL'
  },
  {
    name: 'MySQL',
    type: 'svg',
    path: '/logos/mysql.svg',
    displayName: 'MySQL'
  },

  // Cloud & Infrastructure

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

  // Quality & Practices
  {
    name: 'TDD',
    type: 'lucide',
    icon: 'FlaskConical',
    displayName: 'TDD'
  },
  {
    name: 'Clean Code',
    type: 'lucide',
    icon: 'Sparkles',
    displayName: 'Clean Code'
  },

  // Observability & Monitoring
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
    name: 'New Relic',
    type: 'svg',
    path: '/logos/newrelic.svg',
    displayName: 'New Relic'
  },
  {
    name: 'ELK Stack',
    type: 'svg',
    path: '/logos/elastic.svg',
    displayName: 'ELK'
  },
  {
    name: 'OpenTelemetry',
    type: 'svg',
    path: '/logos/opentelemetry.svg',
    displayName: 'OpenTelemetry'
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
