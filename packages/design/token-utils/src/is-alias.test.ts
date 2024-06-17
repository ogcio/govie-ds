import { isAlias } from './is-alias';

describe('isAlias', () => {
  it('should return false for empty string', () => {
    expect(isAlias('')).toBe(false);
  });

  it('should return false for no alias', () => {
    expect(isAlias('foo')).toBe(false);
  });

  it('should return true for alias', () => {
    expect(isAlias('{foo}')).toBe(true);
  });

  it('should return true for nested alias', () => {
    expect(isAlias({ foo: '{bar}' })).toBe(true);
  });

  it('should return true for multiple nested alias', () => {
    expect(isAlias({ foo: '{bar}', bar: '{baz}' })).toBe(true);
  });

  it('should return false for no alias in object', () => {
    expect(isAlias({ foo: 'bar' })).toBe(false);
  });

  it('should return true for alias in array', () => {
    expect(isAlias(['{foo}'])).toBe(true);
  });

  it('should return true for alias in nested array', () => {
    expect(isAlias([{ foo: '{bar}' }])).toBe(true);
  });
});
