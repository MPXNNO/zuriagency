"use client";

import { useState } from "react";

type Field = {
  id: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "select";
  placeholder?: string;
  required?: boolean;
  options?: string[];
  rows?: number;
};

type Status = "idle" | "sending" | "sent" | "error";

export default function RdvModal({
  ctaHeading,
  ctaText,
  modalTitle,
  modalSub,
  fields,
}: {
  ctaHeading: string;
  ctaText: string;
  modalTitle: string;
  modalSub: string;
  fields: Field[];
}) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function close() {
    setOpen(false);
    setTimeout(() => {
      setStatus("idle");
      setErrorMsg("");
    }, 200);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = fields
      .filter((f) => f.id !== "name" && f.id !== "email")
      .map((f) => `${f.label} : ${data.get(f.id) || "-"}`)
      .join("\n");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, type: "rdv" }),
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
    <>
      <section className="rdv-cta">
        <div className="wrap rdv-cta-inner">
          <div className="rdv-cta-text">
            <div className="eyebrow">Rendez-vous offert</div>
            <h2>{ctaHeading}</h2>
            <p>{ctaText}</p>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setOpen(true)}
          >
            Prendre un rendez-vous de 30 min offert →
          </button>
        </div>
      </section>

      <div
        className="modal-overlay"
        hidden={!open}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div
          className="modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="rdv-title"
        >
          <button
            type="button"
            className="modal-close"
            onClick={close}
            aria-label="Fermer"
          >
            ×
          </button>

          {status === "sent" ? (
            <>
              <div className="eyebrow">Rendez-vous offert · 30 min</div>
              <h3 id="rdv-title">Demande envoyée ✦</h3>
              <p className="modal-sub">
                Merci ! Notre équipe revient vers vous sous 48h pour fixer un
                créneau.
              </p>
            </>
          ) : (
            <>
              <div className="eyebrow">Rendez-vous offert · 30 min</div>
              <h3 id="rdv-title">{modalTitle}</h3>
              <p className="modal-sub">{modalSub}</p>

              {status === "error" && (
                <div className="modal-error">{errorMsg}</div>
              )}

              <form className="form modal-form" onSubmit={handleSubmit}>
                {fields.map((f) => (
                  <div className="field" key={f.id}>
                    <label htmlFor={`rdv-${f.id}`}>{f.label}</label>
                    {f.type === "textarea" ? (
                      <textarea
                        id={`rdv-${f.id}`}
                        name={f.id}
                        rows={f.rows ?? 3}
                        placeholder={f.placeholder}
                        required={f.required}
                      />
                    ) : f.type === "select" ? (
                      <select
                        id={`rdv-${f.id}`}
                        name={f.id}
                        required={f.required}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Sélectionner
                        </option>
                        {f.options?.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        id={`rdv-${f.id}`}
                        name={f.id}
                        type={f.type}
                        placeholder={f.placeholder}
                        required={f.required}
                      />
                    )}
                  </div>
                ))}
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Envoi..." : "Envoyer ma demande →"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
