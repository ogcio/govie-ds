import { render } from '../common/render';
import html from './hint-text.html?raw';
import { HintTextProps, HintSize } from './hint-text.schema';

describe('govieHintText', () => {
  const renderHintText = render<HintTextProps>({
    componentName: 'hint-text',
    macroName: 'govieHintText',
    html,
  });

  it('should render hint text with the correct content for size "md"', () => {
    const screen = renderHintText({
      size: HintSize.md,
      content: 'This is medium hint text',
    });
    const hintElement = screen.getByText('This is medium hint text');
    expect(hintElement).toBeTruthy();
    expect(hintElement.tagName).toBe('DIV');
  });

  it('should render small hint text with the correct class', () => {
    const screen = renderHintText({
      size: HintSize.sm,
      content: 'This is small hint text',
    });
    const hintElement = screen.getByText('This is small hint text');
    expect(hintElement).toBeTruthy();
    expect(hintElement.classList.contains('gi-text-sm')).toBe(true);
  });

  it('should render large hint text with the correct class', () => {
    const screen = renderHintText({
      size: HintSize.lg,
      content: 'This is large hint text',
    });
    const hintElement = screen.getByText('This is large hint text');
    expect(hintElement).toBeTruthy();
    expect(hintElement.classList.contains('gi-text-lg')).toBe(true);
  });

  it('should safely render HTML content within hint text', () => {
    const screen = renderHintText({
      size: HintSize.md,
      content: '<strong>Bold text</strong> as hint',
    });

    const hintElement = screen.getByText('Bold text');
    expect(hintElement).toBeTruthy();
    expect(hintElement.innerHTML).toContain('Bold text');
  });

  it('should pass axe accessibility tests', async () => {
    const screen = renderHintText({
      size: HintSize.md,
      content: 'Accessible hint text',
    });

    await screen.axe();
  });
});
