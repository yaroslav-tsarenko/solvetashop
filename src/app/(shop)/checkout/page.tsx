"use client";

import { useState, useEffect, type ReactNode } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "@/i18n/routing";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCart } from "@/providers/CartProvider";
import { useAuth } from "@/providers/AuthProvider";
import { useCurrency } from "@/providers/CurrencyProvider";
import { checkoutSchema, type CheckoutFormData } from "@/lib/validators/checkout";
import { formatPrice } from "@/lib/utils/format-price";
import { COUNTRIES } from "@/lib/countries";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs/Breadcrumbs";
import { MerchantLocation } from "@/components/checkout/MerchantLocation";
import { TermsConsent } from "@/components/ui/TermsConsent";
import { toast } from "sonner";
import { ChevronDown, Lamp } from "lucide-react";
import { checkoutClasses as styles } from "./checkout-classes";
import {
  SHIPPING_METHODS,
  DEFAULT_SHIPPING_METHOD,
  FREE_STANDARD_MIN,
  qualifiesForFreeStandard,
  shippingCost,
} from "@/lib/shipping";

interface AppliedDiscount {
  type: "welcome" | "newsletter";
  percent: number;
  code: string;
  source: "auto" | "code";
}

type StepIndex = 0 | 1 | 2;

function Field({
  id,
  label,
  optional,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  optional?: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
        {optional && <span className="ml-1.5 font-normal text-faint">{optional}</span>}
      </label>
      {children}
      {error ? (
        <span id={`${id}-error`} className={styles.error}>
          {error}
        </span>
      ) : hint ? (
        <span className={styles.hint}>{hint}</span>
      ) : null}
    </div>
  );
}

