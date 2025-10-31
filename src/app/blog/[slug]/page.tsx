// /src/app/blog/[slug]/page.tsx
// Dynamic article page — scalable for dozens/hundreds of posts
// Design: dark violet/blue "halo" DA, minimal deps (Tailwind + lucide-react + framer-motion optional)

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, Tag, ArrowLeft, ArrowRight } from "lucide-react";

// ————————————————————————————————————————————————
// Types shared with the list page (kept local for now). Later: move to /src/lib/blog/types.ts
export type Article = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  cover: string;
  category:
    | "Entraînement"
    | "Droit"
    | "Procédure"
    | "Préparation Concours"
    | "Témoignage"
    | "Matériel"
    | "Condition Physique";
  tags: string[];
  author: string;
  readMinutes: number;
  publishedAt: string; // ISO
  views: number;
  content: string; // markdown-lite for now
};

// ————————————————————————————————————————————————
// TEMP DATA — mirror of the grid page; later, replace with Supabase or MDX
const ARTICLES: Article[] = [
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
    content:
      `# Introduction\n\nVoici 25 QCM commentés pour travailler les points chauds APJA.\n\n## Méthode\n\n- Lecture rapide → repérage des évidences.\n- Marque les doutes → seconde passe.\n- Justifie chaque réponse en une phrase.\n\n## Astuces\n\n1. Attention aux négations.\n2. Compare les degrés (pouvoir, devoir, peut).\n3. Mots-clés juridiques à surligner.`,
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
    content:
      `# Cadre légal\n\nPrincipe: nécessité, proportionnalité, gradation.\n\n## Checklist terrain\n\n- Menace actuelle ?\n- Moyens alternatifs ?\n- Traçabilité (RAPPORT) ?`,
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
    content:
      `# Routine 12'\n\n3' mobilité + 4' cardio + 5' activation.`,
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
    content:
      `# Points pièges\n\n- CI vs vérification d'identité.\n- Perquisition: créneau horaire & consentement.`,
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
    content:
      `# Check-list\n\n- Eau, gants, lampe, contraintes.\n- Bonus: ruban, marqueur, sachets.`,
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
    content:
      `# Script d'accueil\n\n1. Présentation\n2. Écoute active\n3. Reformulation\n4. Solutions\n5. Prise de congé`,
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
    content:
      `# Classification\n\nCrimes / Délits / Contraventions — seuils et peines.`,
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
    content:
      `# Témoignage\n\nSemaine par semaine, avec ressources utiles à la fin.`,
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
    content:
      `# 2 passes\n\nPassage 1: sans bloquer.\nPassage 2: relecture ciblée.`,
  },
];

// ————————————————————————————————————————————————
// Data helpers (later swap to DB)
function getAll(): Article[] {
  return ARTICLES.sort(
    (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt)
  );
}
function getBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
function getSiblings(slug: string) {
  const list = getAll();
  const i = list.findIndex((a) => a.slug === slug);
  return {
    prev: i > 0 ? list[i - 1] : undefined,
    next: i < list.length - 1 ? list[i + 1] : undefined,
  };
}
function getRelated(current: Article, n = 3) {
  return getAll()
    .filter((a) => a.slug !== current.slug && a.category === current.category)
    .slice(0, n);
}

// ————————————————————————————————————————————————
// SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getBySlug(params.slug);
  if (!post) return { title: "Article introuvable — PrépaForce" };
  return {
    title: `${post.title} — PrépaForce`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      images: [{ url: post.cover }],
      type: "article",
    },
  };
}

// Pre-render pages at build time (works even with lots of posts; later fetch from DB)
export async function generateStaticParams() {
  return getAll().map((p) => ({ slug: p.slug }));
}

