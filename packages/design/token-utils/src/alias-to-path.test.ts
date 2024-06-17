import { aliasToPath } from './alias-to-path.js';

describe('aliasToPath', () => {
  it('should return expected path', () => {
    expect(aliasToPath('{primitive.typography.xs}')).toEqual(
      'primitive.typography.xs',
    );
  });

  it('should throw error for invalid alias', () => {
    expect(() => aliasToPath('primitive.typography.xs')).toThrowError(
      `Invalid alias 'primitive.typography.xs'.`,
    );
  });
});
