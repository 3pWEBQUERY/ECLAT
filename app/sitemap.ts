import type { MetadataRoute } from "next";

const siteUrl = "https://eclat-kappa-inky.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      images: [
        `${siteUrl}/event-dinner.jpg`,
        `${siteUrl}/garden-wedding.jpg`,
        `${siteUrl}/wedding-table.jpg`,
      ],
    },
  ];
}
