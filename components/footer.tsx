"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { SiGithub, SiLinkedin, SiMailboxdotorg, SiMaildotcom, SiX } from "react-icons/si";
import { Code2, Mail } from "lucide-react";

export function Footer() {
  const t = useTranslations("Footer");
  const tHeader = useTranslations("Header");
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: SiGithub, href: "https://github.com/hhartur", label: "GitHub" },
    { icon: SiLinkedin, href: "https://linkedin.com/in/artur-carmello-2b67353a2", label: "LinkedIn" },
    { icon: SiX, href: "https://x.com/hhartur_", label: "Twitter" },
    { icon: Mail, href: "mailto:artur.carmello0@gmail.com", label: "Email" },
  ];

  const navLinks = [
    { href: "/", label: tHeader("home") },
    { href: "/#skills", label: tHeader("skills") },
    { href: "/#projects", label: tHeader("projects") },
    { href: "/contact", label: tHeader("contact") },
  ];

  return (
    <footer className="relative border-t border-border/40 bg-card/50 backdrop-blur-sm overflow-hidden">
      {/* Decoração estática no canto direito */}
      <div className="absolute bottom-0 right-0 pointer-events-none opacity-20">
        <div className="relative w-64 h-64">
          <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full border-2 border-primary/30" />
          <div className="absolute bottom-8 right-8 w-24 h-24 rounded-full bg-primary/10" />
          <div className="absolute bottom-16 right-16 w-16 h-16 rounded-full border-2 border-primary/40" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Logo e Descrição */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <Code2 className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">hhartur</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t("description")}
            </p>
          </motion.div>

          {/* Links de Navegação */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-4 text-sm font-semibold">{t("navigation")}</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Redes Sociais */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-4 text-sm font-semibold">{t("connect")}</h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background transition-colors hover:border-primary hover:text-primary"
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-8 border-t border-border/40 pt-8 text-center"
        >
          <p className="text-sm text-muted-foreground">
            © {currentYear} hhartur. {t("rights")}
          </p>
        </motion.div>
      </div>

      {/* Efeito de gradiente no topo */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </footer>
  );
}
