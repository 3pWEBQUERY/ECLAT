"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

const services = [
  {
    index: "01",
    title: "Hochzeiten",
    text: "Vom ersten Moodboard bis zum letzten Tanz. Wir planen den Tag, der sich ganz nach Ihnen anfühlt.",
  },
  {
    index: "02",
    title: "Private Feste",
    text: "Geburtstag, Jubiläum oder ein Abend ohne Anlass – persönlich kuratiert, entspannt gefeiert.",
  },
  {
    index: "03",
    title: "Business Events",
    text: "Markenerlebnisse, Team-Dinner und Eröffnungen mit Haltung, Dramaturgie und sicherem Timing.",
  },
];

const steps = [
  ["01", "Kennenlernen", "30 Minuten, unverbindlich. Sie erzählen, wir hören zu."],
  ["02", "Konzept", "Idee, Budget und Ablauf werden zu einem klaren Fahrplan."],
  ["03", "Realisierung", "Wir koordinieren jedes Detail und halten Ihnen den Rücken frei."],
  ["04", "Feiern", "Sie sind Gast auf Ihrem eigenen Fest. Genau so soll es sein."],
];

const eventOptions = ["Hochzeit", "Geburtstag", "Jubiläum", "Firmenfest", "Anderer Anlass"];

function Arrow() {
  return <span className="arrow-icon" aria-hidden="true" />;
}

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [eventType, setEventType] = useState("");
  const [eventSelectOpen, setEventSelectOpen] = useState(false);
  const [activeEventOption, setActiveEventOption] = useState(0);
  const [eventSelectError, setEventSelectError] = useState(false);
  const [legalPanel, setLegalPanel] = useState<"impressum" | "datenschutz" | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const eventSelectRef = useRef<HTMLDivElement>(null);
  const eventSelectButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("eclat-theme") as "light" | "dark" | null;
    const preferred = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    const initial = saved ?? preferred;
    setTheme(initial);
    document.documentElement.dataset.theme = initial;

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    }
  }, []);

  useEffect(() => {
    const overlayOpen = menuOpen || Boolean(legalPanel);
    document.body.style.overflow = overlayOpen ? "hidden" : "";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setLegalPanel(null);
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen, legalPanel]);

  useEffect(() => {
    const closeEventSelect = (event: PointerEvent) => {
      if (!eventSelectRef.current?.contains(event.target as Node)) setEventSelectOpen(false);
    };
    document.addEventListener("pointerdown", closeEventSelect);
    return () => document.removeEventListener("pointerdown", closeEventSelect);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem("eclat-theme", next);
  };

  const trackPointer = (event: React.PointerEvent<HTMLElement>) => {
    const bounds = heroRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    heroRef.current?.style.setProperty("--px", `${x * 18}px`);
    heroRef.current?.style.setProperty("--py", `${y * 18}px`);
  };

  const submitInquiry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!eventType) {
      setEventSelectError(true);
      setStatus("idle");
      eventSelectButtonRef.current?.focus();
      return;
    }
    setStatus("sending");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("request failed");
      form.reset();
      setEventType("");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const chooseEventType = (option: string) => {
    setEventType(option);
    setEventSelectError(false);
    setEventSelectOpen(false);
    eventSelectButtonRef.current?.focus();
  };

  const handleEventSelectKey = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Escape") {
      setEventSelectOpen(false);
      return;
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const direction = event.key === "ArrowDown" ? 1 : -1;
      setEventSelectOpen(true);
      setActiveEventOption((current) => (current + direction + eventOptions.length) % eventOptions.length);
      return;
    }
    if ((event.key === "Enter" || event.key === " ") && eventSelectOpen) {
      event.preventDefault();
      chooseEventType(eventOptions[activeEventOption]);
    }
  };

  const openLegalPanel = (panel: "impressum" | "datenschutz") => {
    setMenuOpen(false);
    setLegalPanel(panel);
  };

  return (
    <main>
      <header className={`site-header${menuOpen ? " menu-active" : ""}`}>
        <a className="wordmark" href="#top" aria-label="Éclat Startseite">
          ÉCLAT<span>EVENTS</span>
        </a>
        <nav className={menuOpen ? "nav-open" : ""} aria-label="Hauptnavigation">
          <div className="nav-links">
            <a href="#leistungen" onClick={() => setMenuOpen(false)}><span>01</span>Leistungen</a>
            <a href="#arbeiten" onClick={() => setMenuOpen(false)}><span>02</span>Einblicke</a>
            <a href="#prozess" onClick={() => setMenuOpen(false)}><span>03</span>Ablauf</a>
            <a href="#anfrage" onClick={() => setMenuOpen(false)}><span>04</span>Anfragen</a>
          </div>
          <div className="mobile-nav-meta">
            <div><span>STUDIO</span><p>Zürich · Schweiz<br />Für Feste mit Charakter.</p></div>
            <div><span>KONTAKT</span><a href="mailto:hallo@eclat-events.ch">hallo@eclat-events.ch</a></div>
            <div className="mobile-legal-links">
              <button type="button" onClick={() => openLegalPanel("impressum")}>Impressum</button>
              <button type="button" onClick={() => openLegalPanel("datenschutz")}>Datenschutz</button>
            </div>
          </div>
        </nav>
        <div className="header-actions">
          <button className="theme-switch" onClick={toggleTheme} aria-label={`${theme === "dark" ? "Helles" : "Dunkles"} Design aktivieren`}>
            <span>{theme === "dark" ? "☼" : "◐"}</span>
            <span>{theme === "dark" ? "HELL" : "DUNKEL"}</span>
          </button>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}>
            <span />
            <span />
          </button>
        </div>
      </header>

      <section id="top" className="hero" ref={heroRef} onPointerMove={trackPointer}>
        <div className="hero-kicker reveal-up">EVENTKONZEPTE · ZÜRICH & UMGEBUNG</div>
        <div className="hero-copy">
          <h1>
            <span className="title-line"><span>Anlässe, die</span></span>
            <span className="title-line title-indent"><span>nach <em>Ihnen</em></span></span>
            <span className="title-line"><span>aussehen.</span></span>
          </h1>
          <div className="hero-note reveal-up">
            <span className="rule" />
            <p>Wunderschön geplant. Persönlich begleitet.<br />Fair und transparent kalkuliert.</p>
          </div>
        </div>

        <div className="hero-visual" aria-label="Festlich gedeckte Tafel bei einem eleganten Event">
          <img src="/event-dinner.jpg" alt="Elegante, festlich gedeckte lange Tafel" fetchPriority="high" />
          <div className="image-label"><span>SELECTED SCENE</span><span>001 / 003</span></div>
          <i className="track-marker" aria-hidden="true" />
        </div>

        <a className="hero-cta" href="#anfrage">
          <span>ERSTGESPRÄCH<br />VEREINBAREN</span><Arrow />
        </a>
        <div className="scroll-cue" aria-hidden="true"><span>SCROLL</span><i /></div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div>HOCHZEITEN <b>✦</b> GEBURTSTAGE <b>✦</b> JUBILÄEN <b>✦</b> FIRMENFESTE <b>✦</b> HOCHZEITEN <b>✦</b> GEBURTSTAGE <b>✦</b> JUBILÄEN <b>✦</b> FIRMENFESTE <b>✦</b></div>
      </div>

      <section className="intro section-pad">
        <div className="section-number">01 / UNSERE HALTUNG</div>
        <div className="intro-main">
          <p className="eyebrow">ZWEI KÖPFE. EIN GEFÜHL FÜR DAS BESONDERE.</p>
          <h2>Luxus ist nicht das Budget.<br />Luxus ist, wenn <em>alles stimmt.</em></h2>
        </div>
        <div className="intro-aside">
          <p>Wir glauben an Feiern mit Charakter – und daran, dass starke Ideen kein grenzenloses Budget brauchen. Deshalb verbinden wir kreative Konzepte mit ehrlicher Kalkulation und einem Netzwerk, das zu Ihnen passt.</p>
          <a href="#leistungen" className="text-link">WAS WIR MÖGLICH MACHEN <Arrow /></a>
        </div>
      </section>

      <section id="leistungen" className="services section-pad">
        <div className="section-heading">
          <span>02 / LEISTUNGEN</span>
          <h2>Für die Momente,<br />die bleiben.</h2>
        </div>
        <div className="service-list">
          {services.map((service) => (
            <article className="service-row" key={service.index}>
              <span className="service-index">{service.index}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <span className="service-arrow"><Arrow /></span>
            </article>
          ))}
        </div>
      </section>

      <section id="arbeiten" className="work section-pad">
        <div className="work-copy">
          <span>03 / EINBLICKE</span>
          <h2>Atmosphäre<br />ist kein Zufall.</h2>
          <p>Sie entsteht aus hundert bewussten Entscheidungen – und dem Mut, die richtigen Dinge wegzulassen.</p>
          <a href="#anfrage" className="text-link">EIGENES FEST BESPRECHEN <Arrow /></a>
        </div>
        <figure className="work-image work-image-main">
          <img src="/garden-wedding.jpg" alt="Romantische Hochzeitstafel in einem Garten" loading="lazy" />
          <figcaption><span>GARTENHOCHZEIT</span><span>SOMMER · ZÜRICH</span></figcaption>
        </figure>
        <figure className="work-image work-image-small">
          <img src="/wedding-table.jpg" alt="Hochzeitstische mit Kerzen und Grün" loading="lazy" />
          <figcaption><span>DINNER SETTING</span><span>PRIVATE FEIER</span></figcaption>
        </figure>
      </section>

      <section id="prozess" className="process section-pad">
        <div className="section-heading compact">
          <span>04 / DER WEG</span>
          <h2>Von der Idee<br />zum <span className="process-title-word">Gänsehautmoment.</span></h2>
        </div>
        <div className="steps">
          {steps.map(([number, title, description]) => (
            <div className="step" key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="promise">
        <div className="promise-side">UNSER VERSPRECHEN</div>
        <blockquote>„Wir planen nicht für Instagram. Wir planen für den Moment, in dem Sie sich umsehen und denken: <em>Genau so.</em>“</blockquote>
        <div className="signature">Éclat · Gründerinnen</div>
      </section>

      <section className="pricing section-pad">
        <div className="section-heading compact">
          <span>05 / TRANSPARENT</span>
          <h2>Schön geplant.<br />Fair kalkuliert.</h2>
        </div>
        <div className="price-grid">
          <article>
            <span>KICKSTART</span>
            <h3>Konzept & Beratung</h3>
            <p>Für alle, die selbst organisieren, aber eine starke Idee und einen professionellen Plan möchten.</p>
            <strong>AB CHF 490</strong>
          </article>
          <article className="featured-price">
            <span>ENTSPANNT FEIERN</span>
            <h3>Teilplanung</h3>
            <p>Wir übernehmen die Bereiche, bei denen Sie Unterstützung brauchen – passgenau und ohne Paketzwang.</p>
            <strong>AB CHF 1’490</strong>
          </article>
          <article>
            <span>RUNDUM SORGLOS</span>
            <h3>Gesamtplanung</h3>
            <p>Konzept, Dienstleister, Budget, Ablauf und Koordination vor Ort aus einer Hand.</p>
            <strong>INDIVIDUELL</strong>
          </article>
        </div>
        <p className="price-note">Jedes Angebot ist individuell. Im Erstgespräch klären wir transparent, was Ihr Fest wirklich braucht.</p>
      </section>

      <section id="anfrage" className="contact section-pad">
        <div className="contact-copy">
          <span>06 / IHR FEST</span>
          <h2>Erzählen Sie<br />uns davon.</h2>
          <p>Ein paar Eckdaten genügen. Wir melden uns innerhalb von zwei Werktagen mit ersten Gedanken und einem Termin für ein unverbindliches Kennenlernen.</p>
          <div className="availability"><i /> AKTUELL TERMINE FÜR 2026 / 2027</div>
        </div>
        <form onSubmit={submitInquiry}>
          <div className="form-row two">
            <label>NAME<input required name="name" autoComplete="name" placeholder="Vor- und Nachname" /></label>
            <label>E-MAIL<input required type="email" name="email" autoComplete="email" placeholder="name@beispiel.ch" /></label>
          </div>
          <div className="form-row three">
            <div className="custom-field">
              <span className="field-label">ANLASS</span>
              <div className={`custom-select${eventSelectOpen ? " is-open" : ""}${eventSelectError ? " has-error" : ""}`} ref={eventSelectRef}>
                <input type="hidden" name="eventType" value={eventType} />
                <button
                  ref={eventSelectButtonRef}
                  className="custom-select-trigger"
                  type="button"
                  role="combobox"
                  aria-controls="event-options"
                  aria-expanded={eventSelectOpen}
                  aria-haspopup="listbox"
                  aria-invalid={eventSelectError}
                  aria-label="Anlass auswählen"
                  onClick={() => setEventSelectOpen((open) => !open)}
                  onKeyDown={handleEventSelectKey}
                >
                  <span className={eventType ? "" : "placeholder"}>{eventType || "Bitte wählen"}</span>
                  <i aria-hidden="true" />
                </button>
                {eventSelectOpen && (
                  <ul id="event-options" className="custom-select-panel" role="listbox" aria-label="Anlass">
                    {eventOptions.map((option, index) => (
                      <li
                        id={`event-option-${index}`}
                        key={option}
                        role="option"
                        aria-selected={eventType === option}
                        className={activeEventOption === index ? "is-active" : ""}
                        onPointerEnter={() => setActiveEventOption(index)}
                        onClick={() => chooseEventType(option)}
                      >
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        {option}
                        <b aria-hidden="true"><Arrow /></b>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {eventSelectError && <small className="field-error">Bitte wählen Sie einen Anlass.</small>}
            </div>
            <label>DATUM<input type="date" name="eventDate" /></label>
            <label>GÄSTE<input type="number" name="guests" min="2" max="2000" placeholder="ca. 80" /></label>
          </div>
          <label>BUDGETRAHMEN<select name="budget" defaultValue=""><option value="">Noch offen</option><option>Bis CHF 5’000</option><option>CHF 5’000 – 15’000</option><option>CHF 15’000 – 30’000</option><option>Ab CHF 30’000</option></select></label>
          <label>WAS DÜRFEN WIR WISSEN?<textarea required name="message" rows={4} placeholder="Erzählen Sie uns von Ihrer Idee, dem Ort und dem Gefühl, das entstehen soll …" /></label>
          <label className="privacy"><input required type="checkbox" name="privacy" /> <span>Ich bin mit der Verarbeitung meiner Angaben zur Kontaktaufnahme einverstanden.</span></label>
          <button className="submit-button" disabled={status === "sending"}>
            <span>{status === "sending" ? "WIRD GESENDET …" : "ANFRAGE SENDEN"}</span><Arrow />
          </button>
          <div className="form-status" role="status" aria-live="polite">
            {status === "success" && "Vielen Dank. Ihre Anfrage ist bei uns – wir melden uns bald."}
            {status === "error" && "Das hat noch nicht geklappt. Schreiben Sie uns bitte direkt an hallo@eclat-events.ch."}
          </div>
        </form>
      </section>

      <footer>
        <div className="footer-brand">ÉCLAT<small>EVENTS</small></div>
        <div><span>KONTAKT</span><a href="mailto:hallo@eclat-events.ch">hallo@eclat-events.ch</a><a href="tel:+41445550102">+41 44 555 01 02</a></div>
        <div><span>FOLGEN</span><a className="footer-social-link" href="#">Instagram <Arrow /></a><a className="footer-social-link" href="#">Pinterest <Arrow /></a></div>
        <div><span>RECHTLICHES</span><button type="button" className="footer-link" onClick={() => openLegalPanel("impressum")}>Impressum</button><button type="button" className="footer-link" onClick={() => openLegalPanel("datenschutz")}>Datenschutz</button></div>
        <div className="footer-bottom"><span>© 2026 ÉCLAT EVENTS</span><span>ZÜRICH · SCHWEIZ</span><a href="#top">NACH OBEN ↑</a></div>
      </footer>

      {legalPanel && (
        <section className="legal-overlay" role="dialog" aria-modal="true" aria-labelledby="legal-title">
          <div className="legal-topline">
            <a className="legal-wordmark" href="#top" onClick={() => setLegalPanel(null)}>ÉCLAT <span>EVENTS</span></a>
            <span>{legalPanel === "impressum" ? "RECHTLICHES / 01" : "RECHTLICHES / 02"}</span>
            <button autoFocus type="button" className="legal-close" onClick={() => setLegalPanel(null)} aria-label="Fenster schließen"><i /><i /></button>
          </div>
          <div className="legal-layout">
            <aside>
              <span>STAND</span>
              <p>03. September 2026</p>
              <span>KONTAKT</span>
              <a href="mailto:hallo@eclat-events.ch">hallo@eclat-events.ch</a>
            </aside>
            {legalPanel === "impressum" ? (
              <article className="legal-content">
                <p className="legal-kicker">ANGABEN ZUM UNTERNEHMEN</p>
                <h2 id="legal-title">Impressum</h2>
                <div className="legal-grid">
                  <div><h3>Anbieterin</h3><p>Éclat Events<br />Eventplanung in Gründung<br />Zürich, Schweiz</p></div>
                  <div><h3>Vertretung</h3><p>Vertreten durch die beiden Gründerinnen von Éclat Events.</p></div>
                  <div><h3>Kontakt</h3><p><a href="mailto:hallo@eclat-events.ch">hallo@eclat-events.ch</a><br /><a href="tel:+41445550102">+41 44 555 01 02</a></p></div>
                  <div><h3>Geschäftsadresse</h3><p>Die vollständige Geschäftsadresse und der Handelsregistereintrag werden mit Abschluss der Unternehmensgründung ergänzt.</p></div>
                </div>
                <div className="legal-section"><span>01</span><div><h3>Haftung für Inhalte</h3><p>Die Inhalte dieser Website wurden mit grösster Sorgfalt erstellt. Für Richtigkeit, Vollständigkeit und Aktualität kann dennoch keine Gewähr übernommen werden.</p></div></div>
                <div className="legal-section"><span>02</span><div><h3>Urheberrecht</h3><p>Konzept, Gestaltung, Texte und eigene Bildinhalte dieser Website sind urheberrechtlich geschützt. Eine Verwendung ausserhalb der gesetzlichen Schranken bedarf der vorherigen schriftlichen Zustimmung.</p></div></div>
              </article>
            ) : (
              <article className="legal-content">
                <p className="legal-kicker">UMGANG MIT IHREN DATEN</p>
                <h2 id="legal-title">Datenschutz</h2>
                <div className="legal-intro"><strong>Privatsphäre gehört für uns zu einer guten Gastgeberkultur.</strong><p>Wir bearbeiten nur Daten, die für die Kommunikation und Planung Ihres Anlasses erforderlich sind. Grundlage sind das Schweizer Datenschutzgesetz und, soweit anwendbar, die DSGVO.</p></div>
                <div className="legal-section"><span>01</span><div><h3>Verantwortliche Stelle</h3><p>Éclat Events, Zürich, Schweiz. Datenschutzanfragen richten Sie bitte an <a href="mailto:hallo@eclat-events.ch">hallo@eclat-events.ch</a>.</p></div></div>
                <div className="legal-section"><span>02</span><div><h3>Anfrageformular</h3><p>Beim Absenden verarbeiten wir Name, E-Mail-Adresse, Anlass, Datum, Gästezahl, Budgetrahmen und Ihre Nachricht. Diese Angaben werden ausschliesslich zur Bearbeitung Ihrer Anfrage und zur möglichen Vertragsanbahnung genutzt.</p></div></div>
                <div className="legal-section"><span>03</span><div><h3>Speicherung & Dienstleister</h3><p>Anfragedaten werden in einer geschützten Neon-Postgres-Datenbank gespeichert. Technische Hosting-Dienstleister können dabei im Rahmen ihrer Auftragsverarbeitung Zugriff auf notwendige technische Daten erhalten.</p></div></div>
                <div className="legal-section"><span>04</span><div><h3>Lokale Einstellungen</h3><p>Ihre Auswahl für Hell- oder Dunkelmodus wird ausschliesslich lokal auf Ihrem Gerät gespeichert. Die installierbare Web-App nutzt einen Service Worker, um notwendige Seitendateien zwischenzuspeichern.</p></div></div>
                <div className="legal-section"><span>05</span><div><h3>Ihre Rechte</h3><p>Sie können Auskunft, Berichtigung, Löschung oder Einschränkung der Bearbeitung Ihrer personenbezogenen Daten verlangen. Zudem besteht ein Beschwerderecht bei der zuständigen Datenschutzbehörde.</p></div></div>
              </article>
            )}
          </div>
          <div className="legal-progress" aria-hidden="true"><i /></div>
        </section>
      )}
    </main>
  );
}
