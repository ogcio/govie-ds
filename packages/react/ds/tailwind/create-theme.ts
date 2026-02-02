import { variables } from '@ogcio/design-system-tokens';
import merge from 'deepmerge';
import type { Config } from 'tailwindcss';
import tailwindTheme from 'tailwindcss/defaultTheme.js';
import { convertColors, toFont } from './utilities';

export type CreateThemeOptions = {
  meta?: any;
  overrides?: Partial<Config['theme']>;
};

type TokenValue = { $value: unknown };

const unwrapTokenValue = (value: unknown): string => {
  if (value && typeof value === 'object' && '$value' in (value as TokenValue)) {
    return String((value as TokenValue).$value);
  }

  return String(value);
};

export function createTheme(
  options?: CreateThemeOptions,
): Partial<Config['theme']> {
  const { meta, overrides } = options ?? {};

  const fontValueResolver = ({
    property,
    index,
  }: {
    property: string;
    index: string;
  }): string => {
    return meta
      ? meta.light.resolved.primitive.font[property][index].$value
      : (variables.primitive.font as any)[property][index];
  };

  const spacing = {
    none: unwrapTokenValue(variables.primitive.space['0']),
    '3xs': unwrapTokenValue(variables.primitive.space.px),
    '2xs': unwrapTokenValue(variables.primitive.space['0-5']),
    xs: unwrapTokenValue(variables.primitive.space['1']),
    sm: unwrapTokenValue(variables.primitive.space['1-5']),
    md: unwrapTokenValue(variables.primitive.space['2']),
    lg: unwrapTokenValue(variables.primitive.space['3']),
    xl: unwrapTokenValue(variables.primitive.space['5']),
    '2xl': unwrapTokenValue(variables.primitive.space['8']),
    '3xl': unwrapTokenValue(variables.primitive.space['10']),
    '4xl': unwrapTokenValue(variables.primitive.space['12']),
    '5xl': unwrapTokenValue(variables.primitive.space['16']),
    '6xl': unwrapTokenValue(variables.primitive.space['20']),
    '0': unwrapTokenValue(variables.primitive.space['0']),
    px: unwrapTokenValue(variables.primitive.space['px']),
    '0.5': unwrapTokenValue(variables.primitive.space['0-5']),
    '1': unwrapTokenValue(variables.primitive.space['1']),
    '1.5': unwrapTokenValue(variables.primitive.space['1-5']),
    '2': unwrapTokenValue(variables.primitive.space['2']),
    '2.5': unwrapTokenValue(variables.primitive.space['2-5']),
    '3': unwrapTokenValue(variables.primitive.space['3']),
    '3.5': unwrapTokenValue(variables.primitive.space['3-5']),
    '4': unwrapTokenValue(variables.primitive.space['4']),
    '5': unwrapTokenValue(variables.primitive.space['5']),
    '6': unwrapTokenValue(variables.primitive.space['6']),
    '7': unwrapTokenValue(variables.primitive.space['7']),
    '8': unwrapTokenValue(variables.primitive.space['8']),
    '9': unwrapTokenValue(variables.primitive.space['9']),
    '10': unwrapTokenValue(variables.primitive.space['10']),
    '11': unwrapTokenValue(variables.primitive.space['11']),
    '12': unwrapTokenValue(variables.primitive.space['12']),
    '13': unwrapTokenValue(variables.primitive.space['13']),
    '14': unwrapTokenValue(variables.primitive.space['14']),
    '16': unwrapTokenValue(variables.primitive.space['16']),
    '18': unwrapTokenValue(variables.primitive.space['18']),
    '19': unwrapTokenValue(variables.primitive.space['19']),
    '20': unwrapTokenValue(variables.primitive.space['20']),
    '24': unwrapTokenValue(variables.primitive.space['24']),
    '28': unwrapTokenValue(variables.primitive.space['28']),
    '30': unwrapTokenValue(variables.primitive.space['30']),
    '32': unwrapTokenValue(variables.primitive.space['32']),
    '36': unwrapTokenValue(variables.primitive.space['36']),
    '40': unwrapTokenValue(variables.primitive.space['40']),
    '44': unwrapTokenValue(variables.primitive.space['44']),
    '48': unwrapTokenValue(variables.primitive.space['48']),
    '52': unwrapTokenValue(variables.primitive.space['52']),
    '56': unwrapTokenValue(variables.primitive.space['56']),
    '60': unwrapTokenValue(variables.primitive.space['60']),
    '64': unwrapTokenValue(variables.primitive.space['64']),
    '70': unwrapTokenValue(variables.primitive.space['70']),
    '72': unwrapTokenValue(variables.primitive.space['72']),
    '80': unwrapTokenValue(variables.primitive.space['80']),
    '86': unwrapTokenValue(variables.primitive.space['86']),
    '94': unwrapTokenValue(variables.primitive.space['94']),
    '96': unwrapTokenValue(variables.primitive.space['96']),
    '100': unwrapTokenValue(variables.primitive.space['100']),
    '105': unwrapTokenValue(variables.primitive.space['105']),
    '120': unwrapTokenValue(variables.primitive.space['120']),
    '135': unwrapTokenValue(variables.primitive.space['135']),
    '160': unwrapTokenValue(variables.primitive.space['160']),
    '192': unwrapTokenValue(variables.primitive.space['192']),
    '240': unwrapTokenValue(variables.primitive.space['240']),
  };

  const defaultTheme: Partial<Config['theme']> = {
    ...tailwindTheme,
    container: {
      padding: {
        DEFAULT: '16px',
        md: '24px',
        lg: '32px',
      },
    },
    colors: {
      inherit: 'inherit',
      transparent: 'transparent',
      white: '#ffffff',
      black: '#000000',
      ...(meta
        ? convertColors(meta.light.resolved.primitive.color)
        : variables.primitive.color),
    },
    fontFamily: {
      primary: variables.primitive.font.family.primary,
      secondary: variables.primitive.font.family.secondary,
      tertiary: variables.primitive.font.family.tertiary,
    },
    fontSize: {
      '3xs': toFont({
        valueResolver: fontValueResolver,
        fontSize: '50',
        lineHeight: '1000',
      }),
      '2xs': toFont({
        valueResolver: fontValueResolver,
        fontSize: '100',
        lineHeight: '1000',
      }),
      xs: toFont({
        valueResolver: fontValueResolver,
        fontSize: '200',
        lineHeight: '1000',
      }),
      sm: toFont({
        valueResolver: fontValueResolver,
        fontSize: '300',
        lineHeight: '1000',
      }),
      md: toFont({
        valueResolver: fontValueResolver,
        fontSize: '400',
        lineHeight: '1000',
      }),
      '2md': toFont({
        valueResolver: fontValueResolver,
        fontSize: '400',
        lineHeight: '800',
      }),
      lg: toFont({
        valueResolver: fontValueResolver,
        fontSize: '500',
        lineHeight: '1000',
      }),
      xl: toFont({
        valueResolver: fontValueResolver,
        fontSize: '600',
        lineHeight: '700',
      }),
      '2xl': toFont({
        valueResolver: fontValueResolver,
        fontSize: '700',
        lineHeight: '700',
      }),
      '3xl': toFont({
        valueResolver: fontValueResolver,
        fontSize: '800',
        lineHeight: '700',
      }),
      '4xl': toFont({
        valueResolver: fontValueResolver,
        fontSize: '900',
        lineHeight: '700',
      }),
      '5xl': toFont({
        valueResolver: fontValueResolver,
        fontSize: '1000',
        lineHeight: '700',
      }),
      '6xl': toFont({
        valueResolver: fontValueResolver,
        fontSize: '1100',
        lineHeight: '400',
      }),
      '7xl': toFont({
        valueResolver: fontValueResolver,
        fontSize: '1200',
        lineHeight: '400',
      }),
      '8xl': toFont({
        valueResolver: fontValueResolver,
        fontSize: '1300',
        lineHeight: '400',
      }),
    },
    fontWeight: {
      thin: variables.primitive.font.weight['100'],
      extralight: variables.primitive.font.weight['200'],
      light: variables.primitive.font.weight['300'],
      normal: variables.primitive.font.weight['400'],
      medium: variables.primitive.font.weight['500'],
      semibold: variables.primitive.font.weight['600'],
      bold: variables.primitive.font.weight['700'],
      extrabold: variables.primitive.font.weight['800'],
      black: variables.primitive.font.weight['900'],
    },
    borderWidth: {
      0: '0px',
      xs: variables.primitive.border.width['100'],
      sm: variables.primitive.border.width['200'],
      md: variables.primitive.border.width['300'],
      lg: variables.primitive.border.width['400'],
      xl: variables.primitive.border.width['500'],
      '2xl': variables.primitive.border.width['600'],
      '3xl': variables.primitive.border.width['700'],
      '4xl': variables.primitive.border.width['800'],
      DEFAULT: variables.primitive.border.width['100'],
    },
    borderRadius: {
      sm: variables.primitive.border.radius['100'],
      md: variables.primitive.border.radius['200'],
      lg: variables.primitive.border.radius['300'],
      xl: variables.primitive.border.radius['400'],
      '2xl': variables.primitive.border.radius['500'],
      '3xl': variables.primitive.border.radius['600'],
      full: variables.primitive.border.radius.full,
      DEFAULT: variables.primitive.border.radius['200'],
    },
    zIndex: {
      1: variables.primitive.zIndex['1'],
      100: variables.primitive.zIndex['100'],
      200: variables.primitive.zIndex['200'],
      300: variables.primitive.zIndex['300'],
      400: variables.primitive.zIndex['400'],
      500: variables.primitive.zIndex['500'],
      600: variables.primitive.zIndex['600'],
      700: variables.primitive.zIndex['700'],
      800: variables.primitive.zIndex['800'],
      900: variables.primitive.zIndex['900'],
      1000: variables.primitive.zIndex['1000'],
    },
    opacity: {
      '0': variables.primitive.opacity['0'],
      '5': variables.primitive.opacity['5'],
      '10': variables.primitive.opacity['10'],
      '15': variables.primitive.opacity['15'],
      '20': variables.primitive.opacity['20'],
      '25': variables.primitive.opacity['25'],
      '30': variables.primitive.opacity['30'],
      '35': variables.primitive.opacity['35'],
      '40': variables.primitive.opacity['40'],
      '45': variables.primitive.opacity['45'],
      '50': variables.primitive.opacity['50'],
      '55': variables.primitive.opacity['55'],
      '60': variables.primitive.opacity['60'],
      '65': variables.primitive.opacity['65'],
      '70': variables.primitive.opacity['70'],
      '75': variables.primitive.opacity['75'],
      '80': variables.primitive.opacity['80'],
      '85': variables.primitive.opacity['85'],
      '90': variables.primitive.opacity['90'],
      '95': variables.primitive.opacity['95'],
      '100': variables.primitive.opacity['100'],
    },
    spacing,
    inset: spacing,
    top: spacing,
    right: spacing,
    left: spacing,
    bottom: spacing,
    margin: spacing,
    padding: spacing,
    gap: spacing,
    screens: {
      xs: meta ? meta.light.resolved.primitive.screen.xs.$value : '480px',
      sm: meta ? meta.light.resolved.primitive.screen.sm.$value : '640px',
      md: meta ? meta.light.resolved.primitive.screen.md.$value : '768px',
      lg: meta ? meta.light.resolved.primitive.screen.lg.$value : '1024px',
      xl: meta ? meta.light.resolved.primitive.screen.xl.$value : '1280px',
      '2xl': meta
        ? meta.light.resolved.primitive.screen['2xl'].$value
        : '1536px',
    },
    textUnderlineOffset: {
      '0': '0px',
      none: '0px',
      auto: 'auto',
      'from-font': 'from-font',
      xs: '1px',
      sm: '2px',
      md: '3px',
      lg: '4px',
      xl: '8px',
    },
    textDecorationThickness: {
      0: '0px',
      none: '0px',
      auto: 'auto',
      'from-font': 'from-font',
      xs: '1px',
      sm: '2px',
      md: '3px',
      lg: '4px',
      xl: '8px',
    },
    extend: {
      colors: {
        color: {
          ...(meta
            ? convertColors(meta.light.resolved.semantic.color)
            : variables.semantic.color),
        },
        brand: {
          ...(meta
            ? convertColors(meta.light.resolved.brand.color)
            : variables.brand.color),
        },
        primary: {
          ...(meta
            ? convertColors(meta.light.resolved.semantic.surface.primary)
            : variables.semantic.surface.primary),
        },
      },
      typography: () => {
        return {
          DEFAULT: {
            css: {
              p: {
                font: variables.semantic.typography.default.text.md,
                fontWeight: variables.primitive.font.weight['400'],
                fontFamily: variables.primitive.font.family.primary,
                'margin-bottom': '2em',
                'max-width': '65ch',
              },
              h1: {
                font: variables.semantic.typography.default.heading.xl,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: variables.primitive.font.family.primary,
                'margin-top': '0.5em',
                'margin-bottom': '1em',
              },
              h2: {
                font: variables.semantic.typography.default.heading.lg,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: variables.primitive.font.family.primary,
                'margin-top': '0.5em',
                'margin-bottom': '1em',
              },
              h3: {
                font: variables.semantic.typography.default.heading.md,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: variables.primitive.font.family.primary,
                'margin-top': '0.5em',
                'margin-bottom': '1em',
              },
              h4: {
                font: variables.semantic.typography.default.heading.sm,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: variables.primitive.font.family.primary,
                'margin-top': '0.5em',
                'margin-bottom': '1em',
              },
              h5: {
                font: variables.semantic.typography.default.heading.xs,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: variables.primitive.font.family.primary,
                'margin-top': '0.5em',
                'margin-bottom': '1em',
              },
              h6: {
                font: variables.semantic.typography.default.heading.xs,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: variables.primitive.font.family.primary,
                'margin-top': '0.5em',
                'margin-bottom': '1em',
              },
            },
          },
          xs: {
            css: {
              p: {
                font: variables.semantic.typography.xs.text.md,
                fontWeight: variables.primitive.font.weight['400'],
                fontFamily: variables.primitive.font.family.primary,
                'margin-bottom': '2em',
                'max-width': '65ch',
              },
              h1: {
                font: variables.semantic.typography.xs.heading.xl,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: variables.primitive.font.family.primary,
                'margin-top': '0.5em',
                'margin-bottom': '1em',
              },
              h2: {
                font: variables.semantic.typography.xs.heading.lg,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: variables.primitive.font.family.primary,
                'margin-top': '0.5em',
                'margin-bottom': '1em',
              },
              h3: {
                font: variables.semantic.typography.xs.heading.md,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: variables.primitive.font.family.primary,
                'margin-top': '0.5em',
                'margin-bottom': '1em',
              },
              h4: {
                font: variables.semantic.typography.xs.heading.sm,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: variables.primitive.font.family.primary,
                'margin-top': '0.5em',
                'margin-bottom': '1em',
              },
              h5: {
                font: variables.semantic.typography.xs.heading.xs,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: variables.primitive.font.family.primary,
                'margin-top': '0.5em',
                'margin-bottom': '1em',
              },
              h6: {
                font: variables.semantic.typography.xs.heading['2xs'],
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: variables.primitive.font.family.primary,
                'margin-top': '0.5em',
                'margin-bottom': '1em',
              },
            },
          },
          md: {
            css: {
              p: {
                font: variables.semantic.typography.md.text.md,
                fontWeight: variables.primitive.font.weight['400'],
                fontFamily: variables.primitive.font.family.primary,
                'margin-bottom': '2em',
                'max-width': '65ch',
              },
              h1: {
                font: variables.semantic.typography.md.heading.xl,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: variables.primitive.font.family.primary,
                'margin-top': '0.5em',
                'margin-bottom': '1em',
              },
              h2: {
                font: variables.semantic.typography.md.heading.lg,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: variables.primitive.font.family.primary,
                'margin-top': '0.5em',
                'margin-bottom': '1em',
              },
              h3: {
                font: variables.semantic.typography.md.heading.md,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: variables.primitive.font.family.primary,
                'margin-top': '0.5em',
                'margin-bottom': '1em',
              },
              h4: {
                font: variables.semantic.typography.md.heading.sm,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: variables.primitive.font.family.primary,
                'margin-top': '0.5em',
                'margin-bottom': '1em',
              },
              h5: {
                font: variables.semantic.typography.md.heading.xs,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: variables.primitive.font.family.primary,
                'margin-top': '0.5em',
                'margin-bottom': '1em',
              },
              h6: {
                font: variables.semantic.typography.md.heading['2xs'],
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: variables.primitive.font.family.primary,
                'margin-top': '0.5em',
                'margin-bottom': '1em',
              },
            },
          },
          xl: {
            css: {
              p: {
                font: variables.semantic.typography.xl.text.md,
                fontWeight: variables.primitive.font.weight['400'],
                fontFamily: variables.primitive.font.family.primary,
                'margin-bottom': '2em',
                'max-width': '65ch',
              },
              h1: {
                font: variables.semantic.typography.xl.heading.xl,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: variables.primitive.font.family.primary,
                'margin-top': '0.5em',
                'margin-bottom': '1em',
              },
              h2: {
                font: variables.semantic.typography.xl.heading.lg,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: variables.primitive.font.family.primary,
                'margin-top': '0.5em',
                'margin-bottom': '1em',
              },
              h3: {
                font: variables.semantic.typography.xl.heading.md,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: variables.primitive.font.family.primary,
                'margin-top': '0.5em',
                'margin-bottom': '1em',
              },
              h4: {
                font: variables.semantic.typography.xl.heading.sm,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: variables.primitive.font.family.primary,
                'margin-top': '0.5em',
                'margin-bottom': '1em',
              },
              h5: {
                font: variables.semantic.typography.xl.heading.xs,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: variables.primitive.font.family.primary,
                'margin-top': '0.5em',
                'margin-bottom': '1em',
              },
              h6: {
                font: variables.semantic.typography.xl.heading['2xs'],
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: variables.primitive.font.family.primary,
                'margin-top': '0.5em',
                'margin-bottom': '1em',
              },
            },
          },
        };
      },
      spacing: {
        'outline-sm': '3px',
      },
      outlineWidth: {
        sm: '3px',
      },
    },
  };

  return merge<Config['theme']>(defaultTheme, overrides || {});
}
