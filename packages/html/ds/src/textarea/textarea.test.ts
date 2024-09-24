import { render } from '../common/render';
import html from './textarea.html?raw';
import { TextareaProps } from './textarea.schema';

describe('govieTextArea', () => {
  const renderTextArea = render<TextareaProps>({
    componentName: 'textarea',
    macroName: 'govieTextArea',
    html,
  });

  it('should render a textarea element', () => {
    const screen = renderTextArea({});
    const textareaElement = screen.getByRole('textbox');

    expect(textareaElement).toBeTruthy();
    expect(textareaElement.tagName).toBe('TEXTAREA');
  });

  it('should render with the correct number of rows', () => {
    const screen = renderTextArea({
      rows: 6,
    });
    const textareaElement = screen.getByRole('textbox');

    expect(textareaElement.getAttribute('rows')).toBe('6');
  });

  it('should render with the correct number of columns', () => {
    const screen = renderTextArea({
      cols: 50,
    });
    const textareaElement = screen.getByRole('textbox');

    expect(textareaElement.getAttribute('cols')).toBe('50');
  });

  it('should render a label if provided', () => {
    const screen = renderTextArea({
      label: {
        content: 'Textarea Label',
        size: 'md',
        for: 'textarea-id',
      },
    });
    const labelElement = screen.getByText('Textarea Label');

    expect(labelElement).toBeTruthy();
    expect(labelElement.tagName).toBe('LABEL');
    expect(labelElement.getAttribute('for')).toBe('textarea-id');
  });

  it('should render hint text if provided', () => {
    const screen = renderTextArea({
      hintText: {
        content: 'This is a hint',
      },
    });
    const hintElement = screen.getByText('This is a hint');

    expect(hintElement).toBeTruthy();
    expect(hintElement.tagName).toBe('P'); // Assuming hint is rendered as a <p> tag
  });

  it('should render error text when hasError is true', () => {
    const screen = renderTextArea({
      errorText: {
        content: 'This is an error message',
      },
    });
    const errorElement = screen.getByText('This is an error message');

    expect(errorElement).toBeTruthy();
    expect(errorElement.classList.contains('gi-text-red-600')).toBe(true);
  });

  it('should apply error styles to the textarea when hasError is true', () => {
    const screen = renderTextArea({
      errorText: {
        content: 'This is Error',
      },
    });
    const textareaElement = screen.getByRole('textbox');

    expect(textareaElement.classList.contains('gi-border-red-600')).toBe(true);
  });

  it('should associate the label with the textarea field using the "for" attribute', () => {
    const screen = renderTextArea({
      label: {
        content: 'Label for textarea',
        size: 'md',
        for: 'textarea-id',
      },
    });
    const textareaElement = screen.getByRole('textbox');
    const labelElement = screen.getByText('Label for textarea');

    expect(labelElement.getAttribute('for')).toBe(
      textareaElement.getAttribute('id'),
    );
  });

  it('should safely render HTML content in label', () => {
    const screen = renderTextArea({
      label: {
        content: '<strong>Bold Label</strong>',
      },
    });

    const labelElement = screen.getByText('Bold Label');
    expect(labelElement).toBeTruthy();
    expect(labelElement.innerHTML).toContain('Bold Label');
  });

  it('should pass axe accessibility tests', async () => {
    const screen = renderTextArea({
      label: {
        content: 'Accessible label',
        for: 'textarea-id',
      },
    });

    await screen.axe();
  });
});
