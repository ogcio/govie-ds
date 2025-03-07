import { render } from '../common/render';
import { Size, Tag } from '../heading/heading.schema';
import { type RadiosProps, RadioSizeEnum } from './radio.schema';
import html from './radios-group.html?raw';

const standardProps = {
  groupId: 'uniqueId',
  title: {
    value: 'Where do you live?',
    asHeading: {
      size: Size.Medium,
      as: Tag.H2,
    },
  },
  items: [
    {
      label: 'England',
      value: 'england',
      aria: {
        'aria-checked': 'false',
      },
    },
    {
      label: 'Scotland',
      value: 'scotland',
      aria: {
        'aria-checked': 'false',
      },
    },
    {
      label: 'Ireland',
      value: 'ireland',
      aria: {
        'aria-checked': 'false',
      },
    },
  ],
};

describe('radios', () => {
  const renderRadios = render<RadiosProps>({
    componentName: 'radios',
    macroName: 'govieRadioGroup',
    html,
  });

  it('should render radio labels and inputs', () => {
    const screen = renderRadios(standardProps);
    for (const radio of standardProps.items) {
      const labelElement = screen.getByText(radio.label);
      const inputElementValue = screen
        .getByText(radio.label)
        .previousElementSibling?.getAttribute('value');
      expect(labelElement).toBeTruthy();
      expect(inputElementValue).toEqual(radio.value);
    }
  });

  it('should render the title', () => {
    const screen = renderRadios(standardProps);
    const titleElement = screen.getByText(standardProps.title.value);
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
      size: RadioSizeEnum.Small,
    };

    const screen = renderRadios(propsWithSmallRadios);

    for (const radio of propsWithSmallRadios.items) {
      const inputElementClasses = screen.getByText(radio.label)
        .previousElementSibling?.className;
      expect(inputElementClasses?.includes(classes)).toBeTruthy();
    }
  });

  it('should render big radios', () => {
    const classes = 'gi-radio-large';
    const propsWithSmallRadios = {
      ...standardProps,
      size: RadioSizeEnum.Large,
    };

    const screen = renderRadios(propsWithSmallRadios);

    for (const radio of propsWithSmallRadios.items) {
      const inputElementClasses = screen.getByText(radio.label)
        .previousElementSibling?.className;
      expect(inputElementClasses?.includes(classes)).toBeTruthy();
    }
  });

  it('should pass axe tests', async () => {
    const screen = renderRadios(standardProps);

    await screen.axe();
  });

  it('should update aria-checked attribute on selection', () => {
    const screen = renderRadios(standardProps);

    for (const radio of standardProps.items) {
      const labelElement = screen.getByText(radio.label);
      const inputElementValue = screen
        .getByText(radio.label)
        .previousElementSibling?.getAttribute('aria-checked');

      expect(labelElement).toBeTruthy();
      expect(inputElementValue).toEqual('false');
    }
  });
});
