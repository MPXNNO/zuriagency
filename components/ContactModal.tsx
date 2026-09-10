"use client";

import { useEffect, useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";
type Mode = "contact" | "candidature";

export default function ContactModal() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("contact");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const openModal = (requestedMode?: Mode) => {
    setMode(requestedMode === "candidature" ? "candidature" : "contact");
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
    // (nav, footer, CTA) puisse ouvrir cette unique instance de modale,
    // en précisant éventuellement le mode ("candidature" ou "contact").
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
      type: mode,
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

  const isCandidature = mode === "candidature";

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
              <div className="big">
                {isCandidature ? "Candidature envoyée ✦" : "Message envoyé ✦"}
              </div>
              <p>
                {isCandidature
                  ? "On l'épluche avec attention et on revient vers toi sous 5 jours ouvrés. Croise les doigts."
                  : "On te répond sous 5 jours ouvrés. En attendant, va checker le roster."}
              </p>
            </div>
          ) : (
            <>
              <div className="kicker">
                {isCandidature ? "Ta candidature" : "Parlons-en"}
              </div>
              <h2>
                {isCandidature
                  ? "Convaincs-nous en 3 lignes"
                  : "Nous contacter"}
              </h2>
              <p className="modal-sub">
                {isCandidature
                  ? "Ton pseudo, tes chiffres, ton univers. Sois toi-même, c'est exactement ce qu'on cherche."
                  : "Talent, marque, presse : dis-nous qui tu es, on revient vers toi vite."}
              </p>

              {status === "error" && (
                <div className="modal-error">{errorMsg}</div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="field">
                  <label htmlFor="c-name">
                    {isCandidature ? "Nom ou pseudo" : "Nom"}
                  </label>
                  <input
                    id="c-name"
                    name="name"
                    type="text"
                    placeholder={
                      isCandidature ? "Ton pseudo Insta/TikTok" : "Ton nom"
                    }
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
                  <label htmlFor="c-msg">
                    {isCandidature ? "Ta candidature" : "Message"}
                  </label>
                  <textarea
                    id="c-msg"
                    name="message"
                    placeholder={
                      isCandidature
                        ? "Je fais du contenu [ta niche], j'ai [tes chiffres], et je pense avoir ma place dans le roster parce que..."
                        : "Talent, marque, presse... dis-nous en plus."
                    }
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="modal-submit"
                  disabled={status === "sending"}
                >
                  {status === "sending"
                    ? "Envoi..."
                    : isCandidature
                      ? "Envoyer ma candidature"
                      : "Envoyer"}
                </button>
              </form>

              <div className="modal-alt">ou directement</div>
              <div className="modal-direct">
                <a href="mailto:contact@zuriagency.fr">
                  <span>Email</span>
                  <span>contact@zuriagency.fr →</span>
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
