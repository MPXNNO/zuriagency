import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Informations relatives à l'éditeur et à l'hébergement du site zuriagency.fr.",
};

export default function MentionsLegalesPage() {
  return (
    <>
      <SiteHeader />

      <PageHeader eyebrow="Mentions légales" title="Mentions légales">
        Informations relatives à l&apos;éditeur et à l&apos;hébergement du
        site zuriagency.fr.
      </PageHeader>

      <section className="block">
        <div className="wrap">
          <div className="legal-content">
            <div>
              <h3>Éditeur du site</h3>
              <p>
                La marque <strong>Zuri Agency</strong> est exploitée par{" "}
                <strong>Dompe Consulting Opportuna</strong>.
                <br />
                Directeur de la publication : Steve K. Dompe
                <br />
                Siège social : 78 Avenue des Champs-Élysées, 75008 Paris,
                France
                <br />
                SIRET : 819 486 218 00038
                <br />
                Contact : contact@zuriagency.fr
              </p>
            </div>
            <div>
              <h3>Hébergement</h3>
              <p>
                Ce site est hébergé par IONOS SARL, 7 place de la Gare, 57200
                Sarreguemines, France.
              </p>
            </div>
            <div>
              <h3>Propriété intellectuelle</h3>
              <p>
                L&apos;ensemble des contenus présents sur ce site (textes,
                visuels, identité de marque) est la propriété de Dompe
                Consulting Opportuna, exploitant la marque Zuri Agency, sauf
                mention contraire. Toute reproduction, représentation ou
                diffusion, totale ou partielle, sans autorisation préalable
                est interdite.
              </p>
            </div>
            <div>
              <h3>Responsabilité</h3>
              <p>
                Zuri Agency s&apos;efforce d&apos;assurer l&apos;exactitude
                des informations diffusées sur ce site, sans garantie
                d&apos;exhaustivité ou d&apos;absence d&apos;erreur.
                L&apos;utilisation des informations du site se fait sous la
                seule responsabilité de l&apos;utilisateur.
              </p>
            </div>
            <div>
              <h3>Contact</h3>
              <p>
                Pour toute question relative à ces mentions légales,
                contactez-nous à l&apos;adresse contact@zuriagency.fr.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter
        links={[
          { href: "/confidentialite", label: "Politique de confidentialité" },
          { href: "/", label: "Retour à l'accueil" },
        ]}
      />
    </>
  );
}
