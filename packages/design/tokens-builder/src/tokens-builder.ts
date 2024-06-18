import camelCase from 'camelcase';
import StyleDictionary, { PlatformConfig, Token } from 'style-dictionary';
import { Config } from 'style-dictionary/types';
import { cssVariableConstsFormatter } from './formatters/css-variable-consts.js';
import { cssVariableObjectFormatter } from './formatters/css-variable-object.js';
import { dtcgFormatter } from './formatters/dtcg.js';
import { figmaFormatter } from './formatters/figma.js';
import { typeScriptConstsFormatter } from './formatters/typescript-consts.js';
import { typeScriptFormatter } from './formatters/typescript.js';

// TODO: review collection of platforms to support more than one instance of the same platform
export type TokenBuilderPlatformConfig = {
  css?: {
    prefix?: string;
    selector: string;
    outputFolder: string;
    outputFilename: string;
  };
  cssVariableObject?: {
    prefix?: string;
    exportName: string;
    exportType?: string;
    outputFolder: string;
    outputFilename: string;
  };
  cssVariableConsts?: {
    prefix?: string;
    camelCase?: boolean;
    outputFolder: string;
    outputFilename: string;
  };
  typeScript?: {
    header?: string;
    exportName: string;
    exportType?: string;
    outputFolder: string;
    outputFilename: string;
    outputReferences: boolean;
  };
  typeScriptConsts?: {
    prefix?: string;
    camelCase?: boolean;
    outputFolder: string;
    outputFilename: string;
  };
  dtcg?: {
    outputFolder: string;
    outputFilename: string;
  };
  figma?: {
    outputFolder: string;
    outputFilename: string;
  };
};

export type TokenBuilderOptions = {
  source?: string[];
  tokens?: any; // TODO: type
  platforms: TokenBuilderPlatformConfig;
};

function ensureTrailingSlash(path: string) {
  if (!path) {
    return path;
  }

  return path.endsWith('/') ? path : `${path}/`;
}

function createPlatforms(platformConfig: TokenBuilderPlatformConfig) {
  const platforms: Record<string, PlatformConfig> = {};

  if (platformConfig.css) {
    platforms['css'] = {
      transformGroup: 'css/custom',
      buildPath: ensureTrailingSlash(platformConfig.css.outputFolder),
      prefix: platformConfig.css.prefix,
      files: [
        {
          format: 'css/variables',
          destination: platformConfig.css.outputFilename,
        },
      ],
      options: {
        showFileHeader: false,
        selector: platformConfig.css.selector,
        outputReferences: true,
      },
    };
  }

  if (platformConfig.cssVariableObject) {
    platforms['cssVariableObject'] = {
      transformGroup: 'css/custom',
      buildPath: ensureTrailingSlash(
        platformConfig.cssVariableObject.outputFolder,
      ),
      prefix: platformConfig.cssVariableObject.prefix,
      files: [
        {
          format: 'css/variable-object',
          destination: platformConfig.cssVariableObject.outputFilename,
        },
      ],
      options: {
        fileHeader: 'auto-generated',
        exportName: platformConfig.cssVariableObject.exportName,
        exportType: platformConfig.cssVariableObject.exportType,
      },
    };
  }

  if (platformConfig.cssVariableConsts) {
    platforms['cssVariableConsts'] = {
      transformGroup: 'css/custom',
      buildPath: ensureTrailingSlash(
        platformConfig.cssVariableConsts.outputFolder,
      ),
      prefix: platformConfig.cssVariableConsts.prefix,
      files: [
        {
          format: 'css/variable-consts',
          destination: platformConfig.cssVariableConsts.outputFilename,
        },
      ],
      options: {
        fileHeader: 'auto-generated',
        camelCase: platformConfig.cssVariableConsts.camelCase,
      },
    };
  }

  if (platformConfig.typeScript) {
    platforms['typeScript'] = {
      transformGroup: 'js',
      buildPath: ensureTrailingSlash(platformConfig.typeScript.outputFolder),
      files: [
        {
          format: 'typeScript/object',
          destination: platformConfig.typeScript.outputFilename,
        },
      ],
      options: {
        fileHeader: 'auto-generated',
        outputReferences: platformConfig.typeScript.outputReferences,
        header: platformConfig.typeScript.header,
        exportName: platformConfig.typeScript.exportName,
        exportType: platformConfig.typeScript.exportType,
      },
    };
  }

  if (platformConfig.typeScriptConsts) {
    platforms['typeScriptConsts'] = {
      transformGroup: 'typeScript/consts',
      buildPath: ensureTrailingSlash(
        platformConfig.typeScriptConsts.outputFolder,
      ),
      prefix: platformConfig.typeScriptConsts.prefix,
      files: [
        {
          format: 'typeScript/consts',
          destination: platformConfig.typeScriptConsts.outputFilename,
        },
      ],
      options: {
        fileHeader: 'auto-generated',
        camelCase: platformConfig.typeScriptConsts.camelCase,
      },
    };
  }

  if (platformConfig.dtcg) {
    platforms['dtcg'] = {
      transformGroup: 'js',
      buildPath: ensureTrailingSlash(platformConfig.dtcg.outputFolder),
      files: [
        {
          format: 'dtcg',
          destination: platformConfig.dtcg.outputFilename,
        },
      ],
      options: {
        outputReferences: true,
      },
    };
  }

  if (platformConfig.figma) {
    platforms['figma'] = {
      transformGroup: 'figma',
      buildPath: ensureTrailingSlash(platformConfig.figma.outputFolder),
      files: [
        {
          format: 'figma',
          destination: platformConfig.figma.outputFilename,
        },
      ],
      options: {
        outputReferences: true,
      },
    };
  }

  return platforms;
}

