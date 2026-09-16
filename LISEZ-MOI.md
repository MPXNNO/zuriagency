# Intégration d'Antoine (@lostantwan) — 4e talent signé

## Ce qui a changé

**Carte 04 du roster** : la case "Place libre" est remplacée par la carte photo d'Antoine (même traitement que Mejane, Anaïs et Clyde) — photo de couverture, badge "Talent Zuri", et une fiche complète qui s'ouvre au clic.

- Niche : **Lifestyle, voyage & surf**
- Bio : "Entre deux vols et deux vagues, toujours un bon mot en poche : Antoine mêle voyage, surf, mode et lifestyle avec une bonne humeur qui donne envie de le suivre partout."
- Stats : **20 400 abonnés Instagram · 52 000 TikTok**
- Lien Instagram : https://www.instagram.com/lostantwan/

**Cartes suivantes renumérotées** : la carte CTA finale ("Toi, peut-être ?") passe de 05 à **06**, puisqu'il y a maintenant 4 talents + la carte "Et plus" + elle-même.

**Texte d'intro de la section Talents** mis à jour pour citer Mejane, Anaïs, Clyde *et Antoine*.

**Photos** : les deux photos que tu as envoyées portaient l'icône Reels (rond "profil" et rond "son coupé") en bas de l'image. Je les ai retirées en recadrant proprement le bas des deux photos (comme pour la photo du paddleboard de Mejane) plutôt qu'en tentant une retouche qui aurait pu laisser une trace — aucune perte visible sur le cadrage, son visage et sa posture restent pleinement visibles sur les deux.

- `antoine-04.jpg` : photo de couverture de carte (cactus/plage, chemise rayée)
- `antoine-modal.jpg` : photo de la fiche détaillée (montagne, snowboard)

## Fichiers dans ce dossier

- `components/TalentGrid.tsx` — remplace le fichier existant (talent ajouté + numérotation corrigée)
- `app/page.tsx` — remplace le fichier existant (texte d'intro de la section Talents)
- `public/talents/antoine-04.jpg` et `public/talents/antoine-modal.jpg` — nouveaux fichiers à ajouter dans `public/talents/`

## Comment l'appliquer

1. Dans le repo GitHub `zuriagency`, remplace `components/TalentGrid.tsx` et `app/page.tsx` par les versions de ce dossier.
2. Ajoute les deux photos dans `public/talents/`.
3. Commit + push sur la branche principale → Vercel redéploie automatiquement.

Testé : le code passe la vérification TypeScript sans erreur, et le rendu (carte + fiche modale) a été vérifié visuellement avant livraison.
