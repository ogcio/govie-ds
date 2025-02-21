import { render } from '../test-utils.js';
import { ErrorSize, ErrorTextProps, ErrorText } from './error-text.js';

describe('govieErrorText', () => {
  const renderErrorText = (props: ErrorTextProps) =>
    render(<ErrorText {...props} />);

  it('should render error text with the correct content', () => {
    const screen = renderErrorText({
      text: 'This is an error message',
      size: ErrorSize.Medium,
    });
    const errorElement = screen.getByText('This is an error message');
    expect(errorElement).toBeTruthy();
    expect(errorElement.tagName).toBe('DIV');
  });

  it('should render error text with "sm" size', () => {
    const screen = renderErrorText({
      text: 'Small error message',
      size: ErrorSize.Small,
    });
    const errorElement = screen.getByText('Small error message');
    expect(errorElement.classList.contains('gi-error-text-sm')).toBe(true);
  });

  it('should render error text with "lg" size', () => {
    const screen = renderErrorText({
      text: 'Large error message',
      size: ErrorSize.Large,
    });
    const errorElement = screen.getByText('Large error message');
    expect(errorElement.classList.contains('gi-error-text-lg')).toBe(true);
  });

  it('should pass axe accessibility tests', async () => {
    const screen = renderErrorText({
      text: 'Accessible error message',
      size: ErrorSize.Medium,
    });

    await screen.axe();
  });
});
