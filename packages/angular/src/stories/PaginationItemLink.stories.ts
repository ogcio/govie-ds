import type { StoryObj } from '@storybook/angular-vite';
import { GiPagination } from '@/pagination/Pagination';
import { GiPaginationItemLink } from '@/pagination/PaginationItemLink';
import * as stories from '@/atoms/storybook/PaginationLink.meta';

const meta = {
  ...stories.meta,
  tags: ['skip-playwright'],
  title: 'Navigation/Pagination/PaginationItemLink',
  component: GiPaginationItemLink,
  args: {
    ...stories.meta.args,
    children: stories.PAGINATION_LINK_LABEL,
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Visible label, usually the page number.',
      table: { type: { summary: 'ng-content' } },
    },
    ...stories.meta.argTypes,
    class: {
      control: false,
      description: 'Additional CSS classes applied to the link element.',
      table: { type: { summary: 'string' } },
    },
    style: {
      control: false,
      description: 'Inline styles applied to the link element.',
      table: { type: { summary: 'Record<string, string>' } },
    },
  },
};

export default meta;

type Story = StoryObj<GiPaginationItemLink>;

const imports = [GiPagination, GiPaginationItemLink];

const template = `
  <gi-pagination>
      <gi-pagination-item-link [href]="href" [id]="id" [current]="current" [ariaLabel]="ariaLabel">
        {{ children }}
      </gi-pagination-item-link>
  </gi-pagination>
`;

export const Default: Story = {
  ...stories.Default,
  render: (props) => ({
    props,
    moduleMetadata: { imports },
    template,
  }),
};

export const Current: Story = {
  ...stories.Current,
  render: (props) => ({
    props,
    moduleMetadata: { imports },
    template,
  }),
};
