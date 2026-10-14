import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        activites: resolve(__dirname, 'html/activites.html'),
        detail: resolve(__dirname, 'html/detail-activite.html'),
        reservation: resolve(__dirname, 'html/reservation.html'),
        faq: resolve(__dirname, 'html/faq.html'),
      },
    },
  },
});
