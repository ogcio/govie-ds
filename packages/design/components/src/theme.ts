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
      primary: variables.govieFontFamilyPrimary,
      secondary: variables.govieFontFamilySecondary,
      tertiary: variables.govieFontFamilyTertiary,
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
      '2xs': [
        useVariables
          ? variables.govieFontSize100
          : meta.light.resolved.primitive.font.size[100].$value,
        {
          lineHeight: useVariables
            ? variables.govieFontLineHeight100
            : meta.light.resolved.primitive.font.lineHeight[100].$value.toString(),
        },
      ],
      xs: [
        useVariables
          ? variables.govieFontSize200
          : meta.light.resolved.primitive.font.size[200].$value,
        {
          lineHeight: useVariables
            ? variables.govieFontLineHeight200
            : meta.light.resolved.primitive.font.lineHeight[200].$value.toString(),
        },
      ],
      sm: [
        useVariables
          ? variables.govieFontSize300
          : meta.light.resolved.primitive.font.size[300].$value,
        {
          lineHeight: useVariables
            ? variables.govieFontLineHeight300
            : meta.light.resolved.primitive.font.lineHeight[300].$value.toString(),
        },
      ],
      md: [
        useVariables
          ? variables.govieFontSize400
          : meta.light.resolved.primitive.font.size[400].$value,
        {
          lineHeight: useVariables
            ? variables.govieFontLineHeight400
            : meta.light.resolved.primitive.font.lineHeight[400].$value.toString(),
        },
      ],
      lg: [
        useVariables
          ? variables.govieFontSize500
          : meta.light.resolved.primitive.font.size[500].$value,
        {
          lineHeight: useVariables
            ? variables.govieFontLineHeight500
            : meta.light.resolved.primitive.font.lineHeight[500].$value.toString(),
        },
      ],
      xl: [
        useVariables
          ? variables.govieFontSize600
          : meta.light.resolved.primitive.font.size[600].$value,
        {
          lineHeight: useVariables
            ? variables.govieFontLineHeight600
            : meta.light.resolved.primitive.font.lineHeight[600].$value.toString(),
        },
      ],
      '2xl': [
        useVariables
          ? variables.govieFontSize700
          : meta.light.resolved.primitive.font.size[700].$value,
        {
          lineHeight: useVariables
            ? variables.govieFontLineHeight700
            : meta.light.resolved.primitive.font.lineHeight[700].$value.toString(),
        },
      ],
      '3xl': [
        useVariables
          ? variables.govieFontSize800
          : meta.light.resolved.primitive.font.size[800].$value,
        {
          lineHeight: useVariables
            ? variables.govieFontLineHeight800
            : meta.light.resolved.primitive.font.lineHeight[800].$value.toString(),
        },
      ],
      '4xl': [
        useVariables
          ? variables.govieFontSize900
          : meta.light.resolved.primitive.font.size[900].$value,
        {
          lineHeight: useVariables
            ? variables.govieFontLineHeight900
            : meta.light.resolved.primitive.font.lineHeight[900].$value.toString(),
          // fontWeight: variables.govieFontWeight700,
        },
      ],
    },
    fontWeight: {
      thin: variables.govieFontWeight100,
      extralight: variables.govieFontWeight200,
      light: variables.govieFontWeight300,
      normal: variables.govieFontWeight400,
      medium: variables.govieFontWeight500,
      semibold: variables.govieFontWeight600,
      bold: variables.govieFontWeight700,
      extrabold: variables.govieFontWeight800,
      black: variables.govieFontWeight900,
    },
    lineHeight: {
      '3': variables.govieFontLineHeight50,
      '4': variables.govieFontLineHeight100,
      '5': variables.govieFontLineHeight200,
      '6': variables.govieFontLineHeight400,
      '7': variables.govieFontLineHeight600,
      '8': variables.govieFontLineHeight700,
      '9': variables.govieFontLineHeight800,
      '10': variables.govieFontLineHeight900,
      none: variables.govieFontLineHeight100,
      tight: variables.govieFontLineHeight200,
      snug: variables.govieFontLineHeight300,
      normal: variables.govieFontLineHeight400,
      relaxed: variables.govieFontLineHeight500,
      loose: variables.govieFontLineHeight700,
    },
    borderWidth: {
      xs: variables.govieBorderWidth100,
      sm: variables.govieBorderWidth200,
      md: variables.govieBorderWidth300,
      lg: variables.govieBorderWidth400,
      xl: variables.govieBorderWidth500,
      '2xl': variables.govieBorderWidth600,
      '3xl': variables.govieBorderWidth700,
      '4xl': variables.govieBorderWidth800,
      DEFAULT: variables.govieBorderWidth100,
    },
    borderRadius: {
      // "none": tokens.goiveBorderRadiusNone,
      sm: variables.govieBorderRadius100,
      md: variables.govieBorderRadius200,
      lg: variables.govieBorderRadius300,
      xl: variables.govieBorderRadius400,
      '2xl': variables.govieBorderRadius500,
      '3xl': variables.govieBorderRadius600,
      full: variables.govieBorderRadiusFull,
      DEFAULT: variables.govieBorderRadius200,
    },
    zIndex: {
      1: variables.govieZIndex1,
      100: variables.govieZIndex100,
      200: variables.govieZIndex200,
      300: variables.govieZIndex300,
      400: variables.govieZIndex400,
      500: variables.govieZIndex500,
      600: variables.govieZIndex600,
      700: variables.govieZIndex700,
      800: variables.govieZIndex800,
      900: variables.govieZIndex900,
      1000: variables.govieZIndex1000,
    },
    opacity: {
      '0': variables.govieOpacity0,
      '5': variables.govieOpacity5,
      '10': variables.govieOpacity10,
      '15': variables.govieOpacity15,
      '20': variables.govieOpacity20,
      '25': variables.govieOpacity25,
      '30': variables.govieOpacity30,
      '35': variables.govieOpacity35,
      '40': variables.govieOpacity40,
      '45': variables.govieOpacity45,
      '50': variables.govieOpacity50,
      '55': variables.govieOpacity55,
      '60': variables.govieOpacity60,
      '65': variables.govieOpacity65,
      '70': variables.govieOpacity70,
      '75': variables.govieOpacity75,
      '80': variables.govieOpacity80,
      '85': variables.govieOpacity85,
      '90': variables.govieOpacity90,
      '95': variables.govieOpacity95,
      '100': variables.govieOpacity100,
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
      0: variables.govieSpace0,
      none: variables.govieSpace0,
      '3xs': variables.govieSpacePx,
      '2xs': variables.govieSpace05,
      xs: variables.govieSpace1,
      sm: variables.govieSpace15,
      md: variables.govieSpace2,
      lg: variables.govieSpace3,
      xl: variables.govieSpace5,
      '2xl': variables.govieSpace8,
      '3xl': variables.govieSpace10,
      '4xl': variables.govieSpace12,
      '5xl': variables.govieSpace16,
      '6xl': variables.govieSpace20,
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
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.950'),
            p: {
              fontSize: theme('fontSize.sm')[0],
            },
            h1: {
              fontSize: theme('fontSize.lg')[0],
            },
            h2: {
              fontSize: theme('fontSize.md')[0],
            },
            h3: {
              fontSize: theme('fontSize.sm')[0],
            },
          },
          // h3: {},
          // strong: {
          //   color: theme("colors.gray.800"),
          // },
          // a: {
          //   fontSize: theme("fontSize.lg")[0],
          //   color: theme("colors.white"),
          // },
          // },
        },
        md: {
          css: {
            p: {
              fontSize: theme('fontSize.md')[0],
            },
            h1: {
              fontSize: theme('fontSize.xl')[0],
            },
            h2: {
              fontSize: theme('fontSize.lg')[0],
            },
            h3: {
              fontSize: theme('fontSize.md')[0],
            },
          },
        },
        lg: {
          css: {
            p: {
              fontSize: theme('fontSize.lg')[0],
            },
            h1: {
              fontSize: theme('fontSize.2xl')[0],
            },
            h2: {
              fontSize: theme('fontSize.xl')[0],
            },
            h3: {
              fontSize: theme('fontSize.lg')[0],
            },
          },
        },
        xl: {
          css: {
            p: {
              fontSize: theme('fontSize.xl')[0],
            },
            h1: {
              fontSize: theme('fontSize.3xl')[0],
            },
            h2: {
              fontSize: theme('fontSize.2xl')[0],
            },
            h3: {
              fontSize: theme('fontSize.xl')[0],
            },
          },
        },
      }),
    },
  };

  return deepmerge(defaultTheme, theme);
}
