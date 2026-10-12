"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { BlockLink, Rise, SectionHead } from "@/components/telemetry";

export function CtaBand() {
  const t = useTranslations("Cta");
  const phrase = `${t("title")} ///`;

  return (
    <section className="pb-24 pt-8 md:pb-32">
      <div className="container">
        <SectionHead index="04" label={t("section")} />
      </div>

      <div className="mt-12 border-y border-foreground">
        <div className="hazard h-3 opacity-90" aria-hidden="true" />
        {/* frase gigante correndo; pausa no hover */}
        <Link
          href="/contact"
          className="group flex overflow-hidden border-y border-foreground py-6 transition-colors hover:bg-primary hover:text-primary-foreground md:py-10"
          aria-label={t("button")}
        >
          <div className="flex w-max shrink-0 animate-marquee group-hover:[animation-play-state:paused]" aria-hidden="true">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0">
                {[0, 1, 2].map((n) => (
                  <span key={n} className="macro whitespace-nowrap pr-10 text-[clamp(3.5rem,11vw,10rem)]">
                    {phrase}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </Link>
        <div className="hazard h-3 opacity-90" aria-hidden="true" />
      </div>

      <div className="container mt-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <Rise>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            <span className="text-primary">&gt;&gt;&gt; </span>
            {t("description")}
          </p>
        </Rise>
        <Rise delay={0.1}>
          <BlockLink href="/contact">{t("button")}</BlockLink>
        </Rise>
      </div>
    </section>
  );
}
