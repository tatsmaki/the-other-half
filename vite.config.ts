import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint";

export default defineConfig({
  plugins: [eslint()],
  base: "/",
  build: {
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    open: true,
  },
});
