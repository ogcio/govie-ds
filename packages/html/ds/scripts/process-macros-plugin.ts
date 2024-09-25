import path from 'node:path';
import fs from 'fs-extra';
import { glob } from 'glob';
import { addMacroValidation } from '../src/common/validation';

type MacroDestination = {
  engine: 'nunjucks' | 'jinja';
  mode: 'dev' | 'prod';
};

export function processMacrosPlugin() {
  return {
    name: 'vite-plugin-process-macros',
    async buildEnd() {
      const sourceDirectory = path.resolve(import.meta.dirname, '../src');
      const destinationRootDirectory = path.resolve(
        import.meta.dirname,
        '../macros',
      );

      await fs.remove(destinationRootDirectory);

      const destinations: MacroDestination[] = [
        { engine: 'nunjucks', mode: 'dev' },
        { engine: 'nunjucks', mode: 'prod' },
        { engine: 'jinja', mode: 'dev' },
        { engine: 'jinja', mode: 'prod' },
      ];

      for (const file of glob.sync('**/*.html', { cwd: sourceDirectory })) {
        const sourcePath = path.resolve(sourceDirectory, file);

        const content = fs.readFileSync(sourcePath, 'utf8');

        for (const destination of destinations) {
          const destinationDirectory = `${destinationRootDirectory}/${destination.engine}/${destination.mode}/govie`;

          const destinationPath = path.resolve(destinationDirectory, file);

          const updatedContent =
            destination.mode === 'dev'
              ? addMacroValidation({
                  engine: destination.engine,
                  mode: destination.mode,
                  content,
                  componentName: path.basename(file, '.html'),
                })
              : content;

          await fs.ensureDir(path.dirname(destinationPath));
          await fs.writeFile(destinationPath, updatedContent);
        }
      }

      console.log('Macros processed and copied.');
    },
  };
}
