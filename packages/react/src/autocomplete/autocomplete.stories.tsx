import type { Meta, StoryObj } from '@storybook/react-vite';
import { debounce } from 'lodash';
import { useEffect, useMemo, useReducer, useState } from 'react';
import { useForm } from 'react-hook-form';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import { FormField, FormFieldLabel } from '@/forms/form-field/form-field';
import { Label } from '@/label/label';
import { ChipGroup } from '@/ChipGroup';
import { Autocomplete, AutocompleteItem } from './autocomplete';
import type { AutocompleteProps } from './types';
import { Stack } from '@/stack/stack';

const meta = {
  title: 'Form/Autocomplete',
  parameters: {
    docs: {
      autoplay: false,
      description: {
        component: 'Autocomplete component for selecting a value from a filtered list of options.',
      },
    },
  },
  component: Autocomplete,
  decorators: (Story) => {
    return (
      <div className="gi-h-[400px]">
        <Story />
      </div>
    );
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  { value: 'frontend_dev', label: 'Frontend Dev.' },
  { value: 'backend_dev', label: 'Backend Dev.' },
  { value: 'fullstack_dev', label: 'Full Stack Dev.' },
  { value: 'devops_engineer', label: 'DevOps Engineer' },
  { value: 'qa_engineer', label: 'QA Engineer' },
  { value: 'ui_ux_designer', label: 'UI/UX Designer' },
  { value: 'product_manager', label: 'Product Manager' },
  { value: 'data_scientist', label: 'Data Scientist' },
];

export const Default: Story = {
  tags: ['slow'],
  render: (props: AutocompleteProps) => {
    return (
      <FormField className="gi-w-56">
        <FormFieldLabel>Label</FormFieldLabel>
        <Autocomplete {...props}>
          {options.map(({ value, label }) => (
            <AutocompleteItem value={value} key={`${label}-${value}`}>
              {label}
            </AutocompleteItem>
          ))}
        </Autocomplete>
      </FormField>
    );
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disables the autocomplete input.',
    },
    defaultValue: {
      control: 'text',
      description: 'The default selected value.',
    },
    onChange: {
      action: 'changed',
      description: 'Callback triggered when an option is selected.',
    },
  },
  args: {
    defaultValue: '',
    children: [],
    id: 'autocomplete-default-id',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');
    expect(input).toHaveAttribute('id', 'autocomplete-default-id');
    await userEvent.type(input, 'Backend', { delay: 100 });
    const option = await canvas.findByText('Backend Dev.');
    expect(option).toBeVisible();
  },
};

export const WithDefaultValue: Story = {
  args: {
    children: [],
  },
  render: (props: AutocompleteProps) => {
    return (
      <FormField className="gi-w-56">
        <FormFieldLabel>With Default Value</FormFieldLabel>

        <Autocomplete {...props} value={options[1].value} id="test">
          {options.map(({ value, label }) => (
            <AutocompleteItem value={value} key={`${label}-${value}`}>
              {label}
            </AutocompleteItem>
          ))}
        </Autocomplete>
      </FormField>
    );
  },
};

export const WithDisabledOptions: Story = {
  args: {
    defaultValue: '',
    children: [],
  },
  render: (props: AutocompleteProps) => (
    <FormField className="gi-w-56">
      <FormFieldLabel>With Disabled Options</FormFieldLabel>
      <Autocomplete {...props}>
        {[
          <AutocompleteItem value="disabled" disabled key="disabled">
            Tester
          </AutocompleteItem>,
          ...options.map(({ value, label }) => (
            <AutocompleteItem value={value} key={`${label}-${value}`}>
              {label}
            </AutocompleteItem>
          )),
        ]}
      </Autocomplete>
    </FormField>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');
    await userEvent.type(input, 'Test', { delay: 100 });
    const disabledOption = await canvas.findByText('Tester');
    expect(disabledOption).toBeVisible();
    const parentWithAria = disabledOption.closest('[aria-disabled]');
    expect(parentWithAria).toHaveAttribute('aria-disabled', 'true');
  },
};

export const WithDisabled: Story = {
  args: {
    defaultValue: '',
    children: [],
  },
  render: (props: AutocompleteProps) => (
    <FormField className="gi-w-56">
      <FormFieldLabel>With Disabled</FormFieldLabel>
      <Autocomplete {...props} disabled>
        {options.map(({ value, label }) => (
          <AutocompleteItem value={value} key={`${label}-${value}`}>
            {label}
          </AutocompleteItem>
        ))}
      </Autocomplete>
    </FormField>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');
    expect(input).toBeDisabled();
  },
};

