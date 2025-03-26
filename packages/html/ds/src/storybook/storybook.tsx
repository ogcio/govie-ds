import { html as beautify } from "js-beautify";

export const beautifyHtmlNode = (node: HTMLElement) => {
  const beautifyOptions = {
    indent_size: 2,
    end_with_newline: false,
    preserve_newlines: false,
    inline: ["inline"],
  };

  const formattedNode = beautify(node.outerHTML, beautifyOptions);

  return formattedNode;
};
