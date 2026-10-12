"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Mail, MessageSquare } from "lucide-react";
import { useTranslations } from "next-intl";
import { EASE_OUT_EXPO, Eyebrow, SplitHeading } from "@/components/motion-primitives";

const contactMethods = [
  {
    icon: Mail,
    key: "email",
    value: "artur.carmello0@gmail.com",
    href: "mailto:artur.carmello0@gmail.com",
  },
  {
    icon: MessageSquare,
    key: "discord",
    value: "dsc.gg/hhartur",
    href: "https://dsc.gg/hhartur",
  },
] as const;

export default function ContactPage() {
  const t = useTranslations("Contact");
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied(null);
    }
  };

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 24, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 1, delay, ease: EASE_OUT_EXPO },
  });

  return (
    <main className="min-h-[100dvh] pb-24 pt-36 md:pb-32 md:pt-44">
      <div className="container max-w-5xl">
        <motion.div {...fade(0.15)}>
          <Eyebrow>{t("eyebrow")}</Eyebrow>
        </motion.div>
        <SplitHeading
          as="h1"
          text={t("title")}
          animateOnMount
          delay={0.25}
          className="mt-6 text-[clamp(3rem,9vw,7rem)] font-semibold leading-[0.92] tracking-[-0.05em]"
        />
        <motion.p {...fade(0.5)} className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          {t("description")}
        </motion.p>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {contactMethods.map((method, i) => (
            <motion.div key={method.key} {...fade(0.6 + i * 0.1)} className="group">
              <div className="bezel h-full">
                <div className="bezel-core flex h-full flex-col p-7 md:p-8">
                  <div className="flex items-start justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary transition-transform duration-500 ease-spring group-hover:-rotate-6">
                      <method.icon className="h-6 w-6" strokeWidth={1.5} />
                    </span>
                    <button
                      type="button"
                      onClick={() => copy(method.key, method.value)}
                      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-muted-foreground ring-1 ring-foreground/10 transition-colors hover:bg-foreground/[0.04] hover:text-foreground"
                    >
                      {copied === method.key ? (
                        <Check className="h-3.5 w-3.5 text-primary" strokeWidth={2} />
                      ) : (
                        <Copy className="h-3.5 w-3.5" strokeWidth={1.5} />
                      )}
                      {copied === method.key ? t("copied") : t("copy")}
                    </button>
                  </div>
                  <h2 className="mt-10 text-2xl font-semibold tracking-[-0.03em]">{t(`${method.key}.title`)}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{t(`${method.key}.description`)}</p>
                  <p className="mt-4 break-all font-mono text-sm text-primary">{method.value}</p>
                  <a
                    href={method.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn mt-8 inline-flex items-center justify-between gap-3 rounded-full bg-foreground py-1.5 pl-5 pr-1.5 text-sm font-medium text-background transition-transform duration-500 ease-spring active:scale-[0.97]"
                  >
                    {t(`${method.key}.action`)}
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-background/15 transition-transform duration-500 ease-spring group-hover/btn:-translate-y-px group-hover/btn:translate-x-0.5">
                      <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          {...fade(0.85)}
          className="mt-4 flex flex-col gap-4 rounded-[1.75rem] bg-foreground/[0.03] p-7 ring-1 ring-foreground/[0.07] md:flex-row md:items-center md:justify-between md:p-8"
        >
          <div className="max-w-xl">
            <h2 className="text-lg font-semibold">{t("preferences.title")}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t("preferences.description")}</p>
          </div>
          <div className="inline-flex shrink-0 items-center gap-2 text-sm text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            {t("preferences.responseTime")}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
