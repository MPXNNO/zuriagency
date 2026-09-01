"use client";

import { useEffect, useState } from "react";
import ContactButton from "@/components/ContactButton";
import { InstagramIcon, TikTokIcon } from "@/components/SocialIcons";

const INSTAGRAM_URL = "https://www.instagram.com/zuri.agency_/";
const TIKTOK_URL = "#";

const NAV_LINKS = [
  { href: "#talents", label: "Talents" },
  { href: "#services", label: "Services" },
  { href: "#manifeste", label: "Zuri" },
  { href: "#process", label: "Comment ça marche" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  // close the mobile menu whenever the viewport grows back to desktop size
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header>
      <nav>
        <div className="logo">
          ZURI<span>.</span>AGENCY
        </div>

        <div className="navlinks">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </div>

        <div className="header-actions">
          <div className="social-icons">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Zuri Agency sur Instagram"
            >
              <InstagramIcon />
            </a>
            <a
              href={TIKTOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Zuri Agency sur TikTok"
            >
              <TikTokIcon />
            </a>
          </div>
          <ContactButton className="btn btn-line">
            Nous contacter
          </ContactButton>
          <a href="#join" className="btn btn-fill">
            Rejoindre l&apos;agence
          </a>
        </div>

        <button
          type="button"
          className={`menu-toggle${open ? " open" : ""}`}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`mobile-menu${open ? " open" : ""}`}>
        <div className="mobile-menu-links">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </div>

        <div className="mobile-menu-actions">
          <ContactButton className="btn btn-line">
            Nous contacter
          </ContactButton>
          <a
            href="#join"
            className="btn btn-fill"
            onClick={() => setOpen(false)}
          >
            Rejoindre l&apos;agence
          </a>
        </div>

        <div className="social-icons mobile-menu-social">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Zuri Agency sur Instagram"
          >
            <InstagramIcon size={24} />
          </a>
          <a
            href={TIKTOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Zuri Agency sur TikTok"
          >
            <TikTokIcon size={24} />
          </a>
        </div>
      </div>
    </header>
  );
}
