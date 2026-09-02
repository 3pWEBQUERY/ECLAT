CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  event_type TEXT NOT NULL,
  event_date DATE,
  guests INTEGER CHECK (guests IS NULL OR guests > 0),
  budget TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS inquiries_created_at_idx ON inquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS inquiries_status_idx ON inquiries (status);
