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

function createNunjucksEnvironment(path = '') {
  // @ts-expect-error add a custom 'append' method to simulate the behaviour of python's append
  Array.prototype.append = function (value) {
    this.push(value);
  };
  const environment = nunjucks.configure(path, {
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
  path,
}: {
  name: string;
  html: string;
  path?: string;
}) {
  return function (props: TProps) {
    const propsString = JSON.stringify(props, null, 2);

    const template = `
      ${html}
      {{ ${name}(${propsString}) }}
    `;

    const nunjucksEnvironment = createNunjucksEnvironment(path);
    const rendered = nunjucksEnvironment.renderString(template, {
      validateProperties,
    });

    return rendered.trim();
  };
}
