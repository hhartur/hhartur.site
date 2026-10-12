"use client";

import { useTranslations } from "next-intl";
import { Mail } from "lucide-react";
import { PillButton } from "@/components/pill-button";
import { Eyebrow, Reveal, SplitHeading } from "@/components/motion-primitives";

export function CtaSection() {
  const t = useTranslations("Cta");

  return (
    <section className="pb-24 md:pb-32">
      <div className="container">
        <Reveal y={48}>
          <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-card px-6 py-20 text-center ring-1 ring-foreground/[0.07] sm:px-12 md:py-28">
            <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
              <div className="absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/30 blur-[110px]" />
              <div
                className="absolute inset-0 opacity-[0.15] [background-image:linear-gradient(hsl(var(--foreground)/0.2)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground)/0.2)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_70%)]"
              />
            </div>
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <SplitHeading
              text={t("title")}
              className="mx-auto mt-6 max-w-3xl text-[clamp(2.25rem,6vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.045em]"
            />
            <p className="mx-auto mt-6 max-w-md text-lg text-muted-foreground">{t("description")}</p>
            <div className="mt-10 flex justify-center">
              <PillButton href="/contact" size="lg" icon={Mail}>
                {t("button")}
              </PillButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
