import omit from 'lodash/omit';
import type { Meta, StoryObj } from '@storybook/angular-vite';
import { GiBreadcrumbEllipsis } from '@/breadcrumbs/BreadcrumbEllipsis';
import * as stories from '@/atoms/storybook/BreadcrumbEllipsis.meta';

const meta: Meta = {
  ...stories.meta,
  title: 'Navigation/Breadcrumbs/BreadcrumbEllipsis',
  component: GiBreadcrumbEllipsis,
  argTypes: {
    ...omit(stories.meta.argTypes, ['className', 'styles']),
    class: stories.meta.argTypes.className,
    style: stories.meta.argTypes.styles,
  },
};

export default meta;

export const Default: StoryObj = {
  ...stories.Default,
  tags: ['skip-playwright'],
  render: (props) => ({
    props,
    moduleMetadata: {
      imports: [GiBreadcrumbEllipsis],
    },
    template: `
      <gi-breadcrumb-ellipsis
        [id]="id"
        [class]="class"
        [style]="style"
        [color]="color"
        [size]="size"
        [dataTestId]="dataTestId"
      />
    `,
  }),
};
