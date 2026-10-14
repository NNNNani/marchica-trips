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

## 8. Mission vérification Desktop + animations (14/10/2026)

### 8.1 Recherche du brief du professeur — NON TROUVÉ

Recherche exhaustive, **aucun brief original dans le projet** :

- fichiers `.md/.txt/.pdf/.docx` : seuls `README.md`, `AUDIT_REPORT.md`,
  `.github/PULL_REQUEST_TEMPLATE.md` (0 o) ;
- historique Git (`--all`, tous les chemins, fichiers supprimés) : aucun `brief`,
  `consigne`, `sujet`, `cahier` n'a jamais existé ;
- branche `main`, `git stash` (vide) : rien de plus ;
- issues GitHub du dépôt : **0 ouverte, 0 fermée**.

Le brief n'a donc **pas** été consulté — il n'existe pas en clair ici, je ne l'ai pas
reconstitué de mémoire. La vérification s'est appuyée sur ce qui existe réellement :
le `README.md` (« Responsive and WCAG AA accessible website redesign », Tailwind CSS v4
& Vite), les 4 maquettes de `referance/`, et les contraintes énoncées dans la mission.
**À fournir si tu veux une conformité mot à mot au document du prof.**

### 8.2 Déplacement préexistant de `index.html` (décision validée)

Constat initial hors de mes actions : `index.html` avait été **déplacé** de la racine
vers `src/html/index.html` (non commité), ce qui cassait `npm run build`
(« Could not resolve entry module index.html ») et laissait 9 liens `/index.html` orphelins.
Validation demandée puis accord : **on garde le fichier dans `src/html/`**.

Corrections appliquées :

| Fichier | Correction |
|---|---|
| `vite.config.js` | entrée `main` → `src/html/index.html` |
| `src/html/index.html` | 3 liens `/index.html` → `/src/html/index.html` |
| `src/html/actevitiy.html` | 3 liens (logo, nav, footer) |
| `src/html/reservation.html` | 3 liens (logo, nav, footer) |
| `public/index.html` | **créé** : redirection HTML sans JS (`meta refresh`) vers la page Accueil |
| `vite.config.js` | middleware `racine-vers-accueil` : `/` → `/index.html` **en dev uniquement** |
| `README.md` | URL Accueil mise à jour + note sur l'emplacement |

Sans ces deux derniers points, la racine `/` — l'URL que Vite imprime au lancement —
renvoyait **404**. Aucun JavaScript personnalisé ajouté (le meta-refresh est du HTML,
le middleware est de la configuration Vite).

### 8.3 Header / footer — déjà harmonisés, aucune correction

Comparaison bloc par bloc des 3 pages (`<header>…</header>`, `<footer>…</footer>`) :

- **Footers** : strictement identiques sur les 3 pages (2 803 o, comparaison `==` → `True`).
- **Headers** : identiques hors état actif. Différences mesurées :
  - `index.html` → `actevitiy.html` : **2 lignes**, uniquement le déplacement de
    `aria-current="page"` (Accueil → Activités) ;
  - `index.html` → `reservation.html` : **2 lignes**, `aria-current` sur Accueil puis sur le bouton Réserver.
- **Lien header + footer** : les **mêmes 17 liens dans le même ordre** sur les 3 pages.
- `aria-current="page"` : **exactement 1** par page.
- `<title>` et `<meta description>` diffèrent — c'est normal et souhaité (SEO propre à chaque page).

→ **Aucun écart de logo, couleur, typographie, dimension, espacement ou structure.**
Le brief autorisant l'État actif à varier, **rien à corriger** ici.

### 8.4 Animations des cartes d'activités

Portée : **8 cartes d'activités uniquement** (`src/html/actevitiy.html`), via une nouvelle
classe `card-activity` ajoutée au `<li class="card">`. Les 3 cartes témoignages
(`<li class="card" style=…>`) et les cartes des autres pages **ne sont pas touchées** —
vérifié : 8 cartes animées, `card-activity` absent de `index.html` et `reservation.html`.

Ajout dans `src/css/style.css` (le seul CSS personnalisé) :

