import { DesignToken, FormatFnArguments } from 'style-dictionary/types';

export type TestToken = {
  name: string;
  type: string;
  description?: string;
  comment?: string;
  value: unknown;
};

export type FormatterOptions = {
  [key: string]: unknown;
};

export function testFormatter({
  formatter,
}: {
  formatter: (args: FormatFnArguments) => Promise<string>;
}) {
  function toDesignToken(token: TestToken): DesignToken & { name: string } {
    return {
      name: token.name,
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function format({
    tokens,
    options,
  }: {
    tokens: TestToken[];
    options?: FormatterOptions;
  }) {
    const dictionary = {
      tokens: {},
      allTokens: tokens.map((token) => {
        return {
          ...toDesignToken(token),
          path: token.name.split('.'),
          original: toDesignToken(token),
          filePath: 'file.json',
          isSource: true,
        };
      }),
    };

    return formatter({
      dictionary,
      platform: {},
      options: options ?? {},
      file: {
        destination: 'file.ts',
      },
    });
  }

  async function formatString({
    tokens,
    options,
  }: {
    tokens: TestToken[];
    options?: FormatterOptions;
  }) {
    return await format({ tokens, options });
  }

  async function formatArray({
    tokens,
    options,
  }: {
    tokens: TestToken[];
    options?: FormatterOptions;
  }) {
    const formatted = await format({ tokens, options });
    return formatted.split('\n');
  }

  async function formatObject({
    tokens,
    options,
  }: {
    tokens: TestToken[];
    options?: FormatterOptions;
  }) {
    const formatted = await format({ tokens, options });
    return JSON.parse(formatted);
  }

  return {
    formatString,
    formatArray,
    formatObject,
  };
}
