import { RouterLink, RouterLinkActive } from '@angular/router';
import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { GiPagination } from '@/pagination/Pagination';
import { GiPaginationItemButton, GiPaginationButtonDirective } from '@/pagination/PaginationItemButton';
import { GiPaginationItemLink, GiPaginationLinkDirective } from '@/pagination/PaginationItemLink';
import { GiPaginationItemEllipsis } from '@/pagination/PaginationItemEllipsis';
import { GiPaginationItemDirective } from '@/pagination/PaginationItem';
import { getPaginationList } from '@/atoms/pagination/utils';
import ArrowBackward from '@/atoms/icons/ArrowBackward';
import ArrowForward from '@/atoms/icons/ArrowForward';
import { GiStack } from '@/Stack';
import * as stories from '@/atoms/storybook/Pagination.meta';
import { withRouter } from '@/stories/router';

const meta: Meta = {
  ...stories.meta,
  title: 'Navigation/Pagination/Pagination',
  component: GiPagination,
  argTypes: {
    children: {
      control: false,
      description:
        'The `gi-pagination-item-link`, `gi-pagination-item-button` and `gi-pagination-item-ellipsis` items, or `li` elements marked with `giPaginationItem`.',
      table: { type: { summary: 'ng-content' } },
    },
    ...stories.meta.argTypes,
    class: {
      control: false,
      description: 'Additional CSS classes applied to the nav element.',
      table: { type: { summary: 'string' } },
    },
    style: {
      control: false,
      description:
        'Inline styles applied to the nav element. Use for truly dynamic values that cannot be expressed as Tailwind classes.',
      table: { type: { summary: 'string | Record<string, string | number | null | undefined>' } },
    },
  },
  parameters: {
    ...stories.meta.parameters,
    docs: {
      ...stories.meta.parameters.docs,
      description: {
        ...stories.meta.parameters.docs.description,
        component: `${stories.meta.parameters.docs.description.component}\n\nThe parts are \`gi-pagination-item-link\`, \`gi-pagination-item-button\` and \`gi-pagination-item-ellipsis\`. Place them directly inside \`gi-pagination\`. To use your own \`a\` or \`button\`, for example with \`routerLink\`, use the directives instead (see the Directive and WithRouter stories).`,
      },
    },
  },
};

export default meta;

type Story = StoryObj<GiPagination>;

type PaginationStoryState = {
  currentPage: number;
  totalPages: number;
};

export const Default: Story = {
  ...stories.Default,
  render: (props) => ({
    props: {
      ...props,
      currentPage: 5,
      totalPages: 10,
      pages(this: PaginationStoryState) {
        return getPaginationList({ current: this.currentPage, total: this.totalPages, size: 7 });
      },
      select(this: PaginationStoryState, page: number) {
        this.currentPage = page;
      },
    },
    moduleMetadata: {
      imports: [GiPagination, GiPaginationItemButton, GiPaginationItemEllipsis, ArrowBackward, ArrowForward],
    },
    template: `
      <gi-pagination
        [id]="id"
        [class]="class"
        [style]="style"
        [ariaLabel]="ariaLabel"
        [ariaLabelledBy]="ariaLabelledBy"
        [dataTestId]="dataTestId"
      >
        <gi-pagination-item-button class="gi-flex gi-gap-2" [disabled]="currentPage === 1" (click)="select(currentPage - 1)">
          <gi-arrow-backward-icon />
          Previous
        </gi-pagination-item-button>
        @for (page of pages(); track $index) {
          @if (page === -1) {
            <gi-pagination-item-ellipsis />
          } @else {
            <gi-pagination-item-button [current]="page === currentPage" (click)="select(page)">
              {{ page }}
            </gi-pagination-item-button>
          }
        }
        <gi-pagination-item-button class="gi-flex gi-gap-2" [disabled]="currentPage === totalPages" (click)="select(currentPage + 1)">
          Next
          <gi-arrow-forward-icon />
        </gi-pagination-item-button>
      </gi-pagination>
    `,
  }),
};

