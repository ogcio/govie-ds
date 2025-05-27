import type { Meta, StoryObj } from '@storybook/react';
import { Link, LinkProps } from './link.js';

const meta = {
  title: 'Navigation/Link',
  component: Link,
  argTypes: {
    content: {
      control: 'text',
      type: { name: 'string', required: true },
      description: 'Link html content',
    },
    href: {
      control: 'text',
      type: { name: 'string', required: false },
      description: 'URL to navigate to',
    },
    noVisited: {
      control: 'boolean',
      type: { name: 'boolean' },
      description: 'Removes the visited link styling',
    },
    noUnderline: {
      control: 'boolean',
      type: { name: 'boolean' },
      description: 'Disables underline styling on the link',
    },
    noColor: {
      control: 'boolean',
      type: { name: 'boolean' },
      description: 'Prevents default color styling',
    },
    external: {
      control: 'boolean',
      type: { name: 'boolean' },
      description: 'Marks the link as external (adds rel, target)',
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
      type: { name: 'string', required: false },
      description: 'Controls the link size',
    },
    dataTestid: {
      control: 'text',
      type: { name: 'string', required: false },
      description: 'Custom data-testid attribute for testing',
    },
    iconStart: {
      control: 'text',
      type: { name: 'string', required: false },
      description: 'Icon displayed before link text',
      table: {
        category: 'Visual',
        type: { summary: 'IconId' },
      },
    },
    iconEnd: {
      control: 'text',
      type: { name: 'string', required: false },
      description: 'Icon displayed after link text',
      table: {
        category: 'Visual',
        type: { summary: 'IconId' },
      },
    },
    disabled: {
      control: 'boolean',
      type: { name: 'boolean' },
      description: 'Disables interaction and dims the link',
    },
    appearance: {
      control: { type: 'radio' },
      options: ['default', 'light'],
      type: { name: 'string', required: false },
      description: 'Link appearance style',
      table: {
        category: 'Visual',
        type: { summary: "'default' | 'light'" },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Link component for navigating to internal or external URLs. Supports accessibility features, icons, and customizable styles.',
      },
    },
    pseudo: {
      hover: '.link-hover',
      focus: '.link-focus',
    },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseProps: LinkProps = {
  children: 'Link text',
  href: '#',
};

const withIcons = (props: LinkProps) => {
  return {
    ...props,
    iconStart: 'arrow_back',
    iconEnd: 'arrow_forward',
  } as any;
};

const wrapInDarkBg = (story: Story): Story => {
  return {
    ...story,
    render: (props) => (
      <div className="gi-bg-black gi-p-4 gi-w-fit">
        <Link {...props} />
      </div>
    ),
  };
};

export const Default: Story = {
  args: {
    ...baseProps,
  },
};

export const WithIconStart: Story = {
  args: {
    ...baseProps,
    iconStart: 'arrow_back',
  },
};

export const DefaultWithIconEnd: Story = {
  args: {
    ...baseProps,
    iconEnd: 'arrow_back',
  },
};

export const DefaultWithIcons: Story = {
  args: withIcons(baseProps),
};

export const NoUnderline: Story = {
  args: {
    ...baseProps,
    noUnderline: true,
  },
};

export const NoUnderlineWithIcons: Story = {
  args: withIcons({
    ...baseProps,
    noUnderline: true,
  }),
};

export const NoColor: Story = {
  args: {
    ...baseProps,
    noColor: true,
  },
};

export const LinkAsButton: Story = {
  args: {
    ...baseProps,
    asButton: {
      appearance: 'default',
      size: 'medium',
      variant: 'primary',
    },
  },
};

export const NoColorWithIcons: Story = {
  args: withIcons({
    ...baseProps,
    noColor: true,
  }),
};

export const Light: Story = wrapInDarkBg({
  args: {
    ...baseProps,
    appearance: 'light',
  },
});

export const LightDisabled: Story = wrapInDarkBg({
  args: {
    ...baseProps,
    disabled: true,
    appearance: 'light',
  },
});

export const LightHover: Story = wrapInDarkBg({
  args: {
    ...withIcons(baseProps),
    appearance: 'light',
    className: 'link-hover',
  },
});

export const LightFocus: Story = wrapInDarkBg({
  args: {
    ...withIcons(baseProps),
    appearance: 'light',
    className: 'link-focus',
  },
});

export const LightWithIcons: Story = wrapInDarkBg({
  args: withIcons({
    ...baseProps,
    appearance: 'light',
  }),
});

export const Disabled: Story = {
  args: {
    ...baseProps,
    disabled: true,
  },
};

export const DisabledWithIcons: Story = {
  args: withIcons({
    ...baseProps,
    disabled: true,
  }),
};

export const HoverState: Story = {
  args: {
    ...baseProps,
    className: 'link-hover',
  },
};

export const FocusState: Story = {
  args: {
    ...baseProps,
    className: 'link-focus',
  },
};

export const DisabledState: Story = {
  args: {
    ...baseProps,
    disabled: true,
    className: 'link-disabled',
  },
};

export const StateFocusWithIcons: Story = {
  args: {
    ...withIcons(baseProps),
    className: 'link-hover link-focus',
  },
};
