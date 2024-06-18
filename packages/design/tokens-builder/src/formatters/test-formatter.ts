import cloneDeepWith from 'lodash/cloneDeepWith.js';
import { Dictionary, TransformedToken } from 'style-dictionary';
import { DesignToken, FormatFnArguments } from 'style-dictionary/types';
import { fileHeader } from 'style-dictionary/utils';

export type TestToken = {
  name?: string;
  type: string;
  description?: string;
  comment?: string;
  value: unknown;
};

export type TransformedTestTokens = {
  [key: string]: TransformedTestTokens | TestToken;
};

export type FormatterOptions = {
  [key: string]: unknown;
};

function toDesignToken(token: TestToken): DesignToken & { name: string } {
  return {
    name: token.name ?? 'name',
    type: token.type,
    value: token.value,
    $type: token.type,
    $value: token.value,
    $description: token.description,
    comment: token.comment,
    themeable: true,
    attributes: {},
  };
}

function toTransformedToken(token: TestToken): TransformedToken {
  return {
    ...toDesignToken(token),
    path: token.name ? token.name.split('.') : [],
    original: toDesignToken(token),
    filePath: 'file.json',
    isSource: true,
  };
}

export function testFormatter({
  formatter,
}: {
  formatter: (formatArguments: FormatFnArguments) => Promise<string>;
}) {
  const fileName = 'file.ts';

  async function format({
    tokens,
    allTokens,
    options,
  }: {
    tokens?: TransformedTestTokens;
    allTokens?: TestToken[];
    options?: FormatterOptions;
  }) {
    const dictionary: Dictionary = {
      tokens: tokens
        ? cloneDeepWith(tokens, (value) => {
            if (value && typeof value === 'object' && 'type' in value) {
              return toTransformedToken(value);
            }
          })
        : {},
      allTokens: (allTokens ?? []).map((token) => toTransformedToken(token)),
    };

    return formatter({
      dictionary,
      platform: {},
      options: options ?? {},
      file: {
        destination: fileName,
      },
    });
  }

  async function formatString({
    tokens,
    allTokens,
    options,
  }: {
    tokens?: TransformedTestTokens;
    allTokens?: TestToken[];
    options?: FormatterOptions;
  }) {
    return await format({ tokens, allTokens, options });
  }

  async function formatArray({
    tokens,
    allTokens,
    options,
  }: {
    tokens?: TransformedTestTokens;
    allTokens?: TestToken[];
    options?: FormatterOptions;
  }) {
    const formatted = await format({ tokens, allTokens, options });
    return formatted.split('\n');
  }

  async function formatObject({
    exportName,
    tokens,
    allTokens,
    options,
  }: {
    exportName?: string;
    tokens?: TransformedTestTokens;
    allTokens?: TestToken[];
    options?: FormatterOptions;
  }) {
    const formatted = await format({ tokens, allTokens, options });
    const header = await fileHeader({ file: { destination: fileName } });

    let value = formatted.replace(header, '').replace(';', '');

    if (exportName) {
      value = value.replace(`export const ${exportName} = `, '');
    }

    return JSON.parse(value.trim());
  }

  return {
    formatString,
    formatArray,
    formatObject,
  };
}
