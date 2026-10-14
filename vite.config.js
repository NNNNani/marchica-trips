import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// La page Accueil vit dans src/html/ : on conserve la racine "/" fonctionnelle
// en dev en la dirigeant vers public/index.html (qui redirige vers la page).
const racineVersAccueil = {
  name: 'racine-vers-accueil',
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      if (req.url === '/') req.url = '/index.html';
      next();
    });
  },
};

export default defineConfig({
  base: './',
  plugins: [tailwindcss(), racineVersAccueil],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/html/index.html'),
        activites: resolve(__dirname, 'src/html/actevitiy.html'),
        detail: resolve(__dirname, 'src/html/detail-actevity.html'),
        reservation: resolve(__dirname, 'src/html/reservation.html'),
        apropos: resolve(__dirname, 'src/html/apropos.html'),
        faq: resolve(__dirname, 'src/html/faq.html'),
      },
    },
  },
});

