// src/app/histoire/HistoireClient.tsx
"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const container: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, staggerChildren: 0.06 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

export default function HistoireClient() {
  return (
    <main className="relative min-h-screen bg-[#0b0b10] text-white">
      {/* Halo d'ambiance DA PrépaForce */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -inset-x-40 -top-40 h-[42vh] bg-[radial-gradient(65%_70%_at_50%_0%,rgba(139,92,246,0.14),transparent_70%)] blur-3xl" />
        <div className="absolute -inset-x-40 -bottom-40 h-[34vh] bg-[radial-gradient(65%_70%_at_50%_100%,rgba(59,130,246,0.12),transparent_70%)] blur-3xl" />
      </div>

      <section className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-10">
        {/* HERO — Steven en avant */}
        <motion.header
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-6 text-center"
        >
          <FounderBadge />
          <div>
            <motion.h1
              variants={item}
              className="text-4xl font-bold tracking-tight text-transparent bg-gradient-to-r from-violet-400 via-blue-400 to-violet-400 bg-clip-text sm:text-5xl"
            >
              Je suis <span className="whitespace-nowrap">HULIN Steven</span>
            </motion.h1>
            <motion.p
              variants={item}
              className="mt-2 text-sm text-white/70"
            >
              Fondateur de <SparkWord>PrépaForce</SparkWord> — ENP Nîmes • Section 53
            </motion.p>
            <motion.div
              variants={item}
              className="mx-auto mt-6 h-px w-28 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />
          </div>
        </motion.header>

        {/* INTRO — Manifeste personnel */}
        <motion.section
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto mt-10 max-w-4xl text-center text-[1.05rem] leading-relaxed text-white/90 sm:text-lg"
        >
          <motion.p variants={item}>
            J’ai créé <SparkWord>PrépaForce</SparkWord> pour résoudre un problème simple : quand tout est
            éparpillé, on perd du temps et on perd la méthode. Mon objectif est clair :{" "}
            <PulseWord>Efficacité</PulseWord>, <PulseWord>Clarté</PulseWord>,{" "}
            <PulseWord>Discipline</PulseWord>. Un cadre lisible, des priorités visibles, des progrès
            mesurables — sans superflu.
          </motion.p>
        </motion.section>

        {/* GRILLE — Pourquoi / Pour qui */}
        <motion.section
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto mt-12 grid gap-6 lg:grid-cols-2"
        >
          <Card title="Pourquoi PrépaForce">
            <p>
              Se préparer correctement aux sélections et à l’école est difficile : contenu fragmenté,
              manque de suivi, synthèse chronophage. Ici, tout converge : l’essentiel, dans le bon ordre,
              avec un accompagnement concret.
            </p>
          </Card>

          <Card title="Pour qui">
            <p>
              Les <b>candidats Policier Adjoint</b> et <b>Gardiens de la Paix</b>, mais aussi les{" "}
              <b>élèves en école</b>. Les modules sont pensés pour les besoins réels du terrain : ce
              que tu dois savoir, quand le travailler, et comment valider.
            </p>
          </Card>
        </motion.section>

        {/* APPROCHE — Méthodes sans les nommer + ton perso */}
        <motion.section
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto mt-10 grid gap-6 lg:grid-cols-2"
        >
          <Card title="Mon approche d’apprentissage">
            <p>
              Je m’appuie sur les <b>meilleures méthodes issues de la recherche</b> et sur des{" "}
              <b>pratiques éprouvées</b> : apprentissage actif, consolidation progressive, gestion
              intelligente de l’effort, adaptation continue au niveau de chacun. Résultat : tu
              <b> retiens plus, mieux et plus longtemps</b>.
            </p>
          </Card>

          <Card title="Où on en est / la suite">
            <ul className="list-inside list-disc space-y-1 text-white/90">
              <li>Entraînements par <b>QCM ciblés</b> avec suivi clair</li>
              <li>Mises en situation vidéo <b>interactives</b> (bientôt)</li>
              <li><b>Tableau de bord analytique</b> : tendances, maîtrise par module, alertes</li>
              <li><b>Priorisation personnalisée</b> selon forces/faiblesses</li>
              <li>Parcours différenciés candidats / élèves</li>
            </ul>
          </Card>
        </motion.section>

        {/* CITATION */}
        <motion.blockquote
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto mt-12 max-w-3xl border-l-4 border-violet-400/40 pl-5 text-center text-lg italic text-white/90"
        >
          « Ton effort mérite les meilleurs outils. »
        </motion.blockquote>

        {/* SIGNATURE + RETOUR */}
        <motion.footer
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/70 lg:flex-row"
        >
          <p className="text-center lg:text-left">
            <span className="font-semibold text-white/85">HULIN Steven</span> — Fondateur de{" "}
            <SparkWord>PrépaForce</SparkWord>
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm text-white/80 transition hover:bg-white/5"
          >
            ← Retour à l’accueil
          </Link>
        </motion.footer>
      </section>
    </main>
  );
}

/* ---------- UI PARTS ---------- */

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.article
      variants={item}
      className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 shadow-[0_8px_40px_rgba(139,92,246,0.12)] backdrop-blur-sm"
    >
      <h3 className="mb-2 text-lg font-semibold text-violet-300">{title}</h3>
      <div className="text-[1.05rem] leading-relaxed text-white/90 sm:text-lg">{children}</div>
    </motion.article>
  );
}

/** Mot clé vibrant (gradient + lueur + soulignement animé une fois) */
function SparkWord({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      className="relative inline-block bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text font-bold text-transparent"
      initial={{ filter: "brightness(0.9)" }}
      animate={{ filter: ["brightness(0.9)", "brightness(1.2)", "brightness(1)"] }}
      transition={{ duration: 1.2, ease: EASE }}
    >
      {children}
      <motion.span
        aria-hidden
        className="absolute left-0 right-0 -bottom-0.5 h-[2px] bg-gradient-to-r from-transparent via-white/80 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
        style={{ transformOrigin: "left" }}
      />
    </motion.span>
  );
}

/** Mot clé à pulsation douce (mise en avant Efficacité/Clarté/Discipline) */
function PulseWord({ children }: { children: React.ReactNode }) {
  return (
    <motion.strong
      className="relative inline-flex items-center"
      initial={{ textShadow: "0 0 0 rgba(139,92,246,0)" }}
      animate={{
        textShadow: [
          "0 0 0 rgba(139,92,246,0)",
          "0 0 16px rgba(139,92,246,0.8)",
          "0 0 0 rgba(139,92,246,0)",
        ],
      }}
      transition={{ duration: 2.0, ease: EASE }}
    >
      {children}
    </motion.strong>
  );
}

/** Badge fondateur avec avatar initiales + anneau léger */
function FounderBadge() {
  return (
    <div className="flex items-center gap-4 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2">
      <div className="relative">
        <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 font-bold">
          SH
        </div>
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full"
          initial={{ boxShadow: "0 0 0 0 rgba(139,92,246,0.0)" }}
          animate={{ boxShadow: "0 0 24px 2px rgba(139,92,246,0.45)" }}
          transition={{ duration: 1.2, ease: EASE }}
        />
      </div>
      <div className="text-left">
        <p className="text-sm font-semibold text-white/90">HULIN Steven</p>
        <p className="text-xs text-white/60">Fondateur — PrépaForce</p>
      </div>
    </div>
  );
}
