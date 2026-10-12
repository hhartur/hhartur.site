"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { SiGithub, SiLinkedin, SiX } from "react-icons/si";
import { ArrowUp, Code2, Mail } from "lucide-react";
import { Reveal } from "@/components/motion-primitives";

export function Footer() {
  const t = useTranslations("Footer");
  const tHeader = useTranslations("Header");
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: SiGithub, href: "https://github.com/hhartur", label: "GitHub" },
    { icon: SiLinkedin, href: "https://linkedin.com/in/artur-carmello-2b67353a2", label: "LinkedIn" },
    { icon: SiX, href: "https://x.com/hhartur_", label: "X" },
    { icon: Mail, href: "mailto:artur.carmello0@gmail.com", label: "Email" },
  ];

  const navLinks = [
    { href: "/", label: tHeader("home") },
    { href: "/projects", label: tHeader("projects") },
    { href: "/#skills", label: tHeader("skills") },
    { href: "/contact", label: tHeader("contact") },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-foreground/[0.07]">
      <div className="container pt-16 md:pt-20">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="space-y-4 md:col-span-5">
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-primary">
                <Code2 className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <span className="text-lg font-semibold tracking-tight">hhartur</span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">{t("description")}</p>
          </Reveal>

          <Reveal delay={0.08} className="md:col-span-3">
            <h3 className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{t("navigation")}</h3>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.16} className="md:col-span-4">
            <h3 className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{t("connect")}</h3>
            <div className="mt-5 flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="grid h-11 w-11 place-items-center rounded-full ring-1 ring-foreground/10 transition-[background-color,color,transform] duration-500 ease-spring hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground"
                >
                  <social.icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <p
          className="pointer-events-none mt-16 select-none text-center text-[22vw] font-semibold leading-[0.75] tracking-[-0.08em] text-foreground/[0.04] lg:text-[16rem]"
          aria-hidden="true"
        >
          hhartur
        </p>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-foreground/[0.07] py-8 text-sm text-muted-foreground sm:flex-row">
          <p>
            © {currentYear} hhartur. {t("rights")}
          </p>
          <a href="#" className="inline-flex items-center gap-2 transition-colors hover:text-foreground">
            {t("backToTop")}
            <ArrowUp className="h-4 w-4" strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </footer>
  );
}
