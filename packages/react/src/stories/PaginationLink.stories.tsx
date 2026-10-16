import type { Meta, StoryObj } from '@storybook/react-vite';
import PaginationLink from '@/atoms/pagination/PaginationLink';
import * as stories from '@/atoms/storybook/PaginationLink.meta';

const meta = {
  ...stories.meta,
  tags: ['!autodocs', '!dev', 'skip-playwright'],
  argTypes: {
    ...stories.meta.argTypes,
    onClick: {
      action: 'clicked',
      description: 'Click handler for the page link.',
      table: { type: { summary: '(event: any) => void' } },
    },
    onFocus: {
      action: 'focused',
      description: 'Focus handler for the page link.',
      table: { type: { summary: '(event: any) => void' } },
    },
    onBlur: {
      action: 'blurred',
      description: 'Blur handler for the page link.',
      table: { type: { summary: '(event: any) => void' } },
    },
    onKeyDown: {
      action: 'keydown',
      description: 'Key down handler for the page link.',
      table: { type: { summary: '(event: any) => void' } },
    },
    onKeyUp: {
      action: 'keyup',
      description: 'Key up handler for the page link.',
      table: { type: { summary: '(event: any) => void' } },
    },
  },
  title: 'Navigation/Pagination/PaginationLink',
  component: PaginationLink,
  decorators: (Story) => (
    <ol className="gi-list-none">
      <Story />
    </ol>
  ),
  render: (props) => <PaginationLink {...props} />,
} as Meta<typeof PaginationLink>;

export default meta;

type Story = StoryObj<typeof PaginationLink>;

export const Default: Story = {
  ...stories.Default,
};

export const Current: Story = {
  ...stories.Current,
};
