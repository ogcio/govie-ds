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

  // for (const sheet of Array.from(document.styleSheets)) {
  //   try {
  //     const rules = sheet.cssRules || [];
  //     for (const rule of Array.from(rules)) {
  //       if (rule instanceof CSSStyleRule && rule.selectorText === ':root') {
  //         for (const styleName of rule.style) {
  //           const value = rule.style.getPropertyValue(styleName).trim();
  //           const match = styleName.match(
  //             /--gieds-color-([a-zA-Z0-9-]+)-(\d{2,3})/,
  //           );
  //           if (match) {
  //             const [, key, shade] = match;
  //             const replacement = colorMap[key]?.[shade];
  //             if (replacement) {
  //               resolved[styleName] = replacement;
  //             }
  //           } else {
  //             resolved[styleName] = value;
  //           }
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     continue;
  //   }
  // }

  return {
    ...resolved,
    '--gieds-color-neutral-white': '#fff',
    '--gieds-color-neutral-black': '#000',
    '--gieds-border-width-100': '1px',
    '--gieds-border-width-200': '2px',
    '--gieds-border-width-300': '3px',
    '--gieds-border-width-400': '4px',
    '--gieds-border-width-500': '6px',
    '--gieds-border-width-600': '8px',
    '--gieds-border-width-700': '12px',
    '--gieds-border-width-800': '16px',
    '--gieds-border-radius-100': '2px',
    '--gieds-border-radius-200': '4px',
    '--gieds-border-radius-300': '6px',
    '--gieds-border-radius-400': '8px',
    '--gieds-border-radius-500': '12px',
    '--gieds-border-radius-600': '16px',
    '--gieds-border-radius-full': '9999px',
    '--gieds-color-base-emerald': '#004d44',
    '--gieds-color-base-gold': '#a39161',
    '--gieds-color-base-gray': '#0b0c0c',
    '--gieds-color-base-blue': '#2c55a2',
    '--gieds-color-base-red': '#d4351c',
    '--gieds-color-base-yellow': '#fd0',
    '--gieds-color-base-green': '#00703c',
    '--gieds-color-base-purple': '#4c2c92',
    '--gieds-color-base-white': '#fff',
    '--gieds-color-base-transparent': '#ffffff03',
    '--gieds-color-base-black': '#000',
    '--gieds-font-family-primary': 'Lato, Arial, sans-serif',
    '--gieds-font-family-secondary': 'Lato, Arial, sans-serif',
    '--gieds-font-family-tertiary':
      'ui-monospace, "Cascadia Mono", "Segoe UI Mono", consolas, "Liberation Mono", monospace',
    '--gieds-font-size-50': '.5rem',
    '--gieds-font-size-100': '.75rem',
    '--gieds-font-size-200': '.875rem',
    '--gieds-font-size-300': '1rem',
    '--gieds-font-size-400': '1.125rem',
    '--gieds-font-size-500': '1.25rem',
    '--gieds-font-size-600': '1.5rem',
    '--gieds-font-size-700': '1.75rem',
    '--gieds-font-size-800': '2rem',
    '--gieds-font-size-900': '2.25rem',
    '--gieds-font-size-1000': '2.5rem',
    '--gieds-font-size-1100': '3rem',
    '--gieds-font-size-1200': '3.5rem',
    '--gieds-font-size-1300': '4rem',
    '--gieds-font-size-1400': '5rem',
    '--gieds-font-weight-100': '100',
    '--gieds-font-weight-200': '200',
    '--gieds-font-weight-300': '300',
    '--gieds-font-weight-400': '400',
    '--gieds-font-weight-500': '500',
    '--gieds-font-weight-600': '600',
    '--gieds-font-weight-700': '700',
    '--gieds-font-weight-800': '800',
    '--gieds-font-weight-900': '900',
    '--gieds-font-line-height-50': '.75',
    '--gieds-font-line-height-100': '.825',
    '--gieds-font-line-height-200': '1',
    '--gieds-font-line-height-300': '1.1',
    '--gieds-font-line-height-400': '1.125',
    '--gieds-font-line-height-500': '1.15',
    '--gieds-font-line-height-600': '1.2',
    '--gieds-font-line-height-700': '1.25',
    '--gieds-font-line-height-800': '1.3',
    '--gieds-font-line-height-900': '1.4',
    '--gieds-font-line-height-1000': '1.5',
    '--gieds-font-line-height-1100': '1.55',
    '--gieds-font-line-height-1200': '1.6',
    '--gieds-font-line-height-1300': '2',
    '--gieds-font-letter-spacing-100': '-.05em',
    '--gieds-font-letter-spacing-200': '-.025em',
    '--gieds-font-letter-spacing-300': '0em',
    '--gieds-font-letter-spacing-400': '.025em',
    '--gieds-font-letter-spacing-500': '.05em',
    '--gieds-font-letter-spacing-600': '.1em',
    '--gieds-font-letter-spacing-700': '.15em',
    '--gieds-font-letter-spacing-800': '.2em',
    '--gieds-font-letter-spacing-900': '.3em',
    '--gieds-opacity-0': '0',
    '--gieds-opacity-5': '.05',
    '--gieds-opacity-10': '.1',
    '--gieds-opacity-15': '.15',
    '--gieds-opacity-20': '.2',
    '--gieds-opacity-25': '.25',
    '--gieds-opacity-30': '.3',
    '--gieds-opacity-35': '.35',
    '--gieds-opacity-40': '.4',
    '--gieds-opacity-45': '.45',
    '--gieds-opacity-50': '.5',
    '--gieds-opacity-55': '.55',
    '--gieds-opacity-60': '.6',
    '--gieds-opacity-65': '.65',
    '--gieds-opacity-70': '.7',
    '--gieds-opacity-75': '.75',
    '--gieds-opacity-80': '.8',
    '--gieds-opacity-85': '.85',
    '--gieds-opacity-90': '.9',
    '--gieds-opacity-95': '.95',
    '--gieds-opacity-100': '1',
    '--gieds-screen-xs': '480px',
    '--gieds-screen-sm': '640px',
    '--gieds-screen-md': '768px',
    '--gieds-screen-lg': '1024px',
    '--gieds-screen-xl': '1280px',
    '--gieds-screen-2xl': '1536px',
    '--gieds-shadow-100': '0px 1px 2px 0px #0000000d',
    '--gieds-shadow-200': '0px 1px 3px 0px #0000001a',
    '--gieds-shadow-300': '0px 4px 6px -1px #0000001a',
    '--gieds-shadow-400': '0px 10px 15px -3px #0000001a',
    '--gieds-shadow-500': '0px 20px 25px -5px #0000001a',
    '--gieds-shadow-600': '0px 25px 50px -12px #00000040',
    '--gieds-size-sm': '16px',
    '--gieds-size-md': '24px',
    '--gieds-size-lg': '32px',
    '--gieds-size-xl': '48px',
    '--gieds-space-0': '0px',
    '--gieds-space-1': '4px',
    '--gieds-space-2': '8px',
    '--gieds-space-3': '12px',
    '--gieds-space-4': '16px',
    '--gieds-space-5': '20px',
    '--gieds-space-6': '24px',
    '--gieds-space-7': '28px',
    '--gieds-space-8': '32px',
    '--gieds-space-9': '36px',
    '--gieds-space-10': '40px',
    '--gieds-space-11': '44px',
    '--gieds-space-12': '48px',
    '--gieds-space-13': '52px',
    '--gieds-space-14': '56px',
    '--gieds-space-16': '64px',
    '--gieds-space-18': '72px',
    '--gieds-space-19': '76px',
    '--gieds-space-20': '80px',
    '--gieds-space-24': '96px',
    '--gieds-space-28': '112px',
    '--gieds-space-32': '128px',
    '--gieds-space-36': '144px',
    '--gieds-space-40': '160px',
    '--gieds-space-44': '176px',
    '--gieds-space-48': '192px',
    '--gieds-space-52': '208px',
    '--gieds-space-56': '224px',
    '--gieds-space-60': '240px',
    '--gieds-space-64': '256px',
    '--gieds-space-70': '280px',
    '--gieds-space-72': '288px',
    '--gieds-space-80': '320px',
    '--gieds-space-86': '344px',
    '--gieds-space-94': '376px',
    '--gieds-space-96': '384px',
    '--gieds-space-105': '420px',
    '--gieds-space-120': '480px',
    '--gieds-space-135': '540px',
    '--gieds-space-160': '640px',
    '--gieds-space-192': '768px',
    '--gieds-space-240': '960px',
    '--gieds-space-px': '1px',
    '--gieds-space-0-5': '2px',
    '--gieds-space-1-5': '6px',
    '--gieds-space-2-5': '10px',
    '--gieds-space-3-5': '14px',
    '--gieds-z-index-1': '1',
    '--gieds-z-index-100': '100',
    '--gieds-z-index-200': '200',
    '--gieds-z-index-300': '300',
    '--gieds-z-index-400': '400',
    '--gieds-z-index-500': '500',
    '--gieds-z-index-600': '600',
    '--gieds-z-index-700': '700',
    '--gieds-z-index-800': '800',
    '--gieds-z-index-900': '900',
    '--gieds-z-index-1000': '1000',
    '--gieds-color-brand-emerald': 'var(--gieds-color-base-emerald)',
    '--gieds-color-brand-gray': 'var(--gieds-color-base-gray)',
    '--gieds-color-brand-blue': 'var(--gieds-color-base-blue)',
    '--gieds-color-brand-red': 'var(--gieds-color-base-red)',
    '--gieds-color-brand-yellow': 'var(--gieds-color-base-yellow)',
    '--gieds-color-brand-green': 'var(--gieds-color-base-green)',
    '--gieds-color-brand-purple': 'var(--gieds-color-base-purple)',
    '--gieds-type-scale-heading-regular-100':
      'var(--gieds-font-weight-400) var(--gieds-font-size-300) / var(--gieds-font-line-height-1000) var(--gieds-font-family-primary)',
    '--gieds-type-scale-heading-regular-200':
      'var(--gieds-font-weight-400) var(--gieds-font-size-400) / var(--gieds-font-line-height-1000) var(--gieds-font-family-primary)',
    '--gieds-type-scale-heading-regular-300':
      'var(--gieds-font-weight-400) var(--gieds-font-size-500) / var(--gieds-font-line-height-1000) var(--gieds-font-family-primary)',
    '--gieds-type-scale-heading-regular-400':
      'var(--gieds-font-weight-400) var(--gieds-font-size-600) / var(--gieds-font-line-height-700) var(--gieds-font-family-primary)',
    '--gieds-type-scale-heading-regular-500':
      'var(--gieds-font-weight-400) var(--gieds-font-size-700) / var(--gieds-font-line-height-700) var(--gieds-font-family-primary)',
    '--gieds-type-scale-heading-regular-600':
      'var(--gieds-font-weight-400) var(--gieds-font-size-800) / var(--gieds-font-line-height-700) var(--gieds-font-family-primary)',
    '--gieds-type-scale-heading-regular-700':
      'var(--gieds-font-weight-400) var(--gieds-font-size-900) / var(--gieds-font-line-height-700) var(--gieds-font-family-primary)',
    '--gieds-type-scale-heading-regular-800':
      'var(--gieds-font-weight-400) var(--gieds-font-size-1000) / var(--gieds-font-line-height-700) var(--gieds-font-family-primary)',
    '--gieds-type-scale-heading-regular-900':
      'var(--gieds-font-weight-400) var(--gieds-font-size-1100) / var(--gieds-font-line-height-400) var(--gieds-font-family-primary)',
    '--gieds-type-scale-heading-regular-1000':
      'var(--gieds-font-weight-400) var(--gieds-font-size-1200) / var(--gieds-font-line-height-400) var(--gieds-font-family-primary)',
    '--gieds-type-scale-heading-regular-1100':
      'var(--gieds-font-weight-400) var(--gieds-font-size-1300) / var(--gieds-font-line-height-400) var(--gieds-font-family-primary)',
    '--gieds-type-scale-heading-regular-1200':
      'var(--gieds-font-weight-400) var(--gieds-font-size-1400) / var(--gieds-font-line-height-400) var(--gieds-font-family-primary)',
    '--gieds-type-scale-heading-bold-100':
      'var(--gieds-font-weight-700) var(--gieds-font-size-300) / var(--gieds-font-line-height-1000) var(--gieds-font-family-primary)',
    '--gieds-type-scale-heading-bold-200':
      'var(--gieds-font-weight-700) var(--gieds-font-size-400) / var(--gieds-font-line-height-1000) var(--gieds-font-family-primary)',
    '--gieds-type-scale-heading-bold-300':
      'var(--gieds-font-weight-700) var(--gieds-font-size-500) / var(--gieds-font-line-height-1000) var(--gieds-font-family-primary)',
    '--gieds-type-scale-heading-bold-400':
      'var(--gieds-font-weight-700) var(--gieds-font-size-600) / var(--gieds-font-line-height-700) var(--gieds-font-family-primary)',
    '--gieds-type-scale-heading-bold-500':
      'var(--gieds-font-weight-700) var(--gieds-font-size-700) / var(--gieds-font-line-height-700) var(--gieds-font-family-primary)',
    '--gieds-type-scale-heading-bold-600':
      'var(--gieds-font-weight-700) var(--gieds-font-size-800) / var(--gieds-font-line-height-700) var(--gieds-font-family-primary)',
    '--gieds-type-scale-heading-bold-700':
      'var(--gieds-font-weight-700) var(--gieds-font-size-900) / var(--gieds-font-line-height-700) var(--gieds-font-family-primary)',
    '--gieds-type-scale-heading-bold-800':
      'var(--gieds-font-weight-700) var(--gieds-font-size-1000) / var(--gieds-font-line-height-700) var(--gieds-font-family-primary)',
    '--gieds-type-scale-heading-bold-900':
      'var(--gieds-font-weight-700) var(--gieds-font-size-1100) / var(--gieds-font-line-height-400) var(--gieds-font-family-primary)',
    '--gieds-type-scale-heading-bold-1000':
      'var(--gieds-font-weight-700) var(--gieds-font-size-1200) / var(--gieds-font-line-height-400) var(--gieds-font-family-primary)',
    '--gieds-type-scale-heading-bold-1100':
      'var(--gieds-font-weight-700) var(--gieds-font-size-1300) / var(--gieds-font-line-height-400) var(--gieds-font-family-primary)',
    '--gieds-type-scale-heading-bold-1200':
      'var(--gieds-font-weight-700) var(--gieds-font-size-1400) / var(--gieds-font-line-height-400) var(--gieds-font-family-primary)',
    '--gieds-type-scale-text-100':
      'var(--gieds-font-weight-400) var(--gieds-font-size-200) / var(--gieds-font-line-height-1000) var(--gieds-font-family-primary)',
    '--gieds-type-scale-text-200':
      'var(--gieds-font-weight-400) var(--gieds-font-size-300) / var(--gieds-font-line-height-1000) var(--gieds-font-family-primary)',
    '--gieds-type-scale-text-300':
      'var(--gieds-font-weight-400) var(--gieds-font-size-400) / var(--gieds-font-line-height-1000) var(--gieds-font-family-primary)',
    '--gieds-type-scale-text-400':
      'var(--gieds-font-weight-400) var(--gieds-font-size-500) / var(--gieds-font-line-height-1000) var(--gieds-font-family-primary)',
    '--gieds-type-scale-text-500':
      'var(--gieds-font-weight-400) var(--gieds-font-size-600) / var(--gieds-font-line-height-1000) var(--gieds-font-family-primary)',
    '--gieds-color-text-tone-primary-fill-default':
      'var(--gieds-color-neutral-white)',
    '--gieds-color-text-tone-primary-fill-hover':
      'var(--gieds-color-neutral-white)',
    '--gieds-color-text-tone-primary-fill-focus':
      'var(--gieds-color-neutral-white)',
    '--gieds-color-text-tone-dark-fill-default':
      'var(--gieds-color-neutral-white)',
    '--gieds-color-text-tone-dark-fill-hover':
      'var(--gieds-color-neutral-white)',
    '--gieds-color-text-tone-dark-fill-focus':
      'var(--gieds-color-neutral-white)',
    '--gieds-color-text-tone-light-outline-default':
      'var(--gieds-color-neutral-white)',
    '--gieds-color-text-tone-light-outline-hover':
      'var(--gieds-color-neutral-white)',
    '--gieds-color-text-tone-light-outline-focus':
      'var(--gieds-color-neutral-white)',
    '--gieds-color-text-tone-light-flat-default':
      'var(--gieds-color-neutral-white)',
    '--gieds-color-text-tone-light-flat-hover':
      'var(--gieds-color-neutral-white)',
    '--gieds-color-text-tone-light-flat-focus':
      'var(--gieds-color-neutral-white)',
    '--gieds-color-text-tone-light-default': 'var(--gieds-color-neutral-white)',
    '--gieds-color-text-tone-light-hover': 'var(--gieds-color-neutral-white)',
    '--gieds-color-text-tone-light-focus': 'var(--gieds-color-neutral-white)',
    '--gieds-color-text-tone-light-visited': 'var(--gieds-color-neutral-white)',
    '--gieds-color-surface-system-neutral-default':
      'var(--gieds-color-neutral-white)',
    '--gieds-color-surface-tone-light-fill-default':
      'var(--gieds-color-neutral-white)',
    '--gieds-color-surface-tone-primary-outline-default':
      'var(--gieds-color-base-transparent)',
    '--gieds-color-surface-tone-primary-flat-default':
      'var(--gieds-color-base-transparent)',
    '--gieds-color-surface-tone-primary-flat-disabled':
      'var(--gieds-color-base-transparent)',
    '--gieds-color-surface-tone-dark-outline-default':
      'var(--gieds-color-base-transparent)',
    '--gieds-color-surface-tone-dark-flat-default':
      'var(--gieds-color-base-transparent)',
    '--gieds-color-surface-tone-dark-flat-disabled':
      'var(--gieds-color-base-transparent)',
    '--gieds-color-surface-tone-light-outline-default':
      'var(--gieds-color-base-transparent)',
    '--gieds-color-surface-tone-light-flat-default':
      'var(--gieds-color-base-transparent)',
    '--gieds-color-surface-tone-light-flat-disabled':
      'var(--gieds-color-base-transparent)',
    '--gieds-color-icon-tone-primary-fill-default':
      'var(--gieds-color-neutral-white)',
    '--gieds-color-icon-tone-primary-fill-hover':
      'var(--gieds-color-neutral-white)',
    '--gieds-color-icon-tone-dark-fill-default':
      'var(--gieds-color-neutral-white)',
    '--gieds-color-icon-tone-dark-fill-hover':
      'var(--gieds-color-neutral-white)',
    '--gieds-color-icon-tone-light-outline-default':
      'var(--gieds-color-neutral-white)',
    '--gieds-color-icon-tone-light-outline-hover':
      'var(--gieds-color-neutral-white)',
    '--gieds-color-icon-tone-light-flat-default':
      'var(--gieds-color-neutral-white)',
    '--gieds-color-icon-tone-light-flat-hover':
      'var(--gieds-color-neutral-white)',
    '--gieds-color-icon-tone-light-default': 'var(--gieds-color-neutral-white)',
    '--gieds-color-icon-tone-light-hover': 'var(--gieds-color-neutral-white)',
    '--gieds-color-icon-tone-light-focus': 'var(--gieds-color-neutral-white)',
    '--gieds-color-icon-tone-light-visited': 'var(--gieds-color-neutral-white)',
    '--gieds-color-border-tone-light-outline-default':
      'var(--gieds-color-neutral-white)',
    '--gieds-color-border-tone-light-outline-hover':
      'var(--gieds-color-neutral-white)',
    '--gieds-color-border-tone-light-default':
      'var(--gieds-color-neutral-white)',
    '--gieds-color-border-tone-light-hover': 'var(--gieds-color-neutral-white)',
    '--gieds-color-border-tone-light-focus': 'var(--gieds-color-neutral-white)',
    '--gieds-color-border-tone-light-visited':
      'var(--gieds-color-neutral-white)',
    '--gieds-color-border-intent-focus-light':
      'var(--gieds-color-neutral-white)',
    '--gieds-surface-primary-default': 'var(--gieds-color-emerald-800)',
    '--gieds-surface-primary-subtle': 'var(--gieds-color-emerald-700)',
    '--gieds-surface-primary-disabled': 'var(--gieds-color-gray-200)',
    '--gieds-surface-primary-hover': 'var(--gieds-color-emerald-900)',
    '--gieds-surface-secondary-default': 'var(--gieds-color-emerald-800)',
    '--gieds-surface-secondary-subtle': 'var(--gieds-color-emerald-700)',
    '--gieds-surface-secondary-disabled': 'var(--gieds-color-gray-200)',
    '--gieds-surface-secondary-hover': 'var(--gieds-color-emerald-900)',
    '--gieds-surface-neutral-default': 'var(--gieds-color-emerald-800)',
    '--gieds-surface-neutral-subtle': 'var(--gieds-color-emerald-700)',
    '--gieds-surface-neutral-disabled': 'var(--gieds-color-gray-200)',
    '--gieds-surface-neutral-hover': 'var(--gieds-color-emerald-900)',
    '--gieds-color-text-tone-primary-fill-disabled':
      'var(--gieds-color-neutral-700)',
    '--gieds-color-text-tone-dark-fill-disabled':
      'var(--gieds-color-neutral-700)',
    '--gieds-color-text-tone-primary-outline-default':
      'var(--gieds-color-primary-800)',
    '--gieds-color-text-tone-primary-outline-disabled':
      'var(--gieds-color-neutral-700)',
    '--gieds-color-text-tone-primary-outline-hover':
      'var(--gieds-color-primary-800)',
    '--gieds-color-text-tone-primary-outline-focus':
      'var(--gieds-color-primary-800)',
    '--gieds-color-text-tone-dark-outline-default':
      'var(--gieds-color-neutral-950)',
    '--gieds-color-text-tone-dark-outline-disabled':
      'var(--gieds-color-neutral-700)',
    '--gieds-color-text-tone-dark-outline-hover':
      'var(--gieds-color-neutral-950)',
    '--gieds-color-text-tone-dark-outline-focus':
      'var(--gieds-color-neutral-950)',
    '--gieds-color-text-tone-light-fill-default':
      'var(--gieds-color-neutral-950)',
    '--gieds-color-text-tone-light-fill-disabled':
      'var(--gieds-color-neutral-400)',
    '--gieds-color-text-tone-light-fill-hover':
      'var(--gieds-color-neutral-950)',
    '--gieds-color-text-tone-light-fill-focus':
      'var(--gieds-color-neutral-950)',
    '--gieds-color-text-tone-light-outline-disabled':
      'var(--gieds-color-neutral-400)',
    '--gieds-color-text-tone-primary-flat-default':
      'var(--gieds-color-primary-800)',
    '--gieds-color-text-tone-primary-flat-disabled':
      'var(--gieds-color-neutral-700)',
    '--gieds-color-text-tone-primary-flat-hover':
      'var(--gieds-color-primary-800)',
    '--gieds-color-text-tone-primary-flat-focus':
      'var(--gieds-color-primary-800)',
    '--gieds-color-text-tone-dark-flat-default':
      'var(--gieds-color-neutral-950)',
    '--gieds-color-text-tone-dark-flat-disabled':
      'var(--gieds-color-neutral-700)',
    '--gieds-color-text-tone-dark-flat-hover': 'var(--gieds-color-neutral-950)',
    '--gieds-color-text-tone-dark-flat-focus': 'var(--gieds-color-neutral-950)',
    '--gieds-color-text-tone-light-flat-disabled':
      'var(--gieds-color-neutral-400)',
    '--gieds-color-text-tone-convention-default':
      'var(--gieds-color-utility-convention-700)',
    '--gieds-color-text-tone-convention-hover':
      'var(--gieds-color-utility-convention-800)',
    '--gieds-color-text-tone-convention-disabled':
      'var(--gieds-color-neutral-700)',
    '--gieds-color-text-tone-convention-focus':
      'var(--gieds-color-utility-convention-800)',
    '--gieds-color-text-tone-convention-visited':
      'var(--gieds-color-utility-convention-alt-700)',
    '--gieds-color-text-tone-dark-default': 'var(--gieds-color-neutral-950)',
    '--gieds-color-text-tone-dark-hover': 'var(--gieds-color-neutral-950)',
    '--gieds-color-text-tone-dark-focus': 'var(--gieds-color-neutral-950)',
    '--gieds-color-text-tone-dark-disabled': 'var(--gieds-color-neutral-700)',
    '--gieds-color-text-tone-dark-visited':
      'var(--gieds-color-utility-convention-alt-700)',
    '--gieds-color-text-tone-light-disabled': 'var(--gieds-color-neutral-400)',
    '--gieds-color-text-intent-info-default':
      'var(--gieds-color-support-info-700)',
    '--gieds-color-text-intent-success-default':
      'var(--gieds-color-support-success-700)',
    '--gieds-color-text-intent-error-default':
      'var(--gieds-color-support-error-700)',
    '--gieds-color-text-intent-warning-default':
      'var(--gieds-color-support-warning-700)',
    '--gieds-color-text-system-neutral-default':
      'var(--gieds-color-neutral-950)',
    '--gieds-color-text-system-neutral-muted': 'var(--gieds-color-neutral-600)',
    '--gieds-color-text-system-neutral-interactive-default':
      'var(--gieds-color-neutral-950)',
    '--gieds-color-text-system-neutral-interactive-muted':
      'var(--gieds-color-neutral-600)',
    '--gieds-color-text-system-neutral-interactive-disabled':
      'var(--gieds-color-neutral-600)',
    '--gieds-color-text-system-neutral-interactive-disabled-surface':
      'var(--gieds-color-neutral-600)',
    '--gieds-color-surface-system-neutral-layer1':
      'var(--gieds-color-neutral-50)',
    '--gieds-color-surface-system-neutral-layer2':
      'var(--gieds-color-neutral-100)',
    '--gieds-color-surface-system-neutral-layer5':
      'var(--gieds-color-neutral-400)',
    '--gieds-color-surface-system-neutral-layer11':
      'var(--gieds-color-neutral-950)',
    '--gieds-color-surface-system-neutral-interactive-disabled':
      'var(--gieds-color-neutral-200)',
    '--gieds-color-surface-system-neutral-interactive-hover':
      'var(--gieds-color-neutral-200)',
    '--gieds-color-surface-system-neutral-interactive-selected':
      'var(--gieds-color-neutral-950)',
    '--gieds-color-surface-system-neutral-interactive-selected-disabled':
      'var(--gieds-color-neutral-700)',
    '--gieds-color-surface-system-neutral-interactive-selected-subtle':
      'var(--gieds-color-neutral-50)',
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
    '--gieds-color-surface-tone-primary-fill-disabled':
      'var(--gieds-color-neutral-200)',
    '--gieds-color-surface-tone-dark-fill-default':
      'var(--gieds-color-neutral-950)',
    '--gieds-color-surface-tone-dark-fill-hover':
      'var(--gieds-color-neutral-800)',
    '--gieds-color-surface-tone-dark-fill-disabled':
      'var(--gieds-color-neutral-200)',
    '--gieds-color-surface-tone-light-fill-hover':
      'var(--gieds-color-neutral-200)',
    '--gieds-color-surface-tone-light-fill-disabled':
      'var(--gieds-color-neutral-800)',
    '--gieds-color-surface-tone-primary-outline-hover':
      'var(--gieds-color-primary-50)',
    '--gieds-color-surface-tone-primary-outline-disabled':
      'var(--gieds-color-neutral-200)',
    '--gieds-color-surface-tone-primary-flat-hover':
      'var(--gieds-color-primary-50)',
    '--gieds-color-surface-tone-dark-outline-hover':
      'var(--gieds-color-neutral-200)',
    '--gieds-color-surface-tone-dark-outline-disabled':
      'var(--gieds-color-neutral-200)',
    '--gieds-color-surface-tone-dark-flat-hover':
      'var(--gieds-color-neutral-200)',
    '--gieds-color-surface-tone-light-outline-hover':
      'var(--gieds-color-neutral-800)',
    '--gieds-color-surface-tone-light-outline-disabled':
      'var(--gieds-color-neutral-800)',
    '--gieds-color-surface-tone-light-flat-hover':
      'var(--gieds-color-neutral-800)',
    '--gieds-color-surface-intent-info-default':
      'var(--gieds-color-support-info-50)',
    '--gieds-color-surface-intent-success-default':
      'var(--gieds-color-support-success-50)',
    '--gieds-color-surface-intent-error-default':
      'var(--gieds-color-support-error-50)',
    '--gieds-color-surface-intent-warning-default':
      'var(--gieds-color-support-warning-50)',
    '--gieds-color-surface-intent-focus-default':
      'var(--gieds-color-neutral-200)',
    '--gieds-color-icon-system-neutral-default':
      'var(--gieds-color-neutral-950)',
    '--gieds-color-icon-system-neutral-muted': 'var(--gieds-color-neutral-600)',
    '--gieds-color-icon-system-neutral-interactive-default':
      'var(--gieds-color-neutral-950)',
    '--gieds-color-icon-system-neutral-interactive-hover':
      'var(--gieds-color-neutral-950)',
    '--gieds-color-icon-system-neutral-interactive-focus':
      'var(--gieds-color-neutral-950)',
    '--gieds-color-icon-system-neutral-interactive-selected':
      'var(--gieds-color-neutral-950)',
    '--gieds-color-icon-system-neutral-interactive-selected-disabled':
      'var(--gieds-color-neutral-700)',
    '--gieds-color-icon-system-neutral-interactive-disabled':
      'var(--gieds-color-neutral-700)',
    '--gieds-color-icon-tone-primary-fill-disabled':
      'var(--gieds-color-neutral-700)',
    '--gieds-color-icon-tone-primary-outline-default':
      'var(--gieds-color-primary-800)',
    '--gieds-color-icon-tone-primary-outline-disabled':
      'var(--gieds-color-neutral-700)',
    '--gieds-color-icon-tone-primary-outline-hover':
      'var(--gieds-color-primary-800)',
    '--gieds-color-icon-tone-primary-flat-default':
      'var(--gieds-color-primary-800)',
    '--gieds-color-icon-tone-primary-flat-disabled':
      'var(--gieds-color-neutral-700)',
    '--gieds-color-icon-tone-primary-flat-hover':
      'var(--gieds-color-primary-800)',
    '--gieds-color-icon-tone-dark-fill-disabled':
      'var(--gieds-color-neutral-700)',
    '--gieds-color-icon-tone-dark-outline-default':
      'var(--gieds-color-neutral-950)',
    '--gieds-color-icon-tone-dark-outline-disabled':
      'var(--gieds-color-neutral-700)',
    '--gieds-color-icon-tone-dark-outline-hover':
      'var(--gieds-color-neutral-950)',
    '--gieds-color-icon-tone-dark-flat-default':
      'var(--gieds-color-neutral-950)',
    '--gieds-color-icon-tone-dark-flat-disabled':
      'var(--gieds-color-neutral-700)',
    '--gieds-color-icon-tone-dark-flat-hover': 'var(--gieds-color-neutral-950)',
    '--gieds-color-icon-tone-light-fill-default':
      'var(--gieds-color-neutral-950)',
    '--gieds-color-icon-tone-light-fill-disabled':
      'var(--gieds-color-neutral-400)',
    '--gieds-color-icon-tone-light-fill-hover':
      'var(--gieds-color-neutral-950)',
    '--gieds-color-icon-tone-light-outline-disabled':
      'var(--gieds-color-neutral-400)',
    '--gieds-color-icon-tone-light-flat-disabled':
      'var(--gieds-color-neutral-400)',
    '--gieds-color-icon-tone-convention-default':
      'var(--gieds-color-utility-convention-700)',
    '--gieds-color-icon-tone-convention-hover':
      'var(--gieds-color-utility-convention-800)',
    '--gieds-color-icon-tone-convention-focus':
      'var(--gieds-color-utility-convention-800)',
    '--gieds-color-icon-tone-convention-visited':
      'var(--gieds-color-utility-convention-alt-700)',
    '--gieds-color-icon-tone-convention-disabled':
      'var(--gieds-color-neutral-700)',
    '--gieds-color-icon-tone-dark-default': 'var(--gieds-color-neutral-950)',
    '--gieds-color-icon-tone-dark-hover': 'var(--gieds-color-neutral-950)',
    '--gieds-color-icon-tone-dark-focus': 'var(--gieds-color-neutral-950)',
    '--gieds-color-icon-tone-dark-visited':
      'var(--gieds-color-utility-convention-alt-700)',
    '--gieds-color-icon-tone-dark-disabled': 'var(--gieds-color-neutral-700)',
    '--gieds-color-icon-tone-light-disabled': 'var(--gieds-color-neutral-400)',
    '--gieds-color-icon-intent-info-default':
      'var(--gieds-color-support-info-700)',
    '--gieds-color-icon-intent-success-default':
      'var(--gieds-color-support-success-700)',
    '--gieds-color-icon-intent-error-default':
      'var(--gieds-color-support-error-700)',
    '--gieds-color-icon-intent-warning-default':
      'var(--gieds-color-support-warning-700)',
    '--gieds-color-border-tone-primary-accent-selected':
      'var(--gieds-color-primary-600)',
    '--gieds-color-border-tone-primary-outline-default':
      'var(--gieds-color-primary-800)',
    '--gieds-color-border-tone-primary-outline-hover':
      'var(--gieds-color-primary-800)',
    '--gieds-color-border-tone-primary-outline-disabled':
      'var(--gieds-color-neutral-400)',
    '--gieds-color-border-tone-dark-outline-default':
      'var(--gieds-color-neutral-950)',
    '--gieds-color-border-tone-dark-outline-hover':
      'var(--gieds-color-neutral-950)',
    '--gieds-color-border-tone-dark-outline-disabled':
      'var(--gieds-color-neutral-400)',
    '--gieds-color-border-tone-light-outline-disabled':
      'var(--gieds-color-neutral-400)',
    '--gieds-color-border-tone-convention-default':
      'var(--gieds-color-utility-convention-700)',
    '--gieds-color-border-tone-convention-hover':
      'var(--gieds-color-utility-convention-800)',
    '--gieds-color-border-tone-convention-focus':
      'var(--gieds-color-utility-convention-800)',
    '--gieds-color-border-tone-convention-visited':
      'var(--gieds-color-utility-convention-alt-700)',
    '--gieds-color-border-tone-convention-disabled':
      'var(--gieds-color-neutral-700)',
    '--gieds-color-border-tone-dark-default': 'var(--gieds-color-neutral-950)',
    '--gieds-color-border-tone-dark-hover': 'var(--gieds-color-neutral-950)',
    '--gieds-color-border-tone-dark-focus': 'var(--gieds-color-neutral-950)',
    '--gieds-color-border-tone-dark-visited':
      'var(--gieds-color-utility-convention-alt-700)',
    '--gieds-color-border-tone-dark-disabled': 'var(--gieds-color-neutral-700)',
    '--gieds-color-border-tone-light-disabled':
      'var(--gieds-color-neutral-400)',
    '--gieds-color-border-intent-info-subtle':
      'var(--gieds-color-support-info-100)',
    '--gieds-color-border-intent-success-subtle':
      'var(--gieds-color-support-success-100)',
    '--gieds-color-border-intent-error-default':
      'var(--gieds-color-support-error-600)',
    '--gieds-color-border-intent-error-subtle':
      'var(--gieds-color-support-error-100)',
    '--gieds-color-border-intent-warning-subtle':
      'var(--gieds-color-support-warning-300)',
    '--gieds-color-border-intent-focus-default':
      'var(--gieds-color-neutral-950)',
    '--gieds-color-border-system-neutral-default':
      'var(--gieds-color-neutral-950)',
    '--gieds-color-border-system-neutral-muted':
      'var(--gieds-color-neutral-200)',
    '--gieds-color-border-system-neutral-subtle':
      'var(--gieds-color-neutral-100)',
    '--gieds-color-border-system-neutral-interactive-default':
      'var(--gieds-color-neutral-950)',
    '--gieds-color-border-system-neutral-interactive-muted':
      'var(--gieds-color-neutral-200)',
    '--gieds-color-border-system-neutral-interactive-hover':
      'var(--gieds-color-neutral-950)',
    '--gieds-color-border-system-neutral-interactive-disabled':
      'var(--gieds-color-neutral-400)',
    '--gieds-color-shadow-intent-focus-default':
      'var(--gieds-color-support-focus-400)',
    '--gieds-typography-default-heading-xl':
      'var(--gieds-type-scale-heading-bold-700)',
    '--gieds-typography-default-heading-lg':
      'var(--gieds-type-scale-heading-bold-500)',
    '--gieds-typography-default-heading-md':
      'var(--gieds-type-scale-heading-bold-300)',
    '--gieds-typography-default-heading-sm':
      'var(--gieds-type-scale-heading-bold-300)',
    '--gieds-typography-default-heading-xs':
      'var(--gieds-type-scale-heading-bold-200)',
    '--gieds-typography-default-heading-2xs':
      'var(--gieds-type-scale-heading-bold-100)',
    '--gieds-typography-default-text-lg': 'var(--gieds-type-scale-text-400)',
    '--gieds-typography-default-text-md': 'var(--gieds-type-scale-text-300)',
    '--gieds-typography-default-text-sm': 'var(--gieds-type-scale-text-200)',
    '--gieds-typography-xs-heading-xl':
      'var(--gieds-type-scale-heading-bold-700)',
    '--gieds-typography-xs-heading-lg':
      'var(--gieds-type-scale-heading-bold-500)',
    '--gieds-typography-xs-heading-md':
      'var(--gieds-type-scale-heading-bold-300)',
    '--gieds-typography-xs-heading-sm':
      'var(--gieds-type-scale-heading-bold-300)',
    '--gieds-typography-xs-heading-xs':
      'var(--gieds-type-scale-heading-bold-200)',
    '--gieds-typography-xs-heading-2xs':
      'var(--gieds-type-scale-heading-bold-100)',
    '--gieds-typography-xs-text-lg': 'var(--gieds-type-scale-text-400)',
    '--gieds-typography-xs-text-md': 'var(--gieds-type-scale-text-300)',
    '--gieds-typography-xs-text-sm': 'var(--gieds-type-scale-text-200)',
    '--gieds-typography-md-heading-xl':
      'var(--gieds-type-scale-heading-bold-800)',
    '--gieds-typography-md-heading-lg':
      'var(--gieds-type-scale-heading-bold-600)',
    '--gieds-typography-md-heading-md':
      'var(--gieds-type-scale-heading-bold-400)',
    '--gieds-typography-md-heading-sm':
      'var(--gieds-type-scale-heading-bold-300)',
    '--gieds-typography-md-heading-xs':
      'var(--gieds-type-scale-heading-bold-200)',
    '--gieds-typography-md-heading-2xs':
      'var(--gieds-type-scale-heading-bold-100)',
    '--gieds-typography-md-text-lg': 'var(--gieds-type-scale-text-400)',
    '--gieds-typography-md-text-md': 'var(--gieds-type-scale-text-300)',
    '--gieds-typography-md-text-sm': 'var(--gieds-type-scale-text-200)',
    '--gieds-typography-xl-heading-xl':
      'var(--gieds-type-scale-heading-bold-900)',
    '--gieds-typography-xl-heading-lg':
      'var(--gieds-type-scale-heading-bold-700)',
    '--gieds-typography-xl-heading-md':
      'var(--gieds-type-scale-heading-bold-500)',
    '--gieds-typography-xl-heading-sm':
      'var(--gieds-type-scale-heading-bold-400)',
    '--gieds-typography-xl-heading-xs':
      'var(--gieds-type-scale-heading-bold-200)',
    '--gieds-typography-xl-heading-2xs':
      'var(--gieds-type-scale-heading-bold-100)',
    '--gieds-typography-xl-text-lg': 'var(--gieds-type-scale-text-400)',
    '--gieds-typography-xl-text-md': 'var(--gieds-type-scale-text-300)',
    '--gieds-typography-xl-text-sm': 'var(--gieds-type-scale-text-200)',
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
