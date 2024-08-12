import { renderMacro } from '@govie-frontend/macro';

export function render<TProps = unknown>({
  macro,
  name,
}: {
  macro: string;
  name: string;
}) {
  return function (props: TProps) {
    const renderedMacro = renderMacro({ macro, name })(props);
    return <div dangerouslySetInnerHTML={{ __html: renderedMacro }} />;
  };
}
