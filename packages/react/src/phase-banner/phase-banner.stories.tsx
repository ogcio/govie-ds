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
      options: ['Alpha', 'Beta'],
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
    level: 'Alpha',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText('This is a phase banner.'),
    ).toBeInTheDocument();
    await expect(canvas.getByText('Alpha')).toBeInTheDocument();

    await step('should render a phase-banner with alpha level', async () => {
      const bannerElement = canvas.getByTestId('phase-banner');
      await expect(bannerElement).toBeInTheDocument();
      const firstChildElement = bannerElement.firstElementChild;
      await expect(firstChildElement?.textContent?.trim()).toBe('Alpha');
    });
  },
};

export const WithoutPadding: Story = {
  args: {
    ...Default.args,
    padding: false,
  },
  play: async ({ canvasElement }) => {
    const bannerElement = canvasElement.querySelector(
      '[data-testid="phase-banner"]',
    );
    await expect(bannerElement).not.toHaveClass('gi-px-4');
  },
};

export const WrappedInContainer: Story = {
  args: {
    ...Default.args,
    wrap: 'container',
  },
  play: async ({ canvasElement }) => {
    const containerElement = canvasElement.querySelector(
      '[data-testid="govie-container"]',
    );
    await expect(containerElement).toBeInTheDocument();
  },
};

export const TestBetaLevel: Story = {
  args: {
    children: 'This is a span',
    level: 'Beta',
  },
  tags: ['skip-playwright'],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step(
      'should render a span with the correct content when props.as is "span"',
      async () => {
        const bannerElement = canvas.getByTestId('phase-banner');
        await expect(bannerElement).toBeInTheDocument();
        const firstChildElement = bannerElement.firstElementChild;
        await expect(firstChildElement?.textContent?.trim()).toBe('Beta');
      },
    );
  },
};
