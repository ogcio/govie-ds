import type { Meta, StoryObj } from '@storybook/react-vite';
import find from 'lodash/find';
import { extractRenderBody } from '@/test-utilities';
import { useState, type ComponentProps, type PropsWithChildren } from 'react';
import { useForm } from 'react-hook-form';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import { FormField, FormFieldLabel } from '@/forms/form-field/form-field';
import { Label } from '@/label/label';
import { ChipGroup } from '@/ChipGroup';
import { Autocomplete, AutocompleteItem, AutocompleteGroupItem } from './autocomplete';
import type { AutocompleteProps } from './types';
import Stack from '@/atoms/Stack';
import Grid from '@/atoms/Grid';

const meta = {
  title: 'Form/Autocomplete',
  parameters: {
    docs: {
      description: {
        component:
          'Autocomplete component for selecting a value from a filtered list of options. Pass options as `AutocompleteItem` children with a `value` and label. Type to filter the list, then select an option. Use `id` to associate the input with a form label.',
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
  render: (props: AutocompleteProps) => (
    <FormWrapper label="Autocomplete" className="gi-w-56">
      <Autocomplete {...props}>
        {options.map(({ value, label }) => (
          <AutocompleteItem value={value} key={`${label}-${value}`}>
            {label}
          </AutocompleteItem>
        ))}
      </Autocomplete>
    </FormWrapper>
  ),
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disables the autocomplete input.',
    },
    defaultValue: {
      control: 'text',
      description: 'The default selected value.',
    },
    freeSolo: {
      control: 'boolean',
      description: 'Allows typing freeform values not limited to the dropdown options.',
    },
    multiple: {
      control: 'boolean',
      description: 'Enables multi-select mode.',
    },
    isLoading: {
      control: 'boolean',
      description: 'Displays a loading spinner inside the dropdown.',
    },
    onChange: {
      action: 'changed',
      description: 'Callback triggered when the input value changes.',
    },
    onSelectItem: {
      action: 'selected',
      description: 'Callback triggered when an option is selected.',
    },
    onSelectChange: {
      action: 'selectChanged',
      description: 'Callback providing the array of selected values in multi-select mode.',
    },
  },
  args: {
    defaultValue: '',
    children: [],
    id: 'autocomplete-default-id',
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Disable the entire Autocomplete with the `disabled` prop — the input cannot be focused or opened, and no options can be selected. To disable individual options, set `disabled` on `AutocompleteItem`; those options stay visible in the list but cannot be selected.',
      },
    },
  },

  render: (props: AutocompleteProps) => (
    <Stack direction={'row'} gap={6}>
      <FormWrapper label="Disabled" className="gi-w-56">
        <Autocomplete {...props} disabled>
          {options.map(({ value, label }) => (
            <AutocompleteItem value={value} key={`${label}-${value}`}>
              {label}
            </AutocompleteItem>
          ))}
        </Autocomplete>
      </FormWrapper>
      <FormWrapper label="Disabled item" id="disabled-option">
        <Autocomplete {...props} value={options[1].value}>
          {options.map(({ value, label }, index) => (
            <AutocompleteItem disabled={index === 0} value={value} key={`${label}-${value}`}>
              {label}
            </AutocompleteItem>
          ))}
        </Autocomplete>
      </FormWrapper>
    </Stack>
  ),
};

export const Grouped: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Group related options with `AutocompleteGroupItem`. Pass a `label` for each group and nest `AutocompleteItem` children inside. Groups appear as labelled sections in the dropdown.',
      },
    },
  },
  render: (props: AutocompleteProps) => (
    <FormWrapper label="Grouped options" className="gi-w-56">
      <Autocomplete {...props}>
        <AutocompleteGroupItem label="Engineering">
          <AutocompleteItem value="frontend_dev">Frontend Dev.</AutocompleteItem>
          <AutocompleteItem value="backend_dev">Backend Dev.</AutocompleteItem>
          <AutocompleteItem value="fullstack_dev">Full Stack Dev.</AutocompleteItem>
          <AutocompleteItem value="devops_engineer">DevOps Engineer</AutocompleteItem>
        </AutocompleteGroupItem>
        <AutocompleteGroupItem label="Product">
          <AutocompleteItem value="product_manager">Product Manager</AutocompleteItem>
          <AutocompleteItem value="ui_ux_designer">UI/UX Designer</AutocompleteItem>
          <AutocompleteItem value="qa_engineer">QA Engineer</AutocompleteItem>
        </AutocompleteGroupItem>
        <AutocompleteGroupItem label="Data">
          <AutocompleteItem value="data_scientist">Data Scientist</AutocompleteItem>
        </AutocompleteGroupItem>
      </Autocomplete>
    </FormWrapper>
  ),
};

