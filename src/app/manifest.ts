import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Solvetashop — Electrical Materials & Supplies",
    short_name: "Solvetashop",
    description:
      "Your trusted source for electrical materials, wiring, and installation supplies.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#26618F",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.svg", sizes: "180x180", type: "image/svg+xml" },
    ],
  };
}
