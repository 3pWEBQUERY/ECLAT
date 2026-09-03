import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://eclat-events.ch"),
  title: "Éclat Events | Feste mit Charakter",
  description: "Persönliche Eventplanung für Hochzeiten, Geburtstage und besondere Feste in Zürich und Umgebung – stilvoll, transparent und bezahlbar.",
  applicationName: "Éclat Events",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "Éclat" },
  formatDetection: { telephone: false },
  openGraph: {
    title: "Éclat Events | Feste mit Charakter",
    description: "Wunderschön geplant. Persönlich begleitet. Fair kalkuliert.",
    type: "website",
    locale: "de_CH",
    siteName: "Éclat Events",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Éclat Events – Feste mit Charakter" }],
  },
  twitter: { card: "summary_large_image", title: "Éclat Events", description: "Feste mit Charakter – Zürich & Umgebung.", images: ["/og.png"] },
  icons: { icon: "/icon-192.png", apple: "/icon-192.png" },
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
    <html lang="de" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{if(matchMedia('(max-width: 700px)').matches){history.scrollRestoration='manual';if(location.hash){history.replaceState(null,'',location.pathname+location.search)}var r=function(){scrollTo(0,0)};r();addEventListener('DOMContentLoaded',r,{once:true});addEventListener('pageshow',r,{once:true})}}catch(e){}})()` }} />
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('eclat-theme');document.documentElement.dataset.theme=t||((matchMedia('(prefers-color-scheme: light)').matches)?'light':'dark')}catch(e){}})()` }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
