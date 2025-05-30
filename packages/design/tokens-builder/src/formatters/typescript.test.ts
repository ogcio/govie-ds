import { testFormatter } from './test-formatter.js';
import { typeScriptFormatter } from './typescript.js';

describe('typeScriptFormatter', () => {
  const { formatArray, formatObject } = testFormatter({
    formatter: typeScriptFormatter,
  });

  it('should throw without export option', async () => {
    const formatted = formatArray({
      allTokens: [],
    });
    expect(formatted).rejects.toThrow('Missing exportName option.');
  });

  it('should return autogenerated message with no tokens', async () => {
    const formatted = await formatArray({
      allTokens: [],
      options: { exportName: 'foo' },
    });

    expect(formatted).toContain(
      ' * Do not edit directly, this file was auto-generated.',
    );
  });

  it('should return a typescript object with token values', async () => {
    const exportName = 'foo';

    const formatted = await formatObject({
      exportName,
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
      options: { exportName },
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
});
