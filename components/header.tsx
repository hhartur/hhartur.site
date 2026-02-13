"use client";

import { Code2, Home, User, Briefcase, Mail, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const t = useTranslations("Header");

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Code2 className="h-6 w-6 text-primary" />
          </motion.div>
          <span className="text-lg font-bold">hhartur</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
          >
            <Home className="h-4 w-4" />
            {t("home")}
          </Link>

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {t("about")}
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/#skills" className="cursor-pointer">
                  {t("skills")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/#learning" className="cursor-pointer">
                  {t("learning")}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                {t("projects")}
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/#projects" className="cursor-pointer">
                  {t("viewProjects")}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/contact">
            <Button className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              {t("contact")}
            </Button>
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
}
