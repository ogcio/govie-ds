import { expect } from 'storybook/test';
import { getPaginationList, type PaginationListProps } from '../pagination/utils';
import type { Meta, Story } from './types';

export const meta = {
  title: 'Navigation/Pagination/getPaginationList',
  args: {
    current: 5,
    total: 10,
    size: 7,
  },
  argTypes: {
    current: {
      control: { type: 'number', min: 1, step: 1 },
      description: 'The page the user is on.',
      table: { type: { summary: 'number' } },
    },
    total: {
      control: { type: 'number', min: 1, step: 1 },
      description: 'The total number of pages.',
      table: { type: { summary: 'number' } },
    },
    size: {
      control: { type: 'number', min: 5, step: 1 },
      description:
        'The number of items to show, including the first and last pages and any ellipses, but not counting Previous and Next. Use it to fit the pagination to the space available. Values below 5 are treated as 5.',
      table: { type: { summary: 'number' }, defaultValue: { summary: '7' } },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Returns the pages to show for a given `current` page and `total`. Previous and Next are not included in the list. `size` sets how many items appear, including ellipses. It defaults to 7, with a minimum of 5. Each `-1` in the result marks a collapsed range: render an ellipsis in its place. When `total` is at most `size`, every page is shown.',
      },
    },
  },
} satisfies Meta<PaginationListProps>;

export const Default = {} satisfies Story<PaginationListProps>;

export const TestPaginationList = {
  parameters: { controls: { disable: true } },
  play: async ({ step }) => {
    await step('Every page fits: page 3 of 5', async () => {
      expect(getPaginationList({ current: 3, total: 5 })).toEqual([1, 2, 3, 4, 5]);
    });

    await step('First page: page 1 of 10', async () => {
      expect(getPaginationList({ current: 1, total: 10 })).toEqual([1, 2, 3, 4, 5, -1, 10]);
    });

    await step('Collapse point at the start: page 4 of 10', async () => {
      expect(getPaginationList({ current: 4, total: 10 })).toEqual([1, 2, 3, 4, 5, -1, 10]);
    });

    await step('Middle page: page 5 of 10', async () => {
      expect(getPaginationList({ current: 5, total: 10 })).toEqual([1, -1, 4, 5, 6, -1, 10]);
    });

    await step('Collapse point at the end: page 7 of 10', async () => {
      expect(getPaginationList({ current: 7, total: 10 })).toEqual([1, -1, 6, 7, 8, 9, 10]);
    });

    await step('Last page: page 10 of 10', async () => {
      expect(getPaginationList({ current: 10, total: 10 })).toEqual([1, -1, 6, 7, 8, 9, 10]);
    });

    await step('Smallest size: page 5 of 10, size 5', async () => {
      expect(getPaginationList({ current: 5, total: 10, size: 5 })).toEqual([1, -1, 5, -1, 10]);
    });

    await step('Larger size: page 50 of 100, size 9', async () => {
      expect(getPaginationList({ current: 50, total: 100, size: 9 })).toEqual([1, -1, 48, 49, 50, 51, 52, -1, 100]);
    });

    await step('shows every page when total is at most size', async () => {
      expect(getPaginationList({ current: 1, total: 1 })).toEqual([1]);
      expect(getPaginationList({ current: 4, total: 7 })).toEqual([1, 2, 3, 4, 5, 6, 7]);
      expect(getPaginationList({ current: 2, total: 9, size: 9 })).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    await step('treats size below 5 as 5 and floors fractional sizes', async () => {
      expect(getPaginationList({ current: 5, total: 10, size: 3 })).toEqual([1, -1, 5, -1, 10]);
      expect(getPaginationList({ current: 5, total: 10, size: 0 })).toEqual([1, -1, 5, -1, 10]);
      expect(getPaginationList({ current: 5, total: 10, size: 7.9 })).toEqual([1, -1, 4, 5, 6, -1, 10]);
    });

    await step('supports even sizes', async () => {
      expect(getPaginationList({ current: 5, total: 10, size: 6 })).toEqual([1, -1, 4, 5, -1, 10]);
    });
  },
} satisfies Story<PaginationListProps>;
