import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Paragraph } from '../paragraph/paragraph.js';
import { Alert } from './alert.js';

const meta = {
  title: 'application/Alert',
  component: Alert,
  parameters: {
    docs: {
      description: {
        component:
          'Use this component to give usage guidance, notify users of action results, or warn them about potential issues or failures.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'radio',
      description: 'Specify the variant of the alert component',
      options: ['info', 'danger', 'success', 'warning'],
    },
    title: {
      control: 'text',
      description: 'Specify the title of the alert component',
    },
    dismissible: {
      control: 'boolean',
      description: 'Specify if the alert is dismissible',
    },
    showIcon: {
      control: 'boolean',
      description:
        'Controls whether the icon is shown. Set to false to hide it.',
      table: { defaultValue: { summary: 'true' } },
    },
    children: {
      control: 'text',
      description: 'Specify the HTML for the content in the alert component',
    },
    onClose: {
      control: 'object',
      description: 'Callback fired when the component is dismissed',
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InfoAlert: Story = {
  args: {
    title: 'Info Alert',
    variant: 'info',
    children: (
      <>
        <Paragraph>Content</Paragraph>
      </>
    ),
  },
};

export const DangerAlert: Story = {
  args: {
    title: 'Danger Alert',
    variant: 'danger',
    children: (
      <>
        <Paragraph>Content</Paragraph>
      </>
    ),
  },
};

export const SuccessAlert: Story = {
  args: {
    title: 'Success Alert',
    variant: 'success',
    children: (
      <>
        <Paragraph>Content</Paragraph>
      </>
    ),
  },
};

export const WarningAlert: Story = {
  args: {
    title: 'Warning Alert',
    variant: 'warning',
    children: (
      <>
        <Paragraph>Content</Paragraph>
      </>
    ),
  },
};

export const IsDismissible: Story = {
  args: {
    title: 'Info Alert',
    variant: 'info',
    dismissible: true,
    children: (
      <>
        <Paragraph>Content</Paragraph>
      </>
    ),
  },
};

export const TestDismissibleBehavior: Story = {
  tags: ['skip-playwright'],
  args: {
    title: 'Info Alert',
    variant: 'info',
    dismissible: true,
    onClose: fn(),
    children: (
      <>
        <Paragraph>Content</Paragraph>
      </>
    ),
  },
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);

    await step('alert is initially visible', async () => {
      expect(canvas.getByRole('alert')).toBeInTheDocument();
    });

    await step('clicking dismiss hides the alert', async () => {
      const dismissButton = canvas.getByRole('button', {
        name: /dismiss alert/i,
      });
      await userEvent.click(dismissButton);
      expect(canvas.queryByRole('alert')).toBeNull();
    });

    await step('onClose callback is fired', () => {
      expect(args.onClose).toHaveBeenCalledTimes(1);
    });
  },
};

export const WithoutTitle: Story = {
  args: {
    variant: 'info',
    dismissible: true,
    children: <>Content</>,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement as HTMLElement);
    await step('does not render a title element when title is omitted', () => {
      expect(canvas.queryByTestId('alert-heading')).toBeNull();
    });
  },
};

export const WithoutIcon: Story = {
  args: {
    'aria-atomic': true,
    'aria-describedby': 'alert-content',
    title: 'Info Alert',
    variant: 'info',
    showIcon: false,
    dismissible: true,
    children: (
      <>
        <Paragraph>Content</Paragraph>
      </>
    ),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('does not render an SVG icon when showIcon=false', () => {
      const icon = canvasElement.querySelector('[role="alert"] > svg');
      expect(icon).toBeNull();
    });

    await step('title and content are still visible', async () => {
      expect(await canvas.findByText('Info Alert')).toBeInTheDocument();
      expect(await canvas.findByText('Content')).toBeInTheDocument();
    });
  },
};

export const TestAccessibilityAttributes: StoryObj = {
  tags: ['skip-playwright'],
  args: {
    variant: 'info',
    title: 'Information',
    children: 'This is an info alert',
  },
  play: async ({ canvasElement, step }) => {
    await step('has role="alert" on the container', () => {
      const alert = canvasElement.querySelector('[role="alert"]');
      expect(alert).not.toBeNull();
    });

    await step('has aria-live="assertive" on the container', () => {
      const alert = canvasElement.querySelector('[role="alert"]');
      expect(alert?.getAttribute('aria-live')).toBe('assertive');
    });

    await step('icon is hidden from assistive technology', () => {
      const icon = canvasElement.querySelector('svg');
      expect(icon?.getAttribute('aria-hidden')).toBe('true');
    });
  },
};

export const TestRendersTitleAndMessage: StoryObj = {
  tags: ['skip-playwright'],
  args: {
    variant: 'info',
    title: 'Information',
    children: 'This is an info alert',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('renders title', async () => {
      expect(await canvas.findByText('Information')).toBeInTheDocument();
    });

    await step('renders message', async () => {
      expect(
        await canvas.findByText('This is an info alert'),
      ).toBeInTheDocument();
    });

    await step('icon renders by default and uses currentColor fill', () => {
      const icon = canvasElement.querySelector('svg');
      expect(icon).not.toBeNull();
      expect(icon!.getAttribute('fill')).toBe('currentColor');
    });
  },
};
export const TestVariantsHaveCorrectUI: StoryObj = {
  tags: ['skip-playwright'],
  render: () => (
    <div>
      <Alert variant="info" title="info alert" data-testid="alert-info">
        This is a info alert
      </Alert>
      <Alert
        variant="success"
        title="success alert"
        data-testid="alert-success"
      >
        This is a success alert
      </Alert>
      <Alert
        variant="warning"
        title="warning alert"
        data-testid="alert-warning"
      >
        This is a warning alert
      </Alert>
      <Alert variant="danger" title="danger alert" data-testid="alert-danger">
        This is a danger alert
      </Alert>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const variantConfig = {
      info: {
        bg: 'gi-bg-color-surface-intent-info-default',
        text: 'gi-text-color-text-intent-info-default',
        iconTestId: 'info',
      },
      success: {
        bg: 'gi-bg-color-surface-intent-success-default',
        text: 'gi-text-color-text-intent-success-default',
        iconTestId: 'check_circle',
      },
      warning: {
        bg: 'gi-bg-color-surface-intent-warning-default',
        text: 'gi-text-color-text-intent-warning-default',
        iconTestId: 'warning',
      },
      danger: {
        bg: 'gi-bg-color-surface-intent-error-default',
        text: 'gi-text-color-text-intent-error-default',
        iconTestId: 'error',
      },
    } as const;

    for (const [variant, config] of Object.entries(variantConfig)) {
      await step(`applies bg and text classes for ${variant}`, async () => {
        const element = canvasElement.querySelector(
          `[data-testid="alert-${variant}"]`,
        ) as HTMLElement | null;

        expect(element).not.toBeNull();
        expect(element!.classList.contains(config.bg)).toBe(true);
        expect(element!.classList.contains(config.text)).toBe(true);
      });

      await step(`renders correct icon for ${variant}`, async () => {
        const element = canvasElement.querySelector(
          `[data-testid="alert-${variant}"]`,
        ) as HTMLElement | null;

        const icon = element?.querySelector(
          `[data-testid="${config.iconTestId}"]`,
        );
        expect(icon).not.toBeNull();
      });
    }
  },
};
