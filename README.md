# Zuri Agency

Site vitrine Zuri Agency, codé en Next.js 16 (App Router) + TypeScript. Pas de Tailwind : CSS classique dans `app/globals.css`, mêmes tokens que la maquette validée (palette punchy, ticker défilant, cartes bordées noir).

## Structure

```
app/
  layout.tsx        → polices (Archivo Black, Inter, Space Mono) + montage de la modale contact
  page.tsx           → toute la page (hero, manifeste, roster, services, process, join, footer)
  globals.css         → tous les styles, repris de la maquette
  api/contact/route.ts → route API qui envoie le formulaire par email (Resend)
components/
  ContactModal.tsx    → la popup de contact (montée une seule fois, dans layout.tsx)
  ContactButton.tsx   → bouton réutilisable qui ouvre la modale (nav, CTA "rejoindre")
  ContactLink.tsx      → lien texte qui ouvre la modale (footer)
  Ticker.tsx           → bandeau défilant en haut de page
```

## Lancer en local

```bash
npm install
npm run dev
```

Le site tourne sur http://localhost:3000

## Faire fonctionner le formulaire de contact (Resend)

Le formulaire appelle `/api/contact`, qui envoie un vrai email via [Resend](https://resend.com) (le même service que celui déjà utilisé sur OPetitStade).

1. Crée un compte Resend si besoin, et récupère une clé API sur https://resend.com/api-keys
2. Copie `.env.example` en `.env.local` et renseigne :
   - `RESEND_API_KEY` : ta clé Resend
   - `CONTACT_TO_EMAIL` : l'adresse qui doit recevoir les messages (ex: contact@zuriagency.fr)
   - `CONTACT_FROM_EMAIL` : l'adresse d'expédition. Pour que ça marche sans "sandbox mode", il faut un domaine vérifié dans Resend (comme zuriagency.fr, une fois les DNS configurés côté Resend). En attendant, tu peux laisser `onboarding@resend.dev` pour tester.
3. Redémarre le serveur (`npm run dev`) après avoir ajouté les variables.

Sans `RESEND_API_KEY`, la route renvoie une erreur propre (affichée dans la popup) plutôt que de planter silencieusement.

## Déployer sur Vercel

1. Pousse ce dossier sur un repo GitHub (ex: `zuri-agency`)
2. Importe le repo dans Vercel
3. Dans les réglages du projet Vercel, ajoute les 3 variables d'environnement ci-dessus (Production + Preview)
4. Deploy. Le formulaire de contact enverra alors de vrais emails.

## Ce qui reste à faire, quand tu seras prêt

- Remplacer les 7 "places libres" du roster par les vrais talents une fois signés
- Brancher un vrai lien Instagram / TikTok (actuellement `#`)
- Éventuellement, connecter le formulaire du CTA final ("Déposer ma candidature") à un vrai formulaire structuré plutôt qu'un lien `mailto:`
- Nom de domaine + DNS Resend pour pouvoir envoyer depuis `@zuriagency.fr`
