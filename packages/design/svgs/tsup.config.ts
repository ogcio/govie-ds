import { cpSync, mkdirSync } from 'node:fs';
import path from 'node:path';
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
    onSuccess: async () => {
      // Copy sprite SVG files to dist/sprites
      const spritesDirectory = path.join('dist', 'sprites');
      mkdirSync(spritesDirectory, { recursive: true });

      cpSync('src/icons/sprite-icons.svg', path.join(spritesDirectory, 'icons.svg'));
      cpSync('src/logos/sprite-logos.svg', path.join(spritesDirectory, 'logos.svg'));
      cpSync('src/favicons/sprite-favicons.svg', path.join(spritesDirectory, 'favicons.svg'));

      console.log('Copied sprite SVG files to dist/sprites/');
    },
  },
]);
