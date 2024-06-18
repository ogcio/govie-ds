import { createPropertyFormatter, fileHeader } from 'style-dictionary/utils';
import { FormatFnArguments } from 'style-dictionary/types';
import { getTokens } from './typescript-consts.js';

export async function cssVariableConstsFormatter({
  dictionary,
  platform,
  options,
  file,
}: FormatFnArguments) {
  const header = await fileHeader({ file });

  const formatter = createPropertyFormatter({
    outputReferences: true,
    outputReferenceFallbacks: false,
    dictionary,
    format: 'css',
    formatting: {},
    themeable: false,
    usesDtcg: true,
  });

  const cssVariables = dictionary.allTokens.map((token) => formatter(token));

  const tokens = getTokens({ tokens: dictionary.allTokens, camelCase: true });

  const variableNames = cssVariables.map(
    (variable) =>
      `var(${variable.slice(0, Math.max(0, variable.indexOf(':'))).trim()})`,
  );

  if (tokens.length !== variableNames.length) {
    throw new Error(
      `Number of tokens (${tokens.length}) does not match number of variable names (${variableNames.length}).`,
    );
  }

  const consts = tokens.map(
    (token, index) => `export const ${token.name} = '${variableNames[index]}';`,
  );

  const lines = [header, ...consts, ''];

  return lines.join('\n');
}
