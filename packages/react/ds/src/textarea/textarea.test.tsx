import { LabelSize } from '../label/label.js';
import { cleanup, render } from '../test-utils.js';
import { TextAreaProps, TextArea } from './textarea.js';

describe('govieTextArea', () => {
  afterEach(cleanup);
  const renderTextArea = (props: TextAreaProps) =>
    render(<TextArea {...props} />);

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
        text: 'Textarea Label',
        size: LabelSize.Medium,
        htmlFor: 'textarea-id',
      },
    });
    const labelElement = screen.getByText('Textarea Label');

    expect(labelElement).toBeTruthy();
    expect(labelElement.tagName).toBe('LABEL');
  });

  it('should render hint text if provided', () => {
    const screen = renderTextArea({
      hint: {
        text: 'This is a hint',
      },
    });
    const hintElement = screen.getByText('This is a hint');

    expect(hintElement).toBeTruthy();
    expect(hintElement.tagName).toBe('DIV'); // Assuming hint is rendered as a <div> tag
  });

  it('should render error text when hasError is true', () => {
    const screen = renderTextArea({
      error: {
        text: 'This is an error message',
      },
    });
    const errorElement = screen.getByText('This is an error message');

    expect(errorElement).toBeTruthy();
    expect(errorElement.classList.contains('gi-error-text')).toBe(true);
  });

  it('should apply error styles to the textarea when hasError is true', () => {
    const screen = renderTextArea({
      error: {
        text: 'This is Error',
      },
    });
    const textareaElement = screen.getByRole('textbox');

    expect(textareaElement.classList.contains('gi-textarea-error')).toBe(true);
  });

  it('should associate the label with the textarea field using the "for" attribute', () => {
    const screen = renderTextArea({
      label: {
        text: 'Label for textarea',
        size: LabelSize.Medium,
        htmlFor: 'textarea-id',
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
        text: 'Bold Label',
      },
    });

    const labelElement = screen.getByText('Bold Label');
    expect(labelElement).toBeTruthy();
    expect(labelElement.innerHTML).toContain('Bold Label');
  });

  it('should pass axe accessibility tests', async () => {
    const screen = renderTextArea({
      label: {
        text: 'Accessible label',
        htmlFor: 'textarea-id',
      },
    });

    await screen.axe();
  });

  it('should show correctly remaining chars message according with maxChars', async () => {
    const screen = renderTextArea({
      id: 'textarea-0',
      label: {
        text: 'Label for textarea',
        htmlFor: 'textarea-id',
      },
      maxChars: 30,
    });

    const textareaElement = screen.getByRole('textbox');
    expect(textareaElement.getAttribute('maxlength')).toBe('30');

    const remainingElement = screen.getByText(
      /You have 30 characters remaining/,
    );
    expect(remainingElement).toBeInTheDocument();
  });

  it('should not show remaining chars message when maxChars is not set', async () => {
    const screen = renderTextArea({
      label: {
        text: 'Label for textarea',
        htmlFor: 'textarea-id',
      },
    });
    expect(
      screen.container.querySelectorAll('gi-textarea-remaining-chars').length,
    ).toBe(0);
    const remainingElement = screen.queryByText(/^You have/);
    expect(remainingElement).not.toBeInTheDocument();
  });
});
