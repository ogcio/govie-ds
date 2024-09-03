import nunjucks from 'nunjucks';

function validateProperties(
  properties: Record<string, unknown>,
  requiredKeys: string[],
) {
  const missingKeys = requiredKeys.filter((key) => !(key in properties));

  if (missingKeys.length > 0) {
    throw new Error(`Missing required properties '${missingKeys.join(', ')}'.`);
  }
}

function createNunjucksEnvironment() {
  const environment = nunjucks.configure({
    autoescape: true,
    noCache: true,
    trimBlocks: true,
    lstripBlocks: true,
  });

  environment.addGlobal('validateProperties', validateProperties);

  return environment;
}

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

    const nunjucksEnvironment = createNunjucksEnvironment();
    const rendered = nunjucksEnvironment.renderString(template, {
      validateProperties,
    });

    return rendered.trim();
  };
}
