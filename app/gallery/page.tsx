import type { Metadata } from "next";
import GalleryClient from "./gallery-client";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Ausgewählte Momente von LUVIYAH – stilvolle Hochzeiten, private Feste und Business Events in Zürich.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Gallery | LUVIYAH",
    description: "Ausgewählte Momente aus der LUVIYAH Eventplanung in Zürich und Umgebung.",
    url: "/gallery",
    type: "website",
    images: [{ url: "/event-dinner.jpg", width: 1792, height: 1194, alt: "Festlich inszenierte Dinner-Tafel" }],
  },
};

export default function GalleryPage() {
  return <GalleryClient />;
}
