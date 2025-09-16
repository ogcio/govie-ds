import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from 'storybook/test';
import { Icon } from '../icon/icon.js';
import { ErrorSize, ErrorText } from './error-text.js';

const meta = {
  title: 'Typography/ErrorText',
  parameters: {
    docs: {
      description: {
        component:
          'Use hint text alongside a form input for help that’s relevant to the majority of users, like how their information will be used, or where to find it.',
      },
    },
  },
  component: ErrorText,
} satisfies Meta<typeof ErrorText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    size: {
      control: 'radio',
      options: Object.values(ErrorSize),
      table: {
        category: 'Appearance',
        type: { summary: 'Size of label' },
        defaultValue: { summary: ErrorSize.Medium },
      },
    },
    text: {
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'Text of error' },
        defaultValue: { summary: 'Error' },
      },
    },
  },
  args: {
    text: 'Error',
    size: ErrorSize.Medium,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step(
      'should render error text with the correct content',
      async () => {
        const errorElement = canvas.getByText('Error');
        expect(errorElement).toBeTruthy();
        expect(errorElement.tagName).toBe('DIV');
      },
    );
  },
};

export const Small: Story = {
  args: {
    size: ErrorSize.Small,
    text: 'This is error text',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('should render error text with "sm" size', async () => {
      const errorElement = canvas.getByText('This is error text');
      expect(errorElement).toHaveClass('gi-error-text-sm');
    });
  },
};

export const Medium: Story = {
  args: {
    size: ErrorSize.Medium,
    text: 'This is error text',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('should render error text with "sm" size', async () => {
      const errorElement = canvas.getByText('This is error text');
      expect(errorElement).toHaveClass('gi-error-text-md');
    });
  },
};

export const Large: Story = {
  args: {
    size: ErrorSize.Large,
    text: 'This is error text',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('should render error text with "sm" size', async () => {
      const errorElement = canvas.getByText('This is error text');
      expect(errorElement).toHaveClass('gi-error-text-lg');
    });
  },
};

export const WithRichText: Story = {
  args: {
    size: ErrorSize.Medium,
    text: (
      <div className="gi-flex">
        Error message &nbsp;
        <Icon icon="error" />
      </div>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const error = canvas.getByText('Error message');
    expect(error).toHaveClass('gi-flex');
  },
};
