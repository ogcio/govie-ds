import type { Meta, StoryObj } from '@storybook/react';
import type { CSSProperties } from 'react';
import { within, expect } from 'storybook/test';
import { Paragraph } from '../paragraph/paragraph.js';
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
      options: ['sm', 'md'],
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
  children: 'Example link',
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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const linkElement = canvas.getByRole('link');

    await step('should render link text', async () => {
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveTextContent('Example link');
    });

    await step('should have correct href', async () => {
      expect(linkElement.getAttribute('href')).toBe('#');
    });

    await step('should not open in a new tab if not external', async () => {
      expect(linkElement.getAttribute('target')).not.toBe('_blank');
    });

    await step('should have visited style', async () => {
      expect(linkElement.classList.contains('visited:gi-text-blue-700')).toBe(
        false,
      );
    });
  },
};

export const WithIconStart: Story = {
  args: {
    ...baseProps,
    iconStart: 'arrow_back',
  },
};

export const WithIconEnd: Story = {
  args: {
    ...baseProps,
    iconEnd: 'arrow_back',
  },
};

export const WithIcons: Story = {
  args: withIcons(baseProps),
};

export const NoUnderline: Story = {
  args: {
    ...baseProps,
    noUnderline: true,
  },
};

export const NoUnderlineLinkHover: Story = {
  args: {
    ...baseProps,
    noUnderline: true,
    className: 'link-hover',
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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const linkElement = canvas.getByRole('link');

    await step('should not gi-link if styled as button', async () => {
      expect(linkElement.classList.contains('gi-link')).toBe(false);
    });
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

export const TestExternal: Story = {
  tags: ['skip-playwright'],
  args: {
    href: 'https://example.com',
    children: 'Example Link',
    external: true,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const linkElement = canvas.getByRole('link');

    await step('should open in a new tab if external', async () => {
      expect(linkElement.getAttribute('target')).toBe('_blank');
      expect(linkElement.getAttribute('rel')).toBe('noreferrer noopener');
    });
  },
};

export const TestNoVisited: Story = {
  tags: ['skip-playwright'],
  args: {
    href: 'https://example.com',
    children: 'Example Link',
    noVisited: true,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const linkElement = canvas.getByRole('link');

    await step(
      'should not have visited style if noVisited is true',
      async () => {
        expect(linkElement.classList.contains('gi-link-no-visited')).toBe(true);
      },
    );
  },
};

const UNDERLINE_PLAYGROUND_SCALE_ROWS = [
  { label: 'Heading 1', fontClass: 'gi-heading-xl' },
  { label: 'Heading 2', fontClass: 'gi-heading-lg' },
  { label: 'Heading 3', fontClass: 'gi-heading-md' },
  { label: 'Heading 4', fontClass: 'gi-heading-sm' },
  { label: 'Heading 5', fontClass: 'gi-heading-xs' },
  { label: 'Heading 6', fontClass: 'gi-heading-2xs' },
  { label: 'Body XL', fontClass: 'gi-paragraph-xl' },
  { label: 'Body LG', fontClass: 'gi-paragraph-lg' },
  { label: 'Body MD', fontClass: 'gi-paragraph-md' },
  { label: 'Body SM', fontClass: 'gi-paragraph-sm' },
] as const;

export type UnderlinePlaygroundArguments = {
  /** text-underline-offset when not hovering (CSS length, e.g. 0.23em). */
  underlineOffset: string;
  /** text-underline-offset on :hover only. */
  underlineOffsetHover: string;
  /** Default (rest) underline thickness — matches link default ~1px in production. */
  decorationThickness: number;
  /** Hover underline thickness — production link uses ~3px on hover. */
  decorationThicknessHover: number;
};

const UnderlinePlaygroundLongParagraphs = () => (
  <div className="gi-flex gi-flex-col gi-gap-6">
    <Paragraph
      as="span"
      size="md"
      className="gi-block gi-max-w-prose gi-text-black"
    >
      Long paragraph ( <Link href="#">philly</Link>,{' '}
      <Link href="#">typography</Link>, <Link href="#">quivery</Link>,{' '}
      <Link href="#">lazy</Link>, <Link href="#">bunny</Link>,{' '}
      <Link href="#">foggy</Link>, <Link href="#">jelly</Link> — check
      descenders): Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
      do eiusmod <Link href="#">tempor incididunt</Link> ut labore et dolore
      magna aliqua.
    </Paragraph>
    <Paragraph
      as="span"
      size="md"
      className="gi-block gi-max-w-prose gi-text-black"
    >
      Ut enim ad minim veniam, quis nostrud exercitation ullamco{' '}
      <Link href="#">laboris nisi</Link> ut aliquip ex ea{' '}
      <Link href="#">commodo consequat</Link>. Duis aute irure dolor in
      reprehenderit in voluptate velit esse cillum dolore eu fugiat{' '}
      <Link href="#">nulla pariatur</Link>. Excepteur sint occaecat cupidatat
      non proident, <Link href="#">sunt in culpa</Link> qui officia deserunt
      mollit anim id est laborum. Curabitur pretium tincidunt lacus nulla
      gravida orci a odio nullam varius turpis et euismod quis sollicitudin
      nibh.
    </Paragraph>
  </div>
);

const underlinePlaygroundScopedCss = `
.sb-underline-playground .gi-link {
  text-decoration-thickness: var(--sb-underline-playground-thickness) !important;
  text-underline-offset: var(--sb-underline-playground-offset) !important;
}
.sb-underline-playground .gi-link:hover {
  text-decoration-thickness: var(--sb-underline-playground-thickness-hover) !important;
  text-underline-offset: var(--sb-underline-playground-offset-hover) !important;
}
`;

const underlinePlaygroundWrapperStyle = (
  arguments_: UnderlinePlaygroundArguments,
): CSSProperties =>
  ({
    ['--sb-underline-playground-thickness']: `${arguments_.decorationThickness}px`,
    ['--sb-underline-playground-thickness-hover']: `${arguments_.decorationThicknessHover}px`,
    ['--sb-underline-playground-offset']: arguments_.underlineOffset,
    ['--sb-underline-playground-offset-hover']: arguments_.underlineOffsetHover,
  }) as CSSProperties;

export const UnderlinePlayground = {
  name: 'Underline playground',
  argTypes: {
    underlineOffset: {
      control: 'text',
      description:
        'text-underline-offset when not hovering (e.g. 0.23em, 4px).',
    },
    underlineOffsetHover: {
      control: 'text',
      description:
        'text-underline-offset on hover only (e.g. 0.2em — matches production link hover).',
    },
    decorationThickness: {
      control: { type: 'range', min: 1, max: 8, step: 1 },
      description: 'Default text-decoration-thickness in px (non-hover).',
    },
    decorationThicknessHover: {
      control: { type: 'range', min: 1, max: 8, step: 1 },
      description: 'text-decoration-thickness in px when hovering the link.',
    },
  },
  args: {
    underlineOffset: '0.23em',
    underlineOffsetHover: '0.2em',
    decorationThickness: 1,
    decorationThicknessHover: 3,
  },
  render: (arguments_: UnderlinePlaygroundArguments) => {
    return (
      <>
        <style>{underlinePlaygroundScopedCss}</style>
        <div
          className="sb-underline-playground gi-p-4 gi-flex gi-flex-col gi-gap-10"
          style={underlinePlaygroundWrapperStyle(arguments_)}
        >
          <section className="gi-flex gi-flex-col gi-gap-4">
            <h2 className="gi-heading-sm gi-text-black">Type scale</h2>
            <ul className="gi-m-0 gi-list-none gi-flex gi-flex-col gi-gap-4 gi-p-0">
              {UNDERLINE_PLAYGROUND_SCALE_ROWS.map((row) => (
                <li key={row.label}>
                  <div className={`${row.fontClass} gi-text-black`}>
                    {row.label} with <Link href="#">jelly</Link>{' '}
                    <Link href="#">foggy</Link> And{' '}
                    <Link href="#">Lorum Ipsum</Link>.
                  </div>
                </li>
              ))}
            </ul>
          </section>
          <section className="gi-flex gi-flex-col gi-gap-4">
            <h2 className="gi-heading-sm gi-text-black">Body paragraphs</h2>
            <UnderlinePlaygroundLongParagraphs />
          </section>
        </div>
      </>
    );
  },
  parameters: {
    // Only these args exist on this story; `include` keeps the panel focused and
    // avoids the default Link props list (Actions is for event logs — use Controls).
    controls: {
      include: [
        'underlineOffset',
        'underlineOffsetHover',
        'decorationThickness',
        'decorationThicknessHover',
      ],
    },
    docs: {
      description: {
        story:
          '**Controls:** use the **Controls** tab in the bottom panel (Canvas view), not **Actions**. Default vs **hover** values are separate for both **underline offset** and **thickness**. The type scale lists every heading level (1–6) and body size with a short line and link; below that, two longer paragraphs stress descenders and wrapping.',
      },
    },
  },
} satisfies StoryObj<UnderlinePlaygroundArguments>;

const UNDERLINE_OFFSET_BY_SIZE_ROWS = [
  {
    label: 'Heading 2xs',
    fontClass: 'gi-heading-2xs',
    offsetClass: 'gi-underline-offset-xs',
  },
  {
    label: 'Heading xs',
    fontClass: 'gi-heading-xs',
    offsetClass: 'gi-underline-offset-sm',
  },
  {
    label: 'Heading sm',
    fontClass: 'gi-heading-sm',
    offsetClass: 'gi-underline-offset-md',
  },
  {
    label: 'Heading md',
    fontClass: 'gi-heading-md',
    offsetClass: 'gi-underline-offset-lg',
  },
  {
    label: 'Heading lg',
    fontClass: 'gi-heading-lg',
    offsetClass: 'gi-underline-offset-xl',
  },
  {
    label: 'Heading xl',
    fontClass: 'gi-heading-xl',
    offsetClass: 'gi-underline-offset-xs',
  },
  {
    label: 'Paragraph sm',
    fontClass: 'gi-paragraph-sm',
    offsetClass: 'gi-underline-offset-sm',
  },
  {
    label: 'Paragraph md',
    fontClass: 'gi-paragraph-md',
    offsetClass: 'gi-underline-offset-md',
  },
  {
    label: 'Paragraph lg',
    fontClass: 'gi-paragraph-lg',
    offsetClass: 'gi-underline-offset-lg',
  },
  {
    label: 'Paragraph xl',
    fontClass: 'gi-paragraph-xl',
    offsetClass: 'gi-underline-offset-xl',
  },
] as const;

export const UnderlineOffsetByTextSize = {
  name: 'Underline offset by text size',
  render: () => (
    <div className="gi-p-4 gi-flex gi-flex-col gi-gap-6">
      {UNDERLINE_OFFSET_BY_SIZE_ROWS.map((row) => (
        <div key={row.fontClass}>
          <div className="gi-mb-1 gi-text-sm gi-text-black">{row.label}</div>
          <div className={`${row.fontClass} gi-text-black`}>
            Example copy with{' '}
            <Link href="#" className={row.offsetClass}>
              jelly
            </Link>{' '}
            <Link href="#" className={row.offsetClass}>
              foggy
            </Link>{' '}
            using tiered underline offset for this scale.
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Each row maps a typography scale to a design-token underline offset (`gi-underline-offset-xs` through `gi-underline-offset-xl`). After xl the sequence repeats for larger display sizes so offset continues to step up with type size.',
      },
    },
  },
} satisfies StoryObj;