export const MultipleSelect: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Enable multi-select with the `multiple` prop. The input shows a count of selected values; use `clearAllLabel` to customise the clear-all action in the dropdown. To render selections as chips, keep controlled state with `selectedValues` and `onSelectChange`, map those values into `ChipGroup` items, and wire `onRemove` so removing a chip updates the same state. For overflow, pass `maxVisible` and `formatOverflow` to `ChipGroup` to collapse excess chips into a “+N more” label.',
      },
      source: {
        type: 'code',
        transform: extractRenderBody,
      },
    },
  },
  args: {
    children: [],
    selectedValues: ['label_1', 'label_2'],
    multiple: true,
  },

  render: function Render(props: AutocompleteProps) {
    const [chipsSelectedValues, setChipsSelectedValues] = useState<string[]>(['label_1', 'label_2', 'label_3']);
    const [chipsCollapseSelectedValues, setChipsCollapseSelectedValues] = useState<string[]>(
      labelOptions.map(({ value }) => value),
    );

    const chipsItems = chipsSelectedValues.map((value) => ({
      value,
      label: find(labelOptions, { value })?.label ?? value,
    }));
    const chipsCollapseItems = chipsCollapseSelectedValues.map((value) => ({
      value,
      label: find(labelOptions, { value })?.label ?? value,
    }));

    return (
      <Grid container columns={{ base: 4, md: 8, lg: 12 }} gap={6}>
        <Grid size={{ base: 4, md: 4, lg: 4 }} className="gi-min-h-[440px] gi-mb-12">
          <FormWrapper label="Multi Select" className="gi-w-full">
            <Autocomplete {...props} multiple clearAllLabel="Clear all selections">
              {labelOptions.map(({ value, label }) => (
                <AutocompleteItem value={value} key={value}>
                  {label}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          </FormWrapper>
        </Grid>

        <Grid size={{ base: 4, md: 4, lg: 4 }} className="gi-mb-12">
          <FormWrapper label="Multi Select (Chips)" className="gi-w-full">
            <Stack gap={3}>
              <Autocomplete
                {...props}
                multiple
                selectedValues={chipsSelectedValues}
                onSelectChange={setChipsSelectedValues}
                clearAllLabel="Clear all selections"
              >
                {labelOptions.map(({ value, label }) => (
                  <AutocompleteItem value={value} key={value}>
                    {label}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
              <ChipGroup
                items={chipsItems}
                onRemove={(valueToRemove) =>
                  setChipsSelectedValues(chipsSelectedValues.filter((value) => value !== valueToRemove))
                }
                ariaLabel="Selected items"
              />
            </Stack>
          </FormWrapper>
        </Grid>

        <Grid size={{ base: 4, md: 4, lg: 4 }} className="gi-mb-12">
          <FormWrapper label="Multi Select (Chips Collapse)" className="gi-w-full">
            <Stack gap={3}>
              <Autocomplete
                {...props}
                multiple
                selectedValues={chipsCollapseSelectedValues}
                onSelectChange={setChipsCollapseSelectedValues}
                clearAllLabel="Clear all selections"
              >
                {labelOptions.map(({ value, label }) => (
                  <AutocompleteItem value={value} key={value}>
                    {label}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
              <ChipGroup
                items={chipsCollapseItems}
                onRemove={(valueToRemove) =>
                  setChipsCollapseSelectedValues(chipsCollapseSelectedValues.filter((value) => value !== valueToRemove))
                }
                ariaLabel="Selected items"
                maxVisible={4}
                formatOverflow={(count) => `+${count} more`}
              />
            </Stack>
          </FormWrapper>
        </Grid>
      </Grid>
    );
  },
};

export const Loading: Story = {
  tags: ['skip-playwright'],
  parameters: {
    docs: {
      description: {
        story: 'Use `isLoading` to show a loading state in the dropdown while async search results are fetching.',
      },
      source: {
        type: 'code',
        transform: extractRenderBody,
      },
    },
  },
  render: function Render(_props) {
    const [isLoading, setIsLoading] = useState(true);
    const load = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };
    const handleOnClose = () => {
      // reset loading state
      setIsLoading(true);
    };
    return (
      <FormWrapper label="Async Search" className="gi-w-56">
        <Autocomplete onClose={handleOnClose} onOpen={load} isLoading={isLoading} {..._props}>
          {options.map(({ value, label }) => (
            <AutocompleteItem value={value} key={`${label}-${value}`}>
              {label}
            </AutocompleteItem>
          ))}
        </Autocomplete>
      </FormWrapper>
    );
  },
};

export const FreeSolo: Story = {
  tags: ['skip-playwright'],
  parameters: {
    docs: {
      description: {
        story:
          'Set `freeSolo` to allow values that are not in the dropdown. The typed text is kept in the input even when it does not match an option, and the chevron toggle is hidden.',
      },
    },
  },
  args: {
    freeSolo: true,
  },
  render: (props: AutocompleteProps) => (
    <FormWrapper label="With Free Solo" className="gi-w-56">
      <Autocomplete {...props}>
        {options.map(({ value, label }) => (
          <AutocompleteItem value={value} key={`${label}-${value}`}>
            {label}
          </AutocompleteItem>
        ))}
      </Autocomplete>
    </FormWrapper>
  ),
};

export const WithReactHookForm: Story = {
  tags: ['skip-playwright'],
  parameters: {
    docs: {
      description: {
        story:
          'Integrate with React Hook Form by spreading `register` onto Autocomplete. Selection and free-text changes propagate through the registered field; use `watch` to read the current value.',
      },
      source: {
        type: 'code',
        transform: extractRenderBody,
      },
    },
  },
  render: function Render() {
    const { register, watch } = useForm();

    const topicValue = watch('example');

    return (
      <div className="gi-flex gi-gap-4 gi-flex-col">
        <FormWrapper label="Select with watcher" className="gi-w-56">
          <Autocomplete {...register('example')}>
            {options.map(({ value, label }) => (
              <AutocompleteItem value={value} key={`${label}-${value}`}>
                {label}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        </FormWrapper>
        <Label>Watched value: {topicValue}</Label>
      </div>
    );
  },
};

const labelOptions = Array.from({ length: 8 }, (_, index) => ({
  value: `label_${index + 1}`,
  label: `Label ${index + 1}`,
}));

export const Interactions: Story = {
  tags: ['skip-playwright', 'interaction'],
  decorators: [
    (Story) => (
      <div className="gi-min-h-[800px]">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'End-to-end interaction coverage for Autocomplete variants in one canvas.',
      },
    },
  },
  render: function Render(props: AutocompleteProps) {
    const { register, watch } = useForm();
    const topicValue = watch('example');
    const [chipsSelectedValues, setChipsSelectedValues] = useState<string[]>([]);
    const [chipsCollapseSelectedValues, setChipsCollapseSelectedValues] = useState<string[]>([]);
    const [keyboardValue, setKeyboardValue] = useState('');

    const chipsItems = chipsSelectedValues.map((value) => ({
      value,
      label: find(labelOptions, { value })?.label ?? value,
    }));
    const chipsCollapseItems = chipsCollapseSelectedValues.map((value) => ({
      value,
      label: find(labelOptions, { value })?.label ?? value,
    }));

    return (
      <Grid container columns={{ base: 4, md: 8, lg: 12 }} gap={8}>
        <Grid size={{ base: 4, md: 2, lg: 3 }}>
          <FormWrapper label="Default" className="gi-w-full" data-testid="default">
            <Autocomplete {...props} id="autocomplete-default-id">
              {options.map(({ value, label }) => (
                <AutocompleteItem value={value} key={`${label}-${value}`}>
                  {label}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          </FormWrapper>
        </Grid>
        <Grid size={{ base: 4, md: 2, lg: 3 }}>
          <FormWrapper label="Empty item list" className="gi-w-full" data-testid="empty">
            <Autocomplete>{[]}</Autocomplete>
          </FormWrapper>
        </Grid>
        <Grid size={{ base: 4, md: 2, lg: 3 }}>
          <FormWrapper label="With Disabled" className="gi-w-full" data-testid="disabled">
            <Autocomplete {...props} disabled>
              {options.map(({ value, label }) => (
                <AutocompleteItem value={value} key={`${label}-${value}`}>
                  {label}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          </FormWrapper>
        </Grid>

        <Grid size={{ base: 4, md: 2, lg: 3 }}>
          <FormWrapper label="With Loading" className="gi-w-full" data-testid="loading">
            <Autocomplete isLoading>
              {options.map(({ value, label }) => (
                <AutocompleteItem value={value} key={`${label}-${value}`}>
                  {label}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          </FormWrapper>
        </Grid>

        <Grid size={{ base: 4, md: 2, lg: 3 }}>
          <FormWrapper label="With Disabled Options" className="gi-w-full" data-testid="disabled-options">
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
          </FormWrapper>
        </Grid>

        <Grid size={{ base: 4, md: 2, lg: 3 }}>
          <div data-testid="react-hook-form">
            <FormWrapper label="Select with watcher" className="gi-w-full">
              <Autocomplete {...register('example')}>
                {options.map(({ value, label }) => (
                  <AutocompleteItem value={value} key={`${label}-${value}`}>
                    {label}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
            </FormWrapper>
            <Label>Watched value: {topicValue}</Label>
          </div>
        </Grid>

        <Grid size={{ base: 4, md: 2, lg: 3 }}>
          <FormWrapper label="Multi Select" className="gi-w-full" data-testid="multiple">
            <Autocomplete {...props} multiple clearAllLabel="Clear all selections">
              {labelOptions.map(({ value, label }) => (
                <AutocompleteItem value={value} key={value}>
                  {label}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          </FormWrapper>
        </Grid>

        <Grid size={{ base: 4, md: 2, lg: 3 }}>
          <FormWrapper label="Multi Select (Chips)" className="gi-w-full" data-testid="multiple-chips">
            <Stack gap={3}>
              <Autocomplete
                {...props}
                multiple
                selectedValues={chipsSelectedValues}
                onSelectChange={setChipsSelectedValues}
                clearAllLabel="Clear all selections"
              >
                {labelOptions.map(({ value, label }) => (
                  <AutocompleteItem value={value} key={value}>
                    {label}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
              <ChipGroup
                items={chipsItems}
                onRemove={(valueToRemove) =>
                  setChipsSelectedValues(chipsSelectedValues.filter((value) => value !== valueToRemove))
                }
                ariaLabel="Selected items"
              />
            </Stack>
          </FormWrapper>
        </Grid>

        <Grid size={{ base: 4, md: 2, lg: 3 }}>
          <FormWrapper
            label="Multi Select (Chips Collapse)"
            className="gi-w-full"
            data-testid="multiple-chips-collapse"
          >
            <Stack gap={3}>
              <Autocomplete
                {...props}
                multiple
                selectedValues={chipsCollapseSelectedValues}
                onSelectChange={setChipsCollapseSelectedValues}
                clearAllLabel="Clear all selections"
              >
                {labelOptions.map(({ value, label }) => (
                  <AutocompleteItem value={value} key={value}>
                    {label}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
              <ChipGroup
                items={chipsCollapseItems}
                onRemove={(valueToRemove) =>
                  setChipsCollapseSelectedValues(chipsCollapseSelectedValues.filter((value) => value !== valueToRemove))
                }
                ariaLabel="Selected items"
                maxVisible={4}
                formatOverflow={(count) => `+${count} more`}
              />
            </Stack>
          </FormWrapper>
        </Grid>

        <Grid size={{ base: 4, md: 2, lg: 3 }}>
          <FormWrapper label="Keyboard" className="gi-w-full" data-testid="keyboard">
            <Autocomplete
              aria-label="Select"
              value={keyboardValue}
              onChange={(event: any) => setKeyboardValue(event.currentTarget.value)}
            >
              {Array.from({ length: 10 }, (_, index) => (
                <AutocompleteItem key={index} value={`value_${index}`}>
                  {`Option ${index}`}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          </FormWrapper>
        </Grid>
      </Grid>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const section = (testId: string) => within(canvas.getByTestId(testId));

    await step('Default', async () => {
      const input = section('default').getByRole('combobox');
      expect(input).toHaveAttribute('id', 'autocomplete-default-id');
      await userEvent.type(input, 'Backend', { delay: 100 });
      const option = await section('default').findByText('Backend Dev.');
      expect(option).toBeVisible();
      await userEvent.keyboard('{Escape}');
    });
    await step('Empty list', async () => {
      const field = section('empty');
      const input = field.getByRole('combobox');
      await userEvent.click(input);
      expect(field.getByText('No data found.')).toBeInTheDocument();
    });

    await step('With Disabled', async () => {
      const input = section('disabled').getByRole('combobox');
      expect(input).toBeDisabled();
    });

    await step('With Loading', async () => {
      const field = section('loading');
      const input = field.getByRole('combobox');

      await userEvent.click(input);
      await waitFor(
        () => {
          expect(field.getByRole('status')).toBeInTheDocument();
          expect(field.queryByRole('listbox')).not.toBeInTheDocument();
        },
        { timeout: 3000 },
      );
      await userEvent.keyboard('{Escape}');
    });

    await step('With Disabled Options', async () => {
      const field = section('disabled-options');
      const input = field.getByRole('combobox');
      await userEvent.type(input, 'Test', { delay: 100 });
      const disabledOption = await field.findByText('Tester');
      expect(disabledOption).toBeVisible();
      const parentWithAria = disabledOption.closest('[aria-disabled]');
      expect(parentWithAria).toHaveAttribute('aria-disabled', 'true');
      await userEvent.keyboard('{Escape}');
    });

    await step('With React Hook Form', async () => {
      const field = section('react-hook-form');
      const input = field.getByRole('combobox');
      await userEvent.type(input, 'Backend', { delay: 100 });
      const option = await field.findByText('Backend Dev.');
      expect(option).toBeVisible();
      await userEvent.click(option);
      const watchedValueLabel = await field.findByText(/Watched value:/);
      await waitFor(() => expect(watchedValueLabel).toHaveTextContent('Watched value: backend_dev'));
    });

    await step('With Multiple', async () => {
      const field = section('multiple');
      const input = field.getByRole('combobox');

      await userEvent.click(input);
      const firstOption = field.getByRole('option', { name: labelOptions[0].label });
      await userEvent.click(firstOption);
      await waitFor(() => {
        expect(firstOption).toHaveAttribute('aria-selected', 'true');
      });

      await userEvent.type(input, 'Label 8', { delay: 100 });
      await waitFor(() => {
        expect(field.getAllByRole('option').length).toBe(1);
      });

      const clearAllButton = field.getByRole('button', { name: /clear all/i });
      await userEvent.click(clearAllButton);
      await waitFor(
        () => {
          expect(field.getAllByRole('option').length).toBe(8);
          for (const option of field.getAllByRole('option')) {
            expect(option).toHaveAttribute('aria-selected', 'false');
          }
        },
        { timeout: 3000 },
      );

      const listbox = field.getByRole('listbox');
      expect(listbox).toHaveAttribute('aria-multiselectable', 'true');

      for (const option of field.getAllByRole('option')) {
        expect(option).toHaveAttribute('aria-selected');
      }

      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{Enter}');
      await waitFor(() => {
        expect(field.getByRole('option', { name: labelOptions[0].label })).toHaveAttribute('aria-selected', 'true');
      });
      expect(field.getByRole('listbox')).toBeInTheDocument();
      await waitFor(() => {
        expect(field.getByText('1')).toBeInTheDocument();
      });

      await userEvent.keyboard('{ArrowUp}');
      await userEvent.keyboard('{Enter}');
      await waitFor(() => {
        for (const option of field.getAllByRole('option')) {
          expect(option).toHaveAttribute('aria-selected', 'false');
        }
      });

      const optionToToggle = field.getByRole('option', { name: labelOptions[0].label });
      expect(optionToToggle).toHaveAttribute('aria-selected', 'false');
      await userEvent.click(optionToToggle);
      await waitFor(() => {
        expect(field.getByRole('option', { name: labelOptions[0].label })).toHaveAttribute('aria-selected', 'true');
      });
      expect(field.getByRole('listbox')).toBeInTheDocument();

      await userEvent.click(field.getByRole('option', { name: labelOptions[1].label }));
      await waitFor(() => {
        expect(field.getByText('2')).toBeInTheDocument();
      });
      await userEvent.keyboard('{Escape}');
    });

    await step('With Multiple Chips', async () => {
      const field = section('multiple-chips');
      const input = field.getByRole('combobox');

      await userEvent.click(input);
      await waitFor(() => {
        expect(field.getByRole('listbox')).toBeInTheDocument();
      });

      const firstOption = field.getByRole('option', { name: labelOptions[0].label });
      await userEvent.click(firstOption);
      await waitFor(() => {
        expect(firstOption).toHaveAttribute('aria-selected', 'true');
        expect(field.getAllByRole('button', { name: /remove chip/i }).length).toBe(1);
      });

      await userEvent.keyboard('{Escape}');
      await userEvent.click(field.getAllByRole('button', { name: /remove chip/i })[0]);
      await waitFor(() => {
        expect(field.queryByRole('button', { name: /remove chip/i })).not.toBeInTheDocument();
      });

      await userEvent.click(input);
      await waitFor(() => {
        expect(field.getByRole('option', { name: labelOptions[0].label })).toHaveAttribute('aria-selected', 'false');
      });

      for (const { label } of labelOptions) {
        const option = field.getByRole('option', { name: label });
        await userEvent.click(option);
        await waitFor(() => {
          expect(option).toHaveAttribute('aria-selected', 'true');
        });
      }

      await waitFor(() => {
        expect(field.getByText('8')).toBeInTheDocument();
      });
      await waitFor(() => {
        expect(field.getAllByRole('button', { name: /remove chip/i }).length).toBe(8);
      });
      expect(field.queryByText(/more/)).not.toBeInTheDocument();
      await userEvent.keyboard('{Escape}');
    });

    await step('With Multiple Chips Collapse', async () => {
      const field = section('multiple-chips-collapse');
      const input = field.getByRole('combobox');

      await userEvent.click(input);
      await waitFor(() => {
        expect(field.getByRole('listbox')).toBeInTheDocument();
      });

      for (let index = 1; index <= 6; index++) {
        const option = field.getByRole('option', { name: `Label ${index}` });
        await userEvent.click(option);
        await waitFor(() => {
          expect(option).toHaveAttribute('aria-selected', 'true');
        });
      }

      await userEvent.keyboard('{Escape}');
      await waitFor(() => {
        expect(field.getAllByRole('button', { name: /remove chip/i }).length).toBe(4);
      });
      expect(field.getByText('+2 more')).toBeInTheDocument();
    });

    await step('Keyboard Events', async () => {
      const field = section('keyboard');
      const input = field.getByRole('combobox');

      const expectOpen = async () => waitFor(() => expect(field.getByRole('listbox')).toBeInTheDocument());
      const expectClosed = async () => waitFor(() => expect(field.queryByRole('listbox')).toBeNull());

      input.focus();
      await userEvent.keyboard('{ArrowDown}');
      await expectOpen();
      const highlightedDown = field.getAllByRole('option').find((element) => element.dataset.highlighted === 'true');
      expect(highlightedDown).toBeTruthy();
      expect(highlightedDown).toHaveAttribute('data-testid', 'option-value_0');
      await userEvent.keyboard('{Esc}');

      input.focus();
      await userEvent.keyboard('{Enter}');
      await expectOpen();
      await userEvent.keyboard('{NumpadEnter}');
      await expectOpen();

      await userEvent.keyboard('{ArrowUp}');
      await expectOpen();
      const highlightedUp = field.getAllByRole('option').find((element) => element.dataset.highlighted === 'true');
      expect(highlightedUp).toBeTruthy();
      expect(highlightedUp).toHaveAttribute('data-testid', 'option-value_9');

      await userEvent.click(input);
      await expectOpen();
      await userEvent.tab();
      await expectClosed();

      await userEvent.click(input);
      await expectOpen();
      await userEvent.keyboard('{Escape}');
      await expectClosed();
    });
  },
};

const FormWrapper = ({
  children,
  label,
  className = 'gi-w-56',
  ...props
}: PropsWithChildren<ComponentProps<typeof FormField> & { label: string }>) => (
  <FormField className={className} {...props}>
    <FormFieldLabel>{label}</FormFieldLabel>
    {children}
  </FormField>
);
