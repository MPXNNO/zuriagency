import type { Metadata } from "next";
import CollaborationsMarkup from "@/components/markup/CollaborationsMarkup";
import CollaborationsFx from "@/components/fx/CollaborationsFx";
import "./collaborations.css";

export const metadata: Metadata = {
  title: "Nos collaborations",
  description:
    "Les collaborations entre les talents de Zuri Agency et les marques arrivent bientôt sur cette page. Marque ou talent, contactez l'agence pour en faire partie.",
  alternates: { canonical: "/collaborations" },
  openGraph: { url: "/collaborations", title: "Nos collaborations | Zuri Agency" },
};

export default function CollaborationsPage() {
  return (
    <>
      <CollaborationsMarkup />
      <CollaborationsFx />
    </>
  );
}
