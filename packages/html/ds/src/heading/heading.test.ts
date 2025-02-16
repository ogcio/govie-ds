import { render } from '../common/render';
import { testVariantsAxe } from '../helpers/test-helpers';
import html from './heading.html?raw';
import type { HeadingProps } from './heading.schema';
import { Size, Tag } from './heading.schema';

describe('heading', () => {
  const renderHeading = render<HeadingProps>({
    componentName: 'heading',
    macroName: 'govieHeading',
    html,
  });

  // "size" variant
  testVariantsAxe(
    [
      Size.Medium,
      Size.ExtraLarge,
      Size.ExtraSmall,
      Size.Large,
      Size.Small,
      Size.Smallest,
    ],
    (variant) =>
      renderHeading({ as: Tag.H1, text: 'Axe tests', size: variant }),
  );

  // "as" variant
  testVariantsAxe([Tag.H1, Tag.H2, Tag.H3, Tag.H4, Tag.H5, Tag.H6], (variant) =>
    renderHeading({ text: 'Axe tests', as: variant }),
  );

  it('should render heading title', () => {
    const screen = renderHeading({
      text: 'Heading Text',
      size: Size.Medium,
      as: Tag.H1,
    });
    expect(screen.getByText('Heading Text')).toBeTruthy();
  });

  it('should render small heading', () => {
    const screen = renderHeading({
      text: 'Heading Text',
      size: Size.Small,
      as: Tag.H1,
    });

    const headingElement = screen.getByRole('heading');
    const classNames = ['gi-heading-sm'];

    for (const className of classNames) {
      expect(headingElement.classList.contains(className)).toBe(true);
    }
  });

  it('should render medium heading', () => {
    const screen = renderHeading({
      text: 'Heading Text',
      size: Size.Medium,
      as: Tag.H1,
    });

    const headingElement = screen.getByRole('heading');
    const classNames = ['gi-heading-md'];

    for (const className of classNames) {
      expect(headingElement.classList.contains(className)).toBe(true);
    }
  });

  it('should render large heading', () => {
    const screen = renderHeading({
      text: 'Heading Text',
      size: Size.Large,
      as: Tag.H1,
    });

    const headingElement = screen.getByRole('heading');
    const classNames = ['gi-heading-lg'];

    for (const className of classNames) {
      expect(headingElement.classList.contains(className)).toBe(true);
    }
  });

  it('should render extra large heading', () => {
    const screen = renderHeading({
      text: 'Heading Text',
      size: Size.ExtraLarge,
      as: Tag.H1,
    });

    const headingElement = screen.getByRole('heading');
    const classNames = ['gi-heading-xl'];

    for (const className of classNames) {
      expect(headingElement.classList.contains(className)).toBe(true);
    }
  });

  it('should contain H1 tag', () => {
    const screen = renderHeading({
      text: 'Heading Text',
      size: Size.Medium,
      as: Tag.H1,
    });

    expect(screen.getByRole('heading').tagName).toBe('H1');
  });

  it('should contain H2 tag', () => {
    const screen = renderHeading({
      text: 'Heading Text',
      size: Size.Medium,
      as: Tag.H2,
    });

    expect(screen.getByRole('heading').tagName).toBe('H2');
  });

  it('should contain H3 tag', () => {
    const screen = renderHeading({
      text: 'Heading Text',
      size: Size.Medium,
      as: Tag.H3,
    });

    expect(screen.getByRole('heading').tagName).toBe('H3');
  });

  it('should contain H4 tag', () => {
    const screen = renderHeading({
      text: 'Heading Text',
      size: Size.Medium,
      as: Tag.H4,
    });

    expect(screen.getByRole('heading').tagName).toBe('H4');
  });

  it('should contain H5 tag', () => {
    const screen = renderHeading({
      text: 'Heading Text',
      size: Size.Medium,
      as: Tag.H5,
    });

    expect(screen.getByRole('heading').tagName).toBe('H5');
  });

  it('should contain H6 tag', () => {
    const screen = renderHeading({
      text: 'Heading Text',
      size: Size.Medium,
      as: Tag.H6,
    });

    expect(screen.getByRole('heading').tagName).toBe('H6');
  });

  it('should contain caption', () => {
    const screen = renderHeading({
      text: 'Heading Text',
      size: Size.Medium,
      as: Tag.H1,
      caption: 'Caption text',
    });

    expect(screen.getByTestId('govie-heading-caption')).toBeTruthy();
  });

  it('should pass axe tests', async () => {
    const screen = renderHeading({
      text: 'Heading Text',
      size: Size.Medium,
      as: Tag.H1,
    });

    await screen.axe();
  });
});
