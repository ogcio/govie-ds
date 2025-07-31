import type { Meta, StoryObj } from '@storybook/react';
import { debounce } from 'lodash';
import { useEffect, useMemo, useReducer } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import { FormField, FormFieldLabel } from '../forms/form-field/form-field.js';
import { Autocomplete, AutocompleteItem } from './autocomplete.js';
import { AutocompleteProps } from './types.js';

const meta = {
  title: 'Form/Autocomplete',
  parameters: {
    docs: {
      autoplay: false,
      description: {
        component:
          'Autocomplete component for selecting a value from a filtered list of options.',
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
} satisfies Meta<typeof Autocomplete>;

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
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    await userEvent.type(input, 'Backend', { delay: 100 });
    const option = await canvas.findByText('Backend Dev.');
    expect(option).toBeVisible();
    await userEvent.click(document.body);
  },
};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: '',
    children: [],
  },
  render: (props: AutocompleteProps) => (
    <FormField className="gi-w-56">
      <FormFieldLabel>With Default Value</FormFieldLabel>
      <Autocomplete {...props} defaultValue={options[1].value}>
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
    const input = canvas.getByRole('textbox');
    expect(input).toHaveValue('Backend Dev.');
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
    const input = canvas.getByRole('textbox');
    await userEvent.type(input, 'Test', { delay: 100 });
    const disabledOption = await canvas.findByText('Tester');
    expect(disabledOption).toBeVisible();
    const parentWithAria = disabledOption.closest('[aria-disabled]');
    expect(parentWithAria).toHaveAttribute('aria-disabled', 'true');
    await userEvent.click(document.body);
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
    const input = canvas.getByRole('textbox');
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
    const input = canvas.getByRole('textbox');
    expect(input).not.toBeDisabled();
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
          <AutocompleteItem
            key={name}
            value={name.toLowerCase()?.replace(/\s+/g, '-')}
          >
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
            const results = names
              .filter((name) =>
                name.toLowerCase().includes(query.toLowerCase()),
              )
              .slice(0, 10);
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
