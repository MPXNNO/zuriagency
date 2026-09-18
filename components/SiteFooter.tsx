import Link from "next/link";

type FooterLink = { href: string; label: string };

export default function SiteFooter({
  links = [
    { href: "/fondateur", label: "Le mot du fondateur" },
    { href: "/", label: "Retour à l'accueil" },
  ],
}: {
  links?: FooterLink[];
}) {
  return (
    <footer>
      <div className="wrap foot-row">
        <span>Zuri Agency</span>
        {links.map((l) => (
          <Link key={l.href} href={l.href}>
            {l.label}
          </Link>
        ))}
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
