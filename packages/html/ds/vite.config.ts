import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { glob } from 'glob';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { processMacrosPlugin } from './scripts/plugin';

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
      formats: ['es'],
    },
    rollupOptions: {
      external: [],
      input: Object.fromEntries(
        // https://rollupjs.org/configuration-options/#input
        glob
          .sync('src/**/*.ts', {
            ignore: ['src/**/*.d.ts', 'src/**/*.stories.ts'],
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
