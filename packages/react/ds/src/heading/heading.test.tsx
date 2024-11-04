import { render, cleanup } from '../test-utils.js';
import { type HeadingProps, Heading, HeadingAs, HeadingSize } from './heading.js';

describe('heading', () => {
  afterEach(cleanup);
  const renderHeading = (props: HeadingProps) => render(<Heading {...props} />);

  it('should render heading title', () => {
    const screen = renderHeading({
      children: 'Heading Text',
      size: HeadingSize.md,
      as: HeadingAs.h1,
    });
    expect(screen.getByText('Heading Text')).toBeTruthy();
  });

  it('should render small heading', () => {
    const screen = renderHeading({
      children: 'Heading Text',
      size: HeadingSize.sm,
      as: HeadingAs.h1,
    });

    const headingElement = screen.getByRole('heading');
    const classNames = ['gi-heading-sm'];

    for (const className of classNames) {
      expect(headingElement.classList.contains(className)).toBe(true);
    }
  });

  it('should render medium heading', () => {
    const screen = renderHeading({
      children: 'Heading Text',
      size: HeadingSize.md,
      as: HeadingAs.h1,
    });

    const headingElement = screen.getByRole('heading');
    const classNames = ['gi-heading-md'];

    for (const className of classNames) {
      expect(headingElement.classList.contains(className)).toBe(true);
    }
  });

  it('should render large heading', () => {
    const screen = renderHeading({
      children: 'Heading Text',
      size: HeadingSize.lg,
      as: HeadingAs.h1,
    });

    const headingElement = screen.getByRole('heading');
    const classNames = ['gi-heading-lg'];

    for (const className of classNames) {
      expect(headingElement.classList.contains(className)).toBe(true);
    }
  });

  it('should render extra large heading', () => {
    const screen = renderHeading({
      children: 'Heading Text',
      size: HeadingSize.xl,
      as: HeadingAs.h1,
    });

    const headingElement = screen.getByRole('heading');
    const classNames = ['gi-heading-xl'];

    for (const className of classNames) {
      expect(headingElement.classList.contains(className)).toBe(true);
    }
  });

  it('should contain H1 tag', () => {
    const screen = renderHeading({
      children: 'Heading Text',
      size: HeadingSize.md,
      as: HeadingAs.h1,
    });

    expect(screen.getByRole('heading').tagName).toBe('H1');
  });

  it('should contain H2 tag', () => {
    const screen = renderHeading({
      children: 'Heading Text',
      size: HeadingSize.md,
      as: HeadingAs.h2,
    });

    expect(screen.getByRole('heading').tagName).toBe('H2');
  });

  it('should contain H3 tag', () => {
    const screen = renderHeading({
      children: 'Heading Text',
      size: HeadingSize.md,
      as: HeadingAs.h3,
    });

    expect(screen.getByRole('heading').tagName).toBe('H3');
  });

  it('should contain H4 tag', () => {
    const screen = renderHeading({
      children: 'Heading Text',
      size: HeadingSize.md,
      as: HeadingAs.h4,
    });

    expect(screen.getByRole('heading').tagName).toBe('H4');
  });

  it('should contain H5 tag', () => {
    const screen = renderHeading({
      children: 'Heading Text',
      size: HeadingSize.md,
      as: HeadingAs.h5,
    });

    expect(screen.getByRole('heading').tagName).toBe('H5');
  });

  it('should contain H6 tag', () => {
    const screen = renderHeading({
      children: 'Heading Text',
      size: HeadingSize.md,
      as: HeadingAs.h6,
    });

    expect(screen.getByRole('heading').tagName).toBe('H6');
  });

  it('should contain caption', () => {
    const screen = renderHeading({
      children: 'Heading Text',
      size: HeadingSize.md,
      as: HeadingAs.h1,
      caption: 'Caption text',
    });

    expect(screen.getByTestId('govie-heading-caption')).toBeTruthy();
  });

  it('should pass axe tests', async () => {
    const screen = renderHeading({
      children: 'Heading Text',
      size: HeadingSize.md,
      as: HeadingAs.h1,
    });

    await screen.axe();
  });
});
