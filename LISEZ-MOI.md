# Zuri Agency : nouveau design "encre" + Marlene + réponse sous 48h

Ce dossier contient uniquement les 9 fichiers modifiés ou ajoutés. Les chemins sont ceux du repo GitHub `mpxnno/zuriagency`.

## Ce qui change

- Fond blanc avec des cercles colorés animés qui contournent les textes et fusionnent avec la goutte de la souris (bouton "Figer l'encre" en bas à droite).
- Vidéo de la page d'accueil dans un grand cercle.
- Marlene ajoutée en 5e talent sur la page Talents (Instagram et TikTok).
- Délai de réponse : "sous 48h" au lieu de "sous 5 jours ouvrés" (page Contact, message de confirmation, description de la page).
- Tous les textes des pages restent identiques.

## Fichiers

| Fichier | Action |
|---|---|
| `app/globals.css` | remplace l'existant (nouveau design) |
| `app/layout.tsx` | remplace l'existant (ajoute le fond d'encre) |
| `app/page.tsx` | remplace l'existant (titre en deux lignes) |
| `app/talents/page.tsx` | remplace l'existant (description avec Marlene) |
| `app/contact/page.tsx` | remplace l'existant (48h) |
| `components/ContactForm.tsx` | remplace l'existant (48h) |
| `components/TalentGrid.tsx` | remplace l'existant (ajoute Marlene) |
| `components/InkBackground.tsx` | nouveau fichier |
| `public/talents/talent-05.jpg` | nouvelle photo de Marlene |

## Comment l'appliquer

1. Sur GitHub, dans le repo `zuriagency`, importe ces fichiers en gardant les mêmes dossiers (Add file > Upload files, tu peux glisser les dossiers `app`, `components` et `public` d'un coup). Vérifie que chaque fichier a bien remplacé l'ancien, sans doublon.
2. Commit sur la branche principale : Vercel redéploie tout seul.
3. Après le déploiement, fais un rechargement forcé (Cmd+Shift+R sur Mac).

## Notes

- Testé : `tsc` sans erreur et `next build` OK (16 pages), rendu vérifié sur ordinateur et téléphone.
- Le site reste en thème clair : l'ancien mode sombre automatique est retiré, le fond est toujours blanc.
- Les anciens fichiers inutilisés (`ContactModal.tsx`, `TalentRoster.tsx`, etc.) contiennent encore "5 jours ouvrés" mais ne sont affichés nulle part. Tu peux les supprimer du repo.
- La page Politique de confidentialité affiche encore la note interne "À faire relire et compléter... avant mise en ligne" (`app/confidentialite/page.tsx`). Je ne l'ai pas touchée : à retirer quand le texte est validé.
