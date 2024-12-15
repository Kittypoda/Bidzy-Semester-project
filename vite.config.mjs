import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  appType: "mpa", // Multi-Page Application
  base: "/Bidzy-Semester-project/", // Ditt GitHub Pages repo
  build: {
    target: "esnext",
    outDir: "./dist", // Output-mappen for bygde filer
    rollupOptions: {
      input: {
        // Hovedsiden
        main: resolve(__dirname, "./index.html"),
        // Andre sider
        login: resolve(__dirname, "./src/html/login.html"),
        register: resolve(__dirname, "./src/html/register.html"),
        productpage: resolve(__dirname, "./src/html/productpage.html"),
        profile: resolve(__dirname, "./src/html/profile.html"),
        search: resolve(__dirname, "./src/html/search.html"),
        mylistings: resolve(__dirname, "./src/html/mylistings.html"),
      },
    },
  },
});


