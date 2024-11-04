import type { Meta, StoryObj } from '@storybook/react';
import { Heading, HeadingSize } from './heading.js';

const meta = {
  title: 'typography/Heading',
  component: Heading,
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Heading',
  },
};

// @ts-expect-error: we don't need args in this story
export const WithSize: Story = {
  render: () => (
    <div className="flex flex-row gap-2">
      {Object.values(HeadingSize).map((size) => (
        <Heading key={size} size={size}>
          Heading {size}
        </Heading>
      ))}
    </div>
  ),
};
