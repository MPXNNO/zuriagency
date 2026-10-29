"use client";

// Page Talents : « la planche contact ». Une planche de casting en noir et blanc :
// au survol la photo reprend ses couleurs, au clic le talent est entouré au crayon rouge.
// La sélection peut être envoyée à l'agence en un clic.

import { useState } from "react";
import { TALENTS } from "@/lib/talents";

const CIRCLE = "M50 4 C82 2 98 22 96 50 C94 82 70 98 44 96 C14 94 2 72 4 46 C6 20 26 6 56 8";

export default function TalentsContactSheet() {
  const [picked, setPicked] = useState<string[]>([]);
  const toggle = (n: string) => setPicked((p) => (p.includes(n) ? p.filter((x) => x !== n) : [...p, n]));
  const msg = picked.length ? `Bonjour, nous aimerions en savoir plus sur : ${picked.join(", ")}.` : "";

  return (
    <section className="tc-sheet">
      <div className="wrap">
        <header className="tc-head">
          <div>
            <div className="eyebrow">Talents · Planche contact</div>
            <h1>Notre roster</h1>
          </div>
          <a href="/contact" className="more-t" data-open-contact="" data-who="Un talent">
            <span className="plus">+</span>Plus de talents ? Nous contacter
          </a>
        </header>
        <p className="tc-tip">Survolez un talent pour le voir en couleur, touchez-le pour l&apos;entourer.</p>

        <div className="tc-strip">
          {TALENTS.map((t, i) => {
            const on = picked.includes(t.name);
            return (
              <div className={"tc-fr" + (on ? " pick" : "")} key={t.name}>
                <button type="button" className="tc-shot" aria-pressed={on} aria-label={`${on ? "Retirer" : "Entourer"} ${t.name}`} onClick={() => toggle(t.name)}>
                  <span className="tc-ph">
                  <span className="tc-im">
                    <img
                      src={`${t.photo}-480.webp`}
                      srcSet={`${t.photo}-300.webp 300w, ${t.photo}-480.webp 480w`}
                      sizes="(max-width: 640px) 46vw, 23vw"
                      alt={`${t.name}, talent Zuri Agency (${t.universes.join(", ")})`}
                      width={480}
                      height={640}
                      loading={i < 4 ? "eager" : "lazy"}
                      decoding="async"
                    />
                  </span>
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                    <path d={CIRCLE} pathLength={100} />
                  </svg>
                  </span>
                  <small>
                    <span>ZURI {String(i + 1).padStart(2, "0")}A</span>
                    <span>▶ {12 + i * 3}</span>
                  </small>
                  <b>{t.name}</b>
                  <span className="tc-u">{t.universes.join(" · ")}</span>
                </button>
                <div className="tc-soc">
                  {t.instagram && (
                    <a href={t.instagram} target="_blank" rel="noopener" aria-label={`${t.name} sur Instagram`}>
                      Instagram
                    </a>
                  )}
                  {t.tiktok && (
                    <a href={t.tiktok} target="_blank" rel="noopener" aria-label={`${t.name} sur TikTok`}>
                      TikTok
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className={"tc-sel" + (picked.length ? " on" : "")} aria-live="polite">
          <span>Sélection :</span>
          <span className="n">{picked.length ? picked.join(", ") : "aucun talent entouré"}</span>
          {picked.length > 0 && (
            <a href="/contact" className="tc-go" data-open-contact="" data-who="Une marque" data-msg={msg}>
              Parler de cette sélection →
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
