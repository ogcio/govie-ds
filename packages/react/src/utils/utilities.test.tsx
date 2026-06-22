import { Fragment } from 'react';
import { Breakpoint } from '@/hooks/use-breakpoint';
import { generateSvgPlaceholderDataUrl } from './placeholder';
import { getDisplayPages, getTextContent } from './utilities';
import { Box } from '@/Box';
import Container from '@/atoms/Container';

describe('getDisplayPages', () => {
  it('should return all pages for small screens when totalPages is less than or equal to 3', () => {
    expect(getDisplayPages(1, 3, Breakpoint.Small)).toEqual([1, 2, 3]);
    expect(getDisplayPages(2, 3, Breakpoint.Small)).toEqual([1, 2, 3]);
  });

  it('should return [1, -2, totalPages] when on first page for small screens and large totalPages', () => {
    expect(getDisplayPages(1, 10, Breakpoint.Small)).toEqual([1, -2, 10]);
  });

  it('should return [1, currentPage, -2, totalPages] when currentPage is near start for small screens', () => {
    expect(getDisplayPages(2, 10, Breakpoint.Small)).toEqual([1, 2, -2, 10]);
    expect(getDisplayPages(3, 100, Breakpoint.Small)).toEqual([1, -1, 3, -2, 100]);
  });

  it('should return [1, -1, currentPage, -2, totalPages] when currentPage is in the middle for small screens', () => {
    expect(getDisplayPages(5, 10, Breakpoint.Small)).toEqual([1, -1, 5, -2, 10]);
    expect(getDisplayPages(7, 10, Breakpoint.Small)).toEqual([1, -1, 7, -2, 10]);
  });

  it('should return [1, -1, totalPages-1, totalPages] when currentPage is near end for small screens', () => {
    expect(getDisplayPages(9, 10, Breakpoint.Small)).toEqual([1, -1, 9, 10]);
    expect(getDisplayPages(10, 10, Breakpoint.Small)).toEqual([1, -1, 10]);
  });

  it('should return wider range of pages with ellipses for large screens', () => {
    expect(getDisplayPages(5, 10, Breakpoint.Large)).toEqual([1, -1, 3, 4, 5, 6, 7, -2, 10]);
    expect(getDisplayPages(1, 10, Breakpoint.Large)).toEqual([1, 2, 3, -2, 10]);
    expect(getDisplayPages(10, 10, Breakpoint.Large)).toEqual([1, -1, 8, 9, 10]);
  });

  it('should handle edge case of currentPage being the only page', () => {
    expect(getDisplayPages(1, 1, Breakpoint.Small)).toEqual([1]);
    expect(getDisplayPages(1, 1, Breakpoint.Large)).toEqual([1]);
  });

  it('should handle case where currentPage is at extreme start and end for larger screens', () => {
    expect(getDisplayPages(1, 100, Breakpoint.Large)).toEqual([1, 2, 3, -2, 100]);
    expect(getDisplayPages(100, 100, Breakpoint.Large)).toEqual([1, -1, 98, 99, 100]);
  });

  it('should handle large number of pages with currentPage in the middle on large screens', () => {
    expect(getDisplayPages(50, 100, Breakpoint.Large)).toEqual([1, -1, 48, 49, 50, 51, 52, -2, 100]);
  });

  describe('generateSvgPlaceholderDataUrl', () => {
    it('should generate a data url svg using default dimensions', () => {
      const dataUrl = generateSvgPlaceholderDataUrl();

      expect(dataUrl.startsWith('data:image/svg+xml,')).toBe(true);

      const encodedSvg = dataUrl.replace('data:image/svg+xml,', '');
      const svg = decodeURIComponent(encodedSvg);

      expect(svg).toContain('width="300"');
      expect(svg).toContain('height="400"');
      expect(svg).toContain('>300x400<');
      expect(svg).toContain('font-size="18"');
    });

    it('should generate a data url svg using custom dimensions and clamp font size', () => {
      const dataUrl = generateSvgPlaceholderDataUrl(80, 60);

      const encodedSvg = dataUrl.replace('data:image/svg+xml,', '');
      const svg = decodeURIComponent(encodedSvg);

      expect(svg).toContain('width="80"');
      expect(svg).toContain('height="60"');
      expect(svg).toContain('>80x60<');
      expect(svg).toContain('font-size="12"');
    });
  });
});

describe('getTextContent', () => {
  it('Can read text content', () => {
    const textContent = getTextContent(<div>hello</div>);
    expect(textContent).toBe('hello');
  });
  it('Can read raw text', () => {
    const textContent = getTextContent('hello there');
    expect(textContent).toBe('hello there');
  });
  it('Can read from one child', () => {
    const textContent = getTextContent(
      <div>
        <p>Here is some text</p>
      </div>,
    );
    expect(textContent).toBe('Here is some text');
  });
  it('Can read from sibling children', () => {
    const textContent = getTextContent(
      <div>
        <p>text 1 </p>
        <p>text 2</p>
      </div>,
    );
    expect(textContent).toBe('text 1 text 2');
  });
  it('can read from elements and text as siblings', () => {
    const textContent = getTextContent(
      <div>
        <div>text 1 </div>
        text 2 <br />
        text 3
      </div>,
    );
    expect(textContent).toBe('text 1 text 2 text 3');
  });
  it('Can deeply read from custom components', () => {
    const textContent = getTextContent(
      <Container>
        <Box>
          <Box>text 1 </Box>
          <Box>text 2 </Box>
          <Box>
            <Box>text 3 </Box>
            <Box>
              <Box>text 4</Box>
            </Box>
          </Box>
        </Box>
      </Container>,
    );
    expect(textContent).toBe('text 1 text 2 text 3 text 4');
  });

  describe('nullish and empty inputs', () => {
    it.each([null, undefined, false] as const)('returns an empty string for %s', (node) => {
      expect(getTextContent(node)).toBe('');
    });

    it('returns an empty string for an element with no children', () => {
      expect(getTextContent(<div />)).toBe('');
    });

    it('returns an empty string for void-only children', () => {
      expect(
        getTextContent(
          <div>
            <br />
            <img alt="" />
          </div>,
        ),
      ).toBe('');
    });

    it('ignores null and false children (conditional rendering)', () => {
      expect(
        getTextContent(
          <div>
            {null}
            {false}
            visible
          </div>,
        ),
      ).toBe('visible');
    });

    it('returns an empty string when null is the only child', () => {
      expect(getTextContent(<div>{null}</div>)).toBe('');
    });
  });

  describe('non-string primitives', () => {
    it('stringifies numbers in JSX', () => {
      expect(getTextContent(<div>{42}</div>)).toBe('42');
    });

    it('stringifies zero (falsy but rendered by React)', () => {
      expect(getTextContent(<div>{0}</div>)).toBe('0');
    });

    it('stringifies a top-level number', () => {
      expect(getTextContent(42)).toBe('42');
    });

    it('joins mixed text and number siblings', () => {
      expect(getTextContent(<div>before {42} after</div>)).toBe('before 42 after');
    });

    it('ignores boolean true (React renders nothing)', () => {
      expect(getTextContent(<div>{true}</div>)).toBe('');
    });
  });

  describe('fragments', () => {
    it('reads text from fragment siblings', () => {
      expect(
        getTextContent(
          <Fragment>
            <span>one</span> <span>two</span>
          </Fragment>,
        ),
      ).toBe('one two');
    });
  });
});
