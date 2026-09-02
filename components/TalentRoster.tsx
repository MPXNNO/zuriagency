"use client";

import { useState } from "react";

type Slot = {
  num: string;
  niche: string;
  desc: string;
  tags: string[];
};

const TALENT_SLOTS: Slot[] = [
  {
    num: "01",
    niche: "Mode & lifestyle",
    desc: "Style au quotidien, essayages, dressing, coulisses shooting.",
    tags: ["Outfit du jour", "Dressing tour", "Backstage shooting"],
  },
  {
    num: "02",
    niche: "Football & culture",
    desc: "Terrain, culture foot, analyses, vie de vestiaire.",
    tags: ["Match day", "Analyse tactique", "Culture ballon rond"],
  },
  {
    num: "03",
    niche: "Beauté & bien-être",
    desc: "Routines, soins, rituels bien-être au quotidien.",
    tags: ["Routine du soir", "Skincare", "Rituel bien-être"],
  },
  {
    num: "04",
    niche: "Tech & gaming",
    desc: "Tests produits, setups, sessions gaming en direct.",
    tags: ["Unboxing", "Setup tour", "Session live"],
  },
  {
    num: "05",
    niche: "Cuisine & terroir",
    desc: "Recettes, produits locaux, tables partagées.",
    tags: ["Recette minute", "Marché & terroir", "Table partagée"],
  },
  {
    num: "06",
    niche: "Humour & sketchs",
    desc: "Formats courts, sketchs, second degré assumé.",
    tags: ["Sketch du jour", "Impro", "Behind the scenes"],
  },
  {
    num: "07",
    niche: "Entrepreneuriat",
    desc: "Business, coulisses, retours d'expérience concrets.",
    tags: ["Coulisses business", "Retour d'expérience", "Growth notes"],
  },
];

const SLIDE_COLORS = [
  { bg: "var(--orange)", fg: "var(--ink)" },
  { bg: "var(--blue)", fg: "#fff" },
  { bg: "var(--pink)", fg: "var(--ink)" },
  { bg: "var(--lime)", fg: "var(--ink)" },
];
const PATTERNS = ["dots", "grid", "diag"];

export default function TalentRoster() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [slide, setSlide] = useState(0);

  const active = openIdx !== null ? TALENT_SLOTS[openIdx] : null;
  const colors = openIdx !== null ? SLIDE_COLORS[openIdx % 4] : SLIDE_COLORS[0];

  function openSlot(i: number) {
    setOpenIdx(i);
    setSlide(0);
    document.body.style.overflow = "hidden";
  }

  function close() {
    setOpenIdx(null);
    document.body.style.overflow = "";
  }

  function prevSlide() {
    if (!active) return;
    setSlide((s) => (s - 1 + active.tags.length) % active.tags.length);
  }

  function nextSlide() {
    if (!active) return;
    setSlide((s) => (s + 1) % active.tags.length);
  }

  return (
    <>
      <div className="talent-grid">
        {TALENT_SLOTS.map((slot, i) => (
          <button
            type="button"
            className="talent-card talent-card-btn"
            key={slot.num}
            onClick={() => openSlot(i)}
          >
            <div className="medal">{slot.num}</div>
            <h3>Présentation du talent bientôt</h3>
            <div className="niche mono">{slot.niche}</div>
            <div className="followers">Voir l&apos;univers →</div>
          </button>
        ))}
        <a
          href="#join"
          className="talent-card"
          style={{ background: "var(--lime)", textDecoration: "none" }}
        >
          <div
            className="medal"
            style={{ background: "var(--ink)", color: "var(--lime)" }}
          >
            08
          </div>
          <h3>Toi, peut-être ?</h3>
          <div className="niche mono">Candidate ici</div>
          <div className="followers">On répond sous 5 jours</div>
        </a>
      </div>

      <div
        className={`modal-overlay${active ? " open" : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        aria-hidden={!active}
      >
        {active && (
          <div className="modal-card preview-card" role="dialog" aria-modal="true">
            <div className="modal-topbar" />
            <button
              type="button"
              className="modal-close"
              onClick={close}
              aria-label="Fermer"
            >
              ✕
            </button>
            <div className="modal-body">
              <div className="kicker">{active.niche}</div>
              <h2>Cette place attend son nom</h2>
              <p className="modal-sub">{active.desc}</p>

              <div
                className={`preview-slide pattern-${PATTERNS[slide % PATTERNS.length]}`}
                style={{ backgroundColor: colors.bg, color: colors.fg }}
              >
                <span className="preview-slide-tag mono">
                  {active.tags[slide]}
                </span>
                <span className="preview-slide-note">Univers à venir</span>
              </div>

              <div className="preview-nav">
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Aperçu précédent"
                >
                  ←
                </button>
                <div className="preview-dots">
                  {active.tags.map((_, di) => (
                    <span
                      key={di}
                      className={`preview-dot${di === slide ? " on" : ""}`}
                      onClick={() => setSlide(di)}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Aperçu suivant"
                >
                  →
                </button>
              </div>

              <a href="#join" className="btn btn-fill preview-cta" onClick={close}>
                Candidater pour cette place →
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
