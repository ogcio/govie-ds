import type { Meta, StoryObj } from '@storybook/react';
import parse from 'html-react-parser';
import { createButton, createIconButton } from '../helpers/buttons';
import { createIcon } from '../helpers/icons';
import { createLink } from '../helpers/links';
import { createParagraph } from '../helpers/typography';
import { ToastProps } from './types';

const meta: Meta<ToastProps> = {
  title: 'Application/Toast',
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
    showIcon: {
      control: 'boolean',
      description:
        'Controls whether the icon is shown. Set to false to hide it.',
      table: { defaultValue: { summary: 'true' } },
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
};

export default meta;
type Story = StoryObj<ToastProps>;

const createToast = ({ showIcon = true, ...arguments_ }: ToastProps) => {
  let iconId = 'info';
  if (arguments_.variant == 'warning') {
    iconId = 'warning';
  } else if (arguments_.variant == 'success') {
    iconId = 'check_circle';
  } else if (arguments_.variant == 'danger') {
    iconId = 'error';
  }

  let variantClass = 'gi-toast-info';
  if (arguments_.variant == 'danger') {
    variantClass = 'gi-toast-danger';
  } else if (arguments_.variant == 'success') {
    variantClass = 'gi-toast-success';
  } else if (arguments_.variant == 'warning') {
    variantClass = 'gi-toast-warning';
  }

  let baseToastClass = 'gi-toast-base';
  if (arguments_.dismissible) {
    baseToastClass = 'gi-toast-base-dismissible';
  }

  const toast = document.createElement('div');
  toast.className = 'gi-hidden';
  if (arguments_.id) {
    toast.setAttribute('id', arguments_.id);
  }
  toast.dataset.duration = arguments_.duration?.toString();

  const dsToast = document.createElement('div');

  dsToast.role = 'alert';
  dsToast.dataset.module = 'gieds-dsToast';
  dsToast.className = `${variantClass} ${baseToastClass}`;

  if (showIcon) {
    const icon = createIcon({ icon: iconId, className: 'gi-toast-icon' });
    icon.dataset.variant = arguments_.variant;
    dsToast.append(icon);
  }

  const container = document.createElement('div');
  container.className = 'gi-toast-container';

  const title = document.createElement('p');
  title.className = 'gi-toast-title';
  title.textContent = arguments_.title;
  container.append(title);

  if (arguments_.description) {
    const content = createParagraph({ content: arguments_.description });
    container.append(content);
  }

  if (arguments_.action) {
    const action = document.createElement('div');
    action.className = 'gi-toast-action';
    const link = createLink({
      noColor: true,
      size: 'md',
      href: arguments_.action.href,
      content: arguments_.action.label,
    });
    action.append(link);
    container.append(action);
  }

  dsToast.append(container);

  if (arguments_.dismissible) {
    const dismissButton = createIconButton({
      className: 'gi-toast-dismiss',
      size: 'small',
      appearance: 'dark',
      variant: 'flat',
      icon: {
        icon: 'close',
      },
      id: `toast-dismissible-${arguments_.id}`,
    });
    dsToast.append(dismissButton);
  }

  toast.append(dsToast);
  return toast;
};

const createTrigger = (arguments_: ToastProps, label: string) => {
  const trigger = document.createElement('div');
  trigger.role = 'alert';
  trigger.dataset.module = 'gieds-toast';
  const position = arguments_.position;

  if (arguments_.duration) {
    trigger.dataset.duration = arguments_.duration.toString();
  }
  if (position) {
    trigger.dataset.position = `${position.y}-${position.x}`;
    trigger.dataset.positionX = position?.x;
    trigger.dataset.positionY = position?.y;
  }

  const button = createButton({ content: label || 'Trigger Toast' });
  trigger.append(button);
  return trigger;
};

const createElement = (arguments_: ToastProps, hasTrigger?: boolean) => {
  const container = document.createElement('div');

  if (hasTrigger) {
    const trigger = createTrigger(arguments_, arguments_.triggerButtonLabel);
    container.append(trigger);
  }

  const component = createToast(arguments_);
  container.append(component);
  return parse(container.outerHTML) as React.ReactElement;
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
      y: 'top',
    },
    triggerButtonLabel: 'Trigger Toast',
    id: 'toast-1',
  },
  render: (arguments_) => createElement(arguments_, true),
};

export const WithAction: Story = {
  args: {
    title: 'With Action',
    description: 'This is some content',
    action: {
      href: '#',
      label: 'Go to Link',
    },
    duration: 5000,
    triggerButtonLabel: 'Show Toast with Action',
    id: 'toast-2',
  },
  render: (arguments_) => createElement(arguments_, true),
};

export const Dismissible: Story = {
  args: {
    variant: 'info',
    title: 'Dismissible',
    description: 'This is some content',
    dismissible: true,
    triggerButtonLabel: 'Show Dismissible Toast',
    duration: 5000,
    id: 'toast-3',
  },
  render: (arguments_) => createElement(arguments_, true),
};

export const WithLongerDuration: Story = {
  args: {
    title: 'With Duration',
    description: 'This is some content',
    duration: 8000,
    triggerButtonLabel: 'Show Toast with Longer Duration',
    id: 'toast-4',
  },
  render: (arguments_) => createElement(arguments_, true),
};

export const WithPositionChange: Story = {
  args: {
    title: 'With Position Change',
    description: 'This is some content',
    position: { x: 'left', y: 'bottom' },
    triggerButtonLabel: 'Show Toast at Bottom Left',
  },
  render: (arguments_) => createElement(arguments_, true),
};

export const TabletView: Story = {
  args: {
    title: 'Tablet Position Change',
    description: 'This toast appears on a tablet',
    position: { x: 'right', y: 'bottom' },
    triggerButtonLabel: 'Show Toast at Bottom Left',
  },
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'ipad',
    },
  },
  render: (arguments_) => createElement(arguments_, true),
};

export const MobileView: Story = {
  args: {
    title: 'Mobile Position Change',
    description: 'This toast appears on a mobile',
    position: { x: 'right', y: 'bottom' },
    triggerButtonLabel: 'Show Toast full width (Mobile)',
  },
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
  render: (arguments_) => createElement(arguments_, true),
};
