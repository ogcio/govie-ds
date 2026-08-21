import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vue()],
  build: {
    copyPublicDir: false,
    lib: {
      entry: {
        index: 'src/index.ts',
        icons: 'src/icons.ts',
        logos: 'src/logos.ts',
      },
      formats: ['es'],
    },
    rolldownOptions: {
      external: ['vue', 'lodash', 'tailwind-variants'],
    },
  },
});
