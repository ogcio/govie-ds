import omit from 'lodash/omit';
import type { Meta, StoryObj } from '@storybook/angular-vite';
import { HomeIcon } from '@/atoms';
import { GiBreadcrumbItemEllipsis } from '@/breadcrumbs/BreadcrumbItemEllipsis';
import { GiBreadcrumbItemLink } from '@/breadcrumbs/BreadcrumbItemLink';
import { GiBreadcrumbs } from '@/breadcrumbs/Breadcrumbs';
import * as stories from '@/atoms/storybook/Breadcrumbs.meta';

const meta: Meta = {
  ...stories.meta,
  title: 'Navigation/Breadcrumbs/Breadcrumbs',
  component: GiBreadcrumbs,
  argTypes: {
    ...omit(stories.meta.argTypes, ['className', 'styles']),
    class: stories.meta.argTypes.className,
    style: stories.meta.argTypes.styles,
  },
};

export default meta;

export const Default: StoryObj = {
  ...stories.Default,
  render: (props) => ({
    props,
    moduleMetadata: {
      imports: [GiBreadcrumbs, GiBreadcrumbItemLink, GiBreadcrumbItemEllipsis, HomeIcon],
    },
    template: `
      <gi-breadcrumbs
        [id]="id"
        [class]="class"
        [style]="style"
        [ariaLabel]="ariaLabel"
        [ariaLabelledBy]="ariaLabelledBy"
        [dataTestId]="dataTestId"
      >
        <gi-breadcrumb-item-link href="#" ariaLabel="Home">
          <gi-home-icon />
        </gi-breadcrumb-item-link>
        <gi-breadcrumb-item-ellipsis />
        <gi-breadcrumb-item-link href="#">Travel</gi-breadcrumb-item-link>
        <gi-breadcrumb-item-link href="#" [current]="true">Documentation</gi-breadcrumb-item-link>
      </gi-breadcrumbs>
    `,
  }),
};
