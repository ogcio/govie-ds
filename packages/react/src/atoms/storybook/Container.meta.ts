import type { StoryContext, Renderer } from 'storybook/internal/types';
import { createElement } from 'react';
import { within, expect } from 'storybook/test';
import { MaxWidth } from '../utilities';

/** Class fragment applied for each `maxWidth` variant (for interaction tests). */
export function maxWidthClassToken(value: (typeof MaxWidth)[keyof typeof MaxWidth]): string {
  return value === '2xl' ? 'gi-max-w-2xl' : `gi-max-w-${value}`;
}
export const containerMeta = {
  tags: ['autodocs'] as string[],
  title: 'Layout/Container',
  args: {
    children: 'Paragraph',
    gutters: true,
    inset: false,
    maxWidth: MaxWidth.full,
    dataTestId: 'govie-container'
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'HTML content or other components to be rendered inside the container.'
    },
    inset: {
      control: 'boolean',
      description: 'When `true`, applies default vertical inset padding (responsive `py` scale). Default is `false`.'
    },
    gutters: {
      control: 'boolean',
      description: 'When `true`, applies horizontal gutter padding (responsive `px` scale). Default is `true`.'
    },
    maxWidth: {
      control: {
        type: 'select'
      },
      options: Object.values(MaxWidth),
      description: 'Caps the container max width: `sm`, `md`, `lg`, `xl`, `2xl`, or `full`. Default is `full`.'
    },
    dataTestId: {
      control: 'text',
      description: 'Value for the `data-testid` attribute (optional).'
    }
  } as const,
  parameters: {
    docs: {
      description: {
        component: 'Container component when you need a centralised, consistent layout wrapper for content on your webpage.'
      }
    },
    controls: {
      exclude: ['insetTop', 'insetBottom', 'gutterSize', 'gutterSizes', 'fullWidth']
    }
  }
};
export const Default = {
  args: containerMeta.args,
  play: async ({
    canvasElement,
    step
  }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    await step('should apply the correct container classes', async () => {
      const containerElement = canvas.getByTestId('govie-container');
      expect(containerElement).toBeInTheDocument();
      expect(containerElement.className).toContain('gi-w-full');
    });
  }
};
export const WithInset = {
  args: {
    children: 'Paragraph',
    inset: true,
    dataTestId: 'govie-container'
  }
};

/** Side-by-side comparison: default gutters vs `gutters={false}` (render supplied by framework stories). */
export const GuttersOnAndOff = {
  play: async ({
    canvasElement,
    step
  }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    await step('renders one container with gutters and one without', async () => {
      const elements = canvas.getAllByTestId('govie-container');
      expect(elements).toHaveLength(2);
      expect(elements.some(element => element.className.includes('gi-px-0'))).toBe(true);
      expect(elements.some(element => element.className.includes('gi-px-4'))).toBe(true);
    });
  }
};
export const TestRenderIndentedHTMLContent = {
  tags: ['skip-playwright'],
  args: {
    children: createElement('p', null, 'Indented content'),
    dataTestId: 'govie-container'
  },
  play: async ({
    canvasElement,
    step
  }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    await step('should correctly handle and render indented HTML content', async () => {
      const containerElement = canvas.getByTestId('govie-container');
      const paragraphElement = canvas.getByText('Indented content');
      expect(containerElement).toBeInTheDocument();
      expect(paragraphElement).toBeInTheDocument();
      expect(paragraphElement.tagName).toBe('P');
    });
  }
};
export const TestSafelyRenderHTMLContent = {
  tags: ['skip-playwright'],
  args: {
    children: createElement('p', null, createElement('script', null, "alert('XSS')"), 'Safe content'),
    dataTestId: 'govie-container'
  },
  play: async ({
    canvasElement,
    step
  }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    await step('should safely render HTML content', async () => {
      const containerElement = canvas.getByTestId('govie-container');
      const paragraphElement = canvas.getByText('Safe content');
      expect(containerElement).toBeInTheDocument();
      expect(paragraphElement).toBeInTheDocument();
      expect(paragraphElement.innerHTML).toContain('Safe content');
    });
  }
};
export const TestHandleEmptyContentGracefully = {
  tags: ['skip-playwright'],
  args: {
    children: '',
    dataTestId: 'govie-container'
  },
  play: async ({
    canvasElement,
    step
  }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    await step('should handle empty content gracefully', async () => {
      const containerElement = canvas.getByTestId('govie-container');
      expect(containerElement).toBeInTheDocument();
      expect(containerElement.textContent).toBe('');
    });
  }
};
export const AllMaxWidths = {
  play: async ({
    canvasElement,
    step
  }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    await step('renders one container per max width', async () => {
      const elements = canvas.getAllByTestId('govie-container');
      const widths = Object.values(MaxWidth);
      expect(elements).toHaveLength(widths.length);
      for (const maxWidth of widths) {
        const token = maxWidthClassToken(maxWidth);
        const element = elements.find(node => node.className.includes(token));
        expect(element).toBeDefined();
      }
    });
  }
}