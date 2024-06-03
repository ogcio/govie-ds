import { fileHeader } from 'style-dictionary/utils';
import { minifyDictionary } from './minify-dictionary.js';
import { FormatFnArguments } from 'style-dictionary/types';

export async function typeScriptFormatter({
  dictionary,
  platform,
  options,
  file,
}: FormatFnArguments) {
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
      ? `export const ${options.export}: ${options.exportType} = ${tokensString};`
      : `export const ${options.export} = ${tokensString};`,
    '',
  ];

  return lines.join('\n');
}
