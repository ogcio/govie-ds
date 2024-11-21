import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import html from './toast.html?raw';
import { ToastProps } from './toast.schema';

// Name of the folder the macro resides
const path = import.meta.url.split('/toast')[0];

const macro = { name: 'govieToast', html, path };

const Toast = renderComponent<ToastProps>(macro);

const meta = {
  component: Toast,
  title: 'Application/Toast',
  argTypes: {
    variant: {
      control: 'radio',
      description: 'Specify the variant of the toast component',
      options: ['info', 'danger', 'success', 'warning'],
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
          summary: `x: ['left', 'center', 'right'] y: ['top', 'cented', 'bottom']`,
        },
      },
      description: 'Specify the position of the toast',
    },
    trigger: {
      control: 'object',
      description:
        'If specified the toast will be triggered by the click event of this React Button Component',
    },
  },
  parameters: {
    macro,
    docs: {
      description: {
        component: 'Toast component',
      },
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithTrigger: Story = {
  args: {
    title: 'Toast Triggered',
    description: 'This is some content',
    trigger: {
      content: 'Trigger Toast',
    },
  },
};

export const WithAction: Story = {
  args: {
    title: 'Dismissible',
    description: 'This is some content',
    action: {
      href: '#',
      label: 'Go to Link',
    },
  },
};

export const Dismissible: Story = {
  args: {
    title: 'Dismissible',
    description: 'This is some content',
    dismissible: true,
  },
};

export const withLongerDuration: Story = {
  args: {
    title: 'WithDuration',
    description: 'This is some content',
    duration: 8000,
  },
};

export const withPositionChange: Story = {
  args: {
    title: 'withPositionChange',
    description: 'This is some content',
    position: {
      x: 'left',
      y: 'bottom',
    },
  },
};
