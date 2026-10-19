import type { Meta, StoryObj } from '@storybook/react-vite';
import Pagination from '@/pagination/Pagination';
import PaginationButton from '@/pagination/PaginationButton';
import PaginationEllipsis from '@/pagination/PaginationEllipsis';
import { getPaginationList } from '@/atoms/pagination/utils';
import * as stories from '@/atoms/storybook/Pagination.meta';
import { useState } from 'react';
import ArrowBackward from '@/atoms/icons/ArrowBackward';
import ArrowForward from '@/atoms/icons/ArrowForward';
import { extractRenderBody } from '@/test-utilities';
import { PAGINATION_TESTID } from '@/atoms/storybook/Pagination.meta';
import { importNext } from './helpers';
import omit from 'lodash/omit';
import Stack from '@/atoms/Stack';

const meta = {
  ...stories.meta,
  tags: ['next'],
  title: 'Navigation/Pagination/Pagination (Next)',
  component: Pagination,
  argTypes: {
    ...omit(stories.meta.argTypes, 'styles'),
    style: stories.meta.argTypes.styles,
  },
  parameters: {
    ...stories.meta.parameters,
    docs: {
      ...stories.meta.parameters.docs,
      description: {
        ...stories.meta.parameters.docs.description,
        component: `The recommended, flexible way to build pagination. You put the control together from its parts, so you choose the labels, icons, which pages appear, and whether each page is a link or a button. It replaces the earlier all-in-one \`Pagination\`.\n\n${stories.meta.parameters.docs.description.component}\n\n${importNext('Pagination')}`,
      },
    },
  },
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
  render: function Render(props) {
    const [currentPage, setCurrentPage] = useState(5);
    const pages = getPaginationList({ current: currentPage, total: 10, size: 7 });
    return (
      <Pagination {...props} dataTestId={PAGINATION_TESTID}>
        <PaginationButton
          className="gi-flex gi-gap-2"
          onClick={() => {
            setCurrentPage((current) => current - 1);
          }}
          disabled={currentPage === 1}
        >
          <ArrowBackward />
          Previous
        </PaginationButton>
        {pages.map((page, index) =>
          page === -1 ? (
            <PaginationEllipsis key={`${index}-ellipsis`} />
          ) : (
            <PaginationButton
              key={page}
              current={page === currentPage}
              onClick={(event) => {
                event.preventDefault();
                setCurrentPage(page);
              }}
            >
              {page}
            </PaginationButton>
          ),
        )}
        <PaginationButton
          className="gi-flex gi-gap-2"
          onClick={() => {
            setCurrentPage((current) => current + 1);
          }}
          disabled={currentPage === 10}
        >
          Next
          <ArrowForward />
        </PaginationButton>
      </Pagination>
    );
  },
};

export const PaginationList: Story = {
  ...stories.PaginationList,
  parameters: {
    docs: {
      ...stories.PaginationList.parameters.docs,
      source: {
        type: 'code',
        transform: extractRenderBody,
      },
    },
  },
  render: function Render() {
    const total = 10;
    const size = 7;
    const currentPages = [1, 5, 10];

    return (
      <Stack align="center" gap={2}>
        {currentPages.map((currentPage) => {
          const pages = getPaginationList({ current: currentPage, total, size });

          return (
            <Pagination key={currentPage} ariaLabel={`Page ${currentPage} of ${total}`}>
              <PaginationButton className="gi-flex gi-gap-2" disabled={currentPage === 1}>
                <ArrowBackward />
                Previous
              </PaginationButton>
              {pages.map((page, index) =>
                page === -1 ? (
                  <PaginationEllipsis key={`${index}-ellipsis`} />
                ) : (
                  <PaginationButton key={page} current={page === currentPage}>
                    {page}
                  </PaginationButton>
                ),
              )}
              <PaginationButton className="gi-flex gi-gap-2" disabled={currentPage === total}>
                Next
                <ArrowForward />
              </PaginationButton>
            </Pagination>
          );
        })}
      </Stack>
    );
  },
};
