import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Comment Zuri Agency collecte, utilise et protège vos données lorsque vous nous contactez.",
};

export default function ConfidentialitePage() {
  return (
    <>
      <SiteHeader />

      <PageHeader
        eyebrow="Politique de confidentialité"
        title="Politique de confidentialité"
      >
        Comment Zuri Agency collecte, utilise et protège vos données lorsque
        vous nous contactez.
      </PageHeader>

      <section className="block">
        <div className="wrap">
          <div className="legal-note">
            À faire relire et compléter (base légale précise, durées de
            conservation, sous-traitants éventuels) avant mise en ligne.
          </div>
          <div className="legal-content">
            <div>
              <h3>Données collectées</h3>
              <p>
                Lorsque vous utilisez le formulaire de contact ou de demande
                de rendez-vous, nous collectons les informations que vous nous
                transmettez volontairement : nom, email, téléphone, et le
                contenu de votre message.
              </p>
            </div>
            <div>
              <h3>Finalité</h3>
              <p>
                Ces informations sont utilisées uniquement pour répondre à vos
                demandes, échanger avec vous et, le cas échéant, organiser un
                rendez-vous.
              </p>
            </div>
            <div>
              <h3>Durée de conservation</h3>
              <p>
                Vos données sont conservées pendant la durée nécessaire au
                traitement de votre demande, puis supprimées ou archivées
                conformément à la réglementation en vigueur.
              </p>
            </div>
            <div>
              <h3>Partage des données</h3>
              <p>
                Vos données ne sont ni vendues, ni louées, ni partagées avec
                des tiers, en dehors des cas nécessaires au traitement de
                votre demande ou d&apos;une obligation légale.
              </p>
            </div>
            <div>
              <h3>Vos droits</h3>
              <p>
                Conformément au Règlement Général sur la Protection des
                Données (RGPD), vous disposez d&apos;un droit d&apos;accès, de
                rectification, de suppression et d&apos;opposition concernant
                vos données personnelles. Pour exercer ces droits,
                contactez-nous à l&apos;adresse contact@zuriagency.fr.
              </p>
            </div>
            <div>
              <h3>Cookies</h3>
              <p>
                Ce site n&apos;utilise pas de cookies de suivi publicitaire ou
                de traçage tiers.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter
        links={[
          { href: "/mentions-legales", label: "Mentions légales" },
          { href: "/", label: "Retour à l'accueil" },
        ]}
      />
    </>
  );
}
