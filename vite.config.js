import { defineConfig } from "vite";

export default defineConfig({
  build: {
    target: "esnext",
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/styles/global.scss";`, // Adjust for your project
      },
    },
  },
});
