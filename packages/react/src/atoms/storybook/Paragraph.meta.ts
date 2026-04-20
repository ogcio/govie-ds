import type { StoryContext, Renderer } from 'storybook/internal/types';
import { within, expect } from 'storybook/test';
import { enumType } from './utilities';
import { Align, Size, Whitespace } from '../utilities';
export const paragraphMeta = {
  tags: ['autodocs'] as string[],
  title: 'Typography/Paragraph',
  args: {
    id: 'paragraph-default',
    dataTestId: 'paragraph-default',
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  argTypes: {
    children: {
      table: {
        disable: true
      }
    },
    size: enumType(Size, {
      description: 'Font size of the Paragraph.',
      defaultValue: Size.MD
    }),
    align: enumType(Align, {
      description: 'Text alignment.',
      defaultValue: Align.START
    }),
    whitespace: enumType(Whitespace, {
      description: 'Whitespace handling.',
      defaultValue: Whitespace.NORMAL
    }),
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
      description: 'Inline CSS styles applied to the root `<p>` element.',
      table: {
        type: {
          summary: 'Record<string, string>'
        }
      }
    },
    id: {
      control: false,
      description: 'Optional id for linking/targeting and aria references.'
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
    dataTestId: {
      control: false,
      description: 'Value for the `data-testid` attribute, used for testing.'
    }
  } as const,
  parameters: {
    docs: {
      description: {
        component: 'Paragraph component for rendering body text with semantic `<p>` markup and consistent typography styles.'
      }
    }
  },
  loremIpsum: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
   Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
   Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
   Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`
};
export const Default = {
  tags: ['skip-playwright'],
  args: paragraphMeta.args,
  play: async ({
    canvasElement,
    step
  }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    await step('renders a <p> element', async () => {
      const element = canvas.getByTestId('paragraph-default');
      expect(element.tagName).toBe('P');
    });
    await step('forwards id attribute', async () => {
      const element = canvas.getByTestId('paragraph-default');
      expect(element).toHaveAttribute('id', 'paragraph-default');
    });
    await step('does not set aria-hidden when not provided', async () => {
      const element = canvas.getByTestId('paragraph-default');
      expect(element).not.toHaveAttribute('aria-hidden');
    });
  }
};
export const AllParagraphSizes = {
  play: async ({
    canvasElement,
    step
  }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    await step('renders all four sizes as <p> elements', async () => {
      for (const size of Object.values(Size)) {
        const element = canvas.getByTestId(`paragraph-${size}`);
        expect(element.tagName).toBe('P');
        expect(element).toHaveTextContent(`Paragraph ${size}`);
      }
    });
  }
};
export const AllWhitespaces = {
  play: async ({
    canvasElement,
    step
  }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    await step('renders all whitespace variants as <p> elements', async () => {
      for (const ws of Object.values(Whitespace)) {
        const element = canvas.getByTestId(`paragraph-ws-${ws}`);
        expect(element.tagName).toBe('P');
      }
    });
  }
};
export const AllAlignments = {
  play: async ({
    canvasElement,
    step
  }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    await step('renders all alignment variants as <p> elements', async () => {
      for (const align of Object.values(Align)) {
        const element = canvas.getByTestId(`paragraph-align-${align}`);
        expect(element.tagName).toBe('P');
      }
    });
  }
}