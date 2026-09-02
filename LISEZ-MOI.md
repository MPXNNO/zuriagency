# Mise à jour du roster — Zuri Agency

## Ce qui a changé

**Titre de section** : "0 talents. 8 places. 1 place qui a ton nom dessus" devient
**"8 places disponibles. La tienne, peut-être ?"**, avec un texte d'intro qui ne mentionne plus le "0".

**Cartes du roster** : chaque encart affiche maintenant **"Présentation du talent bientôt"** au lieu de "Place libre", et devient cliquable ("Voir l'univers →").

**Popup au clic** : chaque encart ouvre une fenêtre avec le nom de l'univers, une courte description, un mini-carrousel à feuilleter (flèches + points) montrant 3 aperçus stylisés dans les couleurs de la charte (orange/bleu/rose/lime, motifs pointillés/grille/diagonales), et un bouton "Candidater pour cette place" qui renvoie vers le formulaire.

Comme il n'y a pas encore de vrais talents, ce sont des visuels graphiques "à venir" dans le style du site plutôt que de fausses photos — pour ne pas donner l'impression qu'un talent existe déjà.

La 8e carte ("Toi, peut-être ?") n'a pas été touchée.

## Fichiers dans ce dossier

- `app/page.tsx` — remplace le fichier existant (la grille du roster a été déplacée dans le nouveau composant `TalentRoster`)
- `app/globals.css` — remplace le fichier existant (styles ajoutés à la fin : bouton-carte, popup, motifs)
- `components/TalentRoster.tsx` — nouveau fichier à ajouter dans `components/`

## Comment l'appliquer

1. Dans ton repo GitHub `zuriagency`, remplace `app/page.tsx` et `app/globals.css` par les versions de ce dossier.
2. Ajoute le nouveau fichier `components/TalentRoster.tsx`.
3. Commit + push sur la branche principale → Vercel redéploie automatiquement.

Testé : le code passe la vérification TypeScript sans erreur, et la popup + le carrousel ont été vérifiés visuellement (bureau et mobile) avant livraison.

## Pour aller plus loin (pas fait ici)

- La section "stats" tout en haut du site (juste sous le hero) affiche aussi un "0" ("0 — Talents dans l'équipe (pour l'instant)"). Ce n'était pas dans la partie que tu as montrée, mais si tu veux que je la retouche aussi, dis-le-moi.
- Les descriptions/tags par univers dans `TalentRoster.tsx` (ex: "Outfit du jour", "Match day"...) sont un premier jet — facile à réécrire si tu veux un autre ton.
