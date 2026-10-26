import type { Metadata } from "next";
import MarketingMarkup from "@/components/markup/MarketingMarkup";
import MarketingFx from "@/components/fx/MarketingFx";
import "./marketing.css";

export const metadata: Metadata = {
  title: "Agence de marketing d'influence à Paris",
  description:
    "Marques : trouvez les bons influenceurs pour vos campagnes. Talents : faites-vous représenter. Zuri Agency gère mise en relation, négociation, stratégie de contenu et partenariats durables.",
  alternates: { canonical: "/marketing-influence" },
  openGraph: { url: "/marketing-influence", title: "Agence de marketing d'influence à Paris | Zuri Agency" },
};

export default function MarketingPage() {
  return (
    <>
      <MarketingMarkup />
      <MarketingFx />
    </>
  );
}
