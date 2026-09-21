import type { StoryObj } from '@storybook/react-vite';
import * as stories from '@/atoms/storybook/Breadcrumbs.meta';
import { BreadcrumbEllipsis, BreadcrumbLink, Breadcrumbs } from '@/atoms';
import { importDisclaimer } from './helpers';

const { styles, ...remainingArgTypes } = stories.breadcrumbsMeta.argTypes;

const meta = {
  ...stories.breadcrumbsMeta,
  title: 'Navigation/Breadcrumbs/Breadcrumbs',
  argTypes: {
    ...remainingArgTypes,
    style: styles,
  },
  parameters: {
    ...stories.breadcrumbsMeta.parameters,
    docs: {
      description: {
        component: `${stories.breadcrumbsMeta.parameters.docs.description.component} ${importDisclaimer('Breadcrumbs')}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const Default: Story = {
  ...stories.Default,
  render: (props) => (
    <Breadcrumbs {...props}>
      <BreadcrumbLink href="#">Home</BreadcrumbLink>
      <BreadcrumbEllipsis />
      <BreadcrumbLink href="#">Travel</BreadcrumbLink>
      <BreadcrumbLink href="#" current>
        Documentation
      </BreadcrumbLink>
    </Breadcrumbs>
  ),
};
