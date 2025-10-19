import { defineConfig } from 'vite';

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
