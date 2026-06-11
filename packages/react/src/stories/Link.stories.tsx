import type { Meta, StoryObj } from '@storybook/react-vite';
import Link from '@/Link';
import Box from '@/atoms/Box';
import Paragraph from '@/atoms/Paragraph';
import { H1, H2 } from '@/atoms/heading';
import HomeIcon from '@/atoms/icons/Home';
import * as stories from '@/atoms/storybook/Link.meta';

const meta = {
  ...stories.linkMeta,
  title: 'Navigation/Link/Link',
  component: Link,
  argTypes: {
    ...stories.linkMeta.argTypes,
    asChild: {
      control: false,
      description:
        'When true, Link renders a Radix Slot instead of an anchor. The child element receives the styling classes. Useful for composing with framework routers like next/link.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    style: {
      control: false,
      description: 'Inline styles. Prefer className with gi-* Tailwind utilities.',
      table: { type: { summary: 'React.CSSProperties' } },
    },
  },
  parameters: {
    ...stories.linkMeta.parameters,
    docs: {
      ...stories.linkMeta.parameters?.docs,
      description: {
        component: `${stories.linkMeta.parameters?.docs?.description?.component ?? ''}\n\nThis is the recommended Link component for new projects. It is available via the \`next\` entry point of the React package:\n\n\`\`\`tsx\nimport { Link } from "@ogcio/design-system-react/next";\n\`\`\``,
      },
    },
  },
} as Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof Link>;

export const InlineLink: Story = {
  ...stories.InlineLink,
};

export const InTypography: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Link underline and scale next to heading and body typography.',
      },
    },
    pseudo: {
      hover: '.pseudo-hover',
      focus: '.pseudo-focus',
    },
  },
  render: (_props) => (
    <Box className="gi-flex gi-flex-col gi-gap-8 gi-max-w-prose">
      <Box className="gi-flex gi-flex-col gi-gap-4">
        <H1>
          Heading with an{' '}
          <Link href="#" variant="inline">
            inline link
          </Link>
        </H1>
        <Paragraph>
          Government services are available on{' '}
          <Link href="#" variant="inline">
            gov.ie
          </Link>
          . You can also check{' '}
          <Link href="#" variant="inline">
            your application status
          </Link>{' '}
          or contact the{' '}
          <Link href="#" variant="inline">
            support team
          </Link>{' '}
          for help.
        </Paragraph>
      </Box>

      <Box className="gi-flex gi-flex-col gi-gap-4">
        <H2>Underlines</H2>
        <Paragraph>
          Always underlined:{' '}
          <Link href="#" variant="inline" underline="always">
            apply online
          </Link>
        </Paragraph>
        <Paragraph>
          Hover only:{' '}
          <Link href="#" variant="inline" underline="hover">
            check status
          </Link>
        </Paragraph>
        <Paragraph>
          No underline:{' '}
          <Link href="#" variant="inline" underline="none">
            learn more
          </Link>
        </Paragraph>
      </Box>

      <Box className="gi-flex gi-flex-col gi-gap-4">
        <H2>Visited</H2>
        <Paragraph>
          Default visited colour:{' '}
          <Link href="#" variant="inline">
            visited link
          </Link>
        </Paragraph>
        <Paragraph>
          No visited colour:{' '}
          <Link href="#" variant="inline" visited="none">
            always same colour
          </Link>
        </Paragraph>
      </Box>

      <Box className="gi-flex gi-flex-col gi-gap-4">
        <H2>Appearances</H2>
        <Box className="gi-bg-black gi-p-4 gi-rounded gi-w-fit">
          <Paragraph className="gi-text-white">
            Light on dark:{' '}
            <Link href="#" variant="inline" appearance="light">
              gov.ie services
            </Link>
          </Paragraph>
        </Box>
        <Paragraph className="gi-text-gray-700 gi-pl-4">
          Inherit parent colour:{' '}
          <Link href="#" variant="inline" appearance="inherit">
            inherited link
          </Link>
        </Paragraph>
      </Box>

      <Box className="gi-flex gi-flex-col gi-gap-4">
        <H2>Interaction states</H2>
        <Paragraph className="gi-flex gi-gap-4 gi-pl-4">
          <Link href="#" variant="inline">
            default
          </Link>
          <Link href="#" variant="inline" className="pseudo-hover">
            hover
          </Link>
          <Link href="#" variant="inline" className="pseudo-focus">
            focus
          </Link>
        </Paragraph>
        <Box className="gi-bg-black gi-p-4 gi-rounded gi-w-fit">
          <Paragraph className="gi-text-white gi-flex gi-gap-4">
            <Link href="#" variant="inline" appearance="light">
              light
            </Link>
            <Link href="#" variant="inline" appearance="light" className="pseudo-hover">
              hover
            </Link>
            <Link href="#" variant="inline" appearance="light" className="pseudo-focus">
              focus
            </Link>
          </Paragraph>
        </Box>
      </Box>
    </Box>
  ),
};

export const PlainLink: Story = {
  ...stories.PlainLink,
  render: (_props) => (
    <Box className="gi-flex gi-flex-col gi-gap-4 gi-items-start">
      <Link href="#" ariaLabel="Home" className="gi-inline-flex gi-w-fit">
        <HomeIcon />
      </Link>
      <Link asChild>
        <a href="#" className="gi-font-primary">
          Styled Native Anchor
        </a>
      </Link>
    </Box>
  ),
};

export const PlainFocusState: Story = {
  ...stories.PlainFocusState,
  render: (_props) => (
    <Box className="gi-flex gi-flex-col gi-gap-6">
      <Box className="gi-flex gi-gap-4 gi-items-center">
        <Link href="#" ariaLabel="Home" dataTestId="link-icon-default" className="gi-inline-flex gi-w-fit pseudo-focus">
          <HomeIcon />
        </Link>
        <Link asChild dataTestId="link-aschild-default">
          <a href="#" className="gi-font-primary pseudo-focus">
            Styled Native Anchor
          </a>
        </Link>
      </Box>
      <Box className="gi-bg-black gi-p-4 gi-rounded gi-w-fit gi-flex gi-gap-4 gi-items-center">
        <Link
          href="#"
          appearance="light"
          ariaLabel="Home light"
          dataTestId="link-icon-light"
          className="gi-inline-flex gi-w-fit pseudo-focus"
        >
          <HomeIcon />
        </Link>
        <Link asChild appearance="light" dataTestId="link-aschild-light">
          <a href="#" className="gi-font-primary pseudo-focus">
            Styled Native Anchor
          </a>
        </Link>
      </Box>
    </Box>
  ),
};
