import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Le mot du fondateur",
  description:
    "Steve K. Dompe, fondateur de Zuri Agency, revient sur les convictions qui ont donné naissance à l'agence.",
};

export default function FondateurPage() {
  return (
    <>
      <SiteHeader />

      <PageHeader
        eyebrow="Le mot du fondateur"
        title="« Le talent n'a pas de couleur, mais les opportunités ne sont pas toujours équitables. »"
      >
        Steve K. Dompe, fondateur de Zuri Agency, revient sur les convictions
        qui ont donné naissance à l&apos;agence.
      </PageHeader>

      <section className="block founder-section">
        <div className="wrap founder-grid">
          <figure className="founder-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/founder-steve.jpg"
              alt="Portrait de Steve K. Dompe, fondateur de Zuri Agency"
            />
            <figcaption className="founder-caption">
              <span>Steve K. Dompe</span>
              <span className="mono">Fondateur</span>
            </figcaption>
          </figure>

          <div className="founder-letter">
            <p>
              J&apos;ai créé Zuri Agency avec une conviction profonde : la
              diversité ne doit pas être une tendance, mais une réalité
              durable dans le monde des affaires, de l&apos;influence et du
              sport.
            </p>
            <p>
              Au fil de mes expériences, j&apos;ai constaté que de nombreux
              talents disposent d&apos;une véritable personnalité, d&apos;une
              communauté engagée et d&apos;un potentiel considérable, mais ne
              bénéficient pas toujours des mêmes opportunités pour le
              valoriser.
            </p>
            <p>C&apos;est précisément pour cela que j&apos;ai voulu créer Zuri Agency.</p>
            <p>
              Zuri, c&apos;est avant tout une agence qui croit au potentiel.
              Nous voulons accompagner des profils différents, des parcours
              différents et des personnalités différentes, tout en leur
              permettant d&apos;accéder à des opportunités à la hauteur de
              leur valeur.
            </p>
            <p>
              Notre rôle n&apos;est pas seulement de mettre en relation des
              talents avec des marques ou des entreprises. Nous voulons
              construire des parcours, développer des stratégies et créer des
              opportunités qui s&apos;inscrivent dans la durée.
            </p>
            <p>
              Cette vision dépasse le marketing d&apos;influence. Elle
              s&apos;étend également à l&apos;accompagnement stratégique des
              entreprises et au management sportif, car je suis convaincu
              qu&apos;un même principe s&apos;applique à tous les domaines :
              le potentiel a besoin d&apos;être identifié, structuré et
              accompagné pour pouvoir réellement s&apos;exprimer.
            </p>
            <p>
              Je veux construire une agence moderne, ambitieuse et ouverte,
              qui puisse contribuer à faire évoluer les représentations et les
              opportunités dans notre société.
            </p>
            <p>Zuri Agency est née de cette ambition.</p>

            <div className="founder-signoff">
              <span className="founder-name">Steve K. Dompe</span>
              <span className="founder-role mono">Fondateur de Zuri Agency</span>
            </div>
          </div>
        </div>
      </section>

      <section className="manifesto">
        <div className="wrap manifesto-grid">
          <p>
            <span className="accent-orange">Créer</span> des opportunités.
          </p>
          <p>
            <span className="accent-lime">Révéler</span> les talents.
          </p>
          <p>
            <span className="accent-pink">Faire</span> de la diversité une
            force.
          </p>
        </div>
      </section>

      <SiteFooter
        links={[
          { href: "/contact", label: "Nous contacter" },
          { href: "/", label: "Retour à l'accueil" },
        ]}
      />
    </>
  );
}
