import type { StoryContext, Renderer } from 'storybook/internal/types';
import { within, expect } from 'storybook/test';
import { Size, Whitespace } from '../utilities';
const loremIpsum = 'Lorem ipsum dolor sit amet.';
export const textMeta = {
  tags: ['autodocs'] as string[],
  title: 'Typography/Text',
  args: {
    id: 'text-default',
    dataTestId: 'text-default',
    size: Size.MD,
    whitespace: Whitespace.NORMAL
  },
  argTypes: {
    children: {
      table: {
        disable: true
      }
    },
    size: {
      control: {
        type: 'select'
      },
      options: Object.values(Size),
      description: 'Font size of the Text',
      table: {
        type: {
          summary: Object.values(Size).map(v => `"${v}"`).join(' | ')
        },
        defaultValue: {
          summary: 'md'
        }
      }
    },
    whitespace: {
      control: {
        type: 'select'
      },
      options: Object.values(Whitespace),
      description: 'Whitespace handling.',
      table: {
        type: {
          summary: Object.values(Whitespace).map(v => `"${v}"`).join(' | ')
        },
        defaultValue: {
          summary: 'normal'
        }
      }
    },
    className: {
      control: false,
      description: 'Additional CSS classes applied to the paragraph element.',
      table: {
        type: {
          summary: 'string'
        }
      }
    },
    styles: {
      control: false,
      description: 'Inline CSS styles applied to the root `<span>` element.',
      table: {
        type: {
          summary: 'Record<string, string>'
        }
      }
    },
    ariaHidden: {
      control: false,
      description: 'When true, sets `aria-hidden` on the element to hide it from assistive technologies.',
      table: {
        type: {
          summary: 'boolean'
        }
      }
    },
    id: {
      control: false,
      description: 'Optional id for linking/targeting and aria references.'
    },
    dataTestId: {
      control: false,
      description: 'Value for the `data-testid` attribute, used for testing.'
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'Inline text rendered as a `<span>` with a fixed rem type scale. Use `<Paragraph />` for block body copy.'
      }
    }
  }
} as const;
export const Default = {
  args: textMeta.args,
  play: async ({
    canvasElement
  }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    const element = canvas.getByTestId('text-default');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe('SPAN');
  }
};
export const AllTextSizes = {
  args: {
    ...textMeta.args,
    dataTestId: 'text-all-sizes',
    children: loremIpsum
  },
  play: async ({
    canvasElement
  }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    const element = canvas.getByTestId(`text-all-sizes-${Size.MD}`);
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe('SPAN');
  }
}