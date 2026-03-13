import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, expect } from 'storybook/test';
import InsetText from '../atoms/InsetText';

const meta = {
  title: 'Typography/InsetText',
  parameters: {
    docs: {
      description: {
        component:
          'Inset text component to differentiate a block of text from the content that surrounds it. Previously known as Blockquote — use InsetText going forward; Blockquote remains available for backward compatibility',
      },
    },
  },
  component: InsetText,
} satisfies Meta<typeof InsetText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
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
  args: {
    id: 'inset-text-default',
    children:
      'It can take up to 8 weeks to register a lasting power of attorney if there are no mistakes in the application.',
    cite: 'https://example.com/source',
    describedBy: '',
    labelledBy: '',
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
