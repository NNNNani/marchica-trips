# 🌊 Marchica Trips

### Découvrez la lagune de Marchica autrement

**Marchica Trips** est une plateforme web responsive dédiée à la découverte des activités touristiques autour de la lagune de Marchica, à Nador, au Maroc. Elle permet aux visiteurs de découvrir des expériences uniques, de consulter les informations pratiques et de préparer leurs réservations facilement.

---

## 📌 Présentation du projet

Ce projet consiste à concevoir et développer une interface web moderne, intuitive et accessible, adaptée aux besoins des voyageurs locaux et internationaux.

L'objectif est d'offrir une expérience utilisateur fluide sur mobile, tablette et ordinateur, tout en valorisant le patrimoine naturel et culturel de la région de Nador.

---

## ✨ Fonctionnalités

- 🏠 **Accueil** — présentation de l'agence et mise en avant des activités phares.
- 📋 **Catalogue des activités** — découverte des excursions et expériences proposées.
- 🔍 **Détail des activités** — galerie photos, programme, tarifs et informations pratiques.
- 📅 **Réservation** — formulaire avec champs accessibles et validation HTML native.
- ❓ **FAQ** — réponses aux questions fréquentes des visiteurs via accordéons sans JavaScript.
- 📱 **Menu responsive** — navigation mobile accessible sans JavaScript (`<details>` / `<summary>`).
- ♿ **Accessibilité** — navigation au clavier, focus visible et contrastes conformes aux bonnes pratiques WCAG AA.
- 🎨 **Design System** — composants et styles visuels cohérents et réutilisables basés sur Tailwind CSS v4.

---

## 🛶 Activités proposées

- Kayak sur la lagune de Marchica
- Balades en bateau
- Randonnées au mont Gourougou
- Découverte de la gastronomie locale
- Observation des oiseaux et découverte de la nature

---

## 🛠️ Technologies et contraintes techniques

| Technologie | Rôle dans le projet |
|---|---|
| **HTML5** | Structure sémantique et accessible des pages, validation native des formulaires |
| **Tailwind CSS v4** | Framework utilitaire moderne et Design System centralisé via `@theme` |
| **Vite** | Environnement de développement rapide et outil de build de production |
| **CSS personnalisé** | Styles complémentaires intégrés via `src/css/style.css` si nécessaire |
| **Git & GitHub** | Gestion de versions et workflow collaboratif |
| **Figma** | Maquettes haute fidélité et Design System |

> **Contrainte stricte :** Aucun JavaScript applicatif personnalisé n'est utilisé dans le projet. Les interactions (comme le menu mobile ou les accordéons FAQ) sont gérées exclusivement en HTML/CSS natif (notamment avec les balises `<details>` et `<summary>`). Le seul fichier `.js` présent est `vite.config.js`, qui sert uniquement à la configuration de l'outillage Vite.

---

## 📂 Structure du projet

L'arborescence du projet est organisée selon la structure suivante :

```text
marchica-trips/
├── index.html                 # Page d'accueil
├── activites.html             # Liste des activités touristiques
├── detail-activite.html       # Détails, programme, prix, galerie et infos pratiques d'une activité
├── reservation.html           # Formulaire de réservation
├── faq.html                   # Questions fréquentes
├── src/
│   └── css/
│       └── style.css          # Entrée CSS principale (Tailwind CSS v4 + @theme + styles personnalisés)
├── public/
│   ├── images/                # Images et photographies du site
│   └── icons/                 # Icônes vectorielles et graphiques
├── package.json               # Métadonnées du projet et scripts npm (Vite, Tailwind CSS)
├── package-lock.json          # Fichier de verrouillage des dépendances npm
├── vite.config.js             # Configuration Vite (plugin @tailwindcss/vite)
├── .gitignore                 # Règles d'exclusion pour Git
└── README.md                  # Documentation complète du projet
```

### Rôle des pages et fichiers clés

- **`index.html`** : Page d'accueil présentant le concept de Marchica Trips, les points forts de la région et les activités vedettes.
- **`activites.html`** : Catalogue complet des activités touristiques proposées avec filtres ou catégorisations visuelles.
- **`detail-activite.html`** : Page détaillée dédiée à une activité spécifique (galerie photos, itinéraire, programme détaillé, tarifs, durée, matériel inclus et recommandations).
- **`reservation.html`** : Formulaire de réservation accessible avec validation native HTML5 (champs requis, types de saisie, limites de dates et de participants).
- **`faq.html`** : Réponses aux questions fréquentes des voyageurs, organisées à l'aide d'éléments natifs `<details>` et `<summary>` sans script.
- **`src/css/style.css`** : Point d'entrée des styles important Tailwind CSS v4 (`@import "tailwindcss";`), les design tokens du thème (`@theme`) et les ajustements CSS personnalisés.
- **`public/images/` & `public/icons/`** : Répertoires d'actifs statiques servis directement par Vite (photos de la lagune, logos, icônes SVG).
- **`package.json`** : Déclare les scripts d'exécution (`dev`, `build`, `preview`) et les dépendances du projet (`vite`, `@tailwindcss/vite`, `tailwindcss`).
- **`vite.config.js`** : Fichier de configuration Vite intégrant le plugin officiel `@tailwindcss/vite`.

---

## 🚀 Installation et démarrage

Suivez ces instructions pour installer les dépendances et exécuter le projet localement.

### Prerequis

Assurez-vous que les outils suivants sont installés sur votre machine :
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (incluant npm)

Vérifiez les versions installées dans votre terminal :

```bash
node -v
npm -v
```

### 1. Cloner le dépôt

Si vous n'avez pas encore téléchargé le projet :

```bash
git clone https://github.com/zakarya0roua/Marchica-Trips.git
```

### 2. Accéder au dossier du projet

Ouvrez un terminal directement dans le dossier racine du projet :

```bash
cd Marchica-Trips
```

### 3. Installer les dépendances

Installez les dépendances déclarées dans `package.json` :

```bash
npm install
npm run dev      # serveur local : http://localhost:5173
npm run build    # build production dans dist/
npm run preview  # prévisualiser le build
```

Pages : `/` (accueil), `/html/activites.html`, `/html/detail-activite.html`, `/html/reservation.html`, `/html/faq.html`.

> Images : placez les 8 photos d'activités dans `public/images/` (référencées en `/images/...` dans `activites.html`).
