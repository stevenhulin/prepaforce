import { TRAINER_TIPS } from "@/data/trainerTips";

export const metadata = {
  title: "Conseils formateurs • PrépaForce",
};

export default function TipsIndexPage() {
  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-3xl font-semibold text-white">
        Conseils formateurs
      </h1>
      <ul className="space-y-3">
        {TRAINER_TIPS.map((t, i) => (
          <li
            key={i}
            className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-white/80"
          >
            {t}
          </li>
        ))}
      </ul>
    </main>
  );
}
