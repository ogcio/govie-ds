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
