// src/app/histoire/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Notre histoire — PrépaForce",
  description:
    "PrépaForce — une plateforme née pour aider les candidats PA/GPX et les élèves en école à apprendre mieux, plus vite et plus clairement.",
};

export default function Page() {
  return (
    <main className="relative min-h-screen bg-[#0b0b10] text-white">
      {/* Halo doux en pure CSS (pas d'animation JS) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -inset-x-40 -top-40 h-[38vh] bg-[radial-gradient(60%_70%_at_50%_0%,rgba(139,92,246,0.12),transparent_70%)] blur-3xl" />
        <div className="absolute -inset-x-40 -bottom-40 h-[32vh] bg-[radial-gradient(60%_70%_at_50%_100%,rgba(59,130,246,0.10),transparent_70%)] blur-3xl" />
      </div>

      <section className="mx-auto max-w-4xl px-6 py-16 sm:px-8 lg:px-10">
        {/* En-tête sobre */}
        <header className="mb-10">
          <h1 className="text-4xl font-semibold tracking-tight text-transparent bg-gradient-to-r from-violet-300 via-blue-300 to-violet-300 bg-clip-text sm:text-5xl">
            Notre histoire
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-white/70">
            PrépaForce — plateforme d’entraînement et de révision pour les candidats Policier Adjoint & Gardiens de la
            Paix, et pour les élèves déjà en école.
          </p>
          <p className="mt-1 text-xs text-white/50">
            par <span className="font-medium text-white/70">HULIN Steven</span>, fondateur
          </p>
          <div className="mt-6 h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </header>

        {/* Corps : une seule colonne, lisible, humble */}
        <article className="prose prose-invert max-w-none">
          <style>{`
            /* Animations CSS discrètes (aucun JS) */
            @keyframes shimmer {
              0% { background-position: 0% 50%; }
              100% { background-position: 100% 50%; }
            }
            @keyframes glowOnce {
              0% { text-shadow: 0 0 0 rgba(139,92,246,0); }
              50% { text-shadow: 0 0 14px rgba(139,92,246,0.55); }
              100% { text-shadow: 0 0 0 rgba(139,92,246,0); }
            }
            .kw {
              background: linear-gradient(90deg, #c4b5fd 0%, #93c5fd 50%, #c4b5fd 100%);
              -webkit-background-clip: text;
              background-clip: text;
              color: transparent;
              background-size: 200% 100%;
              animation: shimmer 3.5s linear infinite;
            }
            .key {
              font-weight: 700;
              position: relative;
              animation: glowOnce 2.2s ease-in-out 0.2s 1;
            }
            .lead {
              font-size: 1.1rem;
              line-height: 1.8;
              color: rgba(255,255,255,0.9);
            }
            .section-title {
              font-size: 1.125rem;
              font-weight: 600;
              color: #c4b5fd; /* violet-300 */
              letter-spacing: .2px;
            }
            .card {
              border: 1px solid rgba(255,255,255,.08);
              background: rgba(255,255,255,.04);
              border-radius: 16px;
              padding: 1rem 1.25rem;
            }
            .thin {
              color: rgba(255,255,255,.78);
            }
          `}</style>

          <section className="space-y-4">
            <h2 className="section-title">Pourquoi <span className="kw">PrépaForce</span> ?</h2>
            <p className="lead">
              Se préparer correctement est difficile lorsque les contenus sont éparpillés, que le suivi manque et que la
              synthèse des cours prend du temps. <span className="key">PrépaForce</span> est née pour apporter un cadre
              lisible : l’essentiel au bon moment, des priorités claires et des progrès mesurables — sans superflu.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="section-title">Ce que nous apportons</h2>
            <p className="thin">
              Une plateforme d’entraînement structurée avec des QCM ciblés selon les difficultés de chacun, des
              révisions guidées et un suivi de progression simple à lire. L’idée est de transformer l’étude en
              trajectoire, plutôt qu’en accumulation.
            </p>
          </section>

          <section className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="card">
              <h3 className="mb-1 text-sm font-semibold text-white/85">Pour qui</h3>
              <p className="text-sm text-white/80">
                Candidats <b>Policier Adjoint</b> et <b>Gardiens de la Paix</b>, ainsi que <b>élèves en école</b> : les
                modules sont conçus pour les besoins concrets de la formation.
              </p>
            </div>
            <div className="card">
              <h3 className="mb-1 text-sm font-semibold text-white/85">Notre approche</h3>
              <p className="text-sm text-white/80">
                Nous appliquons les <b>meilleures méthodes issues de la recherche</b> et des pratiques pédagogiques
                éprouvées : apprentissage actif, consolidation progressive, priorisation de l’utile, gestion de l’effort
                et adaptation continue. Apprendre mieux, plus vite, et retenir plus longtemps.
              </p>
            </div>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="section-title">Où nous en sommes</h2>
            <p className="thin">
              La plateforme est en développement actif ; nous intégrons progressivement ces principes pour améliorer la
              qualité de l’étude, la rétention et, à terme, le taux de réussite aux épreuves.
            </p>
            <ul className="ml-5 list-disc text-sm text-white/85">
              <li>Entraînements par <b>QCM ciblés</b> avec retour clair</li>
              <li>Suivi de progression lisible</li>
              <li>Guides et conseils pratiques</li>
            </ul>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="section-title">La suite</h2>
            <p className="thin">
              Nous préparons des mises en situation vidéo interactives, un tableau de bord analytique plus complet et
              une priorisation personnalisée des révisions selon les forces/faiblesses.
            </p>
            <ul className="ml-5 list-disc text-sm text-white/85">
              <li>Mises en situation à choix multiples</li>
              <li>Analytics pédagogiques (tendances, alertes)</li>
              <li>Parcours différenciés candidats / élèves</li>
            </ul>
          </section>

          <blockquote className="mt-10 border-l-4 border-violet-400/35 pl-5 italic text-white/90">
            « Ton effort mérite les meilleurs outils. »
          </blockquote>
        </article>

        {/* Bandeau valeurs compact */}
        <section className="mt-12 grid gap-3 sm:grid-cols-3">
          <div className="card text-center">
            <p className="text-sm font-semibold text-white/85">
              <span className="key">Efficacité</span>
            </p>
            <p className="mt-1 text-xs text-white/65">Du temps utile, pas de dispersion.</p>
          </div>
          <div className="card text-center">
            <p className="text-sm font-semibold text-white/85">
              <span className="key">Clarté</span>
            </p>
            <p className="mt-1 text-xs text-white/65">Des priorités simples et visibles.</p>
          </div>
          <div className="card text-center">
            <p className="text-sm font-semibold text-white/85">
              <span className="key">Discipline</span>
            </p>
            <p className="mt-1 text-xs text-white/65">Des habitudes qui tiennent dans la durée.</p>
          </div>
        </section>

        {/* Signature humble + retour */}
        <footer className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/70 lg:flex-row">
          <p className="text-center lg:text-left">
            <span className="font-medium text-white/80">HULIN Steven</span> — Fondateur de PrépaForce
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm text-white/80 transition hover:bg-white/5"
          >
            ← Retour à l’accueil
          </Link>
        </footer>
      </section>
    </main>
  );
}
