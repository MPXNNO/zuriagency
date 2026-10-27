# Refonte « dynamique » du site Zuri Agency (octobre 2026)

Le site reprend la maquette validée page par page : notification d'entrée avec carillon, musique d'ambiance sur tout le site, légende, vidéo qui devient l'avatar, stories des pôles, traduction de « Zuri », mur infini des talents, checklist stratégie, onde du marketing d'influence, analyse vidéo du management sportif, nuit étoilée de Nos collaborations, carte postale du Contact, lettre du fondateur, menu « notifications » et fenêtre « Nous contacter ».

## Mettre en ligne

Le plus simple : remplacer tout le projet par le contenu du zip (sans `node_modules` ni `.next`), puis `npm ci` et `npm run build` sur l'hébergement.

Si tu passes par l'envoi de fichiers sur GitHub, il faut aussi **supprimer** ces anciens fichiers (ils ne sont plus utilisés) :

- `components/` : ContactButton, ContactForm, ContactLink, ContactModal, HeroVideo, InkBackground, RdvModal, SiteFooter, SiteHeader, SocialIcons, TalentGrid, TalentRoster, Ticker, TrustedBy (`.tsx`)
- à la racine : hero-desktop.jpg, hero-desktop.mp4, hero-mobile.jpg, hero-mobile.mp4
- `public/` : founder-steve.jpg, founder-steve.webp, hero-desktop.jpg, hero-desktop.mp4, hero-mobile.jpg, hero-mobile.mp4, hero-video.mp4, tout le dossier `public/talents/`, et les logos en `.png` de `public/logos/` (remplacés par des `.webp`)

## Variables d'environnement (inchangées)

- `RESEND_API_KEY` : obligatoire pour recevoir les messages
- `CONTACT_TO_EMAIL` (par défaut contact@zuriagency.fr) et `CONTACT_FROM_EMAIL` (facultatives)

Tous les formulaires envoient vers `/api/contact` : la publication (accueil et fenêtre du pied de page), la carte postale (/contact), et les rendez-vous offerts (stratégie et sport). L'objet du mail indique le type de demande.

## Où modifier quoi

- Textes des pages : `components/markup/*.tsx` (un fichier par page) ; talents : `lib/talents.ts` ; menu : `lib/site.ts`
- Animations : `components/fx/*.tsx` ; en-tête, menu, pied de page, fenêtre contact, bouton son : `components/SiteShell.tsx`
- Styles : `app/globals.css` + un fichier `.css` par page de pôle
- Musique : `public/audio/zuri-ambiance.mp3` ; vidéos d'accueil : `public/media/`

## Référencement et vitesse

- Titre et description propres à chaque page, pensés pour les marques (« trouver des influenceurs ») et les talents (« se faire représenter »), balises Open Graph, adresse canonique.
- Données structurées (agence, fondateur, trois pôles), `sitemap.xml` et `robots.txt` générés automatiquement.
- Images en WebP à la bonne taille, vidéos d'accueil allégées (2,4 Mo et 2,8 Mo au lieu de 7 et 5), musique et vidéo téléchargées seulement quand on en a besoin, polices hébergées sur le site, médias mis en cache un an.
- Après la mise en ligne : déclarer `https://zuriagency.fr/sitemap.xml` dans Google Search Console.

## Statistiques de visite (Umami, gratuit)

Le site est prêt à compter les visites : nombre de visiteurs, pages vues, pages préférées, d'où viennent les gens (Google, Instagram…), téléphone ou ordinateur, pays. Il compte aussi les **messages envoyés** (avec le profil : marque, talent, média…) et les **rendez-vous demandés** (stratégie ou sport). Pas de cookie, donc pas de bandeau à afficher.

C'est déjà branché sur ton compte Umami (identifiant aa5999ab-f04c-4233-9135-a70885980836, écrit dans `components/Analytics.tsx`) : aucune variable à ajouter. Les visites apparaissent dans le tableau de bord Umami dès que cette version du site est en ligne.
