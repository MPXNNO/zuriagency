"use client";

// Tout ce qui est commun aux pages : en-tête, menu « notifications », pied de page,
// fenêtre « Nous contacter » et bouton du son. Il reste en place quand on change de page,
// ce qui permet à la musique de continuer sans coupure.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import PublishForm from "./PublishForm";
import { sound } from "@/lib/sound";
import { NAV, SOLID_HEADER, site, INSTAGRAM } from "@/lib/site";
import { prefersReducedMotion } from "@/lib/scope";

const LEFT = NAV.slice(0, 3);
const RIGHT = NAV.slice(3, 5);

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const isHome = pathname === "/";
  const [menu, setMenu] = useState(false);
  const [sheet, setSheet] = useState<{ open: boolean; preset?: string; key: number }>({ open: false, key: 0 });
  const [sheetMounted, setSheetMounted] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [soundHidden, setSoundHidden] = useState(isHome);
  const sheetRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  // chaque arrivée sur une autre page que l'accueil compte comme « déjà entré »
  useEffect(() => {
    if (!isHome) site.entered = true;
    setMenu(false);
  }, [pathname, isHome]);

  // menu : la classe est posée sur <body> (le fond et l'en-tête en dépendent)
  useEffect(() => {
    document.body.classList.toggle("menu-open", menu);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);

  // son : état du bouton, reprise au premier geste, position sauvegardée
  useEffect(() => sound.subscribe(setSoundOn), []);
  useEffect(() => {
    const kick = (e: Event) => {
      const t = e.target as HTMLElement;
      if (site.gateOpen || t?.closest?.(".zs, #sound")) return;
      if (!sound.mutedByUser() && !sound.playing()) sound.on(1.2);
    };
    const save = () => sound.savePosition();
    ["pointerdown", "keydown"].forEach((t) => window.addEventListener(t, kick, true));
    window.addEventListener("pagehide", save);
    const iv = window.setInterval(save, 2000);
    return () => {
      ["pointerdown", "keydown"].forEach((t) => window.removeEventListener(t, kick, true));
      window.removeEventListener("pagehide", save);
      window.clearInterval(iv);
    };
  }, []);

  // sur l'accueil, la vidéo a déjà son bouton : le bouton flottant prend le relais une fois la vidéo passée
  useEffect(() => {
    if (!isHome) {
      setSoundHidden(false);
      return;
    }
    const upd = () => setSoundHidden(window.scrollY < window.innerHeight * 0.6);
    upd();
    window.addEventListener("scroll", upd, { passive: true });
    return () => window.removeEventListener("scroll", upd);
  }, [isHome]);

  // fenêtre « Nous contacter » : s'ouvre en cercle depuis le bouton cliqué
  const openSheet = useCallback((from: HTMLElement, preset?: string) => {
    lastFocus.current = from;
    const r = from.getBoundingClientRect();
    const el = sheetRef.current;
    setSheetMounted(true);
    requestAnimationFrame(() => {
      const s = sheetRef.current || el;
      if (!s) return;
      s.style.setProperty("--ox", Math.min(innerWidth, Math.max(0, r.left + r.width / 2)) + "px");
      s.style.setProperty("--oy", Math.min(innerHeight, Math.max(0, r.top + r.height / 2)) + "px");
      s.hidden = false;
      void s.offsetWidth;
      setSheet((p) => ({ open: true, preset, key: p.key + 1 }));
      document.body.classList.add("locked");
    });
  }, []);

  const closeSheet = useCallback(() => {
    setSheet((p) => ({ ...p, open: false }));
    document.body.classList.remove("locked");
    window.setTimeout(() => {
      if (sheetRef.current) sheetRef.current.hidden = true;
    }, prefersReducedMotion() ? 0 : 700);
    lastFocus.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.("[data-open-contact]") as HTMLElement | null;
      if (!a) return;
      e.preventDefault();
      setMenu(false);
      openSheet(a, a.dataset.who);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && sheetRef.current && !sheetRef.current.hidden) closeSheet();
    };
    document.addEventListener("click", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [openSheet, closeSheet]);

  const solid = SOLID_HEADER.some((p) => pathname.startsWith(p));

  return (
    <>
      <header className={"nav" + (solid ? " solid" : "")} id="nav">
        <div className="wrap nav-inner">
          <ul className="left">
            {LEFT.map((l) => (
              <li key={l.href}>
                <Link href={l.href} aria-current={pathname === l.href ? "page" : undefined}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/" className="logo" aria-label="Zuri Agency, accueil">
            ZURI<span className="dot">.</span>AGENCY
          </Link>
          <ul className="right">
            {RIGHT.map((l) => (
              <li key={l.href}>
                <Link href={l.href} aria-current={pathname === l.href ? "page" : undefined}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="nav-cta" aria-current={pathname === "/contact" ? "page" : undefined}>
                Nous contacter
              </Link>
            </li>
          </ul>
          <button
            className="burger"
            id="burger"
            type="button"
            aria-label={menu ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menu}
            aria-controls="drawer"
            onClick={() => setMenu((m) => !m)}
          >
            <span className="bell">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4z" />
                <path d="M10 20a2 2 0 0 0 4 0" />
              </svg>
            </span>
            <span className="bx">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </span>
            <span className="nbadge">6</span>
          </button>
        </div>
      </header>

      <div
        className="drawer"
        id="drawer"
        aria-hidden={!menu}
        onClick={(e) => {
          const t = e.target as HTMLElement;
          if (t === e.currentTarget || t.tagName === "UL" || t.classList.contains("tip")) setMenu(false);
        }}
      >
        <ul>
          {NAV.map((l, i) => (
            <li key={l.href}>
              <Link className="nt" href={l.href} tabIndex={menu ? 0 : -1} style={{ transitionDelay: `${(0.1 + i * 0.08).toFixed(2)}s` }} onClick={() => setMenu(false)}>
                <span className="i">
                  Z<span className="dot">.</span>A
                </span>
                <div>
                  <div className="t">
                    {l.label}
                    <small>maintenant</small>
                  </div>
                  <p>{l.line}</p>
                </div>
              </Link>
            </li>
          ))}
          <li>
            <Link className="nt cta" href="/contact" tabIndex={menu ? 0 : -1} style={{ transitionDelay: "0.58s" }} onClick={() => setMenu(false)}>
              <span className="i">
                Z<span className="dot">.</span>A
              </span>
              <div>
                <div className="t">
                  Nous contacter<small>maintenant</small>
                </div>
                <p>Parlons de votre projet</p>
              </div>
            </Link>
          </li>
        </ul>
        <div className="tip">Touche une notification</div>
      </div>

      {children}

      <footer>
        <div className="wrap foot-row">
          <span className="foot-brand">
            Zuri<span className="dot">.</span>Agency
          </span>
          <Link href="/fondateur" className="foot-pin" title="Message épinglé">
            <span className="fp-ic" aria-hidden="true">
              📌
            </span>
            Le mot du fondateur
          </Link>
          <a href="/contact" className="foot-contact" id="footContact" data-open-contact="">
            <span className="fbadge">1</span>Nous contacter
          </a>
          {!isHome && <Link href="/">Retour à l&apos;accueil</Link>}
        </div>
        <div className="wrap legal">
          <span>© {new Date().getFullYear()} by Zuri.Agency</span>
          <div>
            <a href={INSTAGRAM} target="_blank" rel="noopener">
              Instagram
            </a>
            <Link href="/mentions-legales">Mentions légales</Link>
            <Link href="/confidentialite">Politique de confidentialité</Link>
          </div>
        </div>
      </footer>

      <div
        className={"sheet" + (sheet.open ? " on" : "")}
        id="sheet"
        role="dialog"
        aria-modal="true"
        aria-label="Formulaire de contact"
        hidden
        ref={sheetRef}
      >
        <button className="sheet-x" type="button" aria-label="Fermer le formulaire" onClick={closeSheet}>
          ✕
        </button>
        <div className="sheet-body wrap">
          {sheetMounted && <PublishForm idSuffix="-o" preset={sheet.preset} resetKey={sheet.key} autoFocus />}
        </div>
      </div>

      <button
        type="button"
        className={"zs" + (soundOn ? " on" : "") + (soundHidden ? " hid" : "")}
        aria-label={soundOn ? "Couper le son" : "Activer le son"}
        onClick={(e) => {
          e.stopPropagation();
          sound.toggle();
        }}
      >
        <span className="eq">
          <i />
          <i />
          <i />
          <i />
        </span>
      </button>
    </>
  );
}
