import type { Metadata } from "next";
import HomeMarkup from "@/components/markup/HomeMarkup";
import HomeFx from "@/components/fx/HomeFx";
import { preload } from "react-dom";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  // l'image de fond de l'écran d'entrée s'affiche tout de suite
  preload("/media/hero-mobile-blur.webp", { as: "image", fetchPriority: "high", media: "(max-width: 700px)" } as Parameters<typeof preload>[1]);
  preload("/media/hero-desktop-blur.webp", { as: "image", fetchPriority: "high", media: "(min-width: 701px)" } as Parameters<typeof preload>[1]);
  return (
    <>
      <HomeMarkup />
      <HomeFx />
    </>
  );
}
