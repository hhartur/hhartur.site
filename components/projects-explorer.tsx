"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { projects, projectTags } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";
import { EASE_OUT_EXPO, Eyebrow, SplitHeading } from "@/components/motion-primitives";
import { cn } from "@/lib/utils";

export function ProjectsExplorer() {
  const t = useTranslations("Projects");
  const [active, setActive] = useState("all");
  const list = active === "all" ? projects : projects.filter((p) => p.tags.includes(active));

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 24, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 1, delay, ease: EASE_OUT_EXPO },
  });

  return (
    <section className="pb-24 pt-36 md:pb-32 md:pt-44">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <motion.div {...fade(0.15)}>
              <Eyebrow>{t("eyebrow")}</Eyebrow>
            </motion.div>
            <SplitHeading
              as="h1"
              text={t("title")}
              animateOnMount
              delay={0.25}
              className="mt-6 text-[clamp(2.75rem,8vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.05em]"
            />
          </div>
          <motion.p {...fade(0.5)} className="text-lg leading-relaxed text-muted-foreground lg:col-span-4">
            {t("description")}
          </motion.p>
        </div>

        {/* Filtros por tecnologia */}
        <motion.div
          {...fade(0.65)}
          className="no-scrollbar -mx-4 mt-14 flex items-center justify-between gap-6 overflow-x-auto px-4 sm:mx-0 sm:px-0"
        >
          <LayoutGroup>
            <div role="group" aria-label={t("filterLabel")} className="flex gap-1 rounded-full bg-foreground/[0.04] p-1.5 ring-1 ring-foreground/[0.07]">
              {projectTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  aria-pressed={active === tag}
                  onClick={() => setActive(tag)}
                  className={cn(
                    "relative whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors duration-300",
                    active === tag ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {active === tag && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{tag === "all" ? t("all") : tag}</span>
                </button>
              ))}
            </div>
          </LayoutGroup>
          <p className="hidden shrink-0 font-mono text-sm text-muted-foreground md:block" aria-live="polite">
            {t("count", { count: list.length })}
          </p>
        </motion.div>

        <motion.div layout className="mt-10 grid gap-6">
          <AnimatePresence mode="popLayout">
            {list.map((project, i) => (
              <ProjectCard key={project.id} project={project} variant="large" index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
        {list.length === 0 && <p className="mt-10 text-muted-foreground">{t("empty")}</p>}
      </div>
    </section>
  );
}
