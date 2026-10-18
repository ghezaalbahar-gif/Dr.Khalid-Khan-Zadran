import { copyFileSync, existsSync } from 'node:fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/**
 * GitHub Pages serves 404.html for any path it cannot find. Copying the built
 * shell over it lets a deep link such as /procedures load the app and let the
 * router render the right page instead of dead-ending.
 */
const spaFallback = {
  name: 'spa-404-fallback',
  closeBundle() {
    if (existsSync('dist/index.html')) copyFileSync('dist/index.html', 'dist/404.html');
  },
};

export default defineConfig({
  base: '/Dr.Khalid-Khan-Zadran/',
  plugins: [react(), tailwindcss(), spaFallback],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
    css: false,
  },
});
