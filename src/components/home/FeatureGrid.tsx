import Image from "next/image";

export default function FeatureGrid() {
  const features = [
    {
      title: "Fiches de cours structurées",
      desc: "Droit pénal, procédure, police route, usage de la force, communication, tir/armement…",
      img: "/images/image2.jpg",
    },
    {
      title: "QCM chronométrés",
      desc: "Banque officielle, correction immédiate et re-tests ciblés.",
      img: "/images/image3.jpg",
    },
    {
      title: "Mises en situation vidéo",
      desc: "Accueil public, VIF, disparition d’enfant, tapage, PV, etc.",
      img: "/images/image4.jpg",
    },
    {
      title: "Révisions ENP",
      desc: "Modules alignés avec le programme d’école : évals & jalons.",
      img: "/images/image5.jpg",
    },
    {
      title: "Prépa physique",
      desc: "Course, renfo, pompes, gainage, suivi des temps et distances.",
      img: "/images/image6.jpg",
    },
    {
      title: "Armes & sécurité",
      desc: "SP2022 / SIG, MSAA, règles, procédures et maintenance.",
      img: "/images/image7.jpg",
    },
  ];

  return (
    <section id="fiches" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Tout pour réussir — de l’écrit au terrain
          </h2>
          <a href="#" className="text-sm text-white/60 hover:text-white">
            Voir toutes les fonctionnalités →
          </a>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <FeatureCard key={i} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  title,
  desc,
  img,
}: {
  title: string;
  desc: string;
  img: string;
}) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-white/20 hover:bg-white/[0.08]">
      <div className="relative h-40 w-full overflow-hidden border-b border-white/10">
        <Image src={img} alt={title} fill className="object-cover" />
      </div>
      <div className="p-6">
        <div className="mb-4 inline-flex items-center gap-2 rounded-md bg-violet-500/10 px-2 py-1 text-xs text-violet-300 ring-1 ring-violet-500/20">
          Module
        </div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm text-white/70">{desc}</p>
        <div className="mt-6 inline-flex items-center gap-2 text-sm text-white/80">
          En savoir plus <span aria-hidden>→</span>
        </div>
      </div>
    </div>
  );
}
