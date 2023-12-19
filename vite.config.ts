import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData:
          '@import "./src/styles/_variables.scss"; @import "./src/styles/_buttons.scss"; @import "./src/styles/_inputs.scss"; @import "./src/styles/_typography.scss"; @import "./src/styles/_fonts.scss"; @import "./src/styles/reset.scss";',
      },
    },
  },
  plugins: [react(), tsconfigPaths()],
});
