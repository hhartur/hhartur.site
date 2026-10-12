"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
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
import { EASE, Rise, Scramble, SectionHead } from "@/components/telemetry";

type Group = "languages" | "frameworks" | "libraries";

const skills: { name: string; icon: React.ComponentType<{ className?: string }>; group: Group; code: string }[] = [
  { name: "TypeScript", icon: SiTypescript, group: "languages", code: "LNG-01" },
  { name: "JavaScript", icon: SiJavascript, group: "languages", code: "LNG-02" },
  { name: "Next.js", icon: SiNextdotjs, group: "frameworks", code: "FRM-01" },
  { name: "React", icon: SiReact, group: "frameworks", code: "FRM-02" },
  { name: "NestJS", icon: SiNestjs, group: "frameworks", code: "FRM-03" },
  { name: "Fastify", icon: SiFastify, group: "frameworks", code: "FRM-04" },
  { name: "Express", icon: SiExpress, group: "frameworks", code: "FRM-05" },
  { name: "Vite", icon: SiVite, group: "libraries", code: "TLS-01" },
  { name: "Tailwind", icon: SiTailwindcss, group: "libraries", code: "TLS-02" },
];

export function StackSection() {
  const t = useTranslations("Skills");
  const principles = [t("principle1"), t("principle2"), t("principle3")];

  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="container">
        <SectionHead index="03" label={t("section")} />

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <div className="[container-type:inline-size] lg:col-span-5">
            <Rise>
              <h2 className="macro text-[length:12.5cqw]">{t("title")}</h2>
            </Rise>
            <Rise delay={0.1}>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">{t("description")}</p>
            </Rise>

            <Rise delay={0.2} className="mt-10 border border-border">
              <p className="label border-b border-border px-4 py-3 text-foreground">{"// "}{t("principles")}</p>
              <ol>
                {principles.map((p, i) => (
                  <li key={p} className="flex gap-4 border-b border-border px-4 py-3 text-sm last:border-b-0">
                    <span className="text-primary">{String(i + 1).padStart(2, "0")}</span>
                    {p}
                  </li>
                ))}
              </ol>
            </Rise>
          </div>

          {/* matriz de tecnologias: linhas de 1px pelo gap da grade */}
          <div className="lg:col-span-7">
            <div className="grid-lines grid-cols-2 border border-border sm:grid-cols-3 [&>*:last-child:nth-child(odd)]:col-span-2 sm:[&>*:last-child:nth-child(odd)]:col-span-1">
              {skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
                  className="group relative flex aspect-square flex-col justify-between overflow-hidden p-4 sm:aspect-[5/4]"
                >
                  <span
                    className="absolute inset-0 origin-bottom scale-y-0 bg-primary transition-transform duration-500 ease-out-expo group-hover:scale-y-100"
                    aria-hidden="true"
                  />
                  <div className="relative flex items-start justify-between">
                    <span className="label transition-colors group-hover:text-primary-foreground">{skill.code}</span>
                    <span className="label hidden transition-colors group-hover:text-primary-foreground sm:inline">{t(skill.group)}</span>
                  </div>
                  <skill.icon className="relative h-9 w-9 transition-[color,transform] duration-500 group-hover:scale-110 group-hover:text-primary-foreground" />
                  <p className="relative text-sm font-bold uppercase tracking-[0.06em] transition-colors group-hover:text-primary-foreground">
                    <Scramble text={skill.name} />
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
