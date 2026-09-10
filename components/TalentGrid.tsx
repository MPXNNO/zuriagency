"use client";

import { useEffect, useState } from "react";

type TalentSlot = {
  num: string;
  niche: string;
  name?: string;
  handle?: string;
  followers?: string;
  bio?: string;
  photo?: string;
  modalPhoto?: string;
  link?: string;
};

const TALENT_SLOTS: TalentSlot[] = [
  {
    num: "01",
    niche: "Gym & lifestyle",
    name: "Mejane",
    handle: "@Mmandrin",
    followers: "9 385 Instagram · 40 600 TikTok",
    bio: "Passion musculation depuis 4 ans, énergie solaire et contenu quotidien : Mejane transforme sa discipline en résultats pour les marques qui la rejoignent.",
    photo: "/talents/mejane-01.jpg",
    modalPhoto: "/talents/mejane-modal.jpg",
    link: "https://www.instagram.com/mmandrin/",
  },
  { num: "02", niche: "Mode & lifestyle" },
  { num: "03", niche: "Football & culture" },
  { num: "04", niche: "Tech & gaming" },
  { num: "05", niche: "Cuisine & terroir" },
  { num: "06", niche: "Humour & sketchs" },
  { num: "07", niche: "Entrepreneuriat" },
];

export default function TalentGrid() {
  const [active, setActive] = useState<TalentSlot | null>(null);

  const close = () => setActive(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <>
      <div className="talent-grid">
        {TALENT_SLOTS.map((slot) =>
          slot.name ? (
            <button
              type="button"
              className="talent-card talent-card-filled"
              key={slot.num}
              onClick={() => setActive(slot)}
            >
              <img
                src={slot.photo}
                alt={slot.name}
                className="cover-photo"
              />
              <div className="talent-card-top">
                <div className="medal">{slot.num}</div>
                <div className="signed-tag mono">Talent Zuri</div>
              </div>
              <div className="cover-overlay">
                <h3>
                  {slot.name}
                  <span className="handle mono"> {slot.handle}</span>
                </h3>
                <div className="tap-hint mono">Voir le profil →</div>
              </div>
            </button>
          ) : (
            <div className="talent-card" key={slot.num}>
              <div className="medal">{slot.num}</div>
              <h3>Place libre</h3>
              <div className="niche mono">{slot.niche}</div>
              <div className="followers">En attente d&apos;un nom</div>
            </div>
          )
        )}
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
          <div
            className="modal-card talent-modal-card"
            role="dialog"
            aria-modal="true"
          >
            <img
              src={active.modalPhoto ?? active.photo}
              alt={active.name}
              className="talent-modal-photo"
            />
            <button
              type="button"
              className="modal-close"
              onClick={close}
              aria-label="Fermer"
            >
              ✕
            </button>
            <div className="modal-body">
              <div className="talent-card-top" style={{ marginBottom: 16 }}>
                <div className="medal">{active.num}</div>
                <div className="signed-tag mono">Talent Zuri</div>
              </div>
              <h2>
                {active.name}
                <span
                  className="handle mono"
                  style={{ display: "block", fontSize: 13, marginTop: 6 }}
                >
                  {active.handle}
                </span>
              </h2>
              <div className="niche mono" style={{ margin: "12px 0" }}>
                {active.niche}
              </div>
              <p className="modal-sub">{active.bio}</p>
              <div
                className="followers"
                style={{ fontSize: 14, fontWeight: 700, marginBottom: 22 }}
              >
                {active.followers}
              </div>
              <div className="modal-direct">
                <a href={active.link} target="_blank" rel="noopener noreferrer">
                  <span>Voir sur Instagram</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
