import {
  Title,
  Subtitle,
  Description,
  Primary,
  Controls,
} from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { Button } from '../button/button.js';
import { Stack } from '../stack/stack.js';
import { Toast, toaster, ToastProvider } from './toast.js';
import { ToastPosition } from './types.js';

const meta: Meta<typeof Toast> = {
  title: 'Application/Toast',
  component: Toast,
  argTypes: {
    variant: {
      control: 'radio',
      description: 'Specify the variant of the toast component',
      options: ['info', 'danger', 'success', 'warning'],
    },

    animation: {
      control: 'radio',
      description: 'Specify the toast animation."',
      options: ['fadeinup', 'fadeinleft', 'fadeinright'],
    },
    title: {
      control: 'text',
      description: 'Specify the title of the toast component',
    },
    dismissible: {
      control: 'boolean',
      description: 'Specify if the toast is dismissible',
    },
    description: {
      control: 'text',
      description: 'Specify the content in the toast component',
    },
    action: {
      control: 'object',
      description: 'Specify a link for the toast component',
    },
    duration: {
      control: 'number',
      description: 'Set the duration of the toast appearing on screen',
    },
    position: {
      control: 'object',
      table: {
        type: {
          summary: `x: ['left', 'center', 'right'] y: ['top', 'center', 'bottom']`,
        },
      },
      description: 'Specify the position of the toast',
    },
  },
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Controls />
        </>
      ),
      description: {
        component: 'Toast component',
      },
      source: {
        type: 'code',
      },
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Default',
    description: 'This is some content',
    animation: 'fadeinup',
    variant: 'info',
    duration: 5000,
    position: {
      x: 'right',
      y: 'bottom',
    },
  },
  render: (props) => (
    <>
      <ToastProvider />
      <Button onClick={() => toaster.create(props)}>Trigger Toast</Button>
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const info = await canvas.findByText('Trigger Toast');
    await userEvent.click(info);
  },
};

export const WithSlotAction: Story = {
  args: {
    title: 'With Action',
    description: 'This is some content',
    slotAction: <a href="#">Go to Link</a>,
    duration: 5000,
  },
  render: (props) => (
    <>
      <ToastProvider />
      <Button onClick={() => toaster.create(props)}>
        Show Toast with Action
      </Button>
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const info = await canvas.findByText('Show Toast with Action');
    await userEvent.click(info);
  },
};

export const WithAction: Story = {
  args: {
    title: 'With Action',
    description: 'This is some content',
    action: {
      href: '#',
      label: 'Go to link',
    },
  },
  render: (props) => (
    <>
      <ToastProvider />
      <Button onClick={() => toaster.create(props)}>
        Show Toast with Action
      </Button>
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const info = await canvas.findByText('Show Toast with Action');
    await userEvent.click(info);
  },
};

