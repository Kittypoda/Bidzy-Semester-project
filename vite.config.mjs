import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  base: '/Bidzy-Semester-project/',
  build: {
    target: 'esnext',
    rollupOptions: {
      input: {
        main: './index.html',
        app: './src/js/app.js', 
        router: './src/js/router.js', 
      },
    },
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'src/html/**/*',
          dest: '.',
        },
      ],
    }),
  ],
});

