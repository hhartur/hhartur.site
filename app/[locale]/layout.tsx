import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AnimatedBackground } from "@/components/animated-background";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "hhartur - Full Stack Developer",
  description: "Portfolio of hhartur - Full Stack Developer specialized in Next.js, React, Vue and more",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Valida se o locale é suportado
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Carrega as mensagens de tradução
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange={false}
          >
            <AnimatedBackground />
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}