import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-4 sm:py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* Texte gauche */}
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs text-violet-300">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-violet-400" />
              Parcours guidés PA & GPX
            </div>

            <h1 className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-5xl font-bold leading-tight text-transparent sm:text-6xl">
              La plateforme pour réussir les concours de Police (PA & GPX)
            </h1>

            <p className="mt-5 text-lg text-white/70">
              Fiches de cours, QCM chronométrés, mises en situation vidéo,
              révisions ENP et suivi de progression — tout en un, pensé pour
              les écoles et le terrain.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <a
                href="#get-started"
                className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black shadow-[0_0_0_1px_rgba(255,255,255,.2)] transition hover:bg-white/90"
              >
                Commencer maintenant
              </a>
              <a
                href="#demo"
                className="rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white/80 hover:border-white/25 hover:text-white"
              >
                Voir la démo
              </a>
            </div>
          </div>

          {/* Image droite */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <Image
              src="/images/image19.jpg"
              alt="Aperçu PrépaForce"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
