"use client";
import Image from "next/image";

type Testimonial = {
  name: string;
  school: string;
  promo: string;
  avatar?: string;
  message: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Inès B.",
    school: "ENP Nîmes",
    promo: "PA — Section 53",
    avatar: "/images/image11.jpg",
    message:
      "Les QCM chrono + corrections claires m’ont fait gagner un temps fou avant l’écrit.",
  },
  {
    name: "Lucas R.",
    school: "ENP Reims",
    promo: "GPX — Promo 154",
    avatar: "/images/image12.jpg",
    message:
      "Les mises en situation vidéo m’ont aidé pour l’accueil et la reformulation au poste de garde.",
  },
  {
    name: "Manon D.",
    school: "ENP Saint-Malo",
    promo: "PA",
    avatar: "/images/image13.jpg",
    message:
      "J’adore le suivi de progression : objectifs hebdo, badges, c’est super motivant.",
  },
  {
    name: "Yanis T.",
    school: "ENP Châlons",
    promo: "GPX",
    avatar: "/images/image14.jpg",
    message:
      "Les fiches sont propres et ciblées, parfait pour réviser avant les évaluations.",
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">
            Ils en parlent
          </h2>
          <span className="text-sm text-white/60">
            Avis d’élèves de différentes ENP
          </span>
        </div>

        <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_200px_at_10%_0%,rgba(127,0,255,.12),transparent)]" />

          <div className="flex w-max gap-4 animate-marquee-right group-hover:[animation-play-state:paused]">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, idx) => (
              <Card key={idx} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="relative w-[22rem] shrink-0 rounded-xl border border-white/10 bg-[#0d0d0f]/80 p-5 shadow-[0_10px_30px_-15px_rgba(127,0,255,.4)] transition-transform duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_-20px_rgba(127,0,255,.6)]">
      <div className="mb-4 flex items-center gap-3">
        <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/10">
          <Image
            src={t.avatar || "/Logo/logo.png"}
            alt={t.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <figcaption className="text-sm font-medium text-white/90">
            {t.name}
          </figcaption>
          <div className="text-xs text-white/60">
            {t.school} • {t.promo}
          </div>
        </div>
      </div>
      <blockquote className="text-sm text-white/80">“{t.message}”</blockquote>
      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />
    </figure>
  );
}
