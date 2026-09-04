"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LOCALE_COOKIE, isLocale, type Locale } from "@/i18n/routing";

const LOCALE_STORAGE_KEY = "locale";
const ONE_YEAR = 60 * 60 * 24 * 365;

/** Persist the active locale to localStorage; store on the client. */
export function setStoredLocale(locale: Locale) {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // storage may be unavailable (private mode / disabled) — cookie still wins
  }
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${ONE_YEAR}; samesite=lax`;
}

/**
 * Keeps the localStorage-backed preference and the server-visible cookie in
 * sync. The cookie is what `request.ts` reads to render the right language, so
 * on the first visit we mirror whatever the visitor chose last time (held in
 * localStorage) into the cookie and re-render.
 *
 * `locale` is the language the server actually rendered this page in.
 */
export function LocaleSync({ locale }: { locale: Locale }) {
  const router = useRouter();

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    } catch {
      stored = null;
    }

    if (isLocale(stored)) {
      if (stored !== locale) {
        setStoredLocale(stored);
        router.refresh();
      }
    } else {
      // No prior choice: remember what the server picked so it sticks.
      setStoredLocale(locale);
    }
  }, [locale, router]);

  return null;
}
