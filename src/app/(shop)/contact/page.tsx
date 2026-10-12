"use client";

import { useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowRight, Loader2 } from "lucide-react";
import { contactSchema, type ContactFormData } from "@/lib/validators/contact";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs/Breadcrumbs";
import { Link } from "@/i18n/routing";
import { COMPANY, COMPANY_ADDRESS } from "@/lib/company";

const TOPICS = ["general", "product", "order", "returns", "trade"] as const;

const errorCls = "mt-1.5 block text-xs text-brick";

export default function ContactPage() {
  const t = useTranslations("contact");
  const nav = useTranslations("nav");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
      reset();
      toast.success(t("success"));
    } catch {
      toast.error(t("error"));
    } finally {
      setLoading(false);
    }
  };

  const details: Array<{ label: string; value: ReactNode }> = [
    {
      label: t("emailLabel"),
      value: (
        <a href={`mailto:${COMPANY.email}`} className="link-sage">
          {COMPANY.email}
        </a>
      ),
    },
    {
      label: t("phoneLabel"),
      value: (
        <a href={COMPANY.phoneHref} className="transition-colors hover:text-sage">
          {COMPANY.phone}
        </a>
      ),
    },
    { label: t("companyLabel"), value: COMPANY.legalName },
    { label: t("companyNumberLabel"), value: COMPANY.companyNumber },
    { label: t("officeLabel"), value: COMPANY_ADDRESS },
  ];

  return (
    <div className="wrap pb-24">
      <Breadcrumbs items={[{ label: nav("home"), href: "/" }, { label: t("title") }]} />

      <header className="max-w-3xl pb-12 pt-4 lg:pb-16">
        <span className="eyebrow">{t("eyebrow")}</span>
        <h1 className="mt-4 text-[clamp(2.25rem,4.8vw,3.75rem)] font-light leading-[1.04] tracking-[-0.03em] text-ink">
          {t("heading")}
        </h1>
        <p className="lede mt-5">{t("lede")}</p>
      </header>

      <div className="grid gap-14 border-t border-line pt-12 lg:grid-cols-12 lg:gap-16 lg:pt-16">
        {/* Form */}
        <section aria-labelledby="contact-form-title" className="lg:col-span-7">
          <h2 id="contact-form-title" className="mb-8 text-2xl font-light tracking-[-0.015em] text-ink">
            {submitted ? t("sentTitle") : t("formTitle")}
          </h2>

          {submitted ? (
            <div className="max-w-md" role="status">
              <p className="text-[0.9375rem] leading-[1.75] text-text-secondary">{t("success")}</p>
              <button type="button" className="btn-line mt-8" onClick={() => setSubmitted(false)}>
                {t("sendAnother")}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="contact-topic" className="field-label">
                  {t("topicLabel")}
                </label>
                <select
                  id="contact-topic"
                  className="field"
                  defaultValue=""
                  onChange={(e) => {
                    const key = e.target.value as (typeof TOPICS)[number] | "";
                    if (key) setValue("subject", t(`topics.${key}`), { shouldValidate: true });
                  }}
                >
                  <option value="" disabled>
                    {t("topicPlaceholder")}
                  </option>
                  {TOPICS.map((key) => (
                    <option key={key} value={key}>
                      {t(`topics.${key}`)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="contact-name" className="field-label">
                  {t("name")}
                </label>
                <input
                  id="contact-name"
                  className="field"
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                  {...register("name")}
                />
                {errors.name && <span className={errorCls}>{t("errors.name")}</span>}
              </div>

              <div>
                <label htmlFor="contact-email" className="field-label">
                  {t("email")}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  className="field"
                  autoComplete="email"
                  placeholder={t("emailPlaceholder")}
                  aria-invalid={!!errors.email}
                  {...register("email")}
                />
                {errors.email && <span className={errorCls}>{t("errors.email")}</span>}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="contact-subject" className="field-label">
                  {t("subject")}
                </label>
                <input
                  id="contact-subject"
                  className="field"
                  placeholder={t("subjectPlaceholder")}
                  aria-invalid={!!errors.subject}
                  {...register("subject")}
                />
                {errors.subject && <span className={errorCls}>{t("errors.subject")}</span>}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="contact-message" className="field-label">
                  {t("message")}
                </label>
                <textarea
                  id="contact-message"
                  rows={6}
                  className="field resize-y leading-relaxed"
                  placeholder={t("messagePlaceholder")}
                  aria-invalid={!!errors.message}
                  {...register("message")}
                />
                {errors.message && <span className={errorCls}>{t("errors.message")}</span>}
              </div>

              <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-sm text-xs leading-relaxed text-muted">
                  {t("privacyNote")}{" "}
                  <Link href="/policies/privacy" className="link-sage">
                    {t("privacyLink")}
                  </Link>
                </p>
                <button type="submit" className="btn-ink" disabled={loading}>
                  {loading ? (
                    <Loader2 size={16} strokeWidth={1.5} className="animate-spin" aria-hidden="true" />
                  ) : null}
                  {loading ? t("sending") : t("send")}
                </button>
              </div>
            </form>
          )}
        </section>

        {/* Company details */}
        <aside aria-labelledby="contact-details-title" className="lg:col-span-4 lg:col-start-9">
          <h2 id="contact-details-title" className="eyebrow mb-5">
            {t("detailsTitle")}
          </h2>
          <dl className="border-t border-line text-[0.9375rem]">
            {details.map((row) => (
              <div key={row.label} className="border-b border-line py-4">
                <dt className="mb-1 text-xs text-muted">{row.label}</dt>
                <dd className="leading-relaxed text-ink">{row.value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-10 text-sm leading-relaxed text-muted">{t("faqPrompt")}</p>
          <Link href="/faq" className="mt-3 inline-flex items-center gap-2 text-sm text-ink underline decoration-1 underline-offset-4 transition-colors hover:text-sage-hover">
            {t("faqLink")}
            <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
          </Link>
        </aside>
      </div>
    </div>
  );
}
