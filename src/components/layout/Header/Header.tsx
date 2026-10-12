"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Link } from "@/i18n/routing";
import { Search, User, Heart, ShoppingBag, Menu, X, ArrowRight } from "lucide-react";
import { useCart } from "@/providers/CartProvider";
import { useAuth } from "@/providers/AuthProvider";
import { Wordmark } from "../Wordmark/Wordmark";
import { PreferenceFields, PreferencesMenu } from "./Preferences";

interface Category {
  id: string;
  name: string;
  slug: string;
  _count: { products: number };
  children?: Category[];
}

function subtreeCount(cat: Category): number {
  const own = cat._count?.products || 0;
  return own + (cat.children || []).reduce((s, c) => s + subtreeCount(c), 0);
}

const ICON = { size: 20, strokeWidth: 1.5 } as const;
const iconBtn =
  "relative inline-flex h-10 w-10 items-center justify-center text-ink transition-colors hover:text-sage-hover";
const navLink =
  "relative py-2 text-[0.8125rem] font-medium text-ink transition-colors hover:text-sage-hover after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100";

export function Header() {
  const t = useTranslations("header");
  const nav = useTranslations("nav");
  const router = useRouter();
  const pathname = usePathname();
  const { itemCount } = useCart();
  const { user, role } = useAuth();
  const isAdmin = !!user && (role === "ADMIN" || role === "SUPER_ADMIN");

  const [categories, setCategories] = useState<Category[]>([]);
  const [panel, setPanel] = useState<"none" | "browse" | "search" | "drawer">("none");
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const browseTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((data) => {
        if (!Array.isArray(data)) return;
        const ranked = (data as Category[])
          .filter((c) => subtreeCount(c) > 0)
          .sort((a, b) => subtreeCount(b) - subtreeCount(a));
        setCategories(ranked);
      })
      .catch(() => {});
  }, []);

  // Close any open layer on navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setPanel("none");
  }

  useEffect(() => {
    document.body.style.overflow = panel === "drawer" || panel === "search" ? "hidden" : "";
    if (panel === "search") searchRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPanel("none");
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [panel]);

  const openBrowse = useCallback(() => {
    clearTimeout(browseTimer.current);
    setPanel((p) => (p === "none" || p === "browse" ? "browse" : p));
  }, []);
  const closeBrowse = useCallback(() => {
    browseTimer.current = setTimeout(() => setPanel((p) => (p === "browse" ? "none" : p)), 180);
  }, []);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    setPanel("none");
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  // Inline links favour categories that hold products directly, so a broad
  // umbrella category does not crowd out the specific ones.
  const inline = categories.filter((c) => (c._count?.products || 0) > 0).slice(0, 4);

  return (
    <>
      <p className="m-0 border-b border-line bg-paper py-2 text-center text-[0.6875rem] tracking-[0.04em] text-muted">
        {t("announcement")}
      </p>

      <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur-sm">
        <div className="wrap grid h-[var(--header-height)] grid-cols-[auto_1fr_auto] items-center gap-8">
          {/* left: menu (mobile) + wordmark */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className={`${iconBtn} -ml-2.5 lg:hidden`}
              onClick={() => setPanel("drawer")}
              aria-label={t("menu")}
            >
              <Menu {...ICON} />
            </button>
            <Link href="/" aria-label="solveta·shop">
              <Wordmark size={24} />
            </Link>
          </div>

          {/* centre: category nav (desktop) */}
          <nav aria-label={nav("catalog")} className="hidden min-w-0 items-center justify-center gap-8 lg:flex">
            <div onMouseEnter={openBrowse} onMouseLeave={closeBrowse}>
              <button
                type="button"
                className={navLink}
                aria-expanded={panel === "browse"}
                onClick={() => setPanel((p) => (p === "browse" ? "none" : "browse"))}
              >
                {t("shopAll")}
              </button>
            </div>
            {inline.map((cat, i) => (
              <Link
                key={cat.id}
                href={`/catalog/${cat.slug}`}
                className={`${navLink} truncate ${i >= 2 ? "hidden xl:inline" : ""}`}
              >
                {cat.name}
              </Link>
            ))}
          </nav>

          {/* right: utilities */}
          <div className="flex items-center justify-end gap-0.5">
            <div className="hidden lg:block">
              <PreferencesMenu />
            </div>
            <button type="button" className={iconBtn} onClick={() => setPanel("search")} aria-label={t("openSearch")}>
              <Search {...ICON} />
            </button>
            <Link href={user ? "/account" : "/auth/login"} className={`${iconBtn} hidden sm:inline-flex`} aria-label={user ? t("myAccount") : t("signIn")}>
              <User {...ICON} />
            </Link>
            {user ? (
              <Link href="/account/wishlist" className={`${iconBtn} hidden sm:inline-flex`} aria-label={t("wishlist")}>
                <Heart {...ICON} />
              </Link>
            ) : null}
            <Link href="/cart" className={`${iconBtn} -mr-2.5`} aria-label={`${t("bag")} (${itemCount})`}>
              <ShoppingBag {...ICON} />
              {itemCount > 0 ? (
                <span className="absolute right-0.5 top-1 min-w-4 rounded-[var(--radius-pill)] bg-sage px-1 text-center text-[0.625rem] font-medium leading-4 text-paper tabular-nums">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              ) : null}
            </Link>
          </div>
        </div>

        {/* Browse panel (desktop) */}
        {panel === "browse" ? (
          <div
            className="absolute inset-x-0 top-full border-b border-line bg-paper"
            onMouseEnter={openBrowse}
            onMouseLeave={closeBrowse}
          >
            <div className="wrap grid grid-cols-[1fr_16rem] gap-12 py-10">
              <ul className="m-0 grid list-none grid-cols-3 gap-x-10 gap-y-5 p-0">
                {categories.map((cat) => (
                  <li key={cat.id} className="min-w-0">
                    <Link href={`/catalog/${cat.slug}`} className="group flex items-baseline justify-between gap-3 border-b border-line pb-2.5">
                      <span className="truncate text-[0.9375rem] text-ink transition-colors group-hover:text-sage-hover">{cat.name}</span>
                      <span className="shrink-0 text-[0.6875rem] text-faint tabular-nums">{subtreeCount(cat)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col justify-between border-l border-line pl-10">
                <p className="eyebrow">{t("browse")}</p>
                <Link href="/catalog" className="group inline-flex items-center gap-2 text-[0.9375rem] text-ink">
                  {t("viewEverything")}
                  <ArrowRight size={16} strokeWidth={1.5} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </header>

      {/* Search overlay */}
      {panel === "search" ? (
        <div className="fixed inset-0 z-[90]" role="dialog" aria-modal="true" aria-label={t("searchLabel")}>
          <button type="button" aria-label={t("closeSearch")} className="absolute inset-0 bg-ink/25" onClick={() => setPanel("none")} />
          <div className="relative border-b border-line bg-paper">
            <form onSubmit={submitSearch} className="wrap flex items-center gap-4 py-8 sm:py-12">
              <Search size={26} strokeWidth={1.25} className="shrink-0 text-muted" />
              <label htmlFor="site-search" className="sr-only">{t("searchLabel")}</label>
              <input
                ref={searchRef}
                id="site-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={nav("search")}
                className="min-w-0 flex-1 border-none bg-transparent text-2xl font-light tracking-[-0.02em] text-ink outline-none placeholder:text-faint sm:text-4xl"
              />
              <button type="button" onClick={() => setPanel("none")} className={iconBtn} aria-label={t("closeSearch")}>
                <X {...ICON} />
              </button>
            </form>
            <p className="wrap -mt-4 pb-6 text-xs text-faint sm:-mt-6">{t("searchHint")}</p>
          </div>
        </div>
      ) : null}

      {/* Mobile drawer */}
      {panel === "drawer" ? (
        <div className="fixed inset-0 z-[100] lg:hidden" role="dialog" aria-modal="true" aria-label={t("menu")}>
          <button type="button" aria-label={t("closeMenu")} className="absolute inset-0 bg-ink/25" onClick={() => setPanel("none")} />
          <div className="absolute inset-y-0 left-0 flex w-[min(88vw,400px)] flex-col bg-paper">
            <div className="flex h-[var(--header-height)] items-center justify-between border-b border-line px-6">
              <Wordmark size={20} />
              <button type="button" onClick={() => setPanel("none")} className={`${iconBtn} -mr-2.5`} aria-label={t("closeMenu")}>
                <X {...ICON} />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-6 py-6">
              <Link href="/catalog" className="block pb-4 text-2xl font-light tracking-[-0.02em] text-ink">
                {t("shopAll")}
              </Link>
              <ul className="m-0 list-none p-0">
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <Link href={`/catalog/${cat.slug}`} className="flex items-baseline justify-between border-b border-line py-3 text-[0.9375rem] text-ink">
                      {cat.name}
                      <span className="text-[0.6875rem] text-faint">{subtreeCount(cat)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="m-0 mt-8 flex list-none flex-col gap-3 p-0 text-[0.875rem] text-muted">
                <li><Link href="/about" className="hover:text-ink">{t("about")}</Link></li>
                <li><Link href="/contact" className="hover:text-ink">{nav("contact")}</Link></li>
                {user ? <li><Link href="/account/wishlist" className="hover:text-ink">{t("wishlist")}</Link></li> : null}
                {isAdmin ? <li><a href="/admin" className="hover:text-ink">{t("adminPanel")}</a></li> : null}
              </ul>
              <div className="mt-8 border-t border-line pt-6">
                <PreferenceFields stacked />
              </div>
            </nav>
            <div className="flex gap-3 border-t border-line p-6">
              {user ? (
                <Link href="/account" className="btn-ink flex-1">{t("myAccount")}</Link>
              ) : (
                <>
                  <Link href="/auth/login" className="btn-ink flex-1">{t("signIn")}</Link>
                  <Link href="/auth/register" className="btn-line flex-1">{t("createAccount")}</Link>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {isAdmin ? (
        <a
          href="/admin"
          className="fixed bottom-5 left-5 z-40 hidden rounded-[var(--radius-pill)] border border-line bg-paper px-3.5 py-1.5 text-xs font-medium text-muted shadow-[var(--shadow-sm)] hover:text-ink lg:inline-block"
        >
          {t("adminPanel")}
        </a>
      ) : null}
    </>
  );
}
