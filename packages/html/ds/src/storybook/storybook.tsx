import { renderMacro } from '@govie-ds/macro';

export function renderComponent<TProps = unknown>({
  name,
  html,
}: {
  name: string;
  html: string;
}) {
  return function (props: TProps) {
    const path = import.meta.url.split('/storybook')[0];
    const renderedMacro = renderMacro({ name, html, path })(props);
    return <div dangerouslySetInnerHTML={{ __html: renderedMacro }} />;
  };
}
