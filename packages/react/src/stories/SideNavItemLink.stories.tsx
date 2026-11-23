import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent } from 'storybook/test';
import { checker } from '@/atoms/storybook/utilities';
import SideNav from '@/SideNav/SideNav';
import SideNavItemLink from '@/SideNav/SideNavItemLink';
import * as stories from '@/atoms/storybook/SideNavItemLink.meta';
import { importNext } from './helpers';
import omit from 'lodash/omit';

const meta = {
  ...stories.sideNavItemLinkMeta,
  argTypes: {
    ...omit(stories.sideNavItemLinkMeta.argTypes, 'styles'),
    style: stories.sideNavItemLinkMeta.argTypes.styles,
    asChild: {
      control: false,
      description:
        'When true, `SideNavItemLink` renders a Radix Slot instead of an anchor. The child element receives the styling classes. Useful for composing with framework routers like next/link.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    actions: {
      control: { disable: true },
      description:
        'Content shown to the right of the item, for quick actions in its context (for example an `IconButton`).',
      table: { type: { summary: 'React.ReactNode' } },
    },
  },
  title: 'Navigation/SideNav/SideNavItemLink',
  component: SideNavItemLink,
  parameters: {
    ...stories.sideNavItemLinkMeta.parameters,
    docs: {
      ...stories.sideNavItemLinkMeta.parameters.docs,
      description: {
        component: `${stories.sideNavItemLinkMeta.parameters.docs.description.component}\n\nPlace \`SideNavItemLink\` inside \`SideNav\` or \`SideNavGroup\`.${importNext('SideNavItemLink')}`,
      },
    },
  },
} satisfies Meta<typeof SideNavItemLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  ...stories.Default,
  tags: ['skip-playwright'],
  render: (props) => (
    <SideNav className="gi-max-w-xs" ariaLabel="Side navigation">
      <SideNavItemLink {...props}>Homepage</SideNavItemLink>
    </SideNav>
  ),
};

// Example custom component for AsChild story
const CustomLink = (props: React.ComponentProps<'a'> & { 'custom-var'?: string }) => <a {...props}></a>;

export const AsChild: Story = {
  tags: ['skip-playwright'],
  args: {
    asChild: true,
    ariaCurrent: 'page',
    className: 'parent-class',
    external: true,
    ariaLabel: 'Custom link label',
    dataTestId: 'parent-link',
    // preventDefault stops the click navigating the Storybook iframe / opening a new tab
    onClick: fn((event: React.MouseEvent) => event.preventDefault()),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Use `asChild` to keep side-nav item styles while rendering your own element (for example Next.js `<Link>`) instead of the built-in link.\n\nKeep the same props on `SideNavItemLink` (`selected`, `ariaCurrent`, `external`, `actions` and so on). Put `href` and any child-specific props directly on the child.\n\nIn this example, `<CustomLink>` renders an `<a>` with merged attributes such as `id`, `data-testid`, and `aria-current`, plus computed `target`, `rel`, and `tabIndex`, while keeping its own `custom-var`.',
      },
    },
  },
  render: (props) => (
    <SideNav className="gi-max-w-xs" ariaLabel="Side navigation">
      <SideNavItemLink {...props}>
        <CustomLink data-testid="custom-link" custom-var="some-other-var" href="/custom" className="custom-class">
          Custom Link
        </CustomLink>
      </SideNavItemLink>
    </SideNav>
  ),
  play: async ({ canvas, step, args }) => {
    // establish the custom link is nested inside the list-item, not an anchor
    await step('child data-testid wins on conflicting dataTestId', async () => {
      expect(canvas.queryByTestId('parent-link')).toBeNull();
    });
    const customLink = canvas.getByTestId('custom-link');
    const parent = customLink.parentElement;
    expect(parent).toBeInTheDocument();
    expect((parent as HTMLElement).tagName).toBe('LI');

    await step('onClick passed to SideNavItemLink fires when the child is clicked', async () => {
      await userEvent.click(customLink);
      expect(args.onClick).toHaveBeenCalledOnce();
    });

    await step('properties have merged correctly', async () => {
      const check = checker('custom-link', canvas, step);
      await check.is('a');
      await check.attributes({
        'custom-var': 'some-other-var',
        href: '/custom',
        'aria-current': args.ariaCurrent,
        id: args.id,
        'aria-label': args.ariaLabel,
        target: '_blank',
        rel: 'noreferrer noopener',
      });
      expect(customLink).toHaveClass('custom-class', 'parent-class');
    });
  },
};
