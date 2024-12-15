import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  appType: "mpa", 
  base: "/Bidzy-Semester-project/", 
  build: {
    target: "esnext",
    outDir: "./dist", 
    rollupOptions: {
      input: {
        main: resolve(__dirname, "./index.html"),
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


