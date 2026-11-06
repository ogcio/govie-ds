import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '@/atoms';
import { textMeta, Default as defaultStory, AllTextSizes as allTextSizes } from '@/atoms/storybook/Text.meta';
import { Size } from '@/atoms/constants';

const loremIpsum = 'Lorem ipsum dolor sit amet.';

const meta: Meta<typeof Text> = {
  ...textMeta,
  title: 'Typography/Text',
  component: Text,
  argTypes: {
    ...textMeta.argTypes,
    className: {
      control: false,
      description: 'Additional CSS classes applied to the root `<span>` element.',
      table: { type: { summary: 'string' } },
    },
    styles: {
      control: false,
      description: 'Inline CSS styles applied to the root `<span>` element.',
      table: { type: { summary: 'Record<string, string>' } },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Default: Story = {
  tags: ['skip-playwright'],
  ...defaultStory,
  args: { children: loremIpsum },
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
