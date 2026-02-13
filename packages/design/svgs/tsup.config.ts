import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entryPoints: [
      'src/index.ts',
      'src/icons/index.ts',
      'src/logos/index.ts',
      'src/favicons/index.ts',
      'src/react/index.ts',
      'src/react/icons/index.ts',
      'src/react/logos/index.ts',
      'src/react/favicons/index.ts',
    ],
    format: ['esm'],
    outDir: 'dist',
    sourcemap: true,
    clean: true,
    dts: true,
    external: ['react'],
    treeshake: true,
  },
]);
