"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { SiNextdotjs, SiReact, SiNestjs, SiTypescript, SiTailwindcss, SiFastify } from "react-icons/si";
import { Link } from "@/i18n/routing";
import { projects } from "@/lib/projects";
import { PillButton } from "@/components/pill-button";
import { EASE_OUT_EXPO, Eyebrow, SplitHeading } from "@/components/motion-primitives";

const stack = [
  { name: "TypeScript", icon: SiTypescript },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "React", icon: SiReact },
  { name: "NestJS", icon: SiNestjs },
  { name: "Fastify", icon: SiFastify },
  { name: "Tailwind", icon: SiTailwindcss },
];

// posição/rotação de cada cartão na pilha (desktop); no mobile só o primeiro aparece
const cascade = [
  { className: "z-30 md:rotate-[-2deg]", delay: 0.5 },
  { className: "z-20 hidden md:block md:absolute md:-right-6 md:-top-14 md:w-[62%] md:rotate-[5deg]", delay: 0.7 },
  { className: "z-10 hidden md:block md:absolute md:-bottom-16 md:-left-10 md:w-[58%] md:rotate-[-7deg]", delay: 0.85 },
];

export function HeroSection() {
  const t = useTranslations("Hero");
  const tp = useTranslations("Projects.items");

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 24, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 1, delay, ease: EASE_OUT_EXPO },
  });

  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden pb-24 pt-32 md:pt-36">
      <div className="container grid items-center gap-20 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <motion.div {...fade(0.2)}>
            <Eyebrow>{t("badge")}</Eyebrow>
          </motion.div>
          <motion.p {...fade(0.3)} className="mt-8 font-mono text-sm text-muted-foreground">
            {t("greeting")}
          </motion.p>
          <SplitHeading
            as="h1"
            text={t("headline")}
            animateOnMount
            delay={0.35}
            className="mt-3 text-[clamp(2.75rem,7vw,5.75rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-balance"
          />
          <motion.p
            {...fade(0.7)}
            className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty md:text-xl"
          >
            {t("description")}
          </motion.p>
          <motion.div {...fade(0.85)} className="mt-10 flex flex-wrap items-center gap-3">
            <PillButton href="/projects" size="lg">
              {t("projectsButton")}
            </PillButton>
            <PillButton href="/contact" size="lg" variant="outline" icon={Mail}>
              {t("contactButton")}
            </PillButton>
          </motion.div>

          <motion.div {...fade(1)} className="mt-14 border-t border-foreground/[0.08] pt-6">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{t("stackLabel")}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {stack.map(({ name, icon: Icon }) => (
                <li
                  key={name}
                  className="flex items-center gap-2 rounded-full bg-foreground/[0.04] px-3 py-1.5 text-sm text-foreground/80 ring-1 ring-foreground/[0.06]"
                >
                  <Icon className="h-3.5 w-3.5" />
                  {name}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Pilha de projetos em camadas */}
        <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          {projects.slice(0, 3).map((project, i) => (
            // rotação/posição no wrapper estático; o framer anima só os filhos (transform não conflita)
            <div key={project.id} className={`relative ${cascade[i]!.className}`}>
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: cascade[i]!.delay, ease: EASE_OUT_EXPO }}
            >
              <motion.div
                animate={{ y: [0, i % 2 ? 10 : -10, 0] }}
                transition={{ duration: 7 + i, repeat: Infinity, ease: "easeInOut" }}
              >
                <Link href="/projects" className="group block" aria-label={tp(`${project.id}.title`)}>
                  <div className="bezel">
                    <div className="bezel-core">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={project.image}
                          alt={tp(`${project.id}.title`)}
                          fill
                          priority={i === 0}
                          sizes="(min-width: 1024px) 480px, 90vw"
                          className="object-cover object-top transition-transform duration-1000 ease-out-expo group-hover:scale-105"
                        />
                      </div>
                      {i === 0 && (
                        <div className="flex items-center justify-between gap-4 px-4 py-3">
                          <div>
                            <p className="text-sm font-medium">{tp(`${project.id}.title`)}</p>
                            <p className="text-xs text-muted-foreground">{tp(`${project.id}.category`)}</p>
                          </div>
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ background: project.accent, boxShadow: `0 0 16px ${project.accent}` }}
                            aria-hidden="true"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            </motion.div>
            </div>
          ))}
        </div>
      </div>

      <motion.a
        href="#featured"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground md:flex"
      >
        <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ArrowDown className="h-4 w-4" strokeWidth={1.5} />
        </motion.span>
        {t("scroll")}
      </motion.a>
    </section>
  );
}
