/**
 * Design System - Layout Constants
 * Constantes para padronização visual em todo o portfólio
 */

export const LAYOUT = {
  // Container widths
  container: {
    default: 'container mx-auto px-6',
    maxWidth: {
      sm: 'max-w-3xl',
      md: 'max-w-5xl',
      lg: 'max-w-6xl',
      xl: 'max-w-7xl',
    }
  },

  // Section spacing
  section: {
    py: 'py-20 md:py-32',
    gap: 'gap-12 md:gap-16',
  },

  // Section header
  header: {
    container: 'text-center mb-12 md:mb-16 max-w-3xl mx-auto',
    title: 'text-3xl md:text-4xl font-bold text-neutral-900 mb-3',
    subtitle: 'text-base md:text-lg text-neutral-500',
  },

  // Background patterns
  bg: {
    white: 'bg-white',
    neutral: 'bg-neutral-50',
    gradient: 'bg-gradient-to-b from-neutral-50 to-white',
  }
} as const;
