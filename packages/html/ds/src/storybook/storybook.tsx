import nunjucks from 'nunjucks';

const nunjucksEnvironment = nunjucks.configure({
  autoescape: true,
  noCache: true,
  trimBlocks: true,
  lstripBlocks: true,
});

export function renderMacro<TProps = unknown>({
  macro,
  name,
}: {
  macro: string;
  name: string;
}) {
  return function (props: TProps) {
    const propsString = JSON.stringify(props);

    const template = `
      ${macro}
      {{ ${name}(${propsString}) }}
    `;

    const rendered = nunjucksEnvironment.renderString(template, {});
    return <div dangerouslySetInnerHTML={{ __html: rendered.trim() }} />;
  };
}
