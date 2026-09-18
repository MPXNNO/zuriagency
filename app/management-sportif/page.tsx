import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHeader from "@/components/PageHeader";
import RdvModal from "@/components/RdvModal";

export const metadata: Metadata = {
  title: "Management sportif",
  description:
    "Zuri Agency accompagne les joueurs et les familles au-delà du terrain : parcours, orientation, préparation et développement individuel.",
};

const ACCOMPAGNEMENT = [
  "Analyse du parcours et des objectifs du joueur",
  "Conseils sur l'environnement sportif",
  "Orientation et réflexion autour des choix de clubs",
  "Accompagnement des parents dans leurs questionnements",
  "Conseils sur la progression individuelle",
  "Identification des axes de travail",
  "Mise en place d'un accompagnement complémentaire à l'entraînement du club",
  "Conseils sur la préparation et la régularité",
  "Mise en relation avec des professionnels lorsque cela est pertinent",
];

export default function ManagementSportifPage() {
  return (
    <>
      <SiteHeader />

      <PageHeader
        eyebrow="Management sportif"
        title="Accompagner les joueurs et les familles au-delà du terrain."
      >
        Le parcours d&apos;un jeune joueur ou d&apos;un sportif peut être
        complexe. Choix d&apos;un club, entraînement, développement
        individuel, orientation, préparation ou compréhension de
        l&apos;environnement sportif : les bonnes décisions peuvent avoir un
        impact important sur la progression d&apos;un joueur.
      </PageHeader>

      <section className="block">
        <div className="wrap">
          <div className="block-head">
            <h2>Un accompagnement sur-mesure</h2>
            <p className="desc">
              Zuri Agency propose un accompagnement destiné aux joueurs et à
              leurs familles qui souhaitent bénéficier d&apos;un regard
              extérieur et de conseils pour mieux structurer leur parcours
              sportif.
            </p>
          </div>

          <div className="sectors" style={{ marginTop: 0 }}>
            <div className="label mono">
              Notre accompagnement peut notamment porter sur
            </div>
            <ul className="check-list">
              {ACCOMPAGNEMENT.map((item) => (
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
              L&apos;objectif n&apos;est pas de remplacer le club ou les
              éducateurs, mais d&apos;apporter un accompagnement
              complémentaire et personnalisé autour du joueur et de son
              projet.
            </p>
          </div>
        </div>
      </section>

      <RdvModal
        ctaHeading="Un point de 30 minutes sur le parcours du joueur."
        ctaText="Parlez-nous du club, du niveau et des objectifs : nous revenons vers vous pour caler un échange de 30 minutes, offert."
        modalTitle="Réservez votre échange sportif"
        modalSub="Laissez-nous quelques informations sur le joueur, notre équipe revient vers vous sous 48h pour fixer un créneau."
        fields={[
          { id: "name", label: "Nom (joueur ou parent)", type: "text", placeholder: "Votre nom", required: true },
          { id: "email", label: "Email", type: "email", placeholder: "vous@email.com", required: true },
          { id: "phone", label: "Téléphone", type: "tel", placeholder: "06 12 34 56 78" },
          { id: "club", label: "Club actuel", type: "text", placeholder: "Nom du club" },
          {
            id: "niveau",
            label: "Niveau de pratique",
            type: "select",
            options: ["National", "Régional", "Départemental", "Loisir", "Autre"],
          },
          { id: "poste", label: "Poste / spécialité", type: "text", placeholder: "Ex : attaquant, milieu..." },
          { id: "message", label: "Votre besoin (optionnel)", type: "textarea", placeholder: "Quelques mots sur le parcours et les objectifs" },
        ]}
      />

      <SiteFooter />
    </>
  );
}
