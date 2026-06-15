import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Le chiamate del browser a /api vengono inoltrate al backend Express
      // del Lab 1 (porta 3000). Per il browser è tutto "localhost:5173",
      // quindi NIENTE CORS da configurare.
      '/api': 'http://localhost:3000',
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
});
