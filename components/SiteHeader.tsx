"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const LEFT_LINKS = [
  { href: "/talents", label: "Talents" },
  { href: "/strategie-entreprise", label: "Stratégie d'entreprise" },
  { href: "/marketing-influence", label: "Marketing d'influence" },
];

const RIGHT_LINKS = [
  { href: "/management-sportif", label: "Management sportif" },
  { href: "/collaborations", label: "Nos collaborations" },
];

const CONTACT = { href: "/contact", label: "Nous contacter" };

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const current = (href: string) => (pathname === href ? "page" : undefined);

  return (
    <nav
      className={`nav${open ? " open" : ""}`}
      ref={navRef}
      aria-label="Navigation principale"
    >
      <div className="wrap nav-inner">
        <ul className="navlinks left">
          {LEFT_LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={current(l.href)}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/" className="logo">
          ZURI<span className="dot">.</span>AGENCY
        </Link>

        <ul className="navlinks right">
          {RIGHT_LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={current(l.href)}>
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href={CONTACT.href}
              className="nav-cta"
              aria-current={current(CONTACT.href)}
            >
              {CONTACT.label}
            </Link>
          </li>
        </ul>

        <button
          type="button"
          className="navtoggle"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
          >
            {open ? (
              <>
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </>
            ) : (
              <>
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* menu déroulant, visible uniquement sur les écrans étroits */}
      <div className="nav-drawer">
        <ul>
          {[...LEFT_LINKS, ...RIGHT_LINKS].map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={current(l.href)}>
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href={CONTACT.href} className="nav-cta">
              {CONTACT.label}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
