import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Plus } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs/Breadcrumbs";
import { COMPANY } from "@/lib/company";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("faq");
  return { title: t("metaTitle") };
}

/** Topics in reading order; each lists the question keys under `faq.items`. */
const TOPICS = [
  { key: "orders", items: ["cancel", "account", "contact"] },
  { key: "delivery", items: ["dispatch", "freeDelivery", "abroad", "tracking"] },
  { key: "returns", items: ["changeMind", "damaged", "refund"] },
  { key: "payment", items: ["methods", "warranty"] },
] as const;

export default async function FaqPage() {
  const t = await getTranslations("faq");
  const nav = await getTranslations("nav");
  const values = { email: COMPANY.email, phone: COMPANY.phone };

  return (
    <div className="wrap pb-24">
      <Breadcrumbs items={[{ label: nav("home"), href: "/" }, { label: t("crumb") }]} />

      <div className="grid gap-12 pt-4 lg:grid-cols-12 lg:gap-16">
        <header className="lg:col-span-4">
          <div className="lg:sticky lg:top-24">
            <span className="eyebrow">{t("eyebrow")}</span>
            <h1 className="mt-4 text-[clamp(2.25rem,4.5vw,3.5rem)] font-light leading-[1.04] tracking-[-0.03em] text-ink">
              {t("title")}
            </h1>
            <p className="lede mt-5">{t("lede")}</p>
            <nav aria-label={t("topicsLabel")} className="mt-8 hidden lg:block">
              <ul className="space-y-2 text-sm">
                {TOPICS.map((topic) => (
                  <li key={topic.key}>
                    <a href={`#faq-${topic.key}`} className="text-muted transition-colors hover:text-ink">
                      {t(`topics.${topic.key}`)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>

        <div className="lg:col-span-8">
          {TOPICS.map((topic) => (
            <section
              key={topic.key}
              id={`faq-${topic.key}`}
              aria-labelledby={`faq-${topic.key}-title`}
              className="scroll-mt-28 pb-12 last:pb-0"
            >
              <h2 id={`faq-${topic.key}-title`} className="eyebrow mb-3">
                {t(`topics.${topic.key}`)}
              </h2>
              <div className="border-t border-line">
                {topic.items.map((item) => (
                  <details key={item} className="group border-b border-line">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[1.0625rem] font-normal leading-snug text-ink marker:hidden [&::-webkit-details-marker]:hidden">
                      <span>{t(`items.${item}.q`)}</span>
                      <Plus
                        size={18}
                        strokeWidth={1.5}
                        aria-hidden="true"
                        className="mt-0.5 shrink-0 text-muted transition-transform duration-200 group-open:rotate-45"
                      />
                    </summary>
                    <p className="max-w-[62ch] pb-6 pr-10 text-[0.9375rem] leading-[1.75] text-text-secondary">
                      {t(`items.${item}.a`, values)}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          ))}

          <div className="mt-16 flex flex-col gap-5 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[0.9375rem] text-muted">{t("stillStuck")}</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="btn-ink btn-sm">
                {t("ctaContact")}
              </Link>
              <Link href="/policies" className="btn-line btn-sm">
                {t("ctaPolicies")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
