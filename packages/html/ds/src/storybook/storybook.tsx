import { html as beautify } from 'js-beautify';
import { renderMacro } from '../macro';

export function renderComponent<TProps = unknown>({
  name,
  html,
  path,
}: {
  name: string;
  html: string;
  path?: string;
}) {
  return function (props: TProps) {
    const renderedMacro = renderMacro({ name, html, path })(props);
    return <div dangerouslySetInnerHTML={{ __html: renderedMacro }} />;
  };
}

export const beautifyHtmlNode = (node: HTMLElement) => {
  const beautifyOptions = {
    indent_size: 2,
    end_with_newline: false,
    preserve_newlines: false,
    inline: ['inline'],
  };

  const formattedNode = beautify(node.outerHTML, beautifyOptions);

  return formattedNode;
};