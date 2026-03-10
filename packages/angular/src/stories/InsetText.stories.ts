import type { Meta, StoryObj } from '@storybook/angular';
import { within, expect } from 'storybook/test';
import InsetText from '../atoms/InsetText';
import {
  meta as insetTextMeta,
  stories as insetTextStories,
} from '../atoms/InsetText.meta';

const meta = {
  ...insetTextMeta,
  title: 'Typography/InsetText',
  component: InsetText,
} satisfies Meta<InsetText>;

export default meta;

type Story = StoryObj<InsetText>;

const contentText =
  'It can take up to 8 weeks to register a lasting power of attorney if there are no mistakes in the application.';

export const Default: Story = {
  args: insetTextStories.default.args,
  render: (args) => ({
    props: args,
    template: `
      <inset-text
        [id]="id"
        [cite]="cite"
        [describedBy]="describedBy"
        [labelledBy]="labelledBy"
      >
        ${contentText}
      </inset-text>
    `,
  }),
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);

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
