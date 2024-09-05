import path from 'node:path';
import fs from 'fs-extra';
import { glob } from 'glob';
import * as z from 'zod';

type MacroPropertyType = 'string' | 'number' | 'boolean' | 'array';

type MacroProperty = {
  name: string;
  description: string;
  type: MacroPropertyType;
  required: boolean;
  values?: Record<string, string>;
};

function toType(typeName: string): MacroPropertyType {
  switch (typeName) {
    case 'ZodString': {
      return 'string';
    }
    case 'ZodNumber': {
      return 'number';
    }
    case 'ZodBoolean': {
      return 'boolean';
    }
    case 'ZodArray':
    case 'ZodNativeEnum':
    case 'ZodEnum': {
      return 'array';
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
        const { innerType, typeName, description } = (value as any)._def;

        const zodType = innerType ? innerType._def.typeName : typeName;
        const zodEnums =
          typeName === 'ZodNativeEnum' || 'ZodEnum'
            ? (value as any)._def.values
            : undefined;

        let required = true;
        if (value instanceof z.ZodOptional) {
          required = false;
        }

        properties.push({
          name: key,
          description,
          type: toType(zodType),
          required,
          values: zodEnums ? zodEnums : undefined,
        });

        if (value instanceof z.ZodObject) {
          processSchema(value, fullPath);
        }
      }

      return;
    }

    if (schema instanceof z.ZodArray) {
      processSchema(schema._def.type, zodPath);
      return;
    }

    if (schema instanceof z.ZodUnion) {
      for (const option of schema._def.options) {
        processSchema(option, zodPath);
      }
    }
  };

  processSchema(schema);
  return properties;
}

async function buildProperties() {
  const sourceDirectory = path.resolve(import.meta.dirname, '../src');
  const destinationRootDirectory = path.resolve(
    import.meta.dirname,
    '../src/dist',
  );

  await fs.remove(destinationRootDirectory);

  const content: string[] = [];

  content.push(
    `export type MacroPropertyType = 'string' | 'number' | 'boolean' | 'array';`,
    `export type MacroProperty = { name: string; description: string; type: MacroPropertyType; required: boolean; values?: Record<string,string>; };`,
    `export type MacroProperties = { [key: string]: MacroProperty[]; };`,
  );

  const exportType = 'MacroProperty[]';
  const components: string[] = [];

  for (const file of glob.sync('**/*.schema.ts', {
    cwd: sourceDirectory,
  })) {
    const sourcePath = path.resolve(sourceDirectory, file);
    const module = await import(sourcePath);

    // TODO: validate single export of ZodObject named fooSchema
    for (const key of Object.keys(module)) {
      const schema = module[key];

      if (!(schema instanceof z.ZodObject)) {
        continue;
      }

      const properties = getSchemaProperties(schema);

      const exportName = key.replace('Schema', '');
      content.push(
        `const ${exportName}: ${exportType} = ${JSON.stringify(properties)};`,
      );

      components.push(exportName);
    }
  }

  content.push(
    `export const properties: MacroProperties = { ${components.join(',\n')} };`,
  );

  const destinationPath = path.resolve(
    destinationRootDirectory,
    'properties.ts',
  );

  await fs.outputFile(destinationPath, content.join('\n'));

  // TODO: logger abstraction
  console.log('Properties generated from schemas.');
}

await buildProperties();
