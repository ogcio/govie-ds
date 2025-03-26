import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { beautifyHtmlNode } from '../storybook/storybook';
import { ContainerProps } from './types';

const meta: Meta<ContainerProps> = {
  title: 'Layout/Container',
};

export default meta;
type Story = StoryObj<ContainerProps>;

const createContainer = (arguments_: ContainerProps) => {
  const container = document.createElement('div');
  container.className = 'gi-layout-container';
  if (arguments_.content) {
    container.innerHTML = arguments_.content;
  }
  return beautifyHtmlNode(container);
};

export const Default: Story = {
  args: {
    content: `<p>This is a paragraph.</p>`,
  },
  render: (arguments_) => createContainer(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const paragraph = canvas.getByText('This is a paragraph.');
    expect(paragraph.parentElement).toHaveClass('gi-layout-container');
  },
};
