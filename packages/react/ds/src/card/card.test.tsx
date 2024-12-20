import { render, cleanup } from '../test-utils.js';
import { Card, CardProps } from './card.js';

describe('govieCard', () => {
  afterEach(cleanup);
  const renderCard = (props: CardProps) => render(<Card {...props} />);

  it('should render a card with title and content', () => {
    const screen = renderCard({
      type: 'vertical',
      title: 'Card Title',
      content: 'This is the card content.',
    });

    const titleElement = screen.getByText('Card Title');
    const contentElement = screen.getByText('This is the card content.');

    expect(titleElement).toBeTruthy();
    expect(contentElement).toBeTruthy();
    expect(titleElement.tagName).toBe('DIV');
    expect(contentElement.tagName).toBe('P');
  });

  it('should render a horizontal card layout', () => {
    const screen = renderCard({
      type: 'horizontal',
      title: 'Horizontal Card',
      content: 'This is the content of a horizontal card.',
    });

    const cardElement = screen.container.querySelector('.gi-card-horizontal')!;
    expect(cardElement).toBeTruthy();
  });

  it('should render a vertical card layout', () => {
    const screen = renderCard({
      type: 'vertical',
      title: 'Vertical Card',
      content: 'This is the content of a vertical card.',
    });

    const cardElement = screen.container.querySelector('.gi-card-vertical')!;
    expect(cardElement).toBeTruthy();
  });

  it('should render an image when "img" prop is provided', () => {
    const { container } = renderCard({
      type: 'vertical',
      title: 'Card with Image',
      img: 'SOME_PATH',
      href: '#',
    });

    const imageElement = container.querySelector('img')!;
    expect(imageElement).toBeTruthy();
    expect(imageElement.getAttribute('src')).toBe('SOME_PATH');
  });

  it('should render an icon when "icon" prop is provided', () => {
    const screen = renderCard({
      type: 'horizontal',
      title: 'Card with Icon',
      icon: {
        icon: 'download',
        size: 'xl',
        className: 'gi-text-gray-500',
      },
    });

    const iconElement = screen.getByTestId('govie-icon');
    expect(iconElement).toBeTruthy();
    expect(iconElement.textContent?.trim()).toBe('download');
    expect(iconElement.classList.contains('gi-text-gray-500')).toBe(true);
  });

  it('should render actions if actions prop is provided', () => {
    const screen = renderCard({
      type: 'vertical',
      title: 'Card with Actions',
      content: 'This is the card content with actions.',
      action: { type: 'link', href: '#', children: 'Action 1' },
    });

    const actionLink1 = screen.getByText('Action 1');

    expect(actionLink1).toBeTruthy();
    expect(actionLink1.getAttribute('href')).toBe('#');
  });

  it('should render a link if "href" prop is provided for title', () => {
    const screen = renderCard({
      type: 'vertical',
      title: 'Linked Title',
      href: '#',
      content: 'Content for a card with a link.',
    });

    const linkElement = screen.getByText('Linked Title');
    expect(linkElement.tagName).toBe('A');
    expect(linkElement.getAttribute('href')).toBe('#');
  });

  it('should render a subtitle if "subTitle" prop is provided', () => {
    const screen = renderCard({
      type: 'vertical',
      title: 'Card with Subtitle',
      subTitle: 'This is the subtitle',
      content: 'Content for a card with a subtitle.',
    });

    const subTitleElement = screen.getByText('This is the subtitle');
    expect(subTitleElement.tagName).toBe('DIV');
    expect(subTitleElement.classList.contains('gi-card-subheading')).toBe(true);
  });

  it('should render a tag if "tag" prop is provided', () => {
    const screen = renderCard({
      type: 'vertical',
      title: 'Card with Tag',
      content: 'Content for a card with a tag.',
      tag: {
        text: 'New',
        type: 'success',
      },
    });

    const tagElement = screen.getByText('New');
    expect(tagElement).toBeTruthy();
  });

  it('should pass axe accessibility tests', async () => {
    const screen = renderCard({
      type: 'vertical',
      title: 'Accessible Card',
      content: 'Accessible content for the card.',
    });

    await screen.axe();
  });
});
