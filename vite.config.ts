import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint";

export default defineConfig({
  plugins: [eslint()],
  base: "/",
  server: {
    port: 3000,
    open: true,
  },
});
