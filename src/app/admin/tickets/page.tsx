// src/app/admin/tickets/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

import path from "path";
import fs from "fs/promises";
import Link from "next/link";

type Ticket = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  topic: string;
  category: string;
  message: string;
  resolved?: boolean;
  ticketNumber?: number;
};

const DATA_FILE = path.join(process.cwd(), "data", "contacts.json");

/* ---------- Utils ---------- */

// Normalise une chaîne pour comparaison fiable (trim, minuscules, sans accents, espaces multiples)
function normalize(input: string | undefined | null): string {
  const s = (input ?? "").trim().toLowerCase();
  // suppression accents
  const noAccents = s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  // collapse espaces
  return noAccents.replace(/\s+/g, " ");
}

function padNum(n?: number) {
  if (!n || n < 1) return "—";
  return String(n).padStart(6, "0");
}

async function ensureDataFile() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, "[]", "utf8");
  }
}

async function readTickets(): Promise<Ticket[]> {
  await ensureDataFile();
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw) as Ticket[];
    return parsed.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  } catch {
    return [];
  }
}

/* Map “cat normalisée -> libellé joli” */
function buildCategoryMap(tickets: Ticket[]): Map<string, string> {
  const map = new Map<string, string>();
  for (const t of tickets) {
    const norm = normalize(t.category || "Autre");
    const pretty = (t.category || "Autre").trim() || "Autre";
    if (!map.has(norm)) map.set(norm, pretty);
  }
  return map;
}

export default async function AdminTicketsPage({
  searchParams,
}: {
  searchParams: { q?: string; cat?: string };
}) {
  const allTickets = await readTickets();

  // Catégories
  const catMap = buildCategoryMap(allTickets); // norm -> pretty
  const allCatsNorm = Array.from(catMap.keys()).sort((a, b) =>
    catMap.get(a)!.localeCompare(catMap.get(b)!, "fr")
  );

  // Filtres
  const q = (searchParams?.q || "").trim();
  const qNorm = normalize(q);
  const catParamNorm = normalize(searchParams?.cat || "");

  // Filtrage
  let filtered = allTickets;

  if (qNorm) {
    filtered = filtered.filter((t) => {
      const blob =
        `${t.name} ${t.email} ${t.topic} ${t.message}`.toLowerCase();
      const blobNorm = normalize(blob);
      return blobNorm.includes(qNorm);
    });
  }

  if (catParamNorm) {
    filtered = filtered.filter(
      (t) => normalize(t.category || "Autre") === catParamNorm
    );
  }

  // Groupage par catégorie normalisée
  const groups = new Map<string, Ticket[]>();
  for (const t of filtered) {
    const key = normalize(t.category || "Autre");
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(t);
  }

  // Ordre d’affichage des groupes : catégories présentes triées par libellé
  const orderedCats = Array.from(groups.keys()).sort((a, b) =>
    (catMap.get(a) || a).localeCompare(catMap.get(b) || b, "fr")
  );

  return (
    <main className="min-h-screen bg-[#0b0b10] text-white">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold">Tickets — Contact</h1>
          <p className="mt-2 text-sm text-white/70">
            Recherche et gestion des messages (stockage local JSON).
          </p>
          <div className="mt-4 h-px w-28 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </header>

        {/* Barre de recherche / filtres */}
        <form
          method="get"
          className="mb-6 grid gap-3 rounded-xl border border-white/10 bg-white/5 p-4 sm:grid-cols-[1fr,220px,auto]"
        >
          {/* Champ recherche avec icône */}
          <div className="relative">
            <span
              aria-hidden
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
            >
              {/* Icône search inline (pas de dépendance) */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M21 21l-4.3-4.3M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Rechercher (nom, email, sujet, message)…"
              className="w-full rounded-lg border border-white/15 bg-[#0f0f13] pl-9 pr-3 py-2 text-sm outline-none placeholder:text-white/30 focus:border-violet-400/60"
            />
          </div>

          {/* Select de catégorie avec valeurs normalisées */}
          <select
            name="cat"
            defaultValue={catParamNorm}
            className="rounded-lg border border-white/15 bg-[#0f0f13] px-3 py-2 text-sm outline-none focus:border-violet-400/60"
          >
            <option value="">Toutes catégories</option>
            {allCatsNorm.map((norm) => (
              <option key={norm} value={norm}>
                {catMap.get(norm)}
              </option>
            ))}
          </select>

          <div className="flex gap-2">
            <button
              type="submit"
              className="rounded-lg border border-white/15 bg-white/[0.06] px-4 py-2 text-sm text-white/90 hover:bg-white/10"
            >
              Filtrer
            </button>
            <Link
              href="/admin/tickets"
              className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/80 hover:bg-white/5"
            >
              Réinitialiser
            </Link>
          </div>
        </form>

        {/* Contenu */}
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white/80">
            Aucun ticket ne correspond à vos critères.
          </div>
        ) : (
          <div className="space-y-8">
            {orderedCats.map((catKey) => {
              const list = groups.get(catKey)!;
              const prettyName = catMap.get(catKey) || "Autre";
              return (
                <section key={catKey} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-violet-300">
                      {prettyName}
                    </h2>
                    <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70">
                      {list.length} ticket{list.length > 1 ? "s" : ""}
                    </span>
                  </div>

                  <div className="space-y-4">
                    {list.map((t) => (
                      <article
                        key={t.id}
                        className="rounded-xl border border-white/10 bg-white/5 p-4"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex flex-wrap items-center gap-3">
                              <span className="rounded-md bg-white/10 px-2 py-0.5 text-xs text-white/80">
                                #{padNum(t.ticketNumber)}
                              </span>
                              <strong className="text-white/90">{t.name}</strong>
                              <span className="text-xs text-white/60">• {t.email}</span>
                              {t.resolved && (
                                <span className="rounded-md bg-green-500/20 px-2 py-0.5 text-xs text-green-300">
                                  Résolu
                                </span>
                              )}
                            </div>
                            <div className="mt-1 text-xs text-white/60">
                              {new Date(t.createdAt).toLocaleString()}
                            </div>

                            <div className="mt-2 text-sm text-white/85">
                              <strong>{t.topic}</strong>
                              <p className="mt-2 whitespace-pre-wrap">{t.message}</p>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col items-end gap-2 text-right">
                            <form
                              method="post"
                              action="/api/admin/tickets/resolve"
                              encType="application/x-www-form-urlencoded"
                            >
                              <input type="hidden" name="ticketId" value={t.id} />
                              <button className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/80 hover:bg-white/5">
                                {t.resolved ? "Annuler résolution" : "Marquer résolu"}
                              </button>
                            </form>

                            <form
                              method="post"
                              action="/api/admin/tickets/delete"
                              encType="application/x-www-form-urlencoded"
                            >
                              <input type="hidden" name="ticketId" value={t.id} />
                              <button
                                type="submit"
                                className="rounded-full border border-red-500/30 px-3 py-1 text-xs text-red-400 hover:bg-red-500/10"
                              >
                                Supprimer
                              </button>
                            </form>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}

        <div className="mt-10">
          <Link href="/" className="text-sm text-white/80 hover:underline">
            ← Retour
          </Link>
        </div>
      </section>
    </main>
  );
}
