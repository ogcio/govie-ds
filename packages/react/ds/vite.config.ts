import path from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { glob } from 'glob';
import preserveDirectives from 'rollup-preserve-directives';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import package_ from './package.json';

function injectBrowserCheck(subpath = `${package_.name}/browser-check`) {
  const IMPORT_LINE = `import '${subpath}';`;
  return {
    name: 'inject-browser-check-into-client-chunks',
    enforce: 'post',
    renderChunk(code, chunk) {
      if (!/\.m?js$/.test(chunk.fileName)) {
        return null;
      }
      if (
        !code.startsWith(`'use client'`) &&
        !code.startsWith(`"use client"`)
      ) {
        return null;
      }
      if (code.includes(IMPORT_LINE)) {
        return null;
      }
      const nl = code.indexOf('\n');
      if (nl === -1) {
        return null;
      }
      return {
        code: code.slice(0, nl + 1) + IMPORT_LINE + '\n' + code.slice(nl + 1),
        map: null,
      };
    },
  };
}

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
            path.relative(
              'src',
              file.slice(0, file.length - path.extname(file).length),
            ),
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
      plugins: [injectBrowserCheck()],
    },
  },
});
