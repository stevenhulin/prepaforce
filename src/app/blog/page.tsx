"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Search,
  CalendarDays,
  Clock,
  Tag,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";

// ————————————————————————————————————————————————————————————
// PrépaForce — Blog Page (Client Component)
// Design language: dark, linear-style violet/blue theme with animated halos.
// Self-contained for now (no shadcn/ui requirement). Ready to be wired to Supabase later.
// File path suggestion: /src/app/blog/page.tsx
// ————————————————————————————————————————————————————————————

// —— Types
export type Article = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  cover: string; // public/images/*
  category: "Entraînement" | "Droit" | "Procédure" | "Préparation Concours" | "Témoignage" | "Matériel" | "Condition Physique";
  tags: string[];
  author: string;
  readMinutes: number;
  publishedAt: string; // ISO date
  views: number;
};

// —— Mock data (replace with Supabase later)
const mockArticles: Article[] = [
  {
    id: "a1",
    title: "25 QCM incontournables pour APJA — corrigés et astuces",
    slug: "qcm-incontournables-apja",
    summary:
      "Une sélection de questions types, avec les pièges fréquents et des moyens mnémotechniques pour ne plus les rater.",
    cover: "/images/image1.jpg",
    category: "Préparation Concours",
    tags: ["APJA", "QCM", "Conseils"],
    author: "PrépaForce",
    readMinutes: 8,
    publishedAt: "2025-10-15",
    views: 2310,
  },
  {
    id: "a2",
    title: "Usage de la force: cadre légal et retours d'expérience",
    slug: "usage-de-la-force-cadre-legal",
    summary:
      "Synthèse claire du cadre légal + erreurs courantes observées sur le terrain. Checklists prêtes à l'emploi.",
    cover: "/images/image2.jpg",
    category: "Droit",
    tags: ["Légalité", "Proportionnalité", "Jurisprudence"],
    author: "PrépaForce",
    readMinutes: 10,
    publishedAt: "2025-10-10",
    views: 1890,
  },
  {
    id: "a3",
    title: "FTI: routine d'échauffement express (12 minutes)",
    slug: "fti-routine-echauffement-express",
    summary:
      "Circuit court avant séance: mobilité, cardio léger et activation. Optimisé pour la journée à l'ENP.",
    cover: "/images/image3.jpg",
    category: "Condition Physique",
    tags: ["FTI", "Mobilité", "Cardio"],
    author: "Coach PF",
    readMinutes: 6,
    publishedAt: "2025-10-08",
    views: 940,
  },
  {
    id: "a4",
    title: "Procédure pénale: contrôle d'identité, perquisitions & pièges",
    slug: "procedure-penale-pieges",
    summary:
      "Fiches ultra-synthétiques avec schémas mémoire pour éviter les confusions en évaluation.",
    cover: "/images/image4.jpg",
    category: "Procédure",
    tags: ["Procédure Pénale", "Fiches", "Schémas"],
    author: "PrépaForce",
    readMinutes: 9,
    publishedAt: "2025-10-05",
    views: 1275,
  },
  {
    id: "a5",
    title: "Sac d'intervention: check-list minimaliste",
    slug: "sac-intervention-checklist",
    summary:
      "Le strict nécessaire + 3 modules bonus pour rester léger, efficace et conforme.",
    cover: "/images/image5.jpg",
    category: "Matériel",
    tags: ["Équipement", "Check-list"],
    author: "PrépaForce",
    readMinutes: 5,
    publishedAt: "2025-10-03",
    views: 720,
  },
  {
    id: "a6",
    title: "Gestion d'accueil: disparition d'enfant — script complet",
    slug: "accueil-disparition-enfant",
    summary:
      "Structure en 5 étapes + questions clés + reformulation. Avec variantes par contexte.",
    cover: "/images/image6.jpg",
    category: "Entraînement",
    tags: ["Accueil", "Script", "Pratique"],
    author: "PrépaForce",
    readMinutes: 7,
    publishedAt: "2025-10-01",
    views: 1560,
  },
  {
    id: "a7",
    title: "Mémo ultra-visuel: classification des infractions",
    slug: "classification-des-infractions-memo",
    summary:
      "Poster A3 téléchargeable, codes couleur + exemples concrets.",
    cover: "/images/image7.jpg",
    category: "Droit",
    tags: ["Penal", "Mémo", "Affichage"],
    author: "PrépaForce",
    readMinutes: 4,
    publishedAt: "2025-09-28",
    views: 2040,
  },
  {
    id: "a8",
    title: "Témoignage: 6 semaines à l'ENP Nîmes, Section 53",
    slug: "temoignage-enp-nimes",
    summary:
      "Retour d'expérience, rythme réel, points durs et ressources qui m'ont aidé.",
    cover: "/images/image8.jpg",
    category: "Témoignage",
    tags: ["ENP Nîmes", "Section 53"],
    author: "Steven H.",
    readMinutes: 11,
    publishedAt: "2025-09-20",
    views: 3010,
  },
  {
    id: "a9",
    title: "Gagner du temps sur les QCM: méthode 2 passes",
    slug: "qcm-methode-2-passes",
    summary:
      "D'abord les évidences, ensuite les hésitations: une stratégie pour limiter les erreurs d'inattention.",
    cover: "/images/image9.jpg",
    category: "Préparation Concours",
    tags: ["QCM", "Stratégie"],
    author: "PrépaForce",
    readMinutes: 5,
    publishedAt: "2025-09-15",
    views: 980,
  },
];

