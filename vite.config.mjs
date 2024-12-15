import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/Bidzy-Semester-project/", // For GitHub Pages
  build: {
    target: "esnext",
    outDir: "./dist", // Output-mappen
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"), // index.html i rot
        login: resolve(__dirname, "src/html/login.html"),
        register: resolve(__dirname, "src/html/register.html"),
        productpage: resolve(__dirname, "src/html/productpage.html"),
        profile: resolve(__dirname, "src/html/profile.html"),
        search: resolve(__dirname, "src/html/search.html"),
        mylistings: resolve(__dirname, "src/html/mylistings.html"),
      },
    },
  },
});
