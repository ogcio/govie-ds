import type { Meta, StoryObj } from '@storybook/react-vite';
import * as stories from '@/atoms/storybook/Breadcrumbs.meta';
import Breadcrumbs from '@/breadcrumbs/Breadcrumbs';
import BreadcrumbLink from '@/breadcrumbs/BreadcrumbLink';
import BreadcrumbEllipsis from '@/breadcrumbs/BreadcrumbEllipsis';
import HomeIcon from '@/atoms/icons/Home';
import { importNext } from './helpers';
import omit from 'lodash/omit';

const meta = {
  ...stories.meta,
  title: 'Navigation/Breadcrumbs/Breadcrumbs',
  component: Breadcrumbs,
  argTypes: {
    ...omit(stories.meta.argTypes, 'styles'),
    style: stories.meta.argTypes.styles,
  },
  parameters: {
    ...stories.meta.parameters,
    docs: {
      description: {
        component: `${stories.meta.parameters.docs.description.component} ${importNext('Breadcrumbs')}`,
      },
    },
  },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  ...stories.Default,
  render: (props) => (
    <Breadcrumbs {...props}>
      <BreadcrumbLink href="#" ariaLabel="Home">
        <HomeIcon />
      </BreadcrumbLink>
      <BreadcrumbEllipsis />
      <BreadcrumbLink href="#">Travel</BreadcrumbLink>
      <BreadcrumbLink href="#" current>
        Documentation
      </BreadcrumbLink>
    </Breadcrumbs>
  ),
};
