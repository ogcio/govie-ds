import tinycolor from 'tinycolor2';

export type ColorsMapProps = {
  colors: Record<string, Record<string | number, string>>;
};

const TAILWIND_SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

const SHADE_LIGHTNESS_MAP: Record<number, number> = {
  50: 97.06,
  100: 87.65,
  200: 78.43,
  300: 60.78,
  400: 46.27,
  500: 34.51,
  600: 26.86,
  700: 20,
  800: 15.1,
  900: 10.59,
  950: 7.06,
};

export const COLOR_GROUPS = [
  {
    label: 'Brand',
    keys: ['primary'],
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
export const findClosestShade = (baseColor: string): number => {
  const hsl = tinycolor(baseColor).toHsl();
  const baseLightness = hsl.l * 100;

  let closestShade = 500;
  let smallestDiff = Infinity;

  for (const shade in SHADE_LIGHTNESS_MAP) {
    const targetLightness = SHADE_LIGHTNESS_MAP[shade];
    const diff = Math.abs(baseLightness - targetLightness);

    if (diff < smallestDiff) {
      smallestDiff = diff;
      closestShade = Number(shade);
    }
  }

  return closestShade;
};

export const generateShades = (key: string, baseColor: string) => {
  const baseShade = findClosestShade(baseColor);
  const baseHSL = tinycolor(baseColor).toHsl();
  const shades: Record<number, string> = {};
  shades[baseShade] = tinycolor(baseColor).toHexString();

  for (const shade of TAILWIND_SHADES) {
    if (shade === baseShade) {
      continue;
    }

    const targetLightness = SHADE_LIGHTNESS_MAP[shade];

    const generated = tinycolor({
      ...baseHSL,
      l: targetLightness,
    });

    shades[shade] = generated.toHexString();
  }

  return { [key]: shades };
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
