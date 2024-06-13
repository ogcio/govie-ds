import { dtcgFormatter } from './dtcg.js';
import { testFormatter } from './test-formatter.js';

describe('dtcgFormatter', () => {
  const { formatObject } = testFormatter({
    formatter: dtcgFormatter,
  });

  it('should return empty object with no tokens', async () => {
    const formatted = await formatObject({
      allTokens: [],
    });

    expect(formatted).toEqual({});
  });

  it('should return an object with token values', async () => {
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
