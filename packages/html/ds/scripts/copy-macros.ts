import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'fs-extra';

async function copyMacros() {
  const currentPath = fileURLToPath(import.meta.url);
  const currentDirectory = path.dirname(currentPath);

  const sourcePath = path.resolve(
    currentDirectory,
    '../macros/nunjucks/prod/govie',
  );
  const destinationPath = path.resolve(currentDirectory, '../static/macros');

  try {
    fs.cpSync(sourcePath, destinationPath, { recursive: true });
  } catch (error) {
    console.log('Macros not copied:', error);
  }

  console.log('Macros copied');
}

await copyMacros();