export const Dismissible: Story = {
  args: {
    variant: 'info',
    title: 'Dismissible',
    description: 'This is some content',
    dismissible: true,
  },
  render: (props) => {
    return (
      <>
        <ToastProvider />
        <Button onClick={() => toaster.create(props)}>
          Show Dismissible Toast
        </Button>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const info = await canvas.findByText('Show Dismissible Toast');
    await userEvent.click(info);
  },
};

export const WithLongerDuration: Story = {
  args: {
    title: 'With Duration',
    description: 'This is some content',
    duration: 8000,
  },
  render: (props) => (
    <>
      <ToastProvider />
      <Button onClick={() => toaster.create(props)}>
        Show Toast with Longer Duration
      </Button>
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const info = await canvas.findByText('Show Toast with Longer Duration');
    await userEvent.click(info);
  },
};

export const WithPositionChange: Story = {
  args: {
    title: 'With Position Change',
    description: 'This is some content',
    position: { x: 'left', y: 'bottom' },
  },
  render: (props) => (
    <>
      <ToastProvider />
      <Button onClick={() => toaster.create(props)}>
        Show Toast at Bottom Left
      </Button>
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const info = await canvas.findByText('Show Toast at Bottom Left');
    await userEvent.click(info);
  },
};

export const Success: Story = {
  args: {
    title: 'Default',
    description: 'This is some content',
    variant: 'success',
    position: {
      x: 'right',
      y: 'bottom',
    },
  },
  render: (props) => (
    <>
      <ToastProvider />
      <Button onClick={() => toaster.create(props)}>Trigger Toast</Button>
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const info = await canvas.findByText('Trigger Toast');
    await userEvent.click(info);
  },
};

export const Danger: Story = {
  args: {
    title: 'Default',
    description: 'This is some content',
    variant: 'danger',
    position: {
      x: 'right',
      y: 'bottom',
    },
  },
  render: (props) => (
    <>
      <ToastProvider />
      <Button onClick={() => toaster.create(props)}>Trigger Toast</Button>
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const info = await canvas.findByText('Trigger Toast');
    await userEvent.click(info);
  },
};

export const Warning: Story = {
  args: {
    title: 'Default',
    description: 'This is some content',
    variant: 'warning',
    position: {
      x: 'right',
      y: 'bottom',
    },
  },
  render: (props) => (
    <>
      <ToastProvider />
      <Button onClick={() => toaster.create(props)}>Trigger Toast</Button>
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const info = await canvas.findByText('Trigger Toast');
    await userEvent.click(info);
  },
};

const positions: ToastPosition[] = [
  { x: 'left', y: 'top' },
  { x: 'center', y: 'top' },
  { x: 'right', y: 'top' },
  { x: 'left', y: 'bottom' },
  { x: 'center', y: 'bottom' },
  { x: 'right', y: 'bottom' },
];

export const AllPositions: Story = {
  render: () => (
    <>
      <ToastProvider />
      <Stack gap={4} direction="column">
        {positions.map((pos, index) => (
          <Button
            key={index}
            onClick={() =>
              toaster.create({
                title: `${pos.x}-${pos.y}`,
                description: 'Toast message',
                animation: 'fadeinup',
                variant: 'info',
                duration: 2000,
                position: pos,
              })
            }
          >
            Trigger {pos.x}-{pos.y}
          </Button>
        ))}
      </Stack>
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    for (const pos of positions) {
      const button = await canvas.findByText(`Trigger ${pos.x}-${pos.y}`);
      await userEvent.click(button);
    }
  },
};

const variantList = ['info', 'success', 'warning', 'danger'] as const;

export const TestRenderTitleAndMessage: Story = {
  tags: ['skip-playwright'],
  args: {
    title: 'Toast Title',
    description: 'This is the toast content',
  },
  render: (props) => (
    <>
      <ToastProvider />
      <Button onClick={() => toaster.create(props)}>
        Trigger Title And Message
      </Button>
    </>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('should render toast with title and message', async () => {
      const triggerButton = await canvas.findByText(
        'Trigger Title And Message',
      );
      await userEvent.click(triggerButton);
      await waitFor(() => {
        const bodyScope = within(document.body);
        expect(bodyScope.getByText('Toast Title')).toBeInTheDocument();
        expect(
          bodyScope.getByText('This is the toast content'),
        ).toBeInTheDocument();
      });
    });
  },
};

export const TestRenderAllVariants: Story = {
  tags: ['skip-playwright'],
  render: () => {
    return (
      <>
        <ToastProvider />
        <Stack gap={2} direction="column">
          {[...variantList].map((variant) => (
            <Button
              key={variant}
              onClick={() =>
                toaster.create({
                  title: 'Toast',
                  description: 'This is a Toast',
                  variant,
                })
              }
            >
              Trigger {variant}
            </Button>
          ))}
        </Stack>
      </>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('should render all different variants', async () => {
      for (const variant of variantList) {
        const triggerButton = await canvas.findByText(`Trigger ${variant}`);
        await userEvent.click(triggerButton);
        await waitFor(() => {
          const bodyScope = within(document.body);
          const testId = `Toast-${variant}`;
          expect(bodyScope.getByTestId(testId)).toBeInTheDocument();
        });
      }
    });
  },
};
