"use client";

// Formulaire « publication » : l'aperçu du post se construit pendant qu'on remplit.
// Utilisé en fin d'accueil et dans la fenêtre « Nous contacter » du pied de page.

import { useEffect, useRef, useState, type FormEvent } from "react";
import { confetti, EMAIL_RE, prefersReducedMotion, sendContact, track } from "@/lib/scope";

export const PROFILES = ["Une marque", "Un talent", "Un média", "Autre"] as const;

type Props = {
  /** suffixe des identifiants (deux formulaires peuvent cohabiter sur la page) */
  idSuffix?: string;
  /** profil présélectionné (ex. bouton « Vous êtes une marque ») */
  preset?: string;
  /** message prérempli (ex. la sélection de talents de la planche contact) */
  presetMessage?: string;
  /** change à chaque ouverture de la fenêtre pour remettre le formulaire à zéro */
  resetKey?: number;
  autoFocus?: boolean;
};

export default function PublishForm({ idSuffix = "", preset, presetMessage, resetKey, autoFocus }: Props) {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState<string>("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "fly" | "sent">("idle");
  const [bumpAv, setBumpAv] = useState(false);
  const [bumpTag, setBumpTag] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const postRef = useRef<HTMLDivElement>(null);
  const okRef = useRef<HTMLDivElement>(null);
  const firstRef = useRef<HTMLInputElement>(null);

  const initials = ((first[0] || "") + (last[0] || "")).toUpperCase() || "?";
  const full = `${first} ${last}`.trim();

  useEffect(() => {
    setBumpAv(true);
    const t = setTimeout(() => setBumpAv(false), 180);
    return () => clearTimeout(t);
  }, [initials]);

  useEffect(() => {
    if (preset) setProfile(preset);
    if (presetMessage) setMsg(presetMessage);
  }, [preset, presetMessage, resetKey]);

  useEffect(() => {
    if (resetKey === undefined) return;
    if (state === "sent") {
      setFirst("");
      setLast("");
      setEmail("");
      setMsg(presetMessage || "");
      setErr("");
      setState("idle");
      if (!preset) setProfile("");
    }
    if (autoFocus) {
      const t = setTimeout(() => firstRef.current?.focus({ preventScroll: true }), prefersReducedMotion() ? 0 : 750);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey]);

  function pick(p: string) {
    setProfile(p);
    setBumpTag(true);
    setTimeout(() => setBumpTag(false), 180);
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    let m = "";
    if (!first.trim()) m = "Indiquez votre prénom.";
    else if (!last.trim()) m = "Indiquez votre nom.";
    else if (!EMAIL_RE.test(email.trim())) m = "Cet email semble incomplet.";
    else if (!profile) m = "Dites-nous qui vous êtes.";
    else if (!msg.trim()) m = "Écrivez quelques mots sur votre projet.";
    setErr(m);
    if (m) return;
    setState("sending");
    const fail = await sendContact({
      type: "contact",
      firstName: first.trim(),
      lastName: last.trim(),
      email: email.trim(),
      profile,
      message: msg.trim(),
    });
    if (fail) {
      setErr(fail);
      setState("idle");
      return;
    }
    track("Message envoyé", { profil: profile, formulaire: "publication" });
    const reduce = prefersReducedMotion();
    setState("fly");
    const host = (rootRef.current?.closest(".closing, .sheet") as HTMLElement) || rootRef.current!;
    const post = postRef.current;
    if (post && host) {
      const r = post.getBoundingClientRect();
      const sr = host.getBoundingClientRect();
      confetti(host, r.left - sr.left + r.width / 2, r.top - sr.top + r.height / 2);
    }
    setTimeout(() => {
      setState("sent");
      requestAnimationFrame(() => {
        const ok = okRef.current;
        if (!ok) return;
        const rr = ok.getBoundingClientRect();
        if (rr.top < 0 || rr.bottom > innerHeight) ok.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
      });
    }, reduce ? 0 : 700);
  }

  const s = idSuffix;
  return (
    <div className="wrap grid" ref={rootRef}>
      <div className="preview">
        <div
          className={"post" + (state === "fly" ? " fly" : "")}
          ref={postRef}
          style={state === "sent" ? { display: "none" } : undefined}
          aria-hidden="true"
        >
          <div className="post-h">
            <span className="av" style={bumpAv ? { transform: "scale(1.15)" } : undefined}>
              {initials}
            </span>
            <div>
              <b className="pn">{full || "Prénom Nom"}</b>
              <small>pour zuri.agency_</small>
            </div>
          </div>
          <div className="post-img">
            <div className="t">Parlons de votre projet</div>
            <span className="tag" style={bumpTag ? { transform: "scale(1.15)" } : undefined}>
              {profile || "Vous êtes…"}
            </span>
          </div>
          <div className="post-f">
            <div className="icons">
              <svg viewBox="0 0 24 22" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M12 20.5S2 14.4 2 7.6A5.1 5.1 0 0 1 12 5.4a5.1 5.1 0 0 1 10 2.2C22 14.4 12 20.5 12 20.5z" />
              </svg>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M21 12a8.5 8.5 0 0 1-12.6 7.4L3 21l1.6-5.2A8.5 8.5 0 1 1 21 12z" />
              </svg>
            </div>
            <b className="pn2">{full ? full.toLowerCase().replace(/\s+/g, ".") : "vous"}</b>{" "}
            <span className={"cap" + (msg.trim() ? "" : " empty")}>{msg.trim() || "Parlez-nous de votre projet"}</span>
          </div>
        </div>
        <div className={"post-ok" + (state === "sent" ? " on" : "")} ref={okRef} aria-live="polite">
          {state === "sent" && (
            <>
              <div className="big">Message envoyé ✦</div>
              <p>Merci, on vous répond sous 48h. En attendant, allez jeter un œil au roster.</p>
            </>
          )}
        </div>
      </div>
      <form className="pform" noValidate onSubmit={submit}>
        <div>
          <div className="eyebrow">Contact</div>
          <h2 style={{ marginTop: 12 }}>Parlons de votre projet</h2>
          <p className="lead2">Une marque, un talent qui veut nous rejoindre, une question : l&apos;équipe répond sous 48h.</p>
        </div>
        <div className="row2">
          <div>
            <label className="lab" htmlFor={"p-first" + s}>
              Prénom
            </label>
            <input ref={firstRef} className="inp" id={"p-first" + s} placeholder="Votre prénom" autoComplete="given-name" value={first} onChange={(e) => setFirst(e.target.value)} />
          </div>
          <div>
            <label className="lab" htmlFor={"p-name" + s}>
              Nom
            </label>
            <input className="inp" id={"p-name" + s} placeholder="Votre nom" autoComplete="family-name" value={last} onChange={(e) => setLast(e.target.value)} />
          </div>
        </div>
        <div>
          <label className="lab" htmlFor={"p-mail" + s}>
            Email
          </label>
          <input className="inp" id={"p-mail" + s} type="email" inputMode="email" placeholder="vous@marque.com" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <span className="lab" id={"p-prof" + s}>
            Vous êtes
          </span>
          <div className="chips" role="radiogroup" aria-labelledby={"p-prof" + s}>
            {PROFILES.map((p) => (
              <button key={p} type="button" role="radio" aria-checked={profile === p} className={"chip" + (profile === p ? " on" : "")} onClick={() => pick(p)}>
                {p}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="lab" htmlFor={"p-msg" + s}>
            Message
          </label>
          <textarea className="inp" id={"p-msg" + s} placeholder="Parlez-nous de votre projet" value={msg} onChange={(e) => setMsg(e.target.value)} />
        </div>
        <div className="err" role="alert">
          {err}
        </div>
        <button className="send" type="submit" disabled={state !== "idle"}>
          {state === "sending" ? "Envoi…" : "Publier ↑"}
        </button>
      </form>
    </div>
  );
}
