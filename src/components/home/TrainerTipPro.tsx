"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TRAINER_TIPS } from "@/data/trainerTips";

function pickRandom(excludeIndex: number | null, max: number) {
  if (max <= 1) return 0;
  let idx = Math.floor(Math.random() * max);
  if (excludeIndex !== null && idx === excludeIndex) {
    idx = (idx + 1) % max;
  }
  return idx;
}

export default function TrainerTipPro() {
  const tips = useMemo(() => TRAINER_TIPS.filter(Boolean), []);
  const [index, setIndex] = useState<number>(() => pickRandom(null, tips.length));
  const [mounted, setMounted] = useState(false);

  // évite mismatch SSR/CSR
  useEffect(() => setMounted(true), []);

  // changement automatique (plus lent)
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => pickRandom(prev, tips.length));
    }, 10000); // ⏱️ 10 secondes entre chaque conseil
    return () => clearInterval(id);
  }, [tips.length]);

  if (!mounted) {
    return (
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SkeletonCard />
        </div>
      </section>
    );
  }

  const tip = tips[index] ?? "Révise un module utile aujourd’hui, même brièvement.";

  return (
    <section className="relative py-24">
      {/* Fond animé violet */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="neon-ring absolute -inset-24 rounded-full blur-3xl" />
        <div className="aurora-mask absolute -inset-10" />
      </div>
      <Particles count={30} />

      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs text-violet-300">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-violet-400" />
          Conseil formateur
        </div>

        <div className="relative mt-8">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.98, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -30, scale: 0.98, filter: "blur(10px)" }}
              transition={{
                duration: 1.8, // ✨ durée d’apparition plus longue et fluide
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="text-balance text-2xl font-medium leading-relaxed text-white sm:text-3xl md:text-4xl"
            >
              <span className="mr-2 select-none text-5xl text-violet-300">“</span>
              <span className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
                {tip}
              </span>
              <span className="ml-2 select-none text-5xl text-violet-300">”</span>
            </motion.blockquote>
          </AnimatePresence>

          <motion.div
            aria-hidden
            className="mx-auto mt-8 h-px w-1/2 bg-gradient-to-r from-transparent via-violet-500/70 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          />
        </div>
      </div>
    </section>
  );
}

/* ----------- Sub components ----------- */

function SkeletonCard() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d10]/70 p-10">
      <div className="mx-auto h-6 w-3/4 animate-pulse rounded bg-white/10" />
    </div>
  );
}

function Particles({ count = 20 }: { count?: number }) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.floor(Math.random() * 4),
        delay: Math.random() * 6,
        duration: 8 + Math.random() * 8,
      })),
    [count]
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {dots.map((d) => (
        <span
          key={d.id}
          className="absolute block rounded-full bg-violet-400/25 shadow-[0_0_22px_rgba(127,0,255,.45)]"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            animation: `floatY ${d.duration}s ease-in-out ${d.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
