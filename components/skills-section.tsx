"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  SiNextdotjs,
  SiNuxtdotjs,
  SiReact,
  SiAngular,
  SiVuedotjs,
  SiVite,
  SiNestjs,
  SiFastify,
  SiExpress,
  SiCplusplus,
  SiTypescript,
  SiDart,
  SiPhp,
  SiTailwindcss,
  SiFramer,
} from "react-icons/si";

interface Skill {
  name: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
}

const skillsData = {
  languages: [
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "Dart", icon: SiDart, color: "#0175C2" },
    { name: "PHP", icon: SiPhp, color: "#777BB4" },
    { name: "C++", icon: SiCplusplus, color: "#00599C" },
  ] as Skill[],
  frameworks: [
    { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
    { name: "Nuxt.js", icon: SiNuxtdotjs, color: "#00DC82" },
    { name: "React", icon: SiReact, color: "#61DAFB" },
    { name: "Angular", icon: SiAngular, color: "#DD0031" },
    { name: "Vue", icon: SiVuedotjs, color: "#4FC08D" },
    { name: "NestJS", icon: SiNestjs, color: "#E0234E" },
    { name: "Fastify", icon: SiFastify, color: "#000000" },
    { name: "Express", icon: SiExpress, color: "#000000" },
  ] as Skill[],
  libraries: [
    { name: "Vite", icon: SiVite, color: "#646CFF" },
    { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
    { name: "Framer", icon: SiFramer, color: "#0055FF" },
  ] as Skill[],
};

export function SkillsSection() {
  const t = useTranslations("Skills");

  return (
    <section id="skills" className="py-24 px-4">
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Tabs defaultValue="languages">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3">
              <TabsTrigger value="languages">{t("languages")}</TabsTrigger>
              <TabsTrigger value="frameworks">{t("frameworks")}</TabsTrigger>
              <TabsTrigger value="libraries">{t("libraries")}</TabsTrigger>
            </TabsList>

            <TabsContent value="languages">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                {skillsData.languages.map((skill, index) => (
                  <SkillCard key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="frameworks">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                {skillsData.frameworks.map((skill, index) => (
                  <SkillCard key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="libraries">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                {skillsData.libraries.map((skill, index) => (
                  <SkillCard key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="group relative rounded-lg border border-border bg-card p-6 text-center transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/20"
    >
      <div className="flex flex-col items-center gap-3">
        <div className="rounded-full bg-muted p-4 transition-all group-hover:bg-primary/10">
          <skill.icon 
            className="h-10 w-10 transition-all" 
            style={{ color: skill.color }}
          />
        </div>
        <span className="font-medium text-sm">{skill.name}</span>
      </div>
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 transition-opacity group-hover:opacity-100" />
    </motion.div>
  );
}