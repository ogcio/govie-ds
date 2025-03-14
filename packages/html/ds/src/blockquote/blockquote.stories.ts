import type { Meta, StoryObj } from '@storybook/react';
import { beautifyHtmlNode } from '../storybook/storybook';
import { BlockquoteProps } from './blockquote.schema';

const meta: Meta<BlockquoteProps> = {
  title: 'Typography/Blockquote',
};

export default meta;
type Story = StoryObj<BlockquoteProps>;

const createElement = (arguments_: BlockquoteProps) => {
  const container = document.createElement('blockquote');
  container.className = 'gi-blockquote';
  if (arguments_.content) {
    container.innerHTML = arguments_.content;
  }
  return beautifyHtmlNode(container);
};

export const Default: Story = {
  argTypes: {
    content: {
      control: 'text',
      description:
        'HTML content or other components to be rendered inside the container.',
    },
  },
  args: {
    content: `<p>Paragraph</p>`,
  },
  render: (arguments_) => createElement(arguments_),
};
