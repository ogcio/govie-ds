import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from 'storybook/test';
import InsetText from '../atoms/InsetText';
import {
  insetTextMeta,
  Default as insetTextDefault,
} from '../atoms/storybook/InsetText.meta';

const meta: Meta<typeof InsetText> = {
  ...insetTextMeta,
  title: 'Typography/InsetText',
  component: InsetText,
};

export default meta;

export const Default: StoryObj<typeof InsetText> = {
  ...insetTextDefault,
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
