import type { Meta, StoryObj } from '@storybook/angular';
import { within, expect } from 'storybook/test';
import { insetTextMeta, insetTextStories, InsetText } from '../atoms';

type InsetTextWithContent = InsetText & { content: string };

const meta = {
  ...insetTextMeta,
  title: 'Typography/InsetText',
  argTypes: {
    ...insetTextMeta.argTypes,
    content: {
      control: 'text',
      description: 'The inset text content.',
    },
  },
  component: InsetText,
} satisfies Meta<InsetTextWithContent>;

export default meta;

type Story = StoryObj<InsetTextWithContent>;

export const Default: Story = {
  args: {
    ...insetTextStories.default.args,
    content: insetTextStories.default.content,
  },
  render: (args) => ({
    props: args,
    template: `
      <inset-text
        [id]="id"
        [cite]="cite"
        [describedBy]="describedBy"
        [labelledBy]="labelledBy"
      >
        {{ content }}
      </inset-text>
    `,
  }),
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const contentText = args.content;

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
