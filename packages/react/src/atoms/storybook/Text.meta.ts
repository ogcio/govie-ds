import type { StoryContext, Renderer } from 'storybook/internal/types';
import { within, expect } from 'storybook/test';
import { Align, Size, Whitespace } from '../utilities';
const loremIpsum = 'Lorem ipsum dolor sit amet.';
export const textMeta = {
  tags: ['autodocs'] as string[],
  title: 'Typography/Text',
  args: {
    id: 'text-default',
    dataTestId: 'text-default',
    size: Size.MD,
    whitespace: Whitespace.NORMAL,
    align: Align.START
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
    align: {
      control: {
        type: 'select'
      },
      options: Object.values(Align),
      description: 'Horizontal text alignment. Only applies to fixed width elements.',
      table: {
        type: {
          summary: Object.values(Align).map(v => `"${v}"`).join(' | ')
        },
        defaultValue: {
          summary: 'start'
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
};
const alignClassByValue: Record<(typeof Align)[keyof typeof Align], string> = {
  [Align.START]: 'gi-text-start',
  [Align.CENTER]: 'gi-text-center',
  [Align.END]: 'gi-text-end',
  [Align.JUSTIFY]: 'gi-text-justify'
};
export const AlignCenterFixedWidth = {
  args: {
    ...textMeta.args,
    id: 'text-align-center-fixed-width',
    dataTestId: 'text-align-center-fixed-width',
    className: 'gi-w-[200px]',
    align: Align.CENTER,
    children: 'Text center'
  },
  play: async ({
    canvasElement
  }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    for (const align of Object.values(Align)) {
      const element = canvas.getByTestId(`text-align-center-fixed-width-${align}`);
      expect(element).toBeInTheDocument();
      expect(element.tagName).toBe('SPAN');
      expect(element).toHaveClass(alignClassByValue[align]);
      expect(element).toHaveClass('gi-w-[200px]');
    }
  }
}