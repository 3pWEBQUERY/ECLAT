# Éclat Events

Premium Event-Website für Hochzeiten, private Feste und Business Events in Zürich.

## Entwicklung

```bash
npm install
npm run dev
```

Die Website und der Vercel-Build benötigen keine Environment-Variablen. Für eine spätere Aktivierung der Neon-Speicherung des Anfrageformulars liegt das passende Schema unter `db/neon-schema.sql`.

## Deployment

Vercel verwendet mit `npm run build` den nativen Next.js-Build. Der separate Cloudflare/Sites-Build bleibt über `npm run build:sites` verfügbar.
