import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from 'storybook/test';
import { InsetText, insetTextStories, insetTextMeta } from '../atoms';

const meta = {
  ...insetTextMeta,
  title: 'Typography/InsetText',
  argTypes: {
    ...insetTextMeta.argTypes,
    children: {
      control: 'text',
      description: 'The inset text content.',
    },
  },
  component: InsetText,
} satisfies Meta<typeof InsetText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...insetTextStories.default.args,
    children: insetTextStories.default.content,
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const contentText = typeof args.children === 'string' ? args.children : '';

    await step('renders content and tag', async () => {
      const element = canvas.getByText(contentText);
      expect(element).toBeInTheDocument();
      expect(element.tagName.toLowerCase()).toBe('blockquote');
    });

    await step('renders cite attribute when provided', async () => {
      const element = canvas.getByText(contentText);
      if (args.cite) {
        expect(element).toHaveAttribute('cite', String(args.cite));
      } else {
        expect(element).not.toHaveAttribute('cite');
      }
    });

    await step('renders inset text styles', async () => {
      const element = canvas.getByText(contentText);
      expect(element).toHaveClass('gi-p-4');
      expect(element).toHaveClass('gi-border-l-2xl');
      expect(element).toHaveClass('gi-border-gray-500');
    });
  },
};
