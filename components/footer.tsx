"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Barcode } from "@/components/telemetry";

export function Footer() {
  const t = useTranslations("Footer");
  const tHeader = useTranslations("Header");
  const year = new Date().getFullYear();

  const socialLinks = [
    { href: "https://github.com/hhartur", label: "GitHub" },
    { href: "https://linkedin.com/in/artur-carmello-2b67353a2", label: "LinkedIn" },
    { href: "https://x.com/hhartur_", label: "X / Twitter" },
    { href: "mailto:artur.carmello0@gmail.com", label: "Email" },
  ];

  const navLinks = [
    { href: "/", label: tHeader("home"), no: "01" },
    { href: "/projects", label: tHeader("projects"), no: "02" },
    { href: "/#skills", label: tHeader("skills"), no: "03" },
    { href: "/contact", label: tHeader("contact"), no: "04" },
  ];

  return (
    <footer className="border-t border-foreground">
      <div className="container">
        <div className="grid-lines grid-cols-1 md:grid-cols-12">
          <div className="py-8 pr-6 md:col-span-5">
            <p className="text-sm font-bold uppercase tracking-[0.08em]">
              hhartur<sup className="text-[9px] text-muted-foreground">®</sup>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">{t("description")}</p>
            <Barcode seed="hhartur-fs-2026" className="mt-8" />
          </div>

          <nav className="py-8 md:col-span-3 md:pl-6" aria-label={t("navigation")}>
            <p className="label">{"// "}{t("navigation")}</p>
            <ul className="mt-4 space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group inline-flex gap-3 uppercase tracking-[0.06em] hover:text-primary">
                    <span className="text-muted-foreground group-hover:text-primary">{link.no}</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="py-8 md:col-span-4 md:pl-6">
            <p className="label">{"// "}{t("connect")}</p>
            <ul className="mt-4 space-y-2 text-sm">
              {socialLinks.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 uppercase tracking-[0.06em] hover:text-primary"
                  >
                    {s.label}
                    <span className="transition-transform group-hover:translate-x-1">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="label">
            © {year} hhartur. {t("rights")}
          </p>
          <a href="#" className="label hover:text-foreground">
            [ ↑ {t("backToTop")} ]
          </a>
        </div>
      </div>
    </footer>
  );
}
