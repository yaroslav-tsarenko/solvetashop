"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { ProductGrid } from "@/components/product/ProductGrid/ProductGrid";
import { EmptyState } from "@/components/shared/EmptyState/EmptyState";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner/LoadingSpinner";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs/Breadcrumbs";
import { catalogClasses as styles } from "../catalog/catalog-classes";

export default function SearchPage() {
  const t = useTranslations("listing");
  const common = useTranslations("common");
  const nav = useTranslations("nav");
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResults([]);
      return;
    }

    setLoading(true);
    const timer = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(query)}&limit=20`)
        .then((res) => res.json())
        .then((d) => setResults(Array.isArray(d) ? d : []))
        .catch(console.error)
        .finally(() => setLoading(false));
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const trimmed = query.trim();

  return (
    <div className={styles.wrapper}>
      <Breadcrumbs items={[{ label: nav("home"), href: "/" }, { label: common("search") }]} />

      <header className={styles.intro}>
        <h1 className={styles.title}>{t("searchTitle")}</h1>
        <div className="relative mt-8 max-w-2xl">
          <Search
            size={20}
            strokeWidth={1.5}
            className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
          <input
            type="search"
            aria-label={common("search")}
            placeholder={nav("search")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full border-0 border-b border-line-strong bg-transparent py-3 pl-8 pr-2 text-lg font-light text-ink placeholder:text-faint focus:border-ink focus:outline-none"
          />
        </div>
      </header>

      <div className={styles.bar}>
        <span className={styles.resultCount} aria-live="polite">
          {query.length < 2
            ? t("searchHint")
            : loading
            ? t("searching")
            : t("searchResultCount", { count: results.length, query: trimmed })}
        </span>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : results.length > 0 ? (
        <ProductGrid products={results} />
      ) : query.length >= 2 ? (
        <EmptyState
          title={t("searchEmptyTitle")}
          subtitle={t("searchEmptyText")}
          actionLabel={nav("catalog")}
          actionHref="/catalog"
        />
      ) : null}
    </div>
  );
}
