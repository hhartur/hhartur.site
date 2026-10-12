"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Gauge, Accessibility, ShieldCheck } from "lucide-react";
import {
  SiNextdotjs,
  SiReact,
  SiVite,
  SiNestjs,
  SiFastify,
  SiExpress,
  SiTypescript,
  SiTailwindcss,
  SiJavascript,
} from "react-icons/si";
import { EASE_OUT_EXPO, Eyebrow, Reveal, SplitHeading } from "@/components/motion-primitives";
import { cn } from "@/lib/utils";

interface Skill {
  name: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  /** null = usa a cor do texto (logos pretos ficariam invisíveis no tema escuro) */
  color: string | null;
}

const skillsData: Record<"languages" | "frameworks" | "libraries", Skill[]> = {
  languages: [
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  ],
  frameworks: [
    { name: "Next.js", icon: SiNextdotjs, color: null },
    { name: "React", icon: SiReact, color: "#61DAFB" },
    { name: "NestJS", icon: SiNestjs, color: "#E0234E" },
    { name: "Fastify", icon: SiFastify, color: null },
    { name: "Express", icon: SiExpress, color: null },
  ],
  libraries: [
    { name: "Vite", icon: SiVite, color: "#646CFF" },
    { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
  ],
};

const allSkills = [...skillsData.languages, ...skillsData.frameworks, ...skillsData.libraries];

export function SkillsSection() {
  const t = useTranslations("Skills");

  const groups = [
    { key: "frameworks" as const, span: "lg:col-span-7" },
    { key: "languages" as const, span: "lg:col-span-5" },
    { key: "libraries" as const, span: "lg:col-span-5" },
  ];

  const principles = [
    { icon: Gauge, text: t("principle1") },
    { icon: Accessibility, text: t("principle2") },
    { icon: ShieldCheck, text: t("principle3") },
  ];

  return (
    <section id="skills" className="section-y relative">
      <div className="container">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>{t("eyebrow")}</Eyebrow>
          </Reveal>
          <SplitHeading
            text={t("title")}
            className="mt-6 text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1] tracking-[-0.04em]"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{t("description")}</p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 lg:grid-cols-12">
          {groups.map((group, gi) => (
            <Reveal key={group.key} delay={gi * 0.08} className={cn("h-full", group.span)}>
              <div className="bezel h-full">
                <div className="bezel-core p-7 md:p-8">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-xl font-semibold tracking-[-0.02em]">{t(group.key)}</h3>
                    <span className="font-mono text-xs text-muted-foreground">
                      {String(skillsData[group.key].length).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{t(`${group.key}Desc`)}</p>
                  <ul className="mt-8 flex flex-wrap gap-3">
                    {skillsData[group.key].map((skill, i) => (
                      <motion.li
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 + i * 0.05, ease: EASE_OUT_EXPO }}
                        className="group/skill flex items-center gap-3 rounded-2xl bg-foreground/[0.03] py-2.5 pl-2.5 pr-4 ring-1 ring-foreground/[0.06] transition-[background-color,transform] duration-500 ease-spring hover:-translate-y-0.5 hover:bg-foreground/[0.06]"
                      >
                        <span className="grid h-10 w-10 place-items-center rounded-xl bg-background ring-1 ring-foreground/[0.06] transition-transform duration-500 ease-spring group-hover/skill:rotate-[-6deg]">
                          <skill.icon className="h-5 w-5" style={skill.color ? { color: skill.color } : undefined} />
                        </span>
                        <span className="text-sm font-medium">{skill.name}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.24} className="h-full lg:col-span-7">
            <div className="h-full rounded-[1.75rem] bg-primary/10 p-1.5 ring-1 ring-primary/20">
              <div className="relative h-full overflow-hidden rounded-[calc(1.75rem-0.375rem)] bg-primary p-7 text-primary-foreground md:p-8">
                <div
                  className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/20 blur-3xl"
                  aria-hidden="true"
                />
                <h3 className="relative text-xl font-semibold tracking-[-0.02em]">{t("principles")}</h3>
                <ul className="relative mt-6 grid gap-4 sm:grid-cols-3">
                  {principles.map(({ icon: Icon, text }) => (
                    <li key={text} className="flex flex-col gap-3">
                      <Icon className="h-6 w-6" strokeWidth={1.5} />
                      <span className="text-sm leading-snug text-primary-foreground/90">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Faixa contínua com toda a stack */}
      <div
        className="group mt-20 flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
        aria-hidden="true"
      >
        <div className="flex w-max shrink-0 animate-marquee group-hover:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {allSkills.map((skill) => (
                <span
                  key={`${copy}-${skill.name}`}
                  className="mx-8 flex items-center gap-3 whitespace-nowrap text-2xl font-semibold tracking-[-0.03em] text-foreground/25 md:text-4xl"
                >
                  <skill.icon className="h-6 w-6 md:h-8 md:w-8" />
                  {skill.name}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
