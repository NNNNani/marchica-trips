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
        activites: resolve(__dirname, 'src/html/actevitiy.html'),
        detail: resolve(__dirname, 'src/html/detail-actevity.html'),
        reservation: resolve(__dirname, 'src/html/reservation.html'),
        apropos: resolve(__dirname, 'src/html/apropos.html'),
        faq: resolve(__dirname, 'src/html/faq.html'),
      },
    },
  },
});
