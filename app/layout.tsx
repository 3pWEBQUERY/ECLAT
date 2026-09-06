import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://eclat-kappa-inky.vercel.app";
const seoTitle = "Eventplanung Zürich für Hochzeiten & Feste | LUVIYAH";
const seoDescription = "LUVIYAH plant Hochzeiten, Geburtstage, Firmenfeste und private Feiern in Zürich und Umgebung – persönlich, stilvoll und transparent kalkuliert.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: seoTitle,
    template: "%s | LUVIYAH",
  },
  description: seoDescription,
  applicationName: "LUVIYAH",
  authors: [{ name: "LUVIYAH", url: siteUrl }],
  creator: "LUVIYAH",
  publisher: "LUVIYAH",
  category: "Eventplanung",
  keywords: [
    "Eventplanung Zürich",
    "Hochzeitsplanung Zürich",
    "Wedding Planner Zürich",
    "Geburtstag planen Zürich",
    "Firmenfest Zürich",
    "Eventagentur Zürich",
    "private Feiern planen",
    "LUVIYAH",
  ],
  alternates: {
    canonical: "/",
    languages: { "de-CH": "/" },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "LUVIYAH" },
  formatDetection: { telephone: false },
  openGraph: {
    title: seoTitle,
    description: seoDescription,
    url: "/",
    type: "website",
    locale: "de_CH",
    siteName: "LUVIYAH",
    images: [{ url: "/og.png", width: 1731, height: 909, alt: "Éclat Events – stilvolle Eventplanung in Zürich" }],
  },
  twitter: {
    card: "summary_large_image",
    title: seoTitle,
    description: seoDescription,
    images: [{ url: "/og.png", alt: "Éclat Events – stilvolle Eventplanung in Zürich" }],
  },
  icons: { icon: "/icon-192.png", apple: "/icon-192.png" },
  other: {
    "geo.region": "CH-ZH",
    "geo.placename": "Zürich",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "LUVIYAH",
      description: seoDescription,
      inLanguage: "de-CH",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "LUVIYAH",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/icon-512.png`,
        width: 512,
        height: 512,
      },
      image: `${siteUrl}/og.png`,
      email: "hallo@eclat-events.ch",
      telephone: "+41 44 555 01 02",
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Zürich und Umgebung",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Kundenberatung",
        email: "hallo@eclat-events.ch",
        telephone: "+41 44 555 01 02",
        availableLanguage: ["de", "de-CH"],
        areaServed: "CH",
      },
      knowsAbout: [
        "Hochzeitsplanung",
        "Private Feiern",
        "Geburtstagsplanung",
        "Firmenveranstaltungen",
        "Eventkonzeption",
      ],
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/#eventplanung`,
      name: "Persönliche Eventplanung in Zürich",
      description: seoDescription,
      serviceType: "Eventplanung und Eventkonzeption",
      provider: { "@id": `${siteUrl}/#organization` },
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Zürich und Umgebung",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Eventplanung",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Hochzeitsplanung" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Planung privater Feste" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Planung von Business Events" } },
        ],
      },
    },
  ],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#10100f" },
    { media: "(prefers-color-scheme: light)", color: "#f2efe8" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de-CH" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{if(matchMedia('(max-width: 700px)').matches){history.scrollRestoration='manual';if(location.hash){history.replaceState(null,'',location.pathname+location.search)}var r=function(){scrollTo(0,0)};r();addEventListener('DOMContentLoaded',r,{once:true});addEventListener('pageshow',r,{once:true})}}catch(e){}})()` }} />
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('eclat-theme');document.documentElement.dataset.theme=t||((matchMedia('(prefers-color-scheme: light)').matches)?'light':'dark')}catch(e){}})()` }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
