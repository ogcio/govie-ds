import { FormatFnArguments } from 'style-dictionary/types';
import { minifyDictionary } from './minify-dictionary.js';

// TODO: type
export async function dtcgFormatter({
  dictionary,
  platform,
  options,
  file,
}: FormatFnArguments) {
  const tokens = minifyDictionary({
    tokens: dictionary.tokens,
    outputReferences: options.outputReferences,
  });

  return `${JSON.stringify(tokens, null, 2)}`;
}
