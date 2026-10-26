import type { Metadata } from "next";
import ManagementMarkup from "@/components/markup/ManagementMarkup";
import ManagementFx from "@/components/fx/ManagementFx";
import "./management.css";

export const metadata: Metadata = {
  title: "Management sportif : accompagnement des joueurs et des familles",
  description:
    "Accompagnement des jeunes joueurs et de leurs familles : choix de club, progression individuelle, préparation, orientation. Un point de 30 minutes offert sur le parcours du joueur.",
  alternates: { canonical: "/management-sportif" },
  openGraph: { url: "/management-sportif", title: "Management sportif | Zuri Agency" },
};

export default function ManagementPage() {
  return (
    <>
      <ManagementMarkup />
      <ManagementFx />
    </>
  );
}
