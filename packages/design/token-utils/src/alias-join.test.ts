import { aliasJoin } from './alias-join.js';

describe('aliasJoin', () => {
  it('should join alias with part', () => {
    expect(aliasJoin('{primitive.typography.xs}', 'fontFamily')).toEqual(
      '{primitive.typography.xs.fontFamily}',
    );
  });

  it('should join multiple aliases', () => {
    expect(
      aliasJoin(
        '{primitive.typography.xs}',
        '{font.size.400}',
        '{font.weight.300}',
      ),
    ).toEqual('{primitive.typography.xs.font.size.400.font.weight.300}');
  });

  it('should join multiple parts', () => {
    expect(aliasJoin('fontWeight', 'fontSize', 'fontFamily')).toEqual(
      '{fontWeight.fontSize.fontFamily}',
    );
  });

  it('should return expected aliased values with multiple keys', () => {
    expect(
      aliasJoin('{primitive.typography.xs}', 'fontFamily', 'fontSize'),
    ).toEqual('{primitive.typography.xs.fontFamily.fontSize}');
  });

  it('should throw for an invalid alias', () => {
    expect(() =>
      aliasJoin('{primitive.typography.xs', 'fontFamily'),
    ).toThrowError(`Invalid part '{primitive.typography.xs'`);
  });
});
