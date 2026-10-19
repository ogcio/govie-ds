import type { Meta, StoryObj } from '@storybook/react-vite';
import Pagination from '@/atoms/pagination/Pagination';
import PaginationEllipsis from '@/atoms/pagination/PaginationEllipsis';
import * as stories from '@/atoms/storybook/PaginationEllipsis.meta';
import PaginationButton from '@/atoms/pagination/PaginationButton';
import ArrowBackwardIcon from '@/atoms/icons/ArrowBackward';
import ArrowForwardIcon from '@/atoms/icons/ArrowForward';
import { importNext } from './helpers';

const meta = {
  ...stories.meta,
  tags: ['next', 'skip-playwright'],
  title: 'Navigation/Pagination (Next)/PaginationEllipsis',
  component: PaginationEllipsis,
  parameters: {
    ...stories.meta.parameters,
    docs: {
      ...stories.meta.parameters.docs,
      description: {
        ...stories.meta.parameters.docs.description,
        component: `${stories.meta.parameters.docs.description.component}\n\n${importNext('PaginationButton')}`,
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
