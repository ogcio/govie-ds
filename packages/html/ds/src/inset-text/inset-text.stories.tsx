import type { Meta, StoryObj } from '@storybook/react-vite';
import parse from 'html-react-parser';
import { within, expect } from 'storybook/test';
import { InsetTextProps } from './types';

const meta: Meta<InsetTextProps> = {
  title: 'Typography/InsetText',
  parameters: {
    docs: {
      description: {
        component:
          'Inset text component to differentiate a block of text from the content that surrounds it.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<InsetTextProps>;

const createElement = (arguments_: InsetTextProps) => {
  const container = document.createElement('blockquote');
  container.className =
    'gi-p-4 gi-border-l-2xl gi-border-gray-500 gi-text-sm md:gi-text-md gi-not-prose';

  if (arguments_.id) {
    container.setAttribute('id', arguments_.id);
  }

  if (arguments_.cite) {
    container.setAttribute('cite', arguments_.cite);
  }

  if (arguments_.describedBy) {
    container.setAttribute('aria-describedby', arguments_.describedBy);
  }

  if (arguments_.labelledBy) {
    container.setAttribute('aria-labelledby', arguments_.labelledBy);
  }

  if (arguments_.content) {
    container.textContent = arguments_.content;
  }

  return parse(container.outerHTML) as React.ReactElement;
};

export const Default: Story = {
  argTypes: {
    id: {
      control: 'text',
      description: 'Optional id for linking/targeting and aria references.',
    },
    content: {
      control: 'text',
      description: 'The text content within the inset text.',
    },
    cite: {
      control: 'text',
      type: { name: 'string', required: false },
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
    content:
      'It can take up to 8 weeks to register a lasting power of attorney if there are no mistakes in the application.',
    cite: 'https://example.com/source',
    describedBy: '',
    labelledBy: '',
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);

    await step('renders content and tag', async () => {
      const element = canvas.getByText(args.content);
      expect(element).toBeInTheDocument();
      expect(element.tagName.toLowerCase()).toBe('blockquote');
    });

    await step('renders cite attribute when provided', async () => {
      const element = canvas.getByText(args.content);
      if (args.cite) {
        expect(element).toHaveAttribute('cite', String(args.cite));
      } else {
        expect(element).not.toHaveAttribute('cite');
      }
    });

    await step('renders inset text styles', async () => {
      const element = canvas.getByText(args.content);
      expect(element).toHaveClass('gi-p-4');
      expect(element).toHaveClass('gi-border-l-2xl');
      expect(element).toHaveClass('gi-border-gray-500');
    });
  },
};
