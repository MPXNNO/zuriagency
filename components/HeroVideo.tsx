"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Vidéo de fond de l'accueil.
 * Écran large : hero-desktop (trois plans verticaux côte à côte).
 * Écran étroit ou en hauteur : hero-mobile (un plan vertical à la fois).
 * La vidéo est muette, en boucle, et ne démarre pas si le visiteur a demandé moins d'animations.
 */
export function HeroBackdrop() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let current = "";
    let timer = 0;

    function pick() {
      if (!v) return;
      const portrait =
        window.innerWidth < 760 || window.innerWidth < window.innerHeight * 0.95;
      const name = portrait ? "hero-mobile" : "hero-desktop";
      if (name === current) return;
      current = name;
      v.poster = `/${name}.jpg`;
      v.src = `/${name}.mp4`;
      if (!reduce) v.play().catch(() => {});
    }
    function onResize() {
      window.clearTimeout(timer);
      timer = window.setTimeout(pick, 200);
    }

    pick();
    window.addEventListener("resize", onResize);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="hero-media">
      <video
        id="heroVideoEl"
        ref={ref}
        muted
        loop
        playsInline
        preload="metadata"
        poster="/hero-desktop.jpg"
        aria-label="Vidéo de présentation Zuri Agency, lecture automatique"
      />
    </div>
  );
}

export function HeroReelControl() {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const v = document.getElementById("heroVideoEl") as HTMLVideoElement | null;
    if (!v) return;
    const sync = () => setPaused(v.paused);
    sync();
    v.addEventListener("play", sync);
    v.addEventListener("pause", sync);
    return () => {
      v.removeEventListener("play", sync);
      v.removeEventListener("pause", sync);
    };
  }, []);

  return (
    <div className="reel">
      <span className="tag mono">
        <span className="live-dot" />
        Showreel Zuri
      </span>
      <button
        type="button"
        className="reel-btn"
        aria-label={paused ? "Lire la vidéo" : "Mettre la vidéo en pause"}
        onClick={() => {
          const v = document.getElementById(
            "heroVideoEl"
          ) as HTMLVideoElement | null;
          if (!v) return;
          if (v.paused) v.play().catch(() => {});
          else v.pause();
        }}
      >
        <svg viewBox="0 0 14 14" aria-hidden="true">
          {paused ? (
            <path d="M3 1l9 6-9 6z" />
          ) : (
            <>
              <rect x="2" y="1" width="3.5" height="12" />
              <rect x="8.5" y="1" width="3.5" height="12" />
            </>
          )}
        </svg>
      </button>
    </div>
  );
}
