import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0A',
        surface: '#1A1A1A',
        surfaceHover: '#252525',
        border: '#2A2A2A',
        primary: '#3B82F6',
        primaryHover: '#2563EB',
        accent: '#10B981',
        text: '#E5E5E5',
        textMuted: '#737373',
        textDim: '#525252',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        'section': '6rem',
        'component': '3rem',
        'element': '1.5rem',
      },
    },
  },
  plugins: [],
};

export default config;
