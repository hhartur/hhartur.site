"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { EASE, Scramble } from "@/components/telemetry";
import { cn } from "@/lib/utils";

function Clock() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = () => new Date().toLocaleTimeString("pt-BR", { hour12: false });
    setTime(fmt());
    const id = window.setInterval(() => setTime(fmt()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time ?? "--:--:--"}</span>;
}

export function Header() {
  const t = useTranslations("Header");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: t("home"), no: "01" },
    { href: "/projects", label: t("projects"), no: "02" },
    { href: "/#skills", label: t("skills"), no: "03" },
    { href: "/contact", label: t("contact"), no: "04" },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : !href.includes("#") && pathname.startsWith(href);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: "-100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md"
      >
        <nav aria-label="Principal" className="container flex h-14 items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.08em]">
            <span className="grid h-6 w-6 place-items-center bg-primary text-[10px] font-bold text-primary-foreground">H</span>
            hhartur<sup className="text-[9px] text-muted-foreground">®</sup>
          </Link>

          <ul className="hidden h-full items-stretch md:flex">
            {links.map((link) => (
              <li key={link.href} className="border-l border-border last:border-r">
                <Link
                  href={link.href}
                  className={cn(
                    "group relative flex h-full items-center gap-2 px-5 text-[11px] uppercase tracking-[0.12em] transition-colors",
                    isActive(link.href) ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <span className={cn("transition-colors", isActive(link.href) ? "text-primary" : "group-hover:text-primary")}>
                    {link.no}
                  </span>
                  {link.label}
                  {isActive(link.href) && (
                    <motion.span
                      layoutId="nav-mark"
                      className="absolute inset-x-0 bottom-0 h-[2px] bg-primary"
                      transition={{ duration: 0.5, ease: EASE }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <span className="label mr-3 hidden lg:inline">
              {t("local")} <Clock />
            </span>
            <LanguageSwitcher />
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="ml-1 border border-foreground px-3 py-2 text-[11px] uppercase tracking-[0.12em] transition-colors active:bg-foreground active:text-background md:hidden"
            >
              [ {open ? t("close") : t("menu")} ]
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col bg-background pt-14 md:hidden"
          >
            <ul className="flex-1 border-t border-border">
              {links.map((link, i) => (
                <li key={link.href} className="border-b border-border">
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between px-4 py-5"
                  >
                    <span className={cn("macro text-[clamp(2.5rem,13vw,4rem)]", isActive(link.href) && "text-primary")}>
                      <Scramble text={link.label.toUpperCase()} onMount delay={0.1 + i * 0.06} />
                    </span>
                    <span className="label">{link.no}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="label border-t border-border px-4 py-4">artur.carmello0@gmail.com</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
