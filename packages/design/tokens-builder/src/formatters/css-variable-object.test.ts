import { cssVariableObjectFormatter } from './css-variable-object.js';
import { testFormatter } from './test-formatter.js';

describe('cssVariableConstsFormatter', () => {
  const { formatArray, formatObject } = testFormatter({
    formatter: cssVariableObjectFormatter,
  });

  it('should return autogenerated message with no tokens', async () => {
    const formatted = await formatArray({
      allTokens: [],
      options: { exportName: 'variables' },
    });

    expect(formatted).toContain(
      ' * Do not edit directly, this file was auto-generated.',
    );
  });

  it('should return css variable object with token value', async () => {
    const exportName = 'variables';

    const formatted = await formatObject({
      exportName,
      tokens: {
        color: {
          gray: {
            500: {
              name: 'color-gray-500',
              type: 'color',
              value: '#333333',
            },
          },
        },
      },
      options: { exportName },
    });

    expect(formatted).toEqual({
      color: {
        gray: {
          500: 'var(--color-gray-500)',
        },
      },
    });
  });
});
