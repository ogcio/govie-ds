import type { Meta, StoryObj } from '@storybook/react';
import { expect, within, userEvent, waitFor, fn } from 'storybook/test';
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
    onPageChange: fn(),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('should render the previous and next buttons', async () => {
      const previousButton = canvas.getByTestId('govie-pagination-prev-btn');
      expect(previousButton).toBeInTheDocument();

      const nextButton = canvas.getByTestId('govie-pagination-next-btn');
      expect(nextButton).toBeInTheDocument();

      const previousButtonText = canvas.getByText('Previous');
      const nextButtonText = canvas.getByText('Next');

      expect(previousButtonText).toBeInTheDocument();
      expect(nextButtonText).toBeInTheDocument();
    });

    await step(
      'should render page number buttons correctly on large breakpoints',
      async () => {
        for (const page of [1, 3, 4, 5, 6, 7, 10]) {
          expect(canvas.getByText(page.toString())).toBeInTheDocument();
        }
      },
    );

    await step('should render ellipses correctly for page ranges', async () => {
      const iconElements = canvas.getAllByTestId('govie-icon');
      const moreHorizIcon = iconElements.find(
        (element) => element.textContent === 'more_horiz',
      );

      expect(moreHorizIcon).toBeInTheDocument();
    });
  },
};

export const FirstPageSelected: Story = {
  args: {
    totalPages: 10,
    currentPage: 1,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('should disable previous button on the first page', async () => {
      const previousButton = canvas.getByTestId('govie-pagination-prev-btn');
      expect(previousButton).toBeInTheDocument();
      expect(previousButton).toHaveClass('gi-btn-flat-dark-disabled');

      const previousButtonText = canvas.getByText('Previous');
      expect(previousButtonText).toBeDisabled();
    });
  },
};

export const LastPageSelected: Story = {
  args: {
    totalPages: 10,
    currentPage: 10,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('should disable next button on the last page', async () => {
      const nextButton = canvas.getByTestId('govie-pagination-next-btn');
      expect(nextButton).toBeInTheDocument();
      expect(nextButton).toHaveClass('gi-btn-flat-dark-disabled');

      const nextButtonText = canvas.getByText('Next');
      expect(nextButtonText).toBeDisabled();
    });
  },
};

export const TestExtraSmallBreakpoint: Story = {
  tags: ['skip-playwright'],
  args: {
    totalPages: 10,
    currentPage: 5,
    onPageChange: fn(),
  },
  globals: { viewport: { value: 'mobile1' } },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await canvas.findByRole('navigation');

    await step(
      'should render pagination buttons and page numbers when not on XS breakpoint',
      async () => {
        const pageButtons = canvas.getAllByRole('button');
        expect(pageButtons.length).toBeGreaterThan(0);
        expect(canvas.getByText(/Page 5/)).toBeInTheDocument();
        expect(canvas.getByText(/of 10/)).toBeInTheDocument();
      },
    );

    await step('should hide pagination buttons on XS breakpoint', async () => {
      const pageButtons = canvas.queryAllByRole('button');
      expect(pageButtons.length).toBe(2);
      expect(canvas.getByText(/Page 5/)).toBeInTheDocument();
      expect(canvas.getByText(/of 10/)).toBeInTheDocument();
    });
  },
};

export const TestPageInteraction: Story = {
  tags: ['skip-playwright'],
  args: {
    totalPages: 10,
    currentPage: 5,
    onPageChange: fn(),
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);

    await step(
      'should call onPageChange when a page button is clicked',
      async () => {
        const pageButton = canvas.getByText('3');
        await userEvent.click(pageButton);

        await waitFor(() => {
          expect(args.onPageChange).toHaveBeenCalledWith(3);
        });
      },
    );
  },
};
