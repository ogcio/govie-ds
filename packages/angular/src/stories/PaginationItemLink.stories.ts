import { RouterLink, RouterLinkActive } from '@angular/router';
import type { StoryObj } from '@storybook/angular-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { GiPagination } from '@/pagination/Pagination';
import { GiPaginationItemLink, GiPaginationLinkDirective } from '@/pagination/PaginationItemLink';
import { GiPaginationItemDirective } from '@/pagination/PaginationItem';
import * as stories from '@/atoms/storybook/PaginationLink.meta';
import { withRouter } from '@/stories/router';

const meta = {
  ...stories.meta,
  title: 'Navigation/Pagination/PaginationItemLink',
  component: GiPaginationItemLink,
  args: {
    ...stories.meta.args,
    children: stories.PAGINATION_LINK_LABEL,
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Visible label, usually the page number or "Previous" / "Next".',
      table: { type: { summary: 'ng-content' } },
    },
    ...stories.meta.argTypes,
    class: {
      control: false,
      description: 'Additional CSS classes applied to the link element.',
      table: { type: { summary: 'string' } },
    },
    style: {
      control: false,
      description:
        'Inline styles applied to the link element. Use for truly dynamic values that cannot be expressed as Tailwind classes.',
      table: { type: { summary: 'string | Record<string, string | number | null | undefined>' } },
    },
  },
  parameters: {
    ...stories.meta.parameters,
    docs: {
      ...stories.meta.parameters.docs,
      description: {
        ...stories.meta.parameters.docs.description,
        component: `${stories.meta.parameters.docs.description.component}\n\nPlace \`gi-pagination-item-link\` directly inside \`gi-pagination\`. To use your own \`a\`, for example with \`routerLink\`, use the \`giPaginationLink\` directive instead (see the [Directive](#directive) and [WithRouter](#with-router) stories).`,
      },
    },
  },
};

export default meta;

type Story = StoryObj<GiPaginationItemLink>;

const imports = [GiPagination, GiPaginationItemLink];

export const Default: Story = {
  ...stories.Default,
  tags: ['skip-playwright'],
  render: (props) => ({
    props,
    moduleMetadata: { imports },
    template: `
      <gi-pagination>
        <gi-pagination-item-link
          [id]="id"
          [href]="href"
          [current]="current"
          [class]="class"
          [style]="style"
          [ariaLabel]="ariaLabel"
          [dataTestId]="dataTestId"
        >
          {{ children }}
        </gi-pagination-item-link>
      </gi-pagination>
    `,
  }),
};

export const Current: Story = {
  ...stories.Current,
  tags: ['skip-playwright'],
  render: (props) => ({
    props,
    moduleMetadata: { imports },
    template: `
      <gi-pagination>
        <gi-pagination-item-link
          [id]="id"
          [href]="href"
          [current]="current"
          [class]="class"
          [style]="style"
          [ariaLabel]="ariaLabel"
          [dataTestId]="dataTestId"
        >
          {{ children }}
        </gi-pagination-item-link>
      </gi-pagination>
    `,
  }),
};

export const Directive: Story = {
  tags: ['skip-playwright'],
  args: {
    current: false,
    href: '#',
  },
  parameters: {
    controls: { include: ['children', 'current', 'href'] },
    docs: {
      description: {
        story:
          'Put `giPaginationLink` on your own `a` to give it the page link styles, for example alongside `routerLink`. It takes `current`, and `href` is set on the `a` as usual. The directive does not render a list item, so wrap the `a` in an `li` marked with `giPaginationItem`.',
      },
    },
  },
  render: (props) => ({
    props,
    moduleMetadata: { imports: [GiPagination, GiPaginationItemDirective, GiPaginationLinkDirective] },
    template: `
      <gi-pagination>
        <li giPaginationItem>
          <a giPaginationLink [href]="href" [current]="current">{{ children }}</a>
        </li>
      </gi-pagination>
    `,
  }),
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);

    await step('styles the consumer link inside a list item', async () => {
      const link = canvas.getByRole('link', { name: stories.PAGINATION_LINK_LABEL });
      expect(link.tagName).toBe('A');
      expect(link).toHaveAttribute('href', args.href);
      expect(link.closest('li')).toBeInTheDocument();
      expect(link.className).not.toBe('');
      expect(link).not.toHaveAttribute('aria-current');
    });
  },
};

export const WithRouter: Story = {
  tags: ['skip-playwright'],
  decorators: [withRouter(['', 'page/1', 'page/2', 'page/3'], { initialUrl: '/page/1' })],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'The `giPaginationLink` directive works with the native Angular router: put it on the same `a` as `routerLink`, inside an `li` marked with `giPaginationItem`. Bind `current` to the `isActive` property of `routerLinkActive`, so the link for the active route gets the current page style and `aria-current="page"`.',
      },
    },
  },
  render: (_props) => ({
    moduleMetadata: {
      imports: [GiPagination, GiPaginationItemDirective, GiPaginationLinkDirective, RouterLink, RouterLinkActive],
    },
    template: `
      <gi-pagination ariaLabel="Pagination">
        <li giPaginationItem>
          <a giPaginationLink routerLink="/page/1" routerLinkActive #page1="routerLinkActive" [current]="page1.isActive">1</a>
        </li>
        <li giPaginationItem>
          <a giPaginationLink routerLink="/page/2" routerLinkActive #page2="routerLinkActive" [current]="page2.isActive">2</a>
        </li>
        <li giPaginationItem>
          <a giPaginationLink routerLink="/page/3" routerLinkActive #page3="routerLinkActive" [current]="page3.isActive">3</a>
        </li>
      </gi-pagination>
    `,
  }),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const page1 = canvas.getByRole('link', { name: '1' });
    const page2 = canvas.getByRole('link', { name: '2' });
    const page3 = canvas.getByRole('link', { name: '3' });

    await step('the consumer anchors carry the router href', async () => {
      expect(page1.getAttribute('href')).toBe('#/page/1');
      expect(page2.getAttribute('href')).toBe('#/page/2');
      expect(page3.getAttribute('href')).toBe('#/page/3');
    });

    await step('the link for the initial route is current', async () => {
      await waitFor(() => expect(page1.getAttribute('aria-current')).toBe('page'));
      expect(page2.getAttribute('aria-current')).toBeNull();
      expect(page3.getAttribute('aria-current')).toBeNull();
    });

    await step('clicking navigates through the router and moves current', async () => {
      await userEvent.click(page3);
      await waitFor(() => expect(page3.getAttribute('aria-current')).toBe('page'));
      expect(page1.getAttribute('aria-current')).toBeNull();
      expect(page2.getAttribute('aria-current')).toBeNull();
    });
  },
};