function createRemoveTierTransformer({
  format,
}: {
  format: 'kebab' | 'pascal';
}) {
  return function (token: Token) {
    if (!token.name) {
      throw new Error(`Token has no name.`);
    }

    if (!token.attributes?.category) {
      throw new Error(`Token ${token.name} has no category.`);
    }

    const category = token.attributes?.category as string;

    if (!['primitive', 'semantic', 'component'].includes(category)) {
      throw new Error(
        `Token ${token.name} has an invalid category '${category}'.`,
      );
    }

    if (format === 'pascal') {
      return token.name.replace(camelCase(category, { pascalCase: true }), '');
    }

    return token.name.replace(`-${category}-`, '-');
  };
}

async function build({ source, tokens, platforms }: TokenBuilderOptions) {
  const config: Config = {
    source,
    tokens,
    platforms: createPlatforms(platforms),
  };

  const styleDictionary = new StyleDictionary(config, { verbosity: 'verbose' });

  styleDictionary.registerFileHeader({
    name: 'auto-generated',
    fileHeader: function () {
      return ['This file was auto-generated.'];
    },
  });

  // Remove 'primitive', 'semantic', or 'component' tier name from the token name
  styleDictionary.registerTransform({
    name: 'name/remove-tier-kebab',
    type: 'name',
    filter: function () {
      return true;
    },
    transform: createRemoveTierTransformer({ format: 'kebab' }),
  });

  styleDictionary.registerTransform({
    name: 'name/remove-tier-pascal',
    type: 'name',
    filter: function () {
      return true;
    },
    transform: createRemoveTierTransformer({ format: 'pascal' }),
  });

  styleDictionary.registerTransform({
    name: 'lineHeight/percentage',
    type: 'value',
    filter: function (token) {
      return token.attributes?.item === 'lineHeight';
    },
    transform: function (token) {
      const percent = Math.round(token.$value * 100);
      return `${percent}%`;
    },
  });

  styleDictionary.registerTransform({
    name: 'letterSpacing/em',
    type: 'value',
    filter: function (token) {
      return token.attributes?.item === 'letterSpacing';
    },
    transform: function (token) {
      const parsed = Number(token.$value.replace('rem', ''));
      return `${parsed}em`;
    },
  });

  styleDictionary.registerTransform({
    name: 'letterSpacing/percentage',
    type: 'value',
    filter: function (token) {
      return token.attributes?.item === 'letterSpacing';
    },
    transform: function (token) {
      const parsed = Number(token.$value.replace('rem', ''));
      return `${parsed * 100}%`;
    },
  });

  styleDictionary.registerTransform({
    name: 'fontSize/px',
    type: 'value',
    filter: (token) =>
      token.attributes?.type === 'font' && token.attributes?.item === 'size',
    transform: (token) => {
      const parsed = Number(token.$value.replace('rem', ''));
      return `${parsed * 16}px`;
    },
  });

  styleDictionary.registerTransformGroup({
    name: 'css/custom',
    transforms: [
      'attribute/cti',
      'name/kebab',
      // 'time/seconds',
      // 'html/icon',
      // "size/font-rem",
      // "color/css",
      // 'asset/url',
      'fontFamily/css',
      // "cubicBezier/css",
      // "strokeStyle/css/shorthand",
      // "border/css/shorthand",
      'typography/css/shorthand',
      // "transition/css/shorthand",
      'shadow/css/shorthand',
      'name/remove-tier-kebab',
      'letterSpacing/em',
    ],
  });

  styleDictionary.registerTransformGroup({
    name: 'typeScript/consts',
    transforms: [
      'attribute/cti',
      'name/pascal',
      // 'time/seconds',
      // 'html/icon',
      // "size/font-rem",
      // "color/css",
      // 'asset/url',
      // "size/px",
      // "color/hsl",
      // TODO: font size: rem
      'name/remove-tier-pascal',
    ],
  });

  styleDictionary.registerTransformGroup({
    name: 'figma',
    transforms: [
      'attribute/cti',
      'name/pascal',
      'size/rem', // TODO: review
      'lineHeight/percentage',
      'color/hex', // TODO: review,
      'fontFamily/css',
      'shadow/css/shorthand',
      'letterSpacing/percentage',
      'fontSize/px',
      // 'typography/css/shorthand',
    ],
  });

  styleDictionary.registerFormat({
    name: 'dtcg',
    format: dtcgFormatter,
  });

  styleDictionary.registerFormat({
    name: 'typeScript/object',
    format: typeScriptFormatter,
  });

  styleDictionary.registerFormat({
    name: 'typeScript/consts',
    format: typeScriptConstsFormatter,
  });

  styleDictionary.registerFormat({
    name: 'figma',
    format: figmaFormatter,
  });

  styleDictionary.registerFormat({
    name: 'css/variable-object',
    format: cssVariableObjectFormatter,
  });

  styleDictionary.registerFormat({
    name: 'css/variable-consts',
    format: cssVariableConstsFormatter,
  });

  await styleDictionary.buildAllPlatforms();
}

export async function buildTokens({
  source = [],
  tokens = {},
  platforms,
}: TokenBuilderOptions) {
  await build({ source, tokens, platforms });
}
