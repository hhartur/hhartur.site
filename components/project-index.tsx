"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { projects } from "@/lib/projects";
import { EASE, Rise, SectionHead } from "@/components/telemetry";
import { cn } from "@/lib/utils";

export function ProjectIndex() {
  const t = useTranslations("Index");
  const tp = useTranslations("Projects.items");
  const listRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  // prévia segue o cursor com mola (somente mouse)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 30, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 300, damping: 30, mass: 0.6 });

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !listRef.current) return;
    const rect = listRef.current.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <section id="index" className="py-24 md:py-32">
      <div className="container">
        <SectionHead
          index="02"
          label={t("section")}
          right={
            <Link href="/projects" className="label text-foreground hover:text-primary">
              [ {t("viewAll")} → ]
            </Link>
          }
        />

        <div ref={listRef} className="relative mt-12" onPointerMove={onMove} onPointerLeave={() => setHovered(null)}>
          {/* prévia flutuante */}
          <motion.div
            className="pointer-events-none absolute left-0 top-0 z-20 hidden w-[22rem] lg:block"
            style={{ x: sx, y: sy, translateX: "2rem", translateY: "-50%" }}
            aria-hidden="true"
          >
            <AnimatePresence>
              {hovered !== null && (
                <motion.div
                  key="preview"
                  initial={{ clipPath: "inset(50% 50% 50% 50%)" }}
                  animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                  exit={{ clipPath: "inset(50% 50% 50% 50%)" }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="relative aspect-[16/10] border border-foreground bg-foreground"
                >
                  {projects.map((p, i) => (
                    <Image
                      key={p.id}
                      src={p.image}
                      alt=""
                      fill
                      sizes="352px"
                      className={cn("object-cover object-left-top transition-opacity duration-300", hovered === i ? "opacity-100" : "opacity-0")}
                    />
                  ))}
                  <span className="label absolute bottom-0 left-0 bg-foreground px-2 py-1 text-background">
                    IMG / {String((hovered ?? 0) + 1).padStart(2, "0")}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* cabeçalho da tabela */}
          <div className="label hidden grid-cols-12 gap-4 border-b border-foreground pb-3 md:grid">
            <span className="col-span-1">{t("colNo")}</span>
            <span className="col-span-5">{t("colProject")}</span>
            <span className="col-span-3">{t("colType")}</span>
            <span className="col-span-3">{t("colStack")}</span>
          </div>

          <ul>
            {projects.map((project, i) => (
              <li key={project.id}>
                <Rise delay={i * 0.08}>
                  <Link
                    href="/projects"
                    onPointerEnter={() => setHovered(i)}
                    onFocus={() => setHovered(i)}
                    onBlur={() => setHovered(null)}
                    className="group relative grid grid-cols-12 items-center gap-4 overflow-hidden border-b border-border py-6 md:py-8"
                  >
                    {/* preenchimento invertido que entra pela esquerda */}
                    <span
                      className="absolute inset-0 origin-left scale-x-0 bg-foreground transition-transform duration-500 ease-out-expo group-hover:scale-x-100"
                      aria-hidden="true"
                    />
                    <span className="label relative col-span-2 transition-colors group-hover:text-background md:col-span-1">
                      {String(i + 1).padStart(3, "0")}
                    </span>
                    <span className="macro relative col-span-10 text-[clamp(2rem,4.4vw,4rem)] transition-[color,transform] duration-500 ease-out-expo group-hover:translate-x-2 group-hover:text-background md:col-span-5">
                      {tp(`${project.id}.title`)}
                    </span>
                    <span className="relative col-span-6 text-xs uppercase tracking-[0.1em] text-muted-foreground transition-colors group-hover:text-background md:col-span-3">
                      {tp(`${project.id}.category`)}
                    </span>
                    <span className="relative col-span-6 flex items-center justify-end gap-3 text-xs text-muted-foreground transition-colors group-hover:text-background md:col-span-3 md:justify-between">
                      <span className="hidden md:inline">{project.tags.slice(0, 2).join(" · ")}</span>
                      <ArrowUpRight
                        className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45 group-hover:text-primary"
                        strokeWidth={1.5}
                      />
                    </span>
                    {/* imagem inline no mobile */}
                    <span className="halftone is-live relative col-span-12 mt-2 block aspect-[16/9] md:hidden">
                      <Image src={project.image} alt="" fill sizes="100vw" className="object-cover object-left-top" />
                    </span>
                  </Link>
                </Rise>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
