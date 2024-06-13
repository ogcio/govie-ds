import { Token } from 'style-dictionary';
import { fileHeader } from 'style-dictionary/utils';
import { FormatFnArguments, TransformedToken } from 'style-dictionary/types';
import camelCase from 'camelcase';

export function getTokens({
  tokens,
  camelCase: camelCaseOption,
}: {
  tokens: TransformedToken[];
  camelCase: boolean;
}) {
  // TODO: convert Space15 to Space1_5
  return tokens.map((token: Token) => {
    // if (token.comment) to_ret = to_ret.concat(" // " + token.comment);

    if (!token.name) {
      throw new Error(`Token has no name.`);
    }

    const tokenName = camelCaseOption
      ? camelCase(token.name)
      : camelCase(token.name, { pascalCase: true });

    return {
      name: tokenName,
      value: token.$value,
    };
  });
}

export async function typeScriptConstsFormatter({
  dictionary,
  platform,
  options,
  file,
}: FormatFnArguments) {
  const header = await fileHeader({ file });

  const consts = getTokens({
    tokens: dictionary.allTokens,
    camelCase: options.camelCase ?? false,
  }).map(
    (token) => `export const ${token.name} = ${JSON.stringify(token.value)};`,
  );

  // TODO: convert Space15 to Space1_5
  // const consts = dictionary.allTokens.map((token: Token) => {
  //   // if (token.comment) to_ret = to_ret.concat(" // " + token.comment);

  //   if (!token.name) {
  //     throw new Error(`Token has no name.`);
  //   }

  //   const tokenName = options.camelCase ? camelCase(token.name) : token.name;

  //   return `export const ${tokenName} = ${JSON.stringify(token.$value)};`;
  // });

  const lines = [header, ...consts, ''];

  return lines.join('\n');
}
