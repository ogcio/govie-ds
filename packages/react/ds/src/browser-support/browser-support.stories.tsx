import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from 'storybook/test';
import { BrowserSupport } from './browser-support.js';

const meta = {
  title: 'application/BrowserSupport',
  component: BrowserSupport,
  parameters: {
    docs: {
      description: {
        component:
          'Renders a warning banner when the current browser is below the supported policy. Host apps control where it appears.',
      },
    },
  },
} satisfies Meta<typeof BrowserSupport>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    forceShow: {
      control: 'boolean',
      description:
        'Force the banner to render regardless of detected support. Useful for visual tests.',
    },
    className: {
      control: 'text',
      description: 'Optional className applied to the root Alert element.',
    },
    onDismiss: {
      table: { disable: true },
      description:
        'Optional callback invoked when the banner is dismissed by the user.',
    },
  },
  args: {
    forceShow: true,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders the alert with title and link', async () => {
      const alert = await canvas.findByRole('alert');
      expect(alert).toBeInTheDocument();

      const title = canvas.getByText('Limited browser support detected');
      expect(title).toBeInTheDocument();

      const link = canvas.getByRole('link', {
        name: 'View supported browsers',
      });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute(
        'href',
        'https://ds.services.gov.ie/get-started/developers/supported-browsers/',
      );
    });
  },
};
