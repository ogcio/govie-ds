import { within, expect } from 'storybook/test';
import type { Props } from '../pagination/PaginationLink.lite';
import { linkMeta } from './Link.meta';
import type { Meta, Story } from './types';

// Label rendered inside the link by the Default and Current stories in each framework.
export const PAGINATION_LINK_LABEL = '5';

export const meta = {
  title: 'Navigation/Pagination/PaginationLink',
  args: {
    current: false,
    href: '#',
    id: 'pagination-link-id',
  },
  argTypes: {
    current: {
      control: 'boolean',
      description: 'Marks the link as the current page. Applies the dark primary style and sets `aria-current="page"`.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    href: linkMeta.argTypes.href,
    id: linkMeta.argTypes.id,
    ariaLabel: {
      control: 'text',
      description:
        'Accessible name when the visible label is not enough, for example "Go to page 5". Maps to `aria-label`.',
      table: { type: { summary: 'string' } },
    },
    dataTestId: linkMeta.argTypes.dataTestId,
  },
  parameters: {
    docs: {
      description: {
        component:
          'A page link for Pagination. Use it when each page has its own URL, and for the Previous and Next links that go with it. It renders a transparent link that turns dark when it is the current page. Set `current` on the page the user is on. Links have no disabled state, so use page buttons if Previous and Next need to be disabled.',
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
          'Set `current` on the link for the page the user is on. It gets the dark primary style and `aria-current="page"`.',
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
