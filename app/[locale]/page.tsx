import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocalizedHomePage } from "@/components/i18n/LocalizedHomePage";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, isLocale, localePath } from "@/lib/i18n/config";
import { dictionaries } from "@/lib/i18n/dictionaries";

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return SUPPORTED_LOCALES.filter((locale) => locale !== DEFAULT_LOCALE).map((locale) => ({
    locale,
  }));
}

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const title = dictionaries[locale].homepage?.hero?.titleAccent;

  return {
    title: typeof title === "string" ? `Journee — ${title}` : "Journee",
    alternates: {
      canonical: localePath("/", locale),
      languages: {
        en: "/",
        ja: "/ja",
        ar: "/ar",
        fr: "/fr",
        es: "/es",
        de: "/de",
        "x-default": "/",
      },
    },
  };
}

export default async function LocaleHomePage({ params }: LocalePageProps) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === DEFAULT_LOCALE) notFound();

  return <LocalizedHomePage locale={locale} />;
}
