export interface Testimonial {
  id: string;
  author: {
    name: string;
    role: {
      pt: string;
      en: string;
    };
    company: string;
    linkedin: string;
    avatar?: string;
  };
  date: {
    pt: string;
    en: string;
  };
  relationship: {
    pt: string;
    en: string;
  };
  content: {
    pt: string;
    en: string;
  };
  featured?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: 'kauan-curbani',
    author: {
      name: 'Kauan Curbani',
      role: {
        pt: 'Desenvolvedor Web e Mobile',
        en: 'Web and Mobile Developer'
      },
      company: 'Cloud & Observabilidade',
      linkedin: 'https://www.linkedin.com/in/crbnii/',
      avatar: '/avatars/kauan-curbani.jpeg'
    },
    date: {
      pt: '20 de fevereiro de 2026',
      en: 'February 20, 2026'
    },
    relationship: {
      pt: 'Kauan supervisionava João Paulo diretamente',
      en: 'Kauan directly supervised João Paulo'
    },
    content: {
      pt: 'Tive a oportunidade de trabalhar com o João nos últimos 2 anos no desenvolvimento do nosso app mobile, e posso dizer com tranquilidade que ele foi peça-chave na construção do backend.\n\nComo Dev Backend, atuando com Java e Spring, o João participou diretamente de grande parte da implementação da nossa estrutura backend. Além disso, contribuiu bastante para melhorar a performance de consultas e otimizar pontos importantes da aplicação, sempre preocupado com eficiência e qualidade.\n\nO que mais gosto de trabalhar com ele é a postura: aprende rápido, entende o problema com facilidade e sabe discutir soluções de forma madura, sempre buscando a melhor decisão para o produto. Ele entrega rápido, mas sem abrir mão de boas práticas e organização, o que faz muita diferença no dia a dia.\n\nRecomendo o João com total confiança para qualquer time que precise de um backend sólido, responsável e comprometido com resultado.',
      en: 'I had the opportunity to work with João for the last 2 years on developing our mobile app, and I can confidently say he was a key piece in building the backend.\n\nAs a Backend Developer, working with Java and Spring, João directly participated in a large part of implementing our backend structure. Additionally, he contributed significantly to improving query performance and optimizing important parts of the application, always concerned with efficiency and quality.\n\nWhat I like most about working with him is his attitude: he learns fast, understands problems easily, and knows how to discuss solutions maturely, always seeking the best decision for the product. He delivers quickly, but without compromising on best practices and organization, which makes a huge difference day-to-day.\n\nI recommend João with total confidence for any team that needs a solid, responsible backend developer committed to results.'
    },
    featured: true
  },
  {
    id: 'fernando-junior',
    author: {
      name: 'Fernando Junior',
      role: {
        pt: 'Engenheiro de software sênior',
        en: 'Senior Software Engineer'
      },
      company: 'Java | Go | AWS',
      linkedin: 'https://www.linkedin.com/in/fernando-junior-bnu/',
      avatar: '/avatars/fernando.jpeg'
    },
    date: {
      pt: '20 de fevereiro de 2026',
      en: 'February 20, 2026'
    },
    relationship: {
      pt: 'Fernando supervisionava João Paulo diretamente',
      en: 'Fernando directly supervised João Paulo'
    },
    content: {
      pt: 'João é um excelente profissional, tive a oportunidade de trabalhar com ele durante 2 anos e ele sempre foi um profissional dedicado, se mostrou desde o início ter facilidade de aprender e ser capaz de assumir responsabilidades. Desempenhou com excelência os projetos em que participou. João é e será peça fundamental em qualquer equipe que atuar. Contudo deixo minha recomendação de seus serviços.',
      en: 'João is an excellent professional, I had the opportunity to work with him for 2 years and he has always been a dedicated professional, showing from the beginning that he learns easily and is capable of taking on responsibilities. He performed excellently in the projects he participated in. João is and will be a fundamental piece in any team he works with. Therefore, I leave my recommendation for his services.'
    },
    featured: true
  }
];
