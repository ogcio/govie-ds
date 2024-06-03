import type { Meta, StoryObj } from '@storybook/react';
import { meta as govieMeta } from '@govie-ds/theme-govie';
import { Space, sortSpaces } from './space.js';

const meta = {
  title: 'Space',
  component: Space,
} satisfies Meta<typeof Space>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    spaces: sortSpaces(govieMeta.light.resolved.primitive.space).map(
      (space) => ({
        name: space.name,
        value: `${space.value}px`,
      }),
    ),
  },
};
