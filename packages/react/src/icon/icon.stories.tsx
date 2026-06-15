import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, expect } from 'storybook/test';
import { Icon, type IconProps } from './icon.js';
import LoadMaterialSymbols from '@/load-symbols/load-symbols.js';

const FONT_ICON_MIGRATION_DOCS =
  '**Migration:** Icons now render as SVGs by default. Remove `filled` and `useFontIcon` unless you explicitly need Material Symbols font icons. See "Enabling Material Symbols" story below and refer to the [Icon React docs](/components/library/icon/react/) for more details.';

const meta = {
  title: 'components/Icon',
  component: Icon,
  parameters: {
    docs: {
      description: {
        component: `Icons help users quickly recognise actions, states and categories.\n\n${FONT_ICON_MIGRATION_DOCS}`,
      },
    },
  },
  argTypes: {
    icon: {
      control: 'text',
      description: 'Specify the name of the icon',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Specify the size of the icon',
    },
    filled: {
      control: 'boolean',
      description: 'Render the icon with a filled style using Material Symbols font icons.',
    },
    useFontIcon: {
      control: 'boolean',
      description: 'Render the icon using Material Symbols font icons instead of the default SVG.',
    },
    disabled: {
      control: 'boolean',
      description: 'Specify if the icon is disabled',
    },
    ariaHidden: {
      control: 'text',
      description: 'Hide non-interactive content from the accessibility',
    },
    ariaLabel: {
      control: 'text',
      description: 'Define a string value that can be used to name an element (for accessibility purposes)',
    },
    inline: {
      control: 'boolean',
      description: 'View the icon as inline',
    },
    dataTestId: {
      control: 'text',
      description: 'Pass in a dataTestId attribute to query the icon (for testing purposes).',
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: 'thumb_up',
  },
};

export const Small: Story = {
  args: {
    icon: 'thumb_up',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    icon: 'thumb_up',
    size: 'lg',
    dataTestId: 'thumb_down',
  },
};

export const ExtraLarge: Story = {
  args: {
    icon: 'thumb_up',
    size: 'xl',
  },
};
export const Filled: Story = {
  args: {
    icon: 'thumb_up',
    filled: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Filled icons are rendered via the Material Symbols fallback, as we do not package the filled icons internally. `<LoadMaterialSymbols/>` must be added in the `<head>` of your application to enable font fallback. See the [Icon Component documentation](/components/library/icon/react/) for further details',
      },
    },
  },
  render: ({ icon }) => {
    return (
      <>
        <LoadMaterialSymbols />
        <Icon icon={icon} filled />
      </>
    );
  },
};

export const Disabled: Story = {
  args: {
    icon: 'thumb_up',
    disabled: true,
  },
};

export const AriaHidden: Story = {
  args: {
    icon: 'thumb_up',
    ariaHidden: true,
  },
};

export const AriaLabel: Story = {
  args: {
    icon: 'thumb_up',
    ariaLabel: 'Thumbs up',
  },
};

export const TestThumbDownDefault: Story = {
  tags: ['skip-playwright'],
  args: { icon: 'thumb_down', size: 'md', dataTestId: 'thumbs_down' },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('should render the ThumbDown icon', async () => {
      const iconElement = canvas.getByTestId('thumbs_down');
      expect(iconElement).toBeInTheDocument();
    });
  },
};

export const TestThumbDownDisabled: Story = {
  tags: ['skip-playwright'],
  args: { icon: 'thumb_down', size: 'md', disabled: true, dataTestId: 'thumb_down' },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('should render the ThumbDown disabled', async () => {
      const iconElement = canvas.getByTestId('thumb_down');
      expect(iconElement.classList.contains('gi-fill-gray-700')).toBe(true);
    });
  },
};

export const TestThumbDownAria: Story = {
  tags: ['skip-playwright'],
  args: {
    icon: 'thumb_down',
    size: 'md',
    ariaHidden: true,
    ariaLabel: 'ARIA-LABEL',
    dataTestId: 'thumb_down',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('should render the ThumbDown with ARIA', async () => {
      const iconElement = canvas.getByTestId('thumb_down');
      expect(iconElement.hasAttribute('aria-hidden')).toBe(true);
      expect(iconElement.hasAttribute('aria-label')).toBe(true);
      expect(iconElement.getAttribute('aria-label')).toBe('ARIA-LABEL');
    });
  },
};

export const TestThumbDownLarge: Story = {
  tags: ['skip-playwright'],
  args: { icon: 'thumb_down', size: 'lg', dataTestId: 'thumb_down' },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('should render the ThumbDown icon large', async () => {
      const iconElement = canvas.getByTestId('thumb_down');
      expect(iconElement).toHaveAttribute('width', '32px');
    });
  },
};
