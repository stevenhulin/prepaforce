"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function Footer() {
  // Parallaxe douce au survol (sur le sceau)
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-50, 50], [6, -6]), { stiffness: 100, damping: 12 });
  const ry = useSpring(useTransform(mx, [-50, 50], [-6, 6]), { stiffness: 100, damping: 12 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set(e.clientX - (rect.left + rect.width / 2));
    my.set(e.clientY - (rect.top + rect.height / 2));
  }

  return (
    <footer className="relative mt-12 overflow-hidden border-t border-white/10 bg-[#0a0a0a] py-6 text-white/75">

      {/* === BACKGROUND FX === */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Liseré fin lumineux */}
        <motion.div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-sky-400 via-violet-400 to-rose-400 opacity-70"
          animate={{ backgroundPositionX: ["0%", "100%"] }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          style={{ backgroundSize: "200% 100%" }}
        />

        {/* Halo subtil de profondeur */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-[60rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(139,92,246,.16), transparent 62%)" }}
          animate={{ scale: [1, 1.03, 1], opacity: [0.55, 0.85, 0.55] }}
          transition={{ duration: 14, repeat: Infinity, ease: [0.25, 0.1, 0.25, 1] }}
        />

        {/* Balayage gyro ultra-doux (bleu/rouge) */}
        <motion.div
          className="absolute inset-y-0 -left-1/2 w-[300%] opacity-25 mix-blend-screen"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(59,130,246,.18) 18%, transparent 32%, transparent 68%, rgba(239,68,68,.18) 82%, transparent 100%)",
          }}
          animate={{ x: ["-33%", "33%", "-33%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* === CONTENT === */}
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-6 px-6 sm:px-8 md:grid-cols-[1fr_auto]">
        {/* Cols gauche : 4 colonnes de liens */}
        <div className="grid gap-8 md:grid-cols-4">
          <FadeCol>
            <Image src="/Logo/logo.png" alt="PrépaForce" width={44} height={44} className="rounded-lg ring-1 ring-white/10" />
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              PrépaForce — entraînement & révision pour élèves <strong>PA</strong> & <strong>GPX</strong>.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <SocialIcon href="#" label="X / Twitter">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" />
              </SocialIcon>
              <SocialIcon href="#" label="YouTube">
                <path d="M4 8.5c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v7c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2v-7zm6 1v5l5-2.5-5-2.5z" fill="currentColor" />
              </SocialIcon>
              <SocialIcon href="#" label="Instagram">
                <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="2" fill="none" />
                <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="2" fill="none" />
                <circle cx="17" cy="7" r="1.1" fill="currentColor" />
              </SocialIcon>
            </div>
          </FadeCol>

          <FadeCol delay={0.05}>
            <FooterCol title="Contenus" items={[["Fiches", "#fiches"], ["QCM", "#qcm"], ["Vidéos", "#videos"], ["Progression", "#progression"]]} />
          </FadeCol>

          <FadeCol delay={0.1}>
            <FooterCol title="Ressources" items={[["Notre histoire", "/histoire"], ["FAQ", "/aq"], ["Blog", "/blog"], ["Contact", "/contact"]]} />
          </FadeCol>

          <FadeCol delay={0.15}>
            <FooterCol title="Légal" items={[["Mentions légales", "#"], ["Confidentialité", "#"], ["CGU", "#"]]} />
          </FadeCol>
        </div>

        {/* Col droite : Sceau holographique (original, interactif) */}
        <div
          ref={ref}
          onMouseMove={onMouseMove}
          className="relative mx-auto h-48 w-48 select-none sm:h-56 sm:w-56 md:mx-0"
        >
          <motion.div
            style={{ rotateX: rx, rotateY: ry }}
            className="relative h-full w-full"
          >
            {/* Glow principal */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(127,0,255,.18),transparent_60%)] blur-2xl" />

            {/* Anneau externe lumineux (conic gradient tournant) */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, rgba(94,234,212,.0), rgba(167,139,250,.45), rgba(59,130,246,.35), rgba(239,68,68,.35), rgba(94,234,212,.0))",
                WebkitMask:"radial-gradient(circle, transparent 0%, transparent 70%, black 71%, black 100%)",
                mask:"radial-gradient(circle, transparent 0%, transparent 70%, black 71%, black 100%)",
                filter: "blur(1px)",
              }}

              animate={{ rotate: [0, 360] }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            />

            {/* Anneau pointillé en rotation inverse */}
            <motion.div
              className="absolute inset-[8%] rounded-full ring-1 ring-white/15"
              style={{
                background:
                  "repeating-conic-gradient(from 0deg, rgba(255,255,255,.28) 0deg 2deg, rgba(255,255,255,0) 2deg 6deg)",
                WebkitMask:
                  "radial-gradient(circle, transparent 55%, black 56%, black 100%)",
                mask:
                  "radial-gradient(circle, transparent 55%, black 56%, black 100%)",
              }}
              animate={{ rotate: [0, -360] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />

            {/* Logo central (ton logo) */}
            <div className="absolute inset-[25%] rounded-full bg-black/40 backdrop-blur-sm ring-1 ring-white/10 flex items-center justify-center">
              <Image src="/Logo/logo.png" alt="PrépaForce" width={64} height={64} className="opacity-90" />
            </div>

            {/* Étincelles en orbite */}
          </motion.div>
        </div>
      </div>

      {/* Bas de footer */}
      <div className="relative z-10 mx-auto mt-4 max-w-7xl border-t border-white/10 px-6 pt-4 text-xs text-white/50 sm:px-8">
        <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
          <span>© {new Date().getFullYear()} PrépaForce — Tous droits réservés.</span>
          <span>Steven HULIN</span>
        </div>
      </div>
    </footer>
  );
}

/* ===== Sous-composants ===== */

function FadeCol({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ delay, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="space-y-3"
    >
      {children}
    </motion.div>
  );
}

function FooterCol({ title, items }: { title: string; items: [string, string][] }) {
  return (
    <div>
      <div className="mb-3 text-sm font-semibold text-white/90">{title}</div>
      <ul className="space-y-2 text-sm text-white/70">
        {items.map(([label, href]) => (
          <li key={label}>
            <Link href={href} className="transition-colors hover:text-white">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="group relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/[0.06] text-white/80 transition hover:border-white/30 hover:text-white"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4">
        {children}
      </svg>
      <span className="pointer-events-none absolute -z-10 h-10 w-10 rounded-full bg-fuchsia-400/20 opacity-0 blur-xl transition group-hover:opacity-100" />
    </Link>
  );
}

/** Étincelles en orbite autour du sceau */
function SparkOrbit({ count = 12, radius = "50%" }: { count?: number; radius?: string }) {
  return (
    <div className="pointer-events-none absolute inset-0">
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * 360;
        const size = 3 + (i % 3);
        const dur = 14 + (i % 5);
        const delay = (i % 7) * 0.4;

        return (
          <motion.span
            key={i}
            className="absolute block rounded-full"
            style={{
              width: size,
              height: size,
              left: "50%",
              top: "50%",
              translateX: `calc(${radius} * cos(${angle}deg))`,
              translateY: `calc(${radius} * sin(${angle}deg))`,
              background: "rgba(168,85,247,.85)",
              boxShadow: "0 0 14px rgba(168,85,247,.85)",
              filter: "saturate(120%)",
            } as any}
            animate={{
              opacity: [0.35, 1, 0.35],
              scale: [0.9, 1.2, 0.9],
              rotate: [0, 360],
            }}
            transition={{
              duration: dur,
              delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        );
      })}
    </div>
  );
}
