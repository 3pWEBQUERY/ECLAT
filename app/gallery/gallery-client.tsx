"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

function Arrow() {
  return <span className="arrow-icon" aria-hidden="true" />;
}

function ThemeSwitch({ theme, onToggle }: { theme: "light" | "dark"; onToggle: () => void }) {
  return (
    <button className="theme-switch" type="button" onClick={onToggle} aria-label={`Zum ${theme === "dark" ? "hellen" : "dunklen"} Design wechseln`}>
      <span className="theme-dot" aria-hidden="true" />
      <span>{theme === "dark" ? "HELL" : "DUNKEL"}</span>
    </button>
  );
}

export default function GalleryClient() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("eclat-theme") as "light" | "dark" | null;
    const preferred = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    const initial = saved ?? preferred;
    document.documentElement.dataset.theme = initial;
    const frame = window.requestAnimationFrame(() => setTheme(initial));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("eclat-theme", next);
    setTheme(next);
  };

  return (
    <main className="gallery-page">
      <header className="gallery-header">
        <Link className="wordmark" href="/" aria-label="LUVIYAH Startseite">LUVIYAH<span>EVENTS</span></Link>
        <div className="gallery-header-actions">
          <Link className="gallery-back" href="/" aria-label="Zur Startseite"><span>STARTSEITE</span><Arrow /></Link>
          <ThemeSwitch theme={theme} onToggle={toggleTheme} />
        </div>
      </header>

      <section className="gallery-hero section-pad" aria-labelledby="gallery-title">
        <div className="gallery-kicker"><span>04 / GALLERY</span><span>LUVIYAH ARCHIVE · ZÜRICH</span></div>
        <div className="gallery-hero-grid">
          <h1 id="gallery-title">Momente,<br /><em>die bleiben.</em></h1>
          <p>Eine Auswahl aus Festen, die wir begleiten durften. Jede Tafel, jede Begegnung und jedes Detail erzählt eine eigene Geschichte.</p>
        </div>
        <div className="gallery-scroll-mark"><span>SCROLL TO EXPLORE</span><i aria-hidden="true" /></div>
      </section>

      <section className="gallery-wall section-pad" aria-label="Ausgewählte Veranstaltungen">
        <div className="gallery-wall-intro"><span>SELECTED MOMENTS</span><p>01—05</p></div>
        <div className="gallery-grid">
          <figure className="gallery-card gallery-card-hero">
            <picture>
              <source srcSet="/hero-event-poster.avif" type="image/avif" />
              <source srcSet="/hero-event-poster.webp" type="image/webp" />
              <img src="/hero-event-poster.jpg" alt="Hochzeitszeremonie am See vor alpiner Kulisse" width="720" height="720" loading="eager" decoding="async" />
            </picture>
            <figcaption><span>ZEREMONIE</span><span>AM SEE · 01</span></figcaption>
          </figure>

          <figure className="gallery-card gallery-card-dinner">
            <img src="/event-dinner.jpg" alt="Festlich inszenierte Dinner-Tafel mit Kerzen und Federn" width="1792" height="1194" loading="lazy" decoding="async" />
            <figcaption><span>DINNER SETTING</span><span>ZÜRICH · 02</span></figcaption>
          </figure>

          <div className="gallery-quote"><span>LUVIYAH NOTE · 03</span><p>„Die schönsten Feste fühlen sich nicht geplant an.“</p></div>

          <figure className="gallery-card gallery-card-garden">
            <picture>
              <source srcSet="/garden-wedding-480.avif 480w, /garden-wedding-800.avif 800w" sizes="(max-width: 700px) 82vw, 38vw" type="image/avif" />
              <source srcSet="/garden-wedding-480.webp 480w, /garden-wedding-800.webp 800w" sizes="(max-width: 700px) 82vw, 38vw" type="image/webp" />
              <img src="/garden-wedding.jpg" alt="Intime Festtafel unter einem Olivenbaum" width="1041" height="1400" loading="lazy" decoding="async" />
            </picture>
            <figcaption><span>GARTENFEST</span><span>IM FREIEN · 04</span></figcaption>
          </figure>

          <figure className="gallery-card gallery-card-table">
            <picture>
              <source srcSet="/wedding-table-400.avif 400w, /wedding-table-720.avif 720w" sizes="(max-width: 700px) 82vw, 42vw" type="image/avif" />
              <source srcSet="/wedding-table-400.webp 400w, /wedding-table-720.webp 720w" sizes="(max-width: 700px) 82vw, 42vw" type="image/webp" />
              <img src="/wedding-table.jpg" alt="Warme Hochzeitstafel mit Kerzen und grünen Akzenten" width="1600" height="1067" loading="lazy" decoding="async" />
            </picture>
            <figcaption><span>TAFELDETAILS</span><span>PRIVATE FEIER · 05</span></figcaption>
          </figure>

          <div className="gallery-endnote"><span>ENDLESS DETAILS</span><p>Von der ersten Idee bis zum letzten Licht.</p></div>
        </div>
      </section>

      <section className="gallery-contact section-pad">
        <span>07 / IHR FEST</span>
        <div><h2>Bereit für<br /><em>Ihr Kapitel?</em></h2><Link className="gallery-cta" href="/#anfrage"><span>FEST BESPRECHEN</span><Arrow /></Link></div>
      </section>

      <footer className="gallery-footer"><span>LUVIYAH · EVENTS</span><Link href="/">ZURÜCK ZUR STARTSEITE <Arrow /></Link></footer>
    </main>
  );
}
