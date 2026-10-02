# Refonte : ambiance sable et vidéo de fond (octobre 2026)

Tous les textes du site sont inchangés. Seuls le design, l'en-tête, le pied de page et l'accueil changent.

## Fichiers à envoyer sur GitHub (mêmes chemins)

Modifiés :
- app/globals.css
- app/layout.tsx
- app/page.tsx
- app/collaborations/page.tsx
- components/SiteHeader.tsx
- components/SiteFooter.tsx
- components/HeroVideo.tsx
- components/TalentGrid.tsx
- public/founder-steve.jpg (noir et blanc)
- public/founder-steve.webp (noir et blanc)

Nouveaux :
- app/fonts/marcellus-latin-400-normal.woff2
- app/fonts/jost-latin-300-normal.woff2
- app/fonts/jost-latin-400-normal.woff2
- app/fonts/jost-latin-500-normal.woff2
- public/hero-desktop.mp4
- public/hero-desktop.jpg
- public/hero-mobile.mp4
- public/hero-mobile.jpg

## Fichiers devenus inutiles (suppression facultative, le site marche même s'ils restent)

- components/InkBackground.tsx
- components/ContactButton.tsx, ContactLink.tsx, ContactModal.tsx
- components/TalentRoster.tsx, Ticker.tsx, SocialIcons.tsx
- public/hero-video.mp4
- public/talents/ : mejane-01, mejane-modal, anais-02, anais-modal, clyde-03, clyde-modal, antoine-04, antoine-modal (.jpg)

## À savoir

- Les polices (Marcellus, Jost) sont dans app/fonts : plus aucun appel à Google Fonts.
- La vidéo de fond est muette et en boucle. Écran large : hero-desktop. Téléphone : hero-mobile.
- Pour changer la vidéo, remplacer les 4 fichiers hero-* dans public/ en gardant les mêmes noms.
