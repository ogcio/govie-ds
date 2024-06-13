import { promises as fs } from 'fs';
import { buildTokens } from '@govie-ds/tokens-builder';
import { meta } from '@govie-ds/tokens';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { compile } from 'json-schema-to-typescript';
import { ZodTypeAny } from 'zod';
import { outputFile } from 'fs-extra';
import { tokensSchema } from '../validation/schema/index.js';
import { validateDesignTokensSchema } from '../validation/validate-schema.js';
// import { validateDesignTokensFormat } from '../validation/validate-format.js';

async function validateAndBuildTokens({
  source,
  tokens,
  platforms,
}: {
  source: string[];
  tokens?: any;
  platforms: any;
}) {
  validateDesignTokensSchema({ source, tokens });

  // TODO: validator does not support aliases in composite tokens
  // see https://github.com/AnimaApp/design-token-validator/issues/2
  // validateDesignTokensFormat({ source, tokens });

  await buildTokens({ source, tokens, platforms });
}

async function convertZodSchemaToTypeScriptString(
  schema: ZodTypeAny,
): Promise<string> {
  const jsonSchema = zodToJsonSchema(schema, {
    $refStrategy: 'none',
    target: 'openApi3',
  });

  return await compile(jsonSchema, 'Tokens', {
    bannerComment: '',
    unknownAny: false,
    style: {
      singleQuote: true,
    },
  });
}

export async function buildTheme({
  themeId,
  sourceFolder,
  outputFolderCss,
  outputFolderTypeScript,
}: {
  themeId: string;
  sourceFolder: string;
  outputFolderCss: string;
  outputFolderTypeScript: string;
}) {
  // TODO: validate folder structure
  // light: string
  // dark?: string

  const prefix = 'govie';

  const tsSchema = await convertZodSchemaToTypeScriptString(tokensSchema);
  await outputFile(`${outputFolderTypeScript}/schema.ts`, tsSchema);

  const tokensSchemaImport = `import { Tokens } from "./schema.js";`;

  await validateAndBuildTokens({
    source: [`${sourceFolder}/light/**/*.json`],
    tokens: meta.light.unresolved,
    platforms: {
      css: {
        prefix,
        selector: `[data-theme="${themeId}-light"]`,
        outputFolder: outputFolderCss,
        outputFilename: 'light.css',
      },
      typeScript: {
        header: tokensSchemaImport,
        export: 'metaLight',
        exportType: 'Tokens',
        outputFolder: outputFolderTypeScript,
        outputFilename: 'meta-light.ts',
        outputReferences: false,
      },
      typeScriptConsts: {
        prefix,
        camelCase: true,
        outputFolder: outputFolderTypeScript,
        outputFilename: 'tokens-light.ts',
      },
    },
  });

  await validateAndBuildTokens({
    source: [`${sourceFolder}/light/**/*.json`],
    tokens: meta.light.unresolved,
    platforms: {
      typeScript: {
        header: tokensSchemaImport,
        export: 'metaLightUnresolved',
        exportType: 'Tokens',
        outputFolder: outputFolderTypeScript,
        outputFilename: 'meta-light-unresolved.ts',
        outputReferences: true,
      },
    },
  });

  await validateAndBuildTokens({
    source: [`${sourceFolder}/dark/**/*.json`],
    tokens: meta.dark.unresolved,
    platforms: {
      css: {
        prefix,
        selector: `[data-theme="${themeId}-dark"]`,
        outputFolder: outputFolderCss,
        outputFilename: 'dark.css',
      },
      typeScript: {
        header: tokensSchemaImport,
        export: 'metaDark',
        exportType: 'Tokens',
        outputFolder: outputFolderTypeScript,
        outputFilename: 'meta-dark.ts',
        outputReferences: false,
      },
      typeScriptConsts: {
        prefix,
        camelCase: true,
        outputFolder: outputFolderTypeScript,
        outputFilename: 'tokens-dark.ts',
      },
    },
  });

  await validateAndBuildTokens({
    source: [`${sourceFolder}/dark/**/*.json`],
    tokens: meta.dark.unresolved,
    platforms: {
      typeScript: {
        header: tokensSchemaImport,
        export: 'metaDarkUnresolved',
        exportType: 'Tokens',
        outputFolder: outputFolderTypeScript,
        outputFilename: 'meta-dark-unresolved.ts',
        outputReferences: true,
      },
    },
  });

  const lightCss = await fs.readFile(`${outputFolderCss}/light.css`, 'utf-8');

  const lightCssRoot = lightCss.replace(
    `[data-theme="${themeId}-light"]`,
    ':root',
  );

  const darkCss = await fs.readFile(`${outputFolderCss}/dark.css`, 'utf8');

  await outputFile(
    `${outputFolderCss}/theme.css`,
    [lightCssRoot, darkCss].join('\n'),
  );
}
