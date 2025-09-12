import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import { SectionBreak } from './section-break.js';

const meta = {
  title: 'Typography/SectionBreak',
  component: SectionBreak,
  parameters: {
    docs: {
      description: {
        docs: {
          component:
            'Section Break component to create a thematic break between sections of content.',
        },
      },
    },
  },
} satisfies Meta<typeof SectionBreak>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg', 'xl'],
      type: { name: 'string', required: false },
      description: 'Specifies the size of the section break margin.',
    },
  },
  args: {
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
  play: async ({ canvasElement, step }) => {
    await step('should have correct text size classes for "sm"', async () => {
      const canvas = within(canvasElement);
      const separatorElement = canvas.getByRole('separator');
      expect(separatorElement).toHaveClass('gi-section-break-sm');
    });
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
  },
  play: async ({ canvasElement, step }) => {
    await step('should have correct text size classes for "md"', async () => {
      const canvas = within(canvasElement);
      const separatorElement = canvas.getByRole('separator');
      expect(separatorElement).toHaveClass('gi-section-break-md');
    });
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
  play: async ({ canvasElement, step }) => {
    await step('should have correct text size classes for "lg"', async () => {
      const canvas = within(canvasElement);
      const separatorElement = canvas.getByRole('separator');
      expect(separatorElement).toHaveClass('gi-section-break-lg');
    });
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
  },
  play: async ({ canvasElement, step }) => {
    await step('should have correct text size classes for "xl"', async () => {
      const canvas = within(canvasElement);
      const separatorElement = canvas.getByRole('separator');
      expect(separatorElement).toHaveClass('gi-section-break-xl');
    });
  },
};
