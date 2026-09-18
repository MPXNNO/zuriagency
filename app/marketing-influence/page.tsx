import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Marketing d'influence",
  description:
    "Zuri Agency représente et accompagne des talents et construit pour eux des opportunités avec les marques.",
};

const INTERVENTIONS = [
  "La représentation et le management des talents",
  "La recherche de collaborations et de campagnes",
  "La mise en relation avec les marques et agences",
  "La négociation des collaborations",
  "Le développement de l'image et du positionnement des talents",
  "La stratégie de contenu et de visibilité",
  "L'accompagnement dans les relations avec les marques",
  "Le développement de partenariats à long terme",
];

export default function MarketingInfluencePage() {
  return (
    <>
      <SiteHeader />

      <PageHeader
        eyebrow="Marketing d'influence"
        title="Transformer l'influence en véritable levier de développement."
      >
        Le marketing d&apos;influence consiste à mettre en relation des
        marques et des talents afin de construire des campagnes capables de
        générer de la visibilité, de l&apos;engagement et, selon les
        objectifs, de l&apos;acquisition et des conversions.
      </PageHeader>

      <section className="block">
        <div className="wrap">
          <div className="block-head">
            <h2>Ce que nous construisons</h2>
            <p className="desc">
              Chez Zuri Agency, nous représentons et accompagnons des talents
              et construisons pour eux des opportunités avec les marques.
            </p>
          </div>

          <div className="sectors" style={{ marginTop: 0 }}>
            <div className="label mono">Nous intervenons notamment sur</div>
            <ul className="check-list">
              {INTERVENTIONS.map((item) => (
                <li key={item}>
                  <span className="bullet" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="note-block" style={{ marginTop: 56 }}>
            <span className="icon">✦</span>
            <p>
              Notre objectif : ne pas simplement rechercher des campagnes,
              mais construire la carrière et la valeur commerciale de nos
              talents sur le long terme.
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
