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

  for (const [key, shades] of Object.entries(colorMap)) {
    for (const [shade, value] of Object.entries(shades)) {
      resolved[`--gieds-brand-color-${key}-${shade}`] = value;
      resolved[`--gieds-color-${key}-${shade}`] =
        `var(--gieds-brand-color-${key}-${shade})`;
    }
  }

  return {
    ...resolved,
    '--gieds-color-text-tone-primary-outline-default':
      'var(--gieds-color-primary-800)',
    '--gieds-color-text-tone-primary-outline-hover':
      'var(--gieds-color-primary-800)',
    '--gieds-color-text-tone-primary-outline-focus':
      'var(--gieds-color-primary-800)',
    '--gieds-color-text-tone-primary-flat-default':
      'var(--gieds-color-primary-800)',
    '--gieds-color-text-tone-primary-flat-hover':
      'var(--gieds-color-primary-800)',
    '--gieds-color-text-tone-primary-flat-focus':
      'var(--gieds-color-primary-800)',
    '--gieds-color-surface-system-primary-default':
      'var(--gieds-color-primary-800)',
    '--gieds-color-surface-system-primary-subtle':
      'var(--gieds-color-primary-700)',
    '--gieds-color-surface-system-primary-accent':
      'var(--gieds-color-primary-400)',
    '--gieds-color-surface-tone-primary-fill-default':
      'var(--gieds-color-primary-800)',
    '--gieds-color-surface-tone-primary-fill-hover':
      'var(--gieds-color-primary-900)',
    '--gieds-color-surface-tone-primary-outline-hover':
      'var(--gieds-color-primary-50)',
    '--gieds-color-surface-tone-primary-flat-hover':
      'var(--gieds-color-primary-50)',
    '--gieds-color-icon-tone-primary-outline-default':
      'var(--gieds-color-primary-800)',
    '--gieds-color-icon-tone-primary-outline-hover':
      'var(--gieds-color-primary-800)',
    '--gieds-color-icon-tone-primary-flat-default':
      'var(--gieds-color-primary-800)',
    '--gieds-color-icon-tone-primary-flat-hover':
      'var(--gieds-color-primary-800)',
    '--gieds-color-border-tone-primary-accent-selected':
      'var(--gieds-color-primary-600)',
    '--gieds-color-border-tone-primary-outline-default':
      'var(--gieds-color-primary-800)',
    '--gieds-color-border-tone-primary-outline-hover':
      'var(--gieds-color-primary-800)',
  };
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
