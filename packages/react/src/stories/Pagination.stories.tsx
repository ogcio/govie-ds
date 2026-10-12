import type { Meta, StoryObj } from '@storybook/react-vite';
import Pagination from '@/atoms/pagination/Pagination';
import PaginationButton from '@/atoms/pagination/PaginationButton';
import PaginationEllipsis from '@/atoms/pagination/PaginationEllipsis';
import PaginationLink from '@/atoms/pagination/PaginationLink';
import { getPaginationList } from '@/atoms/pagination/utils';
import * as stories from '@/atoms/storybook/Pagination.meta';
import { useState } from 'react';
import ArrowBackward from '@/atoms/icons/ArrowBackward';
import ArrowForward from '@/atoms/icons/ArrowForward';
import { extractRenderBody } from '@/test-utilities';
import { PAGINATION_TESTID } from '@/atoms/storybook/Pagination.meta';

const meta = {
  ...stories.meta,
  tags: ['!autodocs', '!dev', 'skip-playwright'],
  title: 'Navigation/Pagination/Pagination',
  component: Pagination,
} as Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  ...stories.Default,
  parameters: {
    docs: {
      source: {
        type: 'code',
        transform: extractRenderBody,
      },
    },
  },
  render: function Render() {
    const [currentPage, setCurrentPage] = useState(1);
    const pages = getPaginationList({ current: currentPage, total: 10, size: 5 });
    const firstEllipsis = pages.indexOf(-1);

    return (
      <Pagination id="pagination-id" ariaLabel="Pagination" dataTestId={PAGINATION_TESTID}>
        <PaginationButton
          className="gi-flex gi-gap-2"
          onClick={() => {
            setCurrentPage((current) => current - 1);
          }}
          disabled={currentPage === 1}
          ariaLabel="Go to previous"
        >
          <ArrowBackward />
          Previous
        </PaginationButton>
        {pages.map((page, index) =>
          page === -1 ? (
            <PaginationEllipsis key={index === firstEllipsis ? 'ellipsis-start' : 'ellipsis-end'} />
          ) : (
            <PaginationLink
              key={page}
              href="#"
              current={page === currentPage}
              onClick={(event) => {
                event.preventDefault();
                setCurrentPage(page);
              }}
            >
              {page}
            </PaginationLink>
          ),
        )}
        <PaginationButton
          className="gi-flex gi-gap-2"
          onClick={() => {
            setCurrentPage((current) => current + 1);
          }}
          disabled={currentPage === 10}
          ariaLabel="Go to next"
        >
          Next
          <ArrowForward />
        </PaginationButton>
      </Pagination>
    );
  },
};
