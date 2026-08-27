import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import HeaderNav from '@/atoms/header/HeaderNav';
import HeaderNavItemLink from '@/HeaderNavItemLink';
import HeaderSection from '@/atoms/header/HeaderSection';
import { headerNavItemLinkMeta, Default as defaultStory } from '@/atoms/storybook/HeaderNavItemLink.meta';
import { checker } from '@/atoms/storybook/utilities';

const meta = {
  ...headerNavItemLinkMeta,
  argTypes: {
    ...headerNavItemLinkMeta.argTypes,
    asChild: {
      control: false,
      description:
        'When true, `HeaderNavItemLink` renders a Radix Slot instead of an anchor. The child element receives the styling classes. Useful for composing with framework routers like next/link.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  title: 'Layout/Header/HeaderNavItemLink',
  component: HeaderNavItemLink,
  parameters: {
    ...headerNavItemLinkMeta.parameters,
    docs: {
      ...headerNavItemLinkMeta.parameters.docs,
      description: {
        component: `${headerNavItemLinkMeta.parameters.docs.description.component}\n\nThis is the recommended HeaderNavItemLink component for new projects. It is available via the \`next\` entry point of the React package:\n\n\`\`\`tsx\nimport { HeaderNavItemLink } from "@ogcio/design-system-react/next";\n\`\`\``,
      },
    },
  },
} as Meta<typeof HeaderNavItemLink>;

export default meta;

type Story = StoryObj<typeof HeaderNavItemLink>;

export const Default: Story = {
  ...defaultStory,
  tags: ['skip-playwright'],
  render: (props) => (
    <HeaderSection>
      <HeaderNav ariaLabel="Primary navigation">
        <HeaderNavItemLink {...props}>{props.children}</HeaderNavItemLink>
      </HeaderNav>
    </HeaderSection>
  ),
};

// Example custom component for AsChild story
const CustomLink = (props: any) => <a {...props}></a>;

export const AsChild: Story = {
  tags: ['skip-playwright'],
  args: {
    asChild: true,
    visible: { base: false, md: true },
    ariaCurrent: 'page',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Use `asChild` to keep header nav-item styles while rendering your own element (for example Next.js `<Link>`) instead of the built-in link.\n\nKeep the same props on `HeaderNavItemLink` (`visible`, `ariarCurrent`, `external` and so on). Put `href` and any child-specific props directly on the child. \n\nIn this example, `<CustomLink>` renders an `<a>` with merged attributes such as `id`, `data-testid`, and `aria-current`, plus computed `target`, `rel`, and `tabIndex`, while keeping its own `custom-var`.',
      },
    },
  },
  render: (props) => (
    <HeaderSection>
      <HeaderNav ariaLabel="Primary Navigation">
        <HeaderNavItemLink {...props}>
          <CustomLink data-testid="custom-link" custom-var="some-other-var" href="/custom">
            Custom Link
          </CustomLink>
        </HeaderNavItemLink>
      </HeaderNav>
    </HeaderSection>
  ),
  play: async ({ canvas, step, args }) => {
    // establish the custom link is nested inside the list-item, not an anchor
    const customWrapper = canvas.getByTestId('custom-link');
    const wrapperParent = customWrapper.parentElement;
    expect(wrapperParent).toBeInTheDocument();
    expect((wrapperParent as HTMLElement).tagName).toBe('LI');

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
