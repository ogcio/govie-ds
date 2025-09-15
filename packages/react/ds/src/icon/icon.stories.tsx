import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from 'storybook/test';
import { Icon } from './icon.js';

const meta = {
  title: 'components/Icon',
  component: Icon,
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
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
      description: 'Specify if the icon has a filled style',
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
      description:
        'Define a string value that can be used to name an element (for accessibilty purposes)',
    },
    inline: {
      control: 'boolean',
      description: 'View the icon as inline',
    },
  },
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
  args: { icon: 'thumb_down', size: 'md' },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('should render the ThumbDown icon', async () => {
      const iconElement = canvas.getByTestId('govie-icon');
      expect(iconElement.textContent?.trim()).toBe('thumb_down');
    });
  },
};

export const TestThumbDownDisabled: Story = {
  tags: ['skip-playwright'],
  args: { icon: 'thumb_down', size: 'md', disabled: true },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('should render the ThumbDown disabled', async () => {
      const iconElement = canvas.getByTestId('govie-icon');
      expect(iconElement.textContent?.trim()).toBe('thumb_down');
      expect(iconElement.classList.contains('gi-text-gray-700')).toBe(true);
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
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('should render the ThumbDown with ARIA', async () => {
      const iconElement = canvas.getByTestId('govie-icon');
      expect(iconElement.textContent?.trim()).toBe('thumb_down');
      expect(iconElement.hasAttribute('aria-hidden')).toBe(true);
      expect(iconElement.hasAttribute('aria-label')).toBe(true);
      expect(iconElement.getAttribute('aria-label')).toBe('ARIA-LABEL');
    });
  },
};

export const TestThumbDownLarge: Story = {
  tags: ['skip-playwright'],
  args: { icon: 'thumb_down', size: 'lg' },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('should render the ThumbDown icon large', async () => {
      const iconElement = canvas.getByTestId('govie-icon');
      expect(iconElement.textContent?.trim()).toBe('thumb_down');
      expect(iconElement).toHaveStyle('font-size: 32px');
    });
  },
};
