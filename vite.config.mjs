import { resolve } from "path";
import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";

export default defineConfig({
  base: "/Bidzy-Semester-project/",

  build: {
    target: "esnext",
    outDir: "./dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        login: resolve(__dirname, "src/html/login.html"),
        register: resolve(__dirname, "src/html/register.html"),
        productpage: resolve(__dirname, "src/html/productpage.html"),
        profile: resolve(__dirname, "src/html/profile.html"),
        search: resolve(__dirname, "src/html/search.html"),
        mylistings: resolve(__dirname, "src/html/mylistings.html"),
      },
    },
  },

  test: {
    globals: true,
    environment: "jsdom",
    exclude: [...configDefaults.exclude, "dist/**"],
  },
});

