import type { Meta, StoryObj } from '@storybook/react-vite';
import { LinkButton } from '@/LinkButton';
import Box from '@/atoms/Box';
import { linkButtonMeta, Default as defaultStory } from '@/atoms/storybook/LinkButton.meta';

const meta = {
  ...linkButtonMeta,
  title: 'Navigation/LinkButton',
  component: LinkButton,
  argTypes: {
    ...linkButtonMeta.argTypes,
    onClick: {
      control: false,
      description: 'Click event handler.',
      table: { type: { summary: '(event: React.MouseEvent) => void' } },
    },
    onFocus: {
      control: false,
      description: 'Focus event handler.',
      table: { type: { summary: '(event: React.FocusEvent) => void' } },
    },
    onBlur: {
      control: false,
      description: 'Blur event handler.',
      table: { type: { summary: '(event: React.FocusEvent) => void' } },
    },
    onKeyDown: {
      control: false,
      description: 'Keydown event handler.',
      table: { type: { summary: '(event: React.KeyboardEvent) => void' } },
    },
    onKeyUp: {
      control: false,
      description: 'Keyup event handler.',
      table: { type: { summary: '(event: React.KeyboardEvent) => void' } },
    },
    style: {
      control: false,
      description: 'Inline styles. Prefer className with gi-* Tailwind utilities.',
      table: { type: { summary: 'React.CSSProperties' } },
    },
    asChild: {
      control: false,
      description:
        'Merges props and styles onto the immediate child element instead of rendering an `<a>`. Use for framework-native link components (e.g. Next.js `<Link>`).',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  decorators: (Story, context) => {
    const isLight = context?.args?.appearance === 'light' ? 'gi-bg-black' : '';
    return (
      <Box className={`gi-p-4 ${isLight} gi-w-fit`}>
        <Story />
      </Box>
    );
  },
} as Meta<typeof LinkButton>;

export default meta;
type Story = StoryObj<typeof LinkButton>;

export const Default: Story = {
  ...defaultStory,
  render: (props) => <LinkButton {...props}>LinkButton</LinkButton>,
};
