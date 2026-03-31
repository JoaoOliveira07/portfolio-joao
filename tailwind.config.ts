import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Primary colors (emerald-based from MD3)
        primary: {
          DEFAULT: '#00694d',
          50: '#E6FFF5',
          100: '#C2F5E2',
          200: '#8FEBC4',
          300: '#5CE1A7',
          400: '#2DD48A',
          500: '#01926D',
          600: '#017A5C',
          700: '#016149',
          800: '#014837',
          900: '#013021',
          container: '#008563',
        },
        // MD3 Surface Colors
        surface: {
          DEFAULT: '#f8f9fa',
          bright: '#f8f9fa',
          dim: '#d9dadb',
          container: '#edeeef',
          'container-low': '#f3f4f5',
          'container-lowest': '#ffffff',
          'container-high': '#e7e8e9',
          'container-highest': '#e1e3e4',
          variant: '#e1e3e4',
          tint: '#006c50',
        },
        // MD3 On Surface Colors
        'on-surface': {
          DEFAULT: '#191c1d',
          variant: '#3d4943',
        },
        'on-background': '#191c1d',
        
        // Secondary colors
        secondary: {
          DEFAULT: '#006c49',
          container: '#74f8bc',
          'fixed': '#77fabe',
          'fixed-dim': '#58dda4',
        },
        
        // Tertiary colors
        tertiary: {
          DEFAULT: '#555c6e',
          container: '#6e7487',
          fixed: '#dce2f7',
          'fixed-dim': '#c0c6db',
        },
        
        // Primary fixed (for selections/highlights)
        'primary-fixed': '#87f7cc',
        'primary-fixed-dim': '#6adbb1',
        'on-primary-fixed': '#002116',
        'on-primary-fixed-variant': '#00513b',
        
        // Error colors
        error: '#ba1a1a',
        'error-container': '#ffdad6',
        'on-error': '#ffffff',
        'on-error-container': '#93000a',
        
        // Outline colors
        outline: '#6d7a73',
        'outline-variant': '#bccac1',
        
        // Inverse colors
        'inverse-surface': '#2e3132',
        'inverse-on-surface': '#f0f1f2',
        'inverse-primary': '#6adbb1',
        
        // Background
        background: '#f8f9fa',
        
        // Legacy colors (kept for compatibility)
        success: {
          50: '#F0FDF4',
          100: '#C2F5E2',
          200: '#8FEBC4',
          300: '#5CE1A7',
          400: '#2DD48A',
          500: '#01936E',
          600: '#017A5C',
          700: '#016149',
          800: '#014837',
          900: '#013021',
        },
        neutral: {
          0: '#FFFFFF',
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0A0A0A',
        },
        text: {
          primary: '#171717',
          secondary: '#525252',
          tertiary: '#A3A3A3',
          inverse: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        body: ['Inter'],
        headline: ['Inter'],
        label: ['Inter'],
        mono: ['SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', 'Consolas', 'monospace'],
      },
      spacing: {
        'section': '6rem',
        'component': '3rem',
        'element': '1.5rem',
      },
      borderRadius: {
        'DEFAULT': '0.25rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full': '9999px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(1, 146, 109, 0.3)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
