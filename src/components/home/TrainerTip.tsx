export const dynamic = "force-dynamic";
import { TRAINER_TIPS } from "@/data/trainerTips";

export default async function TrainerTip() {
  const index = Math.floor(Math.random() * TRAINER_TIPS.length);
  const tip =
    TRAINER_TIPS[index] ||
    "Révise un module court mais utile aujourd’hui.";

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs text-violet-300">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-violet-400" />
            Conseil formateur (aléatoire)
          </div>
          <p className="text-base text-white/80">{tip}</p>
        </div>
      </div>
    </section>
  );
}
