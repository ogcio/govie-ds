import type { Meta, StoryObj } from '@storybook/angular';
import { within, expect } from 'storybook/test';
import DsInsetText from '../../atoms/InsetText';

const meta: Meta<DsInsetText> = {
  title: 'Typography/InsetText',
  component: DsInsetText,
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: 'text',
      description: 'Optional id for linking/targeting and aria references.',
    },
    cite: {
      control: 'text',
      description: 'The source URL or description for the quotation.',
    },
    describedBy: {
      control: 'text',
      description:
        'Points to element id(s) whose content describes the inset text. Maps to `aria-describedby`.',
    },
    labelledBy: {
      control: 'text',
      description:
        'Points to element id(s) whose content labels the inset text. Maps to `aria-labelledby`.',
    },
  },
};

export default meta;
type Story = StoryObj<DsInsetText>;

const contentText =
  'It can take up to 8 weeks to register a lasting power of attorney if there are no mistakes in the application.';

export const Default: Story = {
  args: {
    id: 'inset-text-default',
    cite: 'https://example.com/source',
    describedBy: '',
    labelledBy: '',
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
