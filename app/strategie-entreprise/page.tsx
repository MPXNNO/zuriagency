import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHeader from "@/components/PageHeader";
import RdvModal from "@/components/RdvModal";

export const metadata: Metadata = {
  title: "Stratégie d'entreprise",
  description:
    "Zuri Agency accompagne les entreprises et entrepreneurs qui souhaitent structurer, développer ou accélérer leur activité.",
};

const ENJEUX = [
  "Analyse de l'activité et du positionnement",
  "Définition de la stratégie de développement",
  "Développement commercial",
  "Identification de nouvelles opportunités",
  "Stratégie d'acquisition et de prospection",
  "Développement de partenariats",
  "Positionnement et offre commerciale",
  "Structuration des processus",
  "Stratégie marketing",
  "Accompagnement au lancement ou au développement d'un projet",
];

export default function StrategieEntreprisePage() {
  return (
    <>
      <SiteHeader />

      <PageHeader eyebrow="Stratégie d'entreprise" title="Transformer une ambition en stratégie.">
        À travers notre expertise en conseil et en développement commercial,
        notamment développée avec Consulting Opportuna, nous accompagnons les
        entreprises et entrepreneurs qui souhaitent structurer, développer ou
        accélérer leur activité.
      </PageHeader>

      <section className="block">
        <div className="wrap">
          <div className="block-head">
            <h2>Ce que recouvre la stratégie d&apos;entreprise</h2>
            <p className="desc">
              La stratégie d&apos;entreprise consiste à analyser une
              organisation, son marché, ses objectifs et ses ressources afin
              de définir les orientations permettant de soutenir son
              développement.
            </p>
          </div>

          <div className="sectors" style={{ marginTop: 0 }}>
            <div className="label mono">
              Nous pouvons intervenir sur différents enjeux
            </div>
            <ul className="check-list">
              {ENJEUX.map((item) => (
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
              Notre approche repose sur une idée : une bonne stratégie doit
              pouvoir être transformée en actions concrètes. Nous travaillons
              donc à la fois sur la réflexion stratégique et sur sa mise en
              œuvre.
            </p>
          </div>
        </div>
      </section>

      <RdvModal
        ctaHeading="Un point stratégique de 30 minutes, sans engagement."
        ctaText="Décrivez-nous votre activité et vos objectifs : nous revenons vers vous pour caler un créneau de 30 minutes, offert."
        modalTitle="Réservez votre échange stratégique"
        modalSub="Laissez-nous vos coordonnées, notre équipe revient vers vous sous 48h pour fixer un créneau."
        fields={[
          { id: "name", label: "Nom", type: "text", placeholder: "Votre nom", required: true },
          { id: "email", label: "Email", type: "email", placeholder: "vous@entreprise.com", required: true },
          { id: "phone", label: "Téléphone", type: "tel", placeholder: "06 12 34 56 78" },
          { id: "company", label: "Entreprise", type: "text", placeholder: "Nom de votre entreprise" },
          { id: "message", label: "Votre besoin (optionnel)", type: "textarea", placeholder: "Quelques mots sur votre projet" },
        ]}
      />

      <SiteFooter />
    </>
  );
}
