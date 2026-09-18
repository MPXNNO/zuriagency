"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const profil = String(data.get("profil") ?? "");
    const rawMessage = String(data.get("message") ?? "");
    const message = `Vous êtes : ${profil}\n\n${rawMessage}`;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, type: "contact" }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Erreur lors de l'envoi.");
      }

      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Une erreur est survenue."
      );
    }
  }

  if (status === "sent") {
    return (
      <div className="form form-sent">
        <div className="big">Message envoyé ✦</div>
        <p>
          Merci, on vous répond sous 5 jours ouvrés. En attendant, allez jeter
          un œil au roster.
        </p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      {status === "error" && <div className="form-error">{errorMsg}</div>}
      <div className="field">
        <label htmlFor="c-name">Nom</label>
        <input id="c-name" name="name" type="text" placeholder="Votre nom" required />
      </div>
      <div className="field">
        <label htmlFor="c-email">Email</label>
        <input
          id="c-email"
          name="email"
          type="email"
          placeholder="vous@marque.com"
          required
        />
      </div>
      <div className="field">
        <label htmlFor="c-profil">Vous êtes</label>
        <select id="c-profil" name="profil" defaultValue="Une marque">
          <option>Une marque</option>
          <option>Un talent</option>
          <option>Autre</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="c-message">Message</label>
        <textarea
          id="c-message"
          name="message"
          rows={4}
          placeholder="Parlez-nous de votre projet"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
        {status === "sending" ? "Envoi..." : "Envoyer →"}
      </button>
    </form>
  );
}
