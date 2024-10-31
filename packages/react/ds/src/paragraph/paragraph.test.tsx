import { render, cleanup } from '../test-utils.js';
import { Paragraph, ParagraphProps } from './paragraph.js';

describe('govieParagraph', () => {
  afterEach(cleanup);
  const renderParagraph = (props: ParagraphProps) =>
    render(<Paragraph {...props} />);

  it('should render a paragraph with the correct content when props.as is "p"', () => {
    const screen = renderParagraph({
      as: 'p',
      children: 'This is a paragraph',
      size: 'md',
    });
    const pElement = screen.getByText('This is a paragraph');
    expect(pElement).toBeTruthy();
    expect(pElement.tagName).toBe('P');
  });

  it('should render a span with the correct content when props.as is "span"', () => {
    const screen = renderParagraph({
      as: 'span',
      children: 'This is a span',
      size: 'lg',
    });
    const sElement = screen.getByText('This is a span');
    expect(sElement).toBeTruthy();
    expect(sElement.tagName).toBe('SPAN');
  });

  it('should have correct text size classes for "lg"', () => {
    const screen = renderParagraph({
      as: 'p',
      children: 'Large text',
      size: 'lg',
    });
    const pElement = screen.getByText('Large text');

    expect(pElement.classList.contains('gi-paragraph-lg')).toBe(true);
  });

  it('should have correct text size classes for "md"', () => {
    const screen = renderParagraph({
      as: 'span',
      children: 'Medium text',
      size: 'md',
    });
    const spanElement = screen.getByText('Medium text');

    expect(spanElement.classList.contains('gi-span-md')).toBe(true);
  });

  it('should have correct text size classes for "sm"', () => {
    const screen = renderParagraph({
      as: 'p',
      children: 'Small text',
      size: 'sm',
    });
    const pElement = screen.getByText('Small text');

    expect(pElement.classList.contains('gi-paragraph-sm')).toBe(true);
  });

  it('should have aligned end', () => {
    const screen = renderParagraph({
      as: 'p',
      children: 'Small text',
      align: 'end',
    });
    const pElement = screen.getByText('Small text');
    expect(pElement.classList.contains('gi-text-end')).toBe(true);
  });

  it('should safely render HTML content', () => {
    const screen = renderParagraph({
      as: 'p',
      children: <a href="#">Anchor tag</a>,
      size: 'sm',
    });

    const pElement = screen.getByText('Anchor tag');
    expect(pElement).toBeTruthy();
    expect(pElement.innerHTML).toContain('Anchor tag');
  });

  it('should pass axe accessibility tests', async () => {
    const screen = renderParagraph({
      as: 'p',
      children: 'Accessible paragraph',
      size: 'md',
    });

    await screen.axe();
  });
});
