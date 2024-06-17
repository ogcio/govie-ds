import { flattenCompositeAlias } from './flatten-composite-alias.js';

describe.skip('flattenCompositeAlias', () => {
  it('should return expected aliased values', () => {
    expect(
      flattenCompositeAlias({
        alias: '{primitive.typography.xs}',
        aliasedValue: {
          $type: 'typography',
          $value: {
            fontFamily: '{primitive.font.family.primary}',
            fontSize: '{primitive.font.size.300}',
            fontWeight: '{primitive.font.weight.400}',
            lineHeight: '{primitive.font.lineHeight.1000}',
          },
        },
        resolveType: () => 'string',
      }),
    ).toEqual({
      fontFamily: {
        $type: 'string',
        $value: '{primitive.typography.xs.fontFamily}',
      },
      fontSize: {
        $type: 'string',
        $value: '{primitive.typography.xs.fontSize}',
      },
      fontWeight: {
        $type: 'number',
        $value: '{primitive.typography.xs.fontWeight}',
      },
      lineHeight: {
        $type: 'string',
        $value: '{primitive.typography.xs.lineHeight}',
      },
    });
  });
});
