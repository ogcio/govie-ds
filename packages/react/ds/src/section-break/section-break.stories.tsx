import type { Meta, StoryObj } from '@storybook/react';
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
