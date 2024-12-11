import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";

import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { ReactNode } from "react";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Locale, locales } from "@/i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import Header from "@/components/Header";
import { MantineProvider } from "@mantine/core";
import DijkerCarousel from "@/components/DijkerCarousel";
import { env } from "@/env";
import { Footer } from "@/components/Footer/Footer";

export async function generateMetadata(): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const t = await getTranslations("metadata");
  const locale = await getLocale();
  const alternateLocales = locales.filter((l) => l !== locale);
  const baseUrl = new URL(env.BASE_URL);

  return {
    metadataBase: baseUrl,
    title: t("title"),
    description: t("description"),
    keywords: [
      t("keywords.dijker"),
      t("keywords.vehicle"),
      t("keywords.belt drive"),
      t("keywords.multispeed"),
      t("keywords.high-tech"),
      t("keywords.recumbent-bike"),
    ],
    openGraph: {
      title: t("title"),
      description: t("description"),
      siteName: t("title"),
      type: "website",
      locale: locale,
      alternateLocale: alternateLocales,
      url: baseUrl,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={GeistSans.variable}>
        <NextIntlClientProvider messages={messages}>
          <MantineProvider>
            <div className={"grid min-h-screen grid-rows-[auto_auto_1fr_auto]"}>
              <Header />
              <DijkerCarousel />

              {children}

              <Footer />
            </div>
          </MantineProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
