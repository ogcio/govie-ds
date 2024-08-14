import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { processMacrosPlugin } from './scripts/process-macros-plugin';
import { processSchemasPlugin } from './scripts/process-schemas-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts({ include: ['src'], exclude: ['src/**/*.stories.ts'] }),
    processMacrosPlugin(),
    processSchemasPlugin(),
  ],
  build: {
    copyPublicDir: false,
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
