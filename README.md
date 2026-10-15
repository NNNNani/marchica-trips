# Marchica Trips

Site responsive et accessible pour découvrir les activités de la lagune de Marchica, à Nador. Le projet utilise Vite et Tailwind CSS v4 ; le thème partagé et ses composants sont définis dans `src/css/style.css`.

## Installation et développement

```bash
npm install
npm run dev
npm run build
npm run preview
```

Vite sert le site à l'adresse indiquée dans le terminal (par défaut `http://localhost:5173`). Le build de production est généré dans `dist/`.

## Pages

- `/` — Accueil
- `/html/activites.html` — Les huit activités
- `/html/detail-activite.html` — Détail du kayak au coucher du soleil
- `/html/reservation.html` — Demande de réservation
- `/html/faq.html` — Questions fréquentes

## Design System

Les couleurs, familles typographiques, espacements de contenu et rayons personnalisés sont déclarés dans `@theme` dans `src/css/style.css`. Les pages réutilisent les mêmes composants de navigation, boutons, cartes et contrôles de formulaire. La mise en page est mobile-first et la grille des activités passe à deux colonnes à `md` et quatre à `lg`.

## Accessibilité

Les pages proposent un lien d'évitement, une navigation clavier avec focus visible, des liens actifs indiqués par `aria-current`, un menu mobile natif avec `<details>`, des libellés associés aux champs et une FAQ en `<details>/<summary>`. Aucun JavaScript n'est nécessaire.

Le projet est préparé pour un déploiement statique sur Netlify, Vercel ou GitHub Pages. Configurez la commande `npm run build` et le répertoire de publication `dist/` auprès de la plateforme choisie.

Les activités, tarifs, durées et retours affichés sont des exemples de maquette à confirmer par l’agence. Le formulaire valide les champs dans le navigateur, mais n’envoie pas encore les demandes à un service.