export const PaginationList: Story = {
  ...stories.PaginationList,
  render: () => {
    const total = 10;
    const size = 7;
    const lists = [1, 5, total].map((currentPage) => ({
      currentPage,
      pages: getPaginationList({ current: currentPage, total, size }),
    }));

    return {
      props: { total, lists },
      moduleMetadata: {
        imports: [
          GiPagination,
          GiPaginationItemLink,
          GiPaginationItemButton,
          GiPaginationItemEllipsis,
          GiStack,
          ArrowBackward,
          ArrowForward,
        ],
      },
      template: `
        <gi-stack align="center" [gap]="2">
          @for (list of lists; track list.currentPage) {
            <gi-pagination [ariaLabel]="'Page ' + list.currentPage + ' of ' + total">
              @if (list.currentPage === 1) {
                <gi-pagination-item-button disabled class="gi-flex gi-gap-2">
                  <gi-arrow-backward-icon />
                  Previous
                </gi-pagination-item-button>
              } @else {
                <gi-pagination-item-link href="#" class="gi-flex gi-gap-2">
                  <gi-arrow-backward-icon />
                  Previous
                </gi-pagination-item-link>
              }
              @for (page of list.pages; track $index) {
                @if (page === -1) {
                  <gi-pagination-item-ellipsis />
                } @else {
                  <gi-pagination-item-link href="#" [current]="page === list.currentPage">{{ page }}</gi-pagination-item-link>
                }
              }
              @if (list.currentPage === total) {
                <gi-pagination-item-button disabled class="gi-flex gi-gap-2">
                  Next
                  <gi-arrow-forward-icon />
                </gi-pagination-item-button>
              } @else {
                <gi-pagination-item-link href="#" class="gi-flex gi-gap-2">
                  Next
                  <gi-arrow-forward-icon />
                </gi-pagination-item-link>
              }
            </gi-pagination>
          }
        </gi-stack>
      `,
    };
  },
};

export const Directive: StoryObj<GiPaginationLinkDirective> = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Use the directives when you need to own the element. `giPaginationLink` styles an `a` and `giPaginationButton` styles a `button`. Both take `current`, and `giPaginationButton` also takes `disabled`. Unlike the components, the directives do not render a list item, so wrap each element in an `li` marked with `giPaginationItem`. There is no directive for the ellipses - use `gi-pagination-item-ellipsis` directly.',
      },
    },
  },
  render: (_props) => ({
    props: {
      currentPage: 5,
      totalPages: 10,
      pages(this: PaginationStoryState) {
        return getPaginationList({ current: this.currentPage, total: this.totalPages, size: 7 });
      },
      select(this: PaginationStoryState, page: number) {
        this.currentPage = page;
      },
    },
    moduleMetadata: {
      imports: [
        GiPagination,
        GiPaginationItemEllipsis,
        GiPaginationItemDirective,
        GiPaginationButtonDirective,
        GiPaginationLinkDirective,
        ArrowBackward,
        ArrowForward,
      ],
    },
    template: `
      <gi-pagination ariaLabel="Pagination" dataTestId="pagination-directive">
        <li giPaginationItem>
          <button giPaginationButton type="button" class="gi-flex gi-gap-2" [disabled]="currentPage === 1" (click)="select(currentPage - 1)">
            <gi-arrow-backward-icon />
            Previous
          </button>
        </li>
        @for (page of pages(); track $index) {
          @if (page === -1) {
            <gi-pagination-item-ellipsis />
          } @else {
            <li giPaginationItem>
              <a giPaginationLink href="#" [current]="page === currentPage" (click)="$event.preventDefault(); select(page)">{{ page }}</a>
            </li>
          }
        }
        <li giPaginationItem>
          <button giPaginationButton type="button" class="gi-flex gi-gap-2" [disabled]="currentPage === totalPages" (click)="select(currentPage + 1)">
            Next
            <gi-arrow-forward-icon />
          </button>
        </li>
      </gi-pagination>
    `,
  }),
};

export const TestDirective: StoryObj<GiPaginationLinkDirective> = {
  ...Directive,
  tags: ['skip-playwright', '!autodocs', '!dev'],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('marks the current page link with aria-current', async () => {
      expect(canvas.getByRole('link', { name: '5' })).toHaveAttribute('aria-current', 'page');
      expect(canvas.getByRole('link', { name: '4' })).not.toHaveAttribute('aria-current');
    });

    await step('clicking a page link moves the current page', async () => {
      await userEvent.click(canvas.getByRole('link', { name: '6' }));
      await waitFor(() => expect(canvas.getByRole('link', { name: '6' })).toHaveAttribute('aria-current', 'page'));
      expect(canvas.getByRole('link', { name: '5' })).not.toHaveAttribute('aria-current');
    });

    await step('previous and next buttons move the current page and disable at the ends', async () => {
      await userEvent.click(canvas.getByRole('link', { name: '1' }));
      await waitFor(() => expect(canvas.getByRole('button', { name: 'Previous' })).toBeDisabled());
      await userEvent.click(canvas.getByRole('button', { name: 'Next' }));
      await waitFor(() => expect(canvas.getByRole('link', { name: '2' })).toHaveAttribute('aria-current', 'page'));
      expect(canvas.getByRole('button', { name: 'Previous' })).toBeEnabled();
    });
  },
};

