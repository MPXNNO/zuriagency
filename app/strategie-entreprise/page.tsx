import type { Metadata } from "next";
import StrategieMarkup from "@/components/markup/StrategieMarkup";
import StrategieFx from "@/components/fx/StrategieFx";
import "./strategie.css";

export const metadata: Metadata = {
  title: "Stratégie d'entreprise et développement commercial",
  description:
    "Conseil en stratégie d'entreprise et développement commercial : positionnement, prospection, partenariats, marketing, lancement de projet. Un point stratégique de 30 minutes offert.",
  alternates: { canonical: "/strategie-entreprise" },
  openGraph: { url: "/strategie-entreprise", title: "Stratégie d'entreprise | Zuri Agency" },
};

export default function StrategiePage() {
  return (
    <>
      <StrategieMarkup />
      <StrategieFx />
    </>
  );
}
