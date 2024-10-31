import { cleanup, render } from '../test-utils.js';
import { SelectProps, Select, Option } from './select.js';

const standardProps: SelectProps = {
  id: 'Unique-ID',
  label: {
    text: 'Label-text',
  },
  options: [
    {
      label: 'Default select',
      value: 'value-1',
    },
    {
      label: 'Option 1',
      value: 'value-2',
    },
    {
      label: 'Option 2',
      value: 'value-3',
    },
    {
      label: 'Option 3',
      value: 'value-3',
    },
  ],
};

describe('select', () => {
  afterEach(cleanup);
  const renderSelect = (props: SelectProps) => render(<Select {...props} />);

  it('should render the label', () => {
    const screen = renderSelect(standardProps);
    const labelElement = screen.getByText('Label-text');
    expect(labelElement).toBeTruthy();
  });

  it('should render the default option', () => {
    const screen = renderSelect(standardProps);
    const defaultSelectElement = screen.getByText('Default select');
    expect(defaultSelectElement).toBeTruthy();
  });

  it('should render the options', () => {
    const screen = renderSelect(standardProps);
    for (const option of standardProps.options) {
      const optionElement = screen.getByText((option as Option)?.label || '');
      expect(optionElement).toBeTruthy();
    }
  });

  it('should render the hint text', () => {
    const propsWithHint = {
      ...standardProps,
      hint: {
        text: 'Hint Text',
      },
    };

    const screen = renderSelect(propsWithHint);
    const hintElement = screen.getByText('Hint Text');
    expect(hintElement).toBeTruthy();
  });

  it('should render the error text', () => {
    const propsWithHint = {
      ...standardProps,
      error: {
        text: 'Error Text',
      },
    };

    const screen = renderSelect(propsWithHint);
    const hintElement = screen.getByText('Error Text');
    expect(hintElement).toBeTruthy();
  });

  it('should pass axe tests', async () => {
    const screen = renderSelect(standardProps);

    await screen.axe();
  });
});
