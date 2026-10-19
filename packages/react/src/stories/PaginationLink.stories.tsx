import type { Meta, StoryObj } from '@storybook/react-vite';
import Pagination from '@/atoms/pagination/Pagination';
import PaginationLink from '@/atoms/pagination/PaginationLink';
import * as stories from '@/atoms/storybook/PaginationLink.meta';
import { importNext } from './helpers';

const meta = {
  ...stories.meta,
  tags: ['skip-playwright'],
  title: 'Navigation/Pagination (Next)/PaginationLink',
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
  component: PaginationLink,
  parameters: {
    ...stories.meta.parameters,
    docs: {
      ...stories.meta.parameters.docs,
      description: {
        ...stories.meta.parameters.docs.description,
        component: `${stories.meta.parameters.docs.description.component}\n\n${importNext('PaginationButton')}`,
      },
    },
  },
} as Meta<typeof PaginationLink>;

export default meta;

type Story = StoryObj<typeof PaginationLink>;

export const Default: Story = {
  ...stories.Default,
  render: (props) => (
    <Pagination>
      <PaginationLink {...props} />
    </Pagination>
  ),
};

export const Current: Story = {
  ...stories.Current,
  render: (props) => (
    <Pagination>
      <PaginationLink {...props} />
    </Pagination>
  ),
};
