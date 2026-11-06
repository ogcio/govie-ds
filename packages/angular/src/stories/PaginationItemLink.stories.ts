import type { StoryObj } from '@storybook/angular-vite';
import { GiPagination } from '@/pagination/Pagination';
import { GiPaginationItemLink } from '@/pagination/PaginationItemLink';
import * as stories from '@/atoms/storybook/PaginationLink.meta';

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
        component: `${stories.meta.parameters.docs.description.component}\n\nPlace \`gi-pagination-item-link\` directly inside \`gi-pagination\`. To use your own \`a\`, for example with \`routerLink\`, use the \`giPaginationLink\` directive instead (see the Directive and WithRouter stories in Pagination).`,
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
