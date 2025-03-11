import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { beautifyHtmlNode } from '../storybook/storybook';
import { ContainerProps } from './container.schema';

const meta: Meta<ContainerProps> = {
  title: 'Layout/Container',
};

export default meta;
type Story = StoryObj<ContainerProps>;

const createContainer = (arguments_: ContainerProps) => {
  const container = document.createElement('div');
  container.className = 'gi-layout-container';
  if (arguments_.html) {
    container.innerHTML = arguments_.html;
  }
  return beautifyHtmlNode(container);
};

export const Default: Story = {
  argTypes: {
    html: {
      control: 'text',
      description:
        'HTML content or other components to be rendered inside the container.',
    },
  },
  args: {
    html: `<p>Paragraph</p>`,
  },
  render: (arguments_) => createContainer(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const paragraph = canvas.getByText('This is a paragraph.');
    expect(paragraph).toHaveClass('gi-paragraph-md');
    expect(paragraph).toHaveClass('gi-text-start');
    expect(paragraph).toHaveClass('gi-whitespace-normal');
  },
};
