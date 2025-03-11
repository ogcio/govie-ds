import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { beautifyHtmlNode } from '../storybook/storybook';
import { SectionBreakProps, SizeEnum } from './section-break.schema';

const meta: Meta<SectionBreakProps> = {
  title: 'Typography/SectionBreak',
};

export default meta;
type Story = StoryObj<SectionBreakProps>;

const createSectionBreak = (arguments_: SectionBreakProps) => {
  const container = document.createElement('div');

  let classSize = '';
  if (arguments_.size == 'xl') {
    classSize = 'gi-section-break-xl';
  } else if (arguments_.size == 'lg') {
    classSize = 'gi-section-break-lg';
  } else if (arguments_.size == 'sm') {
    classSize = 'gi-section-break-sm';
  } else {
    classSize = 'gi-section-break-md';
  }

  const component = document.createElement('hr');
  component.className = `${classSize}`.trim();
  component.role = 'separator';

  container.append(component);

  return beautifyHtmlNode(container);
};

export const Default: Story = {
  argTypes: {
    size: {
      control: 'radio',
      options: Object.values(SizeEnum),
      type: { name: 'string', required: false },
      description: 'Specifies the size of the section break margin.',
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
