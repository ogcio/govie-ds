import { properties } from '../dist/properties.js';

function injectValidation({
  macroHtml,
  validationMarkup,
}: {
  macroHtml: string;
  validationMarkup: string;
}) {
  const macroRegex = /({% macro [^%]*?%}\s*)/i;
  return macroHtml.replace(
    macroRegex,
    (match) => `${match}${validationMarkup}`,
  );
}

function injectJinjaValidation({
  macroHtml,
  requiredKeys,
}: {
  macroHtml: string;
  requiredKeys: string[];
}) {
  const keys = requiredKeys.map((key) => `'${key}'`).join(',');

  const validationMarkup = `
  {% set required_keys = [${keys}] %}
    {% for key in required_keys %}
        {% if key not in props %}
            {% set error_message = "Missing required property '" ~ key ~ "'." %}
            {{ throw(error_message) }}
        {% endif %}
  {% endfor %}
`;

  return injectValidation({ macroHtml, validationMarkup });
}

function injectNunjucksValidation({
  macroHtml,
  requiredKeys,
}: {
  macroHtml: string;
  requiredKeys: string[];
}) {
  const keys = requiredKeys.map((key) => `'${key}'`).join(',');

  const validationMarkup = `
  {% set requiredKeys = [${keys}] %}
  {{ validateProperties(props, requiredKeys) }}
`;

  return injectValidation({ macroHtml, validationMarkup });
}

export function addMacroValidation({
  engine,
  content,
  componentName,
}: {
  engine: string;
  mode: string;
  content: string;
  componentName: string;
}) {
  const requiredKeys: string[] = (properties[componentName] ?? [])
    .filter((property) => property.required)
    .map((property) => property.name);

  switch (engine) {
    case 'nunjucks': {
      return injectNunjucksValidation({
        macroHtml: content,
        requiredKeys,
      });
    }
    case 'jinja': {
      return injectJinjaValidation({
        macroHtml: content,
        requiredKeys,
      });
    }
    default: {
      throw new Error(`Unsupported engine '${engine}'.`);
    }
  }
}
