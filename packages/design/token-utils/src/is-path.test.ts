import { isPath } from './is-path.js';

describe('isPath', () => {
  it('should return false for alias', () => {
    expect(isPath('{primitive.typeScale.xs}')).toEqual(false);
  });

  it('should return false for invalid alias left brace', () => {
    expect(isPath('{primitive.typeScale.xs')).toEqual(false);
  });

  it('should return false for invalid alias right brace', () => {
    expect(isPath('primitive.typeScale.xs}')).toEqual(false);
  });

  it('should return true for path with no periods', () => {
    expect(isPath('primitive')).toEqual(true);
  });

  it('should return true for camelCase path with no periods', () => {
    expect(isPath('fontFamily')).toEqual(true);
  });

  it('should return true for path with periods', () => {
    expect(isPath('primitive.typeScale.xs')).toEqual(true);
  });

  it('should return false for path with leading period', () => {
    expect(isPath('.primitive.typeScale.xs')).toEqual(false);
  });

  it('should return false for path with trailing period', () => {
    expect(isPath('primitive.typeScale.xs.')).toEqual(false);
  });

  it('should return false for path with consecutive periods', () => {
    expect(isPath('primitive..typeScale.xs')).toEqual(false);
  });
});
