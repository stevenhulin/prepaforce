// src/app/faq/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ — PrépaForce",
  description:
    "Questions fréquentes sur PrépaForce : compte, QCM, progression, confidentialité, tarifs, support, et feuille de route.",
};

const faqs = [
  {
    q: "Qu’est-ce que PrépaForce exactement ?",
    a: "Une plateforme d’entraînement et de révision pour les candidats Policier Adjoint / Gardien de la Paix et les élèves en école. Notre objectif : unifier l’essentiel, guider l’entraînement et rendre la progression lisible.",
  },
  {
    q: "À qui s’adresse la plateforme ?",
    a: "Aux candidats PA/GPX et aux élèves déjà en école. Les modules sont pensés pour les besoins concrets de la formation et du terrain.",
  },
  {
    q: "Comment sont construits les QCM ?",
    a: "Les QCM sont structurés par thèmes et niveaux. Ils visent des objectifs précis (connaissances et réflexes). L’algorithme privilégie les items utiles et ré-expose régulièrement les notions clés pour consolider la mémoire.",
  },
  {
    q: "Mon suivi de progression est-il conservé ?",
    a: "Oui. Vous disposez d’indicateurs globaux (tendance, maîtrise par module) et d’historiques d’entraînement. Les données restent liées à votre compte.",
  },
  {
    q: "Quelles sont vos méthodes pédagogiques ?",
    a: "Nous appliquons les meilleures approches issues de la recherche et des pratiques éprouvées : apprentissage actif, consolidation progressive, priorisation de l’utile, gestion de l’effort et adaptation au niveau de chacun.",
  },
  {
    q: "La plateforme est-elle alignée avec l’ENP / les épreuves officielles ?",
    a: "Oui, nous visons la conformité aux référentiels connus et aux attendus des épreuves. Les contenus et priorités sont structurés pour soutenir la préparation réelle du terrain.",
  },
  {
    q: "Quel est le modèle tarifaire ?",
    a: "Une offre gratuite pour découvrir, puis des formules payantes pour débloquer davantage de modules, d’analyses et d’outils de priorisation. Les tarifs exacts sont affichés sur la page Tarifs quand ils sont disponibles.",
  },
  {
    q: "Puis-je annuler ou changer d’offre ?",
    a: "Oui. Vous pourrez gérer votre abonnement depuis votre espace compte : changement d’offre, annulation, factures.",
  },
  {
    q: "Comment gérez-vous mes données ?",
    a: "Nous appliquons une politique stricte de confidentialité : minimisation des données, accès limité, chiffrement au repos/en transit, et transparence sur l’usage. Consultez la page Mentions légales / Confidentialité pour le détail.",
  },
  {
    q: "J’ai trouvé une erreur dans un QCM. Que faire ?",
    a: "Signalez-la via le bouton de remontée ou contactez-nous. Nous corrigeons rapidement et tenons un changelog des mises à jour.",
  },
  {
    q: "Une feuille de route est-elle disponible ?",
    a: "Oui. Les prochaines étapes incluent mises en situation vidéo interactives, tableau de bord analytique avancé et priorisation personnalisée. Une roadmap simplifiée sera publiée.",
  },
  {
    q: "Comment vous contacter ?",
    a: "Via la page Contact du site. Pour les demandes urgentes, précisez l’objet et joignez des captures si nécessaire.",
  },
];

export default function FAQPage() {
  // JSON-LD FAQPage pour le SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <main className="relative min-h-screen bg-[#0b0b10] text-white">
      {/* halo doux */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -inset-x-40 -top-40 h-[38vh] bg-[radial-gradient(60%_70%_at_50%_0%,rgba(139,92,246,0.12),transparent_70%)] blur-3xl" />
        <div className="absolute -inset-x-40 -bottom-40 h-[32vh] bg-[radial-gradient(60%_70%_at_50%_100%,rgba(59,130,246,0.10),transparent_70%)] blur-3xl" />
      </div>

      <section className="mx-auto max-w-4xl px-6 py-16 sm:px-8 lg:px-10">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-transparent bg-gradient-to-r from-violet-300 via-blue-300 to-violet-300 bg-clip-text sm:text-5xl">
            FAQ
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/70">
            Les réponses aux questions les plus fréquentes sur PrépaForce.
          </p>
          <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </header>

        {/* Accordéons accessibles (sans JS) */}
        <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/5">
          {faqs.map(({ q, a }, idx) => (
            <details
              key={idx}
              className="group p-5 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-start justify-between gap-6">
                <h3 className="text-left text-base font-medium text-white/90">
                  {q}
                </h3>
                <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/20 text-xs text-white/70 transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="mt-3 text-sm leading-relaxed text-white/80">
                {a}
              </div>
            </details>
          ))}
        </div>

        {/* CTA secondaire */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-sm">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-white/80 transition hover:bg-white/5"
          >
            Besoin d’aide ? Contactez-nous
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-white/80 transition hover:bg-white/5"
          >
            ← Retour à l’accueil
          </Link>
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