// ————————————————————————————————————————————————
// Markdown-lite renderer (no extra deps)
function renderMarkdown(md: string) {
  // Very small renderer: # H1, ## H2, bullets "- ", paragraphs
  return md.split("\n\n").map((block, i) => {
    if (block.startsWith("## "))
      return (
        <h2 key={i} className="mt-8 text-2xl font-bold">{block.replace(/^##\s+/, "")}</h2>
      );
    if (block.startsWith("# "))
      return (
        <h1 key={i} className="mt-6 text-3xl font-extrabold">{block.replace(/^#\s+/, "")}</h1>
      );
    if (block.split("\n").every((l) => l.trim().startsWith("- "))) {
      return (
        <ul key={i} className="mt-4 list-disc space-y-1 pl-6">
          {block.split("\n").map((l, j) => (
            <li key={j}>{l.replace(/^\-\s+/, "")}</li>
          ))}
        </ul>
      );
    }
    return (
      <p key={i} className="mt-4 text-white/80 leading-relaxed">{block}</p>
    );
  });
}

// ————————————————————————————————————————————————
export default function ArticlePage({ params }: { params: { slug: string } }) {
  const post = getBySlug(params.slug);
  if (!post) return notFound();

  const { prev, next } = getSiblings(post.slug);
  const related = getRelated(post, 3);

  return (
    <div className="relative min-h-screen w-full overflow-clip bg-[#0B0B12] text-white">
      {/* Halos */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(88,63,255,0.35),transparent_60%)] blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,183,255,0.25),transparent_60%)] blur-3xl" />
        <div className="absolute -right-20 top-1/3 h-[500px] w-[500px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(173,84,255,0.22),transparent_60%)] blur-3xl" />
      </div>

      <article className="relative mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="mb-6 text-sm text-white/60">
          <Link href="/" className="hover:text-white/90">Accueil</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-white/90">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-white/90">{post.title}</span>
        </nav>

        {/* Header */}
        <h1 className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">
          {post.title}
        </h1>

        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-white/70">
          <span className="inline-flex items-center gap-1"><CalendarDays className="h-4 w-4" /> {new Date(post.publishedAt).toLocaleDateString("fr-FR")}</span>
          <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" /> {post.readMinutes} min</span>
          <span className="inline-flex items-center gap-1">Par {post.author}</span>
          <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-xs"><Tag className="h-3 w-3" /> {post.category}</span>
        </div>

        {/* Cover */}
        <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-2xl border border-white/10">
          <Image src={post.cover} alt={post.title} fill className="object-cover" />
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-headings:scroll-mt-24 mt-8 max-w-none">
          {renderMarkdown(post.content)}
        </div>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/70">#{t}</span>
            ))}
          </div>
        )}

        {/* Prev / Next */}
        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <NavCard dir="prev" post={prev} />
          <NavCard dir="next" post={next} />
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-12">
            <h3 className="text-lg font-semibold">Articles liés</h3>
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/blog/${r.slug}`}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={r.cover} alt={r.title} fill className="object-cover transition duration-300 group-hover:scale-[1.03]" />
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-white/60">{new Date(r.publishedAt).toLocaleDateString("fr-FR")}</div>
                    <div className="mt-1 font-semibold group-hover:underline">{r.title}</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}

// ————————————————————————————————————————————————
function NavCard({ dir, post }: { dir: "prev" | "next"; post?: Article }) {
  if (!post) return <div />;
  const Icon = dir === "prev" ? ArrowLeft : ArrowRight;
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-white/20 hover:bg-white/10"
    >
      {dir === "prev" && <Icon className="h-5 w-5 shrink-0" />}
      <div className="min-w-0">
        <div className="text-xs uppercase tracking-wide text-white/50">
          {dir === "prev" ? "Article précédent" : "Article suivant"}
        </div>
        <div className="truncate font-medium group-hover:underline">{post.title}</div>
      </div>
      {dir === "next" && <Icon className="h-5 w-5 shrink-0" />}
    </Link>
  );
}

// ————————————————————————————————————————————————
// NOT FOUND UI
export function generateStaticParamsFallback() {
  // Not used by Next; helper for clarity
  return [];
}

export function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Article introuvable</h1>
      <p className="mt-2 text-white/70">Le lien est peut-être expiré ou l'article a été déplacé.</p>
      <Link href="/blog" className="mt-6 inline-flex rounded-full bg-white px-4 py-2 font-semibold text-black">Retour au blog</Link>
    </div>
  );
}
