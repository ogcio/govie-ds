import type { StoryObj } from '@storybook/react-vite';
import * as stories from '@/atoms/storybook/BreadcrumbEllipsis.meta';
import { BreadcrumbEllipsis } from '@/atoms';
import { importDisclaimer } from './helpers';

const meta = {
  ...stories.breadcrumbEllipsisMeta,
  title: 'Navigation/Breadcrumbs/BreadcrumbEllipsis',
  parameters: {
    ...stories.breadcrumbEllipsisMeta.parameters,
    docs: {
      description: {
        component: `${stories.breadcrumbEllipsisMeta.parameters.docs.description.component} ${importDisclaimer('BreadcrumbEllipsis')}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BreadcrumbEllipsis>;

export const Default: Story = {
  ...stories.Default,
  render: (props) => <BreadcrumbEllipsis {...props} />,
};
