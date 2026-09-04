/**
 * The Solvetashop mark.
 *
 * The Solveta properties share one device — a plain tile carrying a single
 * outlined shape with a small solid node on its shoulder. Here the shape is a
 * shopping bag, which is the one silhouette that still reads as "shop" at
 * 16 pixels, and the node is brass to match the palette's second voice.
 *
 * variant="light" puts the bag on the steel-blue tile (headers, favicons);
 * variant="dark" inverts it for dark surfaces and email headers, where a solid
 * blue block would sit heavier than the text around it.
 *
 * `gradientId` exists because two of these can share a page (header and mobile
 * drawer) and duplicate SVG gradient ids resolve to whichever came first.
 */
interface SolvetaShopMarkProps {
  size?: number;
  variant?: "light" | "dark";
  gradientId?: string;
}

export function SolvetaShopMark({
  size = 28,
  variant = "light",
  gradientId,
}: SolvetaShopMarkProps) {
  const uid = gradientId ?? `svs-${variant}`;
  const tileFill = variant === "dark" ? "#1A1D21" : `url(#${uid}-steel)`;
  const strokeColor = variant === "dark" ? "#8ABEE3" : "#FFFFFF";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Solvetashop"
      role="img"
    >
      <defs>
        <linearGradient id={`${uid}-steel`} x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#26618F" />
          <stop offset="1" stopColor="#123047" />
        </linearGradient>
      </defs>

      <rect width="40" height="40" rx="10" fill={tileFill} />
      <rect
        x="1"
        y="1"
        width="38"
        height="38"
        rx="9"
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1"
      />

      {/* The bag: body, then handle. */}
      <rect
        x="10"
        y="16.5"
        width="20"
        height="15"
        rx="3.2"
        fill="none"
        stroke={strokeColor}
        strokeWidth="2.8"
      />
      <path
        d="M15.4 17.4V13.8a4.6 4.6 0 0 1 9.2 0v3.6"
        fill="none"
        stroke={strokeColor}
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      {/* Brass node — the family resemblance across the Solveta marks. */}
      <circle cx="29.2" cy="11.6" r="4.3" fill="#D2AC6D" fillOpacity="0.22" />
      <circle cx="29.2" cy="11.6" r="2.5" fill="#D2AC6D" />
    </svg>
  );
}
