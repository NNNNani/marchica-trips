# Rapport d'audit — Marchica Trips (branche `hsv1`)

Date de l'audit : 14 octobre 2026.
Auditeur : agent (revue desktop, largeur 1440 px).
Périmètre : `index.html` (Accueil), `src/html/actevitiy.html` (Activités), `src/html/reservation.html` (Réservation).

## 1. Pages et maquettes analysées

| Page | Fichier | Maquette de référence (`referance/`) |
|---|---|---|
| Accueil | `index.html` | `WhatsApp Image 2026-10-14 at 10.51.35 (1).jpeg` (hero kayak, 4 cartes, section authentique, bannière lagune, témoignages, newsletter, footer) |
| Activités | `src/html/actevitiy.html` | `WhatsApp Image 2026-10-14 at 10.51.36 (1).jpeg` (hero, pills de filtres, 4 cartes, vedette Kayak, témoignages, CTA, footer) |
| Réservation | `src/html/reservation.html` | Aucune maquette (page créée par cohérence avec l'identité visuelle) |
| Contact / À propos | hors périmètre | `...10.51.35.jpeg` et `...10.51.36.jpeg` (contexte navigation/footer uniquement) |

Méthode : relecture intégrale des 3 fichiers HTML + `src/css/style.css`, inventaire des images
(dimensions réelles lues via `System.Drawing`), build `npm run build` OK, puis captures
d'écran réelles des pages servies par `vite preview` (Edge headless, 1440 px) comparées
pixel par pixel aux maquettes affichées.

## 2. Différences visuelles, section par section

### 2.1 Éléments conformes (rien à corriger)

- **Navbar** : fond `#0a3542`, logo + « MARCHICA TRIPS », 4 liens (Accueil, Activités,
  À propos, Contact), icône loupe + bouton « Réserver ». Ordre, libellés et page active
  soulignée conformes sur les 3 pages.
- **Footer** : 4 colonnes (marque + slogan, liens utiles, réseaux, adresse Nador /
  e-mail / téléphone) + barre copyright. Conforme sur les 3 pages.
- **Accueil** : hero + 3 stats, 4 cartes d'activités, section « Une expérience
  authentique et locale » (2 × 2), bannière « La lagune de Marchica », 3 témoignages,
  bande newsletter. Nombre, ordre et hiérarchie conformes.
- **Activités** : hero + mini-stats, pills de filtres, grille de cartes, vedette
  « Kayak dans la lagune », témoignages, CTA « Réservez votre prochaine aventure ».
  La grille compte **8 cartes au lieu de 4** : extension volontaire pour valoriser les
  8 photos d'activités du projet (les 4 premières = la maquette à l'identique).
- **Réservation** : pas de maquette ; structure hero + étapes, formulaire 2 colonnes,
  aside infos/engagements, CTA. Cohérente avec l'identité (mêmes header/footer,
  tokens et composants).
- **Couleurs et polices** : `#0a3542` (header/footer), fond crème `#faf7f1`,
  encre `#0b3442`, étoiles `#f2a11d`, `Plus Jakarta Sans` (Google Fonts + fallback
  système). Conformes à la maquette.

### 2.2 Écarts constatés

