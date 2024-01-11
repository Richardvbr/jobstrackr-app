import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData:
          '@import "./src/styles/_variables.scss"; @import "./src/styles/_buttons.scss"; @import "./src/styles/_inputs.scss"; @import "./src/styles/_typography.scss"; @import "./src/styles/reset.scss";',
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
          if (id.includes("node_modules")) {
            return id.toString().split("node_modules/")[1].split("/")[0].toString();
          }
        },
      },
    },
  },
});
