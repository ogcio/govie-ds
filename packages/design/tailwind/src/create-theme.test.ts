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
        useVariables: false,
        meta: {
          light: {
            resolved: {
              primitive: {
                font: {
                  size: {
                    '50': { $type: 'dimension', $value: '0.5rem' },
                    '100': { $type: 'dimension', $value: '0.75rem' },
                    '200': { $type: 'dimension', $value: '0.875rem' },
                    '300': { $type: 'dimension', $value: '1rem' },
                    '400': { $type: 'dimension', $value: '1.125rem' },
                    '500': { $type: 'dimension', $value: '1.25rem' },
                    '600': { $type: 'dimension', $value: '1.5rem' },
                    '700': { $type: 'dimension', $value: '1.75rem' },
                    '800': { $type: 'dimension', $value: '2rem' },
                    '900': { $type: 'dimension', $value: '2.25rem' },
                    '1000': { $type: 'dimension', $value: '2.5rem' },
                    '1100': { $type: 'dimension', $value: '3rem' },
                    '1200': { $type: 'dimension', $value: '3.5rem' },
                    '1300': { $type: 'dimension', $value: '4rem' },
                    '1400': { $type: 'dimension', $value: '5rem' },
                  },
                  weight: {
                    '100': { $type: 'fontWeight', $value: 100 },
                    '200': { $type: 'fontWeight', $value: 200 },
                    '300': { $type: 'fontWeight', $value: 300 },
                    '400': { $type: 'fontWeight', $value: 400 },
                    '500': { $type: 'fontWeight', $value: 500 },
                    '600': { $type: 'fontWeight', $value: 600 },
                    '700': { $type: 'fontWeight', $value: 700 },
                    '800': { $type: 'fontWeight', $value: 800 },
                    '900': { $type: 'fontWeight', $value: 900 },
                  },
                  lineHeight: {
                    '50': { $type: 'number', $value: 0.75 },
                    '100': { $type: 'number', $value: 0.825 },
                    '200': { $type: 'number', $value: 1 },
                    '300': { $type: 'number', $value: 1.1 },
                    '400': { $type: 'number', $value: 1.125 },
                    '500': { $type: 'number', $value: 1.15 },
                    '600': { $type: 'number', $value: 1.2 },
                    '700': { $type: 'number', $value: 1.25 },
                    '800': { $type: 'number', $value: 1.3 },
                    '900': { $type: 'number', $value: 1.4 },
                    '1000': { $type: 'number', $value: 1.5 },
                    '1100': { $type: 'number', $value: 1.55 },
                    '1200': { $type: 'number', $value: 1.6 },
                    '1300': { $type: 'number', $value: 2 },
                  },
                },
                screen: {
                  xs: { $type: 'dimension', $value: '480px' },
                  sm: { $type: 'dimension', $value: '640px' },
                  md: { $type: 'dimension', $value: '768px' },
                  lg: { $type: 'dimension', $value: '1024px' },
                  xl: { $type: 'dimension', $value: '1280px' },
                  '2xl': { $type: 'dimension', $value: '1536px' },
                },
              },
            },
          },
        },
      }),
    ).toMatchObject({
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
});
