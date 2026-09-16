# Correctifs : header mobile qui déborde + lien "Zuri Academy"

## 1. Le rond noir coupé dans le header mobile

En regardant tes captures d'écran, j'ai trouvé le problème : sur les petits écrans (téléphone), le header affichait encore les **deux** boutons ("Nous contacter" ET "Rejoindre l'agence") côte à côte, sans aucune règle pour les rétrécir. Sur un écran étroit, le bouton noir "Rejoindre l'agence" (qui est en forme de pilule bien arrondie) se retrouvait écrasé faute de place, et donnait cette impression de "rond noir coupé" au bord de l'écran.

**Correctif** : sur mobile (largeur ≤ 640px), seul le bouton "Nous contacter" reste visible dans le header. Le bouton "Rejoindre l'agence" disparaît du header sur mobile (il reste bien présent ailleurs sur la page : dans le hero et dans la section "Rejoindre l'agence" en bas), donc rien n'est perdu, ça libère juste de la place. Le logo et le padding du header sont aussi légèrement réduits sur mobile pour que tout respire bien.

Testé et vérifié visuellement sur plusieurs largeurs (375px, 390px, 700px, 1440px) : plus aucun débordement, le header est net à toutes les tailles.

Je n'ai pas touché à autre chose dans le header : ton titre, ta description et ta favicon étaient déjà corrects côté code (le souci que tu avais vu sur Google, c'était juste le cache de la page de résultats Google, pas le site lui-même — ça se met à jour tout seul avec le temps).

## 2. "Il n'y a pas de Zuri Academy"

En fait, **Zuri Academy est bien présente** sur le site : c'est une des cartes de la section "Services" (celle avec l'intitulé "Formation"). Mais je pense avoir trouvé pourquoi elle a pu sembler absente : dans le footer, le lien "Zuri Academy" ne menait nulle part (`href="#"`, un lien resté vide). Je l'ai corrigé pour qu'il pointe vraiment vers la carte Zuri Academy dans la section Services — en cliquant dessus, on y arrive directement maintenant.

Si ce que tu voulais, c'est une vraie page ou section dédiée à Zuri Academy (et pas juste une carte parmi les 6 services), dis-le-moi et je peux te proposer quelque chose de plus développé.

## Fichiers dans ce dossier

- `app/page.tsx` — remplace le fichier existant (header : classe `nav-actions`/`nav-join` ; carte Services "Formation" avec un id `zuri-academy` ; lien footer "Zuri Academy" corrigé)
- `app/globals.css` — remplace le fichier existant (nouvelles règles `.nav-actions` + media queries mobile pour le header)

## Comment l'appliquer

1. Dans le repo GitHub `zuriagency`, remplace `app/page.tsx` et `app/globals.css` par les versions de ce dossier.
2. Commit + push sur la branche principale → Vercel redéploie automatiquement.

Testé : `npx tsc --noEmit` passe sans erreur, et le rendu a été vérifié par capture d'écran sur mobile (375px, 390px) et desktop (700px, 1440px) avant livraison.
