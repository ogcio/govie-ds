import { getDocumentHierarchy } from './document-hierarchy';

describe('getDocumentHierarchy', () => {
  it('should return undefined for no paths', () => {
    expect(getDocumentHierarchy([])).toBeUndefined();
  });

  it('should return hierarchy for a single path', () => {
    expect(getDocumentHierarchy(['1-foo/2-bar'])?.children[0]).toEqual({
      id: '1-foo',
      order: 1,
      slug: 'foo',
      children: [
        {
          id: '1-foo/2-bar',
          order: 2,
          slug: 'foo/bar',
          children: [],
        },
      ],
    });
  });

  it('should return hierarchy for multiple paths', () => {
    expect(
      getDocumentHierarchy(['1-foo/2-bar', '1-foo/2-baz'])?.children[0],
    ).toEqual({
      id: '1-foo',
      order: 1,
      slug: 'foo',
      children: [
        {
          id: '1-foo/2-bar',
          order: 2,
          slug: 'foo/bar',
          children: [],
        },
        {
          id: '1-foo/2-baz',
          order: 2,
          slug: 'foo/baz',
          children: [],
        },
      ],
    });
  });

  it('should return hierarchy for nested paths', () => {
    expect(getDocumentHierarchy(['1-foo/2-bar/3-baz'])?.children[0]).toEqual({
      id: '1-foo',
      order: 1,
      slug: 'foo',
      children: [
        {
          id: '1-foo/2-bar',
          order: 2,
          slug: 'foo/bar',
          children: [
            {
              id: '1-foo/2-bar/3-baz',
              order: 3,
              slug: 'foo/bar/baz',
              children: [],
            },
          ],
        },
      ],
    });
  });

  it('should return hierarchy for multiple nested paths', () => {
    expect(
      getDocumentHierarchy(['1-foo/2-bar/3-baz', '1-foo/2-bar/3-qux'])
        ?.children[0],
    ).toEqual({
      id: '1-foo',
      order: 1,
      slug: 'foo',
      children: [
        {
          id: '1-foo/2-bar',
          order: 2,
          slug: 'foo/bar',
          children: [
            {
              id: '1-foo/2-bar/3-baz',
              order: 3,
              slug: 'foo/bar/baz',
              children: [],
            },
            {
              id: '1-foo/2-bar/3-qux',
              order: 3,
              slug: 'foo/bar/qux',
              children: [],
            },
          ],
        },
      ],
    });
  });

  it('should return hierarchy for multiple nested paths with different parents', () => {
    expect(
      getDocumentHierarchy([
        '1-get-started/index',
        '1-get-started/1-designers',
        '1-get-started/2-developers',
        '2-foundations/index',
        '3-components/index',
        '4-patterns/index',
        '5-resources/index',
        '2-foundations/2-content/1-tone',
        '2-foundations/1-styles/1-design-tokens',
        '2-foundations/1-styles/2-colors',
        '2-foundations/1-styles/3-typography',
      ]),
    ).toEqual({
      id: '',
      order: 0,
      slug: '',
      children: [
        {
          id: '1-get-started',
          order: 1,
          slug: 'get-started',
          children: [
            {
              id: '1-get-started/index',
              order: 0,
              slug: 'get-started',
              children: [],
            },
            {
              id: '1-get-started/1-designers',
              order: 1,
              slug: 'get-started/designers',
              children: [],
            },
            {
              id: '1-get-started/2-developers',
              order: 2,
              slug: 'get-started/developers',
              children: [],
            },
          ],
        },
        {
          id: '2-foundations',
          order: 2,
          slug: 'foundations',
          children: [
            {
              id: '2-foundations/index',
              order: 0,
              slug: 'foundations',
              children: [],
            },
            {
              id: '2-foundations/1-styles',
              order: 1,
              slug: 'foundations/styles',
              children: [
                {
                  id: '2-foundations/1-styles/1-design-tokens',
                  order: 1,
                  slug: 'foundations/styles/design-tokens',
                  children: [],
                },
                {
                  id: '2-foundations/1-styles/2-colors',
                  order: 2,
                  slug: 'foundations/styles/colors',
                  children: [],
                },
                {
                  id: '2-foundations/1-styles/3-typography',
                  order: 3,
                  slug: 'foundations/styles/typography',
                  children: [],
                },
              ],
            },
            {
              id: '2-foundations/2-content',
              order: 2,
              slug: 'foundations/content',
              children: [
                {
                  id: '2-foundations/2-content/1-tone',
                  order: 1,
                  slug: 'foundations/content/tone',
                  children: [],
                },
              ],
            },
          ],
        },
        {
          id: '3-components',
          order: 3,
          slug: 'components',
          children: [
            {
              id: '3-components/index',
              order: 0,
              slug: 'components',
              children: [],
            },
          ],
        },
        {
          id: '4-patterns',
          order: 4,
          slug: 'patterns',
          children: [
            {
              id: '4-patterns/index',
              order: 0,
              slug: 'patterns',
              children: [],
            },
          ],
        },
        {
          id: '5-resources',
          order: 5,
          slug: 'resources',
          children: [
            {
              id: '5-resources/index',
              order: 0,
              slug: 'resources',
              children: [],
            },
          ],
        },
      ],
    });
  });
});
