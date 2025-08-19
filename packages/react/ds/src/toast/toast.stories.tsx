import {
  Title,
  Subtitle,
  Description,
  Primary,
  Controls,
} from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../button/button.js';
import { Stack } from '../stack/stack.js';
import { Toast, toaster, ToastProvider } from './toast.js';
import { expect, waitFor, within } from 'storybook/test';
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
      x: 'center',
      y: 'bottom',
    },
  },
  render: (props) => (
    <>
      <ToastProvider />
      <Button onClick={() => toaster.create(props)}>Trigger Toast</Button>
    </>
  ),
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
};

export const TabletView: Story = {
  args: {
    title: 'Tablet Position Change',
    description: 'This toast appears on a tablet',
    position: { x: 'right', y: 'bottom' },
  },
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'ipad',
    },
  },
  render: (props) => (
    <>
      <ToastProvider />
      <Button onClick={() => toaster.create(props)}>
        Show Toast at Bottom Right (Tablet)
      </Button>
    </>
  ),
};

export const MobileView: Story = {
  args: {
    title: 'Mobile Position Change',
    description: 'This toast appears on a mobile',
    position: { x: 'right', y: 'bottom' },
  },
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
  render: (props) => (
    <>
      <ToastProvider />
      <Button onClick={() => toaster.create(props)}>
        Show Toast full width (Mobile)
      </Button>
    </>
  ),
};

export const AllVariants: Story = {
  render: (props) => {
    const common = {
      title: 'Default',
      description: 'Toast description',
      position: { x: 'right', y: 'bottom' },
    };
    const infoVariant = {
      variant: 'info',
      triggerButtonLabel: 'Info',
      ...common,
    };
    const successVariant = {
      variant: 'success',
      triggerButtonLabel: 'Success',
      ...common,
    };
    const dangerVariant = {
      variant: 'danger',
      triggerButtonLabel: 'Danger',
      ...common,
    };
    const warningVariant = {
      variant: 'warning',
      triggerButtonLabel: 'Warning',
      ...common,
    };
    return (
      <>
        <ToastProvider />
        <Stack gap={4}>
          {[infoVariant, successVariant, dangerVariant, warningVariant].map(
            (props: any, index: number) => (
              <Button
                key={`${props.triggerButtonLabel}_${index}`}
                onClick={() => toaster.create(props)}
              >
                {props.triggerButtonLabel}
              </Button>
            ),
          )}
        </Stack>
      </>
    );
  },
};

const positions: ToastPosition[] = [
  { x: 'left', y: 'top' },
  { x: 'center', y: 'top' },
  { x: 'right', y: 'top' },
  { x: 'left', y: 'center' },
  { x: 'center', y: 'center' },
  { x: 'right', y: 'center' },
  { x: 'left', y: 'bottom' },
  { x: 'center', y: 'bottom' },
  { x: 'right', y: 'bottom' },
];

export const AllPositions: Story = {
  render: () => (
    <>
      <ToastProvider />
      <Stack gap={4} direction="column">
        {positions.map((pos, i) => (
          <Button
            key={i}
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
  play: async () => {
    for (const pos of positions) {
      const event = new CustomEvent('govie:add-toast', {
        detail: {
          title: `${pos.x}-${pos.y}`,
          description: 'Toast message',
          animation: 'fadeinup',
          variant: 'info',
          duration: 2000,
          position: pos,
        },
      });
      globalThis.window.dispatchEvent(event);

      await waitFor(() => {
        const toastRegion = document.querySelector(
          `[data-position='${pos.y}-${pos.x}']`,
        );
        expect(toastRegion).toBeInTheDocument();
        expect(
          within(toastRegion as HTMLElement).getByTestId(
            `${pos.x}-${pos.y}-info`,
          ),
        ).toBeVisible();
      });
    }
  },
};
