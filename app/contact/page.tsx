import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Une marque, un talent qui veut nous rejoindre, une question : l'équipe Zuri Agency répond sous 48h.",
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />

      <PageHeader eyebrow="Contact" title="Parlons de votre projet">
        Une marque, un talent qui veut nous rejoindre, une question :
        l&apos;équipe répond sous 48h.
      </PageHeader>

      <section className="block">
        <div className="wrap contact-grid">
          <div className="contact-info">
            <ul className="contact-list">
              <li>
                <span>Email</span>
                <span>contact@zuriagency.fr</span>
              </li>
              <li>
                <span>Basée à</span>
                <span>Paris, France</span>
              </li>
              <li>
                <span>Réponse</span>
                <span>Sous 48h</span>
              </li>
            </ul>
          </div>
          <ContactForm />
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
