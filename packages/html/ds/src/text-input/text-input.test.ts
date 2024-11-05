import { render } from '../common/render';
import html from './text-input.html?raw';
import { InputTypeEnum, TextInputProps } from './text-input.schema';

describe('govieTextInput', () => {
  const renderTextInput = render<TextInputProps>({
    componentName: 'text-input',
    macroName: 'govieTextInput',
    html,
  });

  it('should render a text input field', () => {
    const screen = renderTextInput({});
    const inputElement = screen.getByRole('textbox');

    expect(inputElement).toBeTruthy();
    expect(inputElement.tagName).toBe('INPUT');
  });

  it('should render with the correct width class for fullFluid', () => {
    const screen = renderTextInput({
      fullFluid: true,
    });
    const inputElement = screen.getByRole('textbox');

    expect(inputElement.classList.contains('gi-w-full')).toBe(true);
  });

  it('should render with the correct width class for halfFluid', () => {
    const screen = renderTextInput({
      halfFluid: true,
    });
    const inputElement = screen.getByRole('textbox');

    expect(inputElement.classList.contains('gi-w-1/2')).toBe(true);
  });

  it('should apply custom width when characterWidth is set', () => {
    const screen = renderTextInput({
      characterWidth: 20,
    });
    const inputElement = screen.getByRole('textbox');

    expect(inputElement.getAttribute('style')).toContain('width: 20em;');
  });

  it('should render a label if provided', () => {
    const screen = renderTextInput({
      label: {
        content: 'Text Input Label',
        size: 'md',
        for: 'input-id',
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
        content: 'This is a hint',
      },
    });
    const hintElement = screen.getByText('This is a hint');

    expect(hintElement).toBeTruthy();
    expect(hintElement.tagName).toBe('DIV'); // Assuming hint is rendered as a <div> tag
  });

  it('should render error text when hasError is true', () => {
    const screen = renderTextInput({
      error: {
        content: 'This is an error message',
      },
    });
    const errorElement = screen.getByText('This is an error message');

    expect(errorElement).toBeTruthy();
    expect(errorElement.classList.contains('gi-error-text')).toBe(true);
  });

  it('should apply error styles to the input when hasError is true', () => {
    const screen = renderTextInput({
      error: {
        content: 'Error message',
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
        content: 'Label for input',
        size: 'md',
        for: 'input-id',
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
        content: '<strong>Bold Label</strong>',
      },
    });

    const labelElement = screen.getByText('Bold Label');
    expect(labelElement).toBeTruthy();
    expect(labelElement.innerHTML).toContain('Bold Label');
  });

  it('should render date input', () => {
    const screen = renderTextInput({
      type: InputTypeEnum.Date,
    });
    const inputElement = screen.getByTestId('textbox');

    expect(inputElement).toBeTruthy();
    expect(inputElement.getAttribute('type')).toBe('date');
  });

  it('should pass axe accessibility tests', async () => {
    const screen = renderTextInput({
      label: {
        content: 'Accessible label',
        for: 'input-id',
      },
      id: 'input-id', // Ensure the input has the correct ID for accessibility tests
    });

    await screen.axe();
  });
});
