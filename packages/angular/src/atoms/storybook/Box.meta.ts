import type { ArgTypes, StoryContext, Renderer } from 'storybook/internal/types';
import { within, expect } from 'storybook/test';
import type { Props } from '../Box';
export const boxMeta = {
  tags: ['autodocs'] as string[],
  title: 'Layout/Box',
  args: {
    children: 'Box content',
    className: 'gi-p-4',
    id: 'box-example',
    dataTestId: 'box-test'
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'CSS classes to apply to the box. Use `gi-*` Tailwind utilities for spacing, backgrounds, sizing, etc.',
      table: {
        type: {
          summary: 'string'
        }
      }
    },
    id: {
      control: false,
      description: 'Optional id for linking/targeting and aria references.',
      table: {
        type: {
          summary: 'string'
        }
      }
    },
    dataTestId: {
      control: false,
      description: 'Test id for targeting the element in automated tests.',
      table: {
        type: {
          summary: 'string'
        }
      }
    },
    role: {
      control: false,
      description: 'Landmark role for the container. Only set when a landmark semantic is required.',
      table: {
        type: {
          summary: "'region' | 'navigation' | 'complementary' | 'search' | 'form' | 'group'"
        }
      }
    },
    ariaLabel: {
      control: false,
      description: 'Accessible label for the container. Use when the box has a `role` prop to provide an accessible name for the landmark. Maps to `aria-label`.',
      table: {
        type: {
          summary: 'string'
        }
      }
    },
    ariaLabelledBy: {
      control: false,
      description: 'Points to the id of an element that labels the container. Preferred over `ariaLabel` when a visible heading exists. Only applied when `role` is set. Maps to `aria-labelledby`.',
      table: {
        type: {
          summary: 'string'
        }
      }
    },
    styles: {
      control: false,
      description: 'Inline styles applied directly to the container element. Use for truly dynamic values that cannot be expressed as Tailwind classes.',
      table: {
        type: {
          summary: 'Record<string, string>'
        }
      }
    },
    children: {
      table: {
        disable: true
      }
    }
  } satisfies ArgTypes<Props>,
  parameters: {
    docs: {
      description: {
        component: 'Box is the simplest layout primitive — a plain `<div>` wrapper that signals design-system membership. All styling is applied through `className` with `gi-*` Tailwind utilities.'
      }
    }
  }
};
export const Default = {
  args: {
    ...boxMeta.args,
    role: 'region' as const,
    ariaLabel: 'Example region'
  },
  play: async ({
    canvasElement,
    step
  }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    await step('renders a div element', async () => {
      const element = canvas.getByTestId('box-test');
      expect(element).toBeInTheDocument();
      expect(element.tagName).toBe('DIV');
    });
    await step('has the correct id', async () => {
      const element = canvas.getByTestId('box-test');
      expect(element).toHaveAttribute('id', 'box-example');
    });
    await step('renders children', async () => {
      const element = canvas.getByTestId('box-test');
      expect(element).toHaveTextContent('Box content');
    });
    await step('does not interfere with child focus order', async () => {
      const element = canvas.getByTestId('box-test');
      expect(element).not.toHaveAttribute('tabindex');
    });
    await step('renders role attribute', async () => {
      const element = canvas.getByTestId('box-test');
      expect(element).toHaveAttribute('role', 'region');
    });
    await step('renders aria-label when role is set', async () => {
      const element = canvas.getByTestId('box-test');
      expect(element).toHaveAttribute('aria-label', 'Example region');
    });
  }
};
export const WithContainerAndStack = {
  args: {
    ...boxMeta.args,
    dataTestId: 'box-layout'
  }
}