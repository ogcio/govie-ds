import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'fs-extra';

async function copyAssets() {
  const currentPath = fileURLToPath(import.meta.url);
  const currentDirectory = path.dirname(currentPath);

  const sourcePath = path.resolve(currentDirectory, '../../../../assets');
  const destinationPath = path.resolve(currentDirectory, '../dist/assets/');

  fs.cpSync(sourcePath, destinationPath, { recursive: true });

  console.log('Assets copied');
}

await copyAssets();
