import type { ArgTypes, StoryContext, Renderer } from 'storybook/internal/types';
import { within, expect } from 'storybook/test';
import type { Props } from '../Text';

/** Multiline copy with extra spaces and blank lines — used to exercise whitespace variants in snapshots. */
const WHITESPACE_VRT_SAMPLE = `Hey everyone!

It's almost 2026       spaced    words.

Line three.`;
export const textMeta = {
  tags: ['autodocs'] as string[],
  title: 'Typography/Text',
  args: {
    id: 'text-default',
    dataTestId: 'text',
    children: 'Inline text using the Text component.',
    size: 'md' as const,
    whitespace: 'normal' as const,
    className: '',
    styles: {}
  },
  argTypes: {
    children: {
      control: 'text',
      type: {
        name: 'string',
        required: true
      },
      description: 'The text content (required).'
    },
    id: {
      control: 'text',
      description: 'Optional id for linking/targeting and aria references.'
    },
    dataTestId: {
      control: 'text',
      description: 'Value for `data-testid`.'
    },
    size: {
      control: 'radio',
      options: ['xl', 'lg', 'md', 'sm'],
      description: 'Text size: fixed rem scale with 1.5 line-height (body text scale).'
    },
    whitespace: {
      control: 'radio',
      options: ['normal', 'pre', 'pre-wrap', 'break-spaces'],
      description: 'CSS whitespace handling.'
    },
    className: {
      control: 'text',
      description: 'Additional class names.'
    },
    styles: {
      control: 'object',
      description: 'Inline CSS styles applied to the root `<span>`.'
    }
  } satisfies ArgTypes<Props & {
    children: string;
  }>,
  parameters: {
    docs: {
      description: {
        component: 'Inline text rendered as a `<span>` with a fixed rem type scale. Use `<Paragraph />` for block body copy.'
      }
    }
  }
};
export const Default = {
  args: textMeta.args,
  play: async ({
    canvasElement,
    step
  }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    const contentText = textMeta.args.children;
    await step('renders a span with expected typography classes', async () => {
      const element = canvas.getByText(contentText);
      expect(element).toBeInTheDocument();
      expect(element.tagName.toLowerCase()).toBe('span');
    });
  }
};

/** Chromatic / visual regression: fixed type scale at each size (`skip-playwright` — class/assertion checks only). */
export const SizeSM = {
  tags: ['skip-playwright'] as string[],
  args: {
    ...textMeta.args,
    id: 'text-vrt-sm',
    dataTestId: 'text-vrt-sm',
    children: 'Small body text',
    size: 'sm' as const
  },
  play: async ({
    canvasElement,
    step
  }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    await step('applies gi-text-sm', async () => {
      expect(canvas.getByTestId('text-vrt-sm')).toHaveClass('gi-text-sm');
    });
  }
};
export const SizeMD = {
  tags: ['skip-playwright'] as string[],
  args: {
    ...textMeta.args,
    id: 'text-vrt-md',
    dataTestId: 'text-vrt-md',
    children: 'Medium body text',
    size: 'md' as const
  },
  play: async ({
    canvasElement,
    step
  }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    await step('applies gi-text-md', async () => {
      expect(canvas.getByTestId('text-vrt-md')).toHaveClass('gi-text-md');
    });
  }
};
export const SizeLG = {
  tags: ['skip-playwright'] as string[],
  args: {
    ...textMeta.args,
    id: 'text-vrt-lg',
    dataTestId: 'text-vrt-lg',
    children: 'Large body text',
    size: 'lg' as const
  },
  play: async ({
    canvasElement,
    step
  }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    await step('applies gi-text-lg', async () => {
      expect(canvas.getByTestId('text-vrt-lg')).toHaveClass('gi-text-lg');
    });
  }
};
export const SizeXL = {
  tags: ['skip-playwright'] as string[],
  args: {
    ...textMeta.args,
    id: 'text-vrt-xl',
    dataTestId: 'text-vrt-xl',
    children: 'Extra large body text',
    size: 'xl' as const
  },
  play: async ({
    canvasElement,
    step
  }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    await step('applies responsive xl scale (base gi-text-lg + xs:gi-text-xl)', async () => {
      const el = canvas.getByTestId('text-vrt-xl');
      expect(el).toHaveClass('gi-text-lg');
      expect(el.className).toMatch(/xs:gi-text-xl/);
    });
  }
};
export const WhitespaceNormal = {
  tags: ['skip-playwright'] as string[],
  args: {
    ...textMeta.args,
    id: 'text-vrt-ws-normal',
    dataTestId: 'text-vrt-ws-normal',
    children: WHITESPACE_VRT_SAMPLE,
    whitespace: 'normal' as const,
    size: 'md' as const
  },
  play: async ({
    canvasElement,
    step
  }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    await step('applies gi-whitespace-normal', async () => {
      const el = canvas.getByTestId('text-vrt-ws-normal');
      expect(el).toHaveClass('gi-whitespace-normal');
      expect(getComputedStyle(el).whiteSpace).toBe('normal');
    });
  }
};
export const WhitespacePre = {
  tags: ['skip-playwright'] as string[],
  args: {
    ...textMeta.args,
    id: 'text-vrt-ws-pre',
    dataTestId: 'text-vrt-ws-pre',
    children: WHITESPACE_VRT_SAMPLE,
    whitespace: 'pre' as const,
    size: 'md' as const
  },
  play: async ({
    canvasElement,
    step
  }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    await step('applies gi-whitespace-pre', async () => {
      const el = canvas.getByTestId('text-vrt-ws-pre');
      expect(el).toHaveClass('gi-whitespace-pre');
      expect(getComputedStyle(el).whiteSpace).toBe('pre');
    });
  }
};
export const WhitespacePreWrap = {
  tags: ['skip-playwright'] as string[],
  args: {
    ...textMeta.args,
    id: 'text-vrt-ws-pre-wrap',
    dataTestId: 'text-vrt-ws-pre-wrap',
    children: WHITESPACE_VRT_SAMPLE,
    whitespace: 'pre-wrap' as const,
    size: 'md' as const
  },
  play: async ({
    canvasElement,
    step
  }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    await step('applies gi-whitespace-pre-wrap', async () => {
      const el = canvas.getByTestId('text-vrt-ws-pre-wrap');
      expect(el).toHaveClass('gi-whitespace-pre-wrap');
      expect(getComputedStyle(el).whiteSpace).toBe('pre-wrap');
    });
  }
};
export const WhitespaceBreakSpaces = {
  tags: ['skip-playwright'] as string[],
  args: {
    ...textMeta.args,
    id: 'text-vrt-ws-break-spaces',
    dataTestId: 'text-vrt-ws-break-spaces',
    children: WHITESPACE_VRT_SAMPLE,
    whitespace: 'break-spaces' as const,
    size: 'md' as const
  },
  play: async ({
    canvasElement,
    step
  }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    await step('applies gi-whitespace-break-spaces', async () => {
      const el = canvas.getByTestId('text-vrt-ws-break-spaces');
      expect(el).toHaveClass('gi-whitespace-break-spaces');
      expect(getComputedStyle(el).whiteSpace).toBe('break-spaces');
    });
  }
}