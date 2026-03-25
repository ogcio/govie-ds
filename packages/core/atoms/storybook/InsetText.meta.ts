import type { ArgTypes, StoryContext, Renderer } from 'storybook/internal/types';
import { within, expect } from 'storybook/test';
import { Props } from '../InsetText.lite';

export const insetTextMeta = {
  tags: ['autodocs'] as string[],
  title: 'Typography/InsetText',
  args: {
    id: 'inset-text-default',
    cite: 'https://example.com/source',
    describedBy: '',
    labelledBy: '',
    children:
      'It can take up to 8 weeks to register a lasting power of attorney if there are no mistakes in the application.',
  },
  argTypes: {
    children: {
      table: { disable: true },
    },
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
      description: 'Points to element id(s) whose content describes the inset text. Maps to `aria-describedby`.',
    },
    labelledBy: {
      control: 'text',
      description: 'Points to element id(s) whose content labels the inset text. Maps to `aria-labelledby`.',
    },
  } satisfies ArgTypes<Props>,
  parameters: {
    docs: {
      description: {
        component: 'Inset text component to differentiate a block of text from the content that surrounds it.',
      },
    },
  },
};

export const Default = {
  args: insetTextMeta.args,
  play: async ({ canvasElement, step }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    const contentText = insetTextMeta.args.children;

    await step('renders content and tag', async () => {
      const element = canvas.getByText(contentText);
      expect(element).toBeInTheDocument();
      expect(element.tagName.toLowerCase()).toBe('blockquote');
    });

    await step('renders cite attribute when provided', async () => {
      const element = canvas.getByText(contentText);
      expect(element).toHaveAttribute('cite', insetTextMeta.args.cite);
    });

    await step('renders inset text styles', async () => {
      const element = canvas.getByText(contentText);
      expect(element).toHaveClass('gi-p-4');
      expect(element).toHaveClass('gi-border-l-2xl');
      expect(element).toHaveClass('gi-border-gray-500');
    });
  },
};
