import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "solveta·shop — Lighting & Home Décor",
    short_name: "solveta·shop",
    description:
      "Considered lighting, lamps and quiet décor for calmer rooms — chosen for warm light and everyday use.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#6F7F68",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.svg", sizes: "180x180", type: "image/svg+xml" },
    ],
  };
}
