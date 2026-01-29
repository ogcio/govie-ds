import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { expect, userEvent, within } from 'storybook/test';
import { Button } from '../button/button.js';
import { CharacterCount } from '../character-count/character-count.js';
import {
  FormField,
  FormFieldError,
  FormFieldHint,
  FormFieldLabel,
} from '../forms/form-field/form-field.js';
import { TextArea } from './textarea.js';

const meta = {
  title: 'Form/TextArea',
  parameters: {
    docs: {
      description: {
        component:
          'Use the textarea component when you need to let users enter multi-line text, such as comments or a description. The `rows` and `cols` properties control the size of the textarea, while `error` can indicate validation errors.',
      },
    },
  },
  component: TextArea,
  argTypes: {
    rows: {
      description: 'The number of visible text lines in the textarea.',
      control: 'number',
      table: {
        category: 'Size',
        type: { summary: 'number' },
        defaultValue: { summary: '4' },
      },
    },
    cols: {
      description: 'The width of the textarea in terms of characters.',
      control: 'number',
      table: {
        category: 'Size',
        type: { summary: 'number' },
        defaultValue: { summary: '100' },
      },
    },
    autoComplete: {
      description:
        'Specifies whether the browser should provide auto-completion options for the textarea.',
      control: 'text',
      table: {
        category: 'Behavior',
        type: { summary: 'string' },
        defaultValue: { summary: 'on' },
      },
    },
    disabled: {
      description: 'Disable textarea',
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: { summary: 'Behavior' },
      },
    },
    iconStart: {
      description: 'Optional icon displayed at the start of the input field.',
      control: 'text',
      table: {
        category: 'Visual',
        type: { summary: 'IconId' },
      },
    },
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rows: 4,
    cols: 100,
    id: 'textarea-id-0',
  },
  render: (props) => (
    <FormField id="textarea-id-0">
      <FormFieldLabel htmlFor="textarea-id-0">Label</FormFieldLabel>
      <TextArea {...props} data-testid="textarea-id-0" />
    </FormField>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByTestId('textarea-id-0') as HTMLTextAreaElement;
    expect(textarea).toBeTruthy();
    expect(textarea.tagName).toBe('TEXTAREA');
    expect(textarea.cols).toBe(100);
    expect(textarea.rows).toBe(4);

    const remainingElement = canvas.queryByText(/^You have/);
    expect(remainingElement).not.toBeInTheDocument();
  },
};

export const Focus: Story = {
  render: () => (
    <FormField>
      <FormFieldLabel>Label</FormFieldLabel>
      <FormFieldHint>Support text</FormFieldHint>
      <TextArea
        className="focus-input"
        iconStart="placeholder"
        placeholder="Placeholder"
      />
    </FormField>
  ),
  parameters: {
    pseudo: {
      focus: '.focus-input',
    },
  },
};

export const WithTextInputReset: Story = {
  args: {
    id: 'text-area-id01',
  },
  render: () => {
    return (
      <FormField>
        <FormFieldLabel htmlFor="text-area-id01">Input Label</FormFieldLabel>
        <TextArea clearButtonEnabled placeholder="Placeholder" />
      </FormField>
    );
  },
};

export const WithLabelAndHint: Story = {
  args: {
    id: 'textarea-id-1',
    rows: 4,
    cols: 100,
  },
  render: (props) => (
    <FormField>
      <FormFieldLabel htmlFor="textarea-id-1">Label</FormFieldLabel>
      <FormFieldHint>Hint: This is a helpful hint.</FormFieldHint>
      <TextArea {...props} />
    </FormField>
  ),
};

export const WithLabelAndError: Story = {
  args: {
    id: 'textarea-id-2',
  },
  render: (props) => (
    <FormField>
      <FormFieldLabel htmlFor="textarea-id-2">Label</FormFieldLabel>
      <FormFieldError>Error: Please correct this issue.</FormFieldError>
      <TextArea {...props} />
    </FormField>
  ),
};

