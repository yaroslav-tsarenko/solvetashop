"use client";

import { Link } from "@/i18n/routing";

interface EmptyStateProps {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  actionHref?: string;
  icon?: React.ReactNode;
}

/**
 * Quiet empty state: a thin rule, a light headline and one pill action.
 * No illustration by default — an icon is only shown when a caller passes one.
 */
export function EmptyState({ title, subtitle, actionLabel, actionHref, icon }: EmptyStateProps) {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-start gap-5 border-t border-line py-16 sm:py-24">
      {icon ? <div className="text-faint">{icon}</div> : null}
      <h2 className="text-2xl font-light tracking-[-0.02em] text-ink sm:text-3xl">{title}</h2>
      {subtitle ? <p className="text-[0.9375rem] leading-relaxed text-muted">{subtitle}</p> : null}
      {actionLabel && actionHref ? (
        <Link href={actionHref} className="btn-ink mt-2">
          {actionLabel}
        </Link>
      ) : null}
    </section>
  );
}
