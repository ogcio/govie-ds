import { render, cleanup, testVariantsAxe } from '../test-utils.js';
import {
  type HeadingProps,
  asVariants,
  Heading,
  sizeVariants,
} from './heading.js';

describe('heading', () => {
  afterEach(cleanup);
  const renderHeading = (props: HeadingProps) => render(<Heading {...props} />);

  // "size" variant
  testVariantsAxe(Reflect.ownKeys(sizeVariants), (variant) =>
    renderHeading({ children: 'Axe tests', size: variant }),
  );

  // "as" variant
  testVariantsAxe(Reflect.ownKeys(asVariants), (variant) =>
    renderHeading({ children: 'Axe tests', as: variant }),
  );

  it('should render heading title', () => {
    const screen = renderHeading({
      children: 'Heading Text',
      size: 'md',
      as: 'h1',
    });
    expect(screen.getByText('Heading Text')).toBeTruthy();
  });

  it('should render small heading', () => {
    const screen = renderHeading({
      children: 'Heading Text',
      size: 'sm',
      as: 'h1',
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
      size: 'md',
      as: 'h1',
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
      size: 'lg',
      as: 'h1',
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
      size: 'xl',
      as: 'h1',
    });

    const headingElement = screen.getByRole('heading');
    const classNames = ['gi-heading-xl'];

    for (const className of classNames) {
      expect(headingElement.classList.contains(className)).toBe(true);
    }
  });

  it('should render extra large heading with h6 tag', () => {
    const screen = renderHeading({
      children: 'Heading Text',
      size: 'xl',
      as: 'h6',
    });

    const headingElement = screen.getByRole('heading');
    expect(headingElement.tagName).toBe('H6');

    const classNames = ['gi-heading-xl'];

    for (const className of classNames) {
      expect(headingElement.classList.contains(className)).toBe(true);
    }
  });

  it('should contain H1 tag', () => {
    const screen = renderHeading({
      children: 'Heading Text',
      size: 'md',
      as: 'h1',
    });

    expect(screen.getByRole('heading').tagName).toBe('H1');
  });

  it('should contain H2 tag', () => {
    const screen = renderHeading({
      children: 'Heading Text',
      size: 'md',
      as: 'h2',
    });

    expect(screen.getByRole('heading').tagName).toBe('H2');
  });

  it('should contain H3 tag', () => {
    const screen = renderHeading({
      children: 'Heading Text',
      size: 'md',
      as: 'h3',
    });

    expect(screen.getByRole('heading').tagName).toBe('H3');
  });

  it('should contain H4 tag', () => {
    const screen = renderHeading({
      children: 'Heading Text',
      size: 'md',
      as: 'h4',
    });

    expect(screen.getByRole('heading').tagName).toBe('H4');
  });

  it('should contain H5 tag', () => {
    const screen = renderHeading({
      children: 'Heading Text',
      size: 'md',
      as: 'h5',
    });

    expect(screen.getByRole('heading').tagName).toBe('H5');
  });

  it('should contain H6 tag', () => {
    const screen = renderHeading({
      children: 'Heading Text',
      size: 'md',
      as: 'h6',
    });

    expect(screen.getByRole('heading').tagName).toBe('H6');
  });

  it('should contain caption', () => {
    const screen = renderHeading({
      children: 'Heading Text',
      size: 'md',
      as: 'h1',
      caption: 'Caption text',
    });

    expect(screen.getByTestId('govie-heading-caption')).toBeTruthy();
  });

  it('should pass axe tests', async () => {
    const screen = renderHeading({
      children: 'Heading Text',
      size: 'md',
      as: 'h1',
    });

    await screen.axe();
  });
});
