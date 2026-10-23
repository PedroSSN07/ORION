export const config = {
  whatsapp: "5588996645739",
  whatsappMessage:
    "Olá! Vim pelo site da ORION e gostaria de conversar sobre um projeto.",
  logo:
    import.meta.env.VITE_LOGO_URL ||
    `${import.meta.env.BASE_URL}orion-futurista.png`,
  socials: [
    { label: "Instagram", url: import.meta.env.VITE_INSTAGRAM_URL },
    { label: "LinkedIn", url: import.meta.env.VITE_LINKEDIN_URL },
  ].filter((item) => /^https:\/\//.test(item.url || "")),
};
export const solutions = [
  {
    title: "Desenvolvimento Web",
    text: "Presença digital com personalidade. Sites rápidos, responsivos e feitos para a sua marca.",
    tag: "SITES & PLATAFORMAS",
  },
  {
    title: "Sistemas Sob Medida",
    text: "Da complexidade à clareza. Aplicações pensadas para a realidade do seu negócio.",
    tag: "SOFTWARE & PRODUTOS",
  },
  {
    title: "Interfaces Digitais",
    text: "Design que aproxima pessoas e tecnologia. Cada interação tem um propósito.",
    tag: "DESIGN & EXPERIÊNCIA",
  },
  {
    title: "Automação e Integrações",
    text: "Ferramentas conectadas. Processos mais simples. Mais espaço para o que importa.",
    tag: "CONEXÕES & EFICIÊNCIA",
  },
  {
    title: "Manutenção e Evolução",
    text: "Seu produto continua em movimento. Cuidado técnico para acompanhar novos desafios.",
    tag: "SUPORTE & CONTINUIDADE",
  },
];
export const pillars = [
  {
    name: "Inovação",
    text: "Questionar o comum, explorar possibilidades e encontrar caminhos relevantes para cada desafio.",
  },
  {
    name: "Criatividade",
    text: "Conectar perspectivas para transformar boas ideias em experiências com identidade.",
  },
  {
    name: "Tecnologia",
    text: "Engenharia cuidadosa, arquitetura sólida e ferramentas escolhidas para o problema certo.",
  },
  {
    name: "Resultados",
    text: "Objetivos claros orientam cada decisão. A evolução nasce de observar, aprender e melhorar.",
  },
];
