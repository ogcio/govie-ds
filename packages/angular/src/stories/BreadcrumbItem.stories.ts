import type { Meta, StoryObj } from '@storybook/angular-vite';
import { GiBreadcrumbItemDirective } from '@/breadcrumbs/BreadcrumbItem';
import { GiBreadcrumbLinkDirective } from '@/breadcrumbs/BreadcrumbItemLink';
import { GiBreadcrumbs } from '@/breadcrumbs/Breadcrumbs';

const meta: Meta<GiBreadcrumbItemDirective> = {
  title: 'Navigation/Breadcrumbs/BreadcrumbItem',
  component: GiBreadcrumbItemDirective,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component:
          'The `giBreadcrumbItem` directive styles a plain `li` as one level of a breadcrumb trail. Use it to wrap an `a` with the `giBreadcrumbLink` directive when you need to own the anchor element, for example to use `routerLink`. Nest it inside `gi-breadcrumbs`.',
      },
    },
  },
};

export default meta;

export const Default: StoryObj<GiBreadcrumbItemDirective> = {
  tags: ['skip-playwright'],
  render: () => ({
    moduleMetadata: {
      imports: [GiBreadcrumbs, GiBreadcrumbItemDirective, GiBreadcrumbLinkDirective],
    },
    template: `
      <gi-breadcrumbs>
        <li giBreadcrumbItem>
          <a giBreadcrumbLink href="#">Home</a>
        </li>
        <li giBreadcrumbItem>
          <a giBreadcrumbLink href="#" current>Accounts</a>
        </li>
      </gi-breadcrumbs>
    `,
  }),
};
