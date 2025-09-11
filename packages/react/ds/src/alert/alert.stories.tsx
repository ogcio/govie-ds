import type { Meta, StoryObj } from '@storybook/react';
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

export const TestRendersTitleAndMessage: Story = {
  tags: ['skip-playwright'],
  args: {
    variant: 'info',
    title: 'Information',
    children: 'This is an info alert',
    dataTestid: 'alert',
  },
  play: async ({ canvasElement, step }) => {
    await step('renders title and message', async () => {
      const element = canvasElement.querySelector('[data-testid="alert"]');
      assert(element, 'Alert element not found');
      const text = canvasElement.textContent ?? '';
      assert(text.includes('Information'), 'Title text missing');
      assert(text.includes('This is an info alert'), 'Message text missing');
    });
  },
};

export const TestVariantsHaveCorrectClass: StoryObj = {
  tags: ['skip-playwright'],
  render: () => (
    <div>
      <Alert variant="info" title="info alert" dataTestid="alert-info">
        This is a info alert
      </Alert>
      <Alert variant="success" title="success alert" dataTestid="alert-success">
        This is a success alert
      </Alert>
      <Alert variant="warning" title="warning alert" dataTestid="alert-warning">
        This is a warning alert
      </Alert>
      <Alert variant="danger" title="danger alert" dataTestid="alert-danger">
        This is a danger alert
      </Alert>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const variants = ['info', 'success', 'warning', 'danger'] as const;
    for (const variant of variants) {
      await step(`applies class for ${variant}`, async () => {
        const element = canvasElement.querySelector(
          `[data-testid="alert-${variant}"]`,
        ) as HTMLElement | null;

        assert(element, `Alert (${variant}) not found`);
        const className = element?.className ?? '';
        const hasClass =
          className.includes(`gi-alert-${variant}`) ||
          [...(element?.classList ?? [])].includes(`gi-alert-${variant}`);

        assert(hasClass, `Missing class gi-alert-${variant}`);
      });
    }
  },
};
