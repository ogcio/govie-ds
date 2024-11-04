import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import html from './hint-text.html?raw';
import { HintSize, HintTextProps } from './hint-text.schema';

const path = import.meta.url.split('/hint-text')[0];

const macro = { name: 'govieHintText', html, path };

const HintText = renderComponent<HintTextProps>(macro);

const meta = {
  component: HintText,
  title: 'Typography/HintText',
  parameters: {
    macro,
    docs: {
      description: {
        component:
          'Hint text used to provide additional context or help under form fields or other UI elements.',
      },
    },
  },
} satisfies Meta<typeof HintText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    content: {
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'string' },
        defaultValue: { summary: 'This is hint text' },
      },
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      table: {
        category: 'Appearance',
        type: { summary: 'Size of the hint text' },
        defaultValue: { summary: 'md' },
      },
    },
  },
  args: {
    size: HintSize.md,
    content: 'This is hint text',
  },
};
