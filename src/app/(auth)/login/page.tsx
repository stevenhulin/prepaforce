"use client";

import Link from "next/link";
import "../auth.css";

export default function LoginPage() {
  return (
    <main className="auth-wrap">
      <section className="card">
        <h1 className="title">Connexion</h1>

        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <label className="label" htmlFor="email">Email</label>
          <input className="input" id="email" name="email" type="email" required />

          <label className="label" htmlFor="password">Mot de passe</label>
          <input className="input" id="password" name="password" type="password" required />

          <button className="btn" type="submit">Se connecter</button>
        </form>

        <p className="hint">
          Pas de compte ?{" "}
          <Link className="link" href="/signup">Créer un compte</Link>
        </p>
      </section>
    </main>
  );
}
