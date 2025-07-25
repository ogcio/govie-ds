import { html as beautify } from 'js-beautify';

export const beautifyHtmlNode = (node: HTMLElement | string) => {
  const beautifyOptions = {
    indent_size: 2,
    end_with_newline: false,
    preserve_newlines: false,

    inline: ['inline'],
  };

  if (typeof node === 'string') {
    return beautify(node, beautifyOptions);
  }

  return beautify(node.outerHTML, beautifyOptions);
};