| Effet | Valeur |
|---|---|
| Élévation | `translateY(-4px)` |
| Ombre | `0 8px 24px rgba(10,53,66,.06)` → `0 14px 30px rgba(10,53,66,.14)` |
| Transition | `0.18s ease` (transform + box-shadow) |
| Zoom image | `scale(1.04)` en `0.3s ease` |
| Focus | `:focus-visible` du bouton → contour `3px var(--color-primary)` offset `3px` |
| Focus clavier | `:focus-within` → la carte s'élève comme au survol |
| `prefers-reduced-motion` | transitions à `0s`, `transform: none` — **l'ombre de feedback est conservée** |

Aucune structure, dimension ni mise en page modifiées.

### 8.5 Tests réellement exécutés

**Build** — `npm run build` : **succès**, 7 modules ; pages coéquipiers toujours 0,00 Ko.
`assets/style-*.css` : **7,20 Ko** avant les animations → **7,94 Ko** avec elles (+0,74 Ko).

> Observation mesurée : une fois ce §8 écrit, le build remonte à **8,59 Ko**.
> **Tailwind v4 scanne aussi les fichiers `.md`** du projet et génère depuis ce rapport
> des utilitaires que les pages n'utilisent pas. Preuve : en retirant temporairement
> `AUDIT_REPORT.md`, le CSS retombe à **exactement 7,94 Ko** (même hash
> `style-Dz8eH4sr.css`). Aucune page n'est affectée — les utilitaires réels proviennent
> des `.html`, qui restent scannés. Correctif d'une ligne, si tu le souhaites :
> `@source not "**/*.md";` dans `src/css/style.css` — **non appliqué ici**, hors périmètre
> de cette mission.

**HTTP (dev, port 5233)** — 7 URL testées → **toutes 200** :
`/`, `/index.html`, les 3 pages, `/images/logo.svg`, `/src/css/style.css`.

**Navigateur — captures 1440 px** (Edge headless) :
`v2-index.png`, `v2-activites.png`, `v2-reservation.png` → tailles
**octet-à-octet identiques** aux captures prises avant modification
(2 307 842 / 2 311 365 / 1 386 335 o) ⇒ **aucune régression visuelle**.
La racine `/` ouvre bien la page Accueil (capture `racine.png`).

**Comportement réel des animations** — mesuré via Chrome DevTools Protocol sur Edge
(`CSS.forcePseudoState`, aucune dépendance installée) :

```
[1] AU REPOS        carte transform:none   ombre:0 8px 24px rgba(10,53,66,.06)  img:none  transition:0.18s
[2] :HOVER          carte transform:matrix(1,0,0,1,0,-4)  ombre:0 14px 30px rgba(10,53,66,.14)
                    img transform:matrix(1.04,0,0,1.04,0,0)
[3] :FOCUS-VISIBLE  outline:3px solid rgb(11,110,129)   carte(:focus-within):matrix(...,-4)
[4] REDUIT MOTION   transform:none  img:none  transition:0s none  + ombre conservée
```

**Images et liens des 3 pages** (même session navigateur) :

| Page | Images | Cassées | Anciens liens `/index.html` | header | footer |
|---|---|---|---|---|---|
| `index.html` | 12 | **0** | 0 | ✔ | ✔ |
| `actevitiy.html` | 16 | **0** | 0 | ✔ | ✔ |
| `reservation.html` | 5 | **0** | 0 | ✔ | ✔ |

### 8.6 Réserve honnête

- Le **brief du professeur n'a pas pu être consulté** (absent du projet) : la conformité
  n'est établie que par rapport au README, aux maquettes et aux contraintes de la mission.
- Pages coéquipiers non modifiées, toujours vides (0 o).
- Liens `#` (réseaux sociaux, formulaire) et prix/durées : toujours en attente de données réelles.
- Version mobile : non développée, comme demandé.

## 9. Mission page Contact (14/10/2026)

### 9.1 Fichiers créés / modifiés

