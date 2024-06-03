import { getDocumentDetails } from './document-details';

describe('getDocumentDetails', () => {
  it('should throw for missing path', () => {
    expect(() => getDocumentDetails('')).toThrowError(`Invalid path ''.`);
  });

  it('should return all parts in slug for 2 segments', () => {
    expect(getDocumentDetails('1-foo/2-bar')).toEqual({
      id: '1-foo/2-bar',
      order: 2,
      slug: 'foo/bar',
    });
  });

  it('should skip section in slug for 3 segments', () => {
    expect(getDocumentDetails('1-foo/2-bar/3-baz')).toEqual({
      id: '1-foo/2-bar/3-baz',
      order: 3,
      slug: 'foo/baz',
    });
  });

  it('should throw for one part', () => {
    expect(() => getDocumentDetails('1-foo')).toThrowError(
      `Invalid path '1-foo'.`,
    );
  });

  it('should throw for more than 3 parts', () => {
    expect(() => getDocumentDetails('1-foo/2-bar/3-baz/4-qux')).toThrowError(
      `Invalid path '1-foo/2-bar/3-baz/4-qux'.`,
    );
  });

  it('should throw for missing order', () => {
    expect(() => getDocumentDetails('foo/2-bar')).toThrowError(
      `Invalid segment 'foo'.`,
    );
  });
});
