import { render } from '../common/render';
import html from './select.html?raw';
import { SelectProps } from './select.schema';

const standardProps = {
  id: 'Unique-ID',
  label: {
    content: 'Label-text',
  },
  options: {
    default: {
      label: 'Default select',
      value: 'value-1',
    },
    items: [
      {
        label: 'Option 1',
        value: 'value-1',
      },
      {
        label: 'Option 2',
        value: 'value-2',
      },
      {
        label: 'Option 3',
        value: 'value-3',
      },
    ],
  },
};

describe('select', () => {
  const renderSelect = render<SelectProps>({
    componentName: 'select',
    macroName: 'govieSelect',
    html,
  });

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
    for (const option of standardProps.options.items) {
      const optionElement = screen.getByText(option.label);
      expect(optionElement).toBeTruthy();
    }
  });

  it('should render the hint text', () => {
    const propsWithHint = {
      ...standardProps,
      hint: {
        content: 'Hint Text',
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
        content: 'Error Text',
      },
    };

    const screen = renderSelect(propsWithHint);
    const hintElement = screen.getByText('Error Text');
    expect(hintElement).toBeTruthy();
  });
});
