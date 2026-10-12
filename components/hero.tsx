"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { BlockLink, Crosshair, EASE, Rise, Scramble } from "@/components/telemetry";

export function Hero() {
  const t = useTranslations("Hero");

  const specs = [
    { k: t("focus"), v: t("focusValue"), key: "focus" },
    { k: t("stack"), v: "TypeScript · Next.js · React · NestJS", key: "stack" },
    { k: t("status"), v: t("available"), key: "status" },
  ];

  return (
    <section className="relative flex min-h-[100dvh] flex-col pt-14">
      {/* Faixa de metadados */}
      <Rise onMount delay={0.3} className="border-b border-border">
        <div className="container grid grid-cols-2 md:grid-cols-4">
          <p className="label border-l border-border py-3 pl-3">[ 01 ] Index</p>
          <p className="label border-l border-border py-3 pl-3">REV 2026.10</p>
          <p className="label hidden border-l border-border py-3 pl-3 md:block">UNIT / FS-01</p>
          <p className="label hidden border-x border-border py-3 pl-3 md:block">BUILD © {new Date().getFullYear()}</p>
        </div>
      </Rise>

      <div className="container relative flex flex-1 flex-col justify-center py-16">
        <Crosshair className="-left-1.5 top-10 hidden md:block" />
        <Crosshair className="-right-1.5 bottom-10 hidden md:block" />

        <h1 className="sr-only">hhartur — {t("role")}</h1>

        {/* Nome gigante revelado em cortina, com cursor piscando */}
        {/* tamanho em cqw: o nome ocupa exatamente a largura do contêiner em qualquer tela */}
        <div aria-hidden="true" className="overflow-hidden [container-type:inline-size]">
          <motion.p
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1.4, delay: 0.45, ease: EASE }}
            className="macro flex items-start text-[length:var(--name-size)] [--name-size:18.4cqw]"
          >
            hhartur
            <span className="ml-[0.04em] mt-[0.08em] text-[0.18em] font-black text-primary">®</span>
          </motion.p>
        </div>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-x-10 gap-y-6 md:mt-4">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 1.1, ease: EASE }}
            className="macro text-[clamp(1.75rem,5.4vw,4.75rem)]"
            aria-hidden="true"
          >
            Full stack <span className="text-primary">/</span> developer
            <span className="ml-2 inline-block h-[0.75em] w-[0.42em] translate-y-[0.06em] animate-blink bg-primary align-baseline" />
          </motion.p>
        </div>

        {/* Ficha técnica em grade com linhas de 1px */}
        <Rise onMount delay={1.3} className="mt-12">
          <dl className="grid-lines grid-cols-1 border border-border md:grid-cols-3">
            {specs.map((s) => (
              <div key={s.key} className="p-4">
                <dt className="label">{s.k}</dt>
                <dd className={`mt-2 text-sm ${s.key === "status" ? "text-[hsl(var(--signal))]" : ""}`}>
                  <Scramble text={s.v} onMount delay={1.4} />
                </dd>
              </div>
            ))}
          </dl>
        </Rise>

        <Rise onMount delay={1.5} className="mt-10 grid gap-8 md:grid-cols-2 md:items-end">
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">
            <span className="text-primary">&gt;&gt;&gt; </span>
            {t("description")}
          </p>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <BlockLink href="/projects">{t("projectsButton")}</BlockLink>
            <BlockLink href="/contact" variant="line">
              {t("contactButton")}
            </BlockLink>
          </div>
        </Rise>
      </div>

      <div className="border-t border-border">
        <div className="container flex items-center justify-between py-3">
          <a href="#index" className="label ml-auto flex items-center gap-3 hover:text-foreground">
            {t("scroll")}
            <span className="relative h-6 w-px overflow-hidden bg-border">
              <motion.span
                className="absolute inset-x-0 top-0 h-2 bg-primary"
                animate={{ y: [-8, 24] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeIn" }}
              />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
