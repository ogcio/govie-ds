import { flattenComposite } from './flatten-composite';

describe('flattenComposite', () => {
  it('should return expected types', () => {
    expect(
      flattenComposite({
        value: {
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
        $value: '{primitive.font.family.primary}',
      },
      fontSize: { $type: 'string', $value: '{primitive.font.size.300}' },
      fontWeight: { $type: 'string', $value: '{primitive.font.weight.400}' },
      lineHeight: {
        $type: 'string',
        $value: '{primitive.font.lineHeight.1000}',
      },
    });
  });

  it('should throw if no type is defined', () => {
    expect(() =>
      flattenComposite({
        value: {
          $type: 'typography',
          $value: {
            fontFamily: '{primitive.font.family.primary}',
            fontSize: '{primitive.font.size.300}',
            fontWeight: '{primitive.font.weight.400}',
            lineHeight: '{primitive.font.lineHeight.1000}',
          },
        },
        resolveType: () => undefined,
      }),
    ).toThrowError(`No type defined composite value key 'fontFamily'.`);
  });

  it('should return expected types with custom type resolver', () => {
    expect(
      flattenComposite({
        value: {
          $type: 'typography',
          $value: {
            fontFamily: '{primitive.font.family.primary}',
            fontSize: '{primitive.font.size.300}',
            fontWeight: '{primitive.font.weight.400}',
            lineHeight: '{primitive.font.lineHeight.1000}',
          },
        },
        resolveType: (key) => {
          switch (key) {
            case 'fontFamily':
              return 'string';
            case 'fontSize':
              return 'number';
            case 'fontWeight':
              return 'number';
            case 'lineHeight':
              return 'number';
          }
        },
      }),
    ).toEqual({
      fontFamily: {
        $type: 'string',
        $value: '{primitive.font.family.primary}',
      },
      fontSize: { $type: 'number', $value: '{primitive.font.size.300}' },
      fontWeight: { $type: 'number', $value: '{primitive.font.weight.400}' },
      lineHeight: {
        $type: 'number',
        $value: '{primitive.font.lineHeight.1000}',
      },
    });
  });
});
