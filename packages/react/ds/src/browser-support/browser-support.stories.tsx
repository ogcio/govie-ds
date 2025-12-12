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
    className: {
      control: 'text',
      description: 'Optional className applied to the root Alert element.',
    },
    onClose: {
      table: { disable: true },
      description:
        'Optional callback invoked when the banner is closed by the user.',
    },
  },
  decorators: [
    (Story) => {
      Object.defineProperty(navigator, 'userAgent', {
        value:
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36',
        writable: true,
        configurable: true,
      });

      return <Story />;
    },
  ],
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
      expect(link.getAttribute('href')).toMatch(
        /\/get-started\/developers\/supported-browsers\/?$/,
      );
    });
  },
};
