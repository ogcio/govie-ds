import path from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { glob } from 'glob';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    dts({ include: ['src'], exclude: ['src/**/*.stories.tsx'] }),
  ],
  build: {
    copyPublicDir: false,
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
      input: Object.fromEntries(
        // https://rollupjs.org/configuration-options/#input
        glob
          .sync('src/**/*.{ts,tsx}', {
            ignore: ['src/**/*.d.ts', 'src/**/*.stories.tsx'],
          })
          .map((file: string) => [
            // 1. The name of the entry point
            // src/nested/foo.js becomes nested/foo
            path.relative(
              'src',
              file.slice(0, file.length - path.extname(file).length),
            ),
            // 2. The absolute path to the entry file
            // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
            fileURLToPath(new URL(file, import.meta.url)),
          ]),
      ),
      output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js',
      },
    },
  },
});
