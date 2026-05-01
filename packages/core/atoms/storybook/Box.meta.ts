import type { ArgTypes, StoryContext, Renderer } from 'storybook/internal/types';
import { within, expect } from 'storybook/test';
import type { Props } from '../Box.lite';

export const boxMeta = {
  tags: ['autodocs'] as string[],
  title: 'Layout/Box',
  args: {
    children: 'Box content',
    className: 'gi-p-4',
    id: 'box-example',
    dataTestId: 'box-test',
  },
  argTypes: {
    className: {
      control: 'text',
      description:
        'CSS classes to apply to the box. Use `gi-*` Tailwind utilities for spacing, backgrounds, sizing, etc.',
      table: { type: { summary: 'string' } },
    },
    id: {
      control: false,
      description: 'Optional id for targeting and aria references.',
      table: { type: { summary: 'string' } },
    },
    dataTestId: {
      control: false,
      description: 'Test id for targeting the element in automated tests.',
      table: { type: { summary: 'string' } },
    },
    children: {
      table: { disable: true },
    },
  } satisfies ArgTypes<Props>,
  parameters: {
    docs: {
      description: {
        component:
          'Box is the simplest layout primitive — a plain `<div>` wrapper that signals design-system membership. All styling is applied through `className` with `gi-*` Tailwind utilities.',
      },
    },
  },
};

export const Default = {
  args: boxMeta.args,
  play: async ({ canvasElement, step }: StoryContext<Renderer>) => {
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

    await step('has no implicit ARIA role', async () => {
      const element = canvas.getByTestId('box-test');
      expect(element).not.toHaveAttribute('role');
    });
  },
};

export const Spacing = {
  args: {
    ...boxMeta.args,
    dataTestId: 'box-spacing',
  },
};

export const Background = {
  args: {
    ...boxMeta.args,
    className: 'gi-bg-gray-100 gi-p-4',
    dataTestId: 'box-background',
  },
};

export const Sizing = {
  args: {
    ...boxMeta.args,
    className: 'gi-w-64 gi-h-32 gi-p-4 gi-bg-gray-50',
    dataTestId: 'box-sizing',
  },
};
