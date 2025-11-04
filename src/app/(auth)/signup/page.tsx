"use client";

import "../auth.css";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const supabase = createClient();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");
    const pseudo = String(form.get("pseudo") || "").trim();

    if (!email || !password || !pseudo) {
      setErrorMsg("Remplis tous les champs.");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm`,
          data: { pseudo },
        },
      });

      if (error) setErrorMsg(error.message);
      else setOk(true);
    } catch (e: any) {
      setErrorMsg(e?.message ?? "Erreur inconnue.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-wrap">
      <section className="card">
        <h1 className="title">Inscription</h1>

        {!ok ? (
          <form className="form" onSubmit={handleSignup}>
            <label className="label" htmlFor="pseudo">Pseudo</label>
            <input className="input" id="pseudo" name="pseudo" type="text" required />

            <label className="label" htmlFor="email">Email</label>
            <input className="input" id="email" name="email" type="email" required />

            <label className="label" htmlFor="password">Mot de passe</label>
            <input className="input" id="password" name="password" type="password" required />

            {errorMsg && <p className="error">{errorMsg}</p>}

            <button className="btn" type="submit" disabled={loading}>
              {loading ? "Création..." : "Créer le compte"}
            </button>
          </form>
        ) : (
          <p className="hint">✅ Compte créé ! Vérifie ton email pour confirmer ton inscription.</p>
        )}

        <p className="hint">
          Déjà inscrit ? <Link className="link" href="/login">Se connecter</Link>
        </p>
      </section>
    </main>
  );
}
