import type { Meta, StoryObj } from '@storybook/react-vite';
import Pagination from '@/pagination/Pagination';
import PaginationEllipsis from '@/pagination/PaginationEllipsis';
import * as stories from '@/atoms/storybook/PaginationEllipsis.meta';
import PaginationButton from '@/pagination/PaginationButton';
import ArrowBackwardIcon from '@/atoms/icons/ArrowBackward';
import ArrowForwardIcon from '@/atoms/icons/ArrowForward';
import { importNext } from './helpers';

const meta = {
  ...stories.meta,
  tags: ['next', 'skip-playwright'],
  title: 'Navigation/Pagination/PaginationEllipsis',
  component: PaginationEllipsis,
  argTypes: {
    ...stories.meta.argTypes,
    className: {
      control: false,
      description: 'Additional CSS classes applied to the icon element.',
      table: { type: { summary: 'string' } },
    },
    style: {
      control: false,
      description:
        'Inline styles applied to the list item that wraps the icon. Use for truly dynamic values that cannot be expressed as Tailwind classes.',
      table: { type: { summary: 'React.CSSProperties' } },
    },
  },
  parameters: {
    ...stories.meta.parameters,
    docs: {
      ...stories.meta.parameters.docs,
      description: {
        ...stories.meta.parameters.docs.description,
        component: `${stories.meta.parameters.docs.description.component}\n\n${importNext('PaginationEllipsis')}`,
      },
    },
  },
} as Meta<typeof PaginationEllipsis>;

export default meta;

type Story = StoryObj<typeof PaginationEllipsis>;

export const Default: Story = {
  ...stories.Default,
  render: (props) => (
    <Pagination>
      <PaginationButton>
        <ArrowBackwardIcon label="Go back" />
      </PaginationButton>
      <PaginationButton>1</PaginationButton>
      <PaginationEllipsis />
      <PaginationButton>5</PaginationButton>
      <PaginationEllipsis {...props} />
      <PaginationButton>10</PaginationButton>
      <PaginationButton>
        <ArrowForwardIcon label="Go forward" />
      </PaginationButton>
    </Pagination>
  ),
};
