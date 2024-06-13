import { cssVariableConstsFormatter } from './css-variable-consts.js';
import { testFormatter } from './test-formatter.js';

describe('cssVariableConstsFormatter', () => {
  const format = testFormatter({ formatter: cssVariableConstsFormatter });

  it('should return expected output', async () => {
    const formatted = await format({ tokens: [] });

    expect(formatted).toContain(
      ' * Do not edit directly, this file was auto-generated.',
    );
  });
});
