import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";
import { routing } from "@/i18n/routing";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Blueprint } from "@/components/blueprint";
import { MotionProvider } from "@/components/motion-provider";

const display = Archivo({ subsets: ["latin"], weight: ["800", "900"], variable: "--font-display" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://hhartur.com.br"),
  title: {
    default: "hhartur - Full Stack Developer",
    template: "%s | hhartur",
  },
  description:
    "Portfolio of hhartur - Full Stack Developer specialized in Next.js, React, Node.js and modern web experiences",
  openGraph: {
    title: "hhartur - Full Stack Developer",
    description: "Portfolio of hhartur - Full Stack Developer",
    url: "https://hhartur.com.br",
    siteName: "hhartur",
    type: "website",
  },
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
      <body className={`${display.variable} ${mono.variable} crt`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange={false}
          >
            <MotionProvider>
              <Blueprint />
              <Header />
              {children}
              <Analytics />
              <Footer />
            </MotionProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
