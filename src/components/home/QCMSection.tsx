import Image from "next/image";

export default function QCMSection() {
  return (
    <section id="qcm" className="border-y border-white/10 bg-white/5 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-center gap-2 text-xs text-white/70">
          <span className="rounded-full bg-violet-500/20 px-2 py-0.5 font-semibold text-violet-300">
            QCM
          </span>
          <span>Épreuves chronométrées & adaptatives</span>
        </div>
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <h3 className="text-3xl font-semibold sm:text-4xl">
              Entraînez-vous dans les conditions réelles
            </h3>
            <p className="mt-4 text-white/70">
              Chrono, pénalités, modes examen, et répétition espacée pour
              mémoriser durablement.
            </p>
            <ul className="mt-6 space-y-3 text-white/70">
              <li className="flex items-start gap-3">
                <Dot /> Questions officielles + cas pratiques contextualisés
              </li>
              <li className="flex items-start gap-3">
                <Dot /> Revoir ses erreurs et générer des séries ciblées
              </li>
              <li className="flex items-start gap-3">
                <Dot /> Export des résultats et suivi par module
              </li>
            </ul>
            <div className="mt-8">
              <a
                href="#"
                className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90"
              >
                Lancer un QCM
              </a>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/30 p-6">
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-white/10 to-transparent">
              <Image
                src="/images/image8.jpg"
                alt="Interface QCM"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Dot() {
  return (
    <span className="mt-1 inline-block h-1.5 w-1.5 flex-none rounded-full bg-violet-400/70" />
  );
}
