import { within, expect } from 'storybook/test';
import type { Props } from '../pagination/PaginationLink.lite';
import { linkMeta } from './Link.meta';
import type { Meta, Story } from './types';

// Label rendered inside the link by the Default and Current stories in each framework.
export const PAGINATION_LINK_LABEL = '5';

export const meta = {
  title: 'Navigation/Pagination/PaginationLink',
  args: {
    href: '#',
    id: 'pagination-link-id',
  },
  argTypes: {
    current: {
      control: 'boolean',
      description: 'Marks this page as the current page. Applies the primary style and sets `aria-current="page"`.',
      table: { type: { summary: 'boolean' } },
    },
    href: linkMeta.argTypes.href,
    id: linkMeta.argTypes.id,
    ariaLabel: {
      control: 'text',
      description:
        'Accessible name when the visible label is not enough, for example "Go to page 5". Maps to `aria-label`.',
      table: { type: { summary: 'string' } },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Page link for Pagination. Renders a large transparent link inside a list item. The link becomes dark when it is the current item. Use for pages that change in place, and for previous and next. Set `current` to mark the current page.',
      },
    },
  },
} satisfies Meta<Props>;

export const Default = {
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);

    await step('renders a page link inside a list item', async () => {
      const link = canvas.getByRole('link', { name: PAGINATION_LINK_LABEL });
      expect(link.tagName).toBe('A');
      expect(link).toHaveAttribute('href', args.href);
      expect(link).toHaveAttribute('id', args.id);
      expect(link.closest('li')).toBeInTheDocument();
      expect(link).not.toHaveAttribute('aria-current');
    });
  },
} satisfies Story<Props>;

export const Current = {
  args: {
    ...meta.args,
    current: true,
    id: 'pagination-link-current-id',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Use the `current` prop to denote the currently open tab/page. This applies the primary style and `aria-current` onto the item.',
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('marks the link as the current page', async () => {
      const link = canvas.getByRole('link', { name: PAGINATION_LINK_LABEL });
      expect(link).toHaveAttribute('aria-current', 'page');
    });
  },
} satisfies Story<Props>;
