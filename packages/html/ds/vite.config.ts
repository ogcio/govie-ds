import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { processMacrosPlugin } from './scripts/process-macros-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts({ include: ['src'], exclude: ['src/**/*.stories.ts'] }),
    processMacrosPlugin(),
  ],
  build: {
    copyPublicDir: false,
    lib: {
      entry: 'src/index.ts',
      formats: ['umd'],
      fileName: 'govie-frontend',
      name: 'GovieFrontend',
    },
    // rollupOptions: {
    //   external: [],
    //   input: 'src/index.ts',
    //   output: {
    //     assetFileNames: 'assets/[name][extname]',
    //     entryFileNames: 'govie-frontend.js',
    //     format: 'umd',
    //   },
    // },
    sourcemap: true,
  },
});
