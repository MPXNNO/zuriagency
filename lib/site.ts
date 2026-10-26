// État partagé pendant la visite (remis à zéro à chaque rechargement complet de la page).
export const site = {
  /** Le visiteur est déjà entré sur le site (ou est arrivé par une autre page) : on ne remontre pas la notification d'entrée. */
  entered: false,
  /** La notification d'entrée est affichée : la musique attend qu'on la touche. */
  gateOpen: false,
};

export const NAV = [
  { href: "/talents", label: "Talents", line: "Notre roster" },
  { href: "/strategie-entreprise", label: "Stratégie d'entreprise", line: "Transformer une ambition en stratégie." },
  { href: "/marketing-influence", label: "Marketing d'influence", line: "Transformer l'influence en véritable levier de développement." },
  { href: "/management-sportif", label: "Management sportif", line: "Accompagner les joueurs et les familles au-delà du terrain." },
  { href: "/collaborations", label: "Nos collaborations", line: "Ça brille déjà. On finit d'astiquer." },
  { href: "/fondateur", label: "Le mot du fondateur", line: "« Le talent n'a pas de couleur… »" },
];

/** Pages dont l'en-tête est plein dès le départ (les autres démarrent transparentes sur un fond sombre). */
export const SOLID_HEADER = ["/talents", "/strategie-entreprise", "/fondateur", "/contact", "/mentions-legales", "/confidentialite"];

export const SITE_URL = "https://zuriagency.fr";
export const INSTAGRAM = "https://www.instagram.com/zuri.agency_/";
export const EMAIL = "contact@zuriagency.fr";