export const WithRouter: StoryObj<GiPaginationLinkDirective> = {
  tags: ['skip-playwright'],
  decorators: [withRouter(['', 'page/1', 'page/2', 'page/3'], { initialUrl: '/page/1' })],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          '`giPaginationLink` works with the native Angular router: put it on the same `a` as `routerLink`, inside an `li` marked with `giPaginationItem`. Bind `current` to `routerLinkActive` so the active route sets `aria-current="page"`. Previous and Next are links to the adjacent page, and become a disabled `giPaginationButton` at the first and last page, because a link cannot be disabled.',
      },
    },
  },
  render: (_props) => ({
    moduleMetadata: {
      imports: [
        GiPagination,
        GiPaginationItemDirective,
        GiPaginationLinkDirective,
        GiPaginationButtonDirective,
        RouterLink,
        RouterLinkActive,
        ArrowBackward,
        ArrowForward,
      ],
    },
    template: `
      <gi-pagination ariaLabel="Pagination">
        <li giPaginationItem>
          @if (!page1.isActive) {
            <a giPaginationLink [routerLink]="['/page', page3.isActive ? 2 : 1]" class="gi-flex gi-gap-2">
              <gi-arrow-backward-icon />
              Previous
            </a>
          } @else {
            <button giPaginationButton type="button" disabled class="gi-flex gi-gap-2">
              <gi-arrow-backward-icon />
              Previous
            </button>
          }
        </li>
        <li giPaginationItem>
          <a giPaginationLink routerLink="/page/1" routerLinkActive #page1="routerLinkActive" [current]="page1.isActive">1</a>
        </li>
        <li giPaginationItem>
          <a giPaginationLink routerLink="/page/2" routerLinkActive #page2="routerLinkActive" [current]="page2.isActive">2</a>
        </li>
        <li giPaginationItem>
          <a giPaginationLink routerLink="/page/3" routerLinkActive #page3="routerLinkActive" [current]="page3.isActive">3</a>
        </li>
        <li giPaginationItem>
          @if (!page3.isActive) {
            <a giPaginationLink [routerLink]="['/page', page1.isActive ? 2 : 3]" class="gi-flex gi-gap-2">
              Next
              <gi-arrow-forward-icon />
            </a>
          } @else {
            <button giPaginationButton type="button" disabled class="gi-flex gi-gap-2">
              Next
              <gi-arrow-forward-icon />
            </button>
          }
        </li>
      </gi-pagination>
    `,
  }),
};

export const TestWithRouter: StoryObj<GiPaginationLinkDirective> = {
  ...WithRouter,
  tags: ['skip-playwright', '!autodocs', '!dev'],
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

    await step('clicking navigates through the router and marks that page current', async () => {
      await userEvent.click(page2);
      await waitFor(() => expect(page2.getAttribute('aria-current')).toBe('page'));
      expect(page1.getAttribute('aria-current')).toBeNull();
      expect(page3.getAttribute('aria-current')).toBeNull();
    });

    await step('previous and next are router links to the adjacent pages', async () => {
      expect(canvas.getByRole('link', { name: 'Previous' }).getAttribute('href')).toBe('#/page/1');
      expect(canvas.getByRole('link', { name: 'Next' }).getAttribute('href')).toBe('#/page/3');
    });

    await step('next navigates and becomes a disabled button on the last page', async () => {
      await userEvent.click(canvas.getByRole('link', { name: 'Next' }));
      await waitFor(() => expect(page3.getAttribute('aria-current')).toBe('page'));
      expect(page2.getAttribute('aria-current')).toBeNull();
      expect(canvas.getByRole('button', { name: 'Next' })).toBeDisabled();
    });

    await step('previous navigates and becomes a disabled button on the first page', async () => {
      await userEvent.click(canvas.getByRole('link', { name: 'Previous' }));
      await waitFor(() => expect(page2.getAttribute('aria-current')).toBe('page'));
      await userEvent.click(canvas.getByRole('link', { name: 'Previous' }));
      await waitFor(() => expect(page1.getAttribute('aria-current')).toBe('page'));
      expect(canvas.getByRole('button', { name: 'Previous' })).toBeDisabled();
    });
  },
};
