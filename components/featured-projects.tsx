"use client";

import { useTranslations } from "next-intl";
import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";
import { PillButton } from "@/components/pill-button";
import { Eyebrow, Reveal, SplitHeading } from "@/components/motion-primitives";

export function FeaturedProjects() {
  const t = useTranslations("Featured");
  const featured = projects.filter((p) => p.featured);

  return (
    <section id="featured" className="section-y">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>{t("eyebrow")}</Eyebrow>
            </Reveal>
            <SplitHeading
              text={t("title")}
              className="mt-6 text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1] tracking-[-0.04em]"
            />
          </div>
          <Reveal delay={0.15} className="lg:col-span-4 lg:col-start-9">
            <p className="text-lg leading-relaxed text-muted-foreground">{t("description")}</p>
            <PillButton href="/projects" variant="outline" className="mt-6">
              {t("viewAll")}
            </PillButton>
          </Reveal>
        </div>

        {/* Bento: o primeiro projeto ocupa duas linhas */}
        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-12 lg:grid-rows-2">
          {featured.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              stretch={i === 0}
              className={i === 0 ? "md:col-span-2 lg:col-span-7 lg:row-span-2" : "lg:col-span-5"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
