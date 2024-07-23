import { deepmerge } from '@govie-ds/deepmerge';
import { variables } from '@govie-ds/tokens';
import tailwindTheme from 'tailwindcss/defaultTheme.js';
import { CustomThemeConfig } from 'tailwindcss/types/config.js';
import { convertColors, toFont } from './utils.js';

export type CreateThemeOptions = {
  meta: any; // TODO: add TS meta type to tokens package
  overrides?: Partial<CustomThemeConfig>;
  useVariables?: boolean;
};

export function createTheme({
  meta,
  overrides,
  useVariables = true,
}: CreateThemeOptions): Partial<CustomThemeConfig> {
  const defaultTheme: Partial<CustomThemeConfig> = {
    ...tailwindTheme,
    container: {
      padding: {
        DEFAULT: '16px',
        sm: '16px',
        md: '32px',
        lg: '64px',
        xl: '96px',
        '2xl': '128px',
      },
    },
    colors: {
      transparent: 'transparent',
      white: '#ffffff', // TODO: move to JSON tokens
      black: '#000000',
      ...convertColors(meta.light.resolved.primitive.color), // TODO: use color variables, variables as nested object in tokens package
    },
    fontFamily: {
      primary: variables.primitive.font.family.primary,
      secondary: variables.primitive.font.family.secondary,
      tertiary: variables.primitive.font.family.tertiary,
    },
    fontSize: {
      '3xs': toFont({ useVariables, variables, meta, key: '50' }),
      '2xs': toFont({ useVariables, variables, meta, key: '100' }),
      xs: toFont({ useVariables, variables, meta, key: '200' }),
      sm: toFont({ useVariables, variables, meta, key: '300' }),
      md: toFont({ useVariables, variables, meta, key: '400' }),
      lg: toFont({ useVariables, variables, meta, key: '500' }),
      xl: toFont({ useVariables, variables, meta, key: '600' }),
      '2xl': toFont({ useVariables, variables, meta, key: '700' }),
      '3xl': toFont({ useVariables, variables, meta, key: '800' }),
      '4xl': toFont({ useVariables, variables, meta, key: '900' }),
      '5xl': toFont({ useVariables, variables, meta, key: '1000' }),
      '6xl': toFont({ useVariables, variables, meta, key: '1100' }),
      '7xl': toFont({ useVariables, variables, meta, key: '1200' }),
      '8xl': toFont({ useVariables, variables, meta, key: '1300' }),
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
      // "none": tokens.goiveBorderRadiusNone,
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
    // TODO: boxShadow, convert shadow object to string in tokens
    // "boxShadow": {
    //   "sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    //   "DEFAULT": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    //   "md": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    //   "lg": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    //   "xl": "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    //   "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    //   "inner": "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
    //   "none": "none"
    // },
    spacing: {
      0: variables.primitive.space['0'],
      none: variables.primitive.space['0'],
      '3xs': variables.primitive.space.px,
      '2xs': variables.primitive.space['0-5'],
      xs: variables.primitive.space['1'],
      sm: variables.primitive.space['1-5'],
      md: variables.primitive.space['2'],
      lg: variables.primitive.space['3'],
      xl: variables.primitive.space['5'],
      '2xl': variables.primitive.space['8'],
      '3xl': variables.primitive.space['10'],
      '4xl': variables.primitive.space['12'],
      '5xl': variables.primitive.space['16'],
      '6xl': variables.primitive.space['20'],
      // "0": tokens.govieSpace0,
      // px: tokens.govieSpacePx,
      // "0.5": tokens.govieSpace05,
      // "1": tokens.govieSpace1,
      // "1.5": tokens.govieSpace15,
      // "2": tokens.govieSpace2,
      // "2.5": tokens.govieSpace25,
      // "3": tokens.govieSpace3,
      // "3.5": tokens.govieSpace35,
      // "4": tokens.govieSpace4,
      // "5": tokens.govieSpace5,
      // "6": tokens.govieSpace6,
      // "7": tokens.govieSpace7,
      // "8": tokens.govieSpace8,
      // "9": tokens.govieSpace9,
      // "10": tokens.govieSpace10,
      // "11": tokens.govieSpace11,
      // "12": tokens.govieSpace12,
      // "14": tokens.govieSpace14,
      // "16": tokens.govieSpace16,
      // "20": tokens.govieSpace20,
      // "24": tokens.govieSpace24,
      // "28": tokens.govieSpace28,
      // "32": tokens.govieSpace32,
      // "36": tokens.govieSpace36,
      // "40": tokens.govieSpace40,
      // "44": tokens.govieSpace44,
      // "48": tokens.govieSpace48,
      // "52": tokens.govieSpace52,
      // "56": tokens.govieSpace56,
      // "60": tokens.govieSpace60,
      // "64": tokens.govieSpace64,
      // "72": tokens.govieSpace72,
      // "80": tokens.govieSpace80,
      // "96": tokens.govieSpace96,
    },
    screens: {
      xs: meta.light.resolved.primitive.screen.xs.$value,
      sm: meta.light.resolved.primitive.screen.sm.$value,
      md: meta.light.resolved.primitive.screen.md.$value,
      lg: meta.light.resolved.primitive.screen.lg.$value,
      xl: meta.light.resolved.primitive.screen.xl.$value,
      '2xl': meta.light.resolved.primitive.screen['2xl'].$value,
    },
    textUnderlineOffset: {
      // TODO: tokens
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
      // TODO: tokens
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
      typography: () => {
        return {
          DEFAULT: {
            css: {
              p: {
                font: variables.semantic.typography.default.text.md,
                fontWeight: variables.primitive.font.weight['400'],
                fontFamily: 'inherit',
              },
              h1: {
                font: variables.semantic.typography.default.heading.xl,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: 'inherit',
              },
              h2: {
                font: variables.semantic.typography.default.heading.lg,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: 'inherit',
              },
              h3: {
                font: variables.semantic.typography.default.heading.md,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: 'inherit',
              },
              h4: {
                font: variables.semantic.typography.default.heading.sm,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: 'inherit',
              },
              h5: {
                font: variables.semantic.typography.default.heading.xs,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: 'inherit',
              },
              h6: {
                font: variables.semantic.typography.default.heading.xs,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: 'inherit',
              },
            },
          },
          xs: {
            css: {
              p: {
                font: variables.semantic.typography.xs.text.md,
                fontWeight: variables.primitive.font.weight['400'],
                fontFamily: 'inherit',
              },
              h1: {
                font: variables.semantic.typography.xs.heading.xl,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: 'inherit',
              },
              h2: {
                font: variables.semantic.typography.xs.heading.lg,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: 'inherit',
              },
              h3: {
                font: variables.semantic.typography.xs.heading.md,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: 'inherit',
              },
              h4: {
                font: variables.semantic.typography.xs.heading.sm,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: 'inherit',
              },
              h5: {
                font: variables.semantic.typography.xs.heading.xs,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: 'inherit',
              },
              h6: {
                font: variables.semantic.typography.xs.heading.xs,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: 'inherit',
              },
            },
          },
          md: {
            css: {
              p: {
                font: variables.semantic.typography.md.text.md,
                fontWeight: variables.primitive.font.weight['400'],
                fontFamily: 'inherit',
              },
              h1: {
                font: variables.semantic.typography.md.heading.xl,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: 'inherit',
              },
              h2: {
                font: variables.semantic.typography.md.heading.lg,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: 'inherit',
              },
              h3: {
                font: variables.semantic.typography.md.heading.md,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: 'inherit',
              },
              h4: {
                font: variables.semantic.typography.md.heading.sm,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: 'inherit',
              },
              h5: {
                font: variables.semantic.typography.md.heading.xs,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: 'inherit',
              },
              h6: {
                font: variables.semantic.typography.md.heading.xs,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: 'inherit',
              },
            },
          },
          xl: {
            css: {
              p: {
                font: variables.semantic.typography.xl.text.md,
                fontWeight: variables.primitive.font.weight['400'],
                fontFamily: 'inherit',
              },
              h1: {
                font: variables.semantic.typography.xl.heading.xl,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: 'inherit',
              },
              h2: {
                font: variables.semantic.typography.xl.heading.lg,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: 'inherit',
              },
              h3: {
                font: variables.semantic.typography.xl.heading.md,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: 'inherit',
              },
              h4: {
                font: variables.semantic.typography.xl.heading.sm,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: 'inherit',
              },
              h5: {
                font: variables.semantic.typography.xl.heading.xs,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: 'inherit',
              },
              h6: {
                font: variables.semantic.typography.xl.heading.xs,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: 'inherit',
              },
            },
          },
        };
      },
    },
  };

  return deepmerge<CustomThemeConfig>(defaultTheme, overrides);
}
