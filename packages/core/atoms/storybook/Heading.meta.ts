import type { StoryContext, Renderer } from '@storybook/types';
import { within, expect } from 'storybook/test';
import { Size } from '../heading/types';

export const headingMeta = {
  tags: ['autodocs'] as string[],
  title: 'Typography/Heading',
  args: {
    id: 'heading-id',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['', ...Object.values(Size)],
      description: 'Font size of the heading. Defaults to the size mapped to the heading level.',
      table: {
        type: {
          summary: Object.values(Size)
            .map((v) => `"${v}"`)
            .join(' | '),
        },
      },
    },
    id: {
      control: false,
      description: 'Optional id for linking/targeting and aria references.',
    },
    className: {
      control: false,
      description: 'Additional CSS classes to apply to the heading element.',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    dataTestId: {
      control: false,
      description: 'Test id for targeting the element in automated tests.',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
  } as const,
  parameters: {
    docs: {
      description: {
        component:
          'Heading component for rendering semantic heading elements (h1–h6) with consistent typography styles.',
      },
    },
  },
};

export const Default = {
  tags: ['skip-playwright'],
  args: headingMeta.args,
};

export const AllHeadingLevels = {
  play: async ({ canvasElement, step }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);

    await step('renders h1 to h6 with the correct semantic tags', async () => {
      expect(canvas.getByTestId('heading-1').tagName).toBe('H1');
      expect(canvas.getByTestId('heading-2').tagName).toBe('H2');
      expect(canvas.getByTestId('heading-3').tagName).toBe('H3');
      expect(canvas.getByTestId('heading-4').tagName).toBe('H4');
      expect(canvas.getByTestId('heading-5').tagName).toBe('H5');
      expect(canvas.getByTestId('heading-6').tagName).toBe('H6');
    });
  },
};
