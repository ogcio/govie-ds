import { fileHeader } from "style-dictionary/utils";
import { Dictionary, Token } from "style-dictionary";
import camelCase from "camelcase";
import { FormatFnArguments } from "style-dictionary/types";

export function getTokens({
  dictionary,
  camelCase: camelCaseOption,
}: {
  dictionary: Dictionary;
  camelCase: boolean;
}) {
  // TODO: convert Space15 to Space1_5
  return dictionary.allTokens.map((token: Token) => {
    // if (token.comment) to_ret = to_ret.concat(" // " + token.comment);

    if (!token.name) {
      throw new Error(`Token has no name.`);
    }

    const tokenName = camelCaseOption ? camelCase(token.name) : token.name;

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
    dictionary,
    camelCase: options.camelCase ?? false,
  }).map(
    (token) => `export const ${token.name} = ${JSON.stringify(token.value)};`
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

  const lines = [header, ...consts, , ""];

  return lines.join("\n");
}
