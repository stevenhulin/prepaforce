"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [showCompliment, setShowCompliment] = useState(false);
  const complimentTimer = useRef<number | null>(null);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data: { user } }) => updateDisplay(user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      updateDisplay(session?.user ?? null);
    });

    function updateDisplay(user: any) {
      if (!user) return setDisplayName(null);
      let pseudo = user.user_metadata?.pseudo || user.email || null;
      if (pseudo && pseudo.length > 15) pseudo = pseudo.substring(0, 15) + "…";
      setDisplayName(pseudo);
    }

    return () => {
      subscription.unsubscribe();
      if (complimentTimer.current) window.clearTimeout(complimentTimer.current);
    };
  }, []);

  function handlePseudoClick() {
    const KEY = "pf_pseudo_compliment_shown";
    if (typeof window !== "undefined" && window.localStorage.getItem(KEY) === "1") return;
    setShowCompliment(true);
    complimentTimer.current = window.setTimeout(() => {
      setShowCompliment(false);
      try { window.localStorage.setItem(KEY, "1"); } catch {}
    }, 1400);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Image src="/Logo/logo.png" alt="Logo PrépaForce" width={24} height={24} className="rounded" />
          <span className="text-sm font-semibold text-white/90">PrépaForce</span>
        </div>

        <nav className="hidden items-center gap-6 text-sm text-white/60 md:flex">
          <a href="#fiches" className="hover:text-white">Fiches</a>
          <a href="#qcm" className="hover:text-white">QCM</a>
          <a href="#videos" className="hover:text-white">Vidéos</a>
          <a href="#situations" className="hover:text-white">Mises en situation</a>
          <a href="#progression" className="hover:text-white">Progression</a>
        </nav>

        {displayName ? (
          <div className="relative flex items-center gap-3">
            <button onClick={handlePseudoClick} className="pf-pseudo-btn text-sm font-medium focus:outline-none" title="Ton pseudo">
              <span className="pf-pseudo-gradient">{displayName}</span>
            </button>

            {/* engrenage INCHANGÉ */}
            <Link
              href="/settings"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/15 text-white/80 hover:text-white hover:border-white/25"
              title="Paramètres"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09c.6 0 1.18-.23 1.51-1Z" />
              </svg>
            </Link>

            {showCompliment && <div className="pf-compliment-bubble">Quel beau pseudo ✨</div>}

            <style jsx>{`
              .pf-pseudo-btn { padding: 0; background: transparent; border: 0; cursor: pointer; }
              .pf-pseudo-gradient {
                background: linear-gradient(90deg, #b388ff, #7c3aed, #22d3ee, #b388ff);
                background-size: 200% 100%;
                -webkit-background-clip: text; background-clip: text;
                -webkit-text-fill-color: transparent;
                animation: pfGradientShift 5.5s ease-in-out infinite;
              }
              @keyframes pfGradientShift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
              .pf-compliment-bubble {
                position: absolute; top: 110%; right: 0; white-space: nowrap;
                font-size: 12px; color: #fff; background: rgba(255,255,255,0.06);
                border: 1px solid rgba(255,255,255,0.18); padding: 8px 10px; border-radius: 10px;
                backdrop-filter: blur(6px); box-shadow: 0 6px 18px rgba(0,0,0,0.25);
                opacity: 0; transform: translateY(6px) scale(0.98); animation: pfBubbleIn 1400ms ease forwards;
              }
              @keyframes pfBubbleIn {
                0% { opacity: 0; transform: translateY(6px) scale(0.98); }
                12% { opacity: 1; transform: translateY(0) scale(1); }
                80% { opacity: 1; transform: translateY(0) scale(1); }
                100% { opacity: 0; transform: translateY(-4px) scale(0.98); }
              }
            `}</style>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/login" className="rounded-lg border border-white/15 px-3 py-1.5 text-sm text-white/80 hover:border-white/25 hover:text-white">Se connecter</Link>
            <Link href="/signup" className="rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-black hover:bg-white/90">Créer un compte</Link>
          </div>
        )}
      </div>
    </header>
  );
}
