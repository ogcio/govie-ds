import { render, cleanup } from '../test-utils.js';
import {
  CheckboxesGroup,
  type CheckboxesGroupType,
} from './checkboxes-group.js';
import { CheckboxSizeEnum } from './types.js';

const standardProps: CheckboxesGroupType = {
  groupId: 'UniqueID',
  items: [
    {
      label: 'Checkbox 1',
      value: 'Checkbox-1',
    },
    {
      label: 'Checkbox 2',
      value: 'Checkbox-2',
    },
    {
      label: 'Checkbox 3',
      value: 'Checkbox-3',
    },
  ],
  title: {
    value: 'Title',
  },
  size: CheckboxSizeEnum.Medium,
};

describe('checkboxes', () => {
  afterEach(cleanup);

  const renderCheckboxes = (props: CheckboxesGroupType) =>
    render(<CheckboxesGroup {...props} />);

  it('should render checkbox labels and inputs', () => {
    const screen = renderCheckboxes(standardProps);
    for (const checkbox of standardProps.items) {
      const labelElement = screen.getByText(checkbox.label || '');
      const inputElementValue = screen
        .getByText(checkbox.label || '')
        .previousElementSibling?.getAttribute('value');
      expect(labelElement).toBeTruthy();
      expect(inputElementValue).toEqual(checkbox.value);
    }
  });

  it('should render the title', () => {
    const screen = renderCheckboxes(standardProps);
    const titleElement = screen.getByText('Title');
    expect(titleElement).toBeTruthy();
  });

  it('should render hints', () => {
    const propsWithHints = {
      ...standardProps,
      title: {
        value: 'Title',
        hint: 'hint of Title',
      },
      items: [
        ...standardProps.items,
        {
          label: 'Checkbox 4',
          value: 'Checkbox-4',
          hint: 'hint for checkbox',
        },
      ],
    };

    const screen = renderCheckboxes(propsWithHints);
    const titleHintElement = screen.getByTestId('title-hint');
    const checkboxHintElement = screen.getByText('hint for checkbox');

    expect(titleHintElement).toBeTruthy();
    expect(checkboxHintElement).toBeTruthy();
  });

  it('should render checkboxes with error message', () => {
    const propsWithError = {
      ...standardProps,
      errorMessage: 'This is an error message',
    };
    const screen = renderCheckboxes(propsWithError);
    const errorElement = screen.getByText('This is an error message');

    expect(errorElement).toBeTruthy();
  });

  it('should render checkboxes with none option checkbox', () => {
    const propsWithNoOption = {
      ...standardProps,
      noneOption: {
        label: 'Label for none option',
        value: 'value-for-none-option',
        hint: 'Hint for none option',
      },
    };

    const screen = renderCheckboxes(propsWithNoOption);
    const noOptionLabelElement = screen.getByText('Label for none option');
    const noOptionInputElement = screen
      .getByText('Label for none option')
      .previousElementSibling?.getAttribute('value');
    const noOptionHintElement = screen.getByText('Hint for none option');

    expect(noOptionLabelElement).toBeTruthy();
    expect(noOptionInputElement).toBeTruthy();
    expect(noOptionHintElement).toBeTruthy();
  });

  it('should render small checkboxes', () => {
    const classes = 'gi-w-6 gi-h-6';
    const propsWithSmallCheckboxes = {
      ...standardProps,
      size: CheckboxSizeEnum.Small,
    };

    const screen = renderCheckboxes(propsWithSmallCheckboxes);

    for (const checkbox of propsWithSmallCheckboxes.items) {
      const inputElementClasses = screen.getByText(checkbox.label || '')
        .previousElementSibling?.className;
      expect(inputElementClasses?.includes(classes)).toBeTruthy();
    }
  });

  it('should render big checkboxes', () => {
    const classes = 'gi-w-11 gi-h-11';
    const propsWithBigCheckboxes = {
      ...standardProps,
      size: CheckboxSizeEnum.Large,
    };

    const screen = renderCheckboxes(propsWithBigCheckboxes);

    for (const checkbox of propsWithBigCheckboxes.items) {
      const inputElementClasses = screen.getByText(checkbox.label || '')
        .previousElementSibling?.className;
      expect(inputElementClasses?.includes(classes)).toBeTruthy();
    }
  });

  it('should pass axe tests', async () => {
    const screen = renderCheckboxes({
      groupId: 'UniqueID',
      items: [
        {
          label: 'Checkbox 1',
          value: 'Checkbox-1',
        },
        {
          label: 'Checkbox 2',
          value: 'Checkbox-2',
        },
        {
          label: 'Checkbox 3',
          value: 'Checkbox-3',
        },
      ],
      title: {
        value: 'Organisation',
        asHeading: {
          size: 'md',
          as: 'h1',
        },
        hint: 'Title hint',
      },
      errorMessage: 'Error message',
      noneOption: {
        label: 'Checkbox None',
        hint: 'Hint for checkbox none',
        value: 'checkbox-none',
      },
      size: CheckboxSizeEnum.Large,
    });

    await screen.axe();
  });
});