export const WithFreeSolo: Story = {
  args: {
    defaultValue: '',
    freeSolo: true,
    children: [],
  },
  render: (props: AutocompleteProps) => (
    <FormField className="gi-w-56">
      <FormFieldLabel>With Free Solo</FormFieldLabel>
      <Autocomplete {...props}>
        {options.map(({ value, label }) => (
          <AutocompleteItem value={value} key={`${label}-${value}`}>
            {label}
          </AutocompleteItem>
        ))}
      </Autocomplete>
    </FormField>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');
    expect(input).not.toBeDisabled();
    await userEvent.click(input);
  },
};

export const WithLoading = () => {
  const names = [
    "Aoife O'Sullivan",
    'Conor McCarthy',
    "Niamh O'Brien",
    'Sean Gallagher',
    'Ciara Murphy',
    "Cian O'Reilly",
    'Saoirse Kennedy',
    'Liam Doyle',
    'Orla Byrne',
    'Eoin Fitzpatrick',
    'Róisín Kavanagh',
    'Padraig Keane',
    'Maeve Nolan',
    'Darragh Quinn',
    'Aisling Brady',
    'Fionn MacNamara',
    'Gráinne Flynn',
    'Cathal Dunne',
    'Eimear Ryan',
    'Tadhg McDonagh',
  ];

  const ACTIONS = {
    TOGGLE_OPEN: 'TOGGLE_OPEN',
    SET_QUERY: 'SET_QUERY',
    SET_RESULTS: 'SET_RESULTS',
    SET_LOADING: 'SET_LOADING',
  };

  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case ACTIONS.TOGGLE_OPEN: {
        return { ...state, isOpen: action.payload };
      }
      case ACTIONS.SET_QUERY: {
        return { ...state, query: action.payload };
      }
      case ACTIONS.SET_LOADING: {
        if (action.payload) {
          return { ...state, isLoading: action.payload, results: [] };
        }
        return { ...state, isLoading: action.payload };
      }
      case ACTIONS.SET_RESULTS: {
        const children = action.payload.map((name: string) => (
          <AutocompleteItem key={name} value={name.toLowerCase()?.replaceAll(/\s+/g, '-')}>
            {name}
          </AutocompleteItem>
        ));
        return { ...state, results: children, isLoading: false };
      }
      default: {
        return state;
      }
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    query: '',
    isOpen: false,
    isLoading: false,
    results: [],
  });

  const debouncedFetch = useMemo(
    () =>
      debounce(async (query) => {
        const filtered = await new Promise((resolve) => {
          // Fake fetch
          setTimeout(() => {
            const results = names.filter((name) => name.toLowerCase().includes(query.toLowerCase())).slice(0, 10);
            resolve(results);
          }, 600);
        });

        dispatch({ type: ACTIONS.SET_RESULTS, payload: filtered });
      }, 500),
    [],
  );

  const startFetch = () => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    debouncedFetch(state.query);
  };

  useEffect(() => {
    if (state.query) {
      startFetch();
    }
  }, [state.query]);

  const handleOpen = () => {
    startFetch();
  };

  const handleClose = () => {
    dispatch({ type: ACTIONS.SET_RESULTS, payload: [] });
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    dispatch({ type: ACTIONS.SET_QUERY, payload: value });
  };

  return (
    <FormField className="gi-w-56">
      <FormFieldLabel>Async Search</FormFieldLabel>
      <Autocomplete
        isOpen={state.isOpen}
        onClose={handleClose}
        onOpen={handleOpen}
        onChange={handleOnChange}
        isLoading={state.isLoading}
      >
        {state.results}
      </Autocomplete>
    </FormField>
  );
};

