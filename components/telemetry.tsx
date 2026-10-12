"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export const EASE = [0.16, 1, 0.3, 1] as const;
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&/<>+=";

/**
 * Texto que "decodifica": caracteres aleatórios se fixam da esquerda para a direita.
 * O HTML do servidor já traz o texto final (SEO e sem JS); a animação roda só no cliente.
 */
export function Scramble({
  text,
  className,
  delay = 0,
  duration = 700,
  onMount = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  onMount?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduced = useReducedMotion();
  const [output, setOutput] = useState(text);

  useEffect(() => {
    if (reduced || !(onMount || inView)) return;
    let frame = 0;
    let start = 0;
    const timer = window.setTimeout(() => {
      const tick = (now: number) => {
        if (!start) start = now;
        const progress = Math.min((now - start) / duration, 1);
        const fixed = Math.floor(progress * text.length);
        setOutput(
          text
            .split("")
            .map((ch, i) => (i < fixed || ch === " " ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
            .join(""),
        );
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, delay * 1000);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [inView, onMount, reduced, text, delay, duration]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{output}</span>
    </span>
  );
}

/** Revelação em cortina (clip-path) da esquerda para a direita. */
export function Wipe({
  delay = 0,
  onMount = false,
  className,
  children,
  ...rest
}: HTMLMotionProps<"div"> & { delay?: number; onMount?: boolean }) {
  const from = { clipPath: "inset(0 100% 0 0)" };
  const to = { clipPath: "inset(0 0% 0 0)" };
  return (
    <motion.div
      initial={from}
      {...(onMount ? { animate: to } : { whileInView: to, viewport: { once: true, margin: "0px 0px -10% 0px" } })}
      transition={{ duration: 1.1, delay, ease: EASE }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Entrada simples: sobe e aparece, sem desfoque (linguagem seca, mecânica). */
export function Rise({
  delay = 0,
  onMount = false,
  className,
  children,
  ...rest
}: HTMLMotionProps<"div"> & { delay?: number; onMount?: boolean }) {
  const to = { opacity: 1, y: 0 };
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      {...(onMount ? { animate: to } : { whileInView: to, viewport: { once: true, margin: "0px 0px -8% 0px" } })}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Cabeçalho de seção: [ 02 ] RÓTULO ───────── conteúdo à direita */
export function SectionHead({
  index,
  label,
  right,
  className,
}: {
  index: string;
  label: string;
  right?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span className="label text-primary">[ {index} ]</span>
      <Scramble text={label.toUpperCase()} className="label text-foreground" />
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE }}
        className="h-px flex-1 origin-left bg-border"
        aria-hidden="true"
      />
      {right}
    </div>
  );
}

/**
 * Link em bloco retangular. No hover, o preenchimento entra pela esquerda e as cores invertem.
 */
export function BlockLink({
  href,
  external = false,
  variant = "solid",
  className,
  children,
}: {
  href: string;
  external?: boolean;
  variant?: "solid" | "line";
  className?: string;
  children: React.ReactNode;
}) {
  const classes = cn(
    "group/block relative inline-flex items-center justify-between gap-6 overflow-hidden border px-5 py-4 text-xs font-medium uppercase tracking-[0.14em] transition-colors duration-300",
    variant === "solid"
      ? "border-primary bg-primary text-primary-foreground hover:text-background"
      : "border-foreground text-foreground hover:text-background",
    className,
  );
  const inner = (
    <>
      <span
        className="absolute inset-0 origin-left scale-x-0 bg-foreground transition-transform duration-500 ease-out-expo group-hover/block:scale-x-100"
        aria-hidden="true"
      />
      <span className="relative">[ {children} ]</span>
      <ArrowRight
        className="relative h-4 w-4 transition-transform duration-500 ease-out-expo group-hover/block:translate-x-1"
        strokeWidth={1.5}
      />
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}

/** Cruz de registro posicionada em interseções da grade. */
export function Crosshair({ className }: { className?: string }) {
  return (
    <span className={cn("pointer-events-none absolute h-3 w-3", className)} aria-hidden="true">
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-foreground/60" />
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-foreground/60" />
    </span>
  );
}

/** Código de barras decorativo a partir de uma string (determinístico). */
export function Barcode({ seed, className }: { seed: string; className?: string }) {
  const bars = Array.from(seed.repeat(3)).map((ch) => (ch.charCodeAt(0) % 3) + 1);
  return (
    <span className={cn("flex h-8 items-stretch gap-[2px]", className)} aria-hidden="true">
      {bars.map((w, i) => (
        <span key={i} className="bg-foreground" style={{ width: w, opacity: i % 5 === 0 ? 0.4 : 1 }} />
      ))}
    </span>
  );
}
