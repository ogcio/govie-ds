import type { Meta, StoryObj } from '@storybook/react-vite';
import * as stories from '@/atoms/storybook/BreadcrumbEllipsis.meta';
import BreadcrumbEllipsis from '@/breadcrumbs/BreadcrumbEllipsis';
import { importNext } from './helpers';

const meta = {
  ...stories.meta,
  title: 'Navigation/Breadcrumbs/BreadcrumbEllipsis',
  component: BreadcrumbEllipsis,
  argTypes: {
    ...stories.meta.argTypes,
    className: {
      control: false,
      description: 'Additional CSS classes applied to the icon.',
      table: { type: { summary: 'string' } },
    },
    style: {
      control: { disable: true },
      description:
        'Inline styles applied directly to the list-item parent of the icon. Use for truly dynamic values that cannot be expressed as Tailwind classes.',
      table: { type: { summary: 'React.CSSProperties' } },
    },
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
