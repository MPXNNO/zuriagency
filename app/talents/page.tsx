import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHeader from "@/components/PageHeader";
import TalentGrid from "@/components/TalentGrid";

export const metadata: Metadata = {
  title: "Talents",
  description:
    "Découvrez le roster de talents accompagnés par Zuri Agency : Antoine, Clyde, Anaïs et Mejane.",
};

export default function TalentsPage() {
  return (
    <>
      <SiteHeader />

      <PageHeader eyebrow="Talents" title="Notre roster">
        Un roster resserré : chaque talent profite de la même attention, à
        chaque étape de la collaboration.
      </PageHeader>

      <section className="block">
        <div className="wrap">
          <TalentGrid />
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
