import type { StoryObj } from '@storybook/angular-vite';
import { GiPagination } from '@/pagination/Pagination';
import { GiPaginationItemButton } from '@/pagination/PaginationItemButton';
import ArrowBackward from '@/atoms/icons/ArrowBackward';
import ArrowForward from '@/atoms/icons/ArrowForward';
import * as stories from '@/atoms/storybook/PaginationButton.meta';

const meta = {
  ...stories.meta,
  title: 'Navigation/Pagination/PaginationItemButton',
  component: GiPaginationItemButton,
  args: {
    ...stories.meta.args,
    children: stories.PAGINATION_BUTTON_LABEL,
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
      description: 'Additional CSS classes applied to the button element.',
      table: { type: { summary: 'string' } },
    },
    style: {
      control: false,
      description:
        'Inline styles applied to the button element. Use for truly dynamic values that cannot be expressed as Tailwind classes.',
      table: { type: { summary: 'Record<string, string>' } },
    },
  },
  parameters: {
    ...stories.meta.parameters,
    docs: {
      ...stories.meta.parameters.docs,
      description: {
        ...stories.meta.parameters.docs.description,
        component: `${stories.meta.parameters.docs.description.component}\n\nPlace \`gi-pagination-item-button\` directly inside \`gi-pagination\`. To use your own \`button\`, use the \`giPaginationButton\` directive instead (see the Directive story in Pagination).`,
      },
    },
  },
};

export default meta;

type Story = StoryObj<GiPaginationItemButton>;

const imports = [GiPagination, GiPaginationItemButton];

export const Default: Story = {
  ...stories.Default,
  tags: ['skip-playwright'],
  render: (props) => ({
    props,
    moduleMetadata: { imports },
    template: `
      <gi-pagination>
        <gi-pagination-item-button
          [id]="id"
          [current]="current"
          [disabled]="disabled"
          [class]="class"
          [style]="style"
          [ariaLabel]="ariaLabel"
          [dataTestId]="dataTestId"
        >
          {{ children }}
        </gi-pagination-item-button>
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
        <gi-pagination-item-button
          [id]="id"
          [current]="current"
          [disabled]="disabled"
          [class]="class"
          [style]="style"
          [ariaLabel]="ariaLabel"
          [dataTestId]="dataTestId"
        >
          {{ children }}
        </gi-pagination-item-button>
      </gi-pagination>
    `,
  }),
};

export const Disabled: Story = {
  ...stories.Disabled,
  tags: ['skip-playwright'],
  render: (props) => ({
    props,
    moduleMetadata: { imports: [...imports, ArrowBackward, ArrowForward] },
    template: `
      <gi-pagination>
        <gi-pagination-item-button
          [id]="id"
          [current]="current"
          [disabled]="disabled"
          [class]="'gi-flex gi-gap-2 ' + (class || '')"
          [style]="style"
          [ariaLabel]="ariaLabel"
          [dataTestId]="dataTestId"
        >
          <gi-arrow-backward-icon />
          Previous
        </gi-pagination-item-button>
        <gi-pagination-item-button current>1</gi-pagination-item-button>
        <gi-pagination-item-button disabled class="gi-flex gi-gap-2">
          Next
          <gi-arrow-forward-icon />
        </gi-pagination-item-button>
      </gi-pagination>
    `,
  }),
};
