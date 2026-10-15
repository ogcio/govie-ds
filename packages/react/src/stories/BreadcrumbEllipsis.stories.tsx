import type { Meta, StoryObj } from '@storybook/react-vite';
import * as stories from '@/atoms/storybook/BreadcrumbEllipsis.meta';
import BreadcrumbEllipsis from '@/breadcrumbs/BreadcrumbEllipsis';
import { importNext } from './helpers';
import omit from 'lodash/omit';

const meta = {
  ...stories.meta,
  title: 'Navigation/Breadcrumbs/BreadcrumbEllipsis',
  component: BreadcrumbEllipsis,
  argTypes: {
    ...omit(stories.meta.argTypes, 'styles'),
    style: stories.meta.argTypes.styles,
  },
  parameters: {
    ...stories.meta.parameters,
    docs: {
      description: {
        component: `${stories.meta.parameters.docs.description.component} ${importNext('BreadcrumbEllipsis')}`,
      },
    },
  },
} satisfies Meta<typeof BreadcrumbEllipsis>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  ...stories.Default,
  tags: ['skip-playwright'],
  render: (props) => <BreadcrumbEllipsis {...props} />,
};
