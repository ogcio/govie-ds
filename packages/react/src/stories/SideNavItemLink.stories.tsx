import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { checker } from '@/atoms/storybook/utilities';
import SideNav from '@/atoms/sidenav/SideNav';
import SideNavItemLink from '@/SideNav/SideNavItemLink';
import * as stories from '@/atoms/storybook/SideNavItemLink.meta';
import { importNext } from './helpers';

const meta = {
  ...stories.sideNavItemLinkMeta,
  argTypes: {
    ...stories.sideNavItemLinkMeta.argTypes,
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
      ...stories.sideNavItemLinkMeta.argTypes.actions,
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
        component: `${stories.sideNavItemLinkMeta.parameters.docs.description.component}${importNext('SideNavItemLink')}`,
      },
    },
  },
} as Meta<typeof SideNavItemLink>;

export default meta;
type Story = StoryObj<typeof SideNavItemLink>;

export const Default: Story = {
  ...stories.Default,
  tags: ['skip-playwright'],
  render: (props) => (
    <SideNav className="gi-max-w-xs" ariaLabel="Side navigation">
      <SideNavItemLink {...props}>{props.children}</SideNavItemLink>
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
        <CustomLink data-testid="custom-link" custom-var="some-other-var" href="/custom">
          Custom Link
        </CustomLink>
      </SideNavItemLink>
    </SideNav>
  ),
  play: async ({ canvas, step, args }) => {
    // establish the custom link is nested inside the list-item, not an anchor
    const customLink = canvas.getByTestId('custom-link');
    const parent = customLink.parentElement;
    expect(parent).toBeInTheDocument();
    expect((parent as HTMLElement).tagName).toBe('LI');

    // check properties have merged
    const check = checker('custom-link', canvas, step);
    await check.is('a');
    await check.attributes({
      'custom-var': 'some-other-var',
      href: '/custom',
      'aria-current': args.ariaCurrent,
      id: args.id,
    });
  },
};
