import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { expect, userEvent, waitFor, within } from 'storybook/test';
import { Button } from '../button/button.js';
import {
  FormField,
  FormFieldError,
  FormFieldHint,
  FormFieldLabel,
} from '../forms/form-field/form-field.js';
import { Label } from '../label/label.js';
import {
  SelectGroupItemNext,
  SelectItemNext,
  SelectNext,
} from './select-next.js';

const topics = Array.from({ length: 8 }, (_, index) => ({
  value: `topic_${index + 1}`,
  label: `Topic ${index + 1}`,
}));

const meta = {
  title: 'Form/Select/SelectNext',
  parameters: {
    docs: {
      description: {
        component:
          'A composable select component allows users to choose an option from a long list.',
      },
    },
  },
  argTypes: {
    children: {
      description:
        'SelectItemNext or SelectGroupItemNext elements that define the options.',
      control: false,
      table: {
        category: 'Content',
        type: { summary: 'React.ReactNode' },
      },
    },
    defaultValue: {
      description: 'Initial selected option value.',
      control: 'text',
      table: {
        category: 'Behavior',
        type: { summary: 'string' },
      },
    },
    onChange: {
      description: 'Callback when an item is selected.',
      action: 'onChange',
      table: {
        category: 'Events',
        type: { summary: '(event) => void' },
      },
    },
    onMenuClose: {
      description: 'Callback when the dropdown menu closes.',
      action: 'onMenuClose',
      table: {
        category: 'Events',
        type: { summary: '() => void' },
      },
    },
    enableSearch: {
      description: 'Enables a search input for filtering options.',
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
      },
    },
    disabled: {
      description: 'Disables the select component.',
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
      },
    },
  },
  component: SelectNext,
  decorators: [
    (Story) => (
      <div className="gi-h-[290px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SelectNext>;

export default meta;

export const Default: StoryObj = {
  render: () => {
    return (
      <FormField className="gi-w-56">
        <FormFieldLabel>Label</FormFieldLabel>
        <SelectNext aria-label="Select" defaultValue="select-option">
          <SelectItemNext value="select-option" hidden>
            Select Option
          </SelectItemNext>
          <SelectItemNext value="value-1">Option 1</SelectItemNext>
          <SelectItemNext value="value-2">Option 2</SelectItemNext>
          <SelectItemNext value="value-3">Option 3</SelectItemNext>
        </SelectNext>
      </FormField>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);
    const input = canvas.getByRole('textbox');
    await waitFor(() => {
      expect(input).toHaveValue('Select Option');
    });
    await waitFor(() => {
      expect(canvas.getByText('keyboard_arrow_down')).toBeInTheDocument();
    });

    await userEvent.click(input);
    await waitFor(() => {
      expect(canvas.getByRole('listbox')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(canvas.getByText('keyboard_arrow_up')).toBeInTheDocument();
    });

    const list = await canvas.findByRole('listbox');
    const options = within(list).getAllByRole('option');
    expect(options.map((opt) => opt.textContent)).toEqual([
      'Option 1',
      'Option 2',
      'Option 3',
    ]);
    await userEvent.click(input);

    const option = await body.findByRole('option', { name: 'Option 1' });
    const style = globalThis.getComputedStyle(option as HTMLElement);
    expect(style.fontSize).toBe('16px');
  },
};

export const Focus = {
  render: () => (
    <FormField className="gi-w-56">
      <FormFieldLabel htmlFor="focus-select">Label</FormFieldLabel>
      <SelectNext
        id="focus-select"
        aria-label="Select"
        className="focus-select"
        defaultValue="value-3"
      >
        <SelectItemNext value="select-option" hidden>
          Select Option
        </SelectItemNext>
        <SelectItemNext value="value-1">Option 1</SelectItemNext>
        <SelectItemNext value="value-2">Option 2</SelectItemNext>
        <SelectItemNext value="value-3">Option 3</SelectItemNext>
      </SelectNext>
    </FormField>
  ),
  parameters: {
    pseudo: {
      focus: '.focus-select',
    },
  },
};

export const WithLabelHintAndError = {
  render: () => (
    <FormField className="gi-w-56">
      <FormFieldLabel htmlFor="select">Label</FormFieldLabel>
      <FormFieldHint>This is a hint</FormFieldHint>
      <FormFieldError>This is an error</FormFieldError>
      <SelectNext
        aria-label="Select"
        data-testid="select"
        id="select"
        defaultValue="select-option"
      >
        <SelectItemNext value="select-option" hidden>
          Select Option
        </SelectItemNext>
        <SelectItemNext value="value-1">Option 1</SelectItemNext>
        <SelectItemNext value="value-2">Option 2</SelectItemNext>
        <SelectItemNext value="value-3">Option 3</SelectItemNext>
      </SelectNext>
    </FormField>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLCanvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('This is a hint')).toBeInTheDocument();
    expect(canvas.getByText('This is an error')).toBeInTheDocument();
  },
};

export const WithoutLabel = {
  render: () => (
    <FormField className="gi-w-56">
      <SelectNext aria-label="Select" defaultValue="select-option">
        <SelectItemNext value="select-option" hidden>
          Select Option
        </SelectItemNext>
        <SelectItemNext value="value-1">Option 1</SelectItemNext>
        <SelectItemNext value="value-2">Option 2</SelectItemNext>
        <SelectItemNext value="value-3">Option 3</SelectItemNext>
      </SelectNext>
    </FormField>
  ),
};

export const DisabledSelect = {
  render: () => (
    <FormField className="gi-w-56">
      <SelectNext aria-label="Select" defaultValue="select-option" disabled>
        <SelectItemNext value="select-option" hidden>
          Select Option
        </SelectItemNext>
        <SelectItemNext value="value-1">Option 1</SelectItemNext>
        <SelectItemNext value="value-2">Option 2</SelectItemNext>
        <SelectItemNext value="value-3">Option 3</SelectItemNext>
      </SelectNext>
    </FormField>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLCanvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    expect(input).toBeDisabled();
  },
};

export const DisabledItem = {
  render: () => (
    <FormField className="gi-w-56">
      <SelectNext aria-label="Select" defaultValue="select-option">
        <SelectItemNext value="select-option" hidden>
          Select Option
        </SelectItemNext>
        <SelectItemNext disabled value="value-1">
          Option 1
        </SelectItemNext>
        <SelectItemNext value="value-2">Option 2</SelectItemNext>
        <SelectItemNext value="value-3">Option 3</SelectItemNext>
      </SelectNext>
    </FormField>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLCanvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    await userEvent.click(input);

    const list = await canvas.findByRole('listbox');
    const options = within(list).getAllByRole('option');

    expect(options).toHaveLength(3);
    expect(options[0]).toHaveAttribute('aria-disabled', 'true');
    expect(options[1]).not.toHaveAttribute('aria-disabled');
    expect(options[2]).not.toHaveAttribute('aria-disabled');
  },
};

export const WithSearchEnabled: StoryObj = {
  render: () => (
    <FormField className="gi-w-56">
      <FormFieldLabel>Label</FormFieldLabel>
      <SelectNext aria-label="Select" enableSearch>
        <SelectItemNext value="select-option" hidden>
          Select Option
        </SelectItemNext>
        <SelectItemNext value="value-1">Option 1</SelectItemNext>
        <SelectItemNext value="value-2">Option 2</SelectItemNext>
        <SelectItemNext value="value-3">Option 3</SelectItemNext>
      </SelectNext>
    </FormField>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    await userEvent.click(input);

    const searchBox = canvas.getByPlaceholderText('Type to Search');
    await userEvent.type(searchBox, 'Option 2');

    const list = await canvas.findByRole('listbox');

    await waitFor(() => {
      const options = within(list).getAllByRole('option');
      expect(options).toHaveLength(1);
      expect(options[0]).toHaveTextContent('Option 2');
    });
  },
};

export const WithGroups = {
  render: () => (
    <FormField className="gi-w-56">
      <FormFieldLabel>Label</FormFieldLabel>
      <SelectNext
        aria-label="Select"
        data-testid="select"
        defaultValue="value-1"
        enableSearch
      >
        <SelectGroupItemNext label="Group 1" data-testid="select-group">
          <SelectItemNext value="value-1">Option 1</SelectItemNext>
          <SelectItemNext value="value-2">Option 2</SelectItemNext>
          <SelectItemNext value="value-3">Option 3</SelectItemNext>
        </SelectGroupItemNext>
        <SelectGroupItemNext label="Group 2">
          <SelectItemNext value="value-7">Option 7</SelectItemNext>
          <SelectItemNext value="value-8">Option 8</SelectItemNext>
          <SelectItemNext value="value-9">Option 9</SelectItemNext>
        </SelectGroupItemNext>
      </SelectNext>
    </FormField>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLCanvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    await userEvent.click(input);

    await waitFor(() => {
      expect(canvas.getByRole('listbox')).toBeInTheDocument();
    });

    expect(canvas.getByText('Group 1')).toBeInTheDocument();
    expect(canvas.getByText('Group 2')).toBeInTheDocument();
    expect(canvas.getByText('Option 1')).toBeInTheDocument();
    expect(canvas.getByText('Option 8')).toBeInTheDocument();
  },
};

export const Controlled: StoryObj = {
  tags: ['skip-playwright'],
  render: () => {
    const [value, setValue] = useState('value-2');

    return (
      <div className="gi-flex gi-gap-4 gi-flex-col">
        <FormField className="gi-w-56">
          <FormFieldLabel>Controlled Select</FormFieldLabel>
          <SelectNext
            aria-label="Select"
            id="select-controlled"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          >
            <SelectItemNext value="select-option" hidden>
              Select Option
            </SelectItemNext>
            <SelectItemNext value="value-1">Option 1</SelectItemNext>
            <SelectItemNext value="value-2">Option 2</SelectItemNext>
            <SelectItemNext value="value-3">Option 3</SelectItemNext>
          </SelectNext>
        </FormField>
        <Label>Controlled value: {value}</Label>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');

    await waitFor(() => {
      expect(input).toHaveValue('Option 2');
    });

    await userEvent.click(input);

    const list = await canvas.findByRole('listbox');
    const options = within(list).getAllByRole('option');

    await userEvent.click(options[2]);

    await waitFor(() => {
      expect(input).toHaveValue('Option 3');
    });
  },
};

export const WithLongList: StoryObj = {
  render: () => {
    return (
      <FormField className="gi-w-56">
        <FormFieldLabel>Long List Select</FormFieldLabel>
        <SelectNext aria-label="Select" id="select-controlled">
          {topics.map(({ label, value }) => (
            <SelectItemNext key={value} value={value}>
              {label}
            </SelectItemNext>
          ))}
        </SelectNext>
      </FormField>
    );
  },
};

export const WithLongListSearchEnabled: StoryObj = {
  render: () => {
    return (
      <FormField className="gi-w-56">
        <FormFieldLabel>Long List Select Search</FormFieldLabel>
        <SelectNext aria-label="Select" id="select-controlled" enableSearch>
          {topics.map(({ label, value }) => (
            <SelectItemNext key={value} value={value}>
              {label}
            </SelectItemNext>
          ))}
        </SelectNext>
      </FormField>
    );
  },
};

export const WithReactHookForm: StoryObj = {
  tags: ['skip-playwright'],
  render: () => {
    const { control, watch, reset } = useForm({
      defaultValues: { topic: '' },
      mode: 'onBlur',
    });

    const topicValue = watch('topic');

    return (
      <div className="gi-flex gi-gap-4 gi-flex-col">
        <FormField className="gi-w-[300px]">
          <FormFieldLabel>Select with React Hook Form</FormFieldLabel>

          <Controller
            control={control}
            name="topic"
            rules={{
              required: 'Topic is required',
              validate: (value) =>
                value !== 'topic_5' || 'Topic 5 is not allowed',
            }}
            render={({ field, fieldState }) => (
              <>
                {fieldState.error?.message && (
                  <FormFieldError>{fieldState.error.message}</FormFieldError>
                )}
                <SelectNext
                  aria-label="Select"
                  id="select-rhf"
                  enableSearch={false}
                  aria-invalid={!!fieldState.error}
                  name={field.name}
                  value={field.value ?? ''}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  ref={field.ref as any}
                >
                  <SelectItemNext value="">Select a topic</SelectItemNext>
                  {topics.map(({ value, label }) => (
                    <SelectItemNext key={value} value={value}>
                      {label}
                    </SelectItemNext>
                  ))}
                </SelectNext>
              </>
            )}
          />
        </FormField>

        <Label className="gi-font-bold">
          Watched value: {topicValue || '—'}
        </Label>
        <Label>Validation included (topic_5 is not allowed)</Label>

        <Button type="button" onClick={() => reset()} className="gi-w-fit">
          Reset
        </Button>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const getWatched = () => canvas.getByText(/Watched value:/i);
    const openAndSelect = async (label: string) => {
      await userEvent.click(await canvas.findByRole('textbox'));
      const option = await canvas.findByRole('option', { name: label });
      await userEvent.click(option);
    };

    await expect(getWatched()).toHaveTextContent('—');

    const input = await canvas.findByRole('textbox');
    await userEvent.click(input);

    await userEvent.click(document.body);

    await canvas.findByText('Topic is required');
    await openAndSelect('Topic 5');

    const resetButton = await canvas.findByRole('button', { name: /reset/i });

    await waitFor(() => expect(getWatched()).toHaveTextContent('topic_5'));
    await canvas.findByText('Topic 5 is not allowed');

    await openAndSelect('Topic 7');
    await waitFor(() => {
      expect(
        canvas.queryByText('Topic 5 is not allowed'),
      ).not.toBeInTheDocument();
      expect(canvas.queryByText('Topic is required')).not.toBeInTheDocument();
      expect(getWatched()).toHaveTextContent('topic_7');
    });

    await userEvent.click(resetButton);

    await waitFor(() => {
      expect(getWatched()).toHaveTextContent('—');
      expect(
        canvas.queryByText('Topic 5 is not allowed'),
      ).not.toBeInTheDocument();
      expect(canvas.queryByText('Topic is required')).not.toBeInTheDocument();
    });
    await userEvent.click(resetButton);
    await userEvent.click(document.body);
  },
};

export const TestNoSubmitOnEnter: StoryObj<typeof SelectNext> = {
  tags: ['skip-playwright'],
  render: () => {
    const [submitCountOn, setSubmitCountOn] = useState(0);
    const [submitCountOff, setSubmitCountOff] = useState(0);

    const { control: controlOn } = useForm({
      defaultValues: { topic: '' },
      mode: 'onBlur',
    });
    const { control: controlOff } = useForm({
      defaultValues: { topic: '' },
      mode: 'onBlur',
    });

    const handleSubmitOn = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setSubmitCountOn((c) => c + 1);
    };
    const handleSubmitOff = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setSubmitCountOff((c) => c + 1);
    };

    return (
      <div className="gi-flex gi-gap-12">
        <form
          onSubmit={handleSubmitOn}
          data-testid="form-search-on"
          className="gi-flex gi-flex-col gi-gap-4 gi-w-72"
        >
          <FormField className="gi-w-56">
            <FormFieldLabel>Label (Search ON)</FormFieldLabel>
            <Controller
              control={controlOn}
              name="topic"
              render={({ field }) => (
                <SelectNext
                  id="repro-select-on"
                  name={field.name}
                  enableSearch
                  aria-label="Select"
                  value={field.value ?? ''}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  ref={field.ref as any}
                >
                  <SelectItemNext value="value-1">Option 1</SelectItemNext>
                  <SelectItemNext value="value-2">Option 2</SelectItemNext>
                  <SelectItemNext value="value-3">Option 3</SelectItemNext>
                </SelectNext>
              )}
            />
          </FormField>
          <div data-testid="submit-count-on" className="gi-invisible">
            {submitCountOn}
          </div>
        </form>

        <form
          onSubmit={handleSubmitOff}
          data-testid="form-search-off"
          className="gi-flex gi-flex-col gi-gap-4 gi-w-72"
        >
          <FormField className="gi-w-56">
            <FormFieldLabel>Label (Search OFF)</FormFieldLabel>
            <Controller
              control={controlOff}
              name="topic"
              render={({ field }) => (
                <SelectNext
                  id="repro-select-off"
                  name={field.name}
                  aria-label="Select"
                  value={field.value ?? ''}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  ref={field.ref as any}
                >
                  <SelectItemNext value="value-1">Option 1</SelectItemNext>
                  <SelectItemNext value="value-2">Option 2</SelectItemNext>
                  <SelectItemNext value="value-3">Option 3</SelectItemNext>
                </SelectNext>
              )}
            />
          </FormField>
          <div data-testid="submit-count-off" className="gi-invisible">
            {submitCountOff}
          </div>
        </form>
      </div>
    );
  },

  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const formOn = await canvas.findByTestId('form-search-on');
    const formOff = await canvas.findByTestId('form-search-off');
    const on = within(formOn);
    const off = within(formOff);

    const submitCountOn = await on.findByTestId('submit-count-on');
    const submitCountOff = await off.findByTestId('submit-count-off');
    const inputOn = await on.findByRole('textbox', { name: /select/i });
    const inputOff = await off.findByRole('textbox', { name: /select/i });

    await step(
      '[Search ON] keyboard: Enter on focused select opens popover without submitting',
      async () => {
        await userEvent.tab();
        await expect(inputOn).toHaveFocus();
        await userEvent.keyboard('{Enter}');
        await expect(submitCountOn).toHaveTextContent('0');
        await userEvent.keyboard('{Esc}');
        await waitFor(() => {
          expect(canvas.queryByRole('dialog', { name: /popover/i })).toBeNull();
        });
      },
    );

    await step(
      '[Search ON] mouse: Enter after clicking select does not submit the form',
      async () => {
        await userEvent.click(inputOn);
        await waitFor(() => {
          expect(
            canvas.getByRole('dialog', { name: /popover/i }),
          ).toBeInTheDocument();
        });
        await userEvent.keyboard('{Enter}');
        await expect(submitCountOn).toHaveTextContent('0');
        await userEvent.keyboard('{Esc}');
        await waitFor(() => {
          expect(canvas.queryByRole('dialog', { name: /popover/i })).toBeNull();
        });
      },
    );

    await step(
      '[Search ON] keyboard: type filter then ArrowDown + Enter selects without submitting',
      async () => {
        await userEvent.click(inputOn);
        await waitFor(() => {
          expect(
            canvas.getByRole('dialog', { name: /popover/i }),
          ).toBeInTheDocument();
        });
        await userEvent.type(inputOn, 'Option 1');
        await userEvent.keyboard('{ArrowDown}{Enter}');
        await expect(submitCountOn).toHaveTextContent('0');
        await userEvent.keyboard('{Esc}');
        await waitFor(() => {
          expect(canvas.queryByRole('dialog', { name: /popover/i })).toBeNull();
        });
      },
    );

    await step(
      '[Search OFF] keyboard: Enter on focused select opens popover without submitting',
      async () => {
        await userEvent.tab();
        await userEvent.tab();
        await expect(inputOff).toHaveFocus();
        await userEvent.keyboard('{Enter}');
        await expect(submitCountOff).toHaveTextContent('0');
        await userEvent.keyboard('{Esc}');
        await waitFor(() => {
          expect(canvas.queryByRole('dialog', { name: /popover/i })).toBeNull();
        });
      },
    );

    await step(
      '[Search OFF] mouse: Enter after clicking select does not submit the form',
      async () => {
        await userEvent.click(inputOff);
        await waitFor(() => {
          expect(
            canvas.getByRole('dialog', { name: /popover/i }),
          ).toBeInTheDocument();
        });
        await userEvent.keyboard('{Enter}');
        await expect(submitCountOff).toHaveTextContent('0');
        await userEvent.keyboard('{Esc}');
        await waitFor(() => {
          expect(canvas.queryByRole('dialog', { name: /popover/i })).toBeNull();
        });
      },
    );

    await step(
      '[Search OFF] keyboard: ArrowDown + Enter selects without submitting',
      async () => {
        await userEvent.click(inputOff);
        await waitFor(() => {
          expect(
            canvas.getByRole('dialog', { name: /popover/i }),
          ).toBeInTheDocument();
        });
        await userEvent.keyboard('{ArrowDown}{Enter}');
        await expect(submitCountOff).toHaveTextContent('0');
        await userEvent.keyboard('{Esc}');
        await waitFor(() => {
          expect(canvas.queryByRole('dialog', { name: /popover/i })).toBeNull();
        });
      },
    );
  },
};

export const TestKeyboardEvents: StoryObj<typeof SelectNext> = {
  tags: ['skip-playwright'],
  render: () => {
    const [value, setValue] = useState('');
    return (
      <FormField className="gi-w-56">
        <FormFieldLabel>Label</FormFieldLabel>
        <SelectNext
          aria-label="Select"
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
        >
          {Array.from({ length: 10 }, (_, index) => (
            <SelectItemNext key={index} value={`value_${index}`}>
              {`Option ${index}`}
            </SelectItemNext>
          ))}
        </SelectNext>
      </FormField>
    );
  },

  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = await canvas.findByRole('textbox', { name: /select/i });

    const expectOpen = async () =>
      waitFor(() => expect(canvas.getByRole('listbox')).toBeInTheDocument());
    const expectClosed = async () =>
      waitFor(() => expect(canvas.queryByRole('listbox')).toBeNull());

    await step('ArrowDown opens and moves highlight', async () => {
      input.focus();
      await userEvent.keyboard('{ArrowDown}');
      await expectOpen();
      const highlighted = canvas
        .getAllByRole('option')
        .find((element) => element.dataset.highlighted === 'true');
      await expect(highlighted).toBeTruthy();
      await expect(highlighted).toHaveAttribute(
        'data-testid',
        'option-value_0',
      );
      await userEvent.keyboard('{Esc}');
    });

    await step('Enter opens menu', async () => {
      input.focus();
      await userEvent.keyboard('{Enter}');
      await expectOpen();
      await userEvent.keyboard('{Esc}');
    });
    await step('NumpadEnter opens menu', async () => {
      input.focus();
      await userEvent.keyboard('{NumpadEnter}');
      await expectOpen();
      await userEvent.keyboard('{Esc}');
    });

    await step('ArrowUp opens menu and moves highlight', async () => {
      await userEvent.keyboard('{ArrowUp}');
      await expectOpen();
      const highlighted = canvas
        .getAllByRole('option')
        .find((element) => element.dataset.highlighted === 'true');
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

    await step('Enter selects a value', async () => {
      input.focus();
      await userEvent.keyboard('{Enter}');
      await expectOpen();
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{Enter}');
      await waitFor(() => {
        expect(input).toHaveValue('Option 1');
      });
    });
  },
};
