import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

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
        detail: resolve(__dirname, 'src/html/detaille_acte/actv-1.html'),
        'actv-2': resolve(__dirname, 'src/html/detaille_acte/actv-2.html'),
        'actv-3': resolve(__dirname, 'src/html/detaille_acte/actv-3.html'),
        'actv-4': resolve(__dirname, 'src/html/detaille_acte/actv-4.html'),
        'actv-5': resolve(__dirname, 'src/html/detaille_acte/actv-5.html'),
        'actv-6': resolve(__dirname, 'src/html/detaille_acte/actv-6.html'),
        'actv-7': resolve(__dirname, 'src/html/detaille_acte/actv-7.html'),
        'actv-8': resolve(__dirname, 'src/html/detaille_acte/actv-8.html'),
        reservation: resolve(__dirname, 'src/html/reservation.html'),
        contact: resolve(__dirname, 'src/html/contact.html'),
        apropos: resolve(__dirname, 'src/html/apropos.html'),
        faq: resolve(__dirname, 'src/html/faq.html'),
      },
    },
  },
});

