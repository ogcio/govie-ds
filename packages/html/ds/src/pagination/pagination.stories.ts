import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import html from './pagination.html?raw';
import { PaginationProps } from './pagination.schema';

const path = import.meta.url.split('/pagination')[0];

const macro = { name: 'goviePagination', html, path };

const Pagination = renderComponent<PaginationProps>(macro);

const meta = {
  component: Pagination,
  title: 'Navigation/Pagination',
  parameters: {
    macro,
    docs: {
      description: {
        component: "A pagination component that displays page numbers, ellipses, and navigation controls ('Previous' and 'Next'). It helps users navigate through content pages and is customizable to match the desired page structure.",
      },
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

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
    totalPages: 100,
    currentPage: 10,
  },
};