| # | Élément | Maquette | Site actuel | Correction |
|---|---|---|---|---|
| C1 | Favicon | — | `public/favicon.ico` fait **0 octet** (référencé dans les 3 pages) | Pointer l'icône vers `/images/logo.svg` (SVG valide existant) |
| C2 | Contraste boutons | Texte blanc sur teal | `#ffffff` sur `#0e8aa0` = **4,07:1 < 4,5 (échec WCAG AA)** — concerne `.btn-primary`, pill actif, bande newsletter | Assombrir le teal en `#0b6e81` (**5,90:1**, déjà dans la palette) |
| C3 | Pages coéquipiers liées | — | `apropos.html`, `faq.html`, `detail-actevity.html` = **0 octet** (liens corrects mais cibles vides) | Hors périmètre : signalé, liens conservés tels quels |
| I1 | Bannière « Destination phare » (Accueil) | Panorama lagune au coucher du soleil, net | `tivity7.jpg` **236×303 px étirée sur ~1136×260 px** (flou, gros plan paddle) | Bannière → `hero_actevity.jpg` (1365×768, sujet = maquette) ; carte « Kayak » → `tivity7.jpg` (affichée ~250 px, nette, sujet kayak) |
| I2 | Avatars témoignages | Portraits photo | Photos d'activités recadrées en rond | Aucun portrait disponible dans `public/` ; conservé (écart assumé, voir §6) |
| I3 | Poids hero | — | `hero_actevity.jpg` = **781 Ko** (LCP : hero + réutilisations) | Optimisation (recompression/redimensionnement) impossible avec les outils installés → action manuelle recommandée (§6) |
| M1 | Icônes réseaux (footer) | Vraies icônes | Glyphes texte (`f ◉ ▶ ♪`) avec `aria-label` | Accepté : lisible et accessible ; non bloquant desktop |
| M2 | « Trier par » (Activités) | Menu déroulant | Texte statique | Pas de tri sans JS (contrainte projet) ; conservé |
| M3 | Pills de filtres | Filtres actifs | Tous les pills pointent vers la même page (pas de filtrage sans JS) | Contrainte projet ; conservé, le pill « Tous » reste l'état actif |
| M4 | Formulaires | — | `action="#"` (newsletter + réservation) : aucune destination réelle | Normal en site statique ; backend à prévoir (voir §6) |
| M5 | Prix / durées / compteurs d'avis | Maquette Activités affiche prix, durées, « (245 avis) » | Volontairement **omis** (consigne : ne rien inventer) | Écart assumé, à lever avec de vraies données métier |
| M6 | Liens sociaux `href="#"` | — | Placeholders | À remplacer par les vraies URL quand elles existent |

Vérifié sans problème : un seul CSS (`src/css/style.css`), aucun JS personnalisé,
contrastes `#0b6e81`/`#faf7f1` (5,51), `#57707a`/blanc (5,24), `#23434f`/`#faf7f1`
(9,88), blanc/`#0a3542` (13,12) — tous AA.

## 3. Images : inventaire complet

Légende : `nom | poids | dimensions | statut | utilisation`.

| Fichier | Poids | Dimensions | Statut | Utilisation |
|---|---|---|---|---|
| `hero_actevity.jpg` | 781 Ko | 1365×768 | valide | hero ×3 pages, carte Kayak, CTA Activités |
| `acitivite1.jpg` | 59 Ko | 735×573 | valide | Observation oiseaux |
| `acteviti2.jpg` | 94 Ko | 736×1308 (portrait) | valide | Détente plage (crop CSS OK) |
| `actevitie3.jpg` | 173 Ko | 736×875 (portrait) | valide | Équitation + avatar |
| `actevity4.jpg` | 85 Ko | 483×720 (portrait) | valide | Bateau + avatar + aside réservation |
| `actevity5.jpg` | 201 Ko | 736×981 (portrait) | valide | Section « authentique » + CTA réservation |
| `actevity6.jpg` | 137 Ko | 736×1104 (portrait) | valide | Quad + avatar |
| `actevity8.jpg` | 49 Ko | 300×450 (portrait) | valide | Paddle + vedette Activités |
| `tivity7.jpg` | 12 Ko | 236×303 | valide mais **trop petite pour la bannière** | Bannière Accueil (→ remplacer, voir I1) |
| `logo.svg` | 534 o | vectoriel | valide | logo ×3 pages (+ favicon après C1) |
| `bateau.jpg` | 0 o | — | **vide** | non référencé, conservé (voir §6) |
| `cuisine.jpg` | 0 o | — | **vide** | non référencé, conservé |
| `gourougou.jpg` | 0 o | — | **vide** | non référencé, conservé |
| `hero-bg.jpg` | 0 o | — | **vide** | non référencé, conservé |
| `kayak.jpg` | 0 o | — | **vide** | non référencé, conservé |
| `favicon.ico` | 0 o | — | **vide** | référencé ×3 (→ C1) |

Tous les chemins `/images/...` référencés existent. Aucune image dupliquée sur disque.
Aucune image inadaptée au sujet (oiseaux→faune, quad→piste, bateau→lagune,
cheval→équitation, montagne→Gourougou, volley→plage). Aucun téléchargement externe
nécessaire : le stock existant couvre tous les besoins.

## 4. Liens : vérification

