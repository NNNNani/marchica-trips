import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: resolve(__dirname, 'src'),
  publicDir: resolve(__dirname, 'public'),
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        activites: resolve(__dirname, 'src/html/activites.html'),
        detail: resolve(__dirname, 'src/html/detail-activite.html'),
        reservation: resolve(__dirname, 'src/html/reservation.html'),
        faq: resolve(__dirname, 'src/html/faq.html'),
      },
    },
  },
});
