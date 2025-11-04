"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import "../(auth)/auth.css";

const TABS = [
  { id: "account", label: "Compte", desc: "Email et informations du compte." },
  { id: "security", label: "Sécurité", desc: "Contrôle du compte et suppression." },
  { id: "notifications", label: "Notifications", desc: "Emails et préférences d’alerte." },
  { id: "billing", label: "Facturation", desc: "Paiements, factures, abonnements." },
  { id: "preferences", label: "Préférences", desc: "Langue, thème, accessibilité." },
] as const;

export default function SettingsPage() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [active, setActive] = useState<(typeof TABS)[number]["id"]>("account");
  const [userEmail, setUserEmail] = useState<string>("");
  const [loadingUser, setLoadingUser] = useState(true);

  const [signingOut, setSigningOut] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  // Delete
  const REQUIRED_PHRASE = "SUPPRIMER MON COMPTE";
  const [confirmPhrase, setConfirmPhrase] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      setUserEmail(user.email ?? "");
      setLoadingUser(false);
    })();
  }, [router, supabase]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) setUserEmail(user.email);
    });
    return () => subscription.unsubscribe();
  }, [supabase]);

  async function handleSignOut() {
    try {
      setSigningOut(true);
      supabase.auth.signOut().catch(() => {});
      // redirection HARD pour éviter les blocages
      window.location.replace("/");
    } catch (e: any) {
      setSigningOut(false);
      setGlobalError(e?.message ?? "Erreur de déconnexion.");
    }
  }

  async function handleDeleteAccount(e: React.FormEvent) {
    e.preventDefault();
    setDeleting(true);
    setGlobalError(null);

    try {
      if (confirmPhrase !== REQUIRED_PHRASE) {
        throw new Error(`Vous devez taper exactement : "${REQUIRED_PHRASE}"`);
      }

      const res = await fetch("/api/delete-account", { method: "POST" });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "Suppression impossible.");

      // Nettoyage (non bloquant) + redirection HARD
      supabase.auth.signOut().catch(() => {});
      window.location.replace("/");

    } catch (e: any) {
      setGlobalError(e?.message ?? "Erreur pendant la suppression du compte.");
      setDeleting(false);
    }
  }

  const current = TABS.find((t) => t.id === active)!;

  return (
    <main className="auth-wrap">
      <section className="card settings-card">
        <header className="settings-header">
          <div>
            <h1 className="title">Paramètres</h1>
            <p className="hint page-subtitle">Gère les réglages de ton compte.</p>
          </div>
        </header>

        {globalError && (
          <p className="error" style={{ marginBottom: "1rem" }}>{globalError}</p>
        )}

        <div className="settings-layout">
          <aside className="settings-aside" aria-label="Catégories des paramètres">
            <div className="aside-inner">
              <nav>
                <p className="aside-title">Catégories</p>
                <ul className="tabs-list" role="tablist">
                  {TABS.map((tab) => (
                    <li key={tab.id}>
                      <button
                        role="tab"
                        aria-selected={active === tab.id}
                        className={`tab-btn ${active === tab.id ? "active" : ""}`}
                        onClick={() => setActive(tab.id)}
                      >
                        <span className="tab-dot" aria-hidden />
                        {tab.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="aside-footer">
                <button
                  onClick={handleSignOut}
                  disabled={signingOut}
                  className="btn-signout"
                  aria-label="Se déconnecter"
                  title="Se déconnecter"
                >
                  {signingOut ? "Déconnexion..." : "Se déconnecter"}
                </button>
              </div>
            </div>
          </aside>

          <section className="settings-panel" role="tabpanel">
            <header className="panel-header">
              <h2 className="panel-title">{current.label}</h2>
              <p className="hint">{current.desc}</p>
            </header>

            {/* Compte : email en lecture seule */}
            {!loadingUser && active === "account" && (
              <div className="panel-section">
                <p className="label" style={{ marginBottom: 6 }}>Adresse email</p>
                <p className="hint" style={{ fontSize: "0.95rem" }}>{userEmail || "—"}</p>
              </div>
            )}

            {/* Sécurité : suppression */}
            {!loadingUser && active === "security" && (
              <form className="panel-section danger-zone" onSubmit={handleDeleteAccount}>
                <p className="label" style={{ marginBottom: 6, color: "#ff6b6b" }}>
                  Zone dangereuse
                </p>
                <p className="hint" style={{ marginBottom: 10 }}>
                  ⚠️ Cette action est <b>définitive</b>. Toutes tes données seront supprimées.
                </p>

                <label className="label" htmlFor="confirm">
                  Tape <b>{REQUIRED_PHRASE}</b> pour confirmer :
                </label>
                <input
                  id="confirm"
                  className="input"
                  type="text"
                  placeholder={REQUIRED_PHRASE}
                  value={confirmPhrase}
                  onChange={(e) => setConfirmPhrase(e.target.value)}
                />

                <button
                  className="btn btn-danger"
                  type="submit"
                  disabled={deleting || confirmPhrase !== REQUIRED_PHRASE}
                >
                  {deleting ? "Suppression..." : "Supprimer mon compte"}
                </button>
              </form>
            )}

            {/* Placeholders autres onglets */}
            {active !== "account" && active !== "security" && (
              <>
                <div className="panel-section">
                  <div className="placeholder-row" />
                  <div className="placeholder-row wide" />
                </div>
              </>
            )}
          </section>
        </div>
      </section>

      <style jsx>{`
        .settings-card { max-width: 1100px; width: 100%; padding: 1.25rem; }
        .settings-header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 0.75rem; gap: 1rem; }
        .page-subtitle { margin-top: 0.25rem; }
        .settings-layout { display: grid; grid-template-columns: 260px 1fr; gap: 1rem; min-height: 560px; }
        .settings-aside { border-right: 1px solid rgba(255,255,255,0.12); padding-right: 0.75rem; position: sticky; top: 12px; align-self: start; }
        .aside-inner { display: flex; flex-direction: column; height: 100%; min-height: 520px; }
        .aside-title { font-size: 0.8rem; letter-spacing: .02em; color: rgba(255,255,255,0.55); margin-bottom: 0.5rem; }
        .tabs-list { display: grid; gap: 0.35rem; }
        .tab-btn { width: 100%; text-align: left; background: transparent; border: 1px solid rgba(255,255,255,0.12); color: rgba(255,255,255,0.78); padding: .6rem .75rem; border-radius: 8px; font-size: .94rem; display: flex; align-items: center; gap: .6rem; transition: all .2s; }
        .tab-btn:hover { border-color: rgba(255,255,255,0.22); color: #fff; }
        .tab-btn.active { border-color: rgba(255,255,255,0.32); background: linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%); color: #fff; }
        .tab-dot { width: 8px; height: 8px; border-radius: 999px; background: rgba(255,255,255,0.25); }
        .tab-btn.active .tab-dot { background: #fff; }
        .aside-footer { margin-top: auto; padding-top: .75rem; border-top: 1px solid rgba(255,255,255,0.08); }
        .btn-signout { width: 100%; background: rgba(220,38,38,0.14); color: #ff6b6b; border: 1px solid rgba(220,38,38,0.35); font-size: .85rem; padding: .5rem .75rem; border-radius: 8px; transition: all .18s; }
        .btn-signout:hover { background: rgba(220,38,38,0.22); color: #ff7b7b; border-color: rgba(220,38,38,0.5); }
        .settings-panel { padding-left: .25rem; }
        .panel-header { margin-bottom: .75rem; }
        .panel-title { font-size: 1.125rem; font-weight: 600; margin-bottom: .35rem; }
        .panel-section { border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 1rem; background: rgba(255,255,255,0.02); margin-bottom: 1rem; }
        .btn-danger { background: rgba(220,38,38,0.14); border: 1px solid rgba(220,38,38,0.35); color: #ff6b6b; }
        .btn-danger:hover { background: rgba(220,38,38,0.22); border-color: rgba(220,38,38,0.5); color: #ff7b7b; }
        .placeholder-row { height: 14px; border-radius: 6px; background: linear-gradient(90deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.14) 50%, rgba(255,255,255,0.08) 100%); background-size: 200% 100%; animation: shimmer 1.6s infinite linear; margin-bottom: 10px; }
        .placeholder-row.wide { height: 28px; border-radius: 8px; }
      `}</style>
    </main>
  );
}
