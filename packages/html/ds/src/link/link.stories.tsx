import type { Meta, StoryObj } from '@storybook/react';
import parse from 'html-react-parser';
import { createLink } from '../helpers/links';
import { LinkProps } from './types';

const meta: Meta<LinkProps> = {
  title: 'Navigation/Link',
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
};

export default meta;
type Story = StoryObj<LinkProps>;

const createElement = (arguments_: LinkProps) => {
  const component = createLink(arguments_);
  const element = parse(component.outerHTML) as React.ReactElement;

  const isLight = arguments_.appearance === 'light' ? 'gi-bg-black' : '';
  return <div className={`gi-p-4 ${isLight} gi-w-fit`}>{element}</div>;
};

const withIcons = (props: LinkProps) => {
  return {
    ...props,
    iconStart: 'arrow_back',
    iconEnd: 'arrow_forward',
  } as any;
};

const baseProps = {
  href: '#',
  content: 'Link text',
};

export const Default: Story = {
  args: {
    ...baseProps,
  },
  render: createElement,
};

export const WithIconStart: Story = {
  args: {
    ...baseProps,
    iconStart: 'arrow_back',
  },
  render: createElement,
};

export const WithIconEnd: Story = {
  args: {
    ...baseProps,
    iconEnd: 'arrow_back',
  },
  render: createElement,
};
export const WithIcons: Story = {
  args: {
    ...baseProps,
    iconEnd: 'arrow_back',
    iconStart: 'arrow_back',
  },
  render: createElement,
};

export const NoUnderline: Story = {
  args: {
    ...baseProps,
    noUnderline: true,
  },
  render: createElement,
};

export const NoUnderlineWithIcons: Story = {
  args: withIcons({
    ...baseProps,
    noUnderline: true,
  }),
  render: createElement,
};

export const NoColor: Story = {
  args: {
    ...baseProps,
    noColor: true,
  },
  render: createElement,
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
  render: createElement,
};

export const NoColorWithIcons: Story = {
  args: withIcons({
    ...baseProps,
    noColor: true,
  }),
  render: createElement,
};

export const Light: Story = {
  args: {
    ...baseProps,
    appearance: 'light',
  },
  render: createElement,
};

export const LightDisabled: Story = {
  args: {
    ...baseProps,
    disabled: true,
    appearance: 'light',
  },
  render: createElement,
};

export const LightHover: Story = {
  args: {
    ...withIcons(baseProps),
    appearance: 'light',
    className: 'link-hover',
  },
  render: createElement,
};

export const LightFocus: Story = {
  args: {
    ...withIcons(baseProps),
    appearance: 'light',
    className: 'link-focus',
  },
  render: createElement,
};

export const LightWithIcons: Story = {
  args: withIcons({
    ...baseProps,
    appearance: 'light',
  }),
  render: createElement,
};

export const Disabled: Story = {
  args: {
    ...baseProps,
    disabled: true,
  },
  render: createElement,
};

export const DisabledWithIcons: Story = {
  args: withIcons({
    ...baseProps,
    disabled: true,
  }),
  render: createElement,
};

export const StateDefault: Story = {
  args: {
    href: '#',
    content: 'Default',
    className: 'link-default',
  },
  render: createElement,
};

export const StateHover: Story = {
  args: {
    href: '#',
    content: 'Hover',
    className: 'link-hover',
  },
  render: createElement,
};

export const StateFocus: Story = {
  args: {
    href: '#',
    content: 'Focus',
    className: 'link-focus',
  },
  render: createElement,
};

export const StateDisabled: Story = {
  args: {
    href: '#',
    content: 'Disabled',
    disabled: true,
    className: 'link-disabled',
  },
  render: createElement,
};

export const StateFocusWithIcons: Story = {
  args: withIcons({
    href: '#',
    content: 'State Icons',
    className: 'link-hover link-focus',
  }),
  render: createElement,
};

const paginationCss = `
.gi-prev_pagination-link:hover .gi-prev_pagination-description,
.gi-next_pagination-link:hover .gi-next_pagination-description {
  text-decoration-line: underline;
  text-decoration-thickness: 4px;
  color: var(--gieds-color-text-tone-convention-hover);
}

.gi-prev_pagination-link:focus,
.gi-next_pagination-link:focus {
  text-decoration: none;
  border-radius: 0.125rem;
  outline: none;
  box-shadow: 0 0 0 2px var(--gieds-color-gray-950),
    0 0 0 5px var(--gieds-color-yellow-400);
}
`;

const paginationHtml = `
<div class="gi-flex gi-flex-col md:gi-flex-row gi-w-full gi-justify-between gi-gap-4 md:gi-gap-0">
  <a class="gi-grid gi-grid-cols-[auto_1fr] gi-w-fit gi-gap-x-1 gi-cursor-pointer gi-prev_pagination-link" href="#">
    <span class="gi-flex gi-items-center">
      <span data-testid="govie-icon" role="presentation" class="gi-text-sm gi-block material-symbols-outlined gi-text-black">
        arrow_back
      </span>
    </span>
    <span class="gi-text-md gi-text-black">Previous</span>
    <span class="gi-col-start-2 gi-text-md gi-link gi-prev_pagination-description">
      Name of the previous page
    </span>
  </a>

   <hr class="gi-border-gray-200 gi-w-full md:gi-hidden" />

  <a class="gi-grid gi-grid-cols-[auto_1fr] gi-w-fit gi-gap-x-1 gi-cursor-pointer gi-next_pagination-link gi-ml-auto" href="#">
    <span class="gi-text-end gi-text-md gi-text-black gi-next_pagination-title">Next</span>
    <span class="gi-flex gi-items-center">
      <span data-testid="govie-icon" role="presentation" class="gi-text-sm gi-block material-symbols-outlined gi-text-black">
        arrow_forward
      </span>
    </span>
    <span class="gi-text-md gi-link gi-next_pagination-description">
      Name of the next page
    </span>
  </a>
</div>
`;

export const PaginationExample: Story = {
  render: () => (
    <>
      <style>{paginationCss}</style>
      <div dangerouslySetInnerHTML={{ __html: paginationHtml }} />
    </>
  ),
  parameters: {
    docs: {
      source: {
        code: `<style>\n${paginationCss.trim()}\n</style>\n\n${paginationHtml.trim()}`,
        language: 'html',
      },
    },
  },
};
