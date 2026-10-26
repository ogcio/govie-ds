import type { Meta, StoryObj } from '@storybook/angular-vite';
import * as stories from '@/atoms/storybook/BreadcrumbEllipsis.meta';
import { GiBreadcrumbs } from '@/breadcrumbs/Breadcrumbs';
import { GiBreadcrumbItemEllipsis } from '@/breadcrumbs/BreadcrumbItemEllipsis';

const meta: Meta = {
  ...stories.meta,
  title: 'Navigation/Breadcrumbs/BreadcrumbItemEllipsis',
  component: GiBreadcrumbItemEllipsis,
  argTypes: {
    ...stories.meta.argTypes,
    class: {
      control: false,
      description: 'Additional CSS classes applied to the icon.',
      table: { type: { summary: 'string' } },
    },
    style: {
      control: false,
      description: 'Inline styles applied to the `li` element that wraps the ellipsis.',
      table: { type: { summary: 'Record<string, string>' } },
    },
  },
};

export default meta;

export const Default: StoryObj = {
  ...stories.Default,
  tags: ['skip-playwright'],
  render: (props) => ({
    props,
    moduleMetadata: {
      imports: [GiBreadcrumbItemEllipsis, GiBreadcrumbs],
    },
    template: `
      <gi-breadcrumbs>
        <gi-breadcrumb-item-ellipsis
          [id]="id"
          [class]="class"
          [style]="style"
          [label]="label"
          [color]="color"
          [size]="size"
          [dataTestId]="dataTestId"
        />
      </gi-breadcrumbs>
    `,
  }),
};
