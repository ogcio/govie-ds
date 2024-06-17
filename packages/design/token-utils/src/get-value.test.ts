import { getValue } from './get-value';

describe('getValue', () => {
  it('should return undefined for null object', () => {
    expect(getValue(null, 'a.b.c')).toBeUndefined();
  });

  it('should return undefined for undefined object', () => {
    expect(getValue(undefined, 'a.b.c')).toBeUndefined();
  });

  it('should return expected value', () => {
    expect(
      getValue(
        {
          a: {
            b: {
              c: 1,
            },
          },
        },
        'a.b.c',
      ),
    ).toBe(1);
  });

  it('should return undefined for missing path and no default value', () => {
    expect(
      getValue(
        {
          a: {
            b: {
              c: 1,
            },
          },
        },
        'a.b.d',
      ),
    ).toBeUndefined();
  });

  it('should return default value for missing path', () => {
    expect(
      getValue(
        {
          a: {
            b: {
              c: 1,
            },
          },
        },
        'a.b.d',
        2,
      ),
    ).toBe(2);
  });
});
