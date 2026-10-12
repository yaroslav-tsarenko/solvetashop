/**
 * solveta·shop wordmark.
 *
 * Pure typography: lowercase Manrope with a raised sage interpunct between the
 * two halves. Rendered as live text (not an image) so it inherits the theme
 * colour and stays crisp at every size.
 */
interface WordmarkProps {
  className?: string;
  /** Font size in px; spacing scales with it. */
  size?: number;
}

export function Wordmark({ className = "", size = 22 }: WordmarkProps) {
  return (
    <span
      className={`inline-flex items-baseline font-medium lowercase leading-none text-[var(--color-ink)] ${className}`}
      style={{ fontSize: size, letterSpacing: "-0.04em" }}
      aria-label="solveta·shop"
    >
      <span aria-hidden="true">solveta</span>
      <span
        aria-hidden="true"
        className="text-[var(--color-sage)]"
        style={{ margin: "0 0.06em", fontWeight: 700 }}
      >
        ·
      </span>
      <span aria-hidden="true">shop</span>
    </span>
  );
}
