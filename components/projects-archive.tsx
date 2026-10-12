"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { projects, projectTags, type Project } from "@/lib/projects";
import { BlockLink, Crosshair, EASE, Rise, Scramble, SectionHead } from "@/components/telemetry";
import { cn } from "@/lib/utils";

function Dossier({ project, index }: { project: Project; index: number }) {
  const t = useTranslations("Projects");
  const item = (k: string) => t(`items.${project.id}.${k}`);
  const highlights = t.raw(`items.${project.id}.highlights`) as string[];
  const no = String(index + 1).padStart(3, "0");

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      transition={{ duration: 0.7, ease: EASE }}
      className="group relative border border-border"
    >
      <Crosshair className="-left-1.5 -top-1.5" />
      <Crosshair className="-bottom-1.5 -right-1.5" />

      {/* faixa de identificação */}
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <span className="label text-foreground">
          <span className="text-primary">[ {no} ]</span> {project.id.toUpperCase()}
        </span>
        <span className="label">{item("category")}</span>
      </div>

      <div className="grid lg:grid-cols-12">
        <div className="halftone relative aspect-[16/10] border-b border-border lg:col-span-7 lg:aspect-auto lg:min-h-[26rem] lg:border-b-0 lg:border-r">
          <Image
            src={project.image}
            alt={item("title")}
            fill
            sizes="(min-width: 1024px) 760px, 100vw"
            className="object-cover object-left-top group-hover:scale-[1.03]"
          />
        </div>

        <div className="flex flex-col p-5 md:p-8 lg:col-span-5">
          <h2 className="macro text-[clamp(2.5rem,6vw,4.5rem)]">
            <Scramble text={item("title")} />
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground text-pretty">{item("description")}</p>

          <dl className="mt-6 border-t border-border text-xs">
            <div className="grid grid-cols-3 gap-2 border-b border-border py-2.5">
              <dt className="label">{t("stack")}</dt>
              <dd className="col-span-2 uppercase tracking-[0.06em]">{project.tags.join(" · ")}</dd>
            </div>
            <div className="grid grid-cols-3 gap-2 border-b border-border py-2.5">
              <dt className="label">{t("link")}</dt>
              <dd className="col-span-2 break-all">
                {project.demo ? (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="underline decoration-primary underline-offset-4 hover:text-primary">
                    {project.demo.replace("https://", "")}
                  </a>
                ) : (
                  <span className="text-muted-foreground">{t("offline")}</span>
                )}
              </dd>
            </div>
          </dl>

          <p className="label mt-6 text-foreground">{"// "}{t("highlights")}</p>
          <ul className="mt-3 space-y-1.5 text-sm">
            {highlights.map((h) => (
              <li key={h} className="flex gap-2">
                <span className="text-primary">&gt;</span>
                {h}
              </li>
            ))}
          </ul>

          {(project.demo || project.github) && (
            <div className="mt-8 flex flex-wrap gap-3 lg:mt-auto lg:pt-8">
              {project.demo && (
                <BlockLink href={project.demo} external>
                  {t("visit")}
                </BlockLink>
              )}
              {project.github && (
                <BlockLink href={project.github} external variant="line">
                  {t("code")}
                </BlockLink>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export function ProjectsArchive() {
  const t = useTranslations("Projects");
  const [active, setActive] = useState("all");
  const list = active === "all" ? projects : projects.filter((p) => p.tags.includes(active));

  return (
    <section className="pb-24 pt-28 md:pb-32 md:pt-32">
      <div className="container">
        <SectionHead index="02" label={t("section")} right={<span className="label">{t("count", { count: list.length })}</span>} />

        <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="overflow-hidden [container-type:inline-size] lg:col-span-8">
            <motion.h1
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
              className="macro text-[length:15cqw]"
            >
              {t("title")}
              <span className="text-primary">.</span>
            </motion.h1>
          </div>
          <Rise onMount delay={0.6} className="lg:col-span-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              <span className="text-primary">&gt;&gt;&gt; </span>
              {t("description")}
            </p>
          </Rise>
        </div>

        {/* filtros como teclas */}
        <Rise onMount delay={0.75} className="mt-10">
          <div role="group" aria-label={t("filterLabel")} className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
            {projectTags.map((tag) => (
              <button
                key={tag}
                type="button"
                aria-pressed={active === tag}
                onClick={() => setActive(tag)}
                className={cn(
                  "shrink-0 border px-3 py-2 text-[11px] uppercase tracking-[0.12em] transition-colors",
                  active === tag
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground",
                )}
              >
                [ {tag === "all" ? t("all") : tag} ]
              </button>
            ))}
          </div>
        </Rise>

        <motion.div layout className="mt-12 grid gap-10">
          <AnimatePresence mode="popLayout">
            {list.map((project) => (
              <Dossier key={project.id} project={project} index={projects.indexOf(project)} />
            ))}
          </AnimatePresence>
        </motion.div>
        {list.length === 0 && <p className="mt-10 text-sm text-muted-foreground">{t("empty")}</p>}
      </div>
    </section>
  );
}
