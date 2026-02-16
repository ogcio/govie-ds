import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const fontsCSS = readFileSync(resolve(root, 'fonts.css'), 'utf-8');
const stylesCSS = readFileSync(resolve(root, 'dist/styles.css'), 'utf-8');

writeFileSync(resolve(root, 'dist/styles.css'), fontsCSS + stylesCSS);
