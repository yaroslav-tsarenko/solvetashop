import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs/Breadcrumbs";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = { title: "Legal" };

const DOCUMENTS = [
  {
    href: "/policies/terms",
    name: "Terms of Sale",
    note: "The agreement between you and us when you order from the shop.",
  },
  {
    href: "/policies/shipping",
    name: "Shipping & Delivery Policy",
    note: "Processing times, delivery estimates, free-delivery thresholds and what to do if a parcel goes astray.",
  },
  {
    href: "/policies/returns",
    name: "Returns & Refunds Policy",
    note: "Cancelling an order, sending something back, and how and when refunds are paid.",
  },
  {
    href: "/policies/warranty",
    name: "Warranty Policy",
    note: "Your statutory rights, manufacturer cover and the optional Additional Warranty.",
  },
  {
    href: "/policies/payment",
    name: "Payment Terms",
    note: "Accepted cards, currencies, security checks and how payments are handled.",
  },
  {
    href: "/policies/privacy",
    name: "Privacy Notice",
    note: "What personal data we collect, why we use it, and the choices you have.",
  },
  {
    href: "/policies/cookies",
    name: "Cookie Notice",
    note: "The cookies and similar technologies the website uses, and how to manage them.",
  },
];

export default function PoliciesIndexPage() {
  return (
    <div className="wrap pb-24">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Legal" }]} />

      <div className="grid gap-12 pt-4 lg:grid-cols-12 lg:gap-16">
        <header className="lg:col-span-4">
          <span className="eyebrow">Legal</span>
          <h1 className="mt-4 text-[clamp(2.25rem,4.5vw,3.5rem)] font-light leading-[1.04] tracking-[-0.03em] text-ink">
            The small print, written plainly.
          </h1>
          <p className="lede mt-5">
            These documents set out how buying from {COMPANY.tradingName} works. They apply to every
            order placed on this website and sit alongside your rights under the law.
          </p>
        </header>

        <ol className="border-t border-line lg:col-span-7 lg:col-start-6">
          {DOCUMENTS.map((doc) => (
            <li key={doc.href} className="border-b border-line">
              <Link
                href={doc.href}
                className="group flex items-start justify-between gap-6 py-6 transition-colors"
              >
                <span>
                  <span className="block text-lg font-normal tracking-[-0.01em] text-ink group-hover:text-sage-hover">
                    {doc.name}
                  </span>
                  <span className="mt-1.5 block text-sm leading-relaxed text-muted">{doc.note}</span>
                </span>
                <ArrowUpRight
                  size={18}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-faint transition-colors group-hover:text-ink"
                />
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
