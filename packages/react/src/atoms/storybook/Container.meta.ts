import type { StoryContext, Renderer } from 'storybook/internal/types';
import { createElement } from 'react';
import { within, expect } from 'storybook/test';
import { MaxWidth } from '../Container';
import { enumType } from './utilities';
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
      description: 'When `true`, applies default vertical inset padding (responsive `py` scale). Default is `false`.',
      table: {
        type: {
          summary: 'boolean'
        }
      }
    },
    gutters: {
      control: 'boolean',
      description: 'When `true`, applies horizontal gutter padding (responsive `px` scale). Default is `true`.',
      table: {
        type: {
          summary: 'boolean'
        }
      }
    },
    maxWidth: enumType(MaxWidth, {
      description: 'Caps the container max width: `sm`, `md`, `lg`, `xl`, `2xl`, or `full`. Default is `screen`.',
      defaultValue: MaxWidth.screen,
      table: {
        type: {
          summary: 'string'
        }
      }
    }),
    dataTestId: {
      control: 'text',
      description: 'Value for the `data-testid` attribute (optional).',
      table: {
        type: {
          summary: 'string'
        }
      }
    }
  } as const,
  parameters: {
    docs: {
      description: {
        component: 'Container component, with responsive vertical inset padding and horizontal gutter padding, and configurable max width.'
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
export const RendersIndentedHTMLContent = {
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
export const HandlesEmptyContentGracefully = {
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
        const token = maxWidth === MaxWidth['2xl'] ? 'gi-max-w-2xl' : `gi-max-w-${maxWidth}`;
        const element = elements.find(node => node.className.includes(token));
        expect(element).toBeDefined();
      }
    });
  }
}