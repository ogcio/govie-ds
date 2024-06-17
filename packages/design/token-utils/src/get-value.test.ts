import { getValue } from './get-value';

describe('getValue', () => {
  it('should return undefined for null object', () => {
    expect(
      getValue({
        value: null,
        path: 'a.b.c',
      }),
    ).toBeUndefined();
  });

  it('should return undefined for undefined object', () => {
    expect(
      getValue({
        value: undefined,
        path: 'a.b.c',
      }),
    ).toBeUndefined();
  });

  it('should return expected value', () => {
    expect(
      getValue({
        value: {
          a: {
            b: {
              c: 1,
            },
          },
        },
        path: 'a.b.c',
      }),
    ).toBe(1);
  });

  it('should return undefined for missing path and no default value', () => {
    expect(
      getValue({
        value: {
          a: {
            b: {
              c: 1,
            },
          },
        },
        path: 'a.b.d',
      }),
    ).toBeUndefined();
  });

  it('should return default value for missing path', () => {
    expect(
      getValue({
        value: {
          a: {
            b: {
              c: 1,
            },
          },
        },
        path: 'a.b.d',
        defaultValue: 2,
      }),
    ).toBe(2);
  });
});
