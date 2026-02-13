"use client";

import { motion } from "framer-motion";
import { Mail, MessageSquare } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const contactMethods = [
  {
    icon: Mail,
    key: "email",
    value: "artur.carmello0@gmail.com",
    href: "mailto:artur.carmello0@gmail.com",
    color: "text-blue-500",
  },
  {
    icon: MessageSquare,
    key: "discord",
    value: "dsc.gg/hhartur",
    href: "https://dsc.gg/hhartur",
    color: "text-indigo-500",
  },
];

export default function ContactPage() {
  const t = useTranslations("Contact");

  return (
    <main className="min-h-screen pt-24 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t("title")} <span className="text-primary">{t("titleHighlight")}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("description")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            >
              <Link
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group relative rounded-lg border border-border bg-card p-8 transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/20"
                >
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className={`rounded-full bg-primary/10 p-4 ${method.color}`}>
                      <method.icon className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        {t(`${method.key}.title`)}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {t(`${method.key}.description`)}
                      </p>
                      <p className="text-sm font-mono text-primary">
                        {method.value}
                      </p>
                    </div>
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                      {t(`${method.key}.action`)}
                    </Button>
                  </div>
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 transition-opacity group-hover:opacity-100" />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center p-8 rounded-lg border border-border bg-card mb-20"
        >
          <h3 className="text-xl font-semibold mb-3">
            {t("preferences.title")}
          </h3>
          <p className="text-muted-foreground mb-4">
            {t("preferences.description")}
          </p>
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            {t("preferences.responseTime")}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
