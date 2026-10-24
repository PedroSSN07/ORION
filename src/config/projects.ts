export type Project = {
  name: string;
  kind: string;
  theme: "atlas" | "forma";
  title: string;
  description: string;
  tags: string[];
  features: string[];
  demoUrl?: string;
};
export const projects: Project[] = [
  {
    name: "Atlas",
    kind: "PLATAFORMA ANALÍTICA",
    theme: "atlas",
    title: "Clareza para decisões complexas.",
    description:
      "Exploração autoral de uma plataforma de análise. O estudo organiza dados ilustrativos em uma interface legível, com hierarquia visual e componentes reutilizáveis. Não representa um cliente ou um produto comercial.",
    tags: ["React", "TypeScript", "CSS"],
    features: [
      "Visão geral de indicadores ilustrativos",
      "Composição de dashboard responsiva",
      "Hierarquia visual para leitura de dados",
    ],
  },
  {
    name: "Forma",
    kind: "EXPERIÊNCIA EDITORIAL",
    theme: "forma",
    title: "Espaço para o essencial.",
    description:
      "Estudo visual para um estúdio de arquitetura imaginário. Composição, contraste e tipografia se encontram em uma experiência editorial. Não representa um cliente real.",
    tags: ["React", "CSS", "Direção de arte"],
    features: [
      "Identidade editorial e tipografia expressiva",
      "Composição arquitetônica original em CSS",
      "Adaptação para desktop e smartphone",
    ],
  },
];
