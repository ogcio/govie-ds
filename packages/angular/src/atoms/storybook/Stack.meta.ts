import type { StoryContext, Renderer } from 'storybook/internal/types';
import { within, expect } from 'storybook/test';
import { Direction, AlignItems, Justify } from '../constants';
import { checker, enumType } from './utilities';
import { boxMeta } from './Box.meta';
export const stackMeta = {
  tags: ['autodocs'] as string[],
  title: 'Layout/Stack',
  args: {
    direction: Direction.COLUMN,
    gap: 4,
    wrap: false,
    align: AlignItems.START,
    justify: Justify.START,
    dataTestId: 'stack-test',
    children: 'Stack content'
  },
  argTypes: {
    ...boxMeta.argTypes,
    direction: enumType(Direction, {
      description: 'Flex direction. Accepts a string or a responsive breakpoint object `{ base?, xs?, sm?, md?, lg?, xl?, 2xl? }`.',
      defaultValue: Direction.COLUMN
    }),
    gap: {
      control: {
        type: 'number'
      },
      description: 'Tailwind spacing scale value (0–12). Accepts a number or a responsive breakpoint object `{ base?, xs?, sm?, md?, lg?, xl?, 2xl? }`.',
      table: {
        type: {
          summary: 'number | ResponsiveGap'
        },
        defaultValue: {
          summary: '0'
        }
      }
    },
    align: enumType(AlignItems, {
      description: 'Cross-axis alignment (`align-items`). Controls how children are positioned perpendicular to the flex direction.',
      defaultValue: AlignItems.START
    }),
    justify: enumType(Justify, {
      description: 'Main-axis distribution (`justify-content`). Controls how children are spaced along the flex direction.',
      defaultValue: Justify.START
    }),
    wrap: {
      control: 'boolean',
      description: 'When true, children wrap onto the next line instead of overflowing.',
      table: {
        type: {
          summary: 'boolean'
        },
        defaultValue: {
          summary: 'false'
        }
      }
    }
  } as const,
  parameters: {
    docs: {
      description: {
        component: 'Stack is a flex layout container with configurable direction, gap, alignment, and justification. Supports responsive breakpoint objects for direction and gap.'
      }
    }
  }
};
export const Default = {
  tags: ['skip-playwright'],
  args: {
    ...stackMeta.args,
    role: 'region' as const,
    ariaLabel: 'Stack region',
    id: 'stack-default'
  },
  play: async ({
    canvasElement,
    step,
    args
  }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    const check = checker('stack-test', canvas, step);
    await check.attributes({
      'aria-label': args.ariaLabel,
      role: args.role
    });
    await check.children();
  }
};
export const Directions = {
  play: async ({
    canvasElement,
    step
  }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    await step('renders all direction variants', async () => {
      for (const direction of Object.values(Direction)) {
        const element = canvas.getByTestId(`stack-direction-${direction}`);
        expect(element).toBeInTheDocument();
        expect(element.tagName).toBe('DIV');
      }
    });
  }
};
export const Alignments = {
  play: async ({
    canvasElement,
    step
  }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    await step('renders all alignment variants', async () => {
      for (const alignment of Object.values(AlignItems)) {
        const element = canvas.getByTestId(`stack-align-${alignment}`);
        expect(element).toBeInTheDocument();
        expect(element.tagName).toBe('DIV');
      }
    });
  }
};
export const Justifications = {
  play: async ({
    canvasElement,
    step
  }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    await step('renders all justification variants', async () => {
      for (const justification of Object.values(Justify)) {
        const element = canvas.getByTestId(`stack-justify-${justification}`);
        expect(element).toBeInTheDocument();
        expect(element.tagName).toBe('DIV');
      }
    });
  }
};
export const GapScale = {
  play: async ({
    canvasElement,
    step
  }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    await step('renders stacks with different gap values', async () => {
      for (const gap of [0, 1, 2, 4, 6, 8]) {
        const element = canvas.getByTestId(`stack-gap-${gap}`);
        expect(element).toBeInTheDocument();
        expect(element.tagName).toBe('DIV');
      }
    });
  }
};
export const Responsive = {
  args: {
    ...stackMeta.args,
    direction: {
      base: 'column',
      xs: 'row',
      sm: 'column',
      md: 'row',
      lg: 'column',
      xl: 'row',
      '2xl': 'column'
    } as const,
    gap: {
      base: 1,
      xs: 2,
      sm: 4,
      md: 6,
      lg: 8,
      xl: 10,
      '2xl': 12
    },
    role: 'region' as const,
    ariaLabel: 'layout region',
    id: 'stack-responsive',
    dataTestId: 'stack-responsive-test'
  },
  play: async ({
    canvasElement,
    step,
    args
  }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    const check = checker('stack-responsive-test', canvas, step);
    await check.attributes({
      'aria-label': args.ariaLabel,
      role: args.role,
      id: args.id
    });
    await check.children();
  }
};
export const Wrapped = {
  play: async ({
    canvasElement,
    step
  }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    await step('renders a wrapped stack container', async () => {
      const element = canvas.getByTestId('stack-wrap-test');
      expect(element).toBeInTheDocument();
      expect(element.tagName).toBe('DIV');
    });
  }
}