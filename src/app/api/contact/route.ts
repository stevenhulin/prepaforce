// src/app/api/contact/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

type Ticket = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  topic: string;
  category: string;
  message: string;
  resolved?: boolean;
};

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "contacts.json");

async function ensureDataFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, "[]", "utf8");
  }
}

async function readTickets(): Promise<Ticket[]> {
  await ensureDataFile();
  const raw = await fs.readFile(DATA_FILE, "utf8");
  try {
    return JSON.parse(raw) as Ticket[];
  } catch {
    return [];
  }
}

async function writeTickets(tickets: Ticket[]) {
  await ensureDataFile();
  await fs.writeFile(DATA_FILE, JSON.stringify(tickets, null, 2), "utf8");
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // honeypot
    const trap = String(formData.get("website") || "");
    if (trap) return NextResponse.redirect(new URL("/contact", req.url));

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const topic = String(formData.get("topic") || "").trim();
    const category = String(formData.get("category") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const tos = String(formData.get("tos") || "");

    if (!name || !email || !topic || !category || !message || tos !== "on") {
      return NextResponse.json({ ok: false, error: "Champs invalides." }, { status: 400 });
    }

    const tickets = await readTickets();
    tickets.unshift({
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      name,
      email,
      topic,
      category,
      message,
      resolved: false,
    });

    await writeTickets(tickets);
    return NextResponse.redirect(new URL("/contact?sent=1", req.url));
  } catch (err) {
    console.error("CONTACT_ERROR:", err);
    return NextResponse.json({ ok: false, error: "Erreur interne" }, { status: 500 });
  }
}
