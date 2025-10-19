import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Base URL for GitHub Pages (use '/' for custom domain)
  base: '/',
  
  build: {
    minify: 'terbase',
    terbaseOptions: {
      compress: {
        drop_console: true,
      },
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
      },
      output: {
        manualChunks: undefined,
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
