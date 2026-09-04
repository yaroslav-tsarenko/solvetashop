"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname, routing, LOCALE_LABELS, type Locale } from "@/i18n/routing";
import { Check, Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const triggerCls =
  "relative flex h-9 items-center gap-1 rounded-lg border-none bg-transparent px-2 text-[#555] transition-colors duration-150 hover:bg-[#f5f5f5] hover:text-[#1A1D21] dark:text-[#aaa] dark:hover:bg-[#292524] dark:hover:text-white";

/**
 * Language menu.
 *
 * It swaps the locale segment of the *current* path rather than sending anyone
 * home, so switching language on a product page keeps you on that product. The
 * trigger shows the current code beside the globe, because a bare globe makes
 * people open the menu just to find out what they are already reading.
 */
export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function switchTo(next: Locale) {
    setOpen(false);
    if (next === locale) return;
    router.replace(pathname, { locale: next });
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        className={triggerCls}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Change language"
      >
        <Globe size={19} />
        <span className="text-xs font-bold tracking-wide">{LOCALE_LABELS[locale].short}</span>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Language"
          className="absolute right-0 top-full z-[60] mt-2 min-w-[11rem] overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] py-1 shadow-[var(--shadow-md)]"
        >
          {routing.locales.map((code) => {
            const active = code === locale;
            return (
              <li key={code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => switchTo(code)}
                  className={[
                    "flex w-full cursor-pointer items-center gap-2 border-none bg-transparent px-3 py-2 text-left text-sm transition-colors",
                    "hover:bg-[var(--color-bg-tertiary)]",
                    active
                      ? "font-bold text-[var(--color-text)]"
                      : "font-normal text-[var(--color-text-secondary)]",
                  ].join(" ")}
                >
                  <span className="w-7 shrink-0 text-xs font-bold tracking-wide text-[var(--color-text-tertiary)]">
                    {LOCALE_LABELS[code].short}
                  </span>
                  <span className="flex-1">{LOCALE_LABELS[code].native}</span>
                  {active ? (
                    <Check size={15} className="shrink-0 text-[var(--color-accent)]" />
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
