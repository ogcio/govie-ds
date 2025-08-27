import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import { PhaseBanner } from './phase-banner.js';

const meta = {
  title: 'Typography/PhaseBanner',
  component: PhaseBanner,
  parameters: {
    docs: {
      description: {
        component:
          'PhaseBanner component is used to indicate that a page or feature is in a particular phase (e.g., alpha or beta). It typically appears at the top of the page and provides contextual information or feedback links.',
      },
    },
  },
} satisfies Meta<typeof PhaseBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    children: {
      control: 'text',
      type: { name: 'string', required: true },
      description: 'The text content of the phase banner.',
    },
    level: {
      control: 'radio',
      options: ['alpha', 'beta'],
      type: { name: 'string', required: false },
      description: 'Specifies the level of the phase banner.',
    },
    wrap: {
      control: 'radio',
      options: ['none', 'container', 'container-full-width'],
      type: { name: 'string', required: false },
      description:
        'Defines how the phase banner is wrapped inside a container.',
    },
    padding: {
      control: 'boolean',
      type: { name: 'boolean', required: false },
      description:
        'Whether the phase banner should include horizontal padding.',
    },
  },
  args: {
    children: 'This is a phase banner.',
    level: 'alpha',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText('This is a phase banner.'),
    ).toBeInTheDocument();
    await expect(canvas.getByText('alpha')).toBeInTheDocument();
  },
};

export const WithoutPadding: Story = {
  args: {
    ...Default.args,
    padding: false,
  },
  play: async ({ canvasElement }) => {
    const banner = canvasElement.querySelector('[data-testid="phase-banner"]');
    await expect(banner).not.toHaveClass('gi-px-4');
  },
};

export const WrappedInContainer: Story = {
  args: {
    ...Default.args,
    wrap: 'container',
  },
  play: async ({ canvasElement }) => {
    const container = canvasElement.querySelector(
      '[data-testid="govie-container"]',
    );
    await expect(container).toBeInTheDocument();
  },
};
