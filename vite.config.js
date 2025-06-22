import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: ".",
  publicDir: "public",
  base: "/urban-unkraut/", // wichtig für GitHub Pages
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        library: resolve(__dirname, "library.html"),
        arExperience: resolve(__dirname, "arExperience.html"),
      },
    },
  },
});
