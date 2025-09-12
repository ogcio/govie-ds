import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from 'storybook/test';
import { Blockquote } from './blockquote.js';

const meta = {
  title: 'Typography/Blockquote',
  parameters: {
    docs: {
      description: {
        component:
          'Inset text component to differentiate a block of text from the content that surrounds it.',
      },
    },
  },
  component: Blockquote,
} satisfies Meta<typeof Blockquote>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    children: {
      control: 'text',
      type: { name: 'string', required: true },
      description: 'The text or component within the blockquote.',
    },
    cite: {
      control: 'text',
      type: { name: 'string', required: false },
      description: 'The source URL or description for the quotation.',
    },
  },
  args: {
    children:
      'It can take up to 8 weeks to register a lasting power of attorney if there are no mistakes in the application.',
    cite: 'https://example.com/source',
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);

    await step('renders content and tag', async () => {
      const contentText =
        typeof args.children === 'string' ? args.children : '';
      const element = canvas.getByText(contentText);
      expect(element).toBeInTheDocument();
      expect(element.tagName.toLowerCase()).toBe('blockquote');
    });

    await step('renders cite attribute when provided', async () => {
      const contentText =
        typeof args.children === 'string' ? args.children : '';
      const element = canvas.getByText(contentText);
      if (args.cite) {
        expect(element).toHaveAttribute('cite', String(args.cite));
      } else {
        expect(element).not.toHaveAttribute('cite');
      }
    });
  },
};
