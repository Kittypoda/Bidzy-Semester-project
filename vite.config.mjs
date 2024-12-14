import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  base: '/Bidzy-Semester-project/',
  build: {
    target: 'esnext',
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

