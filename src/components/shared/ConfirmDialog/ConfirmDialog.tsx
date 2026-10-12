"use client";

import { useEffect } from "react";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDangerous?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  isDangerous = false,
}: ConfirmDialogProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
      <div className="fixed inset-0 bg-ink/40" onClick={onClose} aria-hidden="true" />
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-message"
        className="relative z-[51] w-full max-w-md rounded-[var(--radius-lg)] border border-line bg-paper p-7 shadow-[var(--shadow-md)]"
      >
        <h2 id="confirm-dialog-title" className="text-xl font-normal tracking-[-0.01em] text-ink">
          {title}
        </h2>
        <p id="confirm-dialog-message" className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
          {message}
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-end gap-2 border-t border-line pt-5">
          <button type="button" className="btn-quiet btn-sm" onClick={onClose}>
            {cancelLabel}
          </button>
          <button
            type="button"
            className={`btn-ink btn-sm ${isDangerous ? "!border-brick !bg-brick" : ""}`}
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
