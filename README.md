# marchica-trips
Responsive and WCAG AA accessible website redesign for Marchica Trips (Nador, Morocco). Built with Tailwind CSS v4 &amp; Vite.

## Démarrage

```bash
npm install
npm run dev      # serveur local : http://localhost:5173
npm run build    # build production dans dist/
npm run preview  # prévisualiser le build
```

Pages (URLs réelles servies par Vite) :

| Page | URL |
|---|---|
| Accueil | `/src/html/index.html` (ou `/`, redirigé) |
| Activités | `/src/html/actevitiy.html` |
| Détail activité | `/src/html/detail-actevity.html` |
| Réservation | `/src/html/reservation.html` |
| Contact | `/src/html/contact.html` |
| À propos | `/src/html/apropos.html` |
| FAQ | `/src/html/faq.html` |

> ⚠️ Les fichiers HTML doivent être ouverts **via Vite** (`npm run dev` ou `npm run preview`), jamais en double-clic (`file://`) : les chemins commençant par `/` ne se résolvent pas hors d'un serveur HTTP.
> Vite mappe le dossier `public/` sur la racine d'URL : `public/images/photo.jpg` → `/images/photo.jpg`.

> Images : placez les photos d'activités dans `public/images/` et référencez-les en `/images/...`
> (ex. `actevitiy.html`). Les fichiers de 0 octet (`bateau.jpg`, `cuisine.jpg`, `gourougou.jpg`,
> `hero-bg.jpg`, `kayak.jpg`) sont invalides et ne sont référencés par aucune page.

> **Crédit photo** — `public/images/lagune-marchica.jpg` (hero de la page Contact) représente la
> lagune de Marchica (Mar Chica) à Nador, au coucher de soleil. Photo de **Houssain tork**, licence
> **CC BY-SA 4.0**, publiée sur [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Lagune_Marchica.jpg)
> et recadrée pour le hero. Le crédit est également affiché sous la photo. Aucune autre image du
> dossier `public/images/` n'a été ajoutée ni modifiée.

> La page Accueil vit dans `src/html/index.html` : `vite.config.js` la déclare en entrée `main`,
> `public/index.html` redirige la racine `/` vers elle, et un middleware conserve `/` fonctionnel
> en dev. Les liens « Accueil » des 3 pages pointent vers `/src/html/index.html`.
