import { render } from '../common/render';
import html from './paragraph.html?raw';
import {
  AlignEnum,
  AsEnum,
  ParagraphProps,
  SizeEnum,
} from './paragraph.schema';

describe('govieParagraph', () => {
  const renderParagraph = render<ParagraphProps>({
    componentName: 'paragraph',
    macroName: 'govieParagraph',
    html,
  });

  it('should render a paragraph with the correct content when props.as is "p"', () => {
    const screen = renderParagraph({
      as: AsEnum.PARAGRAPH,
      content: 'This is a paragraph',
      size: SizeEnum.MEDIUM,
    });
    const pElement = screen.getByText('This is a paragraph');
    expect(pElement).toBeTruthy();
    expect(pElement.tagName).toBe('P');
  });

  it('should render a span with the correct content when props.as is "span"', () => {
    const screen = renderParagraph({
      as: AsEnum.SPAN,
      content: 'This is a span',
      size: SizeEnum.LARGE,
    });
    const sElement = screen.getByText('This is a span');
    expect(sElement).toBeTruthy();
    expect(sElement.tagName).toBe('SPAN');
  });

  it('should have correct text size classes for "lg"', () => {
    const screen = renderParagraph({
      as: AsEnum.PARAGRAPH,
      content: 'Large text',
      size: SizeEnum.LARGE,
    });
    const pElement = screen.getByText('Large text');

    expect(pElement.classList.contains('gi-paragraph-lg')).toBe(true);
  });

  it('should have correct text size classes for "md"', () => {
    const screen = renderParagraph({
      as: AsEnum.SPAN,
      content: 'Medium text',
      size: SizeEnum.MEDIUM,
    });
    const spanElement = screen.getByText('Medium text');

    expect(spanElement.classList.contains('gi-paragraph-md')).toBe(true);
  });

  it('should have correct text size classes for "sm"', () => {
    const screen = renderParagraph({
      as: AsEnum.PARAGRAPH,
      content: 'Small text',
      size: SizeEnum.SMALL,
    });
    const pElement = screen.getByText('Small text');

    expect(pElement.classList.contains('gi-paragraph-sm')).toBe(true);
  });

  it('should have aligned end', () => {
    const screen = renderParagraph({
      as: AsEnum.PARAGRAPH,
      content: 'Small text',
      align: AlignEnum.END,
    });
    const pElement = screen.getByText('Small text');
    expect(pElement.classList.contains('gi-text-end')).toBe(true);
  });

  it('should safely render HTML content', () => {
    const screen = renderParagraph({
      as: AsEnum.PARAGRAPH,
      content: '<a href="#">Anchor tag</a>',
      size: SizeEnum.SMALL,
    });

    const pElement = screen.getByText('Anchor tag');
    expect(pElement).toBeTruthy();
    expect(pElement.innerHTML).toContain('Anchor tag');
  });

  it('should pass axe accessibility tests', async () => {
    const screen = renderParagraph({
      as: AsEnum.PARAGRAPH,
      content: 'Accessible paragraph',
      size: SizeEnum.MEDIUM,
    });

    await screen.axe();
  });
});
