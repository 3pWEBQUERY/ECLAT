# Éclat Events

Premium Event-Website für Hochzeiten, private Feste und Business Events in Zürich.

## Entwicklung

```bash
npm install
cp .env.example .env
npm run dev
```

Für das Anfrageformular wird eine Neon-Postgres-Verbindung über `DATABASE_URL` benötigt. Das passende Schema liegt in `db/neon-schema.sql`; die Tabelle wird beim ersten erfolgreichen Absenden zusätzlich automatisch angelegt.
