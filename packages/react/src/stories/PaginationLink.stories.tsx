import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Pagination from '@/pagination/Pagination';
import PaginationLink from '@/pagination/PaginationLink';
import * as stories from '@/atoms/storybook/PaginationLink.meta';
import argTypes from '@/atoms/storybook/argTypes';
import { checker } from '@/atoms/storybook/utilities';
import { importNext } from './helpers';

const meta = {
  ...stories.meta,
  tags: ['next'],
  title: 'Navigation/Pagination/PaginationLink',
  // Stop the click from navigating to avoid unexpected navigation in Storybook
  decorators: [
    (Story) => (
      <div onClick={(event) => event.preventDefault()}>
        <Story />
      </div>
    ),
  ],
  args: {
    ...stories.meta.args,
    children: stories.PAGINATION_LINK_LABEL,
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Visible label, usually the page number or "Previous" / "Next".',
      table: { type: { summary: 'ReactNode' } },
    },
    ...stories.meta.argTypes,
    className: {
      ...argTypes.class,
      description: 'Additional CSS classes applied to the link element.',
    },
    style: {
      ...argTypes.style,
      description: 'Inline styles applied to the link element.',
      table: { type: { summary: 'React.CSSProperties' } },
    },
    asChild: {
      control: false,
      description:
        'When true, `PaginationLink` renders a Radix Slot instead of an anchor. The child element receives the styling classes. Useful for composing with framework routers like next/link.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'undefined' },
      },
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
  tags: ['skip-playwright'],
  render: (props) => (
    <Pagination>
      <PaginationLink {...props} />
    </Pagination>
  ),
};

export const Current: Story = {
  ...stories.Current,
  tags: ['skip-playwright'],
  render: (props) => (
    <Pagination>
      <PaginationLink {...props} />
    </Pagination>
  ),
};

// Example custom component for AsChild story
const CustomLink = (props: React.ComponentProps<'a'> & { 'custom-var'?: string }) => <a {...props}></a>;

export const AsChild: Story = {
  tags: ['skip-playwright'],
  args: {
    asChild: true,
    current: true,
    href: undefined,
    id: 'pagination-link-aschild-id',
    ariaLabel: 'Go to page 5',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Use `asChild` to keep pagination link styles while rendering your own element (for example Next.js `<Link>`) instead of the built-in anchor.\n\nKeep the same props on `PaginationLink` (`current`, `ariaLabel` and so on). Put `href` and any child-specific props directly on the child.\n\nIn this example, `<CustomLink>` renders an `<a>` with merged attributes such as `id` and `aria-current`, while keeping its own `custom-var`.',
      },
    },
  },
  render: (props) => (
    <Pagination>
      <PaginationLink {...props}>
        <CustomLink data-testid="custom-link" custom-var="some-other-var" href="/page/5">
          {stories.PAGINATION_LINK_LABEL}
        </CustomLink>
      </PaginationLink>
    </Pagination>
  ),
  play: async ({ canvas, step, args }) => {
    // the custom link sits directly inside the list item, not inside another anchor
    const customLink = canvas.getByTestId('custom-link');
    expect(customLink.parentElement?.tagName).toBe('LI');

    // props from PaginationLink merge onto the child
    const check = checker('custom-link', canvas, step);
    await check.is('a');
    await check.attributes({
      'custom-var': 'some-other-var',
      href: '/page/5',
      'aria-current': 'page',
      'aria-label': args.ariaLabel,
      id: args.id,
    });

    await step('uses ariaLabel as the accessible name of the child', async () => {
      expect(canvas.getByRole('link', { name: args.ariaLabel })).toBe(customLink);
    });
  },
};
