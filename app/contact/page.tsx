import type { Metadata } from "next";
import ContactMarkup from "@/components/markup/ContactMarkup";
import ContactFx from "@/components/fx/ContactFx";
import "./contact.css";

export const metadata: Metadata = {
  title: "Contact : marques et influenceurs, parlons de votre projet",
  description:
    "Marque à la recherche d'influenceurs pour une campagne, ou talent qui veut être représenté ? Écrivez à Zuri Agency, agence d'influence à Paris : réponse sous 48h.",
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact", title: "Contact | Zuri Agency" },
};

export default function ContactPage() {
  return (
    <>
      <ContactMarkup />
      <ContactFx />
    </>
  );
}
