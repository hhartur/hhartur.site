"use client";

import { Fragment } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/** Entrada suave (fade + subida + desfoque) quando o elemento entra na tela. */
export function Reveal({
  delay = 0,
  y = 32,
  className,
  children,
  ...rest
}: HTMLMotionProps<"div"> & { delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE_OUT_EXPO }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/**
 * Título com palavras que sobem de uma máscara.
 * Trechos entre *asteriscos* recebem o acento serifado em itálico.
 */
export function SplitHeading({
  text,
  as = "h2",
  className,
  delay = 0,
  animateOnMount = false,
}: {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  delay?: number;
  animateOnMount?: boolean;
}) {
  const Tag = motion[as];
  const words: { text: string; accent: boolean }[] = [];
  let accent = false;
  for (const raw of text.split(/\s+/)) {
    let word = raw;
    if (word.startsWith("*")) {
      accent = true;
      word = word.slice(1);
    }
    const close = word.match(/\*([.,;:!?]*)$/);
    if (close) {
      words.push({ text: word.slice(0, close.index) + close[1], accent });
      accent = false;
      continue;
    }
    words.push({ text: word, accent });
  }

  const trigger = animateOnMount
    ? { animate: "show" as const }
    : { whileInView: "show" as const, viewport: { once: true, margin: "0px 0px -8% 0px" } };

  return (
    <Tag
      initial="hidden"
      {...trigger}
      transition={{ staggerChildren: 0.05, delayChildren: delay }}
      className={className}
      aria-label={text.replace(/\*/g, "")}
    >
      {words.map((word, i) => (
        // espaço comum entre as palavras para permitir quebra de linha
        <Fragment key={i}>
        <span aria-hidden="true" className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-top">
          <motion.span
            variants={{ hidden: { y: "105%" }, show: { y: 0 } }}
            transition={{ duration: 1, ease: EASE_OUT_EXPO }}
            className={cn("inline-block", word.accent && "serif-accent text-primary")}
          >
            {word.text}
          </motion.span>
        </span>
        {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-primary ring-1 ring-primary/20",
        className,
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
      </span>
      {children}
    </span>
  );
}
