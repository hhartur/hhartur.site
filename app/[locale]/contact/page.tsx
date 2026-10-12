"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { BlockLink, Crosshair, EASE, Rise, Scramble, SectionHead } from "@/components/telemetry";

const channels = [
  { key: "email", cmd: "mail", value: "artur.carmello0@gmail.com", href: "mailto:artur.carmello0@gmail.com" },
  { key: "discord", cmd: "open", value: "dsc.gg/hhartur", href: "https://dsc.gg/hhartur" },
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

  return (
    <main className="min-h-[100dvh] pb-24 pt-28 md:pb-32 md:pt-32">
      <div className="container">
        <SectionHead index="04" label={t("section")} />

        <div className="mt-10 overflow-hidden [container-type:inline-size]">
          <motion.h1
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
            className="macro text-[length:17cqw] lg:text-[length:13cqw]"
          >
            {t("title")}
            <span className="text-primary">.</span>
          </motion.h1>
        </div>
        <Rise onMount delay={0.6}>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground">
            <span className="text-primary">&gt;&gt;&gt; </span>
            {t("description")}
          </p>
        </Rise>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {channels.map((c, i) => (
            <Rise key={c.key} onMount delay={0.75 + i * 0.1}>
              <div className="relative border border-border">
                <Crosshair className="-left-1.5 -top-1.5" />
                <div className="flex items-center justify-between border-b border-border px-4 py-2">
                  <span className="label text-foreground">
                    <span className="text-primary">[ 0{i + 1} ]</span> {t(`${c.key}.title`)}
                  </span>
                  <button
                    type="button"
                    onClick={() => copy(c.key, c.value)}
                    className="label border border-border px-2 py-1 transition-colors hover:border-foreground hover:text-foreground"
                  >
                    {copied === c.key ? `✓ ${t("copied")}` : t("copy")}
                  </button>
                </div>
                <div className="p-5 md:p-6">
                  <p className="label">{t(`${c.key}.description`)}</p>
                  {/* linha de comando */}
                  <p className="mt-6 break-all bg-foreground px-4 py-4 text-sm text-background">
                    <span className="text-primary">$</span> {c.cmd}{" "}
                    <Scramble text={c.value} onMount delay={0.9 + i * 0.15} />
                    <span className="ml-1 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-primary" aria-hidden="true" />
                  </p>
                  <BlockLink href={c.href} external className="mt-6 w-full">
                    {t(`${c.key}.action`)}
                  </BlockLink>
                </div>
              </div>
            </Rise>
          ))}
        </div>

        <Rise onMount delay={1} className="mt-6">
          <div className="grid-lines grid-cols-1 border border-border md:grid-cols-12">
            <div className="p-5 md:col-span-8 md:p-6">
              <p className="label text-foreground">{"// "}{t("preferences.title")}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t("preferences.description")}</p>
            </div>
            <div className="flex items-center gap-3 p-5 md:col-span-4 md:p-6">
              <span className="h-2 w-2 animate-pulse bg-[hsl(var(--signal))]" aria-hidden="true" />
              <span className="label text-[hsl(var(--signal))]">{t("preferences.responseTime")}</span>
            </div>
          </div>
        </Rise>
      </div>
    </main>
  );
}
