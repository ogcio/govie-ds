import { render } from '../common/render';
import html from './heading.html?raw';
import { HeadingProps } from './heading.schema';
import { SIZE, TAG } from './heading.schema';

describe('heading', () => {
  const renderHeading = render<HeadingProps>({
    name: 'govieHeading',
    html,
  });

  it('should render heading title', () => {
    const screen = renderHeading({
      text: 'Heading Text',
      size: SIZE.MEDIUM,
      tag: TAG.H1,
    });
    expect(screen.getByText('Heading Text')).toBeTruthy();
  });

  it('should render small heading', () => {
    const screen = renderHeading({
      text: 'Heading Text',
      size: SIZE.SMALL,
      tag: TAG.H1,
    });

    expect(screen.getByRole('heading')).toHaveClass('gi-text-sm');
  });

  it('should render medium heading', () => {
    const screen = renderHeading({
      text: 'Heading Text',
      size: SIZE.MEDIUM,
      tag: TAG.H1,
    });

    expect(screen.getByRole('heading')).toHaveClass('gi-text-md');
  });

  it('should render large heading', () => {
    const screen = renderHeading({
      text: 'Heading Text',
      size: SIZE.LARGE,
      tag: TAG.H1,
    });

    expect(screen.getByRole('heading')).toHaveClass('gi-text-lg');
  });

  it('should render extra large heading', () => {
    const screen = renderHeading({
      text: 'Heading Text',
      size: SIZE.EXTRA_LARGE,
      tag: TAG.H1,
    });

    expect(screen.getByRole('heading')).toHaveClass('gi-text-xl');
  });

  it('should contain H1 tag', () => {
    const screen = renderHeading({
      text: 'Heading Text',
      size: SIZE.MEDIUM,
      tag: TAG.H1,
    });

    expect(screen.getByRole('heading').tagName).toBe('H1');
  });

  it('should contain H2 tag', () => {
    const screen = renderHeading({
      text: 'Heading Text',
      size: SIZE.MEDIUM,
      tag: TAG.H2,
    });

    expect(screen.getByRole('heading').tagName).toBe('H2');
  });

  it('should contain H3 tag', () => {
    const screen = renderHeading({
      text: 'Heading Text',
      size: SIZE.MEDIUM,
      tag: TAG.H3,
    });

    expect(screen.getByRole('heading').tagName).toBe('H3');
  });

  it('should contain H4 tag', () => {
    const screen = renderHeading({
      text: 'Heading Text',
      size: SIZE.MEDIUM,
      tag: TAG.H4,
    });

    expect(screen.getByRole('heading').tagName).toBe('H4');
  });

  it('should contain H5 tag', () => {
    const screen = renderHeading({
      text: 'Heading Text',
      size: SIZE.MEDIUM,
      tag: TAG.H5,
    });

    expect(screen.getByRole('heading').tagName).toBe('H5');
  });

  it('should contain H6 tag', () => {
    const screen = renderHeading({
      text: 'Heading Text',
      size: SIZE.MEDIUM,
      tag: TAG.H6,
    });

    expect(screen.getByRole('heading').tagName).toBe('H6');
  });

  it('should contain caption', () => {
    const screen = renderHeading({
      text: 'Heading Text',
      size: SIZE.MEDIUM,
      tag: TAG.H1,
      caption: 'Caption text',
    });

    expect(screen.getByTestId('govie-heading-caption')).toBeTruthy();
  });

  it('should pass axe tests', async () => {
    const screen = renderHeading({
      text: 'Heading Text',
      size: SIZE.MEDIUM,
      tag: TAG.H1,
      caption: 'Caption text',
    });

    await screen.axe();
  });
});
