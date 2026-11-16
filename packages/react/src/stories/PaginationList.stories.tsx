import type { Meta, StoryObj } from '@storybook/react-vite';
import Pagination from '@/pagination/Pagination';
import PaginationButton from '@/pagination/PaginationButton';
import PaginationEllipsis from '@/pagination/PaginationEllipsis';
import { getPaginationList, type PaginationListProps } from '@/atoms/pagination/utils';
import * as stories from '@/atoms/storybook/PaginationList.meta';
import { extractRenderBody } from '@/test-utilities';
import { importNext } from './helpers';

const meta = {
  ...stories.meta,
  title: 'Navigation/Pagination/getPaginationList',
  tags: ['next'],
  parameters: {
    ...stories.meta.parameters,
    docs: {
      ...stories.meta.parameters.docs,
      description: {
        ...stories.meta.parameters.docs.description,
        component: `${stories.meta.parameters.docs.description.component}\n\n${importNext('getPaginationList')}`,
      },
    },
  },
} as Meta<PaginationListProps>;

export default meta;

type Story = StoryObj<PaginationListProps>;

export const Default: Story = {
  ...stories.Default,
  tags: ['skip-playwright'],
  parameters: {
    docs: {
      source: {
        type: 'code',
        transform: extractRenderBody,
      },
    },
  },
  render: function Render(args) {
    const pages = getPaginationList(args);

    return (
      <Pagination ariaLabel={`Page ${args.current} of ${args.total}`}>
        {pages.map((page, index) =>
          page === -1 ? (
            <PaginationEllipsis key={`${index}-ellipsis`} />
          ) : (
            <PaginationButton key={page} current={page === args.current}>
              {page}
            </PaginationButton>
          ),
        )}
      </Pagination>
    );
  },
};

export const TestPaginationList: Story = {
  ...stories.TestPaginationList,
  tags: ['skip-playwright', '!autodocs', '!dev'],
  render: () => <></>,
};
