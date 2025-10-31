// src/app/contact/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact — PrépaForce",
  description:
    "Contactez PrépaForce : support, partenariats, retours, signalement d’erreur. Réponse professionnelle et rapide.",
};

export default function ContactPage() {
  // JSON-LD ContactPage + Organization
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact — PrépaForce",
    description:
      "Formulaire de contact pour support, partenariats, retours et signalements.",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://www.prepaforce.example/contact", // ← remplace par ton domaine
    },
    about: {
      "@type": "Organization",
      name: "PrépaForce",
      url: "https://www.prepaforce.example", // ← remplace
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: "contact@prepaforce.example", // ← remplace
          availableLanguage: ["fr"],
        },
      ],
    },
  };

  return (
    <main className="relative min-h-screen bg-[#0b0b10] text-white">
      {/* Halo DA */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -inset-x-40 -top-40 h-[38vh] bg-[radial-gradient(60%_70%_at_50%_0%,rgba(139,92,246,0.12),transparent_70%)] blur-3xl" />
        <div className="absolute -inset-x-40 -bottom-40 h-[32vh] bg-[radial-gradient(60%_70%_at_50%_100%,rgba(59,130,246,0.10),transparent_70%)] blur-3xl" />
      </div>

      <section className="mx-auto max-w-5xl px-6 py-16 sm:px-8 lg:px-10">
        {/* En-tête */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-transparent bg-gradient-to-r from-violet-300 via-blue-300 to-violet-300 bg-clip-text sm:text-5xl">
            Contact
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/70">
            Support, partenariats, retours sur la plateforme, signalements
            d’erreurs QCM : nous lisons chaque message avec attention.
          </p>
          <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </header>

        {/* Grille : infos + formulaire */}
        <div className="grid gap-8 lg:grid-cols-[1fr,1.4fr]">
          {/* Colonne Infos */}
          <aside className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold text-violet-300">
              Informations
            </h2>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <span className="text-white/60">Email :</span>{" "}
                <a
                  className="underline decoration-white/20 underline-offset-4 hover:decoration-white/40"
                  href="mailto:contact@prepaforce.example"
                >
                  contact@prepaforce.example
                </a>
              </li>
              <li>
                <span className="text-white/60">Disponibilité :</span>{" "}
                Lun–Ven, 09:00–18:00 (heure de Paris)
              </li>
              <li>
                <span className="text-white/60">Délai moyen :</span> sous 24–48h
                ouvrées
              </li>
            </ul>

            <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.04] p-4 text-sm text-white/75">
              <p className="font-medium text-white/85">Bon à savoir</p>
              <ul className="mt-2 list-inside list-disc space-y-1">
                <li>
                  Pour un bug QCM, joignez l’<i>ID</i> de la question et un
                  court descriptif.
                </li>
                <li>
                  Pour un partenariat, précisez l’objet et vos coordonnées.
                </li>
              </ul>
            </div>

            <div className="mt-6 text-sm text-white/70">
              <p className="font-medium text-white/80">Fondateur</p>
              <p>HULIN Steven — PrépaForce</p>
            </div>

            <div className="mt-6">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:bg-white/5"
              >
                ← Retour à l’accueil
              </Link>
            </div>
          </aside>

          {/* Colonne Formulaire */}
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold text-violet-300">
              Écrivez-nous
            </h2>
            <p className="mt-1 text-sm text-white/70">
              Les champs marqués d’un astérisque sont obligatoires.
            </p>

            <form
              className="mt-6 space-y-5"
              method="POST"
              action="/api/contact"
              noValidate
            >
              {/* Honeypot anti-spam */}
              <input
                type="text"
                name="website"
                autoComplete="off"
                tabIndex={-1}
                className="hidden"
                aria-hidden="true"
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1 block text-sm text-white/80"
                  >
                    Nom complet *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    minLength={2}
                    className="w-full rounded-lg border border-white/15 bg-[#0f0f13] px-3 py-2 text-sm outline-none ring-0 placeholder:text-white/30 focus:border-violet-400/60"
                    placeholder="Ex. Steven Hulin"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1 block text-sm text-white/80"
                  >
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-lg border border-white/15 bg-[#0f0f13] px-3 py-2 text-sm outline-none focus:border-violet-400/60"
                    placeholder="vous@exemple.fr"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="topic"
                    className="mb-1 block text-sm text-white/80"
                  >
                    Sujet *
                  </label>
                  <input
                    id="topic"
                    name="topic"
                    type="text"
                    required
                    minLength={3}
                    className="w-full rounded-lg border border-white/15 bg-[#0f0f13] px-3 py-2 text-sm outline-none focus:border-violet-400/60"
                    placeholder="Objet de votre demande"
                  />
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="mb-1 block text-sm text-white/80"
                  >
                    Catégorie *
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    className="w-full rounded-lg border border-white/15 bg-[#0f0f13] px-3 py-2 text-sm outline-none focus:border-violet-400/60"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Sélectionnez une catégorie
                    </option>
                    <option>Support</option>
                    <option>Partenariat</option>
                    <option>Retour / Suggestion</option>
                    <option>Signalement d’erreur</option>
                    <option>Autre</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-1 block text-sm text-white/80"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  minLength={12}
                  rows={6}
                  className="w-full resize-y rounded-lg border border-white/15 bg-[#0f0f13] px-3 py-2 text-sm outline-none focus:border-violet-400/60"
                  placeholder="Expliquez votre demande avec précision."
                />
              </div>

              <div className="flex items-start gap-2 text-xs text-white/70">
                <input
                  id="tos"
                  name="tos"
                  type="checkbox"
                  required
                  className="mt-0.5"
                />
                <label htmlFor="tos">
                  J’accepte que mes informations soient traitées pour répondre à
                  ma demande. Voir{" "}
                  <Link
                    href="/mentions-legales"
                    className="underline decoration-white/20 underline-offset-4 hover:decoration-white/40"
                  >
                    la politique de confidentialité
                  </Link>
                  .
                </label>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-5 py-2.5 text-sm text-white/90 transition hover:bg-white/10"
                >
                  Envoyer
                </button>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm text-white/80 transition hover:bg-white/5"
                >
                  ← Retour à l’accueil
                </Link>
              </div>
            </form>
          </section>
        </div>
      </section>

      {/* SEO JSON-LD */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
