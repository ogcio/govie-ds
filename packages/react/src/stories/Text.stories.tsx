import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '../atoms';
import {
  textMeta,
  Default as defaultStory,
  AllTextSizes as allTextSizes,
  AlignCenterFixedWidth as alignCenterFixedWidthStory,
} from '../atoms/storybook/Text.meta';
import { Align, Size } from '../atoms/utilities';

const loremIpsum = 'Lorem ipsum dolor sit amet.';

const meta: Meta<typeof Text> = {
  ...textMeta,
  title: 'Typography/Text',
  component: Text,
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Default: Story = {
  tags: ['skip-playwright'],
  ...defaultStory,
  args: { ...defaultStory.args, children: loremIpsum },
};

export const AllTextSizes: Story = {
  ...allTextSizes,
  render: () => (
    <div className="gi-flex gi-flex-col gi-gap-2">
      {Object.values(Size).map((size) => (
        <Text key={size} size={size} dataTestId={`text-all-sizes-${size}`}>
          Text {size}
        </Text>
      ))}
    </div>
  ),
};

export const AlignCenterFixedWidth: Story = {
  ...alignCenterFixedWidthStory,
  render: () => (
    <div className="gi-flex gi-flex-col gi-gap-2">
      {Object.values(Align).map((align) => (
        <Text
          key={align}
          size="md"
          dataTestId={`text-align-center-fixed-width-${align}`}
          className="gi-w-[200px]"
          align={align}
        >
          Text {align}
        </Text>
      ))}
    </div>
  ),
};
