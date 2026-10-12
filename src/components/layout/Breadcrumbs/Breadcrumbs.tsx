"use client";

import { Link } from "@/i18n/routing";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

/** Slash-separated trail in small muted type. */
export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="pb-6 pt-8 text-xs text-muted">
      <p className="m-0 flex flex-wrap items-center gap-x-1.5 gap-y-1">
        {items.map((item, index) => (
          <span key={index} className="inline-flex items-center gap-1.5">
            {index > 0 ? <span aria-hidden="true" className="text-faint">/</span> : null}
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-ink">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink">{item.label}</span>
            )}
          </span>
        ))}
      </p>
    </nav>
  );
}
