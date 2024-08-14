import path from 'node:path';
import fs from 'fs-extra';
import { glob } from 'glob';

type MacroDestination = {
  engine: 'nunjucks' | 'jinja';
  mode: 'dev' | 'prod';
};

function processContent({
  engine,
  mode,
  content,
}: {
  engine: string;
  mode: string;
  content: string;
}) {
  if (mode === 'prod' || mode === 'dev') {
    // TODO: prod only, add validation for dev
    return content.replace('{{ validation }}', '');
  }

  switch (engine) {
    case 'nunjucks': {
      return content.replace('{{ validation }}', `nunjucks`);
    }
    case 'jinja': {
      return content.replace('{{ validation }}', `jinja`);
    }
    default: {
      throw new Error(`Unsupported engine '${engine}'.`);
    }
  }
}

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

          const destinationPath = path.resolve(
            destinationDirectory,
            file.replace(path.basename(file), 'macro.html'),
          );

          const updatedContent = processContent({
            engine: destination.engine,
            mode: destination.mode,
            content,
          });

          fs.ensureDirSync(path.dirname(destinationPath));
          fs.writeFileSync(destinationPath, updatedContent);
        }
      }

      console.log('Macros processed and copied.');
    },
  };
}
