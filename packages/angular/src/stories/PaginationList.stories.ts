import type { Meta, StoryObj } from '@storybook/angular-vite';
import { GiPagination } from '@/pagination/Pagination';
import { GiPaginationItemButton } from '@/pagination/PaginationItemButton';
import { GiPaginationItemEllipsis } from '@/pagination/PaginationItemEllipsis';
import { getPaginationList, type PaginationListProps } from '@/atoms/pagination/utils';
import * as stories from '@/atoms/storybook/PaginationList.meta';

const meta: Meta<PaginationListProps> = {
  ...stories.meta,
  title: 'Navigation/Pagination/getPaginationList',
};

export default meta;

type Story = StoryObj<PaginationListProps>;

export const Default: Story = {
  ...stories.Default,
  tags: ['skip-playwright'],
  render: (args) => ({
    props: {
      ...args,
      pages: getPaginationList(args),
    },
    moduleMetadata: {
      imports: [GiPagination, GiPaginationItemButton, GiPaginationItemEllipsis],
    },
    template: `
      <gi-pagination [ariaLabel]="'Page ' + current + ' of ' + total">
        @for (page of pages; track $index) {
          @if (page === -1) {
            <gi-pagination-item-ellipsis />
          } @else {
            <gi-pagination-item-button [current]="page === current">
              {{ page }}
            </gi-pagination-item-button>
          }
        }
      </gi-pagination>
    `,
  }),
};

export const TestPaginationList: Story = {
  ...stories.TestPaginationList,
  tags: ['skip-playwright', '!autodocs', '!dev'],
  render: () => ({ template: '' }),
};
