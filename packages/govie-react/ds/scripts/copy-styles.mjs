import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const root = path.resolve(__dirname, '..');
const src = path.join(root, 'styles.css');
const distDir = path.join(root, 'dist');
const out = path.join(distDir, 'styles.css');

await fs.mkdir(distDir, { recursive: true });
await fs.copyFile(src, out);
console.log(
  `Copied styles: ${path.relative(root, src)} -> ${path.relative(root, out)}`,
);
