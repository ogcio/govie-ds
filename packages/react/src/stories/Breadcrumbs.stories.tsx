import type { StoryObj } from '@storybook/react-vite';
import * as stories from '@/atoms/storybook/Breadcrumbs.meta';
import { BreadcrumbEllipsis, BreadcrumbLink, Breadcrumbs } from '@/atoms';

const meta = {
  ...stories.breadcrumbsMeta,
  title: 'Navigation/Breadcrumbs2',
  tags: ['!dev', '!autodocs', 'skip-playwright'],
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

/**
 * This is a DRAFT Storybook for the Breadcrumb component. Implementation is still being finalised
 */

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
