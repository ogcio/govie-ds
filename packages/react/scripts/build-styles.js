import { readFileSync, writeFileSync } from 'node:fs';

const fontsCSS = readFileSync(new URL('../fonts.css', import.meta.url), 'utf8');
const stylesCSS = readFileSync(new URL('../dist/styles.css', import.meta.url), 'utf8');

writeFileSync(new URL('../dist/styles.css', import.meta.url), fontsCSS + stylesCSS);
