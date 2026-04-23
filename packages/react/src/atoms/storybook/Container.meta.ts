import type { StoryContext, Renderer } from 'storybook/internal/types';
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
      description: 'Caps the container max width: `sm`, `md`, `lg`, `xl`, `2xl`,`full`, or `default`.',
      defaultValue: MaxWidth.default,
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
    await step('Should render a container', async () => {
      const containerElement = canvas.getByTestId('govie-container');
      expect(containerElement).toBeInTheDocument();
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
export const GuttersOnAndOff = {};
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
export const AllMaxWidths = {}