| Lien | Destination | Résultat |
|---|---|---|
| Nav Accueil / logo / footer Accueil | `/index.html` | OK (200 en preview) |
| Nav + boutons Activités | `/src/html/actevitiy.html` | OK (200) |
| Boutons Réserver / CTA | `/src/html/reservation.html` | OK (200) |
| Nav À propos | `/src/html/apropos.html` | chemin OK, **page vide 0 o** (coéquipier) |
| Nav Contact / footer | `/src/html/faq.html` | chemin OK, **page vide 0 o** (coéquipier) |
| Boutons « Découvrir » | `/src/html/detail-actevity.html` | chemin OK, **page vide 0 o** (coéquipier) |
| CSS | `/src/css/style.css` | OK (bundle `assets/style-*.css`) |
| Images | `/images/*` | toutes OK sauf favicon (C1) |
| Ancres `#contenu` | skip-link + `main id` | OK ×3 pages |
| `mailto:` / `tel:` | contact@marchicatrips.com / +212… | syntaxe OK |
| Sociaux `href="#"`, formulaires `action="#"` | placeholders | signalés (M4, M6) |
| Loupe → page Activités | pas de vraie recherche | accepté (M3) |

Aucun lien cassé dans mon périmètre. Aucune page inventée.

## 5. Priorités et plan de correction

