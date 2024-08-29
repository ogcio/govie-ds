import { render } from '../common/render';
import html from './heading.html?raw';
import { HeadingProps } from './heading.schema';
import { Size, Tag } from './heading.schema';

describe('heading', () => {
  const renderHeading = render<HeadingProps>({
    name: 'govieHeading',
    html,
  });

  it('should render heading title', () => {
    const screen = renderHeading({
      text: 'Heading Text',
      size: Size.Medium,
      tag: Tag.H1,
    });
    expect(screen.getByText('Heading Text')).toBeTruthy();
  });

  it('should render small heading', () => {
    const screen = renderHeading({
      text: 'Heading Text',
      size: Size.Small,
      tag: Tag.H1,
    });

    expect(screen.getByRole('heading')).toHaveClass('gi-text-sm');
  });

  it('should render medium heading', () => {
    const screen = renderHeading({
      text: 'Heading Text',
      size: Size.Medium,
      tag: Tag.H1,
    });

    expect(screen.getByRole('heading')).toHaveClass('gi-text-md');
  });

  it('should render large heading', () => {
    const screen = renderHeading({
      text: 'Heading Text',
      size: Size.Large,
      tag: Tag.H1,
    });

    expect(screen.getByRole('heading')).toHaveClass('gi-text-lg');
  });

  it('should render extra large heading', () => {
    const screen = renderHeading({
      text: 'Heading Text',
      size: Size.ExtraLarge,
      tag: Tag.H1,
    });

    expect(screen.getByRole('heading')).toHaveClass('gi-text-xl');
  });

  it('should contain H1 tag', () => {
    const screen = renderHeading({
      text: 'Heading Text',
      size: Size.Medium,
      tag: Tag.H1,
    });

    expect(screen.getByRole('heading').tagName).toBe('H1');
  });

  it('should contain H2 tag', () => {
    const screen = renderHeading({
      text: 'Heading Text',
      size: Size.Medium,
      tag: Tag.H2,
    });

    expect(screen.getByRole('heading').tagName).toBe('H2');
  });

  it('should contain H3 tag', () => {
    const screen = renderHeading({
      text: 'Heading Text',
      size: Size.Medium,
      tag: Tag.H3,
    });

    expect(screen.getByRole('heading').tagName).toBe('H3');
  });

  it('should contain H4 tag', () => {
    const screen = renderHeading({
      text: 'Heading Text',
      size: Size.Medium,
      tag: Tag.H4,
    });

    expect(screen.getByRole('heading').tagName).toBe('H4');
  });

  it('should contain H5 tag', () => {
    const screen = renderHeading({
      text: 'Heading Text',
      size: Size.Medium,
      tag: Tag.H5,
    });

    expect(screen.getByRole('heading').tagName).toBe('H5');
  });

  it('should contain H6 tag', () => {
    const screen = renderHeading({
      text: 'Heading Text',
      size: Size.Medium,
      tag: Tag.H6,
    });

    expect(screen.getByRole('heading').tagName).toBe('H6');
  });

  // it('should contain caption', () => {
  //   const screen = renderHeading({
  //     text: 'Heading Text',
  //     size: Size.MEDIUM,
  //     tag: Tag.H1,
  //     caption: 'Caption text',
  //   });

  //   expect(screen.getByTestId('govie-heading-caption')).toBeTruthy();
  // });

  it('should pass axe tests', async () => {
    const screen = renderHeading({
      text: 'Heading Text',
      size: Size.Medium,
      tag: Tag.H1,
    });

    await screen.axe();
  });
});
