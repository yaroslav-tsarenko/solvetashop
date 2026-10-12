"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Heart } from "lucide-react";
import { PriceDisplay } from "@/components/shared/PriceDisplay/PriceDisplay";
import { QuantitySelector } from "@/components/shared/QuantitySelector/QuantitySelector";
import { useCart } from "@/providers/CartProvider";
import { useCurrency } from "@/providers/CurrencyProvider";
import { formatPrice } from "@/lib/utils/format-price";
import { Link, useRouter } from "@/i18n/routing";
import { toast } from "sonner";

// Warranty add-on pricing — must stay in line with /policies/warranty.
const WARRANTY_OPTIONS = [
  { key: "none", years: 0, percent: 0, min: 0 },
  { key: "1year", years: 1, percent: 10, min: 6.99 },
  { key: "2year", years: 2, percent: 16, min: 9.99 },
  { key: "3year", years: 3, percent: 22, min: 12.99 },
];

const WARRANTY_MIN_PRODUCT_PRICE = 15;

function calcWarrantyPrice(productPrice: number, option: typeof WARRANTY_OPTIONS[number]): number {
  if (option.percent === 0) return 0;
  return Math.max(productPrice * (option.percent / 100), option.min);
}

interface ProductInfoProps {
  id: string;
  name: string;
  slug: string;
  sku: string;
  price: number;
  comparePrice?: number | null;
  quantity: number;
  shortDescription?: string | null;
  description?: string | null;
  brand?: string | null;
  condition: string;
  lowStockAlert: number;
  imageUrl?: string | null;
  ean?: string | null;
  reviewCount?: number;
  avgRating?: number;
  categoryPath?: { name: string; slug: string }[];
}

type WarrantyLabelKey = "warrantyNone" | "warranty1" | "warranty2" | "warranty3";

