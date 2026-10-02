# Ajout du bloc « Ils nous font confiance » et photo du fondateur teintée

## Fichiers à envoyer sur GitHub (mêmes chemins)

Modifiés :
- app/page.tsx (le bloc est ajouté après « Que veut dire Zuri ? »)
- app/globals.css
- public/founder-steve.jpg (monochrome brun chaud)
- public/founder-steve.webp (monochrome brun chaud)

Nouveaux :
- components/TrustedBy.tsx
- public/logos/logo-afro-nation.png
- public/logos/logo-shein.png
- public/logos/logo-temu.png
- public/logos/logo-teveo.png
- public/logos/logo-paris-fc.png
- public/logos/logo-cure-vitamine.png

## À savoir

- Les logos sont gris par défaut et reprennent leurs couleurs au survol. Sur téléphone et tablette, ils sont en couleur en permanence.
- Pour ajouter une marque : déposer son logo dans public/logos/ et ajouter une ligne à la liste BRANDS dans components/TrustedBy.tsx.
- Le défilement s'arrête au survol, et ne démarre pas si le visiteur a demandé moins d'animations.
