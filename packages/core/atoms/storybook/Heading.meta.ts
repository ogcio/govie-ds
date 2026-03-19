import type { StoryContext, Renderer } from '@storybook/types';
import { within, expect } from 'storybook/test';
import { Size } from '../heading/types';

export const headingMeta = {
  tags: ['autodocs'] as string[],
  title: 'Typography/Heading',
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
    },
    dataTestId: {
      control: false,
      description: 'Test id for targeting the element in automated tests.',
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
  play: async ({ canvasElement, step }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);

    await step('renders all 6 heading levels', async () => {
      const headings = canvas.getAllByRole('heading');
      expect(headings.length).toBeGreaterThanOrEqual(6);
    });

    await step('h1 renders the correct semantic element', async () => {
      const h1 = canvas.getByRole('heading', { level: 1 });
      expect(h1.tagName.toLowerCase()).toBe('h1');
    });

    await step('h2 renders the correct semantic element', async () => {
      const h2 = canvas.getByRole('heading', { level: 2 });
      expect(h2.tagName.toLowerCase()).toBe('h2');
    });

    await step('h3 renders the correct semantic element', async () => {
      const h3 = canvas.getByRole('heading', { level: 3 });
      expect(h3.tagName.toLowerCase()).toBe('h3');
    });

    await step('h4 renders the correct semantic element', async () => {
      const h4 = canvas.getByRole('heading', { level: 4 });
      expect(h4.tagName.toLowerCase()).toBe('h4');
    });

    await step('h5 renders the correct semantic element', async () => {
      const h5 = canvas.getByRole('heading', { level: 5 });
      expect(h5.tagName.toLowerCase()).toBe('h5');
    });

    await step('h6 renders the correct semantic element', async () => {
      const h6 = canvas.getByRole('heading', { level: 6 });
      expect(h6.tagName.toLowerCase()).toBe('h6');
    });
  },
};