export const WithReactHookForm: StoryObj = {
  tags: ['skip-playwright'],
  render: function Render() {
    const { register, watch } = useForm();

    const topicValue = watch('example');

    return (
      <div className="gi-flex gi-gap-4 gi-flex-col">
        <FormField className="gi-w-56">
          <FormFieldLabel>Select with watcher</FormFieldLabel>
          <Autocomplete {...register('example')}>
            {options.map(({ value, label }) => (
              <AutocompleteItem value={value} key={`${label}-${value}`}>
                {label}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        </FormField>
        <Label>Watched value: {topicValue}</Label>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');

    await userEvent.type(input, 'Backend', { delay: 100 });

    const option = await canvas.findByText('Backend Dev.');
    expect(option).toBeVisible();

    await userEvent.click(option);
    const watchedValueLabel = await canvas.findByText(/Watched value:/);

    waitFor(() => expect(watchedValueLabel).toHaveTextContent('Watched value: backend_dev'));
  },
};

export const Test: Story = {
  render: (props: AutocompleteProps) => {
    return (
      <FormField className="gi-w-56">
        <FormFieldLabel>Label</FormFieldLabel>
        <Autocomplete {...props}>
          {options.map(({ value, label }) => (
            <AutocompleteItem value={value} key={`${label}-${value}`}>
              {label}
            </AutocompleteItem>
          ))}
        </Autocomplete>
      </FormField>
    );
  },
  args: {
    defaultValue: '',
    children: [],
    id: 'autocomplete-default-id',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');
    expect(input).toHaveAttribute('id', 'autocomplete-default-id');
    await userEvent.type(input, 'Backend', { delay: 100 });
    const option = await canvas.findByText('Backend Dev.');
    expect(option).toBeVisible();
    await userEvent.keyboard('{Escape}');
  },
};

const labelOptions = Array.from({ length: 8 }, (_, index) => ({
  value: `label_${index + 1}`,
  label: `Label ${index + 1}`,
}));

export const WithMultiple: Story = {
  tags: ['slow'],

  render: (props: AutocompleteProps) => {
    return (
      <FormField className="gi-w-[332px]">
        <FormFieldLabel>Multi Select</FormFieldLabel>
        <Autocomplete {...props} multiple>
          {labelOptions.map(({ value, label }) => (
            <AutocompleteItem value={value} key={value}>
              {label}
            </AutocompleteItem>
          ))}
        </Autocomplete>
      </FormField>
    );
  },
  args: {
    children: [],
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');

    await step('Listbox has aria-multiselectable', async () => {
      await userEvent.click(input);
      const listbox = await canvas.findByRole('listbox');
      expect(listbox).toHaveAttribute('aria-multiselectable', 'true');
    });

    await step('All options have aria-selected', async () => {
      const allOptions = canvas.getAllByRole('option');
      for (const option of allOptions) {
        expect(option).toHaveAttribute('aria-selected');
      }
    });

    await step('Clicking an option toggles aria-selected without closing', async () => {
      const firstOption = canvas.getByRole('option', { name: labelOptions[0].label });
      expect(firstOption).toHaveAttribute('aria-selected', 'false');
      await userEvent.click(firstOption);
      await waitFor(() => {
        const updated = canvas.getByRole('option', { name: labelOptions[0].label });
        expect(updated).toHaveAttribute('aria-selected', 'true');
      });
      expect(canvas.getByRole('listbox')).toBeInTheDocument();
    });

    await step('Selecting multiple options updates count', async () => {
      const secondOption = canvas.getByRole('option', { name: labelOptions[1].label });
      await userEvent.click(secondOption);
      await waitFor(() => {
        expect(canvas.getByText('2')).toBeInTheDocument();
      });
    });
  },
};

const getLabel = (value: string) => labelOptions.find((option) => option.value === value)?.label ?? value;

export const WithMultipleChipsWrap: Story = {
  name: 'With Multiple (Chips Wrap)',
  tags: ['slow'],

  render: function Render(props: AutocompleteProps) {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const chipItems = selectedValues.map((value) => ({ value, label: getLabel(value) }));
    const handleRemoveChip = (valueToRemove: string) => {
      setSelectedValues(selectedValues.filter((value) => value !== valueToRemove));
    };

    return (
      <FormField className="gi-w-[332px]">
        <FormFieldLabel>Multi Select (Chips Wrap)</FormFieldLabel>
        <Stack gap={3}>
          <Autocomplete {...props} multiple selectedValues={selectedValues} onSelectChange={setSelectedValues}>
            {labelOptions.map(({ value, label }) => (
              <AutocompleteItem value={value} key={value}>
                {label}
              </AutocompleteItem>
            ))}
          </Autocomplete>
          <ChipGroup items={chipItems} onRemove={handleRemoveChip} overflow="wrap" />
        </Stack>
      </FormField>
    );
  },
  args: {
    children: [],
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');

    await step('Select 6 options and keep popover open', async () => {
      await userEvent.click(input);
      await waitFor(() => {
        expect(canvas.getByRole('listbox')).toBeInTheDocument();
      });

      for (const { label } of labelOptions.slice(0, 8)) {
        const option = canvas.getByRole('option', { name: label });
        await userEvent.click(option);
        await waitFor(() => {
          expect(option).toHaveAttribute('aria-selected', 'true');
        });
      }

      await waitFor(() => {
        expect(canvas.getByText('8')).toBeInTheDocument();
      });
    });

    await step('All 8 chips are visible (wrap mode)', async () => {
      await waitFor(() => {
        expect(canvas.getAllByRole('button', { name: /remove chip/i }).length).toBe(8);
      });
      expect(canvas.queryByText(/more/)).not.toBeInTheDocument();
    });

    await userEvent.keyboard('{Escape}');
  },
};

export const WithMultipleChipsCollapse: Story = {
  name: 'With Multiple (Chips Collapse)',
  tags: ['slow'],
  render: function Render(props: AutocompleteProps) {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const chipItems = selectedValues.map((value) => ({ value, label: getLabel(value) }));
    const handleRemoveChip = (valueToRemove: string) => {
      setSelectedValues(selectedValues.filter((value) => value !== valueToRemove));
    };

    return (
      <FormField className="gi-w-[332px]">
        <FormFieldLabel>Multi Select (Chips Collapse)</FormFieldLabel>
        <Stack gap={3}>
          <Autocomplete {...props} multiple selectedValues={selectedValues} onSelectChange={setSelectedValues}>
            {labelOptions.map(({ value, label }) => (
              <AutocompleteItem value={value} key={value}>
                {label}
              </AutocompleteItem>
            ))}
          </Autocomplete>
          <ChipGroup items={chipItems} onRemove={handleRemoveChip} />
        </Stack>
      </FormField>
    );
  },
  args: {
    children: [],
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');

    await step('Select 6 options', async () => {
      await userEvent.click(input);
      await waitFor(() => {
        expect(canvas.getByRole('listbox')).toBeInTheDocument();
      });

      for (let index = 1; index <= 6; index++) {
        const option = canvas.getByRole('option', { name: `Label ${index}` });
        await userEvent.click(option);
        await waitFor(() => {
          expect(option).toHaveAttribute('aria-selected', 'true');
        });
      }

      await userEvent.keyboard('{Escape}');
    });

    await step('Shows 4 chips and +2 more label', async () => {
      await waitFor(() => {
        const chips = canvas.getAllByRole('button', { name: /remove chip/i });
        expect(chips.length).toBe(4);
      });
      expect(canvas.getByText('+2 more')).toBeInTheDocument();
    });
  },
};

export const TestKeyboardEvents: StoryObj = {
  tags: ['skip-playwright'],
  render: function Render() {
    const [value, setValue] = useState('');
    return (
      <FormField className="gi-w-56">
        <FormFieldLabel>Label</FormFieldLabel>
        <Autocomplete aria-label="Select" value={value} onChange={(event: any) => setValue(event.currentTarget.value)}>
          {Array.from({ length: 10 }, (_, index) => (
            <AutocompleteItem key={index} value={`value_${index}`}>
              {`Option ${index}`}
            </AutocompleteItem>
          ))}
        </Autocomplete>
      </FormField>
    );
  },

  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = await canvas.findByRole('combobox', { name: /select/i });

    const expectOpen = async () => waitFor(() => expect(canvas.getByRole('listbox')).toBeInTheDocument());
    const expectClosed = async () => waitFor(() => expect(canvas.queryByRole('listbox')).toBeNull());

    await step('ArrowDown opens and moves highlight', async () => {
      input.focus();
      await userEvent.keyboard('{ArrowDown}');
      await expectOpen();
      const highlighted = canvas.getAllByRole('option').find((element) => element.dataset.highlighted === 'true');
      await expect(highlighted).toBeTruthy();
      await expect(highlighted).toHaveAttribute('data-testid', 'option-value_0');
      await userEvent.keyboard('{Esc}');
    });

    await step('Enter opens the menu', async () => {
      input.focus();
      await userEvent.keyboard('{Enter}');
      await expectOpen();
      await userEvent.keyboard('{NumpadEnter}');
      await expectOpen();
    });

    await step('ArrowUp opens menu and moves highlight', async () => {
      await userEvent.keyboard('{ArrowUp}');
      await expectOpen();
      const highlighted = canvas.getAllByRole('option').find((element) => element.dataset.highlighted === 'true');
      expect(highlighted).toBeTruthy();
      expect(highlighted).toHaveAttribute('data-testid', 'option-value_9');
    });

    await step('Tab closes when open', async () => {
      await userEvent.click(input);
      await expectOpen();
      await userEvent.tab();
      await expectClosed();
    });

    await step('Escape closes when open', async () => {
      await userEvent.click(input);
      await expectOpen();
      await userEvent.keyboard('{Escape}');
      await expectClosed();
    });
  },
};
