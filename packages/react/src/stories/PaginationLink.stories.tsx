import type { Meta, StoryObj } from '@storybook/react-vite';
import Pagination from '@/pagination/Pagination';
import PaginationLink from '@/pagination/PaginationLink';
import * as stories from '@/atoms/storybook/PaginationLink.meta';
import { importNext } from './helpers';
const meta = {
  ...stories.meta,
  tags: ['next', 'skip-playwright'],
  title: 'Navigation/Pagination/PaginationLink',
  args: {
    ...stories.meta.args,
    children: stories.PAGINATION_LINK_LABEL,
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Visible label, usually the page number.',
      table: { type: { summary: 'ReactNode' } },
    },
    ...stories.meta.argTypes,
    className: {
      control: false,
      description: 'Additional CSS classes applied to the link element.',
      table: { type: { summary: 'string' } },
    },
    style: {
      control: false,
      description: 'Inline styles applied to the link element. Prefer className with gi-* Tailwind utilities.',
      table: { type: { summary: 'React.CSSProperties' } },
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler for the page link.',
      table: { type: { summary: '(event: any) => void' } },
    },
    onFocus: {
      action: 'focused',
      description: 'Focus handler for the page link.',
      table: { type: { summary: '(event: any) => void' } },
    },
    onBlur: {
      action: 'blurred',
      description: 'Blur handler for the page link.',
      table: { type: { summary: '(event: any) => void' } },
    },
    onKeyDown: {
      action: 'keydown',
      description: 'Key down handler for the page link.',
      table: { type: { summary: '(event: any) => void' } },
    },
    onKeyUp: {
      action: 'keyup',
      description: 'Key up handler for the page link.',
      table: { type: { summary: '(event: any) => void' } },
    },
  },
  component: PaginationLink,
  parameters: {
    ...stories.meta.parameters,
    docs: {
      ...stories.meta.parameters.docs,
      description: {
        ...stories.meta.parameters.docs.description,
        component: `${stories.meta.parameters.docs.description.component}\n\n${importNext('PaginationLink')}`,
      },
    },
  },
} as Meta<typeof PaginationLink>;

export default meta;

type Story = StoryObj<typeof PaginationLink>;

export const Default: Story = {
  ...stories.Default,
  render: (props) => (
    <Pagination>
      <PaginationLink {...props} />
    </Pagination>
  ),
};

export const Current: Story = {
  ...stories.Current,
  render: (props) => (
    <Pagination>
      <PaginationLink {...props} />
    </Pagination>
  ),
};
