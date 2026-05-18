import path from 'node:path';
import react from '@vitejs/plugin-react';
import { glob } from 'glob';
import preserveDirectives from 'rollup-preserve-directives';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { externalizeDeps } from 'vite-plugin-externalize-deps';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

const BUILD_EXCLUDE = [
  'src/**/*.stories.tsx',
  'src/**/*.test.*',
  'src/test-utilities.ts',
  'src/atoms/storybook/**',
  'src/data-table/tanstack/tanstack-helpers.ts',
];

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
    },
  },
  plugins: [
    react(),
    libInjectCss(),
    dts({
      include: ['src'],
      exclude: BUILD_EXCLUDE,
    }),
    preserveDirectives(),
    externalizeDeps(),
  ],
  build: {
    copyPublicDir: false,
    sourcemap: false,
    lib: {
      entry: Object.fromEntries(
        glob
          .sync('src/**/*.{ts,tsx}', {
            ignore: ['src/**/*.d.ts', ...BUILD_EXCLUDE],
          })
          .map((file) => [file.replace(/^src\//, '').replace(/\.tsx?$/, ''), path.resolve(file)]),
      ),
      formats: ['es'],
    },
    rolldownOptions: {
      output: {
        assetFileNames: 'assets/[name][extname]',
      },
    },
  },
});
