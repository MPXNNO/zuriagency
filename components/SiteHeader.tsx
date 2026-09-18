"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { href: "/talents", label: "Talents" },
  { href: "/strategie-entreprise", label: "Stratégie d'entreprise" },
  { href: "/marketing-influence", label: "Marketing d'influence" },
  { href: "/management-sportif", label: "Management sportif" },
  { href: "/collaborations", label: "Nos collaborations" },
];

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
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <nav className={`nav${open ? " open" : ""}`} ref={navRef}>
      <div className="wrap nav-inner">
        <Link href="/" className="logo">
          ZURI<span className="dot">.</span>AGENCY
        </Link>
        <ul className="navlinks">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={pathname === l.href ? "page" : undefined}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="nav-right">
          <Link href="/contact" className="nav-cta">
            Nous contacter
          </Link>
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
              strokeWidth={2}
              strokeLinecap="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
