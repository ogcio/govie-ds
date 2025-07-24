import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import { Pagination } from './pagination.js';

const meta: Meta<typeof Pagination> = {
  title: 'Navigation/Pagination',
  component: Pagination,
  parameters: {
    docs: {
      description: {
        component: `
A pagination component that displays page numbers, ellipses, and navigation controls ("Previous" and "Next"). 
It helps users navigate through content pages and is customizable to match the desired page structure.
`,
      },
    },
  },
  argTypes: {
    currentPage: {
      control: { type: 'number' },
      description: 'The current active page displayed in the pagination.',
      table: {
        category: 'Controls',
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    totalPages: {
      control: { type: 'number' },
      description: 'The total number of pages available.',
      table: {
        category: 'Controls',
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    onPageChange: {
      action: 'onPageChange',
      description: 'Callback function triggered when the page changes.',
      table: {
        category: 'Callbacks',
        type: { summary: '(page: number) => void' },
      },
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    totalPages: 10,
    currentPage: 5,
    onPageChange: (page: number) => console.log(`Navigated to page: ${page}`),
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const nextButton = canvas.getByTestId('govie-pagination-next-btn');
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).toHaveClass('gi-btn-flat-dark-disabled');
  },
};
