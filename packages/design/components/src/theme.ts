import { meta, tokens as govieTokens } from '@govie-ds/theme-govie';
import { variables } from '@govie-ds/tokens';
import tailwindTheme from 'tailwindcss/defaultTheme.js';
import { CustomThemeConfig } from 'tailwindcss/types/config.js';
import { objectKeys } from 'ts-extras';
import { deepmerge } from '@govie-ds/deepmerge';

function convertColors(colors: typeof meta.light.resolved.primitive.color) {
  const convertedColorObject: Record<string, Record<string, string>> = {};

  objectKeys(colors).forEach((colorKey) => {
    const colorShades = colors[colorKey];
    const convertedShades: Record<string, string> = {};

    objectKeys(colorShades).forEach((shadeKey) => {
      const shadeValue = colorShades[shadeKey].$value;
      convertedShades[shadeKey] = shadeValue;
    });

    convertedColorObject[colorKey] = convertedShades;
  });

  return convertedColorObject;
}

const tokens = govieTokens.light;

// TODO: type
function toFont({
  useVariables,
  variables,
  meta,
  key,
}: {
  useVariables: boolean;
  variables: any;
  meta: any;
  key: string;
}): [string, { lineHeight: string }] {
  return [
    useVariables
      ? variables.primitive.font.size[key]
      : meta.light.resolved.primitive.font.size[key].$value,
    {
      lineHeight: useVariables
        ? variables.primitive.font.lineHeight[key]
        : meta.light.resolved.primitive.font.lineHeight[key].$value.toString(),
    },
  ];
}

export function createTheme({
  useVariables = true,
  theme,
}: {
  useVariables?: boolean;
  theme?: Partial<CustomThemeConfig>;
} = {}): Partial<CustomThemeConfig> {
  const defaultTheme: Partial<CustomThemeConfig> = {
    ...tailwindTheme,
    fontFamily: {
      primary: variables.primitive.font.family.primary,
      secondary: variables.primitive.font.family.secondary,
      tertiary: variables.primitive.font.family.tertiary,
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '1rem',
        md: '2rem',
        lg: '4rem',
        xl: '6rem',
        '2xl': '8rem',
      },
    },
    colors: {
      transparent: 'transparent',
      white: '#ffffff', // TODO: move to JSON tokens
      black: '#000000',
      ...convertColors(meta.light.resolved.primitive.color), // TODO: use color variables, variables as nested object in tokens package
    },
    // TODO: font family
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
    // lineHeight: {
    //   '3': variables.govieFontLineHeight50,
    //   '4': variables.govieFontLineHeight100,
    //   '5': variables.govieFontLineHeight200,
    //   '6': variables.govieFontLineHeight400,
    //   '7': variables.govieFontLineHeight600,
    //   '8': variables.govieFontLineHeight700,
    //   '9': variables.govieFontLineHeight800,
    //   '10': variables.govieFontLineHeight900,
    //   none: variables.govieFontLineHeight100,
    //   tight: variables.govieFontLineHeight200,
    //   snug: variables.govieFontLineHeight300,
    //   normal: variables.govieFontLineHeight400,
    //   relaxed: variables.govieFontLineHeight500,
    //   loose: variables.govieFontLineHeight700,
    // },
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
      xs: tokens.govieScreenXs,
      sm: tokens.govieScreenSm,
      md: tokens.govieScreenMd,
      lg: tokens.govieScreenLg,
      xl: tokens.govieScreenXl,
      '2xl': tokens.govieScreen2Xl,
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
      // TODO: type
      typography: (theme: any) => {
        return {
          DEFAULT: {
            css: {
              p: toTypographyFont(theme, 'fontSize.sm'),
              h1: toTypographyFont(theme, 'fontSize.2xl', true),
              h2: toTypographyFont(theme, 'fontSize.md', true),
              h3: toTypographyFont(theme, 'fontSize.sm', true),
            },
          },
          md: {
            css: {
              p: toTypographyFont(theme, 'fontSize.md'),
              h1: toTypographyFont(theme, 'fontSize.4xl', true),
              h2: toTypographyFont(theme, 'fontSize.lg', true),
              h3: toTypographyFont(theme, 'fontSize.md', true),
            },
          },
          lg: {
            css: {
              p: toTypographyFont(theme, 'fontSize.md'),
              h1: toTypographyFont(theme, 'fontSize.5xl', true),
              h2: toTypographyFont(theme, 'fontSize.xl', true),
              h3: toTypographyFont(theme, 'fontSize.lg', true),
            },
          },
          xl: {
            css: {
              p: toTypographyFont(theme, 'fontSize.md'),
              h1: toTypographyFont(theme, 'fontSize.6xl', true),
              h2: toTypographyFont(theme, 'fontSize.2xl', true),
              h3: toTypographyFont(theme, 'fontSize.xl', true),
            },
          },
        };
      },
    },
  };

  return deepmerge(defaultTheme, theme);
}

function toTypographyFont(theme: any, name: string, bold: boolean = false) {
  return {
    fontSize: theme(name)[0],
    fontWeight: bold
      ? variables.primitive.font.weight['700']
      : variables.primitive.font.weight['400'],
    lineHeight: theme(name)[1].lineHeight,
  };
}
