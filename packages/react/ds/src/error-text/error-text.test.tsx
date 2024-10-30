import { render } from '../test-utils.js';
import { ErrorSize, ErrorTextProps, ErrorText } from './error-text.js';

describe('govieErrorText', () => {
  const renderErrorText = (props: ErrorTextProps) =>
    render(<ErrorText {...props} />);

  it('should render error text with the correct content', () => {
    const screen = renderErrorText({
      text: 'This is an error message',
      size: ErrorSize.md,
    });
    const errorElement = screen.getByText('This is an error message');
    expect(errorElement).toBeTruthy();
    expect(errorElement.tagName).toBe('DIV');
  });

  it('should render error text with "sm" size', () => {
    const screen = renderErrorText({
      text: 'Small error message',
      size: ErrorSize.sm,
    });
    const errorElement = screen.getByText('Small error message');
    expect(errorElement.classList.contains('gi-text-sm')).toBe(true);
  });

  it('should render error text with "lg" size', () => {
    const screen = renderErrorText({
      text: 'Large error message',
      size: ErrorSize.lg,
    });
    const errorElement = screen.getByText('Large error message');
    expect(errorElement.classList.contains('gi-text-lg')).toBe(true);
  });

  it('should pass axe accessibility tests', async () => {
    const screen = renderErrorText({
      text: 'Accessible error message',
      size: ErrorSize.md,
    });

    await screen.axe();
  });
});
