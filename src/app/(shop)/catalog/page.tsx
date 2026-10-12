"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams, useRouter } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { ProductGrid } from "@/components/product/ProductGrid/ProductGrid";
import { ProductFilters } from "@/components/product/ProductFilters/ProductFilters";
import { ProductSort } from "@/components/product/ProductSort/ProductSort";
import { ProductSkeleton } from "@/components/product/ProductSkeleton/ProductSkeleton";
import { EmptyState } from "@/components/shared/EmptyState/EmptyState";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs/Breadcrumbs";
import { catalogClasses as styles } from "./catalog-classes";

async function fetchWithRetry(
  input: string,
  init?: RequestInit,
  { retries = 3, backoffMs = 400 }: { retries?: number; backoffMs?: number } = {}
): Promise<Response> {
  let lastError: unknown;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(input, init);
      if (res.ok) return res;
      if (res.status >= 400 && res.status < 500) return res;
      lastError = new Error(`HTTP ${res.status}`);
    } catch (err) {
      lastError = err;
    }
    if (attempt < retries) {
      await new Promise((r) => setTimeout(r, backoffMs * Math.pow(2, attempt)));
    }
  }
  throw lastError instanceof Error ? lastError : new Error("Fetch failed");
}

interface CategoryNode {
  id: string;
  name: string;
  slug: string;
  children?: CategoryNode[];
}

function findCategoryName(nodes: CategoryNode[], slug: string): string | null {
  for (const node of nodes) {
    if (node.slug === slug) return node.name;
    if (node.children?.length) {
      const hit = findCategoryName(node.children, slug);
      if (hit) return hit;
    }
  }
  return null;
}

function pageList(page: number, totalPages: number): (number | "gap-start" | "gap-end")[] {
  const pages: (number | "gap-start" | "gap-end")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  }
  pages.push(1);
  if (page > 3) pages.push("gap-start");
  const start = Math.max(2, page - 1);
  const end = Math.min(totalPages - 1, page + 1);
  for (let i = start; i <= end; i++) pages.push(i);
  if (page < totalPages - 2) pages.push("gap-end");
  pages.push(totalPages);
  return pages;
}