// —— Utils
const CATEGORIES: Article["category"][] = [
  "Préparation Concours",
  "Droit",
  "Procédure",
  "Entraînement",
  "Condition Physique",
  "Matériel",
  "Témoignage",
];

function classNames(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

// — Pagination helper
function paginate<T>(items: T[], page: number, perPage: number) {
  const total = items.length;
  const start = (page - 1) * perPage;
  const end = start + perPage;
  return {
    page,
    perPage,
    total,
    totalPages: Math.max(1, Math.ceil(total / perPage)),
    items: items.slice(start, end),
  };
}

// ————————————————————————————————————————————————————————————
// Default Export
export default function BlogPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"Tous" | Article["category"]>("Tous");
  const [sort, setSort] = useState<"recent" | "popular">("recent");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(9);

  // Filter + sort
  const filtered = useMemo(() => {
    const byCat = category === "Tous" ? mockArticles : mockArticles.filter((a) => a.category === category);

    const byQuery = query.trim()
      ? byCat.filter((a) => {
          const q = query.toLowerCase();
          return (
            a.title.toLowerCase().includes(q) ||
            a.summary.toLowerCase().includes(q) ||
            a.tags.some((t) => t.toLowerCase().includes(q))
          );
        })
      : byCat;

    const sorted = [...byQuery].sort((a, b) => {
      if (sort === "popular") return b.views - a.views;
      return +new Date(b.publishedAt) - +new Date(a.publishedAt);
    });

    return sorted;
  }, [category, query, sort]);

  const { items, totalPages, total } = useMemo(() => paginate(filtered, page, perPage), [filtered, page, perPage]);

  // Reset page on filters change
  React.useEffect(() => {
    setPage(1);
  }, [query, category, sort, perPage]);

  // Featured article: first of the full filtered list (only on page 1 and w/o search)
  const showFeatured = page === 1 && query.trim() === "" && filtered.length > 0;
  const featured = showFeatured ? filtered[0] : null;
  const list = showFeatured ? items.filter((a) => a.id !== featured!.id) : items;

  return (
    <div className="relative min-h-screen w-full overflow-clip bg-[#0B0B12] text-white">
      {/* Animated halo background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(88,63,255,0.35),transparent_60%)] blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,183,255,0.25),transparent_60%)] blur-3xl" />
        <div className="absolute -right-20 top-1/3 h-[500px] w-[500px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(173,84,255,0.22),transparent_60%)] blur-3xl" />
      </div>

      {/* Header / Hero */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-wider text-white/80">
              <Filter className="h-3.5 w-3.5" />
              Blog PrépaForce
            </p>
            <h1 className="mt-2 bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
              Ressources, méthodes & retours d'expérience
            </h1>
            <p className="mt-3 max-w-2xl text-white/70">
              Le centre de connaissances pour PA / GPX — fiches ultra-synthétiques, QCM, scripts d'accueil, préparation physique et matériel.
            </p>
          </div>

          {/* Search + sort */}
          <div className="w-full max-w-md md:w-auto">
            <div className="group relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un article, un tag…"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-11 py-3 text-sm text-white placeholder:text-white/40 outline-none ring-0 transition focus:border-white/20 focus:bg-white/10"
              />
            </div>
            <div className="mt-3 flex items-center gap-3 text-xs text-white/60">
              <label className="flex items-center gap-2">
                Trier:
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as any)}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-white/90 outline-none"
                >
                  <option value="recent">Plus récents</option>
                  <option value="popular">Populaires</option>
                </select>
              </label>
              <label className="flex items-center gap-2">
                Par page:
                <select
                  value={perPage}
                  onChange={(e) => setPerPage(parseInt(e.target.value))}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-white/90 outline-none"
                >
                  <option value={6}>6</option>
                  <option value={9}>9</option>
                  <option value={12}>12</option>
                </select>
              </label>
            </div>
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="mt-8 flex flex-wrap gap-2"
        >
          {["Tous", ...CATEGORIES].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c as any)}
              className={classNames(
                "rounded-full border px-4 py-2 text-sm transition",
                category === c
                  ? "border-white/30 bg-white/10 text-white"
                  : "border-white/10 bg-white/5 text-white/75 hover:border-white/20 hover:bg-white/10 hover:text-white"
              )}
            >
              {c}
            </button>
          ))}
        </motion.div>

        {/* Featured */}
        {showFeatured && featured && (
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-10 grid grid-cols-1 items-stretch gap-6 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-3 sm:p-4 md:grid-cols-2"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
              <Image
                src={featured.cover}
                alt={featured.title}
                fill
                priority
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-between p-4">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 text-xs text-white/70">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-1"><Tag className="h-3.5 w-3.5" /> {featured.category}</span>
                  <span className="inline-flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" /> {new Date(featured.publishedAt).toLocaleDateString("fr-FR")}</span>
                  <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {featured.readMinutes} min</span>
                </div>
                <h2 className="text-2xl font-bold sm:text-3xl">{featured.title}</h2>
                <p className="mt-2 text-white/70">{featured.summary}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {featured.tags.map((t) => (
                    <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/70">#{t}</span>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <Link
                  href={`/blog/${featured.slug}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:opacity-90"
                >
                  Lire l'article <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.article>
        )}

        {/* Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="mt-10"
        >
          {list.length === 0 ? (
            <p className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-white/70">
              Aucun article ne correspond à votre recherche.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((a) => (
                <ArticleCard key={a.id} a={a} />
              ))}
            </div>
          )}
        </motion.div>

        {/* Pagination */}
        {total > 0 && (
          <div className="mt-10 flex items-center justify-between text-sm text-white/70">
            <span>
              Page {page} / {totalPages} — {total} articles
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 transition enabled:hover:border-white/20 enabled:hover:bg-white/10 disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" /> Précédent
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 transition enabled:hover:border-white/20 enabled:hover:bg-white/10 disabled:opacity-40"
              >
                Suivant <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="mt-14 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-white/10 via-white/5 to-transparent p-6"
        >
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h3 className="text-xl font-semibold">Tu veux contribuer au blog ?</h3>
              <p className="mt-1 max-w-2xl text-white/70">
                Bientôt: un panel administrateur pour publier directement tes fiches, QCM et retours d'expérience. En attendant, envoie tes idées et on les met en forme.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:opacity-90"
            >
              Proposer un article <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Developer notes — remove when wired to DB */}
      <div className="mx-auto max-w-7xl px-4 pb-16 text-xs text-white/40 sm:px-6 lg:px-8">
        <p>
          \{/* TODO Supabase wiring (exemple):
          const { data } = await supabase.from('posts').select('*').order('published_at', { ascending: false });
          // Normaliser vers <Article> et remplacer mockArticles */}
        </p>
      </div>
    </div>
  );
}

// ————————————————————————————————————————————————————————————
// Components
function ArticleCard({ a }: { a: Article }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.35 }}
      className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image src={a.cover} alt={a.title} fill className="object-cover transition duration-500 group-hover:scale-[1.03]" />
      </div>
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-center gap-2 text-xs text-white/70">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-1"><Tag className="h-3.5 w-3.5" /> {a.category}</span>
          <span className="inline-flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" /> {new Date(a.publishedAt).toLocaleDateString("fr-FR")}</span>
          <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {a.readMinutes} min</span>
        </div>
        <h3 className="text-lg font-semibold leading-snug md:text-xl">
          <Link href={`/blog/${a.slug}`} className="hover:underline">
            {a.title}
          </Link>
        </h3>
        <p className="line-clamp-3 text-sm text-white/70">{a.summary}</p>
        <div className="mt-1 flex flex-wrap gap-2">
          {a.tags.map((t) => (
            <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/70">#{t}</span>
          ))}
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-white/60">
          <span>Par {a.author}</span>
          <span>{a.views.toLocaleString("fr-FR")} vues</span>
        </div>
      </div>
    </motion.article>
  );
}
