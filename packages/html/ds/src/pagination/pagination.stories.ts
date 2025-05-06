import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { createPagination } from '../helpers/pagination';
import { beautifyHtmlNode } from '../storybook/storybook';
import { PaginationProps } from './pagination.schema';

const meta: Meta<PaginationProps> = {
  title: 'Navigation/Pagination',
};

export default meta;
type Story = StoryObj<PaginationProps>;

const createElement = (arguments_: PaginationProps) => {
  const component = createPagination(arguments_);
  return beautifyHtmlNode(component);
};

export const Default: Story = {
  argTypes: {
    currentPage: {
      type: { name: 'number', required: true },
      description: 'The current active page displayed in the pagination.',
    },
    totalPages: {
      type: { name: 'number', required: true },
      description: 'The total number of pages available.',
    },
  },
  args: {
    totalPages: 10,
    currentPage: 5,
  },
  render: createElement,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const previousButton = canvas.getByTestId('govie-pagination-prev-btn');
    expect(previousButton).toBeInTheDocument();

    const nextButton = canvas.getByTestId('govie-pagination-next-btn');
    expect(nextButton).toBeInTheDocument();
  },
};

export const FirstPageSelected: Story = {
  args: {
    totalPages: 10,
    currentPage: 1,
  },
  render: createElement,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const previousButton = canvas.getByTestId('govie-pagination-prev-btn');
    expect(previousButton).toBeInTheDocument();
    expect(previousButton).toHaveClass('gi-btn-flat-dark-disabled');
  },
};

export const LastPageSelected: Story = {
  args: {
    totalPages: 10,
    currentPage: 10,
  },
  render: createElement,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const nextButton = canvas.getByTestId('govie-pagination-next-btn');
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).toHaveClass('gi-btn-flat-dark-disabled');
  },
};

export const CompactView: Story = {
  args: {
    totalPages: 10,
    currentPage: 5,
  },
  render: createElement,
  play: async ({ canvasElement }) => {
    globalThis.window.innerWidth = 478;
    globalThis.window.dispatchEvent(new Event('resize'));

    const canvas = within(canvasElement);

    expect(canvas.getByText('Page 5 of 10')).toBeInTheDocument();
  },
};

export const CompactViewWithButtons: Story = {
  args: {
    totalPages: 10,
    currentPage: 3,
  },
  render: createElement,
  play: async ({ canvasElement }) => {
    globalThis.window.innerWidth = 500;
    globalThis.window.dispatchEvent(new Event('resize'));

    const canvas = within(canvasElement);

    const iconSpans = canvas.getAllByTestId('govie-icon');
    const moreHorizIcon = iconSpans.find(
      (icon) => icon.textContent === 'more_horiz',
    );

    expect(moreHorizIcon).toBeInTheDocument();

    const elements1 = canvas.getAllByText('1');
    const elements2 = canvas.getAllByText('3');
    const elements3 = canvas.getAllByText('10');

    for (const element of elements1) {
      expect(element).toBeInTheDocument();
    }
    for (const element of elements2) {
      expect(element).toBeInTheDocument();
    }
    for (const element of elements3) {
      expect(element).toBeInTheDocument();
    }

    const compactView = canvas.getByText('Page 3 of 10').closest('div'); // Locate the compact view container
    expect(compactView).toHaveClass('xs:gi-hidden');
  },
};
