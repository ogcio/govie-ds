import type { ArgTypes, StoryContext, Renderer } from 'storybook/internal/types';
import { within, expect } from 'storybook/test';
import type { Props } from '../Grid.lite';

export const gridMeta = {
  tags: ['autodocs'] as string[],
  title: 'Layout/Grid',
  args: {
    container: true,
    gap: 4,
    dataTestId: 'grid-test',
  },
  argTypes: {
    container: {
      control: false,
      description:
        'When true, activates grid container mode with Figma-responsive defaults. When false, the element acts as a grid item.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    columns: {
      control: { type: 'number' },
      description:
        'Override the number of columns. Accepts a number or a responsive breakpoint object `{ base?, xs?, sm?, md?, lg?, xl?, 2xl? }`. Defaults to Figma spec (4 → 4 → 6 → 8 → 12 → 12 → 12).',
      table: {
        type: { summary: 'number | ResponsiveValue<number>' },
      },
    },
    gap: {
      control: { type: 'number' },
      description:
        'Gap between grid items in Tailwind spacing scale (0–12). Accepts a number or a responsive breakpoint object `{ base?, xs?, sm?, md?, lg?, xl?, 2xl? }`.',
      table: {
        type: { summary: 'number | ResponsiveValue<number>' },
        defaultValue: { summary: '0' },
      },
    },
    size: {
      control: { type: 'number' },
      description:
        'Column span for a grid item. Accepts a number or a responsive breakpoint object `{ base?, xs?, sm?, md?, lg?, xl?, 2xl? }`. Overrides the default auto-distribution.',
      table: {
        type: { summary: 'number | ResponsiveValue<number>' },
      },
    },
    className: {
      control: false,
      description: 'Additional CSS classes to apply to the grid element.',
      table: { type: { summary: 'string' } },
    },
    id: {
      control: false,
      description: 'Optional id for linking/targeting and aria references.',
      table: { type: { summary: 'string' } },
    },
    dataTestId: {
      control: false,
      description: 'Test id for targeting the element in automated tests.',
      table: { type: { summary: 'string' } },
    },
    role: {
      control: false,
      description: 'Landmark role for the container. Only set when a landmark semantic is required.',
      table: {
        type: { summary: '"region" | "navigation" | "complementary" | "search" | "form"' },
      },
    },
    ariaLabel: {
      control: false,
      description:
        'Accessible label for the container. Use when the grid has a `role` prop to provide an accessible name for the landmark. Maps to `aria-label`.',
      table: { type: { summary: 'string' } },
    },
    ariaLabelledBy: {
      control: false,
      description:
        'Points to the id of an element that labels the container. Preferred over `ariaLabel` when a visible heading exists. Only applied when `role` is set. Maps to `aria-labelledby`.',
      table: { type: { summary: 'string' } },
    },
    children: {
      table: { disable: true },
    },
  } satisfies ArgTypes<Props>,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Grid is a flex-based layout component with two modes: container (distributes children according to Figma column spec by default) and item (controls column span). Supports responsive breakpoint objects for columns, gap, and size.',
      },
    },
  },
};

export const Default = {
  tags: ['skip-playwright'],
  args: {
    ...gridMeta.args,
    gap: 1,
    columns: 4,
    role: 'region' as const,
    ariaLabel: 'grid layout',
    dataTestId: 'grid-default',
  },
  play: async ({ canvasElement, step }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);

    await step('renders the grid container', async () => {
      const container = canvas.getByTestId('grid-default');
      expect(container).toBeInTheDocument();
      expect(container.tagName).toBe('DIV');
    });

    await step('renders all 12 child items', async () => {
      for (let index = 1; index <= 12; index++) {
        const item = canvas.getByTestId(`grid-item-${index}`);
        expect(item).toBeInTheDocument();
        expect(item.tagName).toBe('DIV');
      }
    });

    await step('exposes the landmark role', async () => {
      const container = canvas.getByTestId('grid-default');
      expect(container).toHaveAttribute('role', 'region');
    });

    await step('exposes aria-label when role is set', async () => {
      const container = canvas.getByTestId('grid-default');
      expect(container).toHaveAttribute('aria-label', 'grid layout');
    });
  },
};

