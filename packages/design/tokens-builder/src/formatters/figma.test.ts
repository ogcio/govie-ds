import { figmaFormatter } from './figma.js';
import { testFormatter } from './test-formatter.js';

describe('figmaFormatter', () => {
  const { formatObject } = testFormatter({
    formatter: figmaFormatter,
  });

  it('should return empty object with no tokens', async () => {
    const formatted = await formatObject({
      allTokens: [],
    });

    expect(formatted).toEqual({});
  });

  it('should return an object with token values', async () => {
    const formatted = await formatObject({
      tokens: {
        color: {
          gray: {
            500: {
              type: 'color',
              value: '#333333',
            },
          },
        },
      },
    });

    expect(formatted).toEqual({
      color: {
        gray: {
          500: {
            $type: 'color',
            $value: '#333333',
          },
        },
      },
    });
  });

  it('should strip primitive, semantic, component prefixes from aliases', async () => {
    const formatted = await formatObject({
      tokens: {
        primitive: {
          color: {
            gray: {
              500: {
                type: 'string',
                value: '#333333',
              },
            },
          },
        },
        semantic: {
          surface: {
            primary: {
              type: 'string',
              value: '{primitive.color.gray.500}',
            },
          },
        },
        component: {
          button: {
            surface: {
              type: 'string',
              value: '{semantic.surface.primary}',
            },
          },
        },
      },
    });

    expect(formatted).toEqual({
      primitive: {
        color: {
          gray: {
            500: {
              $type: 'string',
              $value: '#333333',
            },
          },
        },
      },
      semantic: {
        surface: {
          primary: {
            $type: 'string',
            $value: '{color.gray.500}',
          },
        },
      },
      component: {
        button: {
          surface: {
            $type: 'string',
            $value: '{surface.primary}',
          },
        },
      },
    });
  });

  it('should change fontWeight types to dimension', async () => {
    const formatted = await formatObject({
      tokens: {
        font: {
          weight: {
            '100': { type: 'fontWeight', value: 100 },
          },
        },
      },
    });

    expect(formatted).toEqual({
      font: {
        weight: {
          100: {
            $type: 'dimension',
            $value: 100,
          },
        },
      },
    });
  });

  it('should change shadow types to string', async () => {
    const formatted = await formatObject({
      tokens: {
        shadow: {
          '100': {
            type: 'shadow',
            value: '0 1px 2px 0 #0000000d',
          },
        },
      },
    });

    expect(formatted).toEqual({
      shadow: {
        '100': {
          $type: 'string',
          $value: '0 1px 2px 0 #0000000d',
        },
      },
    });
  });

  it('should change fontFamily types to string', async () => {
    const formatted = await formatObject({
      tokens: {
        font: {
          family: {
            primary: {
              type: 'fontFamily',
              value: 'Lato, Arial, sans-serif',
            },
          },
        },
      },
    });

    expect(formatted).toEqual({
      font: {
        family: {
          primary: {
            $type: 'string',
            $value: 'Lato, Arial, sans-serif',
          },
        },
      },
    });
  });

  it('should change number types to string if they end with %', async () => {
    const formatted = await formatObject({
      tokens: {
        spacing: {
          '100': {
            type: 'number',
            value: 16,
          },
          '200': {
            type: 'number',
            value: 16.5,
          },
          '300': {
            type: 'number',
            value: '16%',
          },
        },
      },
    });

    expect(formatted).toEqual({
      spacing: {
        '100': {
          $type: 'number',
          $value: 16,
        },
        '200': {
          $type: 'number',
          $value: 16.5,
        },
        '300': {
          $type: 'string',
          $value: '16%',
        },
      },
    });
  });

  it('should convert composite types to nested Figma groups', async () => {
    const formatted = await formatObject({
      tokens: {
        typography: {
          regular: {
            '2xs': {
              type: 'typography',
              value: {
                fontFamily: 'Lato, Arial, sans-serif',
                fontSize: 16,
                fontWeight: 400,
                lineHeight: '150%',
              },
            },
          },
        },
      },
    });

    expect(formatted).toEqual({
      typography: {
        regular: {
          '2xs': {
            fontFamily: {
              $type: 'string',
              $value: 'Lato, Arial, sans-serif',
            },
            fontSize: {
              $type: 'number',
              $value: 16,
            },
            fontWeight: {
              $type: 'number',
              $value: 400,
            },
            lineHeight: {
              $type: 'string',
              $value: '150%',
            },
          },
        },
      },
    });
  });
});
