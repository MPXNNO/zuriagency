import type { Metadata } from "next";
import TalentsContactSheet from "@/components/TalentsContactSheet";
import "./talents.css";

export const metadata: Metadata = {
  title: "Nos talents et influenceurs",
  description:
    "Le roster de Zuri Agency : des talents et influenceurs mode, beauté, lifestyle, humour et sport, avec leurs comptes Instagram et TikTok. Marques, sélectionnez vos profils. Talents, rejoignez l'agence.",
  alternates: { canonical: "/talents" },
  openGraph: { url: "/talents", title: "Nos talents et influenceurs | Zuri Agency" },
};

export default function TalentsPage() {
  return (
    <main>
      <TalentsContactSheet />
    </main>
  );
}
