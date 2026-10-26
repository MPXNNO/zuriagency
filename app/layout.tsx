import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import SiteShell from "@/components/SiteShell";
import { SITE_URL, INSTAGRAM, EMAIL } from "@/lib/site";
import "./globals.css";

// Polices hébergées avec le site (app/fonts) : aucun appel externe, affichage immédiat.
const marcellus = localFont({
  src: "./fonts/marcellus-latin-400-normal.woff2",
  weight: "400",
  style: "normal",
  variable: "--font-marcellus",
  display: "swap",
});

const jost = localFont({
  src: [
    { path: "./fonts/jost-latin-300-normal.woff2", weight: "300", style: "normal" },
    { path: "./fonts/jost-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/jost-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-jost",
  display: "swap",
});

const TITLE = "Zuri Agency | Agence de marketing d'influence et de talents à Paris";
const DESCRIPTION =
  "Agence de marketing d'influence à Paris : Zuri Agency représente des talents et influenceurs et construit leurs campagnes avec les marques. Aussi stratégie d'entreprise et management sportif.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s | Zuri Agency" },
  description: DESCRIPTION,
  applicationName: "Zuri Agency",
  keywords: [
    "agence d'influence",
    "agence marketing d'influence Paris",
    "agence influenceurs",
    "agence de talents",
    "campagne influenceurs",
    "trouver des influenceurs",
    "agence pour influenceurs",
    "management d'influenceurs",
    "stratégie d'entreprise",
    "management sportif",
    "Zuri Agency",
    "Steve K. Dompe",
  ],
  authors: [{ name: "Zuri Agency", url: SITE_URL }],
  creator: "Zuri Agency",
  publisher: "Zuri Agency",
  alternates: { canonical: "/" },
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Zuri Agency",
    locale: "fr_FR",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Zuri Agency, agence de marketing d'influence à Paris" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#241C17",
};

// Données structurées : aident Google à comprendre qui est l'agence et ce qu'elle propose.
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organisation`,
      name: "Zuri Agency",
      alternateName: "Zuri.Agency",
      url: SITE_URL,
      logo: `${SITE_URL}/icon.png`,
      email: EMAIL,
      founder: { "@type": "Person", "@id": `${SITE_URL}/#fondateur`, name: "Steve K. Dompe", jobTitle: "Fondateur", url: `${SITE_URL}/fondateur` },
      sameAs: [INSTAGRAM],
      description: DESCRIPTION,
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#agence`,
      name: "Zuri Agency",
      url: SITE_URL,
      image: `${SITE_URL}/og-image.png`,
      email: EMAIL,
      address: { "@type": "PostalAddress", streetAddress: "78 Avenue des Champs-Élysées", postalCode: "75008", addressLocality: "Paris", addressCountry: "FR" },
      areaServed: ["FR", "Europe"],
      knowsLanguage: ["fr", "en"],
      parentOrganization: { "@id": `${SITE_URL}/#organisation` },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Pôles d'expertise",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Marketing d'influence", url: `${SITE_URL}/marketing-influence`, description: "Représentation et management de talents et d'influenceurs, mise en relation avec les marques, négociation et campagnes d'influence." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Stratégie d'entreprise", url: `${SITE_URL}/strategie-entreprise`, description: "Conseil en stratégie et développement commercial pour entreprises et entrepreneurs." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Management sportif", url: `${SITE_URL}/management-sportif`, description: "Accompagnement des jeunes joueurs et de leurs familles au-delà du terrain." } },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#site`,
      url: SITE_URL,
      name: "Zuri Agency",
      inLanguage: "fr-FR",
      publisher: { "@id": `${SITE_URL}/#organisation` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // les variables de police sont posées sur <html> pour être lisibles depuis :root dans globals.css
    <html lang="fr" className={`${marcellus.variable} ${jost.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
