import type { Metadata } from "next";
import { Archivo_Black, Inter, Space_Mono } from "next/font/google";
import ContactModal from "@/components/ContactModal";
import "./globals.css";

const archivo = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
});

const SITE_URL = "https://zuriagency.fr";
const SITE_TITLE = "Zuri Agency | Agence de talents Instagram & TikTok";
const SITE_DESCRIPTION =
  "Zuri Agency repère et accompagne des talents à fort potentiel sur Instagram et TikTok : partenariats de marque, stratégie de contenu et développement de carrière, en France et à l'international.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Zuri Agency",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "agence de talents",
    "agence d'influenceurs",
    "talents Instagram",
    "talents TikTok",
    "partenariats de marque",
    "management influence",
    "Zuri Agency",
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
        alt: "Zuri Agency, agence de talents Instagram & TikTok",
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
    <html lang="fr">
      <body
        className={`${archivo.variable} ${inter.variable} ${spaceMono.variable}`}
      >
        {children}
        <ContactModal />
      </body>
    </html>
  );
}
