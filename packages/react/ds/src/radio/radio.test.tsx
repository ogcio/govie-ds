import { render, cleanup } from '../test-utils.js';
import { RadiosGroup } from './radios-group.js';
import { type RadiosGroupType, RadiosSizeEnum } from './types.js';

const standardProps: RadiosGroupType = {
  fieldId: 'uniqueId',
  title: {
    value: 'Where do you live?',
    asHeading: {
      size: 'md',
      as: 'h2',
    },
  },
  items: [
    {
      label: 'England',
      value: 'england',
    },
    {
      label: 'Scotland',
      value: 'scotland',
    },
    {
      label: 'Ireland',
      value: 'ireland',
    },
  ],
};

describe('radios', () => {
  afterEach(cleanup);
  const renderRadios = (props: RadiosGroupType) =>
    render(<RadiosGroup {...props} />);

  it('should render radio labels and inputs', () => {
    const screen = renderRadios(standardProps);
    for (const radio of standardProps.items) {
      const labelElement = screen.getByText(radio.label || '');
      const inputElementValue = screen
        .getByText(radio.label || '')
        .previousElementSibling?.getAttribute('value');
      expect(labelElement).toBeTruthy();
      expect(inputElementValue).toEqual(radio.value);
    }
  });

  it('should render the title', () => {
    const screen = renderRadios(standardProps);
    const titleElement = screen.getByText(standardProps?.title?.value || '');
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
          label: 'Radio 4',
          value: 'radio-4',
          hint: 'hint for radio',
        },
      ],
    };

    const screen = renderRadios(propsWithHints);
    const titleHintElement = screen.getByTestId('title-hint');
    const radioHintElement = screen.getByText('hint for radio');

    expect(titleHintElement).toBeTruthy();
    expect(radioHintElement).toBeTruthy();
  });

  it('should render radios with error message', () => {
    const propsWithError = {
      ...standardProps,
      errorMessage: 'This is an error message',
    };
    const screen = renderRadios(propsWithError);
    const errorElement = screen.getByText('This is an error message');

    expect(errorElement).toBeTruthy();
  });

  it('should render radios with divider option', () => {
    const propsWithNoOption = {
      ...standardProps,
      dividerOption: {
        label: 'Label for none option',
        value: 'value-for-none-option',
        hint: 'Hint for none option',
      },
    };

    const screen = renderRadios(propsWithNoOption);
    const noOptionLabelElement = screen.getByText('Label for none option');
    const noOptionInputElement = screen
      .getByText('Label for none option')
      .previousElementSibling?.getAttribute('value');
    const noOptionHintElement = screen.getByText('Hint for none option');

    expect(noOptionLabelElement).toBeTruthy();
    expect(noOptionInputElement).toBeTruthy();
    expect(noOptionHintElement).toBeTruthy();
  });

  it('should render small radios', () => {
    const classes = 'gi-radio-small';
    const propsWithSmallRadios = {
      ...standardProps,
      size: RadiosSizeEnum.Small,
    };

    const screen = renderRadios(propsWithSmallRadios);

    for (const radio of propsWithSmallRadios.items) {
      const inputElementClasses = screen.getByText(radio.label || '')
        .previousElementSibling?.className;
      expect(inputElementClasses?.includes(classes)).toBeTruthy();
    }
  });

  it('should render big radios', () => {
    const classes = 'gi-radio-large';
    const propsWithSmallRadios = {
      ...standardProps,
      size: RadiosSizeEnum.Large,
    };

    const screen = renderRadios(propsWithSmallRadios);

    for (const radio of propsWithSmallRadios.items) {
      const inputElementClasses = screen.getByText(radio.label || '')
        .previousElementSibling?.className;
      expect(inputElementClasses?.includes(classes)).toBeTruthy();
    }
  });

  it('should pass axe tests', async () => {
    const screen = renderRadios(standardProps);

    await screen.axe();
  });
});