1. **Critique** : C1 (favicon), C2 (contraste boutons/bandeau), C3 (signalement coéquipiers, sans toucher).
2. **Important** : I1 (bannière floue + permutation d'images).
3. **Mineur** : le reste est documenté et assumé (M1–M6, I2–I3).
4. Rebuild + re-captures + mise à jour du présent rapport, puis commit local unique
   (sans `referance/`, sans `.vscode/`, sans pages coéquipiers).

## 6. Statut des corrections et vérifications finales

> Section mise à jour après corrections le 14/10/2026.

### Corrigé

- [x] **C1** — favicon : les 3 pages référencent désormais
  `<link rel="icon" type="image/svg+xml" href="/images/logo.svg" />`
  (`public/favicon.ico` vide laissé intact, non référencé).
- [x] **C2** — contraste : `--color-primary` passe de `#0e8aa0` à `#0b6e81`
  (blanc → **5,90:1**), hover via `color-mix()` (pas de teinte arbitraire),
  bande newsletter `#0e8aa0` → `#0b6e81`. Teal toujours conforme à la maquette.
- [x] **I1** — Accueil : bannière « Destination phare » → `hero_actevity.jpg`
  (sujet = maquette, nette) ; carte « Kayak » → `tivity7.jpg`
  (236 px affichés ~250 px, sujet kayak, nette). Alts mis à jour.
- [x] Rebuild `npm run build` : **succès** (détail ci-dessous).
- [x] Re-captures Edge des 3 pages : bannière nette, boutons plus profonds,
  favicon SVG chargé (plus de 404), aucune régression.

### Fichiers modifiés

- `index.html` (favicon, newsletter, bannière, carte Kayak)
- `src/html/actevitiy.html` (favicon)
- `src/html/reservation.html` (favicon)
- `src/css/style.css` (`--color-primary`, hover `color-mix`)
- `AUDIT_REPORT.md` (créé puis mis à jour)

### Résultat du build

`vite v7.3.7 — 7 modules, built in ~240ms` :
`index.html` (22,3 Ko), `src/html/actevitiy.html` (25 Ko),
`src/html/reservation.html` (15,3 Ko), `assets/style-*.css` (~7 Ko).
Pages coéquipiers toujours à 0,00 Ko (vides, hors périmètre).

### Restant (nécessite une intervention extérieure)

- **Pages coéquipiers vides** (`apropos.html`, `faq.html`, `detail-actevity.html`) :
  à eux de les remplir ; mes liens sont prêts.
- **Poids de `hero_actevity.jpg` (781 Ko)** : à recompresser (outil type Squoosh/cwebp)
  sans dégrader le visuel ; impossible avec les seuls outils du projet.
- **Données métier réelles** (prix, durées, avis, URL réseaux, destination formulaires) :
  à fournir pour lever les écarts assumés M4/M5/M6.
- **Fichiers 0 octet** (`bateau/cuisine/gourougou/hero-bg/kayak.jpg`, `favicon.ico`) :
  laissés intacts — à supprimer ou remplacer en accord avec l'équipe.
- **Portraits témoignages** : aucune photo de portrait dans le projet ; en attente de
  visuels fournis ou d'une décision (initiales stylisées envisageables).

## 7. Mission images — diagnostic des chemins (14/10/2026)

### 7.1 Arborescence réelle inspectée

Dossier unique : **`public/images/`** (le dossier `public/image/` **n'existe pas**).
16 fichiers, mêmes noms et même casse que dans le HTML : `logo.svg` (534 o),
`hero_actevity.jpg` (781 Ko, 1365×768), `tivity7.jpg` (12 Ko, 236×303), `acitivite1.jpg`,
`acteviti2.jpg`, `actevitie3.jpg`, `actevity4/5/6/8.jpg` (valides) + 5 fichiers
**de 0 octet** non référencés (`bateau`, `cuisine`, `gourougou`, `hero-bg`, `kayak.jpg`)
et `public/favicon.ico` (0 o, plus référencé depuis la correction C1).

### 7.2 Comparaison code ↔ fichiers réels

- 37 références relevées (3 pages HTML + `src/css/style.css`) : **toutes** en
  `/images/...` ou `/src/css/style.css`. Aucune `srcset`, **aucune `url(...)` d'image
  en CSS** (seule exception : l'import Google Fonts, vérifié aussi dans le CSS compilé
  `dist/assets/style-*.css`).
- Aucun écart de casse, aucune extension erronée, **aucun chemin à corriger** : la règle
  Vite imposée (`public/images/photo.jpg` → `/images/photo.jpg`) est déjà respectée.

### 7.3 Tests HTTP réels (cause racine prouvée)

| Contexte de service | `/src/css/style.css` | `/images/hero_actevity.jpg` | Images rendues ? |
|---|---|---|---|
| **Vite dev** (`npm run dev`, ports 5211/5222) | 200 | **200** | **OUI — 3 pages vérifiées en navigateur** |
| **Vite preview** (`npm run preview`, port 5210) | 200 | **200** | OUI |
| **Serveur statique simple, racine du projet** (simulé, port 5321) | **200** | **404** | NON |
| **Double-clic `file://`** | échec (`file:///src/...`) | 404 | NON |

**Cause racine** : `public/` n'est mappé sur l'URL racine (`/images/…`) que par **Vite**.
Un serveur statique quelconque (Live Server, ouverture directe) sert le disque tel quel,
où les fichiers sont à `/public/images/…` → **404 images alors que `/src/css/style.css`
répond 200** (le dossier `src/` existe réellement à la racine). Ce delta reproduit
exactement le symptôme décrit : « les images ne s'affichent pas alors que les fichiers
existent », sans erreur de style — d'où l'absence de plainte sur le CSS.

Confirmé aussi : aucun déploiement (workflow absent, `github.io/marchica-trips` → 404),
branche `main` contient bien les images, aucun second projet parent, et **en mode dev
Vite sert les URL en absolu quel que soit `base`** (le réglage ci-dessous n'affecte donc
que le build).

### 7.4 Corrections apportées

- `vite.config.js` : ajout de `base: './'` → le build `dist/` génère des chemins relatifs
  (`./images/…` à la racine, `../../images/…` depuis `src/html/`) : le build fonctionne
  désormais depuis n'importe quel sous-dossier et en `file://` (images), **sans changer
  une seule occurrence `/images/...` dans le HTML** (règle Vite respectée).
- `README.md` : URLs périmées remplacées par les vraies (`/html/activites.html` →
  `/src/html/actevitiy.html`, etc.) — en dev ces URL renvoyaient 200 mais servaient la
  **page Accueil** (fallback SPA), et **404 en build** ; avertissement ajouté sur
  l'usage obligatoire de Vite.

### 7.5 Vérifications finales réelles

- `npm run build` : **succès** (7 modules, `assets/style-*.css` ≈ 7,2 Ko).
- HTTP après rebuild (dev) : 8 URL testées (`/`, 2 pages, 5 images) → **toutes 200**.
- Navigateur (Edge headless, 1440 px) sur les 3 pages servies par Vite :
  **toutes les images s'affichent** (hero, cartes, bannière, avatars, aside, logo).
- `dist/images/` contient les 15 fichiers copiés depuis `public/images/`.

### 7.6 Différence restante

Aucune erreur de chemin ne subsiste dans le code. **Si des images restaient invisibles
sur ta machine alors que `npm run dev` tourne**, ce ne peut plus être le code : restent à
vérifier de ton côté (1) le port/URL réellement ouvert (le README périmé pointait une URL
renvoyant la page Accueil), (2) un serveur dev lancé depuis un autre dossier ou resté
ouvert avant mes corrections, (3) un rafraîchissement forcé Ctrl+F5 contre le cache du
favicon/logo qui étaient en 0 octet à l'origine, (4) une extension bloqueuse d'images.