export function ProductInfo({
  id,
  name,
  slug,
  sku,
  price,
  comparePrice,
  quantity: stockQuantity,
  shortDescription,
  brand,
  condition,
  lowStockAlert,
  imageUrl,
  ean,
  reviewCount = 0,
  avgRating = 0,
  categoryPath = [],
}: ProductInfoProps) {
  const t = useTranslations("product");
  const [qty, setQty] = useState(1);
  const [selectedWarranty, setSelectedWarranty] = useState(0);
  const [saving, setSaving] = useState(false);
  const { addItem } = useCart();
  const { currency, convert } = useCurrency();
  const router = useRouter();

  const outOfStock = stockQuantity <= 0;
  const lowStock = stockQuantity > 0 && stockQuantity <= lowStockAlert;

  const warrantyAvailable = price >= WARRANTY_MIN_PRODUCT_PRICE;
  const warrantyOption = warrantyAvailable ? WARRANTY_OPTIONS[selectedWarranty] : WARRANTY_OPTIONS[0];
  const warrantyPrice = calcWarrantyPrice(price, warrantyOption);
  const totalPrice = price + warrantyPrice;

  const addToBag = () => {
    addItem({
      productId: id,
      name: warrantyOption.years > 0 ? `${name} + ${warrantyOption.years}yr warranty` : name,
      slug, sku, price: totalPrice, quantity: qty,
      imageUrl: imageUrl || null, maxQuantity: stockQuantity,
    });
  };

  const handleBuyNow = () => {
    addToBag();
    router.push("/checkout");
  };

  const handleWishlist = async () => {
    if (saving) return;
    setSaving(true);
    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: id }),
      });
      if (res.status === 401) {
        toast.message(t("wishlistSignIn"));
        return;
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "wishlist");
      if (data.action === "added") toast.success(t("wishlistAdded"));
      else toast.success(t("wishlistRemoved"));
    } catch {
      toast.error(t("wishlistError"));
    } finally {
      setSaving(false);
    }
  };

  const isOnSale = !!comparePrice && comparePrice > price;
  const savingsPercent = isOnSale ? Math.round(((comparePrice! - price) / comparePrice!) * 100) : 0;

  const conditionLabel = (() => {
    switch (condition.toLowerCase()) {
      case "new": return t("conditionNew");
      case "used": return t("conditionUsed");
      case "refurbished": return t("conditionRefurbished");
      default: return condition;
    }
  })();

  const eyebrow = brand || categoryPath[categoryPath.length - 1]?.name;
  const roundedRating = Math.round(avgRating * 10) / 10;

  return (
    <div className="flex flex-col">
      {/* Title block */}
      <header className="pb-6">
        {eyebrow && <span className="eyebrow mb-3 block">{eyebrow}</span>}
        <h1 className="break-words text-[2rem] font-light leading-[1.08] tracking-[-0.02em] text-ink [overflow-wrap:anywhere] md:text-[2.5rem]">
          {name}
        </h1>
        {reviewCount > 0 && (
          <a href="#reviews" className="mt-3 inline-block text-sm text-muted underline-offset-4 hover:text-ink hover:underline">
            {t("ratingSummary", { rating: roundedRating, count: reviewCount })}
          </a>
        )}
      </header>

      {/* Price + stock */}
      <div className="flex flex-wrap items-center gap-3">
        <PriceDisplay price={price} comparePrice={comparePrice} size="lg" />
        {isOnSale && <span className="tag tag-sale border border-line">{t("saveTag", { percent: savingsPercent })}</span>}
      </div>
      <p className="mt-2 flex items-center gap-2 text-sm text-muted">
        <span
          aria-hidden="true"
          className={[
            "inline-block h-1.5 w-1.5 rounded-full",
            outOfStock ? "bg-brick" : lowStock ? "bg-line-strong" : "bg-sage",
          ].join(" ")}
        />
        {outOfStock ? t("outOfStock") : lowStock ? t("onlyLeft", { count: stockQuantity }) : t("inStock")}
      </p>

      {shortDescription && (
        <p className="mt-6 text-[0.9375rem] leading-[1.75] text-muted">{shortDescription}</p>
      )}

      {/* Warranty add-on */}
      <fieldset className="m-0 mt-8 border-0 p-0">
        <legend className="mb-1 text-sm font-medium text-ink">{t("warrantyHeading")}</legend>
        <p className="mb-3 text-xs leading-relaxed text-muted">
          {t("warrantyNote")}{" "}
          <Link href="/policies/warranty" className="link-sage">{t("warrantyPolicyLink")}</Link>
        </p>
        {warrantyAvailable && (
          <div className="border-t border-line">
            {WARRANTY_OPTIONS.map((opt, idx) => {
              const active = idx === selectedWarranty;
              const labelKey: WarrantyLabelKey = idx === 0 ? "warrantyNone" : (`warranty${opt.years}` as WarrantyLabelKey);
              return (
                <label
                  key={opt.key}
                  className="flex cursor-pointer items-center gap-3 border-b border-line py-3 text-sm text-ink"
                >
                  <input
                    type="radio"
                    name={`warranty-${id}`}
                    value={opt.key}
                    checked={active}
                    onChange={() => setSelectedWarranty(idx)}
                    className="peer sr-only"
                  />
                  <span
                    aria-hidden="true"
                    className={[
                      "flex h-4 w-4 flex-none items-center justify-center rounded-full border peer-focus-visible:ring-2 peer-focus-visible:ring-sage-soft",
                      active ? "border-ink" : "border-line-strong",
                    ].join(" ")}
                  >
                    {active && <span className="h-2 w-2 rounded-full bg-ink" />}
                  </span>
                  <span className={`flex-1 ${active ? "text-ink" : "text-muted"}`}>{t(labelKey)}</span>
                  <span className="tabular-nums text-muted">
                    {opt.percent > 0
                      ? `+${formatPrice(convert(calcWarrantyPrice(price, opt)), currency)}`
                      : t("warrantyIncluded")}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </fieldset>

      {/* Actions */}
      <div className="mt-8 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="flex-none" aria-label={t("quantity")} role="group">
            <QuantitySelector quantity={qty} maxQuantity={stockQuantity} onChange={setQty} />
          </div>
          <button
            type="button"
            onClick={addToBag}
            disabled={outOfStock}
            className="btn-ink btn-lg flex-1"
          >
            {outOfStock ? t("outOfStock") : selectedWarranty > 0 && warrantyAvailable ? t("addToCartWithWarranty") : t("addToCart")}
          </button>
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={handleBuyNow} disabled={outOfStock} className="btn-line flex-1">
            {t("buyNow")}
          </button>
          <button
            type="button"
            onClick={handleWishlist}
            disabled={saving}
            className="btn-line"
            aria-label={t("addToWishlist")}
          >
            <Heart size={16} strokeWidth={1.5} />
            <span className="max-[380px]:hidden">{t("wishlistShort")}</span>
          </button>
        </div>
      </div>

      {/* Practical notes */}
      <ul className="m-0 mt-8 flex list-none flex-col gap-1.5 p-0 text-xs leading-relaxed text-muted">
        <li>
          {t("noteDelivery")}{" "}
          <Link href="/policies/shipping" className="link-sage">{t("noteDeliveryLink")}</Link>
        </li>
        <li>
          {t("noteReturns")}{" "}
          <Link href="/policies/returns" className="link-sage">{t("noteReturnsLink")}</Link>
        </li>
        <li>
          {t("notePayment")}{" "}
          <Link href="/policies/payment" className="link-sage">{t("notePaymentLink")}</Link>
        </li>
      </ul>

      {/* Quiet facts */}
      <dl className="m-0 mt-8 grid grid-cols-[auto_1fr] gap-x-8 gap-y-2 border-t border-line pt-6 text-xs">
        {brand && (
          <>
            <dt className="text-muted">{t("brand")}</dt>
            <dd className="m-0 text-ink">{brand}</dd>
          </>
        )}
        <dt className="text-muted">{t("condition")}</dt>
        <dd className="m-0 text-ink">{conditionLabel}</dd>
        <dt className="text-muted">{t("sku")}</dt>
        <dd className="m-0 break-all tabular-nums text-ink">{sku}</dd>
        {ean && (
          <>
            <dt className="text-muted">{t("ean")}</dt>
            <dd className="m-0 break-all tabular-nums text-ink">{ean}</dd>
          </>
        )}
      </dl>
    </div>
  );
}
