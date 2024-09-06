import path from 'node:path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';
import { glob } from 'glob';

(async function copyMacrosPlugin() {
  const currentPath = fileURLToPath(import.meta.url);
  const currentDirectory = path.dirname(currentPath);

  const sourcePath = path.resolve(currentDirectory, '../../ds/src/');
  const destinationPath = path.resolve(currentDirectory, '../static/macros/');

  for (const file of glob.sync('**/*.html', { cwd: sourcePath })) {
    const srcFilePath = path.resolve(sourcePath, file);
    const fileDirectory = path.resolve(destinationPath, path.dirname(file));
    const fileDestination = path.resolve(destinationPath, file);

    await fs.mkdir(destinationPath, { recursive: true });
    await fs.mkdir(fileDirectory, { recursive: true });
    await fs.copyFile(srcFilePath, fileDestination);
  }

  console.log('FILES COPIED');
})();
