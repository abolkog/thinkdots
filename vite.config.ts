import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

import { fileURLToPath, URL } from 'url';

const isProd = process.env.NODE_ENV === 'production';

// https://vite.dev/config/
export default defineConfig({
  base: isProd ? '/thinkdots/' : '/',
  server: {
    port: 3000,
    open: true,
  },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'ThinkDots',
        short_name: 'ThinkDots',
        description: 'A simple, open-source color code-breaking game',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/icons/icon.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
      '@util': fileURLToPath(new URL('./src/util', import.meta.url)),
      '@router': fileURLToPath(new URL('./src/router', import.meta.url)),
      '@context': fileURLToPath(new URL('./src/context', import.meta.url)),
      '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
      '@services': fileURLToPath(new URL('./src/services', import.meta.url)),
      '@test': fileURLToPath(new URL('./test', import.meta.url)),
    },
  },
});
