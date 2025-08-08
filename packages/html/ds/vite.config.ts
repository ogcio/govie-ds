import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src'],
      exclude: ['src/**/*.stories.ts', 'src/**/*.stories.tsx'],
    }),
  ],
  build: {
    copyPublicDir: false,
    sourcemap: false,
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'umd'],
      fileName: (format) => {
        if (format === 'es') {
          return 'govie-frontend.esm.js';
        }

        if (format === 'umd') {
          return 'govie-frontend.umd.js';
        }

        return 'govie-frontend';
      },
      name: 'GovieFrontend',
    },
  },
});
