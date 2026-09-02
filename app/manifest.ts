import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Éclat Events",
    short_name: "Éclat",
    description: "Persönliche Eventplanung für besondere Feste.",
    start_url: "/",
    display: "standalone",
    background_color: "#10100f",
    theme_color: "#10100f",
    lang: "de-CH",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
