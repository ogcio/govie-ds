import StyleDictionary, { PlatformConfig, Token } from 'style-dictionary';
import { typeScriptFormatter } from './formatters/typescript.js';
import { Config } from 'style-dictionary/types';
import camelCase from 'camelcase';
import { dtcgFormatter } from './formatters/dtcg.js';
import { typeScriptConstsFormatter } from './formatters/typescript-consts.js';
import { figmaFormatter } from './formatters/figma.js';
import { cssVariableNameFormatter } from './formatters/css-variable-names.js';

// TODO: review collection of platforms to support more than one instance of the same platform
export type TokenBuilderPlatformConfig = {
  css?: {
    prefix?: string;
    selector: string;
    outputFolder: string;
    outputFilename: string;
  };
  cssVariableNames?: {
    prefix?: string;
    camelCase?: boolean;
    outputFolder: string;
    outputFilename: string;
  };
  typeScript?: {
    header?: string;
    export: string;
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

  if (platformConfig.cssVariableNames) {
    platforms['cssVariableNames'] = {
      transformGroup: 'css/custom',
      buildPath: ensureTrailingSlash(
        platformConfig.cssVariableNames.outputFolder,
      ),
      prefix: platformConfig.cssVariableNames.prefix,
      files: [
        {
          format: 'css/variable-names',
          destination: platformConfig.cssVariableNames.outputFilename,
        },
      ],
      options: {
        fileHeader: 'auto-generated',
        camelCase: platformConfig.cssVariableNames.camelCase,
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
        export: platformConfig.typeScript.export,
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
    name: 'lineHeight/px',
    type: 'value',
    filter: function (token) {
      return token.attributes?.item === 'lineHeight';
    },
    transform: function (token) {
      return `${token.$value * 16}px`;
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
      // "fontFamily/css",
      // "cubicBezier/css",
      // "strokeStyle/css/shorthand",
      // "border/css/shorthand",
      // "typography/css/shorthand",
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
      'lineHeight/px',
      'color/hex', // TODO: review,
      'shadow/css/shorthand',
      'letterSpacing/percentage',
      'fontSize/px',
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
    name: 'css/variable-names',
    format: cssVariableNameFormatter,
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