export const WithLabelHintAndError: Story = {
  args: {
    id: 'textarea-id-3',
  },
  render: (props) => (
    <FormField>
      <FormFieldLabel htmlFor="textarea-id-3">Label</FormFieldLabel>
      <FormFieldHint>Hint: This is a helpful hint.</FormFieldHint>
      <FormFieldError>Error: Please correct this issue.</FormFieldError>
      <TextArea {...props} data-testid="textarea-id-3" />
    </FormField>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const textarea = canvas.getByTestId('textarea-id-3') as HTMLTextAreaElement;
    expect(globalThis.window.getComputedStyle(textarea).borderColor).toBe(
      'rgb(187, 37, 13)', //'var(--gieds-color-red-600)',
    );

    const label = canvas.getByText('Label');
    expect(label).toBeTruthy();
    expect(label).toHaveClass('gi-label');
    expect(label.getAttribute('for')).toBe(textarea.getAttribute('id'));

    const hint = canvas.getByText('Hint: This is a helpful hint.');
    expect(hint).toBeTruthy();
    expect(hint).toHaveClass('gi-hint-text');

    const error = canvas.getByText('Error: Please correct this issue.');
    expect(error).toBeTruthy();
    expect(error).toHaveClass('gi-error-text');
  },
};

/**
 * @deprecated The `maxChars` prop is deprecated. Use the `CharacterCount` component instead.
 * This story is kept for backwards compatibility demonstration only.
 */
export const WithMaxChars: Story = {
  args: {
    id: 'textarea-id-5',
    maxChars: 30,
  },
  parameters: {
    docs: {
      description: {
        story:
          '**Deprecated:** The `maxChars` prop is deprecated. Use the `CharacterCount` component instead for better support with uncontrolled forms and React Hook Form.',
      },
    },
  },
  render: (props) => (
    <FormField>
      <FormFieldLabel htmlFor="textarea-id-5">Label</FormFieldLabel>
      <FormFieldHint>Hint: This is a helpful hint.</FormFieldHint>
      <TextArea {...props} data-testid="textarea-id-5" />
    </FormField>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const textarea = canvas.getByTestId('textarea-id-5') as HTMLTextAreaElement;

    expect(textarea.maxLength).toBe(30);

    const remainingElement = canvas.getByText(
      /You have 30 characters remaining/,
    );
    expect(remainingElement).toBeInTheDocument();
  },
};

export const Disabled: Story = {
  args: {
    id: 'textarea-id-5',
    disabled: true,
  },
  render: (props) => (
    <FormField>
      <FormFieldLabel htmlFor="textarea-id-5">Label</FormFieldLabel>
      <FormFieldHint>Hint: This is a helpful hint.</FormFieldHint>
      <TextArea {...props} />
    </FormField>
  ),
};

export const WithHalfWidth: Story = {
  args: {
    id: 'textarea-id-5',
    halfFluid: true,
  },
  render: (props) => (
    <FormField>
      <FormFieldLabel htmlFor="textarea-id-5">Label</FormFieldLabel>
      <TextArea {...props} />
    </FormField>
  ),
};

export const CustomRowsAndColumns: Story = {
  args: {
    id: 'textarea-id-4',
    rows: 6,
    cols: 40,
  },
  render: (props) => (
    <FormField>
      <FormFieldLabel htmlFor="textarea-id-4">Label</FormFieldLabel>
      <TextArea {...props} />
    </FormField>
  ),
};

