import type { Meta, StoryObj } from '@storybook/react-vite';
import * as stories from '@/atoms/storybook/Breadcrumbs.meta';
import Breadcrumbs from '@/breadcrumbs/Breadcrumbs';
import BreadcrumbLink from '@/breadcrumbs/BreadcrumbLink';
import BreadcrumbEllipsis from '@/breadcrumbs/BreadcrumbEllipsis';
import HomeIcon from '@/atoms/icons/Home';
import argTypes from '@/atoms/storybook/argTypes';
import { importNext } from './helpers';

const meta = {
  ...stories.meta,
  title: 'Navigation/Breadcrumbs/Breadcrumbs',
  component: Breadcrumbs,
  argTypes: {
    ...stories.meta.argTypes,
    className: argTypes.class,
    style: { ...argTypes.style, table: { type: { summary: 'React.CSSProperties' } } },
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
