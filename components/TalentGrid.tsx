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
  {
    num: "02",
    niche: "Lifestyle, humour & beauté",
    name: "Anaïs Monteiro",
    handle: "@anaismonteiro9",
    followers: "51 000 Instagram · 493 000 TikTok",
    bio: "Maman, drôle et sans filtre : Anaïs raconte son quotidien lifestyle et beauté avec un ton qui lui appartient, et une communauté qui la suit pour ça.",
    photo: "/talents/anais-02.jpg",
    modalPhoto: "/talents/anais-modal.jpg",
    link: "https://www.instagram.com/anaismonteiro9/",
  },
  {
    num: "03",
    niche: "Mode, beauté homme & style",
    name: "Clyde",
    handle: "@killa_us",
    followers: "86 600 Instagram · 18 300 TikTok",
    bio: "Silhouettes travaillées, accessoires forts et un œil affûté sur le style masculin : Clyde impose son allure entre mode, beauté homme et lifestyle.",
    photo: "/talents/clyde-03.jpg",
    modalPhoto: "/talents/clyde-modal.jpg",
    link: "https://www.instagram.com/killa_us/",
  },
  {
    num: "04",
    niche: "Lifestyle, voyage & surf",
    name: "Antoine",
    handle: "@lostantwan",
    followers: "20 400 Instagram · 52 000 TikTok",
    bio: "Entre deux vols et deux vagues, toujours un bon mot en poche : Antoine mêle voyage, surf, mode et lifestyle avec une bonne humeur qui donne envie de le suivre partout.",
    photo: "/talents/antoine-04.jpg",
    modalPhoto: "/talents/antoine-modal.jpg",
    link: "https://www.instagram.com/lostantwan/",
  },
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
        <button
          type="button"
          className="talent-card talent-card-more"
          onClick={() => {
            // @ts-expect-error global helper posé par ContactModal
            window.openContact?.("contact");
          }}
        >
          <div className="medal">+</div>
          <h3>Et plus</h3>
          <div className="niche mono">De nouveaux talents à venir</div>
          <div className="followers">Nous contacter →</div>
        </button>
        <a
          href="#join"
          className="talent-card"
          style={{ background: "var(--lime)", textDecoration: "none" }}
        >
          <div
            className="medal"
            style={{ background: "var(--ink)", color: "var(--lime)" }}
          >
            06
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
