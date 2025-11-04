"use client";

import Link from "next/link";
import "../auth.css";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const supabase = createClient();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setErrorMsg(error.message);
      else router.push("/");
    } catch (e: any) {
      setErrorMsg(e?.message ?? "Erreur inconnue.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-wrap">
      <section className="card">
        <h1 className="title">Connexion</h1>

        <form className="form" onSubmit={handleLogin}>
          <label className="label" htmlFor="email">Email</label>
          <input className="input" id="email" name="email" type="email" required />

          <label className="label" htmlFor="password">Mot de passe</label>
          <input className="input" id="password" name="password" type="password" required />

          {errorMsg && <p className="error">{errorMsg}</p>}

          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <p className="hint">
          Pas de compte ? <Link className="link" href="/signup">Créer un compte</Link>
        </p>
      </section>
    </main>
  );
}
