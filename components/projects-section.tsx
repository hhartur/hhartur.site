"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Project {
  titleKey: string;
  descriptionKey: string;
  image: string;
  tags: string[];
  github?: string;
  demo?: string;
}

const projects: Project[] = [
  {
    titleKey: "project2Title",
    descriptionKey: "project2Desc",
    image: "https://ik.imagekit.io/hhartur/emptyscan",
    tags: ["Next.js", "TypeScript", "Tailwind", "JavaScript", "Fastify"],
    demo: "https://emptyscan.site",
  },
  {
    titleKey: "project1Title",
    descriptionKey: "project1Desc",
    image: "https://ik.imagekit.io/hhartur/palato",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    demo: "https://palato-loja.vercel.app",
  }
];

export function ProjectsSection() {
  const t = useTranslations("Projects");

  return (
    <section id="projects" className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("title")} <span className="text-primary">{t("titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("description")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const t = useTranslations("Projects");
  const [isExpanded, setIsExpanded] = React.useState(false);
  const description = t(project.descriptionKey);
  const shouldShowButton = description.length > 150; // Adjust threshold as needed

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative rounded-lg border border-border bg-card overflow-hidden hover:shadow-lg hover:shadow-primary/10 transition-all"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-muted">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundImage: `url(${project.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
          {t(project.titleKey)}
        </h3>
        
        <div>
          <p className={`text-sm text-muted-foreground ${!isExpanded && shouldShowButton ? 'line-clamp-3' : ''}`}>
            {description}
          </p>
          {shouldShowButton && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-primary hover:underline mt-1 font-medium"
            >
              {isExpanded ? t("seeLess") : t("seeMore")}
            </button>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3 pt-2">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button variant="outline" size="sm" className="w-full">
                <Github className="h-4 w-4 mr-2" />
                {t("code")}
              </Button>
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button size="sm" className="w-full">
                <ExternalLink className="h-4 w-4 mr-2" />
                {t("demo")}
              </Button>
            </a>
          )}
        </div>
      </div>

      {/* Hover effect */}
      <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 rounded-lg transition-all pointer-events-none" />
    </motion.div>
  );
}