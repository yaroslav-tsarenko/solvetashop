"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { routing, LOCALE_LABELS, type Locale } from "@/i18n/routing";
import { setStoredLocale } from "@/components/layout/LocaleSync";
import { useCurrency, SUPPORTED_CURRENCIES, type Currency } from "@/providers/CurrencyProvider";
import { useTheme } from "@/providers/ThemeProvider";

const SYMBOLS: Record<Currency, string> = { GBP: "£", EUR: "€", USD: "$" };

function Field({
  id,
  label,
  hideLabel,
  children,
}: {
  id: string;
  label: string;
  hideLabel: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0 flex-1">
      <label htmlFor={id} className={hideLabel ? "sr-only" : "field-label !text-xs !font-normal !text-muted"}>
        {label}
      </label>
      <div className="relative">
        {children}
        <ChevronDown size={14} strokeWidth={1.5} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted" />
      </div>
    </div>
  );
}

/**
 * Language, currency and light/dark appearance as three plain native selects.
 * The locale lives in a cookie (no URL prefix), so a change writes the
 * preference and refreshes the current page in place.
 */
export function PreferenceFields({ compact = false, stacked = false }: { compact?: boolean; stacked?: boolean }) {
  const t = useTranslations("header");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const { currency, setCurrency } = useCurrency();
  const { theme, setTheme } = useTheme();
  const uid = useId();

  const changeLocale = (next: Locale) => {
    if (next === locale) return;
    setStoredLocale(next);
    router.refresh();
  };

  const selectCls =
    "w-full appearance-none rounded-[var(--radius-pill)] border border-line-strong bg-transparent py-2 pl-3.5 pr-8 text-[0.8125rem] text-ink focus:border-sage focus:outline-none";

  return (
    <div className={compact ? "flex items-center gap-2" : stacked ? "flex flex-col gap-3" : "flex flex-col gap-3 sm:flex-row"}>
      <Field id={`${uid}-lang`} label={t("language")} hideLabel={compact}>
        <select
          id={`${uid}-lang`}
          value={locale}
          onChange={(e) => changeLocale(e.target.value as Locale)}
          className={selectCls}
        >
          {routing.locales.map((code) => (
            <option key={code} value={code}>{LOCALE_LABELS[code].native}</option>
          ))}
        </select>
      </Field>
      <Field id={`${uid}-cur`} label={t("currency")} hideLabel={compact}>
        <select
          id={`${uid}-cur`}
          value={currency}
          onChange={(e) => setCurrency(e.target.value as Currency)}
          className={selectCls}
        >
          {SUPPORTED_CURRENCIES.map((code) => (
            <option key={code} value={code}>{code} {SYMBOLS[code]}</option>
          ))}
        </select>
      </Field>
      <Field id={`${uid}-theme`} label={t("appearance")} hideLabel={compact}>
        <select
          id={`${uid}-theme`}
          value={theme}
          onChange={(e) => setTheme(e.target.value as "light" | "dark")}
          className={selectCls}
        >
          <option value="light">{t("light")}</option>
          <option value="dark">{t("dark")}</option>
        </select>
      </Field>
    </div>
  );
}

/** Header trigger: shows "EN · £" and opens a small panel with the fields. */
export function PreferencesMenu() {
  const t = useTranslations("header");
  const locale = useLocale() as Locale;
  const { currency } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={t("preferences")}
        className="flex h-10 items-center gap-1 px-2 text-xs font-medium tracking-wide text-muted transition-colors hover:text-ink"
      >
        {LOCALE_LABELS[locale].short}
        <span aria-hidden="true" className="text-faint">·</span>
        {SYMBOLS[currency]}
      </button>
      {open ? (
        <div className="absolute right-0 top-full z-[70] mt-2 w-[19rem] rounded-[var(--radius-lg)] border border-line bg-paper p-5 shadow-[var(--shadow-md)]">
          <p className="eyebrow mb-4">{t("preferences")}</p>
          <PreferenceFields stacked />
        </div>
      ) : null}
    </div>
  );
}
