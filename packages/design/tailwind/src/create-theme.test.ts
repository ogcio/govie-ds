import { createTheme } from './create-theme.js';

describe('createTheme', () => {
  it('creates default screen breakpoints', () => {
    expect(createTheme()).toMatchObject({
      screens: {
        xs: '480px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    });
  });

  it('allows screen overrides', () => {
    expect(
      createTheme({ overrides: { screens: { xs: '100px' } } }),
    ).toMatchObject({
      screens: {
        xs: '100px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    });
  });

  it('uses meta screen values if use variables if false', () => {
    expect(
      createTheme({
        meta: {
          light: {
            resolved: {
              brand: {
                color: {
                  brand: {
                    emerald: {
                      $type: 'color',
                      $value: '#004d44',
                    },
                    gray: {
                      $type: 'color',
                      $value: '#0b0c0c',
                    },
                    blue: {
                      $type: 'color',
                      $value: '#2c55a2',
                    },
                    red: {
                      $type: 'color',
                      $value: '#d4351c',
                    },
                    yellow: {
                      $type: 'color',
                      $value: '#ffdd00',
                    },
                    green: {
                      $type: 'color',
                      $value: '#00703c',
                    },
                    purple: {
                      $type: 'color',
                      $value: '#4c2c92',
                    },
                  },
                  primary: {
                    '50': {
                      $type: 'color',
                      $value: '#f0fff7',
                    },
                    '100': {
                      $type: 'color',
                      $value: '#c2fde1',
                    },
                    '200': {
                      $type: 'color',
                      $value: '#95fbd0',
                    },
                    '300': {
                      $type: 'color',
                      $value: '#4aecb4',
                    },
                    '400': {
                      $type: 'color',
                      $value: '#19d39f',
                    },
                    '500': {
                      $type: 'color',
                      $value: '#00b089',
                    },
                    '600': {
                      $type: 'color',
                      $value: '#008971',
                    },
                    '700': {
                      $type: 'color',
                      $value: '#006658',
                    },
                    '800': {
                      $type: 'color',
                      $value: '#004d44',
                    },
                    '900': {
                      $type: 'color',
                      $value: '#003630',
                    },
                    '950': {
                      $type: 'color',
                      $value: '#00241e',
                    },
                  },
                  neutral: {
                    '50': {
                      $type: 'color',
                      $value: '#f7f7f8',
                    },
                    '100': {
                      $type: 'color',
                      $value: '#e9eaed',
                    },
                    '200': {
                      $type: 'color',
                      $value: '#d8dadf',
                    },
                    '300': {
                      $type: 'color',
                      $value: '#babec4',
                    },
                    '400': {
                      $type: 'color',
                      $value: '#a1a6af',
                    },
                    '500': {
                      $type: 'color',
                      $value: '#828893',
                    },
                    '600': {
                      $type: 'color',
                      $value: '#686d78',
                    },
                    '700': {
                      $type: 'color',
                      $value: '#51555e',
                    },
                    '800': {
                      $type: 'color',
                      $value: '#3a3c41',
                    },
                    '900': {
                      $type: 'color',
                      $value: '#252526',
                    },
                    '950': {
                      $type: 'color',
                      $value: '#0b0c0c',
                    },
                    white: {
                      $type: 'color',
                      $value: '#ffffff',
                    },
                    black: {
                      $type: 'color',
                      $value: '#000000',
                    },
                  },
                  support: {
                    error: {
                      '50': {
                        $type: 'color',
                        $value: '#fff4f2',
                      },
                      '100': {
                        $type: 'color',
                        $value: '#fdd1ca',
                      },
                      '200': {
                        $type: 'color',
                        $value: '#faafa3',
                      },
                      '300': {
                        $type: 'color',
                        $value: '#f27764',
                      },
                      '400': {
                        $type: 'color',
                        $value: '#e65038',
                      },
                      '500': {
                        $type: 'color',
                        $value: '#d4351c',
                      },
                      '600': {
                        $type: 'color',
                        $value: '#bb250d',
                      },
                      '700': {
                        $type: 'color',
                        $value: '#9a1a04',
                      },
                      '800': {
                        $type: 'color',
                        $value: '#741201',
                      },
                      '900': {
                        $type: 'color',
                        $value: '#4c0b00',
                      },
                      '950': {
                        $type: 'color',
                        $value: '#290600',
                      },
                    },
                    warning: {
                      '50': {
                        $type: 'color',
                        $value: '#fffceb',
                      },
                      '100': {
                        $type: 'color',
                        $value: '#fffac4',
                      },
                      '200': {
                        $type: 'color',
                        $value: '#fff985',
                      },
                      '300': {
                        $type: 'color',
                        $value: '#ffed44',
                      },
                      '400': {
                        $type: 'color',
                        $value: '#ffdd00',
                      },
                      '500': {
                        $type: 'color',
                        $value: '#e3b30c',
                      },
                      '600': {
                        $type: 'color',
                        $value: '#c18c17',
                      },
                      '700': {
                        $type: 'color',
                        $value: '#99681f',
                      },
                      '800': {
                        $type: 'color',
                        $value: '#67431e',
                      },
                      '900': {
                        $type: 'color',
                        $value: '#3e2919',
                      },
                      '950': {
                        $type: 'color',
                        $value: '#1f150f',
                      },
                    },
                    success: {
                      '50': {
                        $type: 'color',
                        $value: '#f4fff1',
                      },
                      '100': {
                        $type: 'color',
                        $value: '#c5f3bf',
                      },
                      '200': {
                        $type: 'color',
                        $value: '#93e891',
                      },
                      '300': {
                        $type: 'color',
                        $value: '#4dd05e',
                      },
                      '400': {
                        $type: 'color',
                        $value: '#23b84b',
                      },
                      '500': {
                        $type: 'color',
                        $value: '#0ca044',
                      },
                      '600': {
                        $type: 'color',
                        $value: '#008840',
                      },
                      '700': {
                        $type: 'color',
                        $value: '#00703c',
                      },
                      '800': {
                        $type: 'color',
                        $value: '#00572f',
                      },
                      '900': {
                        $type: 'color',
                        $value: '#003d21',
                      },
                      '950': {
                        $type: 'color',
                        $value: '#002413',
                      },
                    },
                    info: {
                      '50': {
                        $type: 'color',
                        $value: '#f2f9ff',
                      },
                      '100': {
                        $type: 'color',
                        $value: '#d4e8fd',
                      },
                      '200': {
                        $type: 'color',
                        $value: '#b6d6fb',
                      },
                      '300': {
                        $type: 'color',
                        $value: '#80b2f4',
                      },
                      '400': {
                        $type: 'color',
                        $value: '#5c94e8',
                      },
                      '500': {
                        $type: 'color',
                        $value: '#457cd8',
                      },
                      '600': {
                        $type: 'color',
                        $value: '#3668c0',
                      },
                      '700': {
                        $type: 'color',
                        $value: '#2c55a2',
                      },
                      '800': {
                        $type: 'color',
                        $value: '#15387c',
                      },
                      '900': {
                        $type: 'color',
                        $value: '#072155',
                      },
                      '950': {
                        $type: 'color',
                        $value: '#001030',
                      },
                    },
                  },
                  utility: {
                    'convention-alt': {
                      '50': {
                        $type: 'color',
                        $value: '#f7f5ff',
                      },
                      '100': {
                        $type: 'color',
                        $value: '#e3daff',
                      },
                      '200': {
                        $type: 'color',
                        $value: '#cfbffe',
                      },
                      '300': {
                        $type: 'color',
                        $value: '#ac8ff8',
                      },
                      '400': {
                        $type: 'color',
                        $value: '#936def',
                      },
                      '500': {
                        $type: 'color',
                        $value: '#7f56e1',
                      },
                      '600': {
                        $type: 'color',
                        $value: '#6f45cd',
                      },
                      '700': {
                        $type: 'color',
                        $value: '#5e37b2',
                      },
                      '800': {
                        $type: 'color',
                        $value: '#4c2c92',
                      },
                      '900': {
                        $type: 'color',
                        $value: '#331a68',
                      },
                      '950': {
                        $type: 'color',
                        $value: '#1e0d40',
                      },
                    },
                    convention: {
                      '50': {
                        $type: 'color',
                        $value: '#f2f9ff',
                      },
                      '100': {
                        $type: 'color',
                        $value: '#d4e8fd',
                      },
                      '200': {
                        $type: 'color',
                        $value: '#b6d6fb',
                      },
                      '300': {
                        $type: 'color',
                        $value: '#80b2f4',
                      },
                      '400': {
                        $type: 'color',
                        $value: '#5c94e8',
                      },
                      '500': {
                        $type: 'color',
                        $value: '#457cd8',
                      },
                      '600': {
                        $type: 'color',
                        $value: '#3668c0',
                      },
                      '700': {
                        $type: 'color',
                        $value: '#2c55a2',
                      },
                      '800': {
                        $type: 'color',
                        $value: '#15387c',
                      },
                      '900': {
                        $type: 'color',
                        $value: '#072155',
                      },
                      '950': {
                        $type: 'color',
                        $value: '#001030',
                      },
                    },
                  },
                  secondary: {
                    '50': {
                      $type: 'color',
                      $value: '#fffbf2',
                    },
                    '100': {
                      $type: 'color',
                      $value: '#f4edde',
                    },
                    '200': {
                      $type: 'color',
                      $value: '#e9dfcb',
                    },
                    '300': {
                      $type: 'color',
                      $value: '#d1c3a3',
                    },
                    '400': {
                      $type: 'color',
                      $value: '#baa980',
                    },
                    '500': {
                      $type: 'color',
                      $value: '#a39161',
                    },
                    '600': {
                      $type: 'color',
                      $value: '#8a7742',
                    },
                    '700': {
                      $type: 'color',
                      $value: '#715f28',
                    },
                    '800': {
                      $type: 'color',
                      $value: '#584915',
                    },
                    '900': {
                      $type: 'color',
                      $value: '#3f3308',
                    },
                    '950': {
                      $type: 'color',
                      $value: '#261f00',
                    },
                  },
                },
              },
              primitive: {
                border: {
                  width: {
                    '100': {
                      $type: 'dimension',
                      $value: '1px',
                    },
                    '200': {
                      $type: 'dimension',
                      $value: '2px',
                    },
                    '300': {
                      $type: 'dimension',
                      $value: '3px',
                    },
                    '400': {
                      $type: 'dimension',
                      $value: '4px',
                    },
                    '500': {
                      $type: 'dimension',
                      $value: '6px',
                    },
                    '600': {
                      $type: 'dimension',
                      $value: '8px',
                    },
                    '700': {
                      $type: 'dimension',
                      $value: '12px',
                    },
                    '800': {
                      $type: 'dimension',
                      $value: '16px',
                    },
                  },
                  radius: {
                    '100': {
                      $type: 'dimension',
                      $value: '2px',
                    },
                    '200': {
                      $type: 'dimension',
                      $value: '4px',
                    },
                    '300': {
                      $type: 'dimension',
                      $value: '6px',
                    },
                    '400': {
                      $type: 'dimension',
                      $value: '8px',
                    },
                    '500': {
                      $type: 'dimension',
                      $value: '12px',
                    },
                    '600': {
                      $type: 'dimension',
                      $value: '16px',
                    },
                    full: {
                      $type: 'dimension',
                      $value: '9999px',
                    },
                  },
                },
                color: {
                  gray: {
                    '50': {
                      $type: 'color',
                      $value: '#f7f7f8',
                    },
                    '100': {
                      $type: 'color',
                      $value: '#e9eaed',
                    },
                    '200': {
                      $type: 'color',
                      $value: '#d8dadf',
                    },
                    '300': {
                      $type: 'color',
                      $value: '#babec4',
                    },
                    '400': {
                      $type: 'color',
                      $value: '#a1a6af',
                    },
                    '500': {
                      $type: 'color',
                      $value: '#828893',
                    },
                    '600': {
                      $type: 'color',
                      $value: '#686d78',
                    },
                    '700': {
                      $type: 'color',
                      $value: '#51555e',
                    },
                    '800': {
                      $type: 'color',
                      $value: '#3a3c41',
                    },
                    '900': {
                      $type: 'color',
                      $value: '#252526',
                    },
                    '950': {
                      $type: 'color',
                      $value: '#0b0c0c',
                    },
                  },
                  blue: {
                    '50': {
                      $type: 'color',
                      $value: '#f2f9ff',
                    },
                    '100': {
                      $type: 'color',
                      $value: '#d4e8fd',
                    },
                    '200': {
                      $type: 'color',
                      $value: '#b6d6fb',
                    },
                    '300': {
                      $type: 'color',
                      $value: '#80b2f4',
                    },
                    '400': {
                      $type: 'color',
                      $value: '#5c94e8',
                    },
                    '500': {
                      $type: 'color',
                      $value: '#457cd8',
                    },
                    '600': {
                      $type: 'color',
                      $value: '#3668c0',
                    },
                    '700': {
                      $type: 'color',
                      $value: '#2c55a2',
                    },
                    '800': {
                      $type: 'color',
                      $value: '#15387c',
                    },
                    '900': {
                      $type: 'color',
                      $value: '#072155',
                    },
                    '950': {
                      $type: 'color',
                      $value: '#001030',
                    },
                  },
                  red: {
                    '50': {
                      $type: 'color',
                      $value: '#fff4f2',
                    },
                    '100': {
                      $type: 'color',
                      $value: '#fdd1ca',
                    },
                    '200': {
                      $type: 'color',
                      $value: '#faafa3',
                    },
                    '300': {
                      $type: 'color',
                      $value: '#f27764',
                    },
                    '400': {
                      $type: 'color',
                      $value: '#e65038',
                    },
                    '500': {
                      $type: 'color',
                      $value: '#d4351c',
                    },
                    '600': {
                      $type: 'color',
                      $value: '#bb250d',
                    },
                    '700': {
                      $type: 'color',
                      $value: '#9a1a04',
                    },
                    '800': {
                      $type: 'color',
                      $value: '#741201',
                    },
                    '900': {
                      $type: 'color',
                      $value: '#4c0b00',
                    },
                    '950': {
                      $type: 'color',
                      $value: '#290600',
                    },
                  },
                  yellow: {
                    '50': {
                      $type: 'color',
                      $value: '#fffceb',
                    },
                    '100': {
                      $type: 'color',
                      $value: '#fffac4',
                    },
                    '200': {
                      $type: 'color',
                      $value: '#fff985',
                    },
                    '300': {
                      $type: 'color',
                      $value: '#ffed44',
                    },
                    '400': {
                      $type: 'color',
                      $value: '#ffdd00',
                    },
                    '500': {
                      $type: 'color',
                      $value: '#e3b30c',
                    },
                    '600': {
                      $type: 'color',
                      $value: '#c18c17',
                    },
                    '700': {
                      $type: 'color',
                      $value: '#99681f',
                    },
                    '800': {
                      $type: 'color',
                      $value: '#67431e',
                    },
                    '900': {
                      $type: 'color',
                      $value: '#3e2919',
                    },
                    '950': {
                      $type: 'color',
                      $value: '#1f150f',
                    },
                  },
                  green: {
                    '50': {
                      $type: 'color',
                      $value: '#f4fff1',
                    },
                    '100': {
                      $type: 'color',
                      $value: '#c5f3bf',
                    },
                    '200': {
                      $type: 'color',
                      $value: '#93e891',
                    },
                    '300': {
                      $type: 'color',
                      $value: '#4dd05e',
                    },
                    '400': {
                      $type: 'color',
                      $value: '#23b84b',
                    },
                    '500': {
                      $type: 'color',
                      $value: '#0ca044',
                    },
                    '600': {
                      $type: 'color',
                      $value: '#008840',
                    },
                    '700': {
                      $type: 'color',
                      $value: '#00703c',
                    },
                    '800': {
                      $type: 'color',
                      $value: '#00572f',
                    },
                    '900': {
                      $type: 'color',
                      $value: '#003d21',
                    },
                    '950': {
                      $type: 'color',
                      $value: '#002413',
                    },
                  },
                  emerald: {
                    '50': {
                      $type: 'color',
                      $value: '#f0fff7',
                    },
                    '100': {
                      $type: 'color',
                      $value: '#c2fde1',
                    },
                    '200': {
                      $type: 'color',
                      $value: '#95fbd0',
                    },
                    '300': {
                      $type: 'color',
                      $value: '#4aecb4',
                    },
                    '400': {
                      $type: 'color',
                      $value: '#19d39f',
                    },
                    '500': {
                      $type: 'color',
                      $value: '#00b089',
                    },
                    '600': {
                      $type: 'color',
                      $value: '#008971',
                    },
                    '700': {
                      $type: 'color',
                      $value: '#006658',
                    },
                    '800': {
                      $type: 'color',
                      $value: '#004d44',
                    },
                    '900': {
                      $type: 'color',
                      $value: '#003630',
                    },
                    '950': {
                      $type: 'color',
                      $value: '#00241e',
                    },
                  },
                  purple: {
                    '50': {
                      $type: 'color',
                      $value: '#f7f5ff',
                    },
                    '100': {
                      $type: 'color',
                      $value: '#e3daff',
                    },
                    '200': {
                      $type: 'color',
                      $value: '#cfbffe',
                    },
                    '300': {
                      $type: 'color',
                      $value: '#ac8ff8',
                    },
                    '400': {
                      $type: 'color',
                      $value: '#936def',
                    },
                    '500': {
                      $type: 'color',
                      $value: '#7f56e1',
                    },
                    '600': {
                      $type: 'color',
                      $value: '#6f45cd',
                    },
                    '700': {
                      $type: 'color',
                      $value: '#5e37b2',
                    },
                    '800': {
                      $type: 'color',
                      $value: '#4c2c92',
                    },
                    '900': {
                      $type: 'color',
                      $value: '#331a68',
                    },
                    '950': {
                      $type: 'color',
                      $value: '#1e0d40',
                    },
                  },
                  gold: {
                    '50': {
                      $type: 'color',
                      $value: '#fffbf2',
                    },
                    '100': {
                      $type: 'color',
                      $value: '#f4edde',
                    },
                    '200': {
                      $type: 'color',
                      $value: '#e9dfcb',
                    },
                    '300': {
                      $type: 'color',
                      $value: '#d1c3a3',
                    },
                    '400': {
                      $type: 'color',
                      $value: '#baa980',
                    },
                    '500': {
                      $type: 'color',
                      $value: '#a39161',
                    },
                    '600': {
                      $type: 'color',
                      $value: '#8a7742',
                    },
                    '700': {
                      $type: 'color',
                      $value: '#715f28',
                    },
                    '800': {
                      $type: 'color',
                      $value: '#584915',
                    },
                    '900': {
                      $type: 'color',
                      $value: '#3f3308',
                    },
                    '950': {
                      $type: 'color',
                      $value: '#261f00',
                    },
                  },
                  base: {
                    emerald: {
                      $type: 'color',
                      $value: '#004d44',
                    },
                    gold: {
                      $type: 'color',
                      $value: '#a39161',
                    },
                    gray: {
                      $type: 'color',
                      $value: '#0b0c0c',
                    },
                    blue: {
                      $type: 'color',
                      $value: '#2c55a2',
                    },
                    red: {
                      $type: 'color',
                      $value: '#d4351c',
                    },
                    yellow: {
                      $type: 'color',
                      $value: '#ffdd00',
                    },
                    green: {
                      $type: 'color',
                      $value: '#00703c',
                    },
                    purple: {
                      $type: 'color',
                      $value: '#4c2c92',
                    },
                    white: {
                      $type: 'color',
                      $value: '#004d44',
                    },
                    transparent: {
                      $type: 'color',
                      $value: '#ffffff03',
                    },
                    black: {
                      $type: 'color',
                      $value: '#000000',
                    },
                  },
                },
                font: {
                  family: {
                    primary: {
                      $type: 'fontFamily',
                      $value: ['Lato', 'Arial', 'sans-serif'],
                    },
                    secondary: {
                      $type: 'fontFamily',
                      $value: ['Lato', 'Arial', 'sans-serif'],
                    },
                    tertiary: {
                      $type: 'fontFamily',
                      $value: [
                        'ui-monospace',
                        'Cascadia Mono',
                        'Segoe UI Mono',
                        'consolas',
                        'Liberation Mono',
                        'monospace',
                      ],
                    },
                  },
                  size: {
                    '50': {
                      $type: 'dimension',
                      $value: '0.5rem',
                    },
                    '100': {
                      $type: 'dimension',
                      $value: '0.75rem',
                    },
                    '200': {
                      $type: 'dimension',
                      $value: '0.875rem',
                    },
                    '300': {
                      $type: 'dimension',
                      $value: '1rem',
                    },
                    '400': {
                      $type: 'dimension',
                      $value: '1.125rem',
                    },
                    '500': {
                      $type: 'dimension',
                      $value: '1.25rem',
                    },
                    '600': {
                      $type: 'dimension',
                      $value: '1.5rem',
                    },
                    '700': {
                      $type: 'dimension',
                      $value: '1.75rem',
                    },
                    '800': {
                      $type: 'dimension',
                      $value: '2rem',
                    },
                    '900': {
                      $type: 'dimension',
                      $value: '2.25rem',
                    },
                    '1000': {
                      $type: 'dimension',
                      $value: '2.5rem',
                    },
                    '1100': {
                      $type: 'dimension',
                      $value: '3rem',
                    },
                    '1200': {
                      $type: 'dimension',
                      $value: '3.5rem',
                    },
                    '1300': {
                      $type: 'dimension',
                      $value: '4rem',
                    },
                    '1400': {
                      $type: 'dimension',
                      $value: '5rem',
                    },
                  },
                  weight: {
                    '100': {
                      $type: 'fontWeight',
                      $value: 100,
                    },
                    '200': {
                      $type: 'fontWeight',
                      $value: 200,
                    },
                    '300': {
                      $type: 'fontWeight',
                      $value: 300,
                    },
                    '400': {
                      $type: 'fontWeight',
                      $value: 400,
                    },
                    '500': {
                      $type: 'fontWeight',
                      $value: 500,
                    },
                    '600': {
                      $type: 'fontWeight',
                      $value: 600,
                    },
                    '700': {
                      $type: 'fontWeight',
                      $value: 700,
                    },
                    '800': {
                      $type: 'fontWeight',
                      $value: 800,
                    },
                    '900': {
                      $type: 'fontWeight',
                      $value: 900,
                    },
                  },
                  lineHeight: {
                    '50': {
                      $type: 'number',
                      $value: 0.75,
                    },
                    '100': {
                      $type: 'number',
                      $value: 0.825,
                    },
                    '200': {
                      $type: 'number',
                      $value: 1,
                    },
                    '300': {
                      $type: 'number',
                      $value: 1.1,
                    },
                    '400': {
                      $type: 'number',
                      $value: 1.125,
                    },
                    '500': {
                      $type: 'number',
                      $value: 1.15,
                    },
                    '600': {
                      $type: 'number',
                      $value: 1.2,
                    },
                    '700': {
                      $type: 'number',
                      $value: 1.25,
                    },
                    '800': {
                      $type: 'number',
                      $value: 1.3,
                    },
                    '900': {
                      $type: 'number',
                      $value: 1.4,
                    },
                    '1000': {
                      $type: 'number',
                      $value: 1.5,
                    },
                    '1100': {
                      $type: 'number',
                      $value: 1.55,
                    },
                    '1200': {
                      $type: 'number',
                      $value: 1.6,
                    },
                    '1300': {
                      $type: 'number',
                      $value: 2,
                    },
                  },
                  letterSpacing: {
                    '100': {
                      $type: 'dimension',
                      $value: '-0.05rem',
                    },
                    '200': {
                      $type: 'dimension',
                      $value: '-0.025rem',
                    },
                    '300': {
                      $type: 'dimension',
                      $value: '0rem',
                    },
                    '400': {
                      $type: 'dimension',
                      $value: '0.025rem',
                    },
                    '500': {
                      $type: 'dimension',
                      $value: '0.05rem',
                    },
                    '600': {
                      $type: 'dimension',
                      $value: '0.1rem',
                    },
                    '700': {
                      $type: 'dimension',
                      $value: '0.15rem',
                    },
                    '800': {
                      $type: 'dimension',
                      $value: '0.2rem',
                    },
                    '900': {
                      $type: 'dimension',
                      $value: '0.3rem',
                    },
                  },
                },
                opacity: {
                  '0': {
                    $type: 'number',
                    $value: 0,
                  },
                  '5': {
                    $type: 'number',
                    $value: 0.05,
                  },
                  '10': {
                    $type: 'number',
                    $value: 0.1,
                  },
                  '15': {
                    $type: 'number',
                    $value: 0.15,
                  },
                  '20': {
                    $type: 'number',
                    $value: 0.2,
                  },
                  '25': {
                    $type: 'number',
                    $value: 0.25,
                  },
                  '30': {
                    $type: 'number',
                    $value: 0.3,
                  },
                  '35': {
                    $type: 'number',
                    $value: 0.35,
                  },
                  '40': {
                    $type: 'number',
                    $value: 0.4,
                  },
                  '45': {
                    $type: 'number',
                    $value: 0.45,
                  },
                  '50': {
                    $type: 'number',
                    $value: 0.5,
                  },
                  '55': {
                    $type: 'number',
                    $value: 0.55,
                  },
                  '60': {
                    $type: 'number',
                    $value: 0.6,
                  },
                  '65': {
                    $type: 'number',
                    $value: 0.65,
                  },
                  '70': {
                    $type: 'number',
                    $value: 0.7,
                  },
                  '75': {
                    $type: 'number',
                    $value: 0.75,
                  },
                  '80': {
                    $type: 'number',
                    $value: 0.8,
                  },
                  '85': {
                    $type: 'number',
                    $value: 0.85,
                  },
                  '90': {
                    $type: 'number',
                    $value: 0.9,
                  },
                  '95': {
                    $type: 'number',
                    $value: 0.95,
                  },
                  '100': {
                    $type: 'number',
                    $value: 1,
                  },
                },
                screen: {
                  xs: {
                    $type: 'dimension',
                    $value: '480px',
                  },
                  sm: {
                    $type: 'dimension',
                    $value: '640px',
                  },
                  md: {
                    $type: 'dimension',
                    $value: '768px',
                  },
                  lg: {
                    $type: 'dimension',
                    $value: '1024px',
                  },
                  xl: {
                    $type: 'dimension',
                    $value: '1280px',
                  },
                  '2xl': {
                    $type: 'dimension',
                    $value: '1536px',
                  },
                },
                shadow: {
                  '100': {
                    $type: 'shadow',
                    $value: {
                      offsetX: '0px',
                      offsetY: '1px',
                      blur: '2px',
                      spread: '0px',
                      color: '#0000000d',
                    },
                  },
                  '200': {
                    $type: 'shadow',
                    $value: {
                      offsetX: '0px',
                      offsetY: '1px',
                      blur: '3px',
                      spread: '0px',
                      color: '#0000001a',
                    },
                  },
                  '300': {
                    $type: 'shadow',
                    $value: {
                      offsetX: '0px',
                      offsetY: '4px',
                      blur: '6px',
                      spread: '-1px',
                      color: '#0000001a',
                    },
                  },
                  '400': {
                    $type: 'shadow',
                    $value: {
                      offsetX: '0px',
                      offsetY: '10px',
                      blur: '15px',
                      spread: '-3px',
                      color: '#0000001a',
                    },
                  },
                  '500': {
                    $type: 'shadow',
                    $value: {
                      offsetX: '0px',
                      offsetY: '20px',
                      blur: '25px',
                      spread: '-5px',
                      color: '#0000001a',
                    },
                  },
                  '600': {
                    $type: 'shadow',
                    $value: {
                      offsetX: '0px',
                      offsetY: '25px',
                      blur: '50px',
                      spread: '-12px',
                      color: '#00000040',
                    },
                  },
                },
                size: {
                  sm: {
                    $type: 'dimension',
                    $value: '16px',
                  },
                  md: {
                    $type: 'dimension',
                    $value: '24px',
                  },
                  lg: {
                    $type: 'dimension',
                    $value: '32px',
                  },
                  xl: {
                    $type: 'dimension',
                    $value: '48px',
                  },
                },
                space: {
                  '0': {
                    $type: 'dimension',
                    $value: '0px',
                  },
                  '1': {
                    $type: 'dimension',
                    $value: '4px',
                  },
                  '2': {
                    $type: 'dimension',
                    $value: '8px',
                  },
                  '3': {
                    $type: 'dimension',
                    $value: '12px',
                  },
                  '4': {
                    $type: 'dimension',
                    $value: '16px',
                  },
                  '5': {
                    $type: 'dimension',
                    $value: '20px',
                  },
                  '6': {
                    $type: 'dimension',
                    $value: '24px',
                  },
                  '7': {
                    $type: 'dimension',
                    $value: '28px',
                  },
                  '8': {
                    $type: 'dimension',
                    $value: '32px',
                  },
                  '9': {
                    $type: 'dimension',
                    $value: '36px',
                  },
                  '10': {
                    $type: 'dimension',
                    $value: '40px',
                  },
                  '11': {
                    $type: 'dimension',
                    $value: '44px',
                  },
                  '12': {
                    $type: 'dimension',
                    $value: '48px',
                  },
                  '13': {
                    $type: 'dimension',
                    $value: '52px',
                  },
                  '14': {
                    $type: 'dimension',
                    $value: '56px',
                  },
                  '16': {
                    $type: 'dimension',
                    $value: '64px',
                  },
                  '18': {
                    $type: 'dimension',
                    $value: '72px',
                  },
                  '19': {
                    $type: 'dimension',
                    $value: '76px',
                  },
                  '20': {
                    $type: 'dimension',
                    $value: '80px',
                  },
                  '24': {
                    $type: 'dimension',
                    $value: '96px',
                  },
                  '28': {
                    $type: 'dimension',
                    $value: '112px',
                  },
                  '32': {
                    $type: 'dimension',
                    $value: '128px',
                  },
                  '36': {
                    $type: 'dimension',
                    $value: '144px',
                  },
                  '40': {
                    $type: 'dimension',
                    $value: '160px',
                  },
                  '44': {
                    $type: 'dimension',
                    $value: '176px',
                  },
                  '48': {
                    $type: 'dimension',
                    $value: '192px',
                  },
                  '52': {
                    $type: 'dimension',
                    $value: '208px',
                  },
                  '56': {
                    $type: 'dimension',
                    $value: '224px',
                  },
                  '60': {
                    $type: 'dimension',
                    $value: '240px',
                  },
                  '64': {
                    $type: 'dimension',
                    $value: '256px',
                  },
                  '70': {
                    $type: 'dimension',
                    $value: '280px',
                  },
                  '72': {
                    $type: 'dimension',
                    $value: '288px',
                  },
                  '80': {
                    $type: 'dimension',
                    $value: '320px',
                  },
                  '86': {
                    $type: 'dimension',
                    $value: '344px',
                  },
                  '94': {
                    $type: 'dimension',
                    $value: '376px',
                  },
                  '96': {
                    $type: 'dimension',
                    $value: '384px',
                  },
                  '105': {
                    $type: 'dimension',
                    $value: '420px',
                  },
                  '120': {
                    $type: 'dimension',
                    $value: '480px',
                  },
                  '135': {
                    $type: 'dimension',
                    $value: '540px',
                  },
                  '160': {
                    $type: 'dimension',
                    $value: '640px',
                  },
                  '192': {
                    $type: 'dimension',
                    $value: '768px',
                  },
                  '240': {
                    $type: 'dimension',
                    $value: '960px',
                  },
                  px: {
                    $type: 'dimension',
                    $value: '1px',
                  },
                  '0-5': {
                    $type: 'dimension',
                    $value: '2px',
                  },
                  '1-5': {
                    $type: 'dimension',
                    $value: '6px',
                  },
                  '2-5': {
                    $type: 'dimension',
                    $value: '10px',
                  },
                  '3-5': {
                    $type: 'dimension',
                    $value: '14px',
                  },
                },
                typeScale: {
                  heading: {
                    regular: {
                      '100': {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '1rem',
                          fontWeight: 400,
                          lineHeight: 1.5,
                        },
                      },
                      '200': {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '1.125rem',
                          fontWeight: 400,
                          lineHeight: 1.5,
                        },
                      },
                      '300': {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '1.25rem',
                          fontWeight: 400,
                          lineHeight: 1.5,
                        },
                      },
                      '400': {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '1.5rem',
                          fontWeight: 400,
                          lineHeight: 1.25,
                        },
                      },
                      '500': {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '1.75rem',
                          fontWeight: 400,
                          lineHeight: 1.25,
                        },
                      },
                      '600': {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '2rem',
                          fontWeight: 400,
                          lineHeight: 1.25,
                        },
                      },
                      '700': {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '2.25rem',
                          fontWeight: 400,
                          lineHeight: 1.25,
                        },
                      },
                      '800': {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '2.5rem',
                          fontWeight: 400,
                          lineHeight: 1.25,
                        },
                      },
                      '900': {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '3rem',
                          fontWeight: 400,
                          lineHeight: 1.125,
                        },
                      },
                      '1000': {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '3.5rem',
                          fontWeight: 400,
                          lineHeight: 1.125,
                        },
                      },
                      '1100': {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '4rem',
                          fontWeight: 400,
                          lineHeight: 1.125,
                        },
                      },
                      '1200': {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '5rem',
                          fontWeight: 400,
                          lineHeight: 1.125,
                        },
                      },
                    },
                    bold: {
                      '100': {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '1rem',
                          fontWeight: 700,
                          lineHeight: 1.5,
                        },
                      },
                      '200': {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '1.125rem',
                          fontWeight: 700,
                          lineHeight: 1.5,
                        },
                      },
                      '300': {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '1.25rem',
                          fontWeight: 700,
                          lineHeight: 1.5,
                        },
                      },
                      '400': {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '1.5rem',
                          fontWeight: 700,
                          lineHeight: 1.25,
                        },
                      },
                      '500': {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '1.75rem',
                          fontWeight: 700,
                          lineHeight: 1.25,
                        },
                      },
                      '600': {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '2rem',
                          fontWeight: 700,
                          lineHeight: 1.25,
                        },
                      },
                      '700': {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '2.25rem',
                          fontWeight: 700,
                          lineHeight: 1.25,
                        },
                      },
                      '800': {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '2.5rem',
                          fontWeight: 700,
                          lineHeight: 1.25,
                        },
                      },
                      '900': {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '3rem',
                          fontWeight: 700,
                          lineHeight: 1.125,
                        },
                      },
                      '1000': {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '3.5rem',
                          fontWeight: 700,
                          lineHeight: 1.125,
                        },
                      },
                      '1100': {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '4rem',
                          fontWeight: 700,
                          lineHeight: 1.125,
                        },
                      },
                      '1200': {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '5rem',
                          fontWeight: 700,
                          lineHeight: 1.125,
                        },
                      },
                    },
                  },
                  text: {
                    '100': {
                      $type: 'typography',
                      $value: {
                        fontFamily: ['Lato', 'Arial', 'sans-serif'],
                        fontSize: '0.875rem',
                        fontWeight: 400,
                        lineHeight: 1.5,
                      },
                    },
                    '200': {
                      $type: 'typography',
                      $value: {
                        fontFamily: ['Lato', 'Arial', 'sans-serif'],
                        fontSize: '1rem',
                        fontWeight: 400,
                        lineHeight: 1.5,
                      },
                    },
                    '300': {
                      $type: 'typography',
                      $value: {
                        fontFamily: ['Lato', 'Arial', 'sans-serif'],
                        fontSize: '1.125rem',
                        fontWeight: 400,
                        lineHeight: 1.5,
                      },
                    },
                    '400': {
                      $type: 'typography',
                      $value: {
                        fontFamily: ['Lato', 'Arial', 'sans-serif'],
                        fontSize: '1.25rem',
                        fontWeight: 400,
                        lineHeight: 1.5,
                      },
                    },
                    '500': {
                      $type: 'typography',
                      $value: {
                        fontFamily: ['Lato', 'Arial', 'sans-serif'],
                        fontSize: '1.5rem',
                        fontWeight: 400,
                        lineHeight: 1.5,
                      },
                    },
                  },
                },
                zIndex: {
                  '1': {
                    $type: 'number',
                    $value: 1,
                  },
                  '100': {
                    $type: 'number',
                    $value: 100,
                  },
                  '200': {
                    $type: 'number',
                    $value: 200,
                  },
                  '300': {
                    $type: 'number',
                    $value: 300,
                  },
                  '400': {
                    $type: 'number',
                    $value: 400,
                  },
                  '500': {
                    $type: 'number',
                    $value: 500,
                  },
                  '600': {
                    $type: 'number',
                    $value: 600,
                  },
                  '700': {
                    $type: 'number',
                    $value: 700,
                  },
                  '800': {
                    $type: 'number',
                    $value: 800,
                  },
                  '900': {
                    $type: 'number',
                    $value: 900,
                  },
                  '1000': {
                    $type: 'number',
                    $value: 1000,
                  },
                },
              },
              semantic: {
                color: {
                  text: {
                    tone: {
                      'primary-fill': {
                        default: {
                          $type: 'color',
                          $value: '#ffffff',
                        },
                        disabled: {
                          $type: 'color',
                          $value: '#51555e',
                        },
                        hover: {
                          $type: 'color',
                          $value: '#ffffff',
                        },
                        focus: {
                          $type: 'color',
                          $value: '#ffffff',
                        },
                      },
                      'dark-fill': {
                        default: {
                          $type: 'color',
                          $value: '#ffffff',
                        },
                        disabled: {
                          $type: 'color',
                          $value: '#51555e',
                        },
                        hover: {
                          $type: 'color',
                          $value: '#ffffff',
                        },
                        focus: {
                          $type: 'color',
                          $value: '#ffffff',
                        },
                      },
                      'primary-outline': {
                        default: {
                          $type: 'color',
                          $value: '#004d44',
                        },
                        disabled: {
                          $type: 'color',
                          $value: '#51555e',
                        },
                        hover: {
                          $type: 'color',
                          $value: '#004d44',
                        },
                        focus: {
                          $type: 'color',
                          $value: '#004d44',
                        },
                      },
                      'dark-outline': {
                        default: {
                          $type: 'color',
                          $value: '#0b0c0c',
                        },
                        disabled: {
                          $type: 'color',
                          $value: '#51555e',
                        },
                        hover: {
                          $type: 'color',
                          $value: '#0b0c0c',
                        },
                        focus: {
                          $type: 'color',
                          $value: '#0b0c0c',
                        },
                      },
                      'light-fill': {
                        default: {
                          $type: 'color',
                          $value: '#0b0c0c',
                        },
                        disabled: {
                          $type: 'color',
                          $value: '#a1a6af',
                        },
                        hover: {
                          $type: 'color',
                          $value: '#0b0c0c',
                        },
                        focus: {
                          $type: 'color',
                          $value: '#0b0c0c',
                        },
                      },
                      'light-outline': {
                        default: {
                          $type: 'color',
                          $value: '#ffffff',
                        },
                        disabled: {
                          $type: 'color',
                          $value: '#a1a6af',
                        },
                        hover: {
                          $type: 'color',
                          $value: '#ffffff',
                        },
                        focus: {
                          $type: 'color',
                          $value: '#ffffff',
                        },
                      },
                      'primary-flat': {
                        default: {
                          $type: 'color',
                          $value: '#004d44',
                        },
                        disabled: {
                          $type: 'color',
                          $value: '#51555e',
                        },
                        hover: {
                          $type: 'color',
                          $value: '#004d44',
                        },
                        focus: {
                          $type: 'color',
                          $value: '#004d44',
                        },
                      },
                      'dark-flat': {
                        default: {
                          $type: 'color',
                          $value: '#0b0c0c',
                        },
                        disabled: {
                          $type: 'color',
                          $value: '#51555e',
                        },
                        hover: {
                          $type: 'color',
                          $value: '#0b0c0c',
                        },
                        focus: {
                          $type: 'color',
                          $value: '#0b0c0c',
                        },
                      },
                      'light-flat': {
                        default: {
                          $type: 'color',
                          $value: '#ffffff',
                        },
                        disabled: {
                          $type: 'color',
                          $value: '#a1a6af',
                        },
                        hover: {
                          $type: 'color',
                          $value: '#ffffff',
                        },
                        focus: {
                          $type: 'color',
                          $value: '#ffffff',
                        },
                      },
                      convention: {
                        default: {
                          $type: 'color',
                          $value: '#2c55a2',
                        },
                        hover: {
                          $type: 'color',
                          $value: '#15387c',
                        },
                        disabled: {
                          $type: 'color',
                          $value: '#51555e',
                        },
                        focus: {
                          $type: 'color',
                          $value: '#15387c',
                        },
                        visited: {
                          $type: 'color',
                          $value: '#5e37b2',
                        },
                      },
                      dark: {
                        default: {
                          $type: 'color',
                          $value: '#0b0c0c',
                        },
                        hover: {
                          $type: 'color',
                          $value: '#0b0c0c',
                        },
                        focus: {
                          $type: 'color',
                          $value: '#0b0c0c',
                        },
                        disabled: {
                          $type: 'color',
                          $value: '#51555e',
                        },
                        visited: {
                          $type: 'color',
                          $value: '#5e37b2',
                        },
                      },
                      light: {
                        default: {
                          $type: 'color',
                          $value: '#ffffff',
                        },
                        hover: {
                          $type: 'color',
                          $value: '#ffffff',
                        },
                        focus: {
                          $type: 'color',
                          $value: '#ffffff',
                        },
                        visited: {
                          $type: 'color',
                          $value: '#ffffff',
                        },
                        disabled: {
                          $type: 'color',
                          $value: '#a1a6af',
                        },
                      },
                    },
                    intent: {
                      info: {
                        default: {
                          $type: 'color',
                          $value: '#2c55a2',
                        },
                      },
                      success: {
                        default: {
                          $type: 'color',
                          $value: '#00703c',
                        },
                      },
                      error: {
                        default: {
                          $type: 'color',
                          $value: '#9a1a04',
                        },
                      },
                      warning: {
                        default: {
                          $type: 'color',
                          $value: '#99681f',
                        },
                      },
                    },
                    system: {
                      neutral: {
                        inverted: {
                          $type: 'color',
                          $value: '#ffffff',
                        },
                        primary: {
                          $type: 'color',
                          $value: '#0b0c0c',
                        },
                        secondary: {
                          $type: 'color',
                          $value: '#686d78',
                        },
                        interactive: {
                          disabled: {
                            $type: 'color',
                            $value: '#51555e',
                          },
                        },
                      },
                    },
                  },
                  surface: {
                    system: {
                      neutral: {
                        default: {
                          $type: 'color',
                          $value: '#ffffff',
                        },
                        subtle: {
                          $type: 'color',
                          $value: '#f7f7f8',
                        },
                        interactive: {
                          disabled: {
                            $type: 'color',
                            $value: '#d8dadf',
                          },
                          hover: {
                            $type: 'color',
                            $value: '#d8dadf',
                          },
                          selected: {
                            $type: 'color',
                            $value: '#0b0c0c',
                          },
                          'selected-disabled': {
                            $type: 'color',
                            $value: '#51555e',
                          },
                        },
                        muted: {
                          $type: 'color',
                          $value: '#e9eaed',
                        },
                        strong: {
                          $type: 'color',
                          $value: '#0b0c0c',
                        },
                      },
                      primary: {
                        default: {
                          $type: 'color',
                          $value: '#004d44',
                        },
                        subtle: {
                          $type: 'color',
                          $value: '#006658',
                        },
                        accent: {
                          $type: 'color',
                          $value: '#19d39f',
                        },
                      },
                    },
                    tone: {
                      'primary-fill': {
                        default: {
                          $type: 'color',
                          $value: '#004d44',
                        },
                        hover: {
                          $type: 'color',
                          $value: '#003630',
                        },
                        disabled: {
                          $type: 'color',
                          $value: '#d8dadf',
                        },
                      },
                      'dark-fill': {
                        default: {
                          $type: 'color',
                          $value: '#0b0c0c',
                        },
                        hover: {
                          $type: 'color',
                          $value: '#3a3c41',
                        },
                        disabled: {
                          $type: 'color',
                          $value: '#d8dadf',
                        },
                      },
                      'light-fill': {
                        default: {
                          $type: 'color',
                          $value: '#ffffff',
                        },
                        hover: {
                          $type: 'color',
                          $value: '#d8dadf',
                        },
                        disabled: {
                          $type: 'color',
                          $value: '#3a3c41',
                        },
                      },
                      'primary-outline': {
                        default: {
                          $type: 'color',
                          $value: '#ffffff03',
                        },
                        hover: {
                          $type: 'color',
                          $value: '#f0fff7',
                        },
                        disabled: {
                          $type: 'color',
                          $value: '#d8dadf',
                        },
                      },
                      'primary-flat': {
                        default: {
                          $type: 'color',
                          $value: '#ffffff03',
                        },
                        hover: {
                          $type: 'color',
                          $value: '#f0fff7',
                        },
                        disabled: {
                          $type: 'color',
                          $value: '#ffffff03',
                        },
                      },
                      'dark-outline': {
                        default: {
                          $type: 'color',
                          $value: '#ffffff03',
                        },
                        hover: {
                          $type: 'color',
                          $value: '#d8dadf',
                        },
                        disabled: {
                          $type: 'color',
                          $value: '#d8dadf',
                        },
                      },
                      'dark-flat': {
                        default: {
                          $type: 'color',
                          $value: '#ffffff03',
                        },
                        hover: {
                          $type: 'color',
                          $value: '#d8dadf',
                        },
                        disabled: {
                          $type: 'color',
                          $value: '#ffffff03',
                        },
                      },
                      'light-outline': {
                        default: {
                          $type: 'color',
                          $value: '#ffffff03',
                        },
                        hover: {
                          $type: 'color',
                          $value: '#3a3c41',
                        },
                        disabled: {
                          $type: 'color',
                          $value: '#3a3c41',
                        },
                      },
                      'light-flat': {
                        default: {
                          $type: 'color',
                          $value: '#ffffff03',
                        },
                        hover: {
                          $type: 'color',
                          $value: '#3a3c41',
                        },
                        disabled: {
                          $type: 'color',
                          $value: '#ffffff03',
                        },
                      },
                    },
                    intent: {
                      info: {
                        default: {
                          $type: 'color',
                          $value: '#f2f9ff',
                        },
                      },
                      success: {
                        default: {
                          $type: 'color',
                          $value: '#f4fff1',
                        },
                      },
                      error: {
                        default: {
                          $type: 'color',
                          $value: '#fff4f2',
                        },
                      },
                      warning: {
                        default: {
                          $type: 'color',
                          $value: '#fffceb',
                        },
                      },
                      focus: {
                        default: {
                          $type: 'color',
                          $value: '#d8dadf',
                        },
                      },
                    },
                  },
                  icon: {
                    system: {
                      neutral: {
                        primary: {
                          $type: 'color',
                          $value: '#0b0c0c',
                        },
                        inverted: {
                          $type: 'color',
                          $value: '#ffffff',
                        },
                        interactive: {
                          disabled: {
                            $type: 'color',
                            $value: '#51555e',
                          },
                          selected: {
                            $type: 'color',
                            $value: '#0b0c0c',
                          },
                          'selected-disabled': {
                            $type: 'color',
                            $value: '#51555e',
                          },
                        },
                        secondary: {
                          $type: 'color',
                          $value: '#686d78',
                        },
                      },
                    },
                    tone: {
                      'primary-fill': {
                        default: {
                          $type: 'color',
                          $value: '#ffffff',
                        },
                        disabled: {
                          $type: 'color',
                          $value: '#51555e',
                        },
                        hover: {
                          $type: 'color',
                          $value: '#ffffff',
                        },
                      },
                      'primary-outline': {
                        default: {
                          $type: 'color',
                          $value: '#004d44',
                        },
                        disabled: {
                          $type: 'color',
                          $value: '#51555e',
                        },
                        hover: {
                          $type: 'color',
                          $value: '#004d44',
                        },
                      },
                      'primary-flat': {
                        default: {
                          $type: 'color',
                          $value: '#004d44',
                        },
                        disabled: {
                          $type: 'color',
                          $value: '#51555e',
                        },
                        hover: {
                          $type: 'color',
                          $value: '#004d44',
                        },
                      },
                      'dark-fill': {
                        default: {
                          $type: 'color',
                          $value: '#ffffff',
                        },
                        disabled: {
                          $type: 'color',
                          $value: '#51555e',
                        },
                        hover: {
                          $type: 'color',
                          $value: '#ffffff',
                        },
                      },
                      'dark-outline': {
                        default: {
                          $type: 'color',
                          $value: '#0b0c0c',
                        },
                        disabled: {
                          $type: 'color',
                          $value: '#51555e',
                        },
                        hover: {
                          $type: 'color',
                          $value: '#0b0c0c',
                        },
                      },
                      'dark-flat': {
                        default: {
                          $type: 'color',
                          $value: '#0b0c0c',
                        },
                        disabled: {
                          $type: 'color',
                          $value: '#51555e',
                        },
                        hover: {
                          $type: 'color',
                          $value: '#0b0c0c',
                        },
                      },
                      'light-fill': {
                        default: {
                          $type: 'color',
                          $value: '#0b0c0c',
                        },
                        disabled: {
                          $type: 'color',
                          $value: '#a1a6af',
                        },
                        hover: {
                          $type: 'color',
                          $value: '#0b0c0c',
                        },
                      },
                      'light-outline': {
                        default: {
                          $type: 'color',
                          $value: '#ffffff',
                        },
                        disabled: {
                          $type: 'color',
                          $value: '#a1a6af',
                        },
                        hover: {
                          $type: 'color',
                          $value: '#ffffff',
                        },
                      },
                      'light-flat': {
                        default: {
                          $type: 'color',
                          $value: '#ffffff',
                        },
                        disabled: {
                          $type: 'color',
                          $value: '#a1a6af',
                        },
                        hover: {
                          $type: 'color',
                          $value: '#ffffff',
                        },
                      },
                      convention: {
                        default: {
                          $type: 'color',
                          $value: '#2c55a2',
                        },
                        hover: {
                          $type: 'color',
                          $value: '#15387c',
                        },
                        focus: {
                          $type: 'color',
                          $value: '#15387c',
                        },
                        visited: {
                          $type: 'color',
                          $value: '#5e37b2',
                        },
                        disabled: {
                          $type: 'color',
                          $value: '#51555e',
                        },
                      },
                      dark: {
                        default: {
                          $type: 'color',
                          $value: '#0b0c0c',
                        },
                        hover: {
                          $type: 'color',
                          $value: '#0b0c0c',
                        },
                        focus: {
                          $type: 'color',
                          $value: '#0b0c0c',
                        },
                        visited: {
                          $type: 'color',
                          $value: '#5e37b2',
                        },
                        disabled: {
                          $type: 'color',
                          $value: '#51555e',
                        },
                      },
                      light: {
                        default: {
                          $type: 'color',
                          $value: '#ffffff',
                        },
                        hover: {
                          $type: 'color',
                          $value: '#ffffff',
                        },
                        focus: {
                          $type: 'color',
                          $value: '#ffffff',
                        },
                        visited: {
                          $type: 'color',
                          $value: '#ffffff',
                        },
                        disabled: {
                          $type: 'color',
                          $value: '#a1a6af',
                        },
                      },
                    },
                    intent: {
                      info: {
                        default: {
                          $type: 'color',
                          $value: '#2c55a2',
                        },
                      },
                      success: {
                        default: {
                          $type: 'color',
                          $value: '#00703c',
                        },
                      },
                      error: {
                        default: {
                          $type: 'color',
                          $value: '#9a1a04',
                        },
                      },
                      warning: {
                        default: {
                          $type: 'color',
                          $value: '#99681f',
                        },
                      },
                    },
                  },
                  border: {
                    tone: {
                      'primary-outline': {
                        default: {
                          $type: 'color',
                          $value: '#004d44',
                        },
                        hover: {
                          $type: 'color',
                          $value: '#004d44',
                        },
                        disabled: {
                          $type: 'color',
                          $value: '#a1a6af',
                        },
                      },
                      'dark-outline': {
                        default: {
                          $type: 'color',
                          $value: '#0b0c0c',
                        },
                        hover: {
                          $type: 'color',
                          $value: '#0b0c0c',
                        },
                        disabled: {
                          $type: 'color',
                          $value: '#a1a6af',
                        },
                      },
                      'light-outline': {
                        default: {
                          $type: 'color',
                          $value: '#ffffff',
                        },
                        hover: {
                          $type: 'color',
                          $value: '#ffffff',
                        },
                        disabled: {
                          $type: 'color',
                          $value: '#a1a6af',
                        },
                      },
                      convention: {
                        default: {
                          $type: 'color',
                          $value: '#2c55a2',
                        },
                        hover: {
                          $type: 'color',
                          $value: '#15387c',
                        },
                        focus: {
                          $type: 'color',
                          $value: '#15387c',
                        },
                        visited: {
                          $type: 'color',
                          $value: '#5e37b2',
                        },
                        disabled: {
                          $type: 'color',
                          $value: '#51555e',
                        },
                      },
                      dark: {
                        default: {
                          $type: 'color',
                          $value: '#0b0c0c',
                        },
                        hover: {
                          $type: 'color',
                          $value: '#0b0c0c',
                        },
                        focus: {
                          $type: 'color',
                          $value: '#0b0c0c',
                        },
                        visited: {
                          $type: 'color',
                          $value: '#5e37b2',
                        },
                        disabled: {
                          $type: 'color',
                          $value: '#51555e',
                        },
                      },
                      light: {
                        default: {
                          $type: 'color',
                          $value: '#ffffff',
                        },
                        hover: {
                          $type: 'color',
                          $value: '#ffffff',
                        },
                        focus: {
                          $type: 'color',
                          $value: '#ffffff',
                        },
                        visited: {
                          $type: 'color',
                          $value: '#ffffff',
                        },
                        disabled: {
                          $type: 'color',
                          $value: '#a1a6af',
                        },
                      },
                    },
                    intent: {
                      info: {
                        subtle: {
                          $type: 'color',
                          $value: '#d4e8fd',
                        },
                      },
                      success: {
                        subtle: {
                          $type: 'color',
                          $value: '#c5f3bf',
                        },
                      },
                      error: {
                        default: {
                          $type: 'color',
                          $value: '#bb250d',
                        },
                        subtle: {
                          $type: 'color',
                          $value: '#fdd1ca',
                        },
                      },
                      warning: {
                        subtle: {
                          $type: 'color',
                          $value: '#ffed44',
                        },
                      },
                      focus: {
                        default: {
                          $type: 'color',
                          $value: '#0b0c0c',
                        },
                        light: {
                          $type: 'color',
                          $value: '#ffffff',
                        },
                      },
                    },
                    system: {
                      neutral: {
                        default: {
                          $type: 'color',
                          $value: '#0b0c0c',
                        },
                        interactive: {
                          disabled: {
                            $type: 'color',
                            $value: '#a1a6af',
                          },
                          hover: {
                            $type: 'color',
                            $value: '#0b0c0c',
                          },
                        },
                        muted: {
                          $type: 'color',
                          $value: '#d8dadf',
                        },
                        subtle: {
                          $type: 'color',
                          $value: '#e9eaed',
                        },
                      },
                    },
                  },
                },
                typography: {
                  default: {
                    heading: {
                      xl: {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '2.25rem',
                          fontWeight: 700,
                          lineHeight: 1.25,
                        },
                      },
                      lg: {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '1.75rem',
                          fontWeight: 700,
                          lineHeight: 1.25,
                        },
                      },
                      md: {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '1.25rem',
                          fontWeight: 700,
                          lineHeight: 1.5,
                        },
                      },
                      sm: {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '1.25rem',
                          fontWeight: 700,
                          lineHeight: 1.5,
                        },
                      },
                      xs: {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '1.125rem',
                          fontWeight: 700,
                          lineHeight: 1.5,
                        },
                      },
                      '2xs': {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '1rem',
                          fontWeight: 700,
                          lineHeight: 1.5,
                        },
                      },
                    },
                    text: {
                      lg: {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '1.25rem',
                          fontWeight: 400,
                          lineHeight: 1.5,
                        },
                      },
                      md: {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '1.125rem',
                          fontWeight: 400,
                          lineHeight: 1.5,
                        },
                      },
                      sm: {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '1rem',
                          fontWeight: 400,
                          lineHeight: 1.5,
                        },
                      },
                    },
                  },
                  xs: {
                    heading: {
                      xl: {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '2.25rem',
                          fontWeight: 700,
                          lineHeight: 1.25,
                        },
                      },
                      lg: {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '1.75rem',
                          fontWeight: 700,
                          lineHeight: 1.25,
                        },
                      },
                      md: {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '1.25rem',
                          fontWeight: 700,
                          lineHeight: 1.5,
                        },
                      },
                      sm: {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '1.25rem',
                          fontWeight: 700,
                          lineHeight: 1.5,
                        },
                      },
                      xs: {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '1.125rem',
                          fontWeight: 700,
                          lineHeight: 1.5,
                        },
                      },
                      '2xs': {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '1rem',
                          fontWeight: 700,
                          lineHeight: 1.5,
                        },
                      },
                    },
                    text: {
                      lg: {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '1.25rem',
                          fontWeight: 400,
                          lineHeight: 1.5,
                        },
                      },
                      md: {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '1.125rem',
                          fontWeight: 400,
                          lineHeight: 1.5,
                        },
                      },
                      sm: {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '1rem',
                          fontWeight: 400,
                          lineHeight: 1.5,
                        },
                      },
                    },
                  },
                  md: {
                    heading: {
                      xl: {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '2.5rem',
                          fontWeight: 700,
                          lineHeight: 1.25,
                        },
                      },
                      lg: {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '2rem',
                          fontWeight: 700,
                          lineHeight: 1.25,
                        },
                      },
                      md: {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '1.5rem',
                          fontWeight: 700,
                          lineHeight: 1.25,
                        },
                      },
                      sm: {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '1.25rem',
                          fontWeight: 700,
                          lineHeight: 1.5,
                        },
                      },
                      xs: {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '1.125rem',
                          fontWeight: 700,
                          lineHeight: 1.5,
                        },
                      },
                      '2xs': {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '1rem',
                          fontWeight: 700,
                          lineHeight: 1.5,
                        },
                      },
                    },
                    text: {
                      lg: {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '1.25rem',
                          fontWeight: 400,
                          lineHeight: 1.5,
                        },
                      },
                      md: {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '1.125rem',
                          fontWeight: 400,
                          lineHeight: 1.5,
                        },
                      },
                      sm: {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '1rem',
                          fontWeight: 400,
                          lineHeight: 1.5,
                        },
                      },
                    },
                  },
                  xl: {
                    heading: {
                      xl: {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '3rem',
                          fontWeight: 700,
                          lineHeight: 1.125,
                        },
                      },
                      lg: {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '2.25rem',
                          fontWeight: 700,
                          lineHeight: 1.25,
                        },
                      },
                      md: {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '1.75rem',
                          fontWeight: 700,
                          lineHeight: 1.25,
                        },
                      },
                      sm: {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '1.5rem',
                          fontWeight: 700,
                          lineHeight: 1.25,
                        },
                      },
                      xs: {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '1.125rem',
                          fontWeight: 700,
                          lineHeight: 1.5,
                        },
                      },
                      '2xs': {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '1rem',
                          fontWeight: 700,
                          lineHeight: 1.5,
                        },
                      },
                    },
                    text: {
                      lg: {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '1.25rem',
                          fontWeight: 400,
                          lineHeight: 1.5,
                        },
                      },
                      md: {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '1.125rem',
                          fontWeight: 400,
                          lineHeight: 1.5,
                        },
                      },
                      sm: {
                        $type: 'typography',
                        $value: {
                          fontFamily: ['Lato', 'Arial', 'sans-serif'],
                          fontSize: '1rem',
                          fontWeight: 400,
                          lineHeight: 1.5,
                        },
                      },
                    },
                  },
                },
                surface: {
                  primary: {
                    default: {
                      $type: 'color',
                      $value: '#004d44',
                    },
                    subtle: {
                      $type: 'color',
                      $value: '#006658',
                    },
                    disabled: {
                      $type: 'color',
                      $value: '#d8dadf',
                    },
                    hover: {
                      $type: 'color',
                      $value: '#003630',
                    },
                  },
                  secondary: {
                    default: {
                      $type: 'color',
                      $value: '#004d44',
                    },
                    subtle: {
                      $type: 'color',
                      $value: '#006658',
                    },
                    disabled: {
                      $type: 'color',
                      $value: '#d8dadf',
                    },
                    hover: {
                      $type: 'color',
                      $value: '#003630',
                    },
                  },
                  neutral: {
                    default: {
                      $type: 'color',
                      $value: '#004d44',
                    },
                    subtle: {
                      $type: 'color',
                      $value: '#006658',
                    },
                    disabled: {
                      $type: 'color',
                      $value: '#d8dadf',
                    },
                    hover: {
                      $type: 'color',
                      $value: '#003630',
                    },
                  },
                },
              },
            },
          },
        },
      }),
    ).toMatchObject({
      screens: {
        '2xl': '1536px',
        lg: '1024px',
        md: '768px',
        sm: '640px',
        xl: '1280px',
        xs: '480px',
      },
    });
  });

  it('includes expected colors by default', () => {
    expect(createTheme()).toMatchObject({
      colors: {
        transparent: 'transparent',
        black: '#000000',
        white: '#ffffff',
      },
    });
  });

  it('merges overrides', () => {
    expect(
      createTheme({ overrides: { colors: { red: '#ff0000' } } }),
    ).toMatchObject({
      colors: {
        transparent: 'transparent',
        black: '#000000',
        white: '#ffffff',
        red: '#ff0000',
      },
    });
  });
});
