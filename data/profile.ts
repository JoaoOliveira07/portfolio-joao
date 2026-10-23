// Dados pessoais e de contato — fonte única pro site inteiro e pro modo RPG
// (scripts/generate-rpg-content.ts copia isto pro jogo). Mudou algo? Mude só aqui.
export const profile = {
  name: 'João Paulo Oliveira',
  role: { pt: 'Engenheiro Backend', en: 'Backend Engineer' },
  location: { pt: 'Blumenau, SC', en: 'Blumenau, Brazil' },
  email: 'jpauloo.2003@gmail.com',
  linkedin: 'https://www.linkedin.com/in/joaooliveira07/',
  github: 'https://github.com/JoaoOliveira07',
  website: 'https://jopes.com.br',
  cv: { pt: '/cv/cv-pt.pdf', en: '/cv/cv-en.pdf' },
} as const;

/** "https://www.linkedin.com/in/x/" → "linkedin.com/in/x" */
export const shortUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
