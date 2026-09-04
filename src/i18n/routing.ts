/**
 * Every locale the storefront serves. English is the default and the fallback
 * for anything unrecognised; the order here is the order the language menu
 * shows.
 *
 * The locale is no longer part of the URL. It lives in a cookie (mirrored to
 * localStorage) and is resolved server-side in `request.ts`, so every path is
 * served without a `/en`, `/fr`, … prefix. Adding a language means three things
 * and no more: an entry here, a `messages/<code>.json` translated from
 * `en.json`, and a label below.
 */
export const routing = {
  locales: ["en", "fr", "es", "sv", "pt"] as const,
  defaultLocale: "en" as const,
};

export type Locale = (typeof routing.locales)[number];

/** Name of the cookie that carries the active locale to the server. */
export const LOCALE_COOKIE = "NEXT_LOCALE";

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (routing.locales as readonly string[]).includes(value);
}

/**
 * What each language is called in that language — a Swede scans for
 * "Svenska", not for "Swedish".
 */
export const LOCALE_LABELS: Record<Locale, { native: string; short: string }> = {
  en: { native: "English", short: "EN" },
  fr: { native: "Français", short: "FR" },
  es: { native: "Español", short: "ES" },
  sv: { native: "Svenska", short: "SV" },
  pt: { native: "Português", short: "PT" },
};

/**
 * With locale routing gone, navigation is plain Next.js. These re-exports keep
 * the many call sites that import from `@/i18n/routing` working unchanged, and
 * give one place to swap implementations if that ever changes again.
 */
export { default as Link } from "next/link";
export { usePathname, useRouter, redirect } from "next/navigation";
