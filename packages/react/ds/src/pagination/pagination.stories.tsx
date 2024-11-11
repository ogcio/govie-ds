import type { Meta, StoryObj } from '@storybook/react';
import Pagination from './pagination.js';

const meta: Meta<typeof Pagination> = {
  title: 'components/Pagination', // Title for the component
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
    previousLabel: {
      control: 'text',
      description: 'Custom label for the "Previous" button.',
      table: {
        category: 'Labels',
        type: { summary: 'string' },
        defaultValue: { summary: 'Previous' },
      },
    },
    nextLabel: {
      control: 'text',
      description: 'Custom label for the "Next" button.',
      table: {
        category: 'Labels',
        type: { summary: 'string' },
        defaultValue: { summary: 'Next' },
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
};
