import { render } from '../common/render';
import html from './paragraph.html?raw';
import { AsEnum, ParagraphProps, SizeEnum } from './paragraph.schema';

describe('govieParagraph', () => {
  const renderParagraph = render<ParagraphProps>({
    componentName: 'paragraph',
    macroName: 'govieParagraph',
    html,
  });

  it('should render a paragraph with the correct content when props.as is "p"', () => {
    const screen = renderParagraph({
      as: AsEnum.Paragraph,
      content: 'This is a paragraph',
      size: SizeEnum.Medium,
    });
    const pElement = screen.getByText('This is a paragraph');
    expect(pElement).toBeTruthy();
    expect(pElement.tagName).toBe('P');
  });

  it('should render a span with the correct content when props.as is "span"', () => {
    const screen = renderParagraph({
      as: AsEnum.Span,
      content: 'This is a span',
      size: SizeEnum.Large,
    });
    const sElement = screen.getByText('This is a span');
    expect(sElement).toBeTruthy();
    expect(sElement.tagName).toBe('SPAN');
  });

  it('should have correct text size classes for "lg"', () => {
    const screen = renderParagraph({
      as: AsEnum.Paragraph,
      content: 'Large text',
      size: SizeEnum.Large,
    });
    const pElement = screen.getByText('Large text');

    expect(pElement.classList.contains('gi-text-lg')).toBe(true);
  });

  it('should have correct text size classes for "md"', () => {
    const screen = renderParagraph({
      as: AsEnum.Span,
      content: 'Medium text',
      size: SizeEnum.Medium,
    });
    const spanElement = screen.getByText('Medium text');

    expect(spanElement.classList.contains('xs:gi-text-md')).toBe(true);
    expect(spanElement.classList.contains('md:gi-text-md')).toBe(true);
    expect(spanElement.classList.contains('xl:gi-text-lg')).toBe(true);
  });

  it('should have correct text size classes for "sm"', () => {
    const screen = renderParagraph({
      as: AsEnum.Paragraph,
      content: 'Small text',
      size: SizeEnum.Small,
    });
    const pElement = screen.getByText('Small text');

    expect(pElement.classList.contains('xs:gi-text-sm')).toBe(true);
    expect(pElement.classList.contains('md:gi-text-sm')).toBe(true);
    expect(pElement.classList.contains('xl:gi-text-md')).toBe(true);
  });

  it('should safely render HTML content', () => {
    const screen = renderParagraph({
      as: AsEnum.Paragraph,
      content: '<a href="#">Anchor tag</a>',
      size: SizeEnum.Small,
    });

    const pElement = screen.getByText('Anchor tag');
    expect(pElement).toBeTruthy();
    expect(pElement.innerHTML).toContain('Anchor tag');
  });

  it('should pass axe accessibility tests', async () => {
    const screen = renderParagraph({
      as: AsEnum.Paragraph,
      content: 'Accessible paragraph',
      size: SizeEnum.Medium,
    });

    await screen.axe();
  });
});
