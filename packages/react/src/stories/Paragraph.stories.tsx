import type { Meta, StoryObj } from '@storybook/react-vite';
import Paragraph, { Align } from '../atoms/Paragraph';
import {
  paragraphMeta,
  Default as defaultStory,
  AllParagraphSizes as allSizes,
  AllWhitespaces as allWhitespaces,
  AllAlignments as allAlignments,
} from '../atoms/storybook/Paragraph.meta';
import { Size, Whitespace } from '../atoms/utilities';

const meta: Meta<typeof Paragraph> = {
  ...paragraphMeta,
  argTypes: {
    ...paragraphMeta.argTypes,
  },
  title: 'Typography/Paragraph',
  component: Paragraph,
};

export default meta;
type Story = StoryObj<typeof Paragraph>;

export const Default: Story = { ...defaultStory, tags: ['skip-playwright'] };

export const AllParagraphSizes: Story = {
  ...allSizes,
  render: () => (
    <>
      {Object.values(Size).map((size) => (
        <Paragraph key={size} size={size} dataTestId={`paragraph-${size}`}>
          Paragraph {size}
        </Paragraph>
      ))}
    </>
  ),
};

export const AllWhitespaces: Story = {
  ...allWhitespaces,
  render: () => (
    <div className="gi-flex gi-flex-col gi-gap-6">
      {Object.values(Whitespace).map((ws) => (
        <div key={ws} className="gi-flex gi-flex-col gi-gap-2">
          <span className="gi-font-bold">{ws}</span>
          <Paragraph whitespace={ws} dataTestId={`paragraph-ws-${ws}`}>
            {paragraphMeta.loremIpsum}
          </Paragraph>
        </div>
      ))}
    </div>
  ),
};

export const AllAlignments: Story = {
  ...allAlignments,
  render: () => (
    <div className="gi-flex gi-flex-col gi-gap-6">
      {Object.values(Align).map((align) => (
        <div key={align} className="gi-flex gi-flex-col gi-gap-2">
          <span className="gi-font-bold">{align}</span>
          <Paragraph align={align} dataTestId={`paragraph-align-${align}`}>
            {paragraphMeta.loremIpsum}
          </Paragraph>
        </div>
      ))}
    </div>
  ),
};
