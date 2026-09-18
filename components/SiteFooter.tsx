import Link from "next/link";

type FooterLink = { href: string; label: string; highlight?: boolean };

export default function SiteFooter({
  links = [
    { href: "/fondateur", label: "Le mot du fondateur", highlight: true },
    { href: "/", label: "Retour à l'accueil" },
  ],
}: {
  links?: FooterLink[];
}) {
  return (
    <footer>
      <div className="wrap foot-row">
        <span>Zuri Agency</span>
        {links.map((l) =>
          l.highlight ? (
            <Link key={l.href} href={l.href} className="foot-fondateur">
              <span className="pulse-dot" />
              {l.label}
            </Link>
          ) : (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          )
        )}
      </div>
      <div className="wrap legal-bar">
        <span>© 2026 by Zuri.Agency</span>
        <div className="legal-links">
          <Link href="/mentions-legales">Mentions légales</Link>
          <Link href="/confidentialite">Politique de confidentialité</Link>
        </div>
      </div>
    </footer>
  );
}