| Fichier | Rôle |
|---|---|
| `src/html/contact.html` | **créé** — nouvelle page Contact (12,06 Ko en build) |
| `src/html/index.html` | lien « Contact » réorienté (nav + footer) + lien « FAQ » ajouté au footer |
| `src/html/actevitiy.html` | idem |
| `src/html/reservation.html` | idem |
| `vite.config.js` | entrée `contact` ajoutée au build multipage |
| `README.md` | ligne Contact ajoutée ; étiquette FAQ corrigée |
| `AUDIT_REPORT.md` | ce §9 |

Aucune page du coéquipier (`apropos`, `faq`, `detail-actevity`) modifiée : **ni contenu,
ni structure, ni emplacement**. `faq.html` reste une page totalement indépendante.
`public/images/` : **aucun fichier ajouté ni supprimé**, images existantes réutilisées.

### 9.2 Redirection du lien « Contact » (point d'attention)

Le nav comportait **déjà** un lien libellé « Contact », mais il pointait vers
`/src/html/faq.html` (page du coéquipier, vide). **6 références** au total
(nav + footer × 3 pages), toutes libellées « Contact », ont été réorientées vers
`/src/html/contact.html` — **nav et footer**, pour éviter qu'un même libellé mène
à deux destinations différentes. Les footers restent donc **strictement identiques**
sur les 4 pages (vérifié). Les autres liens et leurs états actifs sont conservés.

Conséquence, puis correction : ce faisant, `faq.html` était temporairement devenu orphelin.
**Lien rétabli** — un item « FAQ → `/src/html/faq.html` » a été ajouté **au footer** des
4 pages (nav conservé à 4 entrées conformes aux maquettes). Les footers restent donc
**strictement identiques** sur les 4 pages (liste de liens comparée octet à octet).
`faq.html` est ainsi accessible depuis le site **sans qu'aucun de ses contenus n'ait été
touché, déplacé ni fusionné**.

### 9.3 Identité de la page — distincte de Réservation

| | Réservation | Contact |
|---|---|---|
| Hero | photo pleine largeur + dégradé crème, 3 étapes | **fond marine `#0a3542`**, texte + photo arrondie, accent doré |
| Corps | grille `1.5fr 1fr` (formulaire large à gauche) | **formulaire centré** (`max-width:760px`) |
| Champs | 7 (tél, activité, date, participants…) | **5** : nom, ville, e-mail, sujet, message |
| Clôture | bandeau CTA photo pleine largeur | la page se termine sur le formulaire |
| Sections | hero + corps + CTA | **3** : hero, coordonnées, formulaire |

**Périmètre volontairement restreint** (consigne explicite) : la page Contact ne contient
**que** l'introduction, les informations de contact et le formulaire de prise de contact.
**Aucune section FAQ n'y figure** et aucun contenu de `faq.html` n'y a été repris ou déplacé.

