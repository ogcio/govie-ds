import path from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { glob } from 'glob';
import preserveDirectives from 'rollup-preserve-directives';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    dts({
      include: ['src'],
      exclude: [
        'src/**/*.stories.tsx',
        'src/**/*.test.*',
        'src/test-utilities.ts',
      ],
    }),
    preserveDirectives(),
  ],
  build: {
    copyPublicDir: false,
    sourcemap: false,
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
    },
    rollupOptions: {
      external: (id) => {
        return (
          id === 'react' ||
          id === 'react-dom' ||
          id.startsWith('react/') ||
          id.startsWith('react-dom/')
        );
      },
      input: Object.fromEntries(
        // https://rollupjs.org/configuration-options/#input
        glob
          .sync('src/**/*.{ts,tsx}', {
            ignore: [
              'src/**/*.d.ts',
              'src/**/*.stories.tsx',
              'src/**/*.test.*',
              'src/test-utilities.ts',
            ],
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
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
      },
    },
  },
});
