import type { Meta, StoryObj } from '@storybook/react-vite';
import PaginationEllipsis from '@/atoms/pagination/PaginationEllipsis';
import * as stories from '@/atoms/storybook/PaginationEllipsis.meta';

const meta = {
  ...stories.meta,
  tags: ['!autodocs', '!dev', 'skip-playwright'],
  title: 'Navigation/Pagination/PaginationEllipsis',
  component: PaginationEllipsis,
  decorators: (Story) => (
    <ol className="gi-list-none">
      <Story />
    </ol>
  ),
} as Meta<typeof PaginationEllipsis>;

export default meta;

type Story = StoryObj<typeof PaginationEllipsis>;

export const Default: Story = {
  ...stories.Default,
};
