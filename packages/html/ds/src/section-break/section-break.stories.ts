import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { createSectionBreak } from '../helpers/section-break';
import { SectionBreakProps, SizeEnum } from './section-break.schema';

const meta: Meta<SectionBreakProps> = {
  title: 'Typography/SectionBreak',
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
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg', 'xl'],
      type: { name: 'string', required: false },
      description: 'Specifies the size of the section break margin.',
    },
  },
};

export default meta;
type Story = StoryObj<SectionBreakProps>;

export const Default: Story = {
  argTypes: {
    size: {
      control: 'radio',
      options: Object.values(SizeEnum),
      type: { name: 'string', required: false },
      description: 'Specifies the size of the section break margin.',
    },
    color: {
      control: 'text',
      type: { name: 'string', required: false },
      description: 'Specifies the color of the section break.',
    },
  },
  args: {
    size: SizeEnum.Medium,
  },
  render: (arguments_) => createSectionBreak(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const paragraph = canvas.getByRole('separator');
    expect(paragraph).toHaveClass('gi-section-break-md');
  },
};

export const Small: Story = {
  args: {
    size: SizeEnum.Small,
  },
  render: (arguments_) => createSectionBreak(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const paragraph = canvas.getByRole('separator');
    expect(paragraph).toHaveClass('gi-section-break-sm');
  },
};

export const Medium: Story = {
  args: {
    size: SizeEnum.Medium,
  },
  render: (arguments_) => createSectionBreak(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const paragraph = canvas.getByRole('separator');
    expect(paragraph).toHaveClass('gi-section-break-md');
  },
};

export const Large: Story = {
  args: {
    size: SizeEnum.Large,
  },
  render: (arguments_) => createSectionBreak(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const paragraph = canvas.getByRole('separator');
    expect(paragraph).toHaveClass('gi-section-break-lg');
  },
};

export const ExtraLarge: Story = {
  args: {
    size: SizeEnum.ExtraLarge,
  },
  render: (arguments_) => createSectionBreak(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const paragraph = canvas.getByRole('separator');
    expect(paragraph).toHaveClass('gi-section-break-xl');
  },
};
