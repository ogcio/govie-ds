import path from 'node:path';
import fs from 'fs-extra';
import { glob } from 'glob';
import * as properties from '../src/dist/properties.js';

type MacroDestination = {
  engine: 'nunjucks' | 'jinja';
  mode: 'dev' | 'prod';
};

function injectValidation({
  macroHtml,
  validationMarkup,
}: {
  macroHtml: string;
  validationMarkup: string;
}) {
  const macroRegex = /({% macro [^%]*?%}\s*)/i;
  return macroHtml.replace(
    macroRegex,
    (match) => `${match}${validationMarkup}`,
  );
}

function injectJinjaValidation({
  macroHtml,
  requiredKeys,
}: {
  macroHtml: string;
  requiredKeys: string[];
}) {
  const validationMarkup = `
{% set required_keys = [${requiredKeys.map((key) => `'${key}'`).join(',')}] %}
  {% for key in required_keys %}
      {% if key not in props %}
          {% set error_message = "Missing required property '" ~ key ~ "'." %}
          {{ throw(error_message) }}
      {% endif %}
{% endfor %}
  `;

  return injectValidation({ macroHtml, validationMarkup });
}

function injectNunjucksValidation({
  macroHtml,
  requiredKeys,
}: {
  macroHtml: string;
  requiredKeys: string[];
}) {
  const validationMarkup = `
{% set requiredKeys = ['title'] %}
{% do validateProperties(props, requiredKeys) %}
  `;

  return injectValidation({ macroHtml, validationMarkup });
}

export function addMacroValidation({
  engine,
  content,
  macroName,
}: {
  engine: string;
  mode: string;
  content: string;
  macroName: string;
}) {
  const requiredKeys: string[] = (properties[macroName] ?? [])
    .filter((property) => property.required)
    .map((property) => property.name);

  switch (engine) {
    case 'nunjucks': {
      return injectNunjucksValidation({
        macroHtml: content,
        requiredKeys,
      });
    }
    case 'jinja': {
      return injectJinjaValidation({
        macroHtml: content,
        requiredKeys,
      });
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

          const updatedContent =
            destination.mode === 'dev'
              ? addMacroValidation({
                  engine: destination.engine,
                  mode: destination.mode,
                  content,
                  macroName: path.basename(file, '.html'),
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
