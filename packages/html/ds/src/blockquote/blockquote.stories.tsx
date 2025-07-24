import type { Meta, StoryObj } from '@storybook/react';
import parse from 'html-react-parser';
import { createParagraph } from '../helpers/typography';
import { beautifyHtmlNode } from '../storybook/storybook';
import { BlockquoteProps } from './types';

const meta: Meta<BlockquoteProps> = {
  title: 'Typography/Blockquote',
  parameters: {
    docs: {
      description: {
        component:
          'Inset text component to differentiate a block of text from the content that surrounds it.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<BlockquoteProps>;

const createElement = (arguments_: BlockquoteProps) => {
  const container = document.createElement('blockquote');
  container.className = 'gi-blockquote';

  if (arguments_.cite) {
    container.setAttribute('cite', arguments_.cite);
  }

  if (arguments_.content) {
    container.innerHTML = arguments_.content;
  }

  return parse(container.outerHTML) as React.ReactElement;
};

export const Default: Story = {
  argTypes: {
    content: {
      control: 'text',
      description: 'The text or component within the blockquote.',
    },
    cite: {
      control: 'text',
      type: { name: 'string', required: false },
      description: 'The source URL or description for the quotation.',
    },
  },
  args: {
    content: beautifyHtmlNode(
      createParagraph({
        content: 'The source URL or description for the quotation.',
      }),
    ),
    cite: 'https://example.com/source',
  },
  render: (arguments_) => createElement(arguments_),
};
