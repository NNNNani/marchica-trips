# RAPPORT DE PERFORMANCE — Marchica Trips

- **Date :** 17 octobre 2026
- **Périmètre :** 14 pages (`src/html/`) + page de redirection `public/index.html`
- **Baseline (« avant ») :** commit `5e14fd0` (« Deploy via GitHub Actions »), servi depuis un *git worktree* isolé — **aucun commit ni push n'a été effectué pendant l'audit**
- **État final (« après ») :** arbre de travail optimisé — passe 1 (audit complet) + **passe 2 ciblée** (LCP accueil/activités/détail, variantes de galeries, cibles tactiles, nettoyage de fichiers — détail en section G) — modifications non commitées, à valider par vos soins
- **Contraintes respectées :** HTML5 + Tailwind CSS v4, **aucune JS applicative ajoutée**, architecture Vite et configuration GitHub Pages inchangées, textes / couleurs / organisation / contenus préservés (vérifié par captures d'écran).

---

## A. Résumé

### Ce qui a été fait
Audit complet des 14 pages, application de 6 familles d'optimisations (passe 1), puis d'une **passe 2 ciblée** sur les points restants (détail en section G) :

1. **Images** — conversion de tous les visuels en **WebP** (qualité 75–80), avec variantes redimensionnées et `srcset/sizes` là où c'est utile : hero en 3 largeurs (640/1024/1365), image LCP de contact en 2 largeurs, vignettes de cartes en 600 px (`-card`), avatars de témoignages en 120×120.
2. **Dimensions intrinsèques** — `width`/`height` sur 100 % des balises `<img>` (garantie anti-CLS, y compris à froid).
3. **Chargement différé** — `loading="lazy"` sur toutes les images sous la ligne de flottaison, jamais sur l'image LCP.
4. **Priorités de chargement** — `preload` de l'image LCP (`imagesrcset`/`imagesizes` cohérents avec la balise) + `fetchpriority="high"` uniquement sur les images LCP ; préchargement des graisses typographiques du premier écran — 3 graisses (400/700/800) en passe 1, ramené à **2 sur l'accueil et `actv-1`** en passe 2 (décision mesurée, G.2/G.3).
5. **Polices** — suppression de la chaîne externe Google Fonts (`fonts.googleapis.com` → `fonts.gstatic.com`, 2 résolutions DNS + TLS bloquantes) remplacée par **6 fichiers woff2 auto-hébergés** avec `font-display: swap`.
6. **Accessibilité** — correction de la structure `<dl>` de l'accueil (a11y Lighthouse 92 → **100**) et agrandissement des espacements du pied de page (liens et icônes sociales) pour satisfaire le critère **WCAG 2.5.8** (taille de cible minimale, exception d'espacement) sur 13 pages.
7. **Passe 2 (ciblée)** — LCP accueil/activités : hero ré-encodé **q74** (72,5 → 58,7 Ko) et preload de la graisse 700 retiré sur l'accueil et `actv-1` (moins de concurrence sur la bande passante du LCP) ; galeries `actv-2..8` : variantes **640/1024 + `srcset`/`sizes`** et `fetchpriority="low"` sur les vignettes critiques ; **cibles tactiles ≥ 24 px** (navigation, icônes sociales, case de réservation — 769 occurrences → **0**) ; classes sans définition d'`apropos` corrigées avec les tokens existants ; suppression de **6 fichiers vides** (0 octet, zéro référence).

### Résultats clés (mesurés)

| Indicateur | Avant | Après | Δ |
|---|---|---|---|
| Poids réseau initial total (14 pages, @375 px) | 9 913 Ko | 4 126 Ko | **−58 %** |
| Poids réseau initial total (14 pages, @1366 px) | 10 004 Ko | 4 776 Ko | **−52 %** |
| Lighthouse Performance mobile — accueil | 78 | **97** | +19 pts |
| Lighthouse Performance mobile — page activités | 76 | **97** | +21 pts |
| Lighthouse Performance desktop — accueil | 97 | **100** | +3 pts |
| LCP mobile — accueil / activités / détail | 5,64 / 7,06 / 5,71 s | **2,42 / 2,57 / 2,42 s**¹ | jusqu'à −4,5 s |
| LCP mobile — contact / faq (déjà rapides) | 2,56 / 1,68 s | 2,42 / 1,66 s | stables, sous la cible |
| CLS (toutes pages mesurées, 2 états) | 0 | 0 | = |
| Accessibilité — accueil | 92 | **100** | +8 pts |
| Erreurs réseau / débordements horizontaux (14 pages × 7 viewports) | 0 / 0 | 0 / 0 | = |
| Petites cibles tactiles (< 24 px — 14 pages × 7 viewports) | 769 | **0** | −769 |

¹ LCP = médiane des runs de l'état final. La machine de test alterne deux régimes de charge (thread principal 2–3× plus lent sous contention — détail et comparaisons appariées en **G.2**) : accueil **2,26–2,57 s** (dernier run officiel 2,56 s), activités 2,57 s, détail `actv-1` 2,42 s — tous à TBT 0 ms.

