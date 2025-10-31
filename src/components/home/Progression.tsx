import Image from "next/image";

export default function Progression() {
  return (
    <section id="progression" className="relative overflow-hidden py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(600px_300px_at_50%_10%,rgba(127,0,255,.25),transparent)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-3 text-xs text-violet-300">Suivi de progression</div>
          <h3 className="text-4xl font-semibold">Tableau de bord clair et motivant</h3>
          <p className="mt-4 text-white/70">
            Objectifs hebdo, badges de modules, historique de sessions et recommandations de révision.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="relative aspect-[16/7] overflow-hidden rounded-xl border border-white/10 bg-black/40">
            <Image src="/images/image15.jpg" alt="Dashboard progression" fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
