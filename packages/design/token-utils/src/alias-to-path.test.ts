import { aliasToPath } from './alias-to-path.js';

describe('aliasToPath', () => {
  it('should return expected path', () => {
    expect(aliasToPath('{primitive.typescale.xs}')).toEqual(
      'primitive.typescale.xs',
    );
  });

  it('should throw error for invalid alias', () => {
    expect(() => aliasToPath('primitive.typescale.xs')).toThrowError(
      `Invalid alias 'primitive.typescale.xs'.`,
    );
  });
});
