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

export const metadata: Metadata = {
  title: "Zuri Agency — On a du talent à revendre.",
  description:
    "Zuri Agency repère, structure et développe des talents avec l'exigence, les contrats et les moyens qu'ils méritent.",
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
