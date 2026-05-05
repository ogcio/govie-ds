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
      description: 'Accessible label for the container. Use when the container has a `role` prop to provide an accessible name for the landmark. Maps to `aria-label`.',
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
      description: 'Additional CSS classes to apply to the container.',
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
    inset: true
  }
};
export const GuttersOnAndOff = {};
export const AllMaxWidths = {}