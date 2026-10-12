"use client";

import { useEffect, useId, useState } from "react";
import { useTranslations, useFormatter } from "next-intl";
import { Plus, Minus } from "lucide-react";

interface Review {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  user: { name: string | null };
}

interface ProductTabsProps {
  description?: string | null;
  characteristics?: Record<string, Record<string, string>> | null;
  reviews: Review[];
}

type SectionKey = "description" | "characteristics" | "reviews";

function countCharacteristics(chars: Record<string, Record<string, string>>): number {
  return Object.values(chars).reduce((sum, group) => sum + Object.keys(group).length, 0);
}

function Section({
  id,
  title,
  meta,
  open,
  onToggle,
  children,
}: {
  id: string;
  title: string;
  meta?: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  const uid = useId();
  const panelId = `${uid}-panel`;
  return (
    <section id={id} className="scroll-mt-[calc(var(--header-height,4rem)+1.5rem)] border-b border-line">
      <h2 className="m-0">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full cursor-pointer items-center justify-between gap-4 bg-transparent py-5 text-left text-lg font-normal tracking-[-0.01em] text-ink"
        >
          <span>
            {title}
            {meta && <span className="ml-2 text-sm text-muted">{meta}</span>}
          </span>
          {open ? <Minus size={18} strokeWidth={1.5} /> : <Plus size={18} strokeWidth={1.5} />}
        </button>
      </h2>
      <div id={panelId} hidden={!open} className="pb-8">
        {children}
      </div>
    </section>
  );
}

/**
 * Supplier descriptions arrive as a mix of plain text and simple HTML. Render
 * them as plain paragraphs: block/line breaks become paragraph splits, every
 * other tag is dropped and common entities are decoded. No HTML is injected.
 */
function toParagraphs(raw: string): string[] {
  return raw
    .replace(/<\s*br\s*\/?>/gi, "\n")
    .replace(/<\/\s*(p|div|li|h[1-6])\s*>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);
}

/** Product details as a stack of hairline accordions (description, specs, reviews). */
export function ProductTabs({ description, characteristics, reviews }: ProductTabsProps) {
  const t = useTranslations("product");
  const format = useFormatter();
  const [open, setOpen] = useState<Record<SectionKey, boolean>>({
    description: true,
    characteristics: false,
    reviews: false,
  });

  // Open the reviews section when someone follows the "#reviews" link.
  useEffect(() => {
    const sync = () => {
      if (window.location.hash === "#reviews") {
        setOpen((prev) => ({ ...prev, reviews: true }));
      }
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const toggle = (key: SectionKey) => setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  const groups = characteristics ? Object.entries(characteristics) : [];
  const totalCharCount = characteristics ? countCharacteristics(characteristics) : 0;
  const avgRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  return (
    <div className="border-t border-line">
      <Section
        id="description"
        title={t("description")}
        open={open.description}
        onToggle={() => toggle("description")}
      >
        {description ? (
          <div className="max-w-[68ch] text-[0.9375rem] leading-[1.8] text-muted [&_p]:mb-4 [&_p:last-child]:mb-0">
            {toParagraphs(description).map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        ) : (
          <p className="text-sm text-faint">{t("descriptionEmpty")}</p>
        )}
      </Section>

      <Section
        id="specifications"
        title={t("characteristics")}
        meta={totalCharCount > 0 ? String(totalCharCount) : undefined}
        open={open.characteristics}
        onToggle={() => toggle("characteristics")}
      >
        {groups.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
            {groups.map(([groupName, entries]) => (
              <div key={groupName}>
                <h3 className="eyebrow mb-2">{groupName}</h3>
                <dl className="m-0">
                  {Object.entries(entries).map(([key, value]) => (
                    <div key={key} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-4 border-b border-line py-2.5 text-sm">
                      <dt className="text-muted">{key}</dt>
                      <dd className="m-0 break-words text-ink">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-faint">{t("characteristicsEmpty")}</p>
        )}
      </Section>

      <Section
        id="reviews"
        title={t("reviewsHeading")}
        meta={reviews.length > 0 ? String(reviews.length) : undefined}
        open={open.reviews}
        onToggle={() => toggle("reviews")}
      >
        {reviews.length > 0 ? (
          <>
            <p className="mb-6 text-sm text-muted">
              {t("ratingSummary", { rating: Math.round(avgRating * 10) / 10, count: reviews.length })}
            </p>
            <ol className="m-0 list-none p-0">
              {reviews.map((review) => (
                <li key={review.id} className="border-t border-line py-5 first:border-t-0 first:pt-0">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <span className="text-sm font-medium text-ink">
                      {review.user.name || t("reviewAnonymous")}
                    </span>
                    <span className="text-xs text-muted">
                      {t("reviewStars", { rating: review.rating })}
                      <span aria-hidden="true"> · </span>
                      {format.dateTime(new Date(review.createdAt), { year: "numeric", month: "short", day: "numeric", timeZone: "Europe/London" })}
                    </span>
                  </div>
                  {review.comment && (
                    <p className="mt-2 max-w-[68ch] text-sm leading-[1.7] text-muted">{review.comment}</p>
                  )}
                </li>
              ))}
            </ol>
          </>
        ) : (
          <p className="text-sm text-faint">{t("noReviews")}</p>
        )}
      </Section>
    </div>
  );
}
