"use client";

import { useEffect, useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactModal() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const openModal = () => {
    setOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setOpen(false);
    document.body.style.overflow = "";
    setTimeout(() => {
      setStatus("idle");
      setErrorMsg("");
    }, 200);
  };

  useEffect(() => {
    // expose un helper global pour que n'importe quel bouton du site
    // (nav, footer, CTA) puisse ouvrir cette unique instance de modale.
    // @ts-expect-error attach global helper
    window.openContact = openModal;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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

  return (
    <div
      className={`modal-overlay${open ? " open" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
      aria-hidden={!open}
    >
      <div className="modal-card" role="dialog" aria-modal="true">
        <div className="modal-topbar" />
        <button
          type="button"
          className="modal-close"
          onClick={closeModal}
          aria-label="Fermer"
        >
          ✕
        </button>
        <div className="modal-body">
          {status === "sent" ? (
            <div className="modal-sent">
              <div className="big">Message envoyé ✦</div>
              <p>
                On te répond sous 5 jours ouvrés. En attendant, va checker
                le roster.
              </p>
            </div>
          ) : (
            <>
              <div className="kicker">Parlons-en</div>
              <h2>Nous contacter</h2>
              <p className="modal-sub">
                Talent, marque, presse : dis-nous qui tu es, on revient vers
                toi vite.
              </p>

              {status === "error" && (
                <div className="modal-error">{errorMsg}</div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="field">
                  <label htmlFor="c-name">Nom</label>
                  <input
                    id="c-name"
                    name="name"
                    type="text"
                    placeholder="Ton nom"
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="c-email">Email</label>
                  <input
                    id="c-email"
                    name="email"
                    type="email"
                    placeholder="toi@exemple.com"
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="c-msg">Message</label>
                  <textarea
                    id="c-msg"
                    name="message"
                    placeholder="Talent, marque, presse... dis-nous en plus."
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="modal-submit"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Envoi..." : "Envoyer"}
                </button>
              </form>

              <div className="modal-alt">ou directement</div>
              <div className="modal-direct">
                <a href="mailto:contact@zuri.agency">
                  <span>Email</span>
                  <span>contact@zuri.agency →</span>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram <span>→</span>
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
