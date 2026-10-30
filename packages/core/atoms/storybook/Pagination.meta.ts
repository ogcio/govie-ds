import { within, expect } from 'storybook/test';
import type { Props } from '../pagination/Pagination.lite';
import { boxMeta } from './Box.meta';
import { checker } from './utilities';
import type { Meta, Story } from './types';

export const PAGINATION_TESTID = 'pagination';

export const meta = {
  title: 'Navigation/Pagination/Pagination',
  args: {
    id: 'pagination-id',
    ariaLabel: 'Pagination',
    dataTestId: PAGINATION_TESTID,
  },
  argTypes: {
    className: boxMeta.argTypes.className,
    styles: boxMeta.argTypes.styles,
    id: boxMeta.argTypes.id,
    dataTestId: boxMeta.argTypes.dataTestId,
    ariaLabel: {
      control: 'text',
      description: 'Accessible label for the nav landmark. Maps to `aria-label`.',
      table: { type: { summary: 'string' } },
    },
    ariaLabelledBy: {
      control: { disable: true },
      description:
        'Points to the id of an element that labels the nav. Preferred over `ariaLabel` when a visible heading exists. Maps to `aria-labelledby`.',
      table: { type: { summary: 'string' } },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Pagination helps users move through content that is split across multiple pages.\n\n`Pagination` renders the semantic `<nav>` landmark and an ordered list. Nest `PaginationLink` for pages that navigate to a URL and `PaginationButton` for pages that change in place, including previous and next. Use `PaginationEllipsis` to collapse skipped page ranges. Mark the current page with `current` on `PaginationLink` or `PaginationButton`.\n\nThe logic collapsing the page list can be accessed via the utility function `getPaginationList`.',
      },
    },
  },
} satisfies Meta<Props>;

export const Default = {
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const check = checker(PAGINATION_TESTID, canvas, step);

    await check.is('nav');
    await check.attributes({ id: args.id, 'aria-label': args.ariaLabel });
    await check.children();

    await step('renders an ordered list of pagination items', async () => {
      const list = canvas.getByTestId(PAGINATION_TESTID).children[0];
      expect(list).toBeInTheDocument();
      const expected = ['Previous', '1', '', '4', '5', '6', '', '10', 'Next'];

      const items = canvas.getAllByRole('listitem', { hidden: true });
      expect(items).toHaveLength(expected.length);
      for (const i in expected) {
        if (expected[i].length > 0) {
          expect(items[i]).toHaveTextContent(expected[i]);
        }
      }
    });
  },
} satisfies Story<Props>;

export const PaginationList = {
  parameters: {
    docs: {
      description: {
        story:
          'Shown at the first, middle, and last page of 10, using `getPaginationList` with the default `size` of 7.\n\n`size` is how many page items appear, including the ellipses. It defaults to 7 and is never smaller than 5. If there are fewer pages than `size`, every page is shown. If there are more, the list stays the same length: the first and last pages stay visible, nearby pages stay around the current page, and skipped ranges appear as `PaginationEllipsis`.',
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const size = 7;

    await step('renders the same number of items in each list', async () => {
      const lists = canvas.getAllByRole('list');
      expect(lists).toHaveLength(3);

      for (const list of lists) {
        expect(list.childElementCount).toBe(size + 2);
      }
    });
  },
} satisfies Story<Props>;
