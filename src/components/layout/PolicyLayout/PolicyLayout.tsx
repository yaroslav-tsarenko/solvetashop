import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs/Breadcrumbs";
import { COMPANY, COMPANY_ADDRESS } from "@/lib/company";

/**
 * One numbered part of a legal document. The layout prints the number
 * (position in the array + 1) in front of the title and builds the
 * table of contents from the list, so clause numbers written inside
 * `body` (e.g. "4.2") must follow the array order.
 */
export interface PolicySection {
  /** Anchor id, kebab-case, unique within the page. */
  id: string;
  title: string;
  body: ReactNode;
}

interface PolicyLayoutProps {
  title: string;
  lastUpdated: string;
  /** Short plain-language summary shown under the title. */
  summary?: string;
  /** Un-numbered preamble rendered before section 1. */
  intro?: ReactNode;
  sections: PolicySection[];
}

/* Long-form reading styles for everything inside a section body. */
const proseCls = [
  "text-[0.9375rem] leading-[1.75] text-text-secondary",
  "[&_p]:mb-4 [&_p:last-child]:mb-0",
  "[&_h3]:mb-2 [&_h3]:mt-7 [&_h3]:text-[0.9375rem] [&_h3]:font-medium [&_h3]:text-ink",
  "[&_ul]:mb-4 [&_ul]:ml-5 [&_ul]:list-[circle] [&_ul_li]:mb-1.5 [&_ul_li]:pl-1",
  "[&_strong]:font-medium [&_strong]:text-ink",
  "[&_a]:text-sage [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-sage-hover",
  // Tables: no boxes, just hairline rules between rows.
  "[&_table]:my-6 [&_table]:block [&_table]:w-full [&_table]:overflow-x-auto [&_table]:border-collapse [&_table]:text-sm",
  "[&_thead]:table [&_tbody]:table [&_tr]:table [&_thead]:w-full [&_tbody]:w-full [&_tr]:w-full [&_thead]:table-fixed [&_tbody]:table-fixed [&_tr]:table-fixed",
  "[&_th]:border-b [&_th]:border-line-strong [&_th]:py-2.5 [&_th]:pr-4 [&_th]:text-left [&_th]:text-xs [&_th]:font-medium [&_th]:uppercase [&_th]:tracking-[0.06em] [&_th]:text-muted",
  "[&_td]:border-b [&_td]:border-line [&_td]:py-3 [&_td]:pr-4 [&_td]:align-top [&_td]:break-words",
].join(" ");

export function PolicyLayout({ title, lastUpdated, summary, intro, sections }: PolicyLayoutProps) {
  return (
    <div className="wrap pb-24 [overflow-wrap:anywhere]">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Legal", href: "/policies" },
          { label: title },
        ]}
      />

      <header className="border-b border-line pb-10 pt-4 sm:pb-14">
        <span className="eyebrow">Legal</span>
        <h1 className="mt-4 max-w-4xl text-[clamp(2rem,4.4vw,3.5rem)] font-light leading-[1.05] tracking-[-0.025em] text-ink">
          {title}
        </h1>
        {summary ? <p className="lede mt-5">{summary}</p> : null}
        <p className="mt-6 text-xs text-muted">
          Last updated <time>{lastUpdated}</time>
        </p>
      </header>

      <div className="grid gap-12 pt-10 lg:grid-cols-[15rem_minmax(0,760px)] lg:gap-20 lg:pt-14">
        <aside className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:self-start lg:overflow-y-auto">
          <p className="eyebrow mb-4">On this page</p>
          <ol className="space-y-2 border-l border-line pl-4 text-[0.8125rem] leading-snug">
            {sections.map((section, index) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="flex gap-2 text-muted transition-colors hover:text-ink"
                >
                  <span className="w-5 shrink-0 tabular-nums text-faint">{index + 1}</span>
                  <span>{section.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </aside>

        <article className="min-w-0">
          {intro ? <div className={`${proseCls} mb-12`}>{intro}</div> : null}
          {sections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-title`}
              className="scroll-mt-28 border-t border-line py-10 first:border-t-0 first:pt-0"
            >
              <h2
                id={`${section.id}-title`}
                className="mb-5 flex items-baseline gap-3 text-[1.375rem] font-light leading-tight tracking-[-0.015em] text-ink"
              >
                <span className="text-sm font-normal tabular-nums text-faint">{index + 1}.</span>
                <span>{section.title}</span>
              </h2>
              <div className={proseCls}>{section.body}</div>
            </section>
          ))}
        </article>
      </div>
    </div>
  );
}

/** Registered company details as a plain definition list. */
export function ContactBlock() {
  const rows: Array<[string, ReactNode]> = [
    ["Seller", COMPANY.legalName],
    ["Company no.", COMPANY.companyNumber],
    ["Registered office", COMPANY_ADDRESS],
    ["Telephone", <a key="p" href={COMPANY.phoneHref}>{COMPANY.phone}</a>],
    ["Email", <a key="e" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>],
  ];
  return (
    <dl className="my-6 grid grid-cols-1 gap-x-8 border-y border-line py-5 text-sm sm:grid-cols-[10rem_1fr]">
      {rows.map(([label, value]) => (
        <div key={label} className="contents">
          <dt className="pt-2 text-xs uppercase tracking-[0.06em] text-muted sm:pt-1">{label}</dt>
          <dd className="pb-2 text-ink sm:py-1">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
