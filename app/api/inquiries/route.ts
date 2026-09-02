import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

export const runtime = "edge";

type Inquiry = {
  name?: string;
  email?: string;
  eventType?: string;
  eventDate?: string;
  guests?: string;
  budget?: string;
  message?: string;
  privacy?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as Inquiry;
    if (!data.name?.trim() || !data.email || !emailPattern.test(data.email) || !data.eventType || !data.message?.trim() || !data.privacy) {
      return NextResponse.json({ error: "Bitte füllen Sie alle Pflichtfelder aus." }, { status: 400 });
    }

    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      return NextResponse.json({ error: "Die Anfragefunktion wird gerade eingerichtet." }, { status: 503 });
    }

    const sql = neon(databaseUrl);
    await sql`
      CREATE TABLE IF NOT EXISTS inquiries (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        event_type TEXT NOT NULL,
        event_date DATE,
        guests INTEGER,
        budget TEXT,
        message TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'new',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
    await sql`
      INSERT INTO inquiries (name, email, event_type, event_date, guests, budget, message)
      VALUES (
        ${data.name.trim()},
        ${data.email.trim().toLowerCase()},
        ${data.eventType},
        ${data.eventDate || null},
        ${data.guests ? Number(data.guests) : null},
        ${data.budget || null},
        ${data.message.trim()}
      )
    `;

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Unable to save inquiry", error);
    return NextResponse.json({ error: "Die Anfrage konnte nicht gespeichert werden." }, { status: 500 });
  }
}
