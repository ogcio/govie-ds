import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import html from './error-text.html?raw';
import { ErrorSize, ErrorTextProps } from './error-text.schema';

const macro = { name: 'govieErrorText', html };

const ErrorText = renderComponent<ErrorTextProps>(macro);

const meta = {
  component: ErrorText,
  title: 'Typography/ErrorText',
  parameters: {
    macro,
    docs: {
      description: {
        component:
          'Error text is used to display error messages beneath form fields or other UI components when validation fails.',
      },
    },
  },
} satisfies Meta<typeof ErrorText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      table: {
        category: 'Appearance',
        type: { summary: 'Size of the error text' },
        defaultValue: { summary: 'md' },
      },
    },
    content: {
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'string' },
        defaultValue: { summary: 'This is error text' },
      },
    },
  },
  args: {
    size: ErrorSize.Medium,
    content: 'This is error text',
  },
};
