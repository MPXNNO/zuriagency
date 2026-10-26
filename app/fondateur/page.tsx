import type { Metadata } from "next";
import FondateurMarkup from "@/components/markup/FondateurMarkup";
import RevealFx from "@/components/fx/RevealFx";

export const metadata: Metadata = {
  title: "Le mot du fondateur, Steve K. Dompe",
  description:
    "Steve K. Dompe, fondateur de Zuri Agency, raconte pourquoi il a créé l'agence : donner aux talents les opportunités qu'ils méritent, dans l'influence, l'entreprise et le sport.",
  alternates: { canonical: "/fondateur" },
  openGraph: { url: "/fondateur", title: "Le mot du fondateur | Zuri Agency" },
};

export default function FondateurPage() {
  return (
    <>
      <FondateurMarkup />
      <RevealFx selectors={[[".ftext p", 0.6], ["#fphoto", 0.2], ["#signoff", 0.6], [".fmani p", 0.6]]} />
    </>
  );
}
