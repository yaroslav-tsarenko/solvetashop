import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs/Breadcrumbs";
import { COMPANY } from "@/lib/company";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("about");
  return { title: t("metaTitle") };
}

const PRINCIPLES = ["light", "detail", "keep"] as const;

export default async function AboutPage() {
  const t = await getTranslations("about");
  const nav = await getTranslations("nav");

  return (
    <div className="wrap pb-24">
      <Breadcrumbs items={[{ label: nav("home"), href: "/" }, { label: t("crumb") }]} />

      {/* Opening statement */}
      <header className="grid gap-10 pb-16 pt-6 lg:grid-cols-12 lg:pb-24 lg:pt-10">
        <div className="lg:col-span-8">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h1 className="display mt-5 max-w-[14ch]">{t("title")}</h1>
        </div>
        <p className="lede self-end lg:col-span-4">{t("lede")}</p>
      </header>

      {/* Three short principles in text columns */}
      <section aria-labelledby="about-principles" className="border-t border-line py-14 lg:py-20">
        <h2 id="about-principles" className="eyebrow mb-10">
          {t("principlesLabel")}
        </h2>
        <ol className="grid gap-10 md:grid-cols-3 md:gap-12">
          {PRINCIPLES.map((key, index) => (
            <li key={key}>
              <span className="text-sm tabular-nums text-faint">0{index + 1}</span>
              <h3 className="mt-3 text-xl font-normal tracking-[-0.01em] text-ink">
                {t(`principles.${key}.title`)}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-[1.75] text-muted">
                {t(`principles.${key}.text`)}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Split: who runs the shop */}
      <section
        aria-labelledby="about-company"
        className="grid gap-8 border-t border-line py-14 lg:grid-cols-12 lg:gap-12 lg:py-20"
      >
        <h2 id="about-company" className="heading lg:col-span-5">
          {t("companyTitle")}
        </h2>
        <div className="space-y-5 text-[0.9375rem] leading-[1.8] text-text-secondary lg:col-span-6 lg:col-start-7">
          <p>
            {t("companyText", {
              tradingName: COMPANY.tradingName,
              legalName: COMPANY.legalName,
              number: COMPANY.companyNumber,
            })}
          </p>
          <p>{t("termsText")}</p>
          <div className="flex flex-wrap gap-3 pt-3">
            <Link href="/catalog" className="btn-ink">
              {t("ctaShop")}
            </Link>
            <Link href="/policies" className="btn-line">
              {t("ctaPolicies")}
            </Link>
            <Link href="/contact" className="btn-quiet">
              {t("ctaContact")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
