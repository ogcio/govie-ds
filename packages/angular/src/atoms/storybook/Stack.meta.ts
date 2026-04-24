import type { ArgTypes, StoryContext, Renderer } from 'storybook/internal/types';
import { within, expect } from 'storybook/test';
import type { Props } from '../Stack';
import { Direction, AlignItems, Justify } from '../constants';
import { enumType } from './utilities';
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
    direction: enumType(Direction, {
      description: 'Flex direction. Accepts a string or a responsive breakpoint object `{ xs?, sm?, md?, lg?, xl?, 2xl? }`.',
      defaultValue: Direction.COLUMN
    }),
    gap: {
      control: {
        type: 'number'
      },
      description: 'Tailwind spacing scale value (0–12). Accepts a number or a responsive breakpoint object `{ xs?, sm?, md?, lg?, xl?, 2xl? }`.',
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
      description: 'Accessible label for the container. Use when the stack has a `role` prop to provide an accessible name for the landmark. Maps to `aria-label`.',
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
    className: {
      control: false,
      description: 'Additional CSS classes to apply to the stack container.',
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
    styles: {
      control: false,
      description: 'Inline styles applied directly to the container element. Use for truly dynamic values that cannot be expressed as Tailwind classes.',
      table: {
        type: {
          summary: 'Record<string, string>'
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
    children: {
      table: {
        disable: true
      }
    }
  } satisfies ArgTypes<Props>,
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
  args: stackMeta.args,
  play: async ({
    canvasElement,
    step
  }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    await step('renders a div element', async () => {
      const element = canvas.getByTestId('stack-test');
      expect(element).toBeInTheDocument();
      expect(element.tagName).toBe('DIV');
    });
    await step('has no implicit ARIA role by default', async () => {
      const element = canvas.getByTestId('stack-test');
      expect(element).not.toHaveAttribute('role');
    });
    await step('does not expose aria-label without a role', async () => {
      const element = canvas.getByTestId('stack-test');
      expect(element).not.toHaveAttribute('aria-label');
    });
    await step('does not expose aria-labelledby without a role', async () => {
      const element = canvas.getByTestId('stack-test');
      expect(element).not.toHaveAttribute('aria-labelledby');
    });
    await step('does not interfere with child focus order', async () => {
      const element = canvas.getByTestId('stack-test');
      expect(element).not.toHaveAttribute('tabindex');
    });
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
      xs: 'column',
      md: 'row'
    } as const,
    gap: {
      xs: 2,
      md: 6
    },
    role: 'region' as const,
    ariaLabel: 'layout region',
    dataTestId: 'stack-responsive-test'
  },
  play: async ({
    canvasElement,
    step
  }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    await step('renders the responsive stack container', async () => {
      const element = canvas.getByTestId('stack-responsive-test');
      expect(element).toBeInTheDocument();
      expect(element.tagName).toBe('DIV');
    });
    await step('exposes aria-label when role is set', async () => {
      const element = canvas.getByTestId('stack-responsive-test');
      expect(element).toHaveAttribute('role', 'region');
      expect(element).toHaveAttribute('aria-label', 'layout region');
    });
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