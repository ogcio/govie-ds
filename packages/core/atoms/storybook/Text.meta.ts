import type { ArgTypes, StoryContext, Renderer } from '@storybook/types';
import { within, expect } from 'storybook/test';
import type { TextProps } from '../Text.lite';

export const textMeta = {
  tags: ['autodocs'] as string[],
  title: 'Typography/Text',
  args: {
    id: 'text-default',
    dataTestid: 'text',
    children: 'Inline text using the Text component.',
    size: 'md' as const,
    whitespace: 'normal' as const,
    className: '',
    styles: {},
  },
  argTypes: {
    children: {
      control: 'text',
      type: { name: 'string', required: true },
      description: 'The text content (required).',
    },
    id: {
      control: 'text',
      description: 'Optional id for linking/targeting and aria references.',
    },
    dataTestid: {
      control: 'text',
      description: 'Value for `data-testid`.',
    },
    size: {
      control: 'radio',
      options: ['xl', 'lg', 'md', 'sm'],
      description: 'Text size: fixed rem scale with 1.5 line-height (body text scale).',
    },
    whitespace: {
      control: 'radio',
      options: ['normal', 'pre', 'pre-wrap', 'break-spaces'],
      description: 'CSS whitespace handling.',
    },
    className: {
      control: 'text',
      description: 'Additional class names.',
    },
    styles: {
      control: 'object',
      description: 'Inline CSS styles applied to the root `<span>`.',
    },
  } satisfies ArgTypes<TextProps & { children: string }>,
  parameters: {
    docs: {
      description: {
        component:
          'Inline text rendered as a `<span>` with a fixed rem type scale. Use `<Paragraph />` for block body copy.',
      },
    },
  },
};

export const Default = {
  args: textMeta.args,
  play: async ({ canvasElement, step }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    const contentText = textMeta.args.children;

    await step('renders a span with expected typography classes', async () => {
      const element = canvas.getByText(contentText);
      expect(element).toBeInTheDocument();
      expect(element.tagName.toLowerCase()).toBe('span');
      expect(element.className).toContain('1.125rem');
      expect(element).toHaveClass('gi-whitespace-normal');
      expect(element).toHaveClass('gi-font-normal');
      expect(element).toHaveClass('gi-not-prose');
    });
  },
};
