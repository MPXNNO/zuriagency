import type { Metadata } from "next";
import TalentsWall from "@/components/TalentsWall";
import { TALENTS } from "@/lib/talents";

export const metadata: Metadata = {
  title: "Nos talents et influenceurs",
  description:
    "Le roster de Zuri Agency : des talents et influenceurs mode, beauté, lifestyle, humour et sport. Marques, trouvez le bon profil pour votre campagne. Talents, rejoignez l'agence.",
  alternates: { canonical: "/talents" },
  openGraph: { url: "/talents", title: "Nos talents et influenceurs | Zuri Agency" },
};

export default function TalentsPage() {
  return (
    <main>
      <TalentsWall />
      <h2 className="sr-only">Les talents représentés par Zuri Agency</h2>
      <ul className="sr-only">
        {TALENTS.map((t) => (
          <li key={t.name}>
            {t.name} : {t.universes.join(", ")}
          </li>
        ))}
      </ul>
    </main>
  );
}
