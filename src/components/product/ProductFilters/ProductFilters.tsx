"use client";

import { useTranslations } from "next-intl";

interface Category {
  id: string;
  name: string;
  slug: string;
  _count?: { products: number };
  children?: Category[];
}

interface ProductFiltersProps {
  categories: Category[];
  selectedCategory: string;
  minPrice: string;
  maxPrice: string;
  inStock: boolean;
  onSale: boolean;
  brands: string[];
  selectedBrand: string;
  onCategoryChange: (slug: string) => void;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  onInStockChange: (value: boolean) => void;
  onSaleChange: (value: boolean) => void;
  onBrandChange: (value: string) => void;
}

const PRICE_PRESETS: { min: string; max: string }[] = [
  { min: "", max: "25" },
  { min: "25", max: "50" },
  { min: "50", max: "100" },
  { min: "100", max: "" },
];

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-line py-6 first:pt-0 last:border-b-0">
      <h3 className="eyebrow m-0 mb-4 block">{title}</h3>
      {children}
    </section>
  );
}

/** A plain text option row: a small ring marks the current choice. */
function OptionRow({
  label,
  count,
  active,
  depth = 0,
  onSelect,
}: {
  label: string;
  count?: number;
  active: boolean;
  depth?: number;
  onSelect: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={active}
        className={[
          "flex w-full cursor-pointer items-center gap-3 bg-transparent py-1.5 text-left text-sm transition-colors",
          active ? "text-ink" : "text-muted hover:text-ink",
        ].join(" ")}
        style={{ paddingLeft: `${depth * 1}rem` }}
      >
        <span
          aria-hidden="true"
          className={[
            "flex h-3.5 w-3.5 flex-none items-center justify-center rounded-full border",
            active ? "border-ink" : "border-line-strong",
          ].join(" ")}
        >
          {active && <span className="h-1.5 w-1.5 rounded-full bg-ink" />}
        </span>
        <span className="flex-1">{label}</span>
        {count !== undefined && count > 0 && (
          <span className="text-xs tabular-nums text-faint">{count}</span>
        )}
      </button>
    </li>
  );
}

function CategoryRows({
  cats,
  depth,
  selectedCategory,
  onCategoryChange,
}: {
  cats: Category[];
  depth: number;
  selectedCategory: string;
  onCategoryChange: (slug: string) => void;
}) {
  return (
    <>
      {cats.map((cat) => (
        <CategoryBranch
          key={cat.id}
          cat={cat}
          depth={depth}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
        />
      ))}
    </>
  );
}

function CategoryBranch({
  cat,
  depth,
  selectedCategory,
  onCategoryChange,
}: {
  cat: Category;
  depth: number;
  selectedCategory: string;
  onCategoryChange: (slug: string) => void;
}) {
  return (
    <>
      <OptionRow
        label={cat.name}
        count={cat._count?.products || 0}
        active={selectedCategory === cat.slug}
        depth={depth}
        onSelect={() => onCategoryChange(cat.slug)}
      />
      {cat.children && cat.children.length > 0 && (
        <CategoryRows
          cats={cat.children}
          depth={depth + 1}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
        />
      )}
    </>
  );
}

/** Filter groups rendered inside the listing drawer. */
export function ProductFilters({
  categories,
  selectedCategory,
  minPrice,
  maxPrice,
  inStock,
  onSale,
  brands,
  selectedBrand,
  onCategoryChange,
  onMinPriceChange,
  onMaxPriceChange,
  onInStockChange,
  onSaleChange,
  onBrandChange,
}: ProductFiltersProps) {
  const t = useTranslations("listing");

  const presetLabel = ({ min, max }: { min: string; max: string }) =>
    !min ? t("priceUnder", { amount: `£${max}` })
    : !max ? t("priceOver", { amount: `£${min}` })
    : t("priceBetween", { min: `£${min}`, max: `£${max}` });

  return (
    <div className="flex flex-col">
      <Group title={t("groupCategory")}>
        {categories.length === 0 ? (
          <div className="flex flex-col gap-3" aria-busy="true">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-3 animate-pulse rounded-full bg-surface"
                style={{ width: `${45 + ((i * 17) % 40)}%` }}
              />
            ))}
          </div>
        ) : (
          <ul className="m-0 flex list-none flex-col p-0">
            <OptionRow
              label={t("allCategories")}
              active={!selectedCategory}
              onSelect={() => onCategoryChange("")}
            />
            <CategoryRows
              cats={categories}
              depth={0}
              selectedCategory={selectedCategory}
              onCategoryChange={onCategoryChange}
            />
          </ul>
        )}
      </Group>

      <Group title={t("groupPrice")}>
        <div className="mb-4 grid grid-cols-2 gap-3">
          <label className="block">
            <span className="field-label">{t("priceFrom")}</span>
            <input
              type="number"
              inputMode="decimal"
              min={0}
              placeholder="£"
              value={minPrice}
              onChange={(e) => onMinPriceChange(e.target.value)}
              className="field"
            />
          </label>
          <label className="block">
            <span className="field-label">{t("priceTo")}</span>
            <input
              type="number"
              inputMode="decimal"
              min={0}
              placeholder="£"
              value={maxPrice}
              onChange={(e) => onMaxPriceChange(e.target.value)}
              className="field"
            />
          </label>
        </div>
        <div className="flex flex-wrap gap-2">
          {PRICE_PRESETS.map((preset) => {
            const active = minPrice === preset.min && maxPrice === preset.max;
            return (
              <button
                key={`${preset.min}-${preset.max}`}
                type="button"
                aria-pressed={active}
                onClick={() => { onMinPriceChange(preset.min); onMaxPriceChange(preset.max); }}
                className={[
                  "cursor-pointer rounded-[var(--radius-pill)] border px-3 py-1.5 text-xs transition-colors",
                  active ? "border-ink text-ink" : "border-line text-muted hover:border-line-strong hover:text-ink",
                ].join(" ")}
              >
                {presetLabel(preset)}
              </button>
            );
          })}
        </div>
      </Group>

      {brands.length > 0 && (
        <Group title={t("groupBrand")}>
          <ul className="m-0 flex max-h-[240px] list-none flex-col overflow-y-auto p-0">
            <OptionRow label={t("allBrands")} active={!selectedBrand} onSelect={() => onBrandChange("")} />
            {brands.map((brand) => (
              <OptionRow
                key={brand}
                label={brand}
                active={selectedBrand === brand}
                onSelect={() => onBrandChange(brand)}
              />
            ))}
          </ul>
        </Group>
      )}

      <Group title={t("groupShow")}>
        <label className="flex cursor-pointer items-center gap-3 py-1.5 text-sm text-muted hover:text-ink">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => onInStockChange(e.target.checked)}
            className="h-4 w-4 [accent-color:var(--color-ink)]"
          />
          <span>{t("onlyInStock")}</span>
        </label>
        <label className="flex cursor-pointer items-center gap-3 py-1.5 text-sm text-muted hover:text-ink">
          <input
            type="checkbox"
            checked={onSale}
            onChange={(e) => onSaleChange(e.target.checked)}
            className="h-4 w-4 [accent-color:var(--color-ink)]"
          />
          <span>{t("onlyReduced")}</span>
        </label>
      </Group>
    </div>
  );
}
