"use client";

import Link from "next/link";
import "../auth.css";

export default function SignupPage() {
  return (
    <main className="auth-wrap">
      <section className="card">
        <h1 className="title">Inscription</h1>

        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <label className="label" htmlFor="pseudo">Pseudo</label>
          <input className="input" id="pseudo" name="pseudo" type="text" required />

          <label className="label" htmlFor="email">Email</label>
          <input className="input" id="email" name="email" type="email" required />

          <label className="label" htmlFor="password">Mot de passe</label>
          <input className="input" id="password" name="password" type="password" required />

          <button className="btn" type="submit">Créer le compte</button>
        </form>

        <p className="hint">
          Déjà inscrit ?{" "}
          <Link className="link" href="/login">Se connecter</Link>
        </p>
      </section>
    </main>
  );
}
