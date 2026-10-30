import type { Metadata } from "next";
import StrategieMarkup from "@/components/markup/StrategieMarkup";
import StrategieFx from "@/components/fx/StrategieFx";
import "./strategie.css";

export const metadata: Metadata = {
  title: "Stratégie marketing pour marques et entreprises",
  description:
    "Stratégie marketing de votre marque ou entreprise : positionnement, message, contenus, réseaux sociaux, campagnes d'influence et lancement. Un point stratégique de 30 minutes offert.",
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
