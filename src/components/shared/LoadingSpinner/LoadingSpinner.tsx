"use client";

import { Spinner } from "@heroui/react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  label?: string;
}

/** Quiet loading indicator: a thin ink-coloured spinner with an optional muted caption. */
export function LoadingSpinner({ size = "md", label }: LoadingSpinnerProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center gap-3 px-4 py-16 text-ink"
    >
      <Spinner size={size} color="current" className="opacity-70" />
      {label && <span className="text-[0.8125rem] text-muted">{label}</span>}
    </div>
  );
}
