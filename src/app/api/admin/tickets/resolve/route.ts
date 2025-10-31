// src/app/api/admin/tickets/resolve/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "contacts.json");

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const ticketId = String(form.get("ticketId") || "");
    if (!ticketId) return NextResponse.json({ ok: false }, { status: 400 });

    const raw = await fs.readFile(DATA_FILE, "utf8");
    const tickets = JSON.parse(raw);
    const idx = tickets.findIndex((t: any) => t.id === ticketId);
    if (idx === -1) return NextResponse.json({ ok: false }, { status: 404 });

    tickets[idx].resolved = !tickets[idx].resolved;
    await fs.writeFile(DATA_FILE, JSON.stringify(tickets, null, 2), "utf8");

    return NextResponse.redirect(new URL("/admin/tickets", req.url));
  } catch (err) {
    console.error("ADMIN_RESOLVE_ERROR:", err);
    return NextResponse.json({ ok: false, error: "Erreur interne" }, { status: 500 });
  }
}
