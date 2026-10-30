import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { GiPagination } from '@/pagination/Pagination';
import { GiPaginationItemButton, GiPaginationButtonDirective } from '@/pagination/PaginationItemButton';
import { GiPaginationItemLink, GiPaginationLinkDirective } from '@/pagination/PaginationItemLink';
import { GiPaginationItemEllipsis } from '@/pagination/PaginationItemEllipsis';
import { getPaginationList } from '@/atoms/pagination/utils';
import ArrowBackward from '@/atoms/icons/ArrowBackward';
import ArrowForward from '@/atoms/icons/ArrowForward';
import { GiStack } from '@/Stack';
import * as stories from '@/atoms/storybook/Pagination.meta';

const meta: Meta<GiPagination> = {
  ...stories.meta,
  title: 'Navigation/Pagination/Pagination',
  component: GiPagination,
  argTypes: {
    ...stories.meta.argTypes,
    class: {
      control: false,
      description: 'Additional CSS classes applied to the nav element.',
      table: { type: { summary: 'string' } },
    },
    style: {
      control: false,
      description: 'Inline styles applied to the nav element.',
      table: { type: { summary: 'Record<string, string>' } },
    },
  },
  parameters: {
    ...stories.meta.parameters,
    docs: {
      ...stories.meta.parameters.docs,
      description: {
        ...stories.meta.parameters.docs.description,
        component: `${stories.meta.parameters.docs.description.component}\n\nIn Angular, wrap each \`gi-pagination-item-link\`, \`gi-pagination-item-button\` and \`gi-pagination-item-ellipsis\` in a \`gi-pagination-item\` so it renders as a list item.`,
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

const paginationState = {
  currentPage: 5,
  totalPages: 10,
  pages(this: PaginationStoryState) {
    return getPaginationList({ current: this.currentPage, total: this.totalPages, size: 7 });
  },
  select(this: PaginationStoryState, page: number) {
    this.currentPage = page;
  },
};

export const Default: Story = {
  ...stories.Default,
  render: (props) => ({
    props: { ...props, ...paginationState },
    moduleMetadata: {
      imports: [
        GiPagination,
        GiPaginationItemButton,
        GiPaginationItemLink,
        GiPaginationItemEllipsis,
        ArrowBackward,
        ArrowForward,
      ],
    },
    template: `
      <gi-pagination [id]="id" [ariaLabel]="ariaLabel" [dataTestId]="dataTestId">
          <gi-pagination-item-button class="gi-flex gi-gap-2" [disabled]="currentPage === 1" (click)="select(currentPage - 1)">
            <gi-arrow-backward-icon />
            Previous
          </gi-pagination-item-button>
        @for (page of pages(); track $index) {
            @if (page === -1) {
              <gi-pagination-item-ellipsis />
            } @else {
              <gi-pagination-item-button
                [current]="page === currentPage"
                (click)="select(page)"
              >
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
    const lists = [1, 5, 10].map((currentPage) => ({
      currentPage,
      pages: getPaginationList({ current: currentPage, total, size }),
    }));

    return {
      props: { total, lists },
      moduleMetadata: {
        imports: [GiPagination, GiPaginationItemButton, GiPaginationItemEllipsis, GiStack, ArrowBackward, ArrowForward],
      },
      template: `
        <gi-stack align="center" [gap]="2">
          @for (list of lists; track list.currentPage) {
            <gi-pagination [ariaLabel]="'Page ' + list.currentPage + ' of ' + total">
              <gi-pagination-item-button class="gi-flex gi-gap-2" [disabled]="list.currentPage === 1">
                <gi-arrow-backward-icon />
                Previous
              </gi-pagination-item-button>
              @for (page of list.pages; track $index) {
                @if (page === -1) {
                  <gi-pagination-item-ellipsis />
                } @else {
                  <gi-pagination-item-button [current]="page === list.currentPage">{{ page }}</gi-pagination-item-button>
                }
              }
              <gi-pagination-item-button class="gi-flex gi-gap-2" [disabled]="list.currentPage === total">
                Next
                <gi-arrow-forward-icon />
              </gi-pagination-item-button>
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
          'Adds the pagination styling to a plain `a` with `giPaginationLink` and a plain `button` with `giPaginationButton`, each inside an `li`. Both directives take `current`, and `giPaginationButton` also takes `disabled`, so the elements keep their native attributes and `(click)` handlers.',
      },
    },
  },
  render: (_props) => ({
    props: { ...paginationState },
    moduleMetadata: {
      imports: [
        GiPagination,
        GiPaginationItemEllipsis,
        GiPaginationButtonDirective,
        GiPaginationLinkDirective,
        ArrowBackward,
        ArrowForward,
      ],
    },
    template: `
      <gi-pagination ariaLabel="Pagination" dataTestId="pagination-directive">
        <li>
          <button giPaginationButton type="button" class="gi-flex gi-gap-2" [disabled]="currentPage === 1" (click)="select(currentPage - 1)">
            <gi-arrow-backward-icon />
            Previous
          </button>
        </li>
        @for (page of pages(); track $index) {
          <li>
            @if (page === -1) {
              <gi-pagination-item-ellipsis />
            } @else {
              <a giPaginationLink href="#" [current]="page === currentPage" (click)="$event.preventDefault(); select(page)">{{ page }}</a>
            }
          </li>
        }
        <li>
          <button giPaginationButton type="button" class="gi-flex gi-gap-2" [disabled]="currentPage === totalPages" (click)="select(currentPage + 1)">
            Next
            <gi-arrow-forward-icon />
          </button>
        </li>
      </gi-pagination>
    `,
  }),
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
