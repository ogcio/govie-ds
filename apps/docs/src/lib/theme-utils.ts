import tinycolor from 'tinycolor2';

export const TAILWIND_SHADES = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
];

export const COLOR_TUNE_MAP: Record<
  number,
  { l: number; s?: number; h?: number }
> = {
  50: { l: 97.1 },
  100: { l: 87.6 },
  200: { l: 78.4 },
  300: { l: 60.8 },
  400: { l: 46.3 },
  500: { l: 34.5 },
  600: { l: 26.9 },
  700: { l: 20.0 },
  800: { l: 15.0 },
  900: { l: 10.6 },
  950: { l: 7.1 },
};

export const COLOR_GROUPS = [
  {
    label: 'Brand',
    keys: ['primary', 'secondary', 'neutral'],
  },
  {
    label: 'Support',
    keys: [
      'support-info',
      'support-success',
      'support-warning',
      'support-error',
    ],
  },
  {
    label: 'Utility',
    keys: ['utility-convention', 'utility-convention-alt'],
  },
] as const;

export const COLOR_KEYS = COLOR_GROUPS.flatMap((group) => group.keys);

export const resolveCssVariables = (
  colorMap: Record<string, Record<string, string>>,
): Record<string, string> => {
  const resolved: Record<string, string> = {};

  for (const sheet of Array.from(document.styleSheets)) {
    try {
      const rules = sheet.cssRules || [];
      for (const rule of Array.from(rules)) {
        if (rule instanceof CSSStyleRule && rule.selectorText === ':root') {
          for (const styleName of rule.style) {
            const value = rule.style.getPropertyValue(styleName).trim();
            const match = styleName.match(
              /--gieds-color-([a-zA-Z0-9-]+)-(\d{2,3})/,
            );
            if (match) {
              const [, key, shade] = match;
              const replacement = colorMap[key]?.[shade];
              if (replacement) {
                resolved[styleName] = replacement;
              }
            } else {
              resolved[styleName] = value;
            }
          }
        }
      }
    } catch {
      continue;
    }
  }

  return resolved;
};

export const generateShades = (
  name: string,
  baseHex: string,
): Record<string, Record<number, string>> => {
  const baseColor = tinycolor(baseHex).toHsl();

  const shades = TAILWIND_SHADES.reduce(
    (acc, shade) => {
      if (shade === 800) {
        acc[shade] = baseHex;
      } else {
        const { l } = COLOR_TUNE_MAP[shade];
        const modified = {
          ...baseColor,
          l: l / 100,
        };
        acc[shade] = tinycolor(modified).toHexString();
      }
      return acc;
    },
    {} as Record<number, string>,
  );

  return { [name]: shades };
};

export const resolveColor = (isMounted: boolean, color: string): string => {
  if (!isMounted) {
    return '#ffffff';
  }
  if (!color.startsWith('var(')) {
    return color;
  }

  const cssVar = color.slice(4, -1).trim();
  return (
    getComputedStyle(document.documentElement)
      .getPropertyValue(cssVar)
      .trim() || '#ffffff'
  );
};

export const formatKeyLabel = (key: string): string => {
  const parts = key
    .replace(/^support-/, '')
    .replace(/^utility-/, '')
    .split('-');
  const label = parts
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return label === 'Convention Alt' ? 'Alt' : label;
};
