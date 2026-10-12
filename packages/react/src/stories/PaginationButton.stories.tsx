import type { Meta, StoryObj } from '@storybook/react-vite';
import PaginationButton from '@/atoms/pagination/PaginationButton';
import * as stories from '@/atoms/storybook/PaginationButton.meta';

const meta = {
  ...stories.meta,
  tags: ['!autodocs', '!dev', 'skip-playwright'],
  argTypes: {
    ...stories.meta.argTypes,
    onClick: {
      action: 'clicked',
      description: 'Click handler for the page button.',
      table: { type: { summary: '(event: any) => void' } },
    },
    onFocus: {
      action: 'focused',
      description: 'Focus handler for the page button.',
      table: { type: { summary: '(event: any) => void' } },
    },
    onBlur: {
      action: 'blurred',
      description: 'Blur handler for the page button.',
      table: { type: { summary: '(event: any) => void' } },
    },
    onKeyDown: {
      action: 'keydown',
      description: 'Key down handler for the page button.',
      table: { type: { summary: '(event: any) => void' } },
    },
    onKeyUp: {
      action: 'keyup',
      description: 'Key up handler for the page button.',
      table: { type: { summary: '(event: any) => void' } },
    },
  },
  title: 'Navigation/Pagination/PaginationButton',
  component: PaginationButton,
  decorators: (Story) => (
    <ol className="gi-list-none">
      <Story />
    </ol>
  ),
} as Meta<typeof PaginationButton>;

export default meta;

type Story = StoryObj<typeof PaginationButton>;

export const Default: Story = {
  ...stories.Default,
};

export const Current: Story = {
  ...stories.Current,
};

export const Disabled: Story = {
  ...stories.Disabled,
};
