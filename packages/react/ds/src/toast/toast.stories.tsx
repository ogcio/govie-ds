import {
  Title,
  Subtitle,
  Description,
  Primary,
  Controls,
} from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../button/button.js';
import { Toast, toaster, ToastProvider } from './toast.js';

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

export const WithCustomAction: Story = {
  args: {
    title: 'With Action',
    description: 'This is some content',
    customAction: <a href="#">Go to Link</a>,
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
