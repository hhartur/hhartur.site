"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Github } from "lucide-react";
import { useTranslations } from "next-intl";
import type { Project } from "@/lib/projects";
import { EASE_OUT_EXPO } from "@/components/motion-primitives";
import { cn } from "@/lib/utils";

/**
 * Cartão de projeto. "large" mostra descrição completa e destaques (página de projetos);
 * "compact" é a versão da home.
 */
export function ProjectCard({
  project,
  variant = "compact",
  index = 0,
  stretch = false,
  className,
}: {
  project: Project;
  variant?: "compact" | "large";
  index?: number;
  /** imagem cresce para preencher a altura do card (card grande do bento) */
  stretch?: boolean;
  className?: string;
}) {
  const t = useTranslations("Projects");
  const item = (key: string) => t(`items.${project.id}.${key}`);
  const highlights = variant === "large" ? (t.raw(`items.${project.id}.highlights`) as string[]) : [];
  const large = variant === "large";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.9, delay: index * 0.08, ease: EASE_OUT_EXPO }}
      className={cn("group relative h-full", className)}
    >
      {/* brilho na cor do projeto, aparece no hover */}
      <div
        className="pointer-events-none absolute -inset-px -z-10 rounded-[1.9rem] opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-40"
        style={{ background: project.accent }}
        aria-hidden="true"
      />
      <div className="bezel h-full">
        <div className={cn("bezel-core flex flex-col", large && "lg:flex-row")}>
          <div
            className={cn(
              "relative aspect-[16/10] shrink-0 overflow-hidden bg-muted",
              large && "lg:aspect-auto lg:w-[56%] [&_img]:object-left-top",
              stretch && "lg:aspect-auto lg:min-h-[20rem] lg:flex-1 [&_img]:object-left-top",
            )}
          >
            <Image
              src={project.image}
              alt={item("title")}
              fill
              sizes={large ? "(min-width: 1024px) 640px, 100vw" : "(min-width: 1024px) 420px, (min-width: 768px) 50vw, 100vw"}
              className="object-cover object-top transition-transform [transition-duration:1400ms] ease-out-expo group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" aria-hidden="true" />
            <span className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-white backdrop-blur-md">
              {item("category")}
            </span>
          </div>

          <div className={cn("flex flex-col p-6", !stretch && "flex-1", large && "lg:p-10")}>
            <div className="flex items-start justify-between gap-4">
              <h3 className={cn("font-semibold tracking-[-0.03em]", large ? "text-3xl md:text-4xl" : "text-2xl")}>
                {item("title")}
              </h3>
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t("visit")}: ${item("title")}`}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-foreground/[0.05] ring-1 ring-foreground/10 transition-[background-color,color,transform] duration-500 ease-spring hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground"
                >
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                </a>
              )}
            </div>

            <p className="mt-3 leading-relaxed text-muted-foreground text-pretty">
              {large ? item("description") : item("summary")}
            </p>

            {large && (
              <div className="mt-6">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{t("highlights")}</p>
                <ul className="mt-3 space-y-2">
                  {highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={1.75} />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <ul className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li key={tag} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {tag}
                </li>
              ))}
            </ul>

            {large && (project.demo || project.github) && (
              <div className="mt-auto flex flex-wrap gap-3 pt-8">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center gap-3 rounded-full bg-primary py-1.5 pl-5 pr-1.5 text-sm font-medium text-primary-foreground transition-transform duration-500 ease-spring active:scale-[0.97]"
                  >
                    {t("visit")}
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-primary-foreground/15 transition-transform duration-500 ease-spring group-hover/btn:-translate-y-px group-hover/btn:translate-x-0.5">
                      <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium ring-1 ring-foreground/15 transition-colors hover:bg-foreground/[0.04]"
                  >
                    <Github className="h-4 w-4" strokeWidth={1.5} />
                    {t("code")}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
