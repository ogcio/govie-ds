import { render, cleanup } from '../test-utils.js';
import { HintTextProps, HintSize, HintText } from './hint-text.js';

describe('govieHintText', () => {
  afterEach(cleanup);
  const renderHintText = (props: HintTextProps) =>
    render(<HintText {...props} />);

  it('should render hint text with the correct content for size "md"', () => {
    const screen = renderHintText({
      size: HintSize.md,
      text: 'This is medium hint text',
    });
    const hintElement = screen.getByText('This is medium hint text');
    expect(hintElement).toBeTruthy();
    expect(hintElement.tagName).toBe('DIV');
  });

  it('should render small hint text with the correct class', () => {
    const screen = renderHintText({
      size: HintSize.sm,
      text: 'This is small hint text',
    });
    const hintElement = screen.getByText('This is small hint text');
    expect(hintElement).toBeTruthy();
    expect(hintElement.classList.contains('gi-hint-text-sm')).toBe(true);
  });

  it('should render large hint text with the correct class', () => {
    const screen = renderHintText({
      size: HintSize.lg,
      text: 'This is large hint text',
    });
    const hintElement = screen.getByText('This is large hint text');
    expect(hintElement).toBeTruthy();
    expect(hintElement.classList.contains('gi-hint-text-lg')).toBe(true);
  });

  it('should pass axe accessibility tests', async () => {
    const screen = renderHintText({
      size: HintSize.md,
      text: 'Accessible hint text',
    });

    await screen.axe();
  });
});
