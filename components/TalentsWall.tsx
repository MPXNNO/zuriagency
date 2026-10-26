"use client";

// Page Talents : « le mur infini ». Six colonnes de photos qui défilent sans fin,
// le mur s'arrête au survol, un clic ouvre la fiche du talent.

import { useEffect, useRef, useState } from "react";
import { TALENTS } from "@/lib/talents";

const COLS = 6;

export default function TalentsWall() {
  const [paused, setPaused] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const lastBtn = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open === null) return;
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function close() {
    setOpen(null);
    setPaused(false);
    lastBtn.current?.focus({ preventScroll: true });
  }

  const columns = Array.from({ length: COLS }, (_, c) => TALENTS.map((_, i) => (i * 3 + c * 5) % TALENTS.length));
  const t = open !== null ? TALENTS[open] : null;

  const tile = (i: number, k: number, c: number, copy: boolean) => {
    const tal = TALENTS[i];
    return (
      <button
        key={(copy ? "b" : "a") + k}
        className="wt"
        type="button"
        tabIndex={copy ? -1 : undefined}
        aria-hidden={copy ? true : undefined}
        aria-label={copy ? undefined : `${tal.name}, voir la fiche du talent`}
        onClick={(e) => {
          lastBtn.current = e.currentTarget;
          setOpen(i);
          setPaused(true);
        }}
      >
        <img
          src={`${tal.photo}-480.webp`}
          srcSet={`${tal.photo}-300.webp 300w, ${tal.photo}-480.webp 480w`}
          sizes="(max-width: 560px) 33vw, (max-width: 900px) 25vw, 17vw"
          alt={copy ? "" : `${tal.name}, talent Zuri Agency (${tal.universes.join(", ")})`}
          width={480}
          height={600}
          loading={!copy && k < 2 && c < 4 ? "eager" : "lazy"}
          fetchPriority={!copy && k === 0 && c < 3 ? "high" : undefined}
          decoding="async"
          draggable={false}
        />
        <span className="ov">
          <b>{tal.name}</b>
          <small>{tal.universes.join(" · ")}</small>
        </span>
      </button>
    );
  };

  return (
    <>
      <section
        className={"twall" + (paused ? " paused" : "")}
        aria-label="Notre roster"
        onMouseOver={(e) => (e.target as HTMLElement).closest(".wt") && setPaused(true)}
        onMouseOut={(e) => {
          const rel = e.relatedTarget as HTMLElement | null;
          if (open === null && !rel?.closest?.(".wt")) setPaused(false);
        }}
      >
        <div className="wall">
          {columns.map((order, c) => (
            <div className="wcol" key={c}>
              <div className="wtrack" style={{ ["--sp" as string]: `${46 + c * 8}s` }}>
                {order.map((i, k) => tile(i, k, c, false))}
                {order.map((i, k) => tile(i, k, c, true))}
              </div>
            </div>
          ))}
        </div>
        <div className="twall-card">
          <div className="eyebrow">Talents</div>
          <h1>Notre roster</h1>
          <p>Un roster resserré : chaque talent profite de la même attention, à chaque étape de la collaboration.</p>
          <a href="/contact" className="more-t" data-open-contact="" data-who="Un talent">
            <span className="plus">+</span>Plus de talents ? Nous contacter
          </a>
        </div>
        <div className="twall-hint">Survole un talent · clique pour sa fiche</div>
      </section>

      <div
        className={"pm" + (t ? " on" : "")}
        role="dialog"
        aria-modal="true"
        aria-label={t ? `Fiche talent : ${t.name}` : "Fiche talent"}
        aria-hidden={!t}
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        <div className="pm-card">
          <button className="pm-x" type="button" aria-label="Fermer la fiche" onClick={close} ref={closeRef}>
            ✕
          </button>
          <div className="ph">
            {t && <img src={`${t.photo}-900.webp`} alt={`${t.name}, talent Zuri Agency`} width={900} height={1125} />}
            <div className="nm">
              <small>Talent Zuri</small>
              <b>{t?.name}</b>
            </div>
          </div>
          <div className="bd">
            <div className="pm-tags">{t?.universes.map((u) => <span key={u}>{u}</span>)}</div>
            <div className="pm-soc">
              {t?.instagram && (
                <a href={t.instagram} target="_blank" rel="noopener">
                  Instagram
                </a>
              )}
              {t?.tiktok && (
                <a href={t.tiktok} target="_blank" rel="noopener">
                  TikTok
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
