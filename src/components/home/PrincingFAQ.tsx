export default function PricingFAQ() {
  return (
    <section id="tarifs" className="border-t border-white/10 bg-white/5 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h3 className="text-center text-3xl font-semibold sm:text-4xl">Des tarifs simples</h3>
        <p className="mt-3 text-center text-white/70">
          Commencez gratuitement, passez au complet quand vous voulez.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <PriceCard
            name="Gratuit"
            price="0€"
            features={["Fiches de base", "QCM d’essai", "Suivi basique"]}
            cta="Créer un compte"
          />
          <PriceCard
            name="Complet"
            price="9,90€ / mois"
            features={["Tous les modules", "QCM illimités", "Vidéos & mises en situation", "Suivi avancé"]}
            cta="Essayer 7 jours"
            highlight
          />
          <PriceCard
            name="Équipe"
            price="Sur devis"
            features={["Promo/école", "Tableaux de bord formateurs", "Exports & intégrations"]}
            cta="Contacter l’équipe"
          />
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          <h4 className="mb-4 text-center text-2xl font-semibold">FAQ</h4>
          <div className="divide-y divide-white/10 rounded-xl border border-white/10">
            <FAQ q="Est-ce adapté à l’ENP ?" a="Oui, les parcours sont alignés avec les contenus d’école + exercices de terrain." />
            <FAQ q="Puis-je annuler à tout moment ?" a="Oui, abonnement sans engagement. Annulation en un clic." />
            <FAQ q="Y a-t-il des remises pour les groupes ?" a="Oui, tarifs spécifiques pour promotions/écoles. Contactez-nous." />
          </div>
        </div>
      </div>
    </section>
  );
}

function PriceCard({
  name,
  price,
  features,
  cta,
  highlight,
}: {
  name: string;
  price: string;
  features: string[];
  cta: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-6 ${
        highlight
          ? "border-violet-500/40 bg-violet-500/10 shadow-[0_0_40px_-20px_rgba(127,0,255,.6)]"
          : "border-white/10 bg-white/5"
      }`}
    >
      <div className="text-sm text-white/60">{name}</div>
      <div className="mt-2 text-3xl font-semibold">{price}</div>
      <ul className="mt-6 space-y-2 text-sm text-white/70">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <Dot /> {f}
          </li>
        ))}
      </ul>
      <a
        href="#"
        className={`mt-6 inline-block rounded-lg px-4 py-2 text-sm font-semibold ${
          highlight
            ? "bg-white text-black hover:bg-white/90"
            : "border border-white/15 text-white/80 hover:border-white/25 hover:text-white"
        }`}
      >
        {cta}
      </a>
    </div>
  );
}

function FAQ({ q, a }: { q: string; a: string }) {
  return (
    <details className="group px-5 py-4 open:bg-white/[0.03]">
      <summary className="flex cursor-pointer list-none items-center justify-between text-sm text-white/80">
        {q}
        <span className="ml-4 rounded bg-white/10 px-2 py-0.5 text-xs text-white/60 group-open:rotate-45">
          +
        </span>
      </summary>
      <p className="mt-3 text-sm text-white/60">{a}</p>
    </details>
  );
}

function Dot() {
  return <span className="mt-1 inline-block h-1.5 w-1.5 flex-none rounded-full bg-violet-400/70" />;
}
