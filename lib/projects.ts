// Textos (título, resumo, descrição, destaques) ficam em messages/*.json → Projects.items.<id>
export interface Project {
  id: "verdal" | "emptyscan" | "palato";
  image: string;
  tags: string[];
  demo?: string;
  github?: string;
  featured?: boolean;
  /** Cor de destaque usada no brilho do card */
  accent: string;
}

export const projects: Project[] = [
  {
    id: "verdal",
    image: "/projects/verdal.webp",
    tags: ["Nuxt", "Vue", "TypeScript", "Tailwind CSS"],
    demo: "https://verdal.hhartur.com.br",
    featured: true,
    accent: "#2fb366",
  },
  {
    id: "emptyscan",
    image: "https://ik.imagekit.io/hhartur/emptyscan",
    tags: ["Next.js", "TypeScript", "Fastify", "Tailwind CSS"],
    featured: true,
    accent: "#e23b4e",
  },
  {
    id: "palato",
    image: "https://ik.imagekit.io/hhartur/palato",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    demo: "https://palato-loja.vercel.app",
    featured: true,
    accent: "#f59e0b",
  },
];

export const projectTags = ["all", ...Array.from(new Set(projects.flatMap((p) => p.tags)))];
