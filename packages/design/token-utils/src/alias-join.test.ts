import { aliasJoin } from './alias-join.js';

describe('aliasJoin', () => {
  it('should join alias with part', () => {
    expect(aliasJoin('{primitive.typescale.xs}', 'fontFamily')).toEqual(
      '{primitive.typescale.xs.fontFamily}',
    );
  });

  it('should join multiple aliases', () => {
    expect(
      aliasJoin(
        '{primitive.typescale.xs}',
        '{font.size.400}',
        '{font.weight.300}',
      ),
    ).toEqual('{primitive.typescale.xs.font.size.400.font.weight.300}');
  });

  it('should join multiple parts', () => {
    expect(aliasJoin('fontWeight', 'fontSize', 'fontFamily')).toEqual(
      '{fontWeight.fontSize.fontFamily}',
    );
  });

  it('should return expected aliased values with multiple keys', () => {
    expect(
      aliasJoin('{primitive.typescale.xs}', 'fontFamily', 'fontSize'),
    ).toEqual('{primitive.typescale.xs.fontFamily.fontSize}');
  });

  it('should throw for an invalid alias', () => {
    expect(() =>
      aliasJoin('{primitive.typescale.xs', 'fontFamily'),
    ).toThrowError(`Invalid part '{primitive.typescale.xs'`);
  });
});