export default function CatalogPage() {
  const t = useTranslations("listing");
  const nav = useTranslations("nav");
  const searchParams = useSearchParams();
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<CategoryNode[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [brands, setBrands] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const requestIdRef = useRef(0);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const page = parseInt(searchParams.get("page") || "1");
  const sort = searchParams.get("sort") || "newest";
  const category = searchParams.get("category") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const inStock = searchParams.get("inStock") === "true";
  const onSale = searchParams.get("onSale") === "true";
  const selectedBrand = searchParams.get("brand") || "";

  const updateParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value) params.set(key, value);
        else params.delete(key);
      });
      if (updates.page === undefined && !updates.page) params.set("page", "1");
      router.push(`?${params.toString()}`);
    },
    [searchParams, router]
  );

  useEffect(() => {
    let cancelled = false;
    fetchWithRetry("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setCategories(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("categories:", err));
    fetchWithRetry("/api/products/brands")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setBrands(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("brands:", err));
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const reqId = ++requestIdRef.current;
    // Fetch-on-param-change: flag the request as in flight before it starts.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    setLoadError(false);
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("sort", sort);
    if (category) params.set("category", category);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (inStock) params.set("inStock", "true");
    if (onSale) params.set("onSale", "true");
    if (selectedBrand) params.set("brand", selectedBrand);

    fetchWithRetry(`/api/products?${params}`)
      .then((res) => res.json())
      .then((data) => {
        if (reqId !== requestIdRef.current) return;
        setProducts(data.data || []);
        setTotal(data.total || 0);
        setTotalPages(data.totalPages || 1);
      })
      .catch((err) => {
        if (reqId !== requestIdRef.current) return;
        console.error("products:", err);
        setLoadError(true);
      })
      .finally(() => {
        if (reqId !== requestIdRef.current) return;
        setLoading(false);
      });
  }, [page, sort, category, minPrice, maxPrice, inStock, onSale, selectedBrand]);

  // Lock page scroll and listen for Escape while the drawer is open.
  useEffect(() => {
    if (!drawerOpen) return;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [drawerOpen]);

  const activeFilterCount = [category, minPrice, maxPrice, inStock, onSale, selectedBrand].filter(Boolean).length;

  const clearAll = () =>
    updateParams({ category: "", minPrice: "", maxPrice: "", inStock: "", onSale: "", brand: "", page: "1" });

  const categoryName = category ? findCategoryName(categories, category) || category : "";

  const priceChip =
    minPrice && maxPrice ? t("chipPriceRange", { min: `£${minPrice}`, max: `£${maxPrice}` })
    : minPrice ? t("chipPriceFrom", { amount: `£${minPrice}` })
    : maxPrice ? t("chipPriceTo", { amount: `£${maxPrice}` })
    : "";

  const chips: { key: string; label: string; clear: Record<string, string> }[] = [
    ...(category ? [{ key: "category", label: categoryName, clear: { category: "" } }] : []),
    ...(selectedBrand ? [{ key: "brand", label: selectedBrand, clear: { brand: "" } }] : []),
    ...(priceChip ? [{ key: "price", label: priceChip, clear: { minPrice: "", maxPrice: "" } }] : []),
    ...(inStock ? [{ key: "inStock", label: t("onlyInStock"), clear: { inStock: "" } }] : []),
    ...(onSale ? [{ key: "onSale", label: t("onlyReduced"), clear: { onSale: "" } }] : []),
  ];

  const filters = (
    <ProductFilters
      categories={categories}
      selectedCategory={category}
      minPrice={minPrice}
      maxPrice={maxPrice}
      inStock={inStock}
      onSale={onSale}
      brands={brands}
      selectedBrand={selectedBrand}
      onCategoryChange={(v) => { updateParams({ category: v, page: "1" }); setDrawerOpen(false); }}
      onMinPriceChange={(v) => updateParams({ minPrice: v, page: "1" })}
      onMaxPriceChange={(v) => updateParams({ maxPrice: v, page: "1" })}
      onInStockChange={(v) => updateParams({ inStock: v ? "true" : "", page: "1" })}
      onSaleChange={(v) => updateParams({ onSale: v ? "true" : "", page: "1" })}
      onBrandChange={(v) => { updateParams({ brand: v, page: "1" }); setDrawerOpen(false); }}
    />
  );

  return (
    <div className={styles.wrapper}>
      <Breadcrumbs
        items={[
          { label: nav("home"), href: "/" },
          ...(category
            ? [{ label: nav("catalog"), href: "/catalog" }, { label: categoryName }]
            : [{ label: nav("catalog") }]),
        ]}
      />

      <header className={styles.intro}>
        <h1 className={styles.title}>{categoryName || nav("catalog")}</h1>
        {!category && <p className={styles.lede}>{t("catalogLede")}</p>}
      </header>

      <div className={styles.bar}>
        <div className={styles.barStart}>
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className={styles.filterToggle}
            aria-haspopup="dialog"
            aria-expanded={drawerOpen}
          >
            <SlidersHorizontal size={16} strokeWidth={1.5} />
            {t("filterButton")}
            {activeFilterCount > 0 && <span className={styles.filterCount}>({activeFilterCount})</span>}
          </button>
          {chips.map((chip) => (
            <button
              key={chip.key}
              type="button"
              onClick={() => updateParams({ ...chip.clear, page: "1" })}
              className={styles.chip}
              aria-label={t("removeFilter", { label: chip.label })}
            >
              {chip.label}
              <X size={12} strokeWidth={1.5} />
            </button>
          ))}
          {chips.length > 1 && (
            <button type="button" onClick={clearAll} className={styles.clearAll}>
              {t("clearAll")}
            </button>
          )}
        </div>
        <div className={styles.barEnd}>
          <span className={styles.resultCount} aria-live="polite">
            {loading && products.length === 0 ? t("counting") : t("resultCount", { count: total })}
          </span>
          <ProductSort value={sort} onChange={(v) => updateParams({ sort: v, page: "1" })} />
        </div>
      </div>

      <div className="min-w-0">
        {loading && products.length === 0 ? (
          <ProductSkeleton count={12} />
        ) : loadError && products.length === 0 ? (
          <EmptyState
            title={t("loadErrorTitle")}
            subtitle={t("loadErrorText")}
            actionLabel={t("loadErrorAction")}
            actionHref={`?${searchParams.toString()}`}
          />
        ) : products.length === 0 ? (
          <EmptyState
            title={t("emptyTitle")}
            subtitle={activeFilterCount > 0 ? t("emptyFilteredText") : t("emptyText")}
            actionLabel={activeFilterCount > 0 ? t("clearAll") : nav("home")}
            actionHref={activeFilterCount > 0 ? "/catalog" : "/"}
          />
        ) : (
          <>
            <ProductGrid products={products} />
            {totalPages > 1 && (
              <nav className={styles.pagination} aria-label={t("paginationLabel")}>
                <button
                  type="button"
                  onClick={() => updateParams({ page: String(page - 1) })}
                  disabled={page <= 1}
                  className={styles.pageEdge}
                >
                  {t("previous")}
                </button>
                {pageList(page, totalPages).map((p) =>
                  typeof p === "string" ? (
                    <span key={p} className={styles.pageGap} aria-hidden="true">…</span>
                  ) : p === page ? (
                    <span key={p} className={styles.pageNumActive} aria-current="page">
                      {p}
                    </span>
                  ) : (
                    <button
                      key={p}
                      type="button"
                      onClick={() => updateParams({ page: String(p) })}
                      className={styles.pageNum}
                      aria-label={t("goToPage", { page: p })}
                    >
                      {p}
                    </button>
                  )
                )}
                <button
                  type="button"
                  onClick={() => updateParams({ page: String(page + 1) })}
                  disabled={page >= totalPages}
                  className={styles.pageEdge}
                >
                  {t("next")}
                </button>
              </nav>
            )}
          </>
        )}
      </div>

      {drawerOpen && (
        <div className={styles.drawerRoot}>
          <div className={styles.drawerBackdrop} onClick={() => setDrawerOpen(false)} aria-hidden="true" />
          <div
            className={styles.drawerPanel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="filters-title"
          >
            <div className={styles.drawerHead}>
              <h2 id="filters-title" className={styles.drawerTitle}>{t("drawerTitle")}</h2>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={() => setDrawerOpen(false)}
                className={styles.drawerClose}
                aria-label={t("drawerClose")}
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>
            <div className={styles.drawerBody}>{filters}</div>
            <div className={styles.drawerFoot}>
              <button
                type="button"
                onClick={clearAll}
                disabled={activeFilterCount === 0}
                className="btn-quiet btn-sm"
              >
                {t("clearAll")}
              </button>
              <button type="button" onClick={() => setDrawerOpen(false)} className="btn-ink">
                {loading ? t("counting") : t("showResults", { count: total })}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
