import type { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { expect, userEvent, within } from 'storybook/test';
import { Button } from '../button/button.js';
import { FormField, FormFieldLabel } from '../forms/form-field/form-field.js';
import { TextArea } from '../textarea/textarea.js';
import { CharacterCount } from './character-count.js';

const meta = {
  title: 'Form/CharacterCount',
  parameters: {
    docs: {
      description: {
        component:
          'CharacterCount displays the remaining character count for form inputs.',
      },
    },
  },
  component: CharacterCount,
  argTypes: {
    maxChars: {
      description: 'The maximum number of characters allowed.',
      control: 'number',
      table: {
        category: 'Props',
        type: { summary: 'number' },
      },
    },
    value: {
      description: 'The current text value.',
      control: 'text',
      table: {
        category: 'Props',
        type: { summary: 'string' },
      },
    },
  },
} satisfies Meta<typeof CharacterCount>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithTextArea: Story = {
  args: {
    maxChars: 30,
    value: '',
  },
  parameters: {
    docs: {
      description: {
        story:
          'This example shows CharacterCount with React Hook Form. Using `watch()` ensures the character count stays in sync even after `reset()` is called.',
      },
    },
  },
  render: () => {
    const methods = useForm<{ message: string }>({
      defaultValues: { message: '' },
    });
    const maxChars = 30;
    const message = methods.watch('message');

    const onSubmit = methods.handleSubmit(() => {
      methods.reset();
    });

    return (
      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <FormField>
            <FormFieldLabel htmlFor="textarea-id">Message</FormFieldLabel>
            <TextArea
              id="textarea-id"
              maxLength={maxChars}
              data-testid="textarea-id"
              {...methods.register('message')}
            />
            <CharacterCount maxChars={maxChars} value={message ?? ''} />
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
      'textarea-id',
    ) as HTMLTextAreaElement;
    const resetButton = canvas.getByTestId('reset-btn');

    const remainingBeforeType = canvas.getByText(
      /^You have 30 characters remaining$/,
    );
    expect(remainingBeforeType).toBeTruthy();

    await userEvent.type(textAreaElement, 'Hello world');

    const remainingAfterType = canvas.getByText(
      /^You have 19 characters remaining$/,
    );
    expect(remainingAfterType).toBeTruthy();

    await userEvent.click(resetButton);
    expect(textAreaElement.value).toBe('');

    const remainingAfterReset = canvas.getByText(
      /^You have 30 characters remaining$/,
    );
    expect(remainingAfterReset).toBeTruthy();
  },
};
