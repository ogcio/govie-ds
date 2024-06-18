import cloneDeepWith from 'lodash/cloneDeepWith.js';
import { TransformedToken } from 'style-dictionary';
import { FormatFnArguments } from 'style-dictionary/types';
import { createPropertyFormatter, fileHeader } from 'style-dictionary/utils';

function isTransformedToken(value: unknown): value is TransformedToken {
  return (
    value != null &&
    Object.prototype.hasOwnProperty.call(value, 'name') &&
    Object.prototype.hasOwnProperty.call(value, 'original')
  );
}

export async function cssVariableObjectFormatter({
  dictionary,
  platform,
  options,
  file,
}: FormatFnArguments) {
  if (!options.exportName) {
    throw new Error('Missing exportName option.');
  }

  const formatter = createPropertyFormatter({
    outputReferences: true,
    outputReferenceFallbacks: false,
    dictionary,
    format: 'css',
    formatting: {},
    themeable: false,
    usesDtcg: true,
  });

  const cssVariablesObject = cloneDeepWith(dictionary.tokens, (value) => {
    if (isTransformedToken(value)) {
      const cssVariable = formatter(value);
      return `var(${cssVariable.slice(0, Math.max(0, cssVariable.indexOf(':'))).trim()})`;
    }

    return;
  });

  const cssVariablesObjectString = JSON.stringify(cssVariablesObject, null, 2);

  const header = await fileHeader({ file });

  const lines = [
    header,
    ...(options.header ? [options.header] : []),
    '',
    options.exportType
      ? `export const ${options.exportName}: ${options.exportType} = ${cssVariablesObjectString};`
      : `export const ${options.exportName} = ${cssVariablesObjectString};`,
    '',
  ];

  return lines.join('\n');
}
