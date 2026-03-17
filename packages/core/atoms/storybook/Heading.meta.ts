import type { ArgTypes, StoryContext, Renderer } from '@storybook/types';
import { within, expect } from 'storybook/test';
import { Props } from '../Heading.lite';

export const headingMeta = {
  tags: ['autodocs'] as string[],
  title: 'Typography/Heading',
  args: {
    as: 'h1',
    children: 'Heading',
  },
  argTypes: {
    as: {
      control: { type: 'select' },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    size: {
      control: { type: 'select' },
      options: ['', 'xl', 'lg', 'md', 'sm', 'xs', '2xs'],
    },
    children: {
      table: { disable: true },
    },
  } satisfies ArgTypes<Props>,
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

    await step('renders all heading levels', async () => {
      const headings = canvas.getAllByRole('heading');
      expect(headings.length).toBeGreaterThanOrEqual(6);
    });

    await step('renders h1 with xl size classes', async () => {
      const h1 = canvas.getByRole('heading', { level: 1 });
      expect(h1.tagName.toLowerCase()).toBe('h1');
      expect(h1).toHaveClass('gi-font-bold');
      expect(h1).toHaveClass('gi-text-4xl');
    });

    await step('renders h2 with lg size classes', async () => {
      const h2 = canvas.getByRole('heading', { level: 2 });
      expect(h2.tagName.toLowerCase()).toBe('h2');
      expect(h2).toHaveClass('gi-font-bold');
      expect(h2).toHaveClass('gi-text-2xl');
    });

    await step('renders h3 with md size classes', async () => {
      const h3 = canvas.getByRole('heading', { level: 3 });
      expect(h3.tagName.toLowerCase()).toBe('h3');
      expect(h3).toHaveClass('gi-font-bold');
      expect(h3).toHaveClass('gi-text-lg');
    });

    await step('renders h4 with sm size classes', async () => {
      const h4 = canvas.getByRole('heading', { level: 4 });
      expect(h4.tagName.toLowerCase()).toBe('h4');
      expect(h4).toHaveClass('gi-font-bold');
      expect(h4).toHaveClass('gi-text-lg');
    });

    await step('renders h5 with xs size classes', async () => {
      const h5 = canvas.getByRole('heading', { level: 5 });
      expect(h5.tagName.toLowerCase()).toBe('h5');
      expect(h5).toHaveClass('gi-font-bold');
      expect(h5).toHaveClass('gi-text-md');
    });

    await step('renders h6 with 2xs size classes', async () => {
      const h6 = canvas.getByRole('heading', { level: 6 });
      expect(h6.tagName.toLowerCase()).toBe('h6');
      expect(h6).toHaveClass('gi-font-bold');
      expect(h6).toHaveClass('gi-text-sm');
    });
  },
};