### Méthodologie (reproductibilité)
- **Audit réseau + responsive** : script Puppeteer maison — 14 pages × 7 viewports (320×568, 375×812, 430×932, 768×1024, 1024×768, 1366×768, 1920×1080), mesures réseau à 375 et 1366 px (chargement initial vs complet, par type de ressource), 3 captures pleine page par page (375/768/1366), détection des débordements horizontaux et des petites cibles. Scripts et JSON bruts : `C:\Users\pc\AppData\Local\Temp\opencode\marchica-audit\` (`audit.mjs`, `lighthouse-runs.mjs`, `lighthouse-faq.mjs`, `gen-*.mjs`, et pour la passe 2 : `lcp-run.mjs`, `lcp-page.mjs`, `lcp-actv2-lazy.mjs`, `lcp-actv2-low.mjs`, `lh-clean-retry.mjs`, `rects-diff2.mjs`, `net-compare.mjs`).
- **Lighthouse 13.5.0** (npx, Chrome 155 headless) : ~50 runs au total, mêmes conditions partout (mobile émulé 4G, CPU ×4 ; serveurs `vite preview` dédiés : 4174 = baseline, 4173 = état final). L'état final est mesuré sur **8 pages** (accueil mobile + desktop, activités, contact, `actv-1`, faq, `actv-2`, `apropos`), chacune ≥ 3 fois ; chaque décision de la passe 2 repose sur un **A/B apparié** (variantes jouées dans la même session, 2 runs minimum par variante).
- **Comparaison visuelle** : captures avant/après examinées une par une, puis **re-vérifiées après la passe 2** (analyse géométrique de chaque élément + comparaison des captures) : hauteurs de page identiques partout, sauf deux ré-agencements volontaires (`apropos` +6/+10 px, `reservation` +19 px @375 — détail en G.5/G.6) ; images visuellement équivalentes après ré-encodage.

---

## B. Tableau des pages

Légende : **Avant → Après (Ko)** = poids réseau initial (Puppeteer, @375 px) ; LH = Lighthouse mobile simulé 4G.

### Optimisations communes (appliquées aux 14 pages)
WebP + variantes ; `width`/`height` ; `loading="lazy"` (hors LCP) ; préchargement des graisses critiques — **2 à 3 selon la page depuis la passe 2** (la graisse 700 est retirée de l'accueil et d'`actv-1`, G.2/G.3) ; polices auto-hébergées `font-display: swap` ; espacements du pied de page (WCAG 2.5.8, 13 pages concernées — `apropos` sans icônes sociales).

| Page | Problèmes identifiés (état initial) | Optimisations appliquées | Vérifications | Problèmes restants |
|---|---|---|---|---|
| `src/html/index.html` | Hero JPG de 763 Ko (élément LCP) en pleine résolution ; 7 vignettes JPG pleine taille ; polices Google bloquantes ; `<dl>` invalide (dt/dd imbriqués, dd sans dt) → a11y 92 ; pas de preload LCP | Hero en 3 WebP **q74** (640 : 28,9 / 1024 : 58,7 / 1365 : 88,2 Ko — ré-encodé en passe 2) + `srcset`/`sizes` + preload `imagesrcset` + `fetchpriority=high` ; **passe 2 : preload de la graisse 700 retiré** ; vignettes WebP + `-card` 600 px ; 2ᵉ image hero en variantes ; `<dl>` restructuré (dt/dd enfants directs, texte identique) ; espacements footer | LH mobile **78 → 97** (LCP 5,64 → **2,42 s**¹ ; a11y **92 → 100**) ; LH desktop **97 → 100** (LCP 1,29 → **0,67 s**) ; captures identiques (hero ré-encodé visuellement équivalent) | ¹ 2,26–2,57 s selon la charge de la machine (G.2) ; FCP 1,37 → 1,52 s — contrepartie assumée du retrait du preload 700 (G.2) |
| `src/html/actevitiy.html` | Page la plus lourde : **1 615 Ko** init @1366 (dont 1 546 Ko d'images) ; hero 763 Ko + 8 vignettes JPG pleine résolution ; polices Google | Hero variantes (**hérite du q74 partagé avec l'accueil**, passe 2) + preload ; 8 vignettes WebP + `-card` ; dimensions ; polices locales | LH **76 → 97** (LCP **7,06 → 2,57 s**¹) ; −67 % @375 ; 7 viewports, 0 erreur | Poids encore élevé (730 Ko en simulation LH) : page très riche en images (17 requêtes initiales) ; ¹ aucune optimisation LCP supplémentaire en passe 2 (test « sans preload 700 » sans gain fiable → 3 preloads conservés, G.3) |
| `src/html/apropos.html` | 999 Ko init (960 Ko d'images) ; visuels pleine résolution ; polices Google ; **classes `text-primary-dark` et `border-line` utilisées mais absentes du `@theme` (0 règle CSS générée)** | WebP 1200 px ; dimensions ; lazy ; polices locales ; **passe 2 : classes corrigées via tokens existants (`text-primary-dark` → `text-primary` ×8, `border-line` → `border-card-line` ×4, aucun nouveau token), gaps du footer resserrés (0,8 → 0,6 rem)** | −69 % @375 / −66 % @1366 ; LH **99** (LCP 2,25 s, FCP 1,06 s) ; 7 viewports, 0 erreur | Image de galerie `actevity5.webp` (736×981, 162 Ko) sans variante mobile (gain estimé 80–100 Ko @375) ; hauteur de page +6/+10 px (gaps footer volontaires, G.6) |
| `src/html/contact.html` | **Image LCP de 134 Ko sans variante** (servie telle quelle même à 375 px) ; LCP mobile 2,56 s ; Lighthouse signalait l'absence de `fetchpriority` sur le LCP ; polices Google | Variantes **640 (47,9 Ko) / 1024 (114,2 Ko)** + `srcset`/`sizes` + preload `imagesrcset` + `fetchpriority=high` ; polices locales ; **passe 2 : liens de contact élargis (`py-[4px]` + `-my-[4px]`, cible ≈ 25 px)** | LH **96 → 98** (LCP **2,56 → 2,42 s**, sous la cible ; poids 275 → 236 Ko) ; −38 % @375 ; diff pixel 0,00 % après élargissement des liens | — |
| `src/html/faq.html` | Aucune image ; polices Google ; icônes sociales étroites ; page très légère (39 Ko) | Polices locales + preload ; espacements footer ; page la plus rapide du site | LH **99 → 100** (FCP 1,68 → 1,06 s ; LCP 1,68 → 1,66 s) | Init +107 Ko (polices chargées tôt — compromis assumé, voir F) |
| `src/html/reservation.html` | 1 083 Ko init (1 044 Ko d'images) ; visuels pleine résolution ; case à cocher 13×18 px | WebP ; dimensions ; lazy ; polices locales ; **passe 2 : case à cocher portée à 24×24 px (`w-[24px] h-[24px] shrink-0`), liens de contact élargis** | −65 % @375 / −57 % @1366 ; 7 viewports, 0 erreur ; case 24 px validée visuellement | Libellé de consentement sur 4 lignes @375 (page +19 px — volontaire, G.5) |
| `src/html/detaille_acte/actv-1.html` | 897 Ko init (859 Ko d'images) ; galerie pleine résolution ; pas de preload LCP | Variantes WebP galerie + hero ; preload + `fetchpriority` sur l'image LCP ; dimensions ; **passe 2 : preload de la graisse 700 retiré** | LH **78 → 98** (LCP **5,71 → 2,42 s**) ; −75 % @375 | FCP 1,07 → 1,22 s — contrepartie assumée du retrait du preload 700 (G.3) |
| `src/html/detaille_acte/actv-2.html` … `actv-8.html` (7 pages) | 352–847 Ko init ; galeries JPG pleine résolution (jusqu'à 1 200 px pour des vignettes) ; polices Google | WebP 1200 px + dimensions + lazy ; preload de la 1ʳᵉ image de galerie sur `actv-2..8` ; polices locales ; espacements footer ; **passe 2 : variantes 640/1024 + `srcset`/`sizes` des 8 visuels de galerie, `fetchpriority="low"` sur les 14 vignettes critiques (G.4)** | −46 % à −63 % par page ; LH `actv-2` **93 → 95** (LCP 3,17 → **2,94 s**) ; 7 viewports, 0 erreur, 0 débordement | LCP `actv-2` 2,94 s (> cible 2,5 s) : page à nombreuses vignettes au premier écran — pistes restantes en F |
| `public/index.html` | Page de redirection `meta refresh` (786 o) | **Non modifiée** (aucun enjeu) | — | — |

---

## C. Performances avant / après

### C.1 — Lighthouse 13.5.0 (mobile émulé 4G ; « index desktop » = preset desktop)

| Page | Perf av. | Perf apr. | A11y av. | A11y apr. | FCP av. | FCP apr. | **LCP av.** | **LCP apr.** | CLS av. | CLS apr. | Poids av. | Poids apr. |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| index (mobile) | 78 | **97** | 92 | **100** | 1,68 s | 1,52 s | 5,64 s | **2,42 s**¹ | 0 | 0 | 1 474 Ko | 585 Ko |
| index (desktop) | 97 | **100** | 92 | **100** | 0,57 s | 0,37 s | 1,29 s | **0,67 s** | 0 | 0 | 1 487 Ko | 570 Ko |
| actevitiy (mobile) | 76 | **97** | 100 | 100 | 1,67 s | 1,38 s | 7,06 s | **2,57 s**¹ | 0 | 0 | 1 524 Ko | 730 Ko |
| contact (mobile) | 96 | **98** | 100 | 100 | 1,65 s | 1,07 s | 2,56 s | **2,42 s** | 0 | 0 | 275 Ko | 236 Ko |
| actv-1 (mobile) | 78 | **98** | 100 | 100 | 1,68 s | 1,22 s | 5,71 s | **2,42 s** | 0 | 0 | 898 Ko | 254 Ko |
| actv-2 (mobile) | — | **95** | — | 100 | — | 1,07 s | — | **2,94 s** | — | 0 | — | 371 Ko |
| apropos (mobile) | — | **99** | — | 100 | — | 1,06 s | — | **2,25 s** | — | 0 | — | 341 Ko |
| faq (mobile) | 99 | **100** | 100 | 100 | 1,68 s | 1,06 s | 1,68 s | 1,66 s | 0 | 0 | 40 Ko | 120 Ko |

Compléments sur tous les runs finaux : **TBT = 0 ms** (un seul run à 23 ms sur contact, machine chargée), **Best practices = 100**, **SEO = 100**, **aucun audit binaire en échec** après (l'état initial échouait sur `definition-list` + `dlitem` pour l'accueil).

¹ Pages à image LCP : la machine de test alterne deux régimes selon sa charge (thread principal 2–3× plus lent sous contention — preuves `Style & Layout` en G.1). Valeurs = médianes des runs de l'état final ; plage : accueil **2,26–2,57 s**, activités 2,57 s (stable), `actv-1` 2,42 s (stable). Dernier run officiel de l'accueil : **2,56 s** (TBT 0). Les comparaisons A/B appariées de la passe 2 (G.2/G.3) sont la référence pour les deltas. `actv-2` et `apropos` n'avaient pas été mesurés par Lighthouse dans l'état initial.

**INP : non mesuré** — il nécessite des données terrain (CrUX) ou un test labo dédié aux interactions ; le site n'embarque **aucune JS applicative** et le TBT mesuré est de 0 ms sur toutes les pages (proxy favorable).

### C.2 — Poids réseau initial (Puppeteer, réseau local, Ko — état final après ré-audit)

| Page | @375 av. | @375 apr. | Δ | @1366 av. | @1366 apr. | Δ |
|---|---|---|---|---|---|---|
| index | 834 | 501 | −40 % | 833 | 570 | −32 % |
| actevitiy | 1 523 | 506 | −67 % | 1 615 | 637 | −61 % |
| apropos | 999 | 312 | −69 % | 999 | 339 | −66 % |
| faq | 39 | 120 | +81 Ko¹ | 39 | 147 | +108 Ko¹ |
| contact | 274 | 169 | −38 % | 274 | 263 | −4 % |
| reservation | 1 083 | 379 | −65 % | 1 083 | 465 | −57 % |
| actv-1 | 897 | 224 | −75 % | 897 | 251 | −72 % |
| actv-2 | 784 | 341 | −56 % | 784 | 368 | −53 % |
| actv-3 | 574 | 252 | −56 % | 574 | 279 | −51 % |
| actv-4 | 352 | 189 | −46 % | 352 | 216 | −39 % |
| actv-5 | 560 | 208 | −63 % | 560 | 235 | −58 % |
| actv-6 | 613 | 313 | −49 % | 613 | 340 | −44 % |
| actv-7 | 847 | 382 | −55 % | 847 | 409 | −52 % |
| actv-8 | 533 | 230 | −57 % | 533 | 257 | −52 % |
| **Total** | **9 913** | **4 126** | **−58 %** | **10 004** | **4 776** | **−52 %** |

¹ faq : seule « hausse » du site — ce sont les polices (voir F). Aucune image sur cette page ; son score Lighthouse passe malgré tout de 99 à 100 et son FCP de 1,68 s à 1,07 s.

### C.3 — Ressources : images, CSS, polices, build

| Ressource | Avant | Après | Notes |
|---|---|---|---|
| Images référencées par le HTML construit | 18 JPG — **3 675 Ko** | 48 WebP — **3 208 Ko** | bibliothèque agrandie par les variantes (16 de galerie ajoutées en passe 2, 980 Ko) ; par page, seule la variante utile est téléchargée (−38 % à −75 %, cf. C.2) |
| Exemples | hero 762,5 Ko (JPG) | hero **28,9 / 58,7 / 88,2 Ko** (WebP **q74**, 640/1024/1365 — ré-encodé en passe 2, −19 % vs q80) | l'image LCP ne transfère que sa variante |
| | lagune (LCP contact) 134 Ko | 47,9 / 114,2 / 134 Ko | variantes 640/1024/1200 |
| | 7 vignettes 236–736 px (~40–160 Ko chacune) | variantes `-card` 600 px + avatars 120×120 + variantes 640/1024 des 8 visuels de galerie (passe 2) | |
| CSS | 33,2 Ko (gzip 6,9) | 35,0 Ko (gzip 7,1) | +1,8 Ko : les 6 `@font-face` locaux remplacent le `@import` Google |
| Polices | 0 (externe, 2 domaines, chargement tardif) | 146 Ko au total (6 × woff2, 25–27 Ko ; italique 12,3 Ko) | **2 à 3** fichiers préchargés selon la page (~55–80 Ko — accueil et `actv-1` en ont 2 depuis la passe 2, G.2/G.3) ; mêmes sous-ensembles latins que Google |
| HTML construit (14 pages) | 218 Ko | 238 Ko | +`srcset`/`sizes`, preloads ajustés (passe 2), dimensions |
| `dist/` complet | 3 927 Ko / 41 fichiers | **3 629 Ko / 71 fichiers** (après nettoyage final — H) | +16 variantes de galerie, −6 fichiers vides, puis −18 JPG sources (3 674 Ko) retirés du dépôt **et** du build ; ce qui est *transféré* est le tableau C.2 |
| Erreurs réseau (audit 14 pages × 2 profils × 2 états) | 0 | 0 | |

> Rappel labo vs terrain : les chiffres Lighthouse utilisent le throttling simulé (4G, CPU ×4) et un serveur local (TTFB ~5 ms). Ils sont comparables entre eux (mêmes conditions avant/après) mais plus pessimistes qu'une navigation réelle en fibre, et ne remplacent pas des données CrUX (non disponibles pour ce site).

---

## D. Responsive design

**Dimensions testées (7 viewports, comme demandé) :** 320×568, 375×812, 430×932, 768×1024, 1024×768, 1366×768, 1920×1080 — scroll complet de chaque page, `deviceScaleFactor` 1, captures pleine page à 375/768/1366.

**Résultats par page** — OK = 0 px de débordement horizontal (largeur de document = viewport), images toutes dimensionnées, aucune erreur réseau :

| Page | 320 | 375 | 430 | 768 | 1024 | 1366 | 1920 |
|---|---|---|---|---|---|---|---|
| index | OK | OK | OK | OK | OK | OK | OK |
| actevitiy | OK | OK | OK | OK | OK | OK | OK |
| apropos | OK | OK | OK | OK | OK | OK | OK |
| faq | OK | OK | OK | OK | OK | OK | OK |
| contact | OK | OK | OK | OK | OK | OK | OK |
| reservation | OK | OK | OK | OK | OK | OK | OK |
| actv-1 | OK | OK | OK | OK | OK | OK | OK |
| actv-2 | OK | OK | OK | OK | OK | OK | OK |
| actv-3 | OK | OK | OK | OK | OK | OK | OK |
| actv-4 | OK | OK | OK | OK | OK | OK | OK |
| actv-5 | OK | OK | OK | OK | OK | OK | OK |
| actv-6 | OK | OK | OK | OK | OK | OK | OK |
| actv-7 | OK | OK | OK | OK | OK | OK | OK |
| actv-8 | OK | OK | OK | OK | OK | OK | OK |

- **Débordements horizontaux : 0 px partout, avant comme après** (98 combinaisons page × viewport mesurées à chaque état).
- **Fidélité visuelle :** comparaison des captures avant/après (375/768/1366) — mêmes couleurs, typographie, disposition, images et contenus ; diff pixel 0,00 % sur contact après la passe 2, ≤ 2,15 % ailleurs (ré-encodage WebP). Deux ré-agencements **volontaires** : hauteur d'`apropos` +6/+10 px (gaps footer, G.6) et de `reservation` +19 px @375 (libellé de consentement 4 lignes, G.5).
- **Adaptation des images :** les variantes `srcset` suivent les points de rupture du design (hero `100vw`, grilles cartes `92vw/46vw/300px`, galeries `(min-width: 1024px) 280px, 50vw`), donc le bon fichier est choisi du mobile 320 px au grand écran 1920 px (gain le plus fort sur mobile, cf. section C.2) ; netteté vérifiée sur les galeries à 375/768/1366 px après l'ajout des variantes 640/1024 (G.4).
- **Cibles tactiles : corrigées en passe 2** — 769 occurrences < 24 px (cumul des 7 viewports) → **0** : navigation ≈ 25 px de haut, icônes sociales ≥ 24 px, case de réservation 24×24 px ; correction par padding + marges négatives (aucun décalage visuel mesuré) ; vérifié à 320/375/768/1366 px (et sur les 7 viewports au ré-audit final).

---

## E. Fichiers modifiés et justifications

**15 fichiers modifiés** (tous suivis par git, aucun commit) — retouches de la passe 2 incluses :

| Fichier | Justification |
|---|---|
| `src/css/style.css` | Suppression du `@import` Google Fonts (chaîne bloquante externe) ; ajout de 6 blocs `@font-face` locaux avec `font-display: swap` et `unicode-range` latin (identique à Google → aucun changement de rendu). |
| `src/html/index.html` | Hero en 3 WebP + `srcset`/`sizes`/preload/`fetchpriority` ; vignettes WebP + `-card` ; attributs `width`/`height` ; `loading="lazy"` hors LCP ; preload des polices ; **restructuration du `<dl>`** (dt/dd enfants directs — corrige les audits a11y `definition-list`/`dlitem`, rendu inchangé au pixel) ; espacements du footer ; **passe 2 : hero ré-encodé q74 (28,9/58,7/88,2 Ko), preload de la graisse 700 retiré**. |
| `src/html/actevitiy.html` | Idem (hero + 8 vignettes), page la plus lourde du site. |
| `src/html/apropos.html` | WebP, dimensions, lazy, polices locales ; **passe 2 : classes sans définition corrigées via tokens existants (`text-primary-dark` → `text-primary` ×8, `border-line` → `border-card-line` ×4), gaps du footer 0,8 → 0,6 rem (hauteur +6/+10 px, volontaire — G.6)**. |
| `src/html/contact.html` | Variantes 640/1024 de l'image LCP + `srcset`/`sizes` + preload `imagesrcset`/`imagesizes` + `fetchpriority="high"` ; polices locales ; **passe 2 : liens de contact élargis (`py-[4px]` + `-my-[4px]` → cible ≈ 25 px, rendu inchangé)**. |
| `src/html/faq.html` | Polices locales + preloads ; espacements du footer ; aucun visuel modifié. |
| `src/html/reservation.html` | WebP, dimensions, lazy, polices locales, footer ; **passe 2 : case à cocher 24×24 px (`w-[24px] h-[24px] shrink-0` — Chrome ignore le padding sur checkbox native), liens de contact élargis**. |
| `src/html/detaille_acte/actv-1.html` … `actv-8.html` (8 fichiers) | Galeries en WebP 1200 px + dimensions + lazy ; preload (et `fetchpriority` sur `actv-1`) de la 1ʳᵉ image de galerie pour `actv-2..8` ; polices locales ; footer ; **passe 2 : `actv-1` → preload de la graisse 700 retiré ; `actv-2..8` → variantes 640/1024 + `srcset`/`sizes` + `fetchpriority="low"` sur les 14 vignettes critiques**. |

**54 fichiers ajoutés** (48 WebP + 6 polices ; chemins par défaut `public/`, servis tels quels par GitHub Pages) :

| Ajouts | Justification |
|---|---|
| `public/fonts/plus-jakarta-sans-{400,500,600,700,800,italic-400}.woff2` (6 fichiers, 146 Ko) | Auto-hébergement de la police : supprime 2 résolutions DNS + poignées de main TLS externes et permet le préchargement des graisses critiques. Fichiers identiques à ceux servis auparavant par Google (sous-ensemble latin, 27,3 Ko pièce). |
| `public/images/*.webp` (48 fichiers, 3 208 Ko) | Conversions WebP (q74–80) + variantes dédiées : hero 640/1024/1365, contact 640/1024/1200, `-card` 600 px (×7), avatars 120×120 (×3), **galeries 640/1024 (×16, passe 2)**. Les 18 JPG sources ont été supprimés lors du nettoyage final (H), après vérification de zéro référence. |

**6 fichiers supprimés** (vérification préalable : zéro référence dans tout le dépôt) :

| Fichiers | Vérification |
|---|---|
| `public/images/hero-bg.jpg`, `kayak.jpg`, `bateau.jpg`, `gourougou.jpg`, `cuisine.jpg` (0 octet chacun) | Recherche `grep` sur toutes les sources + HTML construit : aucune référence ; aucun impact sur le build ni les pages |
| `public/favicon.ico` (0 octet) | Le favicon réellement déclaré/servi est `logo.svg` (référencé dans les 14 pages) — l'icône fonctionne (vérifié à l'affichage) |

**Fichiers volontairement non modifiés :** `public/index.html` (redirection), `vite.config.*`, `package.json`/`package-lock.json`, workflow GitHub Actions, `README.md`, `.vscode/settings.json`, textes/couleurs/composants de toutes les pages. (Le dossier `html/` racine, obsolète, a été supprimé lors du nettoyage final — H.)

**Vérifications automatiques passées :** aucun `.jpg` restant dans le HTML construit ; 100 % des `src`/`srcset` pointent vers des fichiers existants et non vides ; preloads cohérents avec les `srcset` (2–3 preloads de polices selon la page — validateur adapté) ; hero servi en q74 confirmé dans `dist/` (58,7 Ko @1024) ; chemins réécrits correctement pour GitHub Pages (`/marchica-trips/...`) ; `npm run build` sans erreur ; 0 fichier image vide restant dans `public/`.

---

## F. Conclusion

### Gains
- **Poids divisé par ~2,4** sur l'ensemble du site (−58 % @375, −52 % @1366) ; jusqu'à **−75 %** sur `actv-1`.
- **LCP transformés** : 5,6–7,1 s → 2,4–2,6 s sur mobile simulé (accueil, activités, détail) ; contact et `actv-1` sous la cible (2,42 s) ; galeries allégées (`actv-2` : 4,29 → 2,94 s — variantes 640/1024 d'abord, puis priorité basse des vignettes : 3,17 → 2,94 s).
- **Scores Lighthouse** : Perf mobile 76–99 → **95–100** ; desktop 100 ; **a11y 100 sur les 8 pages mesurées** (accueil corrigé de 92 à 100).
- **CLS = 0** et **TBT = 0** maintenus avant/après ; 0 erreur réseau, 0 débordement horizontal (98 combinaisons page × viewport, re-vérifié après la passe 2) ; **cibles tactiles : 769 → 0**.
- **Suppression d'une dépendance externe bloquante** (Google Fonts) : moins de latence de rendu du texte (FCP : −0,3 à −0,6 s selon les pages), meilleure confidentialité, site plus résilient hors-ligne partiel.
- **Design intact** : vérifié par comparaison de captures et analyse géométrique (diff pixel 0,00 % sur contact, ≤ 2,15 % ailleurs — ré-encodage WebP) ; seuls deux ré-agencements volontaires de hauteur de page (G.5/G.6).

### Régressions
- **faq uniquement** : +107 Ko de chargement initial (les polices sont désormais chargées tôt et préchargées, alors qu'une seule graisse arrivait dans la fenêtre initiale auparavant). C'est un **transfert du moment** du téléchargement : le total d'octets de polices reste identique (mêmes fichiers que Google), la chaîne cross-origin bloquante disparaît, et la page **reste la plus rapide du site** : Lighthouse 99 → **100**, LCP inchangé (1,66 s), FCP 1,68 s → 1,06 s.
- **FCP accueil et `actv-1`** : +0,15 s environ (1,37 → 1,52 s ; 1,07 → 1,22 s) — contrepartie assumée du retrait du preload de la graisse 700, qui libère la bande passante au profit du LCP (gain mesuré −0,15 à −0,26 s en A/B apparié, G.2/G.3). Le texte s'affiche donc un peu plus tard, dans la même police (aucun FOIT, `font-display: swap`).

### Limites
- **LCP accueil mobile : 2,42 s** en médiane (2,26–2,57 s selon les runs — la machine de test alterne deux régimes sous contention, G.1/G.2). En conditions appariées, la passe 2 a rapporté **−0,26 s** (2,52 → 2,26 s) ; le dernier run officiel donne 2,56 s (TBT 0).
- **`actv-2` : 2,94 s** (cible 2,5 s) — page à nombreuses vignettes au premier écran ; c'était 4,29 s avant la passe 2 (variantes 640/1024 + priorité basse des vignettes). C'est la seule page encore au-dessus de la cible.
- **`apropos`** : image de galerie `actevity5.webp` (736×981, 162 Ko) encore servie sans variante mobile (gain estimé 80–100 Ko @375).
- **INP non mesuré** (pas de données terrain) — site sans JS, TBT 0 ms.
- **Polices sur le chemin critique** : ~55–80 Ko selon la page (2–3 graisses réellement utilisées au premier écran, décision page par page en passe 2).
- **Variance de mesures** : selon la charge de la machine, les pages à image LCP varient de ±0,3 s (thread principal 2–3× plus lent sous contention — `Style & Layout` 718 ms vs 2 050 ms sur la même page et la même configuration). Les deltas de ce rapport sont **appariés** (variantes jouées dans la même session) ; une re-mesure sur machine au repos (ou en CI) est recommandée avant toute publication externe de chiffres absolus.
- **Restant hors périmètre — résolu au nettoyage final (H)** : dossier `html/` racine obsolète (contenu en mojibake, non utilisé par le build) et 18 sources JPG (≈ 3,7 Mo) — les deux supprimés après vérification de zéro référence.

### Actions restantes recommandées
1. `actv-2` : ramener le LCP sous 2,5 s — pistes : AVIF sur les vignettes critiques, réduire le nombre de vignettes au premier écran, `sizes` plus précis.
2. Générer des variantes 640/1024 pour `actevity5.webp` (`apropos`, 162 Ko) — gain estimé 80–100 Ko @375.
3. ~~Décider du sort des 18 JPG sources~~ → **fait** au nettoyage final (H) : supprimés après vérification (0 référence ; récupérables via l'historique git).
4. Re-mesurer sur machine au repos (ou en CI) pour figer des chiffres absolus stables (la variance ±0,3 s de cette machine est documentée en G.1).
5. AVIF : −20 à −30 % supplémentaires sur les visuels, une fois le parc navigateurs cible confirmé.
6. INP : nécessite des données terrain (CrUX) — non mesurable en labo sur un site sans JS.
7. ~~Dossier `html/` racine obsolète~~ → **fait** au nettoyage final (H) : supprimé (14 fichiers, 216 Ko).

---

## G. Passe 2 — optimisations ciblées

Après la passe 1, sept chantiers restaient ouverts (ancienne liste « Actions restantes »). Ils ont été traités un par un — **chaque décision reposant sur une mesure A/B**, rien n'a été conservé sans gain vérifié, et rien n'a été publié (modifications non commitées).

### G.1 Méthode et variance de la machine de test
- **Mêmes conditions** que la passe 1 pour chaque mesure : Lighthouse 13.5.0, mobile émulé 4G, CPU ×4, mêmes flags, même serveur (`vite preview`, port 4173).
- **Tests A/B appariés** : chaque variante est jouée dans la **même session** que sa référence (2 runs minimum), sur le même build. Scripts : `lcp-run.mjs` (accueil), `lcp-page.mjs` (activités, `actv-2`), `lcp-actv2-lazy.mjs`, `lcp-actv2-low.mjs` — 25 runs de variantes au total (`out/lcp-variants.json`).
- **Contrôle qualité des runs** : le TBT sert de sonde de contention ; les runs pollués sont refaits (`lh-clean-retry.mjs`).
- **Variance observée (à connaître pour interpréter les chiffres)** : la machine alterne deux régimes sur la **même page et la même configuration** — p. ex. accueil : régime « rapide » `Style & Layout` ≈ 718 ms → LCP 2,26–2,45 s ; régime « lent » `Style & Layout` ≈ 2 050 ms → LCP 2,55–2,60 s (TBT parfois 0 dans les deux cas). Cause : contention locale (défenseur, démon tiers, batterie à 10 %). Les **deltas appariés de cette section sont donc la référence** ; les valeurs absolues des sections A/C sont des médianes.

### G.2 LCP accueil (index mobile) — décision : hero q74 **et** retrait du preload 700
A/B apparié (2 runs par variante, même session ; TBT = 0 partout sauf le run 2 de la base à 211 ms — contention, LCP inchangé) :

| Variante | Hero 1024 | Run 1 | Run 2 | Médiane | FCP |
|---|---|---|---|---|---|
| Base (q80, 3 preloads) | 72,5 Ko | 2,52 s | 2,53 s | 2,52 s | 1,41–1,43 s |
| q74 (3 preloads) | 58,9 Ko | 2,64 s | 2,42 s | 2,53 s | 1,37 s |
| q80, sans preload 700 | 72,5 Ko | 2,41 s | 2,41 s | 2,41 s | 1,52 s |
| **q74 + sans preload 700 (retenu)** | 58,9 Ko | **2,27 s** | **2,26 s** | **2,26 s** | 1,52 s |

- Élément LCP identique dans tous les runs (l'`<img>` hero) ; sous-parties Lighthouse (run médian) : `resourceLoadDuration` 48 → 11 ms, `elementRenderDelay` 375 → 196 ms — le gain vient du hero plus léger **et** de la bande passante rendue disponible, pas d'un artefact de mesure.
- Trade-off assumé : FCP 1,41 → 1,52 s (la graisse 700 arrive un peu plus tard ; `font-display: swap`, aucun FOIT).
- Visuel : comparaison q80 vs q74 (mobile + desktop) — équivalents à l'œil ; capture et crops conservés.

### G.3 Autres pages — décisions mesurées

| Page | Test | Résultats (runs) | Décision |
|---|---|---|---|
| `actv-1` | sans preload 700 | 2,57 / 2,43 / 2,57 s (base) vs **2,42 / 2,57 / 2,43 / 2,42 s** (variante) | **retenu** — médiane 2,43 vs 2,57 ; FCP 1,07 → 1,22 s assumé ; officiel final **2,42 s** |
| activités | sans preload 700 | 2,35 s (base) vs 2,27 s (run contaminé) / 2,42 s (variante) | **écarté** (pas de gain fiable) — 3 preloads conservés ; la page hérite du hero q74 |
| `actv-2` | sans preload 700 | 3,17 / 3,16 s vs 3,16 / 3,16 s | écarté |
| `actv-2` | `loading="lazy"` **+** `fetchpriority="low"` sur les vignettes | 2,94 / 2,93 s vs 2,95 / 2,95 s (`low` seul) | **`lazy` sans valeur ajoutée** (vignettes au-dessus de la ligne de flottaison) → conservé : `low` seul |
| `actv-2` | `fetchpriority="low"` sur les vignettes | 3,17 / 3,16 s → **2,95 / 2,95 s** | **retenu** — appliqué aux 14 vignettes de `actv-2..8` (2/page) ; officiel final 2,94 s |

### G.4 Galeries `actv-2..8` — variantes 640/1024 + `srcset`
- 16 variantes **q78 générées depuis les JPG sources** (pas de ré-encodage en cascade) ; `srcset` avec `sizes="(min-width: 1024px) 280px, 50vw"`, descripteur `1200w` conservé pour le fichier d'origine.
- Tailles (Ko, 640/1024/1200) : sentier 40,9/96,6/112,3 ; panorama 58,1/156,8/190,8 ; lagune-mar-chica 20,5/47,3/54,7 ; promenade 43,6/114,7/139,1 ; coucher-soleil 10,9/26,2/30,8 ; standup 50,6/132,3/162,7 ; equitation 18,2/43,9/51,2 ; cheval-barbe 34,6/84,9/96,7 — **16 fichiers, 980 Ko**.
- Effet : les poids de page fondent quand le DPR choisit la variante 640 (p. ex. `actv-7` : 586 → 382 Ko @375, `actv-2` : 551 → 341 Ko) ; netteté vérifiée par comparaison de crops à 375/768/1366 px.
- Avant variantes, le LCP mesuré de `actv-2` était 4,29 s ; avec `srcset` : 3,17 s ; avec `fetchpriority="low"` : 2,94 s (G.3).

### G.5 Cibles tactiles — 769 → 0
- Cumul des 7 viewports des 14 pages : **769 occurrences < 24 px** (passe 1) → **0** après la passe 2.
- Technique : **padding + marges négatives** (la cible grandit sans décaler la mise en page) — navigation ≈ 25 px de haut, icônes sociales ≥ 24 px ; vérifié aux largeurs 320/375/768/1366 px sur les pages concernées, puis sur les 14 pages × 7 viewports au ré-audit final.
- Case de réservation : `w-[24px] h-[24px] shrink-0 accent-primary`. Constat vérifié : Chrome **ignore le padding sur une checkbox native** (même en `!important` — computed style 0 px) et la largeur était écrasée par `flex-shrink` ; d'où des dimensions explicites.
- Effet de bord assumé : le libellé de consentement passe à 4 lignes @375 (page +19 px, voir G.8).

### G.6 `apropos` — classes sans définition et gaps footer
- 8 usages de `text-primary-dark` → `text-primary` et 4 de `border-line` → `border-card-line` : uniquement des **tokens existants** du `@theme` — aucune couleur inventée, maquette inchangée.
- Gaps du footer : `gap-[0.8rem]` → `gap-[0.6rem]` (2 blocs) — hauteur de page **+10 px @375** et **+6 px @768/1366** (changement volontaire).
- Vérification : les éléments concernés ont désormais une règle CSS effective (computed styles) ; le contrôle géométrique ne montre que des décalages attendus dans le footer (±1,6 px).

### G.7 Fichiers vides — supprimés après vérification
| Fichier | Taille | Preuve avant suppression |
|---|---|---|
| `public/images/hero-bg.jpg`, `kayak.jpg`, `bateau.jpg`, `gourougou.jpg`, `cuisine.jpg` | 0 octet | `grep` sur toutes les sources + HTML construit : 0 référence ; aucun effet sur le build |
| `public/favicon.ico` | 0 octet | Le favicon réellement servi est `logo.svg` (référencé dans les 14 pages) ; affichage de l'icône vérifié |

Aucun autre fichier supprimé à ce stade ; les 18 JPG sources ont été supprimés au nettoyage final (H).

### G.8 Vérifications finales de la passe 2
- `npm run build` : OK ; `validate-html.mjs` : OK (2–3 preloads de polices acceptés selon la page) ; `check-build.mjs` : OK (chemins GitHub Pages, 0 JPG référencé, hero q74 servi, preloads cohérents avec les `srcset`).
- Ré-audit Puppeteer (14 pages × 7 viewports) : **0 petite cible, 0 débordement, 0 erreur** ; poids init **4 126 Ko @375 (−58 %)** et **4 776 Ko @1366 (−52 %)**.
- Contrôle géométrique (rectangles des éléments, avant/après passe 2) : 316 variations de taille bénignes (marges de texte) + 79 décalages, **tous expliqués** (gaps footer d'`apropos`, padding de navigation, libellé de consentement) — aucun dégât imprévu.
- Captures : hauteurs identiques partout sauf les 2 ré-agencements volontaires ; diff pixel **contact 0,00 %**, autres pages ≤ 2,15 % (ré-encodage WebP).
- Lighthouse final (build figé) :

| Page | Perf | LCP | FCP | TBT | CLS | Poids LH |
|---|---|---|---|---|---|---|
| index (mobile) | 97 | 2,56 s¹ | 1,51 s | 0 | 0 | 585 Ko |
| index (desktop) | 100 | 0,67 s | 0,37 s | 0 | 0 | 570 Ko |
| actevitiy | 97 | 2,57 s | 1,38 s | 0 | 0 | 730 Ko |
| contact | 98 | 2,42 s | 1,07 s | 23 ms* | 0 | 236 Ko |
| actv-1 | 98 | 2,42 s | 1,22 s | 0 | 0 | 254 Ko |
| actv-2 | 95 | 2,94 s | 1,07 s | 0 | 0 | 371 Ko |
| apropos | 99 | 2,25 s | 1,06 s | 0 | 0 | 341 Ko |
| faq | 100 | 1,66 s | 1,06 s | 0 | 0 | 120 Ko |

¹ Dernier run officiel ; médiane des runs de l'accueil : 2,42 s (G.1). *Seul TBT non nul observé sur l'ensemble des runs finaux (machine chargée à cet instant).

### G.9 Points restants de la passe 2
1. `actv-2` : LCP 2,94 s (> cible 2,5 s) — la seule page encore au-dessus.
2. `apropos` : variantes 640/1024 pour `actevity5.webp` (162 Ko, gain estimé 80–100 Ko @375).
3. Variance machine : une re-mesure sur machine au repos (ou en CI) reste recommandée pour figer des chiffres absolus destinés à publication externe.

---

## H. Nettoyage final (passe 3) — non commité

Inventaire complet du dépôt, puis suppression **uniquement** des éléments dont l'inutilité a été vérifiée : matrice de références (`refmatrix.mjs` — chaque image/police confrontée à tous les fichiers texte du dépôt : HTML, CSS, JSON, MD, YML, avec distinction attribut/texte), audit des tokens (`tokencheck.mjs` — 448 classes distinctes des pages), et contrôle des usages du dossier `html/` par le build, le workflow et les pages.

### H.1 Fichiers supprimés
| Élément | Poids | Justification / preuve |
|---|---|---|
| `html/` (racine, 14 fichiers HTML) | 216 Ko | Doublon obsolète pré-optimisation : contenu en mojibake, uniquement des `.jpg` pleine résolution (0 WebP, 0 `srcset`). Non utilisé par `vite build` (entrées = `src/html/`), non publié (`upload-pages-artifact` = `dist/`), non référencé par `public/index.html`, `vite.config.js`, le workflow ni le README. Récupérable via git (suivi à HEAD). |
| `public/images/*.jpg` (18 fichiers) | 3 674 Ko | Anciennes images remplacées par WebP : chaque JPG a une contrepartie WebP **référencée et fonctionnelle** (H.2) ; après retrait du dossier `html/`, plus **aucune** référence `src`/`href`/`srcset` dans `src/`+`public/` (0 vérifié) ; plus aucun `.jpg` en attribut dans le HTML construit. Récupérables via git (suivis à HEAD). |

### H.2 Correspondance JPG → WebP (remplacements vérifiés)
- `acitivite1`, `acteviti2`, `actevitie3`, `actevity4`, `actevity5`, `actevity6`, `actevity8`, `tivity7` → `*.webp` + `-card` (+ `-avatar` ×3 — tous référencés).
- `hero_actevity.jpg` → `hero_actevity-{640,1024,1365}.webp` (hero partagé par index, actevitiy, actv-1, apropos).
- `cheval-barbe-tanger`, `coucher-soleil-nador`, `equitation-plage-essaouira`, `lagune-mar-chica-nador`, `lagune-marchica`, `panorama-mar-chica-nador`, `promenade-mar-chica-nador`, `sentier-gourougou-nador`, `standup-paddle-lagune` → `*.webp` + `-640`/`-1024`.
- Contrôle automatique : les **48 WebP** sont toutes référencées au moins une fois ; **0 JPG** référencé.

### H.3 Éléments examinés et conservés (avec justification)
- **48 WebP + `logo.svg`** : toutes référencées (images de contenu, logo et favicon).
- **6 polices woff2** : toutes déclarées en `@font-face` ; graisses/styles réellement utilisés dans les pages (`font-medium`, `font-semibold`, `font-bold`, `font-extrabold`, `italic`, `not-italic`).
- **Les 24 tokens `@theme`** : chacun utilisé par au moins une classe des pages ou un `var()` — aucune règle morte à retirer.
- **CSS du menu `#menu-mobile`/`#menu-principal`** : les deux IDs existent dans les pages concernées (navigation mobile sans JS).
- **Commentaires HTML** : repères de structure + **attributions Wikimedia Commons (licences CC BY-SA)** citant les fichiers sources d'origine (externes) — conservés.
- **`sharp` et `puppeteer`** (devDependencies, présentes à HEAD, inchangées) : outillage d'optimisation d'images et d'audit navigateur du projet ; `vite`, `tailwindcss`, `@tailwindcss/vite` : nécessaires au build.
- `README.md`, `.vscode/settings.json`, `.github/` (workflow + template PR), `package.json`/`package-lock.json` : fichiers de dépôt, conservés.

### H.4 Vérifications exécutées après nettoyage
- `npm run build` : OK (15 modules, 441 ms ; CSS `style-BJ6HcQPF.css`).
- `validate-html.mjs` : **« VALIDATION OK — aucune anomalie »** (widths/heights, fichiers existants non vides, 0 `.jpg`, preloads 2–3 polices).
- `check-build.mjs` : OK — chemins GitHub Pages, 0 Google Fonts, 6 `@font-face`, hero `srcset` q74, **0 `.jpg` en attribut** dans le HTML construit.
- Matrice finale (`refmatrix.mjs`) : 49 images restantes, **toutes référencées**, aucune orpheline.
- Ré-audit Puppeteer (14 pages × 7 viewports) : **0 erreur réseau, 0 petite cible, 0 débordement, 0 image sans dimensions** — preuves : `out/mesures-cleanup.json`, `out/screenshots-cleanup/`.
- `dist/` final : **71 fichiers / 3 629 Ko** (48 WebP + logo + 6 polices + 15 pages + 1 CSS + redirection) ; les fichiers exigés par le workflow sont présents (`dist/index.html`, `dist/src/html/index.html`) → déploiement GitHub Pages compatible.
- Git : **38 suppressions** (6 fichiers vides + favicon de la passe 1, 14 `html/`, 18 JPG), 15 modifiés, 50 non suivis — **rien n'a été commité** (HEAD `5e14fd0`).

### H.5 Points restants (hérités, hors nettoyage)
1. `actv-2` : LCP 2,94 s (seule page > cible) ; 2. variantes 640/1024 pour `actevity5.webp` ; 3. AVIF ; 4. INP ; 5. re-mesure machine au repos. Les 18 JPG restent récupérables via l'historique git si besoin.

---

*Toutes les mesures brutes (JSON Lighthouse, JSON réseau Puppeteer, captures avant/après, données de variantes `out/lcp-variants.json`, preuve de variance `after-*.json`) restent disponibles dans `C:\Users\pc\AppData\Local\Temp\opencode\marchica-audit\` jusqu'à nettoyage du dossier temporaire.*
