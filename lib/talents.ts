// Le roster affiché sur la page Talents.
export type Talent = {
  name: string;
  photo: string; // /img/talents/talent-0X (sans taille ni extension)
  universes: string[];
  instagram?: string;
  tiktok?: string;
};

export const TALENTS: Talent[] = [
  { name: "Antoine", photo: "/img/talents/talent-01", universes: ["Voyage", "Surf", "Lifestyle"], instagram: "https://www.instagram.com/lostantwan/", tiktok: "https://www.tiktok.com/search?q=lostantwan" },
  { name: "Clyde", photo: "/img/talents/talent-02", universes: ["Mode", "Style"], instagram: "https://www.instagram.com/killa_us/", tiktok: "https://www.tiktok.com/@killa_us" },
  { name: "Anaïs", photo: "/img/talents/talent-03", universes: ["Lifestyle", "Humour", "Beauté"], instagram: "https://www.instagram.com/anaismonteiro9/", tiktok: "https://www.tiktok.com/@nana.toktok9" },
  { name: "Mejane", photo: "/img/talents/talent-04", universes: ["Sport", "Lifestyle"], instagram: "https://www.instagram.com/mmandrin/", tiktok: "https://www.tiktok.com/@mmandrin" },
  { name: "Marlene", photo: "/img/talents/talent-05", universes: ["Mode", "Beauté", "Événementiel"], instagram: "https://www.instagram.com/marlene_johhana/", tiktok: "https://www.tiktok.com/@marlenejohanna3" },
  { name: "Stanley", photo: "/img/talents/talent-06", universes: ["Société", "Humour"], instagram: "https://www.instagram.com/stanley_petra/", tiktok: "https://www.tiktok.com/@stanley_petra10" },
  { name: "Lynn", photo: "/img/talents/talent-07", universes: ["Acting", "Humour", "Beauté"], instagram: "https://www.instagram.com/lynn.u.sate/", tiktok: "https://www.tiktok.com/@lynn.anastasia1" },
  { name: "Sisters Crew", photo: "/img/talents/talent-08", universes: ["Humour", "Danse", "Chant"], tiktok: "https://www.tiktok.com/@thecrewsisters.4" },
];