Aucune date, heure, participant, activité à réserver ni prix.
Palette respectée : `#0a3542`, `#0b6e81`, `#faf7f1`, **`#f2a11d`** (accent doré sobre
dans le hero — dans le reste du projet l'or n'était utilisé que pour les étoiles d'avis).

**Coordonnées** : uniquement des données **déjà présentes** dans le projet
(`contact@marchicatrips.com`, `+212 6 12 34 56 78`, `Nador, Maroc`, « du lundi au
samedi — 9 h à 18 h », « réponse sous 24 h » — reprises de `reservation.html` et du
footer). **Aucun numéro, e-mail, adresse ou horaire inventé.**

### 9.4 Tests réellement exécutés

**Build** : `npm run build` → **succès, 8 modules** (7 → 8) ;
`dist/src/html/contact.html` présent (**12 062 o**). CSS inchangé (8,59 Ko, même hash `style-Dnktqw8-.css`).

**HTTP (dev, port 5244)** : pages, logo et CSS → **toutes 200** ; `POST` vers la page
(equivalent d'une soumission) → **200** (voir §9.5).

**Images & liens (audit navigateur réel, les 4 pages)** :

| Page | Images | Cassées | h1 | h2 | header/footer | `aria-current` nav |
|---|---|---|---|---|---|---|
| `index.html` | 12 | **0** | 1 | 7 | ✔ / ✔ | Accueil |
| `actevitiy.html` | 16 | **0** | 1 | 6 | ✔ / ✔ | Activités |
| `reservation.html` | 5 | **0** | 1 | 6 | ✔ / ✔ | *(sur le bouton « Réserver », comportement préexistant)* |
| `contact.html` | 3 | **0** | 1 | 4 | ✔ / ✔ | Contact |

**`<details>` (accordéons FAQ) présents dans `contact.html` : 0** — consigne respectée.
**Composition de la page** : 3 sections seulement — `hero` → `coordonnées` → `formulaire`.
Hiérarchie : `H1` → `H2 Plusieurs façons de nous parler` → `H3 Par e-mail / Par téléphone / Sur place`
→ `H2 Envoyez-nous un message` (aucun saut de niveau).

**Footer identique sur les 4 pages** : même liste de liens, dans le même ordre —
`Accueil · Activités · À propos · Contact · FAQ` + réseaux + coordonnées.

**9 URL internes testées → toutes 200**, dont `/src/html/contact.html` et `/src/html/faq.html`.

**Formulaire (mesuré via CDP)** :
- **5 champs, 5/5 obligatoires**, **0 champ sans `label` associé** (`for`/`id`), **0 champ réservé** ;
- `autocomplete` : `name`, `address-level2`, `email` ; `aria-describedby` sur `nom`, `email`, `message` ;
- options sujet : `Choisissez un sujet | Demande d'information | Question sur une activité | Partenariat | Autre` ;
- bouton : `Envoyer le message` ;
- **28 éléments focusables**, ordre de tabulation logique (skip-link en tête, puis nav, hero,
  coordonnées, **5 champs**, envoi, footer) ;
- `#email` invalide rejeté ✔ ; formulaire vide rejeté ✔ ;
- **`minlength` vérifié avec une vraie frappe clavier** (`Input.dispatchKeyEvent`) :
  `#message` = « abc » → `checkValidity()=false`, message natif
  « Allongez ce texte jusqu'à 10 caractères ou plus (vous utilisez actuellement 3 caractères) » ;
  `#nom` = « A » → `false` (« …2 caractères ou plus… ») ; formulaire complet saisi au clavier → `true`.
  *Précision méthodologique : une affectation programmatique (`.value =` en JS) ne déclenche pas
  `minlength` selon le spec HTML (« dirty value flag ») — un premier test écrit en JS donnait
  donc un faux négatif, ce n'est pas un défaut du formulaire.*

**Non-régression (captures 1440 px, valeurs réelles)** :

| Page | Avant mission | Après contact | Après lien FAQ footer | Lecture |
|---|---|---|---|---|
| Accueil | 2 307 842 o | 2 307 842 o | 2 307 842 o | **identique octet à octet** (footer hors cadre à 2000 px) |
| Activités | 2 311 365 o | 2 311 365 o | 2 311 915 o | **+550 o** = ajout du lien « FAQ » |
| Réservation | 1 386 335 o | 1 386 335 o | 1 386 866 o | **+531 o** = ajout du lien « FAQ » |

Le simple changement d'`href` (« Contact » réorienté) n'a **altéré aucun pixel** : captures
strictement identiques. La **seule** différence postérieure est l'item « FAQ » ajouté au
footer — modification volontaire. Les 3 footers ont été **capturés et contrôlés visuellement** :
mêmes 5 liens, même ordre, même mise en page. Images (12 / 16 / 5), `h1` et `aria-current`
inchangés ⇒ **aucune régression visuelle**.

### 9.5 Limites assumées

- **Aucun envoi réel** : `action="#"` / `method="post"` — le POST renvoie **200** et
  ressert la page, donc la soumission **recharge sans confirmation ni envoi**.
  Commentaire HTML explicite placé dans le formulaire ; **le branchement d'un service
  d'envoi reste à faire** (aucun backend, aucune confirmation inventés).
- **Section FAQ volontairement absente** de `contact.html` : aucune question/réponse n'y a
  été ajoutée et **aucun contenu de `faq.html` n'y a été déplacé ni repris**. `faq.html`
  demeure à **0 octet** (page du coéquipier, **non modifiée** : ni contenu, ni structure),
  donc son rendu réel n'a jamais pu être observé d'ici.
- **Liens `#` réseaux sociaux**, mentions légales et données métier : inchangés, en attente.
- Version mobile : non développée, comme demandé.

### 9.6 Recommandation (hors périmètre, non appliquée)

`src/css/style.css` pourrait être nettoyé du scan Tailwind par une ligne
`@source not "**/*.md";` — sans rapport avec la page Contact, proposée pour plus tard.

---

## 10. Mission Hero de Contact (14/10/2026)

### 10.1 Constat initial

Le hero de `contact.html` était un **aplat marine pleine largeur** : sombre, monotone,
déséquilibré (texte à gauche, photo d'oiseaux à droite sans lien évident avec la destination).
`acitivite1.jpg` montrait une observatrice d'oiseaux — certes réelle, mais **sans lecture
immédiate de la lagune**.

### 10.2 Choix d'image — démarche réelle

Aucune image de `public/images/` ne représentait la lagune :

| Fichier | Verdict |
|---|---|
| `acitivite1.jpg` | observatrice d'oiseaux — usage antérieur, pas de lecture « lagune » |
| `actevity4.jpg` | **lac nord-américaine** (pins, « Summer Adventure », bostonwhaler.com) — écarté |
| `hero_actevity.jpg` | déjà en hero d'Accueil **et** de Réservation — réutiliser l'aurait rendu Contact identique à Réservation |
| autres | portraits d'activités, non liés au paysage |

Une recherche Wikimedia Commons a identifié des photos authentiques de **Mar Chica (Nador)**.
Après vérification des licences (toutes CC BY-SA), retenue :

> **`Lagune Marchica.jpg`** — 5548×3699, **CC BY-SA 4.0**, auteur **Houssain tork**.
> Source : <https://commons.wikimedia.org/wiki/File:Lagune_Marchica.jpg>

**Recadrage** : cadrage sur `x=310, y=0, 1300×860` pour supprimer le premier plan de coquillages
trop chargé et concentrer le coucher de soleil, les montagnes et l'eau. Optimisation JPEG qualité 80
→ **`public/images/lagune-marchica.jpg`, 1300×860, 239 Ko** (contre 780 Ko pour le hero du site).
L'image a été **visualisée avant et après** recadrage.

Correspondance avec la palette de la marque, non forcée mais réelle : or du soleil ≈ `#f2a11d`,
eau turquoise ≈ `#0b6e81`, ombre des montagnes ≈ `#0a3542`.

**Attribution** : légende visible sous la photo (« Photo : Houssain tork — CC BY-SA 4.0 »),
commentaire HTML avec URL source, et § « Crédit photo » ajouté au `README.md`.

### 10.3 Composition retenue

| | Avant | Après |
|---|---|---|
| Fond | aplat `#0a3542` pleine largeur | **dégradé subtil `#f3eee3` → `#faf7f1`** (couleurs existantes) |
| Marine | 100 % du hero | **accent uniquement** : panneau arrondi 18 px décalé de 14 px derrière la photo |
| Titre | 2,6 rem, une ligne flottant à 520 px | **2,9 rem**, `line-height:1.05`, `letter-spacing:-.02em`, **retour à la ligne maîtrisé** |
| Paragraphe | 470 px, blanc à 85 % | **46 ch**, `line-height:1.7`, `#57707a` |
| Colonnes | `1.05fr / .95fr`, gap 2,6 rem | **`1fr / 1fr` égales (540,8 px mesurés)**, gap 3,4 rem |
| Photo | `acitivite1.jpg` 300 px, coins 16 px | **lagune 1300×860**, coins 18 px, ombre, **panneau marine décalé** |
| Surcharge | — | pastille « Au cœur de Marchica » (disque doré + blanc 94 %) + légende crédit |
| Bouton | instantané | **transition 0,18 s** (limitée au bouton du hero, aucun autre bouton touché) |

Le tout reste **nettement distinct** de la Réservation (photo pleine largeur + dégradé crème à gauche).

### 10.4 Vérifications réellement exécutées

**Contrastes WCAG 2.1 mesurés dans le navigateur** (fond réel remonté par la DOM) :

| Élément | Rapport | Seuil | Verdict |
|---|---|---|---|
| H1 (46,4 px / 800) | **12,4:1** | 3 | AA ✔ |
| Eyebrow (11,52 px / 800) | **5,51:1** | 4,5 | AA ✔ |
| Paragraphe (15,52 px) | **4,9:1** | 4,5 | AA ✔ |
| Légende photo (10,88 px) | **4,9:1** | 4,5 | AA ✔ |
| Pastille (11,84 px / 700) | **13,26:1** | 4,5 | AA ✔ |
| Bouton (blanc / `#0b6e81`) | **5,9:1** | 4,5 | AA ✔ |

**Structure** : fond `linear-gradient(rgb(243,238,227) 0%, rgb(250,247,241) 78%)` ✔ ;
`grid-template-columns: 540,797px 540,812px` (colonnes égales) ✔ ; H1 sur **2 lignes** ✔ ;
**0 `<details>`**, 3 sections, **5 champs de formulaire inchangés** ✔.

**Profondeur** : panneau marine décalé de **14 px** à gauche et en bas, calé sur la photo
(un 1ᵉʳ essai l'était sur la `<figure>`, d'où un bloc débordant jusqu'à la légende — **corrigé**) ;
pastille **entièrement contenue** dans l'image ✔.

**Survol vérifié avec une vraie position de souris CDP** (et non un pseudo-état forcé, méthode
qui avait donné un faux résultat) : repos `rgb(11,110,129)` → survol `rgb(9,90,106)` —
**assombrissement réel**, transition `background-color .18s`, retour au repos confirmé ✔.

**Images** : 3/3 chargées (`logo`, `lagune-marchica` 1300×860, `logo`), **0 cassée** ;
`/images/lagune-marchica.jpg` → **200 (233 Ko)** ; **6 liens internes → tous 200** ✔.

**Build** : `npm run build` **vert** ; `dist/src/html/contact.html` **13 923 o** ;
l'image est bien copiée dans `dist/images/`.
**CSS inchangé : même hash `style-Dnktqw8-.css` (8,59 Ko)** — **aucune règle personnalisée ajoutée**,
toute la mise en page est en styles inline + classes existantes (`.eyebrow`, `.btn-primary`,
`.container-site`).

**Non-régression** : captures 1440 px d'Accueil, Activités et Réservation **octet à octet identiques**
(2 307 842 / 2 311 915 / 1 386 866 o) ⇒ **aucun pixel altéré** hors page Contact.

### 10.5 Limites assumées

- Le focus clavier du bouton utilise l'anneau par défaut du navigateur (`.btn-primary` n'a pas de
  `:focus-visible`). **Comportement strictement identique à avant** la mission — aucun recul, mais
  un anneau de focus personnalisé reste à prévoir globalement.
- La licence **CC BY-SA 4.0** impose la mention d'attribution : elle est en légende visible, en
  commentaire HTML et dans le README. Elle est volontairement discrète mais **ne doit pas être supprimée**.
- La photo étant sous licence share-alike, elle **ne peut pas** être réutilisée dans une œuvre sous
  licence incompatible sans respecter les termes.
- Mobile : non développé, comme demandé.

---

## 11. Mission migration CSS → Tailwind CSS v4 (14/10/2026)

### 11.1 Périmètre et nature de la migration

Migration **purement technique** : aucun redesign, aucune modification de couleur, de
dimension, de disposition ni de contenu. Les imperfections visuelles existantes ont été
**conservées telles quelles** (mission : reproduire l'avant à l'identique).

| | Avant | Après |
|---|---|---|
| Styles en ligne `style=""` | **481** (index 142, actevitiy 170, reservation 87, contact 82) | **0** |
| Classes CSS personnalisées utilisées | 15 familles | **0** |
| `src/css/style.css` | 258 lignes (12 tokens + 31 règles + 1 `@media`) | **18 lignes** : `@import` + `@theme` uniquement |
| JS personnalisé | aucun | aucun (inchangé) |
| Dépendances ajoutées | — | **aucune** |

Toutes les règles de `style.css` ont été réexprimées en utilitaires Tailwind v4 ;
**`@apply` n'a pas été utilisé**. `.handwritten` (0 usage) a été supprimé avec le reste.

### 11.2 Résultat — comparaison visuelle réelle

Méthode : captures Edge headless **1414 px, hauteur/zoom/polices/scroll identiques**,
avant (`shots-before/`) et après (`shots-after/`), puis **diff pixel par pixel**.

| Page | Dimensions | Écart |
|---|---|---|
| `index.html` | 1414×2605 | **0 pixel** |
| `actevitiy.html` | 1414×2654 | **0 pixel** |
| `reservation.html` | 1414×1728 | **0 pixel** |
| `contact.html` | 1414×2058 | **0 pixel** |

→ **CORRESPONDANCE PIXEL PAR PIXEL PARFAITE sur les 4 pages.**
Images : 12 / 16 / 5 / 3, **0 cassée** ; `h1` = 1 par page ; `style=""` = 0 ; classes
legacy = 0.

Vérification complémentaire **DOM/styles calculés sur tout le document** (248 à 276
éléments par page) : seules des différences de **notation** subsistent, sans effet visuel —
composition `box-shadow` Tailwind (couches transparentes), `align-items: start` ↔
`flex-start`, `border-*-color` sur des bordures de largeur 0, `gap: normal` ↔ `0px`.

### 11.3 États non visibles en capture — mesurés réellement (CDP)

**Survol des cartes d'activités** (8 cartes), relevé au repos / `:hover` / `:focus-within` /
`prefers-reduced-motion` :

| État | Avant | Après | Verdict |
|---|---|---|---|
| repos | `translate:none` — ombre `0 8px 24px rgba(10,53,66,.06)` | idem | ✔ |
| `:hover` | `translateY(-4px)` — ombre `0 14px 30px rgba(10,53,66,.14)` — img `scale(1.04)` | idem | ✔ |
| `:focus-within` | identique au survol | idem | ✔ |
| bouton au focus | `outline: 3px solid rgb(11,110,129)`, offset `3px` | idem | ✔ |
| mouvement réduit | transitions `none`, `transform: none`, **ombre de feedback conservée** | idem | ✔ |

*Nota* : Tailwind v4 encode le survol via les propriétés individuelles `translate:` /
`scale:` au lieu de `transform:` — **rendu strictement identique** (d'où `transition-[translate,…]`
et `transition-[scale]`).

**Focus clavier des champs de formulaire** (Contact + Réservation) : `3px solid
rgba(14,138,160,.35)`, offset `1px`, bordure `#0b6e81` — **identique à l'avant**.

### 11.4 Bug réel détecté et corrigé pendant la migration

`focus-visible:outline-[3px_solid_rgba(14,138,160,0.35)]` fait générer à Tailwind v4
`outline-color: 3px solid rgba(…)` — **CSS invalide, donc ignoré** : le contour de focus
des 12 champs (5 Contact + 7 Réservation) **disparaissait**. Non visible en capture
(statique), détecté par inspection du CSS généré.
Corrigé par décomposition en 3 utilitaires valides :
`focus-visible:outline-3 focus-visible:outline-[rgba(14,138,160,0.35)] focus-visible:outline-offset-[1px]`.
Mesure après correctif : **identique à l'avant** ✔.

### 11.5 Pièges Tailwind v4 documentés (reproductibles)

| Piège | Constat | Solution retenue |
|---|---|---|
| État actif nav | `aria-current-page:` génère `[aria-current-page="true"]` → **inopérant** | `aria-[current='page']:text-white` / `:border-primary` |
| État actif pill | `.pill[aria-current="true"]` | variante `aria-current:` (mappe `[aria-current="true"]`) |
| Couleurs alpha | `text-white/85` utilise `color-mix(in oklab,…)` → ~10 niveaux différents | hex-alpha arbitraire reproduisant exactement les `rgba()` d'origine (`#ffffffd9`, `cc`, `bf`, `99`, `fffffff0`, `ffffff26`) |
| Dégradés | Tailwind ajoute `in oklab` | valeurs arbitraires sRGB forcées (`bg-[linear-gradient(180deg,#f3eee3_0%,#faf7f1_78%)]`) |
| Transition | durée/courbe imposées `cubic-bezier(.4,0,.2,1)` | `ease-[ease]` |
| `rgba()` | `bg-[rgba(…)]` **n'est pas généré** ; les formes hex le sont | hex-alpha |
| Valeurs hors échelle | `0.72rem`, `1.6rem`, `1.9rem`… | arbitraires exacts (`text-[0.72rem]`) |
| Conflits | `w-11` + `w-[38px]` : l'ordre généré décide | une seule valeur de taille |

### 11.6 Build et CSS généré

`npm run build` : **succès, 8 modules** ; 7 pages en sortie (`dist/src/html/`), dont les 3
pages coéquipiers **toujours à 0,00 Ko**.
`assets/style-*.css` : **29,06 Ko (gzip 6,29 Ko)** avec le CSS source allégé.
Tous les utilitaires critiques ont été **vérifiés dans le CSS généré** (aria, `ease-[ease]`,
hex-alpha, dégradés sRGB sans `in oklab`, `translate`, `scale`, `motion-reduce` — placé en
dernier, donc bien prioritaire).

### 11.7 Fichiers Markdown scannés par Tailwind — constat, correctif NON appliqué

Constat confirmé : Tailwind v4 scanne aussi `AUDIT_REPORT.md` et `README.md` (racine).
**Correctif testé puis écarté**, pour deux raisons mesurées :
1. les deux formes testées (`@source not "**/*.md";` et `@source not "../../**/*.md";`)
   ont fait **augmenter** le CSS (29,06 → 31,65 / 31,19 Ko) au lieu de le réduire ;
2. il s'agit d'un **changement de configuration** qui dépasse le cadre strict de la
   migration, sans gain démontré.

**Cause réelle de cette inflation identifiée** : un répertoire **`HOME/` est apparu à la
racine du projet** (contenant `.claude-omniroute`, **555 fichiers** dont de nombreux `.md`,
`.js`, `.png`). Créé **pendant** cette mission (22:14:52), **non tracké par Git** (`?? HOME/`)
— **il n'a pas été committé**. Tailwind le scanne et génère depuis lui **76 classes
utilitaires orphelines** (`container`, `h-84`, `size-1`, `collapse`, `table-cell`,
`ease-in-out`…), aucunement utilisées par les pages. **Recommandation : le supprimer ou
l'ajouter à `.gitignore`.** Sans lui, le CSS retombe à 29,06 Ko.

### 11.8 Pages du coéquipier — intactes

`apropos.html`, `faq.html`, `detail-actevity.html` : **0 octet, non modifiées**
(ni contenu, ni structure, ni emplacement). `faq.html` reste totalement indépendante et
n'a pas été intégrée à `contact.html`.

### 11.9 Réserves honnêtes

- **Brief du professeur toujours absent** du dépôt : conformité établie sur le README, les
  maquettes et les contraintes de mission, **pas sur le document original**.
- La comparaison pixel prouve l'**identité du rendu en conditions de test** (Edge headless,
  1440 px, desktop) ; elle ne constitue pas une certification sur d'autres navigateurs.
- Un **autre agent/session travaillait simultanément** dans le dépôt : il a installé
  `puppeteer` et `sharp` (modifiant `package.json` / `package-lock.json`), créé
  `screenshot.mjs` et `screenshots/`, ainsi que le répertoire `HOME/`. **Rien de tout cela
  n'a été committé par cette migration** — seuls les 5 fichiers de la mission le sont.
- Mobile : non développé, comme demandé.
