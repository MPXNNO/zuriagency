// Statistiques de visite (Umami) : aucune donnée personnelle, aucun cookie, pas de bandeau à afficher.
// Le script est chargé après l'affichage de la page : il ne ralentit pas le site.
import Script from "next/script";

export default function Analytics() {
  // identifiant public du site dans Umami (il peut aussi être remplacé par la variable NEXT_PUBLIC_UMAMI_WEBSITE_ID)
  const id = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || "aa5999ab-f04c-4233-9135-a70885980836";
  const src = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL || "https://cloud.umami.is/script.js";
  return <Script src={src} data-website-id={id} data-domains="zuriagency.fr,www.zuriagency.fr" strategy="afterInteractive" />;
}