export const ResponsiveGap = {
  args: {
    ...gridMeta.args,
    gap: { base: 1, xs: 2, sm: 3, md: 4, lg: 6 },
    dataTestId: 'grid-responsive-gap',
  },
  play: async ({ canvasElement, step }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);

    await step('renders the grid container', async () => {
      const container = canvas.getByTestId('grid-responsive-gap');
      expect(container).toBeInTheDocument();
      expect(container.tagName).toBe('DIV');
    });

    await step('renders all 8 child items', async () => {
      for (let index = 1; index <= 8; index++) {
        const item = canvas.getByTestId(`grid-gap-item-${index}`);
        expect(item).toBeInTheDocument();
        expect(item.tagName).toBe('DIV');
      }
    });
  },
};

export const ResponsiveColumns = {
  args: {
    ...gridMeta.args,
    columns: { base: 1, xs: 2, sm: 3, md: 4, lg: 6, xl: 12 },
    gap: 2,
    dataTestId: 'grid-responsive-columns',
  },
  play: async ({ canvasElement, step }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);

    await step('renders the grid container', async () => {
      const container = canvas.getByTestId('grid-responsive-columns');
      expect(container).toBeInTheDocument();
      expect(container.tagName).toBe('DIV');
    });

    await step('renders all 12 child items', async () => {
      for (let index = 1; index <= 12; index++) {
        const item = canvas.getByTestId(`grid-rcol-${index}`);
        expect(item).toBeInTheDocument();
        expect(item.tagName).toBe('DIV');
      }
    });
  },
};

export const ResponsiveSize = {
  args: {
    ...gridMeta.args,
    gap: 2,
    dataTestId: 'grid-responsive-size',
  },
  play: async ({ canvasElement, step }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);

    await step('renders the grid container', async () => {
      const container = canvas.getByTestId('grid-responsive-size');
      expect(container).toBeInTheDocument();
      expect(container.tagName).toBe('DIV');
    });

    await step('renders content and sidebar items', async () => {
      const content = canvas.getByTestId('grid-rsize-content');
      expect(content).toBeInTheDocument();

      const sidebar = canvas.getByTestId('grid-rsize-sidebar');
      expect(sidebar).toBeInTheDocument();

      const footer = canvas.getByTestId('grid-rsize-footer');
      expect(footer).toBeInTheDocument();
    });
  },
};

export const Nested = {
  args: {
    ...gridMeta.args,
    gap: 4,
    dataTestId: 'grid-nested',
  },
  play: async ({ canvasElement, step }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);

    await step('renders the outer grid container', async () => {
      const container = canvas.getByTestId('grid-nested');
      expect(container).toBeInTheDocument();
      expect(container.tagName).toBe('DIV');
    });

    await step('renders the nested grid container', async () => {
      const nested = canvas.getByTestId('grid-nested-inner');
      expect(nested).toBeInTheDocument();
      expect(nested.tagName).toBe('DIV');
    });

    await step('renders nested child items', async () => {
      for (let index = 1; index <= 4; index++) {
        const item = canvas.getByTestId(`grid-nested-item-${index}`);
        expect(item).toBeInTheDocument();
      }
    });
  },
};

export const ColumnOverride = {
  tags: ['skip-playwright'],
  args: {
    ...gridMeta.args,
    columns: 3,
    dataTestId: 'grid-override',
  },
  play: async ({ canvasElement, step }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);

    await step('renders the grid container', async () => {
      const container = canvas.getByTestId('grid-override');
      expect(container).toBeInTheDocument();
      expect(container.tagName).toBe('DIV');
    });

    await step('renders all 3 child items', async () => {
      for (let index = 1; index <= 3; index++) {
        const item = canvas.getByTestId(`grid-col-${index}`);
        expect(item).toBeInTheDocument();
        expect(item.tagName).toBe('DIV');
      }
    });
  },
};
