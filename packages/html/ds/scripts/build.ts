import path from 'node:path';
import fs from 'fs-extra';
import { glob } from 'glob';
import * as z from 'zod';

type MacroPropertyType = 'string' | 'number' | 'boolean';

type MacroProperty = {
  name: string;
  description: string;
  type: MacroPropertyType;
  required: boolean;
};

function toType(typeName: string): MacroPropertyType {
  switch (typeName) {
    case 'ZodString': {
      return 'string';
    }
    default: {
      throw new Error(`Unknown Zod type '${typeName}'.`);
    }
  }
}

function getSchemaProperties(schema) {
  const properties: MacroProperty[] = [];

  const processSchema = (schema, zodPath = '') => {
    if (schema instanceof z.ZodObject) {
      const shape = schema.shape;

      // TODO: objectEntries
      for (const [key, value] of Object.entries(shape)) {
        const fullPath = zodPath ? `${zodPath}.${key}` : key;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { typeName, description } = (value as any)._def;

        let required = true;
        if (value instanceof z.ZodOptional) {
          required = false;
        }

        properties.push({
          name: key,
          description,
          type: toType(typeName),
          required,
        });

        if (value instanceof z.ZodObject) {
          processSchema(value, fullPath);
        }
      }
    } else if (schema instanceof z.ZodArray) {
      processSchema(schema._def.type, zodPath);
    } else if (schema instanceof z.ZodUnion) {
      for (const option of schema._def.options) {
        processSchema(option, zodPath);
      }
    }
  };

  processSchema(schema);
  return properties;
}

async function build() {
  const sourceDirectory = path.resolve(import.meta.dirname, '../src');
  const destinationRootDirectory = path.resolve(
    import.meta.dirname,
    '../src/dist',
  );

  await fs.remove(destinationRootDirectory);

  for (const file of glob.sync('**/*.schema.ts', {
    cwd: sourceDirectory,
  })) {
    const sourcePath = path.resolve(sourceDirectory, file);
    const content = fs.readFileSync(sourcePath, 'utf8');

    const module = await import(sourcePath);

    for (const key of Object.keys(module)) {
      const schema = module[key];

      if (!(schema instanceof z.ZodObject)) {
        continue;
      }

      const properties = getSchemaProperties(schema);
      console.log(`Properties for ${file}:`, properties);

      const destinationDirectory = destinationRootDirectory; // `${destinationRootDirectory}/${destination.engine}/${destination.mode}/govie`;

      const destinationPath = path.resolve(
        destinationDirectory,
        file.replace(path.basename(file), 'macro.html'),
      );

      // const updatedContent = processContent({
      //   engine: destination.engine,
      //   mode: destination.mode,
      //   content,
      // });

      const updatedContent = '';

      // fs.ensureDirSync(path.dirname(destinationPath));
      // fs.writeFileSync(destinationPath, updatedContent);
    }
  }

  console.log('Macros processed and copied.');
}

await build();
