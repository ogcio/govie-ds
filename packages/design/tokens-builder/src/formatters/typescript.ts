import { FormatFnArguments } from 'style-dictionary/types';
import { fileHeader } from 'style-dictionary/utils';
import { minifyDictionary } from './minify-dictionary.js';

export async function typeScriptFormatter({
  dictionary,
  platform,
  options,
  file,
}: FormatFnArguments) {
  if (!options.exportName) {
    throw new Error('Missing exportName option.');
  }

  const tokens = minifyDictionary({
    tokens: dictionary.tokens,
    outputReferences: options.outputReferences,
  });

  const tokensString = JSON.stringify(tokens, null, 2);

  const header = await fileHeader({ file });

  const lines = [
    header,
    ...(options.header ? [options.header] : []),
    '',
    options.exportType
      ? `export const ${options.exportName}: ${options.exportType} = ${tokensString};`
      : `export const ${options.exportName} = ${tokensString};`,
    '',
  ];

  return lines.join('\n');
}
