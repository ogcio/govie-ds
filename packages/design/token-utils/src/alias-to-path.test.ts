import { aliasToPath } from './alias-to-path.js';

describe('aliasToPath', () => {
  it('should return expected path', () => {
    expect(aliasToPath('{primitive.typeScale.xs}')).toEqual(
      'primitive.typeScale.xs',
    );
  });

  it('should throw error for invalid alias', () => {
    expect(() => aliasToPath('primitive.typeScale.xs')).toThrowError(
      `Invalid alias 'primitive.typeScale.xs'.`,
    );
  });
});
