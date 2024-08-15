import nunjucks from 'nunjucks';

const nunjucksEnvironment = nunjucks.configure({
  autoescape: true,
  noCache: true,
  trimBlocks: true,
  lstripBlocks: true,
});

export function renderMacro<TProps = unknown>({
  name,
  html,
}: {
  name: string;
  html: string;
}) {
  return function (props: TProps) {
    const propsString = JSON.stringify(props);

    const template = `
      ${html}
      {{ ${name}(${propsString}) }}
    `;

    const rendered = nunjucksEnvironment.renderString(template, {});
    return rendered.trim();
  };
}
