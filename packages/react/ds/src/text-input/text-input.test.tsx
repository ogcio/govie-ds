import { LabelSize } from '../label/label.js';
import { cleanup, render } from '../test-utils.js';
import { TextInput, TextInputProps } from './text-input.js';

describe('govieTextInput', () => {
  afterEach(cleanup);
  const renderTextInput = (props: TextInputProps) =>
    render(<TextInput {...props} />);

  it('should render a text input field', () => {
    const screen = renderTextInput({});
    const inputElement = screen.getByRole('textbox');

    expect(inputElement).toBeTruthy();
    expect(inputElement.tagName).toBe('INPUT');
  });

  it('should render a label if provided', () => {
    const screen = renderTextInput({
      label: {
        text: 'Text Input Label',
        size: LabelSize.Medium,
        htmlFor: 'input-id',
      },
      id: 'input-id', // Ensure the input has the correct ID
    });
    const labelElement = screen.getByText('Text Input Label');

    expect(labelElement).toBeTruthy();
    expect(labelElement.tagName).toBe('LABEL');
    expect(labelElement.getAttribute('for')).toBe('input-id');
  });

  it('should render hint text if provided', () => {
    const screen = renderTextInput({
      hint: {
        text: 'This is a hint',
      },
    });
    const hintElement = screen.getByText('This is a hint');

    expect(hintElement).toBeTruthy();
    expect(hintElement.tagName).toBe('DIV'); // Assuming hint is rendered as a <div> tag
  });

  it('should render error text when hasError is true', () => {
    const screen = renderTextInput({
      error: {
        text: 'This is an error message',
      },
    });
    const errorElement = screen.getByText('This is an error message');

    expect(errorElement).toBeTruthy();
    expect(errorElement.classList.contains('gi-error-text')).toBe(true);
  });

  it('should apply error styles to the input when hasError is true', () => {
    const screen = renderTextInput({
      error: {
        text: 'Error message',
      },
    });
    const inputElement = screen.getByRole('textbox');

    expect(inputElement.classList.contains('gi-border-red-600')).toBe(true);
  });

  it('should render a prefix if provided', () => {
    const screen = renderTextInput({
      prefix: '$',
    });
    const prefixElement = screen.getByText('$');

    expect(prefixElement).toBeTruthy();
    expect(prefixElement.tagName).toBe('DIV');
  });

  it('should render a suffix if provided', () => {
    const screen = renderTextInput({
      suffix: 'kg',
    });
    const suffixElement = screen.getByText('kg');

    expect(suffixElement).toBeTruthy();
    expect(suffixElement.tagName).toBe('DIV');
  });

  it('should associate the label with the input field using "for" attribute', () => {
    const screen = renderTextInput({
      label: {
        text: 'Label for input',
        size: LabelSize.Medium,
        htmlFor: 'input-id',
      },
      id: 'input-id', // Ensure the input has the correct ID
    });
    const inputElement = screen.getByRole('textbox');
    const labelElement = screen.getByText('Label for input');

    expect(labelElement.getAttribute('for')).toBe(
      inputElement.getAttribute('id'),
    );
  });

  it('should safely render HTML content in label', () => {
    const screen = renderTextInput({
      label: {
        text: 'Bold Label',
      },
    });

    const labelElement = screen.getByText('Bold Label');
    expect(labelElement).toBeTruthy();
    expect(labelElement.innerHTML).toContain('Bold Label');
  });

  it('should render date input', () => {
    const screen = renderTextInput({
      type: 'date',
    });
    const inputElement = screen.getByTestId('textbox');

    expect(inputElement).toBeTruthy();
    expect(inputElement.getAttribute('type')).toBe('date');
  });

  it('should pass axe accessibility tests', async () => {
    const screen = renderTextInput({
      label: {
        text: 'Accessible label',
        htmlFor: 'input-id',
      },
      id: 'input-id', // Ensure the input has the correct ID for accessibility tests
    });

    await screen.axe();
  });
});
