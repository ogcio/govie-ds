import { FormatFnArguments } from 'style-dictionary/types';

export type TestToken = {
  name: string;
  type: string;
  description?: string;
  comment?: string;
  value: unknown;
};

export function testFormatter({
  formatter,
}: {
  formatter: (args: FormatFnArguments) => Promise<string>;
}) {
  return async function ({ tokens }: { tokens: TestToken[] }) {
    const dictionary = {
      tokens: {},
      allTokens: tokens.map((token) => {
        return {
          name: token.name,
          path: token.name.split('.'),
          original: {
            name: token.name,
            type: token.type,
            value: token.value,
            $type: token.type,
            $value: token.value,
            $description: token.description,
            comment: token.comment,
            themeable: true,
            attributes: {},
          },
          filePath: 'file.json',
          isSource: true,
        };
      }),
    };

    const formatted = await formatter({
      dictionary,
      platform: {},
      options: {},
      file: {
        destination: 'file.ts',
      },
    });

    return formatted.split('\n');
  };
}
