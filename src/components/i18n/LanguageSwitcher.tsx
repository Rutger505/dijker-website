"use client";

import { useLocale, useTranslations } from "next-intl";
import { Locale, routing, usePathname, useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { ChangeEvent } from "react";

export function LocaleSwitcher() {
  const t = useTranslations("localeSwitcher");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value;
    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      { pathname, params },
      { locale: nextLocale },
    );
  }

  return (
    <select
      className="rounded-md border-none border-primary bg-primary bg-transparent p-2 text-white outline-none ring-primary focus:ring-2 focus:ring-primary"
      defaultValue={locale}
      onChange={onSelectChange}
    >
      {routing.locales.map((locale) => (
        <option className={"text-white"} key={locale} value={locale}>
          {t(locale)}
        </option>
      ))}
    </select>
  );
}