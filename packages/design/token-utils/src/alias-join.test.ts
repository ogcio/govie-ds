import { aliasJoin } from './alias-join.js';

describe('aliasJoin', () => {
  it('should join alias with part', () => {
    expect(aliasJoin('{primitive.typeScale.xs}', 'fontFamily')).toEqual(
      '{primitive.typeScale.xs.fontFamily}',
    );
  });

  it('should join multiple aliases', () => {
    expect(
      aliasJoin(
        '{primitive.typeScale.xs}',
        '{font.size.400}',
        '{font.weight.300}',
      ),
    ).toEqual('{primitive.typeScale.xs.font.size.400.font.weight.300}');
  });

  it('should join multiple parts', () => {
    expect(aliasJoin('fontWeight', 'fontSize', 'fontFamily')).toEqual(
      '{fontWeight.fontSize.fontFamily}',
    );
  });

  it('should return expected aliased values with multiple keys', () => {
    expect(
      aliasJoin('{primitive.typeScale.xs}', 'fontFamily', 'fontSize'),
    ).toEqual('{primitive.typeScale.xs.fontFamily.fontSize}');
  });

  it('should throw for an invalid alias', () => {
    expect(() =>
      aliasJoin('{primitive.typeScale.xs', 'fontFamily'),
    ).toThrowError(`Invalid part '{primitive.typeScale.xs'`);
  });
});
