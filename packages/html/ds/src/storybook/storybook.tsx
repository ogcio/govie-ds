import { renderMacro } from '@govie-frontend/macro';

export function renderComponent<TProps = unknown>({
  name,
  html,
}: {
  name: string;
  html: string;
}) {
  return function (props: TProps) {
    const renderedMacro = renderMacro({ name, html })(props);
    return <div dangerouslySetInnerHTML={{ __html: renderedMacro }} />;
  };
}
