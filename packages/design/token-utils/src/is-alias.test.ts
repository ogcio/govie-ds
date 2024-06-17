import { isAlias } from './is-alias.js';

describe('isAlias', () => {
  it('should return false for undefined', () => {
    expect(isAlias(undefined)).toBe(false);
  });

  it('should return false for null', () => {
    expect(isAlias(null)).toBe(false);
  });

  it('should return false for number', () => {
    expect(isAlias(1)).toBe(false);
  });

  it('should return false for boolean', () => {
    expect(isAlias(true)).toBe(false);
  });

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
