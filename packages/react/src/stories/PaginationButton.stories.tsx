import type { Meta, StoryObj } from '@storybook/react-vite';
import Pagination from '@/pagination/Pagination';
import PaginationButton from '@/pagination/PaginationButton';
import * as stories from '@/atoms/storybook/PaginationButton.meta';
import ArrowBackwardIcon from '@/atoms/icons/ArrowBackward';
import ArrowForwardIcon from '@/atoms/icons/ArrowForward';
import { importNext } from './helpers';

const meta = {
  ...stories.meta,
  title: 'Navigation/Pagination/PaginationButton',
  tags: ['next'],
  args: {
    ...stories.meta.args,
    children: stories.PAGINATION_BUTTON_LABEL,
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Visible label, usually the page number or "Previous" / "Next".',
      table: { type: { summary: 'ReactNode' } },
    },
    ...stories.meta.argTypes,
    className: {
      control: false,
      description: 'Additional CSS classes applied to the button element.',
      table: { type: { summary: 'string' } },
    },
    style: {
      control: false,
      description: 'Inline styles applied to the button element. Prefer className with gi-* Tailwind utilities.',
      table: { type: { summary: 'React.CSSProperties' } },
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler for the page button.',
      table: { type: { summary: '(event: any) => void' } },
    },
    onFocus: {
      action: 'focused',
      description: 'Focus handler for the page button.',
      table: { type: { summary: '(event: any) => void' } },
    },
    onBlur: {
      action: 'blurred',
      description: 'Blur handler for the page button.',
      table: { type: { summary: '(event: any) => void' } },
    },
    onKeyDown: {
      action: 'keydown',
      description: 'Key down handler for the page button.',
      table: { type: { summary: '(event: any) => void' } },
    },
    onKeyUp: {
      action: 'keyup',
      description: 'Key up handler for the page button.',
      table: { type: { summary: '(event: any) => void' } },
    },
  },
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
  component: PaginationButton,
} as Meta<typeof PaginationButton>;

export default meta;

type Story = StoryObj<typeof PaginationButton>;

export const Default: Story = {
  ...stories.Default,
  tags: ['skip-playwright'],
  render: (props) => (
    <Pagination>
      <PaginationButton {...props} />
    </Pagination>
  ),
};

export const Current: Story = {
  ...stories.Current,
  tags: ['skip-playwright'],
  render: (props) => (
    <Pagination>
      <PaginationButton {...props} />
    </Pagination>
  ),
};

export const Disabled: Story = {
  ...stories.Disabled,
  render: (props) => (
    <Pagination>
      <PaginationButton {...props} className="gi-flex gi-gap-2">
        <ArrowBackwardIcon />
        Previous
      </PaginationButton>
      <PaginationButton current>1</PaginationButton>
      <PaginationButton disabled className="gi-flex gi-gap-2">
        Next
        <ArrowForwardIcon />
      </PaginationButton>
    </Pagination>
  ),
};
