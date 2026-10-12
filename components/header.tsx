"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Code2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { EASE_OUT_EXPO } from "@/components/motion-primitives";
import { cn } from "@/lib/utils";

export function Header() {
  const t = useTranslations("Header");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  const links = [
    { href: "/", label: t("home") },
    { href: "/projects", label: t("projects") },
    { href: "/#skills", label: t("skills") },
    { href: "/contact", label: t("contact") },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : !href.includes("#") && pathname.startsWith(href);

  // fecha ao navegar e trava a rolagem enquanto o menu está aberto
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
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-4 md:pt-5"
      >
        <nav
          aria-label="Principal"
          className={cn(
            "flex w-full items-center justify-between gap-2 rounded-full py-1.5 pl-4 pr-1.5 ring-1 transition-[background-color,box-shadow] duration-700 ease-spring md:w-auto md:gap-8 md:pl-5",
            scrolled || open
              ? "bg-background/80 shadow-[0_10px_40px_-12px_hsl(var(--foreground)/0.25)] ring-foreground/10 backdrop-blur-xl"
              : "bg-background/40 ring-foreground/[0.06] backdrop-blur-md",
          )}
        >
          <Link href="/" className="group flex items-center gap-2 rounded-full" aria-label="hhartur">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-primary transition-transform duration-700 ease-spring group-hover:rotate-[360deg]">
              <Code2 className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <span className="text-base font-semibold tracking-tight">hhartur</span>
          </Link>

          <ul className="hidden items-center gap-0.5 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative block rounded-full px-4 py-2 text-sm transition-colors duration-300",
                    isActive(link.href) ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {isActive(link.href) && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-foreground/[0.07]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <LanguageSwitcher />
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t("closeMenu") : t("openMenu")}
              className="relative grid h-10 w-10 place-items-center rounded-full bg-foreground/[0.05] transition-colors hover:bg-foreground/10 md:hidden"
            >
              <span
                className={cn(
                  "absolute h-px w-5 bg-foreground transition-transform duration-500 ease-spring",
                  open ? "rotate-45" : "-translate-y-[4px]",
                )}
              />
              <span
                className={cn(
                  "absolute h-px w-5 bg-foreground transition-transform duration-500 ease-spring",
                  open ? "-rotate-45" : "translate-y-[4px]",
                )}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Menu em tela cheia (mobile) */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 flex flex-col bg-background/85 px-6 pb-10 pt-28 backdrop-blur-3xl md:hidden"
          >
            <ul className="flex flex-1 flex-col justify-center gap-1">
              {links.map((link, i) => (
                <li key={link.href} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.08 + i * 0.06, ease: EASE_OUT_EXPO }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between border-b border-foreground/[0.08] py-4"
                    >
                      <span
                        className={cn(
                          "text-[clamp(2.25rem,10vw,3.25rem)] font-medium leading-none tracking-[-0.045em]",
                          isActive(link.href) && "text-primary",
                        )}
                      >
                        {link.label}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="font-mono text-sm text-muted-foreground"
            >
              artur.carmello0@gmail.com
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
