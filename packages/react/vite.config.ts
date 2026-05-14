import path from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { glob } from 'glob';
import preserveDirectives from 'rollup-preserve-directives';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import packageJson from './package.json' with { type: 'json' };

const externalPackages = [
  ...Object.keys(packageJson.dependencies ?? {}),
  ...Object.keys(packageJson.peerDependencies ?? {}),
];

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
    },
  },
  plugins: [
    react(),
    libInjectCss(),
    dts({
      include: ['src'],
      exclude: [
        'src/**/*.stories.tsx',
        'src/**/*.test.*',
        'src/test-utilities.ts',
        'src/atoms/storybook/**',
        'src/data-table/tanstack/tanstack-helpers.ts',
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
    rolldownOptions: {
      external: (id) => externalPackages.some((name) => id === name || id.startsWith(`${name}/`)),
      input: Object.fromEntries(
        glob
          .sync('src/**/*.{ts,tsx}', {
            ignore: [
              'src/**/*.d.ts',
              'src/**/*.stories.tsx',
              'src/**/*.test.*',
              'src/test-utilities.ts',
              'src/atoms/storybook/**',
              'src/data-table/tanstack/tanstack-helpers.ts',
            ],
          })
          .map((file: string) => [
            path.relative('src', file.slice(0, file.length - path.extname(file).length)),
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
