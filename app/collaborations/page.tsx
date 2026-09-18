import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Nos collaborations",
  description: "Cette page est en cours de construction.",
};

export default function CollaborationsPage() {
  return (
    <>
      <SiteHeader />

      <PageHeader eyebrow="Nos collaborations" title="Ça brille déjà. On finit d'astiquer.">
        Cette page est en cours de construction : le temps qu&apos;on finisse
        de compter nos collaborations sur les doigts. On va bientôt devoir
        enlever nos chaussettes.
      </PageHeader>

      <section className="block">
        <div className="wrap">
          <div className="construction-card">
            <svg
              className="sun-badge"
              viewBox="0 0 24 24"
              fill="none"
              style={{ color: "var(--orange)" }}
            >
              <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth={2} />
              <circle cx="12" cy="12" r="3.5" fill="currentColor" />
            </svg>
            <div className="construction-tag mono">Page en construction</div>
            <h2>Les collaborations arrivent bientôt</h2>
            <p>
              Nos talents tournent, nos marques signent, et cette page prend
              juste un peu plus de temps à se maquiller avant de sortir.
              Reviens vite, ou <a href="/contact">contacte-nous</a> si tu ne
              tiens plus en place.
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