export const Controlled: Story = {
  args: {
    id: 'textarea-controlled',
    rows: 4,
    cols: 50,
  },
  tags: ['skip-playwright'],
  parameters: {
    docs: {
      description: {
        story:
          'This example shows a controlled TextArea component where the value is managed by React state. The current value is displayed below the textarea and updates as the user types.',
      },
    },
  },
  render: (props) => {
    const [value, setValue] = useState('Initial value');

    return (
      <FormField>
        <FormFieldLabel htmlFor="textarea-controlled">
          Controlled Label
        </FormFieldLabel>
        <TextArea
          {...props}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          data-testid="textarea-controlled"
        />
        <FormFieldHint>Current: {value}</FormFieldHint>
      </FormField>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const textarea = canvas.getByTestId(
      'textarea-controlled',
    ) as HTMLTextAreaElement;

    expect(textarea.value).toBe('Initial value');

    await textarea.focus();
    await userEvent.clear(textarea);
    await userEvent.type(textarea, 'New controlled text');

    expect(textarea.value).toBe('New controlled text');

    const hint = canvas.getByText(/Current:/);
    expect(hint).toHaveTextContent('Current: New controlled text');
  },
};

export const Uncontrolled: Story = {
  args: {
    id: 'textarea-uncontrolled',
    rows: 4,
    cols: 50,
    placeholder: 'Type something here...',
  },
  tags: ['skip-playwright'],
  parameters: {
    docs: {
      description: {
        story:
          'This example shows an uncontrolled TextArea component where the value is managed internally by the component. The state is accessed via ref.',
      },
      source: {
        code: `
          import { useRef, useState } from 'react';
          import { TextArea } from './textarea';
          import {
            FormField,
            FormFieldLabel,
            FormFieldHint,
          } from '../forms/form-field/form-field';
          import { Button } from '../button/button';

          export function Example() {
            const ref = useRef<HTMLTextAreaElement>(null);
            const [value, setValue] = useState('');

            const handleShowValue = () => {
              if (ref.current) {
                setValue(ref.current.value);
              }
            };

            return (
              <FormField>
                <FormFieldLabel htmlFor="textarea-uncontrolled">
                  Uncontrolled Label
                </FormFieldLabel>
                <TextArea
                  id="textarea-uncontrolled"
                  ref={ref}
                  rows={4}
                  cols={50}
                  placeholder="Type something here..."
                  data-testid="textarea-uncontrolled"
                />
                <Button
                  className="gi-mt-1"
                  data-testid="show-value-button"
                  onClick={handleShowValue}
                >
                  Show Value
                </Button>
                <FormFieldHint data-testid="uncontrolled-output">
                  Value: {value}
                </FormFieldHint>
              </FormField>
            );
          }
        `.trim(),
      },
    },
  },
  render: (props) => {
    const ref = useRef<HTMLTextAreaElement>(null);
    const [value, setValue] = useState('');

    const handleShowValue = () => {
      if (ref.current) {
        setValue(ref.current.value);
      }
    };

    return (
      <FormField>
        <FormFieldLabel htmlFor="textarea-uncontrolled">
          Uncontrolled Label
        </FormFieldLabel>
        <TextArea
          {...props}
          ref={ref}
          clearButtonEnabled
          data-testid="textarea-uncontrolled"
        />
        <Button
          className="gi-mt-1"
          onClick={handleShowValue}
          dataTestid="show-value-button"
        >
          Show Value
        </Button>
        <FormFieldHint data-testid="uncontrolled-output">
          Value: {value}
        </FormFieldHint>
      </FormField>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const textarea = canvas.getByTestId(
      'textarea-uncontrolled',
    ) as HTMLTextAreaElement;

    await userEvent.type(textarea, 'Hello, world!');

    const button = canvas.getByTestId('show-value-button');
    await userEvent.click(button);

    const output = canvas.getByText('Value: Hello, world!');
    expect(output).toBeInTheDocument();
  },
};

export const WithReactHookForm: Story = {
  tags: ['skip-playwright'],
  render: () => {
    const methods = useForm<{ message: string }>({
      defaultValues: { message: '' },
    });
    const maxChars = 20;
    const message = methods.watch('message');

    const onSubmit = methods.handleSubmit(() => {
      methods.reset();
    });

    return (
      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <FormField data-testid="form-field-id">
            {methods.formState.errors.message && (
              <FormFieldError data-testid="error-msg">
                {methods.formState.errors.message.message}
              </FormFieldError>
            )}
            <FormFieldLabel htmlFor="textarea-id-0">Message</FormFieldLabel>

            <Controller
              name="message"
              control={methods.control}
              rules={{ required: 'Required' }}
              render={({ field }) => (
                <TextArea
                  id="textarea-id-0"
                  rows={4}
                  cols={100}
                  maxLength={maxChars}
                  clearButtonEnabled
                  data-testid="textarea-id-0"
                  {...field}
                />
              )}
            />
            <CharacterCount
              maxChars={maxChars}
              currentLength={message?.length ?? 0}
            />
          </FormField>

          <div className="gi-flex gi-flex-cols gi-gap-2 gi-pt-4">
            <Button type="submit" data-testid="submit-btn">
              Submit
            </Button>
            <Button
              type="button"
              onClick={() => methods.reset()}
              data-testid="reset-btn"
            >
              Reset
            </Button>
          </div>
        </form>
      </FormProvider>
    );
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const textAreaElement = canvas.getByTestId(
      'textarea-id-0',
    ) as HTMLTextAreaElement;
    const submitButton = canvas.getByTestId('submit-btn');
    const resetButton = canvas.getByTestId('reset-btn');

    await userEvent.click(submitButton);
    expect(canvas.getByTestId('error-msg')).toBeDefined();

    await userEvent.type(textAreaElement, 'Hello world');
    await userEvent.click(submitButton);
    expect(canvas.queryByTestId('error-msg')).toBeNull();

    const remainingBeforeReset = canvas.getByText(
      /^You have \d+ characters remaining$/,
    );
    expect(remainingBeforeReset).toBeTruthy();

    await userEvent.click(resetButton);
    expect(textAreaElement.value).toBe('');

    const remainingAfterReset = canvas.getByText(
      /^You have 20 characters remaining$/,
    );
    expect(remainingAfterReset).toBeTruthy();
  },
};
