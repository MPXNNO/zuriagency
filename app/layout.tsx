import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Polices hébergées avec le site (app/fonts) : aucun appel à Google Fonts.
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

const SITE_URL = "https://zuriagency.fr";
const SITE_TITLE = "Zuri Agency | Influence. Stratégie. Sport.";
const SITE_DESCRIPTION =
  "Zuri Agency est une agence créée par Steve K. Dompe, qui accompagne les talents, les entrepreneurs et les entreprises dans leur développement à travers trois pôles : marketing d'influence, stratégie d'entreprise et management sportif.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Zuri Agency",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Zuri Agency",
    "agence de talents",
    "marketing d'influence",
    "stratégie d'entreprise",
    "management sportif",
    "Steve K. Dompe",
  ],
  authors: [{ name: "Zuri Agency" }],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "Zuri Agency",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Zuri Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // les variables de police sont posées sur <html> pour être lisibles depuis :root dans globals.css
    <html lang="fr" className={`${marcellus.variable} ${jost.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
