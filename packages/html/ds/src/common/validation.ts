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
  const validationMarkup = `
  {% set required_keys = [${requiredKeys.map((key) => `'${key}'`).join(',')}] %}
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
  const validationMarkup = `
  {% set requiredKeys = [${requiredKeys.map((key) => `'${key}'`).join(',')}] %}
  {{ validateProperties(props, requiredKeys) }}
`;

  return injectValidation({ macroHtml, validationMarkup });
}

export function addMacroValidation({
  engine,
  content,
  macroName,
}: {
  engine: string;
  mode: string;
  content: string;
  macroName: string;
}) {
  const requiredKeys: string[] = (properties[macroName] ?? [])
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
