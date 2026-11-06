import type { Meta, StoryObj } from '@storybook/angular-vite';
import { GiPagination } from '@/pagination/Pagination';
import { GiPaginationItemButton } from '@/pagination/PaginationItemButton';
import { GiPaginationItemEllipsis } from '@/pagination/PaginationItemEllipsis';
import ArrowBackward from '@/atoms/icons/ArrowBackward';
import ArrowForward from '@/atoms/icons/ArrowForward';
import * as stories from '@/atoms/storybook/PaginationEllipsis.meta';

const meta: Meta<GiPaginationItemEllipsis> = {
  ...stories.meta,
  title: 'Navigation/Pagination/PaginationItemEllipsis',
  component: GiPaginationItemEllipsis,
  argTypes: {
    ...stories.meta.argTypes,
    class: {
      control: false,
      description: 'Additional CSS classes applied to the icon element.',
      table: { type: { summary: 'string' } },
    },
    style: {
      control: false,
      description:
        'Inline styles applied to the list item that wraps the icon. Use for truly dynamic values that cannot be expressed as Tailwind classes.',
      table: { type: { summary: 'string | Record<string, string | number | null | undefined>' } },
    },
  },
  parameters: {
    ...stories.meta.parameters,
    docs: {
      ...stories.meta.parameters.docs,
      description: {
        ...stories.meta.parameters.docs.description,
        component: `${stories.meta.parameters.docs.description.component}\n\nPlace \`gi-pagination-item-ellipsis\` directly inside \`gi-pagination\`, including alongside the directives.`,
      },
    },
  },
};

export default meta;

type Story = StoryObj<GiPaginationItemEllipsis>;

export const Default: Story = {
  ...stories.Default,
  tags: ['skip-playwright'],
  render: (props) => ({
    props,
    moduleMetadata: {
      imports: [GiPagination, GiPaginationItemButton, GiPaginationItemEllipsis, ArrowBackward, ArrowForward],
    },
    template: `
      <gi-pagination>
        <gi-pagination-item-button>
          <gi-arrow-backward-icon label="Go back" />
        </gi-pagination-item-button>
        <gi-pagination-item-button>1</gi-pagination-item-button>
        <gi-pagination-item-ellipsis />
        <gi-pagination-item-button>5</gi-pagination-item-button>
        <gi-pagination-item-ellipsis
          [id]="id"
          [size]="size"
          [color]="color"
          [label]="label"
          [class]="class"
          [style]="style"
          [dataTestId]="dataTestId"
        />
        <gi-pagination-item-button>10</gi-pagination-item-button>
        <gi-pagination-item-button>
          <gi-arrow-forward-icon label="Go forward" />
        </gi-pagination-item-button>
      </gi-pagination>
    `,
  }),
};
