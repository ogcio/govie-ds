import { Fragment } from 'react';
import { getTextContent } from './utilities';
import { Box } from './Box';
import Container from './atoms/Container';

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
        <p>text 1</p>
        <p>text 2</p>
      </div>,
    );
    expect(textContent).toBe('text 1 text 2');
  });
  it('can read from elements and text as siblings', () => {
    const textContent = getTextContent(
      <div>
        <div>text 1</div>
        text 2
        <br />
        text 3
      </div>,
    );
    expect(textContent).toBe('text 1 text 2 text 3');
  });
  it('Can deeply read from custom components', () => {
    const textContent = getTextContent(
      <Container>
        <Box>
          <Box>text 1</Box>
          <Box>text 2</Box>
          <Box>
            <Box>text 3</Box>
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
      expect(getTextContent(<div>before{42}after</div>)).toBe('before 42 after');
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
            <span>one</span>
            <span>two</span>
          </Fragment>,
        ),
      ).toBe('one two');
    });
  });
});