export default function CheckoutPage() {
  const t = useTranslations("checkout");
  const nav = useTranslations("nav");
  const router = useRouter();
  const locale = useLocale();
  const { cart } = useCart();
  const { user } = useAuth();
  const { currency, convert } = useCurrency();
  const [step, setStep] = useState<StepIndex>(0);
  const [submitting, setSubmitting] = useState(false);
  const [discount, setDiscount] = useState<AppliedDiscount | null>(null);
  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState<string | null>(null);
  const [applyingPromo, setApplyingPromo] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      contact: { email: user?.email || "", phone: "" },
      shipping: {
        firstName: "",
        lastName: "",
        address1: "",
        address2: "",
        city: "",
        province: "",
        postalCode: "",
        country: "",
      },
      shippingMethod: DEFAULT_SHIPPING_METHOD,
      termsAccepted: false,
    },
  });

  const selectedMethod = watch("shippingMethod");
  const selectedCountry = watch("shipping.country");
  const contact = watch("contact");
  const shipping = watch("shipping");

  const countryData = COUNTRIES.find((c) => c.code === selectedCountry);
  const phoneHint = countryData ? `${countryData.phone} XX XXX XXXX` : "+44 XX XXX XXXX";

  const discountAmount = discount ? +(cart.subtotal * (discount.percent / 100)).toFixed(2) : 0;
  const discountedSubtotal = Math.max(cart.subtotal - discountAmount, 0);
  const taxOnDiscounted = +(discountedSubtotal * 0.21).toFixed(2);
  // Same rules (src/lib/shipping.ts) and rounding as /api/checkout, so the
  // total shown here is the amount charged.
  const finalShipping = shippingCost(selectedMethod ?? DEFAULT_SHIPPING_METHOD, discountedSubtotal);
  const grandTotal = +(discountedSubtotal + taxOnDiscounted + finalShipping).toFixed(2);
  const freeStandard = qualifiesForFreeStandard(discountedSubtotal);

  useEffect(() => {
    let cancelled = false;
    if (user) {
      fetch("/api/discounts")
        .then((r) => r.json())
        .then((d) => {
          if (!cancelled && d?.discount) setDiscount(d.discount);
        })
        .catch(() => null);
    }
    return () => { cancelled = true; };
  }, [user]);

  const applyPromo = async () => {
    const code = promoInput.trim();
    if (!code) return;
    setApplyingPromo(true);
    setPromoError(null);
    try {
      const r = await fetch(`/api/discounts?code=${encodeURIComponent(code)}`);
      const data = await r.json();
      if (data?.discount) {
        setDiscount(data.discount);
        setPromoInput("");
        toast.success(t("promoApplied", { percent: data.discount.percent }));
      } else {
        setPromoError(t("promoInvalid"));
      }
    } catch {
      setPromoError(t("promoFailed"));
    } finally {
      setApplyingPromo(false);
    }
  };

  const removeDiscount = () => {
    setDiscount(null);
    setPromoError(null);
  };

  const goNext = async () => {
    if (step === 0) {
      const valid = await trigger("contact");
      if (!valid) return;
    } else if (step === 1) {
      const valid = await trigger(["shipping", "shippingMethod"]);
      if (!valid) return;
    }
    setStep((s) => Math.min(s + 1, 2) as StepIndex);
  };

  const onSubmit = async (data: CheckoutFormData) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          locale,
          discountCode: discount?.source === "code" ? discount.code : undefined,
          currency,
          items: cart.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            variantName: item.variantName,
          })),
        }),
      });

      if (!res.ok) {
        let errorData;
        try {
          errorData = await res.json();
        } catch {
          // ignore
        }
        console.error("Checkout submission failed on server:", errorData);
        throw new Error(errorData?.details || errorData?.error || t("orderFailed"));
      }

      const order = await res.json();
      if (order.paymentLink) {
        window.location.href = order.paymentLink;
      } else {
        toast.success(t("orderPlaced"));
        router.push(`/order/confirmed?orderId=${order.id}`);
      }
    } catch (err: unknown) {
      toast.error((err instanceof Error && err.message) || t("orderFailed"));
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (cart.items.length === 0) {
      router.push("/cart");
    }
  }, [cart.items.length, router]);

  if (cart.items.length === 0) return null;

  // Enter inside an earlier section moves on instead of submitting the order.
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (step < 2) {
      e.preventDefault();
      void goNext();
      return;
    }
    void handleSubmit(onSubmit)(e);
  };

  const methodLabel = (key: string) => t(`methods.${key}.label`);
  const priceOrFree = (value: number) =>
    value === 0 ? t("free") : formatPrice(convert(value), currency);

  const sectionHeader = (index: StepIndex, title: string) => {
    const isActive = step === index;
    const isDone = step > index;
    return (
      <div className={styles.sectionHead}>
        <h2 className={`${styles.sectionTitle} ${isActive || isDone ? "text-ink" : "text-faint"}`}>
          <span className={`${styles.sectionNumber} ${isActive ? "text-sage" : "text-faint"}`}>
            {index + 1}
          </span>
          {title}
        </h2>
        {isDone && (
          <button
            type="button"
            onClick={() => setStep(index)}
            className="btn-quiet btn-sm text-muted"
            aria-label={t("changeSection", { section: title })}
          >
            {t("change")}
          </button>
        )}
      </div>
    );
  };

  const countryName = COUNTRIES.find((c) => c.code === shipping?.country)?.name ?? shipping?.country;

  return (
    <div className={styles.wrapper}>
      <Breadcrumbs items={[{ label: nav("home"), href: "/" }, { label: nav("cart"), href: "/cart" }, { label: t("title") }]} />

      <header className={styles.head}>
        <span className="eyebrow">{t("eyebrow")}</span>
        <h1 className={styles.title}>{t("title")}</h1>
        {!user && (
          <p className={styles.guestNote}>
            {t.rich("guestNote", {
              login: (chunks) => <Link href="/auth/login">{chunks}</Link>,
              register: (chunks) => <Link href="/auth/register">{chunks}</Link>,
            })}
          </p>
        )}
      </header>

      <div className={styles.layout}>
        <form onSubmit={handleFormSubmit} noValidate className={styles.form}>
          {/* 1 · Contact */}
          <section className={styles.section} aria-current={step === 0 ? "step" : undefined}>
            {sectionHeader(0, t("contact"))}
            {step === 0 ? (
              <div className={styles.sectionBody}>
                <Field
                  id="co-email"
                  label={t("email")}
                  error={errors.contact?.email ? t("errors.email") : undefined}
                  hint={!user ? t("emailHint") : undefined}
                >
                  <input
                    id="co-email"
                    type="email"
                    autoComplete="email"
                    className={`field ${errors.contact?.email ? "border-brick" : ""}`}
                    placeholder={t("placeholders.email")}
                    aria-invalid={errors.contact?.email ? true : undefined}
                    {...register("contact.email")}
                  />
                </Field>
                <Field id="co-phone" label={t("phone")} optional={t("optional")} hint={t("phoneHint")}>
                  <input
                    id="co-phone"
                    type="tel"
                    autoComplete="tel"
                    className="field"
                    placeholder={phoneHint}
                    {...register("contact.phone")}
                  />
                </Field>
                <div>
                  <button type="button" onClick={goNext} className="btn-ink">
                    {t("toDelivery")}
                  </button>
                </div>
              </div>
            ) : (
              <p className={styles.sectionRecap}>
                {contact?.email}
                {contact?.phone ? <> · {contact.phone}</> : null}
              </p>
            )}
          </section>

          {/* 2 · Delivery */}
          <section className={styles.section} aria-current={step === 1 ? "step" : undefined}>
            {sectionHeader(1, t("shipping"))}
            {step === 1 && (
              <div className={styles.sectionBody}>
                <div className={styles.twoCol}>
                  <Field id="co-first" label={t("firstName")} error={errors.shipping?.firstName ? t("errors.firstName") : undefined}>
                    <input
                      id="co-first"
                      autoComplete="given-name"
                      className={`field ${errors.shipping?.firstName ? "border-brick" : ""}`}
                      placeholder={t("placeholders.firstName")}
                      {...register("shipping.firstName")}
                    />
                  </Field>
                  <Field id="co-last" label={t("lastName")} error={errors.shipping?.lastName ? t("errors.lastName") : undefined}>
                    <input
                      id="co-last"
                      autoComplete="family-name"
                      className={`field ${errors.shipping?.lastName ? "border-brick" : ""}`}
                      placeholder={t("placeholders.lastName")}
                      {...register("shipping.lastName")}
                    />
                  </Field>
                </div>

                <Field id="co-country" label={t("country")} error={errors.shipping?.country ? t("errors.country") : undefined}>
                  <select
                    id="co-country"
                    autoComplete="country"
                    className={`field cursor-pointer ${errors.shipping?.country ? "border-brick" : ""}`}
                    {...register("shipping.country")}
                  >
                    <option value="">{t("placeholders.country")}</option>
                    {COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>{c.name}</option>
                    ))}
                  </select>
                </Field>

                <Field id="co-address" label={t("address")} error={errors.shipping?.address1 ? t("errors.address") : undefined}>
                  <input
                    id="co-address"
                    autoComplete="address-line1"
                    className={`field ${errors.shipping?.address1 ? "border-brick" : ""}`}
                    placeholder={t("placeholders.address")}
                    {...register("shipping.address1")}
                  />
                </Field>
                <Field id="co-address2" label={t("apartment")} optional={t("optional")}>
                  <input
                    id="co-address2"
                    autoComplete="address-line2"
                    className="field"
                    placeholder={t("placeholders.apartment")}
                    {...register("shipping.address2")}
                  />
                </Field>

                <div className={styles.twoCol}>
                  <Field id="co-city" label={t("city")} error={errors.shipping?.city ? t("errors.city") : undefined}>
                    <input
                      id="co-city"
                      autoComplete="address-level2"
                      className={`field ${errors.shipping?.city ? "border-brick" : ""}`}
                      placeholder={t("placeholders.city")}
                      {...register("shipping.city")}
                    />
                  </Field>
                  <Field id="co-postal" label={t("postalCode")} error={errors.shipping?.postalCode ? t("errors.postalCode") : undefined}>
                    <input
                      id="co-postal"
                      autoComplete="postal-code"
                      className={`field ${errors.shipping?.postalCode ? "border-brick" : ""}`}
                      placeholder={t("placeholders.postalCode")}
                      {...register("shipping.postalCode")}
                    />
                  </Field>
                </div>
                <Field id="co-region" label={t("province")} optional={t("optional")}>
                  <input
                    id="co-region"
                    autoComplete="address-level1"
                    className="field"
                    placeholder={t("placeholders.province")}
                    {...register("shipping.province")}
                  />
                </Field>

                <fieldset className="mt-3">
                  <legend className="field-label mb-3">{t("shippingMethod")}</legend>
                  <div className={styles.methodList}>
                    {SHIPPING_METHODS.map((m) => {
                      const isSelected = selectedMethod === m.key;
                      return (
                        <label key={m.key} className={styles.methodRow}>
                          <input type="radio" value={m.key} className="sr-only" {...register("shippingMethod")} />
                          <span
                            aria-hidden="true"
                            className={`flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full border ${
                              isSelected ? "border-ink" : "border-line-strong"
                            }`}
                          >
                            {isSelected && <span className="h-2 w-2 rounded-full bg-ink" />}
                          </span>
                          <span className="flex flex-1 flex-col">
                            <span className="text-sm text-ink">{methodLabel(m.key)}</span>
                            <span className="text-xs text-muted">{t(m.timeKey)}</span>
                          </span>
                          <span className="text-sm tabular-nums text-ink">
                            {priceOrFree(shippingCost(m.key, discountedSubtotal))}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                  <p className="mt-3 text-xs text-muted">
                    {freeStandard
                      ? t("freeStandardReached")
                      : t("freeStandardHint", { amount: formatPrice(convert(FREE_STANDARD_MIN), currency) })}
                  </p>
                </fieldset>

                <div>
                  <button type="button" onClick={goNext} className="btn-ink">
                    {t("toPayment")}
                  </button>
                </div>
              </div>
            )}
            {step > 1 && (
              <p className={styles.sectionRecap}>
                {shipping?.firstName} {shipping?.lastName}
                <br />
                {shipping?.address1}
                {shipping?.address2 ? `, ${shipping.address2}` : ""}, {shipping?.city} {shipping?.postalCode}, {countryName}
                <br />
                {methodLabel(selectedMethod)} · {priceOrFree(finalShipping)}
              </p>
            )}
          </section>

          {/* 3 · Payment */}
          <section className={styles.section} aria-current={step === 2 ? "step" : undefined}>
            {sectionHeader(2, t("payment"))}
            {step === 2 && (
              <div className={styles.sectionBody}>
                <p className="max-w-prose text-sm leading-relaxed text-muted">{t("paymentNote")}</p>

                <MerchantLocation
                  title={t("merchantLocationTitle")}
                  description={t("merchantLocationNote")}
                />

                <div className="border-t border-line pt-5">
                  <TermsConsent
                    id="co-terms"
                    error={errors.termsAccepted ? t("termsRequired") : undefined}
                    label={t.rich("termsConsent", {
                      terms: (chunks) => (
                        <Link href="/policies/terms" target="_blank">{chunks}</Link>
                      ),
                      privacy: (chunks) => (
                        <Link href="/policies/privacy" target="_blank">{chunks}</Link>
                      ),
                      returns: (chunks) => (
                        <Link href="/policies/returns" target="_blank">{chunks}</Link>
                      ),
                    })}
                    {...register("termsAccepted")}
                  />
                </div>

                <div className="flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-baseline gap-3">
                    <span className="text-sm text-muted">{t("toPay")}</span>
                    <span className="text-2xl font-light tracking-[-0.01em]">
                      {formatPrice(convert(grandTotal), currency)}
                    </span>
                  </div>
                  <button type="submit" disabled={submitting} className="btn-ink btn-lg w-full sm:w-auto" aria-busy={submitting}>
                    {submitting ? t("processing") : t("placeOrder")}
                  </button>
                </div>
              </div>
            )}
          </section>
        </form>

        {/* Summary column */}
        <aside className={styles.summary} aria-labelledby="co-summary">
          <div className="flex items-center justify-between gap-4">
            <h2 id="co-summary" className="eyebrow">{t("orderSummary")}</h2>
            <button
              type="button"
              onClick={() => setSummaryOpen((o) => !o)}
              aria-expanded={summaryOpen}
              aria-controls="co-summary-body"
              aria-label={summaryOpen ? t("hideSummary") : t("showSummary")}
              className="flex items-center gap-2 text-sm lg:hidden"
            >
              {formatPrice(convert(grandTotal), currency)}
              <ChevronDown
                size={16}
                strokeWidth={1.5}
                className={`transition-transform ${summaryOpen ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          <div id="co-summary-body" className={`${summaryOpen ? "block" : "hidden"} mt-6 lg:block`}>
            <ul className="flex flex-col gap-4 border-b border-line pb-6">
              {cart.items.map((item) => (
                <li key={item.id} className="flex items-center gap-4">
                  <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-[var(--radius-md)] bg-paper">
                    {item.imageUrl ? (
                      <Image src={item.imageUrl} alt="" fill sizes="56px" style={{ objectFit: "contain", padding: "4px" }} />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center text-faint">
                        <Lamp size={16} strokeWidth={1.25} />
                      </span>
                    )}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-[0.8125rem] text-ink">{item.name}</span>
                    <span className="text-xs text-muted">
                      {item.variantName ? `${item.variantName} · ` : ""}
                      {t("qty", { count: item.quantity })}
                    </span>
                  </div>
                  <span className="flex-shrink-0 text-[0.8125rem] tabular-nums">
                    {formatPrice(convert(item.price * item.quantity), currency)}
                  </span>
                </li>
              ))}
            </ul>

            {/* Promo code */}
            <div className="border-b border-line py-6">
              {discount ? (
                <div className="flex items-start justify-between gap-3 text-sm">
                  <div className="flex flex-col">
                    <span className="text-sage">{t("discountApplied", { percent: discount.percent })}</span>
                    <span className="text-xs text-muted">
                      {discount.type === "welcome" ? t("discountWelcome") : t("discountCode", { code: discount.code })}
                    </span>
                  </div>
                  {discount.source === "code" && (
                    <button type="button" onClick={removeDiscount} className="btn-quiet btn-sm min-h-0 text-muted">
                      {t("removeDiscount")}
                    </button>
                  )}
                </div>
              ) : (
                <div>
                  <label htmlFor="co-promo" className="field-label">{t("promoLabel")}</label>
                  <div className="flex gap-2">
                    <input
                      id="co-promo"
                      type="text"
                      value={promoInput}
                      onChange={(e) => { setPromoInput(e.target.value.toUpperCase()); setPromoError(null); }}
                      onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); void applyPromo(); } }}
                      placeholder="NEWS-XXXXXX"
                      className="field tracking-[0.04em]"
                    />
                    <button
                      type="button"
                      onClick={applyPromo}
                      disabled={!promoInput.trim() || applyingPromo}
                      className="btn-line flex-shrink-0"
                    >
                      {applyingPromo ? "…" : t("promoApply")}
                    </button>
                  </div>
                  {promoError && <span className={styles.error}>{promoError}</span>}
                </div>
              )}
            </div>

            <div className="pt-4">
              <div className={styles.summaryRow}>
                <span className="text-muted">{t("subtotal")}</span>
                <span className="tabular-nums">{formatPrice(convert(cart.subtotal), currency)}</span>
              </div>
              {discount && (
                <div className={`${styles.summaryRow} text-sage`}>
                  <span>{t("discountLine", { percent: discount.percent })}</span>
                  <span className="tabular-nums">−{formatPrice(convert(discountAmount), currency)}</span>
                </div>
              )}
              <div className={styles.summaryRow}>
                <span className="text-muted">{t("deliveryLine")}</span>
                <span className="tabular-nums">{priceOrFree(finalShipping)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span className="text-muted">{t("tax", { rate: 21 })}</span>
                <span className="tabular-nums">{formatPrice(convert(taxOnDiscounted), currency)}</span>
              </div>
              <div className={styles.summaryTotal}>
                <span className="text-sm font-medium">{t("total")}</span>
                <span className="text-2xl font-light tracking-[-0.01em] tabular-nums">
                  {formatPrice(convert(grandTotal), currency)}
                </span>
              </div>
            </div>

            <p className="mt-6 text-xs leading-relaxed text-faint">{t("secureNote")}</p>

            <div className="mt-6">
              <MerchantLocation
                title={t("merchantLocationTitle")}
                description={t("merchantLocationNote")}
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
