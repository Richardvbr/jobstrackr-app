import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData:
          '@use "@/styles/_variables.scss"; @use "@/styles/_buttons.scss"; @use "@/styles/_inputs.scss"; @use "@/styles/_typography.scss"; @use "@/styles/reset.scss";',
      },
    },
  },
  server: {
    port: 3000,
  },
  plugins: [react(), tsconfigPaths()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    },
  },
});